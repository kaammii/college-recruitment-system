import React,{Component} from 'react';
import {login} from '../helpers/auth';

function loginError(error){
	return {
		loginMessage: error
	}
}

export default class Login extends Component{
	
	state = { loginMessage:null}

	submitHandler=(e)=>{
		e.preventDefault();
		let email = this.email.value;
		let pw = this.pw.value;
		login(email,pw)
			.catch((error)=> {
				this.setState(loginError('Invalid username/password.'));
			}) 
	}
	render(){
		return (
			<div className="col-md-offset-3 col-md-6" >
				<h1 className="text-center" >User Login</h1>
				<form onSubmit={this.submitHandler} className="form-group">
					<input type="email" ref={(email)=>this.email = email} placeholder="Enter Email" className="form-control"/><br/>
					<input type="password" ref={(pw)=>this.pw = pw} placeholder="Enter Password" className="form-control"/><br/>
					{this.state.loginMessage &&
					<div className="alert alert-danger">
						<span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              			<span className="sr-only">Error:</span>
						&nbsp;{this.state.loginMessage}
					</div>
					}
					<input type="submit" className="btn btn-lg btn-success" value="Login" />
				</form>
			</div>
			);
	}
}