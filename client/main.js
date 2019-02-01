import { Meteor } from 'meteor/meteor'
import React from 'react';
import ReactDOM from 'react-dom';
import { Tracker} from 'meteor/tracker';
import { Session } from 'meteor/session';

import Routes from '../import/routing/Routes';
import { onAuthentificationChange } from '../import/routing/Authentification' 
import './main.html';
import '../import/startup/simple-chema-configuration';

Tracker.autorun(() => {
  const isAuthentificated = !!Meteor.userId();
  onAuthentificationChange(isAuthentificated);
});

Meteor.startup(() => {
  Session.set('showVisible', true);
  ReactDOM.render(<Routes/>, document.getElementById('app'));
});
//metody służą do bezpieczengo umieszczania danych w mongoDB - sprawdzanie czy użytkonika ma dostęp i czy dane są poprawne
//kiedy wywołamy metoda meteora jest o stronie klienta mówi serwerowi żby uruchomił ją u
//uruchomił metode. Metoda jest uruchomiana na serwerz i kliencie
//kiedy wywołamy po stronie serwera działa tylko na serwerze 