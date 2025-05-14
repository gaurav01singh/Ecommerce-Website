import React from "react";

const SubCategroyForm = ({
  name,
  setName,
  handleSubmit,
  categories,
  setCategoryId,
  categoryId,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Enter Sub Category
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Sub Category Name"
        />
      </div>
      <div className="mb-3">
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option>Select Category</option>
          {categories?.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default SubCategroyForm;
