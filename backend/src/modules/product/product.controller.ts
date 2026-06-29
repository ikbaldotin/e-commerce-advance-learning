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
export const getAllProducts = CatchAsync(
  async (req: Request, res: Response) => {
    const result = await productService.getAllProducts();
    SendResponse(res, 201, {
      success: true,
      message: "all products fetched successfully",
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

export const editProductController = CatchAsync(
  async (req: Request, res: Response) => {
    const productId = req.params.productId as string;
    const sellerId = req.user.id;
    const result = await productService.editProduct(
      req.body,
      productId,
      sellerId,
    );

    SendResponse(res, 200, {
      success: true,
      message: "product updated successfully",
      data: result,
    });
  },
);

export const toggleActiveProductController = CatchAsync(
  async (req: Request, res: Response) => {
    const productId = req.params.productId as string;
    const sellerId = req.user.id as string;
    const result = await productService.toggleActiveProduct(
      productId,
      sellerId,
    );
    SendResponse(res, 200, {
      success: true,
      message: "toggle updated successfully",
      data: result,
    });
  },
);
export const getAllActiveProductsController = CatchAsync(
  async (req: Request, res: Response) => {
    const result = await productService.getAllActiveProducts();
    SendResponse(res, 200, {
      success: true,
      message: "all active product fetched successfully",
      data: result,
    });
  },
);

export const deleteProductController = CatchAsync(
  async (req: Request, res: Response) => {
    const sellerId = req.user.id as string;
    const productId = req.params.productId as string;
    await productService.deleteProduct(productId, sellerId);
    SendResponse(res, 200, {
      success: true,
      message: "product deleted successfully",
    });
  },
);
