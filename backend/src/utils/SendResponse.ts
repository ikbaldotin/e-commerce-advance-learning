import { Response } from "express";
import { ApiResponse } from "../types/index.js";
export const SendResponse = <T>(
  res: Response,
  statusCode: number,
  playLoad: ApiResponse<T>,
) => {
  return res.status(statusCode).json(playLoad);
};
