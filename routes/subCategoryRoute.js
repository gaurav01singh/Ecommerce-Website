import express from 'express';
import {
  createSubCategoryController,
  deleteSubCategoryController,
  singleSubCategoryController,
  getSubCategoryController,
  updateSubCategoryController,
} from '../controllers/categoryController.js';

import { isAdmin, requiresingin } from '../middlewares/authmiddleware.js';

const router = express.Router();

//test route
router.get('/test', (req, res) => {
  res.send('Protected route');
});
//create sub category
router.post(
  '/create-sub-category',
  requiresingin,
  isAdmin,
  createSubCategoryController
);
//update sub category
router.put(
  '/update-sub-category/:id',
  requiresingin,
  isAdmin,
  updateSubCategoryController
);
//get sub category
router.get('/get-sub-category', getSubCategoryController);
//get sub category by category
router.get(
  '/get-sub-category/:categoryId',
  getSubCategoryController
);
//get single sub category
router.get(
  '/single-sub-category/:id',
  singleSubCategoryController
);
//delete sub category
router.delete(
  '/delete-sub-category/:id',
  requiresingin,
  isAdmin,
  deleteSubCategoryController
);
export default router;