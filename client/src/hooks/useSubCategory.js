import { useState, useEffect } from "react";
import axios from "axios";

export default function useSubCategory() {
  const [subCategories, setSubCategories] = useState([]);

  //get cat
  const getSubCategories = async () => {
    try {
      const { data } = await axios.get("https://ecommerce-website-beta-inky.vercel.app/api/v1/subcategory/get-sub-category");
      setSubCategories(data?.subCategory);
    } catch (error) {}
  };

  useEffect(() => {
    getSubCategories();
  }, []);

  return subCategories;
}
