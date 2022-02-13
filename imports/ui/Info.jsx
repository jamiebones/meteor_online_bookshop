import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { LinksCollection } from '../api/links/links.js';

export const Info = () => {
  
    const {loading, links } = useTracker(() => {
    const subscription = Meteor.subscribe('links.allLinks');
    const data = LinksCollection.find({}).fetch();
    return { links: data, loading: !subscription.ready() };
    
 
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Learn Meteor!</h2>
      <ul>{links.map(
        link => <li key={link._id}>
          <a href={link.url} target="_blank">{link.title}</a>
        </li>
      )}</ul>
    </div>
  );
};
