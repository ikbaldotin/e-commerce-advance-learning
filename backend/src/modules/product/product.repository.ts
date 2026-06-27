import { Product } from "@prisma/client";
import { IProductRepository } from "./product.interface.js";
import { prisma } from "../../lib/prisma.js";

export class ProductRepository implements IProductRepository {
  async createProduct(data: {
    userId: string;
    categoryId: string;
    productName: string;
    productDescription: string;
    productImageUrl: string[];
    price: any;
    stock: number;
  }): Promise<Product> {
    const newProduct = await prisma.product.create({ data });
    return newProduct;
  }
}
