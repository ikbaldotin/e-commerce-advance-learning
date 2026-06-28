import { Request, Response } from "express";
import { CatchAsync } from "../../utils/CatchAsync.js";
import categoryService from "./category.container.js";
import { SendResponse } from "../../utils/SendResponse.js";

export const createCategoryController = CatchAsync(
  async (req: Request, res: Response) => {
    const result = await categoryService.createCategory(req.body);
    SendResponse(res, 201, {
      success: true,
      message: "category created successfully",
      data: result,
    });
  },
);
export const getAllCategoryController = CatchAsync(
  async (req: Request, res: Response) => {
    const result = await categoryService.getAllCategory();
    SendResponse(res, 200, {
      success: true,
      message: "get all category fetched",
      data: result,
    });
  },
);
export const updateCategoryController = CatchAsync(
  async (req: Request, res: Response) => {
    const categoryId = req.params.catId as string;
    const result = await categoryService.updateCategory(req.body, categoryId);
    SendResponse(res, 200, {
      success: true,
      message: "category updated successfully",
      data: result,
    });
  },
);
export const deleteCategoryController = CatchAsync(
  async (req: Request, res: Response) => {
    const categoryId = req.params.catId as string;
    await categoryService.deleteCategoryById(categoryId);
    SendResponse(res, 200, {
      success: true,
      message: "category  deleted successfully",
    });
  },
);
