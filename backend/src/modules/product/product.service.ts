import { Prisma } from "@prisma/client";
import { AppError } from "../../utils/AppError.js";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../../utils/cloudinary.helper.js";
import { IProductRepository } from "./product.interface.js";
import { createProductDTO, editProductDTO } from "./product.schema.js";
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
  async getAllProducts() {
    const products = await this.productRepo.getAllProducts();
    return toProductResponsList(products);
  }
  async getProductsByCategoryId(categoryId: string) {
    const products = await this.productRepo.getProductByCategoryId(categoryId);
    return toProductResponsList(products);
  }
  async editProduct(data: editProductDTO, productId: string, sellerId: string) {
    const exitingProducts =
      await this.productRepo.getProductByProductIdAndSellerId(
        productId,
        sellerId,
      );
    if (!exitingProducts) {
      throw new AppError("product is not found", 400);
    }
    const updateData: Prisma.ProductUpdateInput = {};
    if (data.productName !== undefined) {
      updateData.productName = data.productName;
    }
    if (data.productDescription !== undefined) {
      updateData.productDescription = data.productDescription;
    }
    if (data.price !== undefined) {
      updateData.price = data.price;
    }
    if (data.stock !== undefined) {
      updateData.stock = Number(data.stock);
    }
    if (Object.keys(updateData).length == 0) {
      throw new AppError("no valid fields provided update", 404);
    }
    const updateProducts = await this.productRepo.editProduct(
      updateData,
      productId,
      sellerId,
    );
    if (!updateProducts) {
      throw new AppError("product is not found or unauthorized", 404);
    }

    return toProductResponse(updateProducts);
  }
  async deleteProduct(productId: string, sellerId: string) {
    const exitingProducts =
      await this.productRepo.getProductByProductIdAndSellerId(
        productId,
        sellerId,
      );
    if (!exitingProducts) {
      throw new AppError("product is not found", 400);
    }
    const productImageUrls = exitingProducts.productImageUrls;
    productImageUrls.forEach(async (productImageUrl) => {
      await deleteFromCloudinary(productImageUrl);
    });
    await this.productRepo.deleteProduct(productId, sellerId);
  }
  async toggleActiveProduct(productId: string, sellerId: string) {
    const exitingProducts =
      await this.productRepo.getProductByProductIdAndSellerId(
        productId,
        sellerId,
      );
    if (!exitingProducts) {
      throw new AppError("product is not found", 400);
    }
    const product = await this.productRepo.toggleActiveProduct(
      productId,
      sellerId,
      !exitingProducts.isActive,
    );
    return toProductResponse(product);
  }
  async getAllActiveProducts() {
    const product = await this.productRepo.getAllActiveProducts();
    return toProductResponsList(product);
  }
}
