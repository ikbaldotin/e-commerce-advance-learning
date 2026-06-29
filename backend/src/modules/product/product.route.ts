import express from "express";
import {
  verifyAdmin,
  verifySeller,
  verifyUser,
} from "../../middlewares/aurh.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createProductSchema, editProductSchema } from "./product.schema.js";
import {
  createProductController,
  deleteProductController,
  editProductController,
  getAllActiveProductsController,
  getAllProducts,
  getProductByCategoryId,
  toggleActiveProductController,
} from "./product.controller.js";
import { upload } from "../../middlewares/multer.middleware.js";

const router = express.Router();
router
  .route("/create-product")
  .post(
    verifyUser,
    verifySeller,
    upload.array("images", 5),
    validate(createProductSchema),
    createProductController,
  );
router.route("/all-products").get(verifyUser, verifyAdmin, getAllProducts);
router.route("/category/:catId").get(getProductByCategoryId);
router
  .route("/update-product/:productId")
  .patch(
    verifyUser,
    verifySeller,
    validate(editProductSchema),
    editProductController,
  );
router
  .route("/toggle-update/:productId")
  .patch(verifyUser, verifySeller, toggleActiveProductController);
router
  .route("/all-active-product")
  .get(verifyUser, verifySeller, getAllActiveProductsController);
router
  .route("/delete-product/:productId")
  .delete(verifyUser, verifySeller, deleteProductController);
export default router;
