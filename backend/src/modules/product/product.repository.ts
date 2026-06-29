import { Prisma, Product } from "@prisma/client";
import { IProductRepository } from "./product.interface.js";
import { prisma } from "../../lib/prisma.js";
import { editProductDTO } from "./product.schema.js";

export class ProductRepository implements IProductRepository {
  async createProduct(data: {
    userId: string;
    categoryId: string;
    productName: string;
    productDescription: string;
    productImageUrls: string[];
    price: any;
    stock: number;
  }): Promise<Product> {
    const newProduct = await prisma.product.create({ data });
    return newProduct;
  }
  async getProductByCategoryId(categoryId: string): Promise<Product[]> {
    const products = await prisma.product.findMany({
      where: {
        categoryId,
      },
    });
    return products;
  }
  async getAllProducts(): Promise<Product[]> {
    const products = await prisma.product.findMany();
    return products;
  }
  async getProductById(productId: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    return product;
  }
  async getProductByProductIdAndSellerId(productId: string, sellerId: string) {
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
        userId: sellerId,
      },
    });
    return product;
  }
  async editProduct(
    data: Prisma.ProductUpdateInput,
    productId: string,
    sellerId: string,
  ): Promise<Product> {
    const product = await prisma.product.update({
      where: {
        id: productId,
      },
      data,
    });
    return product;
  }
  async deleteProduct(productId: string, sellerId: string) {
    await prisma.product.delete({
      where: {
        id: productId,
        userId: sellerId,
      },
    });
  }
  async toggleActiveProduct(
    productId: string,
    sellerId: string,
    isActive: boolean,
  ): Promise<Product> {
    const product = await prisma.product.update({
      where: {
        id: productId,
        userId: sellerId,
      },
      data: {
        isActive,
      },
    });
    return product;
  }
  async getAllActiveProducts(): Promise<Product[]> {
    const product = await prisma.product.findMany({
      where: {
        isActive: true,
      },
    });
    return product;
  }
}
