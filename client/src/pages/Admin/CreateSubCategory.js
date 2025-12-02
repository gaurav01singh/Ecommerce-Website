import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { Modal } from "antd";
import SubCategroyForm from "../../components/Form/SubCategoryForm";

const CreateSubCategory = () => {
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [keyword, setKeyword] = useState("");

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                ` https://ecommerce-website-beta-inky.vercel.app/api/v1/subcategory/update-sub-category/${selected._id}`,
                { name: updatedName, categoryId }
            );
            if (data.success) {
                toast.success(`${updatedName} is updated`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategory();
                getAllSubCategory(); // Refresh subcategories
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("somthing went wrong while updating");
        }
    }

    const handleDelete = async (pid) => {
        try {
            const { data } = await axios.delete(
                ` https://ecommerce-website-beta-inky.vercel.app/api/v1/subcategory/delete-sub-category/${pid}`
            );
            if (data.success) {
                toast.success("category is deleted");
                getAllCategory();
                getAllSubCategory(); // Refresh subcategories
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("somthing went wrong while updating");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(" https://ecommerce-website-beta-inky.vercel.app/api/v1/subcategory/create-sub-category", {
                name,
                categoryId,
            });
            if (data?.success) {
                toast.success(data.message);
                getAllSubCategory(); // Refresh subcategories
            } else {
                toast.error(data.message);
            }
        }
        catch (error) {
            toast.error("somthing went wrong in  input form");
        }
    }
    //get call categrory
    const getAllSubCategory = async () => {
        try {
            const { data } = await axios.get(" https://ecommerce-website-beta-inky.vercel.app/api/v1/subcategory/get-sub-category");
            if (data?.success) {
                setSubCategories(data.subCategory);
            }
        } catch (error) {
            toast.error("somthing went wrong in getting category");
        }
    };
    //get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(" https://ecommerce-website-beta-inky.vercel.app/api/v1/category/get-category");
            if (data?.success) {
                setCategories(data.category);
            }
        } catch (error) {
            toast.error("somthing went wrong in getting category");
        }
    }

    useEffect(() => {
        getAllCategory();
        getAllSubCategory();
    }, []);

    return (
        <Layout title={"Create Sub Category - Ecommerce App"}>
            <div className="container-fluid m-3 p-3 admin">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Create Sub Category</h1>
                        <div className="p-3 w-75">
                            <SubCategroyForm
                                handleSubmit={handleSubmit}
                                name={name}
                                setName={setName}
                                setCategoryId={setCategoryId}
                                categoryId={categoryId}
                                categories={categories}
                            />
                        </div>
                        <div className="w-75">
                            <input
                                type="search"
                                className="form-control mb-4"
                                placeholder="Search Sub Category..."
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subCategories
                                        ?.filter((c) => c.name.toLowerCase().includes(keyword.toLowerCase()))
                                        .map((c) => (
                                            <tr key={c._id}>
                                                <td>{c.name}</td>
                                                <td>{c.categoryId?.name}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-primary ms-2"
                                                        onClick={() => {
                                                            setVisible(true);
                                                            setUpdatedName(c.name);
                                                            setSelected(c);
                                                            setCategoryId(c.categoryId?._id);
                                                        }}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-danger ms-2"
                                                        onClick={() => {
                                                            handleDelete(c._id);
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* modal for update */}
            <Modal
                title={"Update Sub Category"}
                visible={visible}
                onCancel={() => setVisible(false)}
                footer={false}
            >
                <SubCategroyForm
                    handleSubmit={handleUpdate}
                    name={updatedName}
                    setName={setUpdatedName}
                    categories={categories}
                    categoryId={categoryId}
                    setCategoryId={setCategoryId}
                />
            </Modal>
        </Layout>
    );
}
export default CreateSubCategory;