import express from "express";
import {
  verifyAdmin,
  verifySeller,
  verifyUser,
} from "../../middlewares/aurh.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "./category.schema.js";
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoryController,
  updateCategoryController,
} from "./category.controller.js";

const router = express.Router();

router
  .route("/create-category")
  .post(
    verifyUser,
    verifyAdmin,
    validate(createCategorySchema),
    createCategoryController,
  );
router.route("/all-category").get(getAllCategoryController);
router
  .route("/update-category/:catId")
  .patch(verifyUser, verifyAdmin, updateCategoryController);
router
  .route("/delete-category/:catId")
  .delete(
    verifyUser,
    verifyAdmin,
    validate(updateCategorySchema),
    deleteCategoryController,
  );
export default router;
