import express from "express";
import { verifyUser } from "../../middlewares/aurh.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createAddressSchema, updateAddressSchema } from "./address.schema.js";
import {
  createAddressController,
  deleteAddressController,
  getAddressByuserIdController,
  updateAddressController,
} from "./address.controller.js";
const router = express.Router();

router
  .route("/create-address")
  .post(verifyUser, validate(createAddressSchema), createAddressController);
router.route("/all-address").get(verifyUser, getAddressByuserIdController);
router
  .route("/update-address/:addressId")
  .patch(verifyUser, validate(updateAddressSchema), updateAddressController);
router
  .route("/delete-address/:addressId")
  .delete(verifyUser, deleteAddressController);
export default router;
