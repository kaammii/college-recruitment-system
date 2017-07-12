import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import firebase from 'firebase';
import registerServiceWorker from './registerServiceWorker';
import App  from './App';
import Register from './register';
import Navigation from './navigation';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

 // Initialize Firebase
var config = {
    apiKey: "AIzaSyBuM_MHEuswoK_b_RzzqieP_yAKaDhuJ44",
    authDomain: "campus-recruitment-syste-4081b.firebaseapp.com",
    databaseURL: "https://campus-recruitment-syste-4081b.firebaseio.com",
    projectId: "campus-recruitment-syste-4081b",
    storageBucket: "campus-recruitment-syste-4081b.appspot.com",
    messagingSenderId: "391159743567"
  };
  firebase.initializeApp(config);

ReactDOM.render(
	  <Router>
        <div>
          <Navigation />
          <Route exact path="/" component={App} />
          <Route path="/register" component={Register} />
        </div>
      </Router>
	, 
	document.getElementById('root'));
registerServiceWorker();
