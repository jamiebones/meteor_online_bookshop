import React from "react";

const AddBook = () => {
  return (
    <div>
      <h2>Add Book</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Book title</label>
          <input
            type="text"
            className="form-control"
            placeholder="book title..."
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Select author</label>
          <select className="form-control">
            <option>Select author</option>
          </select>
          <div className="d-flex">
            <p className="author-label">
              Author minasket{" "}
              <span>
                <>&#10060;</>
              </span>
            </p>

            <p className="author-label">
              Flavor B{" "}
              <span>
                <>&#10060;</>
              </span>
            </p>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" rows="4"></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">
            <span className="text-primary">$</span> Book Price{" "}
          </label>
          <input type="number" className="form-control" placeholder="0.00" />
        </div>

        <div className="mb-3">
          <label className="form-label">Upload book cover </label>
          <input type="file" className="form-control" />
        </div>

        <div className="mb-3">
          <button className="btn btn-success">save book</button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
