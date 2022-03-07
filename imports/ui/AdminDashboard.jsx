import React from "react";
import AddBook from "./AddBook";
import AddAuthor from "./AddAuthor";
import Sales from "./Sales";

const AdminDashboard = () => {
  return (
    <div className="row">
      <div className="col-md-12">
        <h3 className="text-center">Admin Dashboard</h3>

        <div className="row">
          <div className="col-md-6 offset-3">
            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button
                  className="nav-link active"
                  id="nav-book-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-book"
                  type="button"
                  role="tab"
                  aria-controls="nav-book"
                  aria-selected="true"
                >
                  Add Book
                </button>
                <button
                  className="nav-link"
                  id="nav-author-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-author"
                  type="button"
                  role="tab"
                  aria-controls="nav-author"
                  aria-selected="false"
                >
                  Add Author
                </button>
                <button
                  className="nav-link"
                  id="nav-sale-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-sale"
                  type="button"
                  role="tab"
                  aria-controls="nav-sale"
                  aria-selected="false"
                >
                  Sales
                </button>
              </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade show active"
                id="nav-book"
                role="tabpanel"
                aria-labelledby="nav-book-tab"
              >
                <AddBook />
              </div>
              <div
                className="tab-pane fade"
                id="nav-author"
                role="tabpanel"
                aria-labelledby="nav-author-tab"
              >
                <AddAuthor />
              </div>
              <div
                className="tab-pane fade"
                id="nav-sale"
                role="tabpanel"
                aria-labelledby="nav-sale-tab"
              >
                <Sales />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
