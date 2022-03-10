import React from "react";

const Dashboard = ({ user, authenticated, ...rest }) => {
  return (
    <div className="row">
      <div className="col-md-8 offset-md-2">
        <h3 className="text-primary">
          Welcome , {user && user.username.toUpperCase()}
        </h3>

        <p className="text-center lead">
          List of books bought{" "}
          <span>
            <b>(6)</b>
          </span>
        </p>

        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <img
                src="https://via.placeholder.com/90x50"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title text-center">Mastering Javascript</h5>

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
                  <span className="text-primary">Min chu</span>
                  <span className="text-primary">Florence Stacey</span>
                </p>

                <button type="button" className="btn btn-success float-end">
                  Download pdf
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-4">
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

                <button type="button" className="btn btn-success float-end">
                  Download pdf
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
