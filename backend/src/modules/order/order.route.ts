import express from "express";
import { verifyAdmin, verifyUser } from "../../middlewares/aurh.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createOrderSchema, updatedOrderStatusSchema } from "./order.schema.js";
import {
  cancelOrderController,
  createOrderController,
  getMyOrderController,
  updatedOrderStatusController,
} from "./order.controller.js";

const router = express.Router();

router
  .route("/create-order")
  .post(verifyUser, validate(createOrderSchema), createOrderController);
router.route("/my-orders").get(verifyUser, getMyOrderController);
router
  .route("/update-order-status/:orderId")
  .patch(
    verifyUser,
    verifyAdmin,
    validate(updatedOrderStatusSchema),
    updatedOrderStatusController,
  );
router.route("/cancel-order/:orderId").post(verifyUser, cancelOrderController);
export default router;
