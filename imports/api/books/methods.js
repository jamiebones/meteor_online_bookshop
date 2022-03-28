import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import BooksCollection from "./books";


Meteor.methods({
    "books.insertNewBook": function insertBook( book ){
        check(book,Object);
        return BooksCollection.insert(book);
    }
});