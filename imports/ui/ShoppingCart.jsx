import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/ShoppingContext";
import { useHistory } from "react-router-dom";

const sumItems = (cart) => {
  return cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
};

const ShoppingCart = () => {
  const { cart, setCart } = useCart();
  const history = useHistory();

  const removeItemFromCart = (itemId) => {
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem._id !== itemId)
    );
  };

  const increaseItemQuantity = (itemId) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem._id === itemId
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  };

  const decreaseItemQuantity = (itemId) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem._id === itemId
          ? {
              ...cartItem,
              quantity: cartItem.quantity > 1 ? cartItem.quantity - 1 : 1,
            }
          : cartItem
      )
    );
  };


  return (
    <div>
      <section className="h-100 h-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12">
    
              <div
                className="card card-registration card-registration-2"
                style={{ borderRadius: 15 + "px" }}
              >
                <div className="card-body p-0">
                  <div className="row g-0">
                    <div className="col-lg-8">
                      <div className="p-5">
                        <div className="d-flex justify-content-between align-items-center mb-5">
                          <h1 className="fw-bold mb-0 text-black">
                            Shopping Cart
                          </h1>
                          <h6 className="mb-0 text-muted">
                            {cart.length} items
                          </h6>
                        </div>

                        {cart.length === 0 && (
                          <p className="lead text-primary">
                            No items in your cart
                          </p>
                        )}

                        {cart.map(
                          ({
                            authors,
                            coverImage,
                            price,
                            quantity,
                            title,
                            _id,
                            bookurl
                          }) => {
                            return (
                              <React.Fragment key={_id}>
                                <hr className="my-4" />
                                <div
                                  className="row mb-4 d-flex justify-content-between 
                                align-items-center"
                                >
                                  <div className="col-md-3 col-lg-3 col-xl-3">
                                    { bookurl === "not set" ? (
                                       <img
                                      className="img-fluid rounded-3"
                                      src={coverImage}
                                      alt={`image for ${title}`}
                                    />
                                    ) : 
                                       <img
                                      className="img-fluid rounded-3"
                                      src={`data:image/png;base64, ${coverImage}`}
                                      alt={`image for ${title}`}
                                    />
                                    }
          
                                    {authors.map((author) => {
                                      return (
                                        <p
                                          className="text-primary"
                                          key={author.authorId}
                                        >
                                          <i>{author.name}</i>
                                        </p>
                                      );
                                    })}
                                  </div>
                                  <div className="col-md-3 col-lg-3 col-xl-3">
                                    <h6 className="text-black mb-0">{title}</h6>
                                  </div>
                                  <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                    <button
                                      className="btn btn-link px-2"
                                      onClick={() => decreaseItemQuantity(_id)}
                                    >
                                      <i className="fas fa-minus"></i>
                                    </button>

                                    <input
                                      id="form1"
                                      min="0"
                                      name="quantity"
                                      value={quantity}
                                      readOnly
                                      type="number"
                                      className="form-control form-control-sm"
                                    />

                                    <button
                                      className="btn btn-link px-2"
                                      onClick={() => increaseItemQuantity(_id)}
                                    >
                                      <i className="fas fa-plus"></i>
                                    </button>
                                  </div>
                                  <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                    <h6 className="mb-0">
                                      $ {price * quantity}
                                    </h6>
                                  </div>
                                  <div
                                    className="col-md-1 col-lg-1 col-xl-1 text-end"
                                    onClick={() => removeItemFromCart(_id)}
                                  >
                                    <a href="#!" className="text-muted">
                                      <i className="fas fa-times"></i>
                                    </a>
                                  </div>
                                </div>
                                <hr className="my-4" />
                              </React.Fragment>
                            );
                          }
                        )}

                        <div className="pt-5">
                          <h6 className="mb-0">
                            <Link to="/" className="text-body">
                              <i className="fas fa-long-arrow-alt-left me-2"></i>
                              Back to shop
                            </Link>
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-lg-4 bg-grey"
                      style={{ maxHeight: 500 + "px" }}
                    >
                      <div className="p-5">
                        <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                        <hr className="my-4" />

                        <div className="d-flex justify-content-between mb-4">
                          <h5 className="text-uppercase">
                            items {cart.length}
                          </h5>
                          <h5>$ {sumItems(cart)}.00</h5>
                        </div>

                        <hr className="my-4" />

                        {cart.length > 0 && (
                          <React.Fragment>
                            <div className="d-flex justify-content-between mb-4">
                              <h5 className="text-uppercase">Shipping</h5>
                              <h5>$ 2.00</h5>
                            </div>
                            <hr className="my-4" />

                            <div className="d-flex justify-content-between mb-5">
                              <h5 className="text-uppercase">Total price</h5>
                              <h5>$ {sumItems(cart) + 2}.00</h5>
                            </div>

                            <button
                              type="button"
                              className="btn btn-dark btn-block btn-lg"
                              data-mdb-ripple-color="dark"
                              onClick={()=>history.push("/init_payment")}
                          
                            >
                             Checkout
                            </button>
                          </React.Fragment>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShoppingCart;
