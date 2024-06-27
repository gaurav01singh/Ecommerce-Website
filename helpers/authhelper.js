import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  try {
    const saltrounds = 5;
    const hashedpassword = await bcrypt.hash(password, saltrounds);
    return hashedpassword; // Return the hashed password
  } catch (error) {
    throw error; // Rethrow the error to handle it in the calling function
  }
};

export const comparePassword = async (password, hashedpassword) => {
  try {
    return await bcrypt.compare(password, hashedpassword);
  } catch (error) {
    throw error;
  }
};
