import { Prisma } from "@prisma/client";
import { AppError } from "../../utils/AppError.js";
import { uploadToCloudinary } from "../../utils/cloudinary.helper.js";
import { IProductRepository } from "./product.interface.js";
import { createProductDTO } from "./product.schema.js";
import { toProductResponse, toProductResponsList } from "./product.mapper.js";

export class ProductService {
  constructor(private productRepo: IProductRepository) {}
  async createProduct(
    data: createProductDTO,
    userId: string,
    files: Express.Multer.File[],
  ) {
    if (!files || files.length === 0) {
      throw new AppError("at least one product image", 400);
    }
    const imageUrls = await Promise.all(
      files.map((file) => uploadToCloudinary(file.buffer)),
    );
    const newProduct = await this.productRepo.createProduct({
      userId,
      categoryId: data.categoryId,
      productName: data.productName,
      productDescription: data.productDescription,
      productImageUrls: imageUrls,
      price: new Prisma.Decimal(data.price),
      stock: Number(data.stock),
    });
    return toProductResponse(newProduct);
  }
  async getProductsByCategoryId(categoryId: string) {
    const products = await this.productRepo.getProductByCategoryId(categoryId);
    return toProductResponsList(products);
  }
}
