import { AppError } from "../../utils/AppError.js";
import { ICategoryRepository } from "./category.interfacfe.js";
import { toCategoryResponse } from "./category.mapper.js";
import { createCategoryDTO } from "./category.schema.js";

export class CategoryService {
  constructor(private categoryRepo: ICategoryRepository) {}
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
}
