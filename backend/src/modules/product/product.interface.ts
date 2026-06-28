import { Product } from "@prisma/client";

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
}
