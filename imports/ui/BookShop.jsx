import React from "react";

const BookShop = () => {
  return (
    <div className="row">
      <div className="col-md-8 offset-md-2">
        <h1>Welcome to the online Bookshop</h1>

        <div className="row">
          <div className="col-md-3">
            <div className="card">
              <img
                src="https://via.placeholder.com/90x50"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title text-center">The Client</h5>

                <p className="card-text d-flex flex-column">
                  <span className="mb-1">
                    <i>Description:</i>
                  </span>

                  <span>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </span>
                </p>

                <p className="d-flex flex-column">
                  <i className="mb-1">Author(s)</i>
                  <span className="text-primary">John Grisham</span>
                  <span className="text-primary">John Grisham</span>
                </p>

                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic mixed styles example"
                >
                  <button type="button" className="btn btn-warning">
                    Add to cart
                  </button>
                  <button type="button" className="btn btn-success">
                    Buy now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookShop;
