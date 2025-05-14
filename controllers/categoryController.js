import categoryModel from "../models/categorymodel.js";
import subCategoryModel from "../models/subCategoryModel.js";
import slugify from "slugify";
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category Already Exisits",
      });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "new category created",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      errro,
      message: "Errro in Category",
    });
  }
};

//create sub category
export const createSubCategoryController = async (req, res) => {
  try {
    const { name, categoryId } = req.body;
    if (!name || !categoryId) {
      return res.status(401).send({ message: "Name and Category ID is required" });
    }
    const existingCategory = await subCategoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Sub Category Already Exisits",
      });
    }
    const subCategory = await new subCategoryModel({
      name,
      slug: slugify(name),
      categoryId,
    }).save();
    res.status(201).send({
      success: true,
      message: "new Sub category created",
      subCategory,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      errro,
      message: "Errro in Sub Category",
    });
  }
}

//update category
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      messsage: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating category",
    });
  }
};

// get all sub category 
export const getSubCategoryController = async (req, res) => {
  try {
    const subCategory = await subCategoryModel
      .find({ }).populate("categoryId")
    res.status(200).send({
      success: true,
      message: "All Sub Categories List",
      subCategory,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all sub categories",
    });
  }
};
// get sub category by category
export const getSubCategoryByCategoryController = async (req, res) => {
  try {
    const subCategory = await subCategoryModel
      .find({ categoryId: req.params.categoryId })
      .populate("categoryId");
    res.status(200).send({
      success: true,
      message: "All Sub Categories List",
      subCategory,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all sub categories",
    });
  }
};

//update sub category
export const updateSubCategoryController = async (req, res) => {
  try {
    const {name,categoryId} = req.body;
    const { id } = req.params;
    const subCategory = await subCategoryModel.findById(id);
    if (!subCategory) {
      return res.status(404).send({
        success: false,
        message: "Sub Category Not Found",
      });
    }
    if(name){
      subCategory.name = name;
      subCategory.slug = slugify(name);

    }
    if(categoryId){
      subCategory.categoryId = categoryId;
    }
    const updatedSubCategory = await subCategory.save();
    res.status(200).send({
      success: true,
      message: "Sub Category Updated Successfully",
      updatedSubCategory,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating sub category",
    });
  }
};

// get all cat
export const categoryControlller = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All Categories List",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories",
    });
  }
};

// single category
export const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Get SIngle Category SUccessfully",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single Category",
    });
  }
};
// single sub category
export const singleSubCategoryController = async (req, res) => {
  try {
    const subCategory = await subCategoryModel
      .findOne({ slug: req.params.slug })
      .populate("categoryId");
    res.status(200).send({
      success: true,
      message: "Get SIngle Sub Category SUccessfully",
      subCategory,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single Sub Category",
    });
  }
};

//delete category
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Categry Deleted Successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error while deleting category",
      error,
    });
  }
};
//delete sub category
export const deleteSubCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await subCategoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Sub Categry Deleted Successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error while deleting Sub category",
      error,
    });
  }
};
