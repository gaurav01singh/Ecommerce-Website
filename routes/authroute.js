import express from "express";
import {
  forgotPasswordController,
  getAllOrdersController,
  getOrdersController,
  loginController,
  orderStatusController,
  registerController,
  testController,
  updateProfileController,
} from "../controllers/authcontroller.js";
import { isAdmin, requiresingin } from "../middlewares/authmiddleware.js";

const router = express.Router();

router.post("/register", registerController);

//login
router.post("/login", loginController);
//forgot password
router.post("/forgot-password", forgotPasswordController);

router.get("/test", requiresingin, isAdmin, testController);
//user route
router.get("/user-auth", requiresingin, (req, res) => {
  res.status(200).send({ ok: "true" });
});
//admin route
router.get("/admin-auth", requiresingin, isAdmin, (req, res) => {
  res.status(200).send({ ok: "true" });
});
//update profile
router.put("/profile", requiresingin, updateProfileController);
//order
router.get("/orders", requiresingin, getOrdersController);
router.get("/all-orders", requiresingin, isAdmin, getAllOrdersController);
router.put(
  "/order-status/:orderId",
  requiresingin,
  isAdmin,
  orderStatusController
);
export default router;
