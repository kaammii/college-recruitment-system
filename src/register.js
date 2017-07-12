import React, { Component } from 'react';
import firebase from 'firebase';

class Register extends Component{
	constructor (props){
		super(props);
	this.state = {
		selected: '',
		errorMessage: ''
		}
	}


	setGender=(event)=>{
			this.setState({
				selected: event.target.value 
			});
		}

	register=(e)=>{
		e.preventDefault();
		let email= this.refs.email.value;
		let password = this.refs.password.value;
		let selected = this.state.selected;
		firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  
		  console.log(errorCode);
		  console.log(errorMessage);
		  // ...
		});
		firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
		    firebase.database().ref('users/'+user.uid).set({
				email: email,
				accountType: selected
		    });
		  }
		});
	}
	

	render(){
		return(
			<div className="container">
				<div className="row">
					<div className="col-md-offset-3 col-md-6">
						<h1 className="text-center" >Registration Form</h1>
						<form className="form-group">
							
							<label>Email: </label>
							<input type="email" placeholder="Email address" className="form-control" ref="email" /><br />
							<label>Password: </label>
							<input type="password" placeholder="password" className="form-control" ref="password" /><br />
							<div onChange={event => this.setGender(event)}>
						        <input type="radio" value="MALE" name="gender"/> Male
						        <input type="radio" value="FEMALE" name="gender"/> Female
					        </div>
							<input type="button" value="Register" onClick={this.register} className="btn btn-success"/>	
						</form>
					</div>
				</div>
			</div>
			);
	}
}

export default Register;