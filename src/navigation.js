import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class Navigation extends Component {
	constructor(props){
		super(props);
	}
	render(){
		return (
			<Router>
				
			<div>
				<nav className="navbar navbar-default">
				  <div className="container-fluid">
				    <div className="navbar-header">
				       <Link to="/" className="navbar-brand">Campus Recruitment System</Link>
				    </div>
				    <ul className="nav navbar-nav navbar-right">
				      <li><Link exact to="/register">Register</Link></li>
				      <li><Link to="/">Login</Link></li>
				    </ul>
				  </div>
				</nav>
			</div>
			
			</Router>
			);
	}
}

export default Navigation;