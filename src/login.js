import React, { Component } from 'react';
import firebase from 'firebase';

class Login extends Component {
	render(){
		return (
				<div className="container">
				<div className="row">
					<div className="col-md-offset-3 col-md-6">
						<h1 className="text-center" >Login </h1>
						<form className="form-group">
							
							<label>Email: </label>
							<input type="email" placeholder="Email address" className="form-control" ref="email" /><br />
							<label>Password: </label>
							<input type="password" placeholder="password" className="form-control" ref="password" /><br />
							<input type="button" value="Register" onClick={this.login} className="btn btn-success"/>	
						</form>
					</div>
				</div>
			</div>
			);
	}
}

export default Login;