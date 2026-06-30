import { OrderStatus, Prisma } from "@prisma/client";
import { IOrderRepsitory } from "./order.interface.js";
import { createOrderDTO, updatedOrderStatusDTO } from "./order.schema.js";
import { AppError } from "../../utils/AppError.js";
import { prisma } from "../../lib/prisma.js";

export class OrderService {
  constructor(private orderRepo: IOrderRepsitory) {}

  async createOrderController(userId: string, data: createOrderDTO) {
    const { items } = data;

    if (!items || items.length === 0) {
      throw new AppError("Order must contain at least one item", 400);
    }

    return await prisma.$transaction(async (tx) => {
      let totalPrice = new Prisma.Decimal(0);
      let totalItems = 0;

      const orderItemsData = [];

      for (const item of items) {
        const product = await tx.product.findUnique({
          where: {
            id: item.productId,
          },
        });

        if (!product) {
          throw new AppError("Product not found", 404);
        }

        if (!product.isActive) {
          throw new AppError(`${product.productName} is not active`, 400);
        }

        if (product.stock < item.quantity) {
          throw new AppError(
            `${product.productName} has insufficient stock`,
            400,
          );
        }

        await tx.product.update({
          where: {
            id: product.id,
          },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });

        const itemTotal = product.price.mul(item.quantity);

        totalPrice = totalPrice.add(itemTotal);
        totalItems += item.quantity;

        orderItemsData.push({
          productId: product.id,
          quantity: item.quantity,
          priceAtPurchase: product.price,
        });
      }

      const order = await tx.order.create({
        data: {
          userId,
          totalPrice,
          totalItems,
          status: OrderStatus.PENDING,
          items: {
            create: orderItemsData,
          },
        },
        include: {
          items: true,
        },
      });

      return order;
    });
  }
  async getOrderById(orderId: string) {
    const order = await this.orderRepo.getOrderById(orderId);
    return order;
  }
  async getMyOrder(userId: string) {
    const order = await this.orderRepo.getOrderByUserId(userId);
    return order;
  }
  async updatedOrderStatus(orderId: string, data: updatedOrderStatusDTO) {
    const existingOrder = await this.orderRepo.getOrderById(orderId);
    if (!existingOrder) {
      throw new AppError("order not found", 400);
    }

    const allowTransition: Record<OrderStatus, OrderStatus[]> = {
      [OrderStatus.PENDING]: [OrderStatus.ACCEPTED, OrderStatus.CANCELED],
      [OrderStatus.ACCEPTED]: [],
      [OrderStatus.CANCELED]: [],
    };

    const { status } = data;

    if (!allowTransition[existingOrder.status].includes(status)) {
      throw new AppError("Invalid status transition", 400);
    }

    const order = await this.orderRepo.updatedOrderStatus(orderId, data);
    return order;
  }
  async cancelOrder(orderId: string, userId: string) {
    return prisma.$transaction(async (tx) => {
      const order = await tx.order.findUnique({
        where: {
          id: orderId,
        },
        include: {
          items: true,
        },
      });
      if (!order) {
        throw new AppError("order not found", 404);
      }
      if (order.userId !== userId) {
        throw new AppError("unauthorized", 403);
      }
      if (order.status !== OrderStatus.PENDING) {
        throw new AppError("only pending order canceled", 401);
      }
      for (const item of order.items) {
        await tx.product.update({
          where: {
            id: item.productId,
          },
          data: {
            stock: {
              increment: item.quantity,
            },
          },
        });
      }
      return await tx.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: OrderStatus.CANCELED,
        },
      });
    });
  }
}
