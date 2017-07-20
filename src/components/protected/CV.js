import React, { Component } from 'react';
import {ref,firebaseAuth,userRef} from '../../config/constants';


export default class CV extends Component{
constructor(props){
	super(props);
	this.state = {
		error: false
	}
}
	componentWillMount(){
		this.submitHandle=(e)=>{
			e.preventDefault();
			var jobTitle = this.jobTitle.value;
			var salary = this.salary.value;
			var that = this;
			if (this.jobTitle.value==='' || this.salary.value==='') {
				alert('fdlkajlkafjl;');
			}
			else{
		firebaseAuth().onAuthStateChanged((user)=>{
			if (user) {
				userRef.on('value',snap=>{
					snap.forEach(function(childSnap){
						var childSnap = childSnap.val();
						if (childSnap.info.uid===user.uid) {
								ref.child(`jobpost`)
								.push({
									companyName: childSnap.info.cname,
									jobTitle:jobTitle,
									salary: salary,
									uid: user.uid
								}, function(error){
									if (error) {
										
									}
										else{
											
											that.jobTitle.value = '';
											that.salary.value = '';
										}
								})
						}
					})
				})
			}
		}) 
	}
	}
	}
	render(){
		return(
			<div className="back">
				<h1 className="text-center">Create your CV</h1>
				<form className="form-group" onSubmit={this.submitHandle} >
					<label>Name: </label>
					<input type="text" ref={(name)=>this.name =name} className="form-control" placeholder="Enter Name" /><br/>
					<label>Email: </label>
					<input type="text" ref={(email)=>this.email=email} className="form-control" placeholder="Enter Email" /><br/>
					<h2>Education</h2>
					<label>Qualification: </label>
					<input type="text" ref={(qual)=>this.qual=qual} className="form-control" placeholder="Enter Qualification" /><br/>
					<label>Institution: </label>
					<input type="text" ref={(inst)=>this.inst=inst} className="form-control" placeholder="Enter Institution Name" /><br/>
					<h2>Work Experience</h2>
					<label>Organization: </label>
					<input type="text" ref={(org)=>this.org=org} className="form-control" placeholder="Enter Organization Name" /><br/>
					<label>Position: </label>
					<input type="text" ref={(pos)=>this.pos=pos} className="form-control" placeholder="Enter Position" /><br/>
					<input type="submit" className="btn-lg btn-default" value="Create" />
				</form>
			</div>
			)
	}
}