import express from "express";
import { isAdmin, requiresingin } from "../middlewares/authmiddleware.js";
import {
  categoryControlller,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

//routes
//create category
router.post(
  "/create-category",
  requiresingin,
  isAdmin,
  createCategoryController
);
//update category
router.put(
  "/update-category/:id",
  requiresingin,
  isAdmin,
  updateCategoryController
);

//get all category
router.get("/get-category", categoryControlller);

router.get("/single-category/:slug", singleCategoryController);
router.delete(
  "/delete-category/:id",
  requiresingin,
  isAdmin,
  deleteCategoryController
);

export default router;
