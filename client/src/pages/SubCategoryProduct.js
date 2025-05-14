import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import useSubCategory from "../hooks/useSubCategory";

const SubCategoryProduct = () => {
  const navigate = useNavigate();
  const subCategories = useSubCategory();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const params = useParams();
  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);
  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        ` https://ecommerce-website-beta-inky.vercel.app/api/v1/product/product-sub-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {}
  };
  return (
    <Layout>
      <div className="conatiner" style={{ marginTop: "100px" }}>
        {/* subcategorys only related to category*/}
        <h4 className="text-center">Category -{category?.name}</h4>
        <div className="d-flex flex-wrap">
          {subCategories
            ?.filter((sub) => sub.categoryId._id === category?._id)
            ?.map((sub) => (
              <div
                key={sub._id}
                className="card m-2"
                style={{
                  width: "18rem",
                  cursor: "pointer",
                  margin: "10px",
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgb(156 206 255)",
                }}
                onClick={() => navigate(`/subcategory/${sub.slug}`)}
              >
                {sub.name}
              </div>
            ))}
        </div>
        <h6 style={{
          marginTop: "20px",
          marginBottom: "20px",
          textAlign: "center",
          fontSize: "20px",
          fontWeight: "bold",
          // color: "rgb(156 206 255)",
          backgroundColor: "rgb(156 206 255)",
          padding: "10px",
          borderRadius: "5px",
          width: "fit-content",
          margin: "0 auto",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          transition: "0.3s",
          "&:hover": {
            transform: "scale(1.05)",
          },
          border: "1px solid rgb(156 206 255)",

         }}>{products?.length} Product Found</h6>
        <div className="row">
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div key={p._id} className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={` https://ecommerce-website-beta-inky.vercel.app/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text">Rs.{p.price}</p>
                  <button
                    className="btn btn-primary ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button className="btn btn-secondary ms-1">
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SubCategoryProduct;
