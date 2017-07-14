import React,{Component} from 'react';
import {studentAuth,compAuth} from '../helpers/auth';

function setErrorMsg(error){
	return {
		registerError: error.message
	}
}

export default class Register extends Component{
	
	state = {
		registerError: null,
		selectOption: ''
	}

	handleSubmit=(e)=>{
		e.preventDefault();
		
		
		if (this.state.selectOption==='student') {
			
		let email = this.email.value;
		let pw = this.pw.value;
		let name = this.name.value;
		let qual = this.qual.value;
		let inst = this.inst.value;

		studentAuth(email,pw,name,qual,inst).catch(e=>this.setState(setErrorMsg(e)));
		} else if(this.state.selectOption==='company'){
			let email = this.email.value;
			let pw = this.pw.value;
			let cname = this.cname.value;
			let address = this.address.value;

			compAuth(email,pw,cname,address).catch(e=>this.setState(setErrorMsg(e)));
		}
		
	}	
	changeHandler=(e)=>{
		this.setState({
			selectOption:e.target.value
		})
	}

	render(){
		var select = undefined;
		if (this.state.selectOption==='student') {
			select = (
					<div>
						<h3>Student information: </h3>
						<input type="text" placeholder="Enter Name" className="form-control" ref={(name)=>this.name=name} /><br/>
						<input type="text" placeholder="Enter Qualification" className="form-control" ref={(qual)=>this.qual=qual} /><br />
						<input type="text" placeholder="Enter Institution" className="form-control" ref={(inst)=>this.inst=inst} />
					</div>
				)
		} else if(this.state.selectOption==='company'){
				select = (
					<div>
						<h3>Company information</h3>
						<input type="text" placeholder="Enter Company Name" className="form-control" ref={(cname)=>this.cname=cname} /><br/>
						<input type="text" ref={(address)=>this.address=address} placeholder="Enter Address" className="form-control"/>
					</div>
					)
				}
		return(
			
			<div className="col-md-offset-3 col-md-6" >
				<h1 className="text-center" >Registration</h1>
				<form onSubmit={this.handleSubmit} className="form-group">
					
					<input type="email" placeholder="Enter Email" className="form-control" ref={(email)=>this.email=email} /><br />
					<input type="password" placeholder="Enter Password" className="form-control" ref={(pw)=>this.pw=pw} /><br/>
					
					<label>Select account type: </label>
					<select className="form-control" onChange={this.changeHandler} >
						<option >Select: </option>
						<option value="student">Student</option>
						<option value="company">Company</option>
					</select>
					
					{select}
					
					{
			            this.state.registerError &&
			            <div className="alert alert-danger" role="alert">
			              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
			              <span className="sr-only">Error:</span>
			              &nbsp;{this.state.registerError}
			            </div>
			          }<br/>
					<input type="submit" className="btn btn-success btn-lg"/>
				</form>
			</div>

			);
	}
}