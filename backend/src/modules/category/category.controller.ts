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
