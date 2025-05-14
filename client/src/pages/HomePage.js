import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/prices";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import "../styles/HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false); // State to manage filter visibility
  const [kidsProducts, setKidsProducts] = useState([]);
  const [banners] = useState([
    "/images/banner1.jpg",
    "/images/banner2.jpg",
    "/images/banner3.jpg",
    "/images/banner4.jpg",
    "/images/banner5.png",
    // Add more banners as needed
  ]);

  // Fetch kids' products

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        " https://ecommerce-website-beta-inky.vercel.app/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {}
  };
  const getKidsProducts = async () => {
    try {
      const { data } = await axios.get(
        " https://ecommerce-website-beta-inky.vercel.app/api/v1/product/product-category/kids-collection"
      );
      setKidsProducts(data.products);
    } catch (error) {}
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
    getKidsProducts();
  }, []);

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        ` https://ecommerce-website-beta-inky.vercel.app/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        " https://ecommerce-website-beta-inky.vercel.app/api/v1/product/product-count"
      );
      setTotal(data?.total);
    } catch (error) {}
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        ` https://ecommerce-website-beta-inky.vercel.app/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filtered product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        " https://ecommerce-website-beta-inky.vercel.app/api/v1/product/product-filters",
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {}
  };

  return (
    <Layout title={"Shopy - Best offers "}>
      {/* banner image */}
      <div className="css-carousel">
  <div className="carousel-container">
    {banners.map((banner, index) => (
      <div className="carousel-slide" key={index}>
        <img
          src={banner}
          className="banner-img"
          alt={`banner-${index}`}
          width={"100%"}
        />
      </div>
    ))}
  </div>
</div>
          <button
            className={`btn btn-primary filter-btn ${showFilters ? "show" : ""}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? "✖ Close Filters" : "☰ Filters"}
          </button>
      {/* banner image */}
      <div className="container-fluid row mt-3 home-page">
        {/* <div className="filters"> */}
          {/* Button to toggle filters */}
          {/* Floating Button for Filters */}
            

          {/* Filters */}
          <div className={`filters-panel ${showFilters ? "show" : ""}`}>
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="text-center">Filters</h4>
              <button
                className="btn btn-danger"
                onClick={() => setShowFilters(false)}
              >
                ✖
              </button>
              </div>
            <div className="d-flex flex-column">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
            <h4 className="text-center mt-4">Filter By Price</h4>
            <div className="d-flex flex-column">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        {/* </div> */}
        <div className="Kids-section">
          <h1 className="text ">Best Products For Kids</h1>
          <div className=" Products-section ">
            {kidsProducts?.map((p) => (
              <div className="card" key={p._id} onClick={() => navigate(`/product/${p.slug}`)} >
                <img
                  src={` https://ecommerce-website-beta-inky.vercel.app/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{ objectFit: "scale-down" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  
                  <p className="card-text">
                    {p.description.substring(0, 60)}...
                  </p>
                  <div className="d-flex align-items-center justify-content-center">
                  <h5 className="card-title card-price">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </h5>
                  <button
                    className="btn btn-dark ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added to cart");
                    }}
                  >
                    ADD TO CART
                  </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container-fluid row mt-3 home-page">
        <h1 className="text-center">All Products</h1>
        <div className="d-flex flex-wrap justify-content-center align-items-center">
          {products?.map((p) => (
            <div class="card" key={p._id}>
              <div class="card-block">
                <img
                  src={` https://ecommerce-website-beta-inky.vercel.app/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{
                    // height: "200px",
                    // width: "100%",
                    objectFit: "scale-down",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title card-price">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </h5>
                  <p className="card-text ">
                    {p.description.substring(0, 60)}...
                  </p>
                </div>

                <div className="card m-2">
                  <div className="card-name-price">
                    <button
                      className="btn btn-info ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-dark ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="m-2 p-3">
          {products && products.length < total && (
            <button
              className="btn loadmore"
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
            >
              {loading ? (
                "Loading ..."
              ) : (
                <>
                  {" "}
                  Loadmore <AiOutlineReload />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
