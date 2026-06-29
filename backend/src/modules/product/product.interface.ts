import { Prisma, Product } from "@prisma/client";
import { editProductDTO } from "./product.schema.js";

export interface IProductRepository {
  createProduct(data: {
    userId: string;
    categoryId: string;
    productName: string;
    productDescription: string;
    productImageUrls: string[];
    price: any;
    stock: number;
  }): Promise<Product>;
  getProductByCategoryId(categoryId: string): Promise<Product[]>;
  getAllProducts(): Promise<Product[]>;
  getProductById(productId: string): Promise<Product | null>;
  editProduct(
    data: Prisma.ProductUpdateInput,
    productId: string,
    sellerId: string,
  ): Promise<Product>;
  getProductByProductIdAndSellerId(
    productId: string,
    sellerId: string,
  ): Promise<Product | null>;
  deleteProduct(productId: string, sellerId: string): Promise<any>;
  toggleActiveProduct(
    productId: string,
    sellerId: string,
    isActive: boolean,
  ): Promise<Product>;
  getAllActiveProducts(): Promise<Product[]>;
}
