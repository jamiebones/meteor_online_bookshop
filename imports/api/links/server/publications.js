import { Meteor } from 'meteor/meteor';
import { LinksCollection  } from '../links';


Meteor.publish('links.allLinks', function linkPublications() {
    return LinksCollection.find();
});