import express from "express";
import formidable from "express-formidable";
import { isAdmin, requiresingin } from "../middlewares/authmiddleware.js";
import {
  brainTreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  realtedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";

const router = express.Router();

//routes
router.post(
  "/create-product",
  requiresingin,
  isAdmin,
  formidable(),
  createProductController
);
router.put(
  "/update-product/:pid",
  requiresingin,
  isAdmin,
  formidable(),
  updateProductController
);
router.get("/get-product", getProductController);
router.get("/get-product/:slug", getSingleProductController);
router.get("/product-photo/:pid", productPhotoController);
router.delete("/delete-product/:pid", deleteProductController);
router.post("/product-filters", productFiltersController);
router.get("/product-count", productCountController);
router.get("/product-list/:page", productListController);
router.get("/search/:keyword", searchProductController);
router.get("/related-product/:pid/:cid", realtedProductController);
router.get("/product-category/:slug", productCategoryController);
//payment
//token
router.get("/braintree/token", braintreeTokenController);
router.post("/braintree/payment", requiresingin, brainTreePaymentController);
export default router;
