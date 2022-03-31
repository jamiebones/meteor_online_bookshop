import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import BooksCollection from "../api/books/books";

const BookShop = () => {
  const { books, loading } = useTracker(() => {
    const handle = Meteor.subscribe("books.allBooks");
    return {
      loading: !handle.ready(),
      books: BooksCollection.find().fetch(),
    };
  });

  return (
    <div className="row">
      <div className="col-md-8 offset-md-2">
        <h1>Welcome to the online Bookshop</h1>
        {console.log("books", books)}
        <div className="row">
          {loading && <div className="loading-books">Loading...</div>}

          {books &&
            books.map((book) => {
              return (
                <div className="col-md-3" key={book._id}>
                  <div className="book-card">
                    <div className="card">
                      <img
                        src={`data:image/png;base64, ${book.coverImage}`}
                        className="card-img-top"
                        alt="..."
                      />
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
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default BookShop;
