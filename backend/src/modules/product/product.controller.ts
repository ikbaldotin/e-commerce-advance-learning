import { Request, Response } from "express";
import { CatchAsync } from "../../utils/CatchAsync.js";
import productService from "./product.container.js";
import { SendResponse } from "../../utils/SendResponse.js";

export const createProductController = CatchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user.id;
    const files = req.files as Express.Multer.File[];

    const result = await productService.createProduct(req.body, userId, files);

    SendResponse(res, 201, {
      success: true,
      message: "product created successfully",
      data: result,
    });
  },
);

export const getProductByCategoryId = CatchAsync(
  async (req: Request, res: Response) => {
    const categoryId = req.params.catId as string;
    const result = await productService.getProductsByCategoryId(categoryId);
    SendResponse(res, 201, {
      success: true,
      message: "product fetched successfully",
      data: result,
    });
  },
);
