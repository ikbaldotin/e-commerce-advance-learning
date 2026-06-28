import { Category } from "@prisma/client";
import { updateCategoryDTO } from "./category.schema.js";

export interface ICategoryRepository {
  createCategory(data: {
    categoryName: string;
    categoryDescription: string;
  }): Promise<Category>;
  findCategoryByName(categoryName: string): Promise<Category | null>;
  deleteCategoryById(categoryId: string): Promise<any>;
  findCategoryById(categoryId: string): Promise<Category | null>;
  getAllCategory(): Promise<Category[]>;
  updateCategory(
    data: updateCategoryDTO,
    categoryId: string,
  ): Promise<Category>;
}
