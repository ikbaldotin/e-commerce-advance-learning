import { Order, OrderStatus } from "@prisma/client";
import { updatedOrderStatusDTO } from "./order.schema.js";

export interface IOrderRepsitory {
  //   createOrder(userId: string, data: createOrderDTO): Promise<Order>;
  getOrderById(orderId: string): Promise<Order | null>;
  getOrderByUserId(userId: string): Promise<Order[]>;
  updatedOrderStatus(
    orderId: string,
    data: updatedOrderStatusDTO,
  ): Promise<Order>;
}
