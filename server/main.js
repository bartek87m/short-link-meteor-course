import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../import/api/users';
import { Links } from '../import/api/links';
import '../import/startup/simple-chema-configuration';

Meteor.startup(() => {
  // code to run on server at startup

  WebApp.connectHandlers.use((req, res, next) => { //kod odpowiedzialny za przekierowanie na podaną stronę
    console.log(req.url.slice(1));
    const _id = req.url.slice(1);
    const link = Links.findOne({_id});
    
    if(link) {
      res.statusCode = 302;
      res.setHeader('location',link.url);
      res.end();
      Meteor.call('links.trackVisit', _id);
    }else {
      next();
    }
  });

});
