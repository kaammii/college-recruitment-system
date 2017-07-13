import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import firebase from 'firebase';
import registerServiceWorker from './registerServiceWorker';
import App  from './App';
  
import Navigation from './navigation';
import Register from './components/Register';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';


ReactDOM.render(
	  <Register />
	, 
	document.getElementById('root'));
registerServiceWorker();
