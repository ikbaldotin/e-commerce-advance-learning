import { Category } from "@prisma/client";
import { ICategoryRepository } from "./category.interfacfe.js";
import { prisma } from "../../lib/prisma.js";

export class CategoryRepository implements ICategoryRepository {
  async createCategory(data: {
    categoryName: string;
    categoryDescription: string;
  }): Promise<Category> {
    const newCategory = await prisma.category.create({
      data,
    });
    return newCategory;
  }
  async findCategoryByName(categoryName: string): Promise<Category | null> {
    const category = await prisma.category.findUnique({
      where: {
        categoryName,
      },
    });
    return category;
  }
}
