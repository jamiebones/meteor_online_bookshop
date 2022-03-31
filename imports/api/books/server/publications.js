import { Meteor } from 'meteor/meteor';
import BookCollection from '../books';


Meteor.publish('books.allBooks', function allBooks () {
    //return all books in the collection
    return BookCollection.find();
});