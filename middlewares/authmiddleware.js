import JWT from "jsonwebtoken";
import userModel from "../models/usermodel.js";

//protect routes token base
export const requiresingin = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {}
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ _id: req.user._id });
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "User not found",
      });
    }
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in admin middleware",
      error: error.message,
    });
  }
};
