import { Order, OrderStatus } from "@prisma/client";
import { IOrderRepsitory } from "./order.interface.js";
import { prisma } from "../../lib/prisma.js";
import { updatedOrderStatusDTO } from "./order.schema.js";

export class OrderRepository implements IOrderRepsitory {
  async getOrderById(orderId: string): Promise<Order | null> {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        items: true,
        orderAddresses: true,
      },
    });
    return order;
  }
  async getOrderByUserId(userId: string): Promise<Order[]> {
    const order = await prisma.order.findMany({
      where: {
        userId,
      },
      include: {
        items: true,
        orderAddresses: true,
      },
    });
    return order;
  }
  async updatedOrderStatus(
    orderId: string,
    data: updatedOrderStatusDTO,
  ): Promise<Order> {
    const updateOrder = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: data.status,
      },
    });
    return updateOrder;
  }
}
