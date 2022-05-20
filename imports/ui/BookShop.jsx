import React from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import BooksCollection from "../api/books/books";
import { useCart } from "../context/ShoppingContext";

const BookShop = () => {
  const { cart, setCart } = useCart();

  const { books, loading } = useTracker(() => {
    const handle = Meteor.subscribe("books.allBooks");
    return {
      loading: !handle.ready(),
      books: BooksCollection.find().fetch(),
    };
  });

  const addItemToCart = (item) => {
    //check if the item is already in the cart
    const isInCart = cart.find((cartItem) => cartItem._id === item._id);
    if (isInCart) {
      //if it is, increase the quantity
      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      //if it is not, add it to the cart
      setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
    }
  };

  return (
    <div className="row">
      <div className="col-md-8 offset-md-2">
        <h1>Welcome to the online Bookshop</h1>
        <div className="row">
          {loading && <div className="loading-books">Loading...</div>}

          {console.log("books", books)}

          {books &&
            books.map((book) => {
              return (
                <div className="col-md-3" key={book._id}>
                  <div className="book-card">
                    <div className="card">
                      {book.bookurl == "not set" ? (
                         <img
                          src={book.coverImage}
                          className="card-img-top"
                          alt={`image for ${book.title}`}
                        />
                      ) : (
                        <img
                          src={`data:image/png;base64, ${book.coverImage}`}
                          className="card-img-top"
                          alt={`image for ${book.title}`}
                        />
                      )}
                      <div className="card-body">
                        <h5 className="card-title text-center">
                          {book.title.toUpperCase()}
                        </h5>

                        <p className="card-text d-flex flex-column text">
                          <span className="mb-1">
                            <i>Description:</i>
                          </span>

                          <span>{book.description}</span>
                        </p>

                        <p className="d-flex flex-row">
                          {book.authors.map((author) => {
                            return (
                              <span
                                className="text-primary"
                                key={author.authorId}
                              >
                                <i>{author.name}</i>
                              </span>
                            );
                          })}
                        </p>

                        <p className="d-flex">
                          <i className="mb-1">Price:</i> &nbsp;
                          <span className="text-danger">${book.price}</span>
                        </p>

                        <div
                          className="btn-group"
                          role="group"
                          aria-label="Basic mixed styles example"
                        >
                          <button
                            type="button"
                            className="btn btn-warning"
                            onClick={() => addItemToCart(book)}
                          >
                            Add to cart
                          </button>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default BookShop;
