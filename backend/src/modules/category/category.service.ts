import { AppError } from "../../utils/AppError.js";
import { IProductRepository } from "../product/product.interface.js";
import { ICategoryRepository } from "./category.interfacfe.js";
import {
  toCategoryResponse,
  toCategoryResponseList,
} from "./category.mapper.js";
import { createCategoryDTO, updateCategoryDTO } from "./category.schema.js";

export class CategoryService {
  constructor(
    private categoryRepo: ICategoryRepository,
    private productRepo: IProductRepository,
  ) {}
  async createCategory(data: createCategoryDTO) {
    const exitingCategory = await this.categoryRepo.findCategoryByName(
      data.categoryName,
    );
    if (exitingCategory) {
      throw new AppError("category this name is already exists", 400);
    }
    const newCategory = await this.categoryRepo.createCategory(data);
    return toCategoryResponse(newCategory);
  }
  async getAllCategory() {
    const category = await this.categoryRepo.getAllCategory();
    return toCategoryResponseList(category);
  }
  async updateCategory(data: updateCategoryDTO, categoryId: string) {
    const exitingCategory =
      await this.categoryRepo.findCategoryById(categoryId);
    if (!exitingCategory) {
      throw new AppError("category is not found", 404);
    }
    const result = await this.categoryRepo.updateCategory(data, categoryId);
    return toCategoryResponse(result);
  }
  async deleteCategoryById(categoryId: string) {
    const exitingCategory =
      await this.categoryRepo.findCategoryById(categoryId);

    if (!exitingCategory) {
      throw new AppError("category is not found", 404);
    }
    const product = await this.productRepo.getProductByCategoryId(categoryId);
    if (product.length > 0) {
      throw new AppError("product can not deleted", 400);
    }
    await this.categoryRepo.deleteCategoryById(categoryId);
    return true;
  }
}
