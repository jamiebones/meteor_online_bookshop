import React from "react";

const AddAuthor = () => {
  return (
    <div>
      <h2>Add Author</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Author name</label>
          <input type="text" className="form-control" />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" />
        </div>

        <label className="form-label">Phone</label>
        <div className="input-group mb-3">
          <input type="number" className="form-control" />
          <span className="input-group-text">+</span>
        </div>

        <div className="mb-3">
          <label className="form-label">Contact address</label>
          <textarea rows="3" type="text" className="form-control" />
        </div>

        <div className="mb-3 text-center">
          <button type="submit" className="btn btn-success">
            Save author data
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAuthor;
