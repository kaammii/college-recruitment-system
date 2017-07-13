import React,{Component} from 'react';
import {auth,otherInfo} from '../helpers/auth';

function setErrorMsg(error){
	return {
		registerError: error.message
	}
}

export default class Register extends Component{
	
	state = {registerError: null}

	handleSubmit=(e)=>{
		e.preventDefault();
		let email = this.email.value;
		let pw = this.pw.value;
		let companyName = this.companyName.value;
		
		var info = {
			email: email,
			pw: pw,
			companyName
		}
		otherInfo('hrlo');
		auth(email,pw).catch(e=>this.setState(setErrorMsg(e)))
		
	}	

	render(){
		return(
			
			<div className="col-md-offset-3 col-md-6" >
				<h1 className="text-center" >Student Registration</h1>
				<form onSubmit={this.handleSubmit} className="form-group">
					<input type="email" placeholder="Enter Email" className="form-control" ref={(email)=>this.email=email} /><br/>
					<input type="password" placeholder="Enter Password" className="form-control" ref={(pw)=>this.pw=pw} /><br/>
					<input type="text" placeholder="Enter Company Name" className="form-control" ref={(companyName)=>this.companyName=companyName} /><br/>

					{
			            this.state.registerError &&
			            <div className="alert alert-danger" role="alert">
			              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
			              <span className="sr-only">Error:</span>
			              &nbsp;{this.state.registerError}
			            </div>
			          }
					<input type="submit" className="btn btn-success btn-lg"/>
				</form>
			</div>

			);
	}
}