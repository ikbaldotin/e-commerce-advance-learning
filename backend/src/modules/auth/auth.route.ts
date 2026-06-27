import express from "express";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  loginUserSchema,
  logoutUserSchema,
  refreshTokenSchema,
  registerUserSchema,
} from "./auth.sechema.js";
import {
  getCurrentUserController,
  loginUserController,
  logoutAllDeviceController,
  logoutControlller,
  refreshTokenController,
  registerUserController,
} from "./auth.controller.js";
import { verifyUser } from "../../middlewares/aurh.middleware.js";
const router = express.Router();

router
  .route("/register")
  .post(validate(registerUserSchema), registerUserController);
router.route("/login").post(validate(loginUserSchema), loginUserController);
router.route("/me").get(verifyUser, getCurrentUserController);
router
  .route("/logout")
  .post(verifyUser, validate(logoutUserSchema), logoutControlller);
router.route("/logout-all-device").post(verifyUser, logoutAllDeviceController);
router
  .route("/refresh-token")
  .post(validate(refreshTokenSchema), refreshTokenController);
export default router;
