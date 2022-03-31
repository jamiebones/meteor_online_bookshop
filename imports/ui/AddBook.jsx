import React, { useState } from "react";

import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import AuthorCollection from "../api/authors/authors";

import UploadComponent from "./UploadComponent";

const searchFirstNameFunction = (collection, searchTerm) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(collection.find({ firstname: searchTerm }).fetch());
    }, 100)
  );

const AddBook = () => {
  const [bookTitle, setTitle] = useState("");
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [authorFirstName, setAuthorFirstName] = useState("");
  const [description, setDescription] = useState("");
  const [bookPrice, setBookPrice] = useState("");
  const [bookDetailsSave, setBookDetailsSave] = useState(false);
  const [bookDetails, setBookDetails] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);

  useTracker(async () => {
    const handle = Meteor.subscribe("authors.findAuthor", authorFirstName);
    setLoading(!handle.ready());
    let searchTerm = new RegExp(authorFirstName, "i");
    if (handle.ready() && authorFirstName.length > 2) {
      const authors = await searchFirstNameFunction(
        AuthorCollection,
        searchTerm
      );
      setAuthors(authors);
    }
  }, [authorFirstName]);

  const handleTextInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "authorFirstName":
        setAuthorFirstName(value);
        break;
      case "bookTitle":
        setTitle(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "bookPrice":
        setBookPrice(value);
        break;
    }
  };

  const submitBookDetails = (e) => {
    e.preventDefault();
    //gather all the book details
    let authors = selectedAuthors.map((a) => {
      let author = {
        authorId: a._id,
        name: `${a.firstname} ${a.surname}`,
      };
      return author;
    });
    const bookDetails = {
      title: bookTitle,
      description: description,
      authors: authors,
      price: bookPrice,
    };
    //perform validation of the book details
    if (!bookTitle) {
      alert("Please enter a title for the book");
      return;
    }
    if (!description) {
      alert("Please enter a description for the book");
      return;
    }
    if (!bookPrice) {
      alert("Please enter a price for the book");
      return;
    }
    if (authors.length == 0) {
      alert("please select an author");
    }
    Meteor.call(
      "books.insertNewBook",
      bookDetails,

      (err, bookId) => {
        if (!err) {
          setBookPrice("");
          setDescription("");
          setTitle("");
          setSelectedAuthors([]);
          setAuthorFirstName("");
          setBookDetailsSave(true);
          setBookDetails({
            bookId: bookId,
            title: bookTitle,
          });
        }
      }
    );
  };

  const handleAuthorSelect = (author) => {
    setAuthors((authors) => {
      return authors.filter((a) => a._id !== author._id);
    });
    setSelectedAuthors((selectedAuthors) => {
      const filterAuthors = selectedAuthors.filter((a) => a._id !== author._id);
      setAuthorFirstName("");
      return [...filterAuthors, author];
    });
  };

  const removeSelectedAuthor = (author) => {
    setSelectedAuthors((selectedAuthors) => {
      const filterAuthors = selectedAuthors.filter((a) => a._id !== author._id);
      return filterAuthors;
    });
  };

  const closeUploadComponent = () => {
    //close the upload component here
    setBookDetails(null);
    setBookDetailsSave(false);
  };

  return (
    <div>
      <h2>Add Book</h2>

      <form onSubmit={submitBookDetails}>
        <div className="mb-3">
          <label className="form-label">Book title</label>
          <input
            type="text"
            className="form-control"
            placeholder="book title..."
            name="bookTitle"
            onChange={handleTextInputChange}
            value={bookTitle}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">
            Search author using the first name
          </label>
          <input
            type="text"
            className="form-control"
            name="authorFirstName"
            value={authorFirstName}
            onChange={handleTextInputChange}
          />
        </div>

        {authors.length > 0 && (
          <div className="authors-div">
            {loading ? (
              <p className="text-center lead">list loading....</p>
            ) : null}

            {authors.length > 0 && (
              <p>click on the author's name to select it</p>
            )}
            {authors.map((author) => {
              return (
                <p
                  key={author._id}
                  className="select-author"
                  onClick={() => handleAuthorSelect(author)}
                >
                  {author.firstname} &nbsp;
                  {author.surname}
                </p>
              );
            })}
          </div>
        )}

        {authorFirstName.length > 2 && authors.length === 0 && (
          <p className="lead text-primary">No data</p>
        )}

        <div className="selected-authors-div">
          {selectedAuthors && selectedAuthors.length > 0 && (
            <p className="text-center lead">Selected Authors</p>
          )}
          {selectedAuthors &&
            selectedAuthors.map((author) => {
              return (
                <p
                  key={author._id}
                  className="author-div d-flex justify-content-between"
                >
                  <span>
                    {author.firstname} {author.surname}
                  </span>

                  <span
                    className="remove align-self-end"
                    onClick={() => removeSelectedAuthor(author)}
                  >
                    <>&#10060;</>
                  </span>
                </p>
              );
            })}
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            onChange={handleTextInputChange}
            value={description}
            rows="4"
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">
            <span className="text-primary">$</span> Book Price{" "}
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="0.00"
            name="bookPrice"
            onChange={handleTextInputChange}
            value={bookPrice}
          />
        </div>
        {!bookDetailsSave && (
          <div className="mb-3">
            <button className="btn btn-success" type="submit">
              save book
            </button>
          </div>
        )}

        {bookDetailsSave && (
          <div>
            <hr />
            <p className="text-center lead">
              Upload book cover and pdf copy for{" "}
              {bookDetails && bookDetails.title.toUpperCase()}
            </p>
            <div className="mb-3">
              <label className="form-label">Upload book cover </label>
              <UploadComponent
                bookId={bookDetails && bookDetails.bookId}
                closeUploadComponent={closeUploadComponent}
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddBook;
