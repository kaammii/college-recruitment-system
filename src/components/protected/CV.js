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
				<h1 className="text-center">Post a Job</h1>
				<form className="form-group" onSubmit={this.submitHandle} >
					<label>Job Title: </label>
					<input type="text" ref={(jobTitle)=>this.jobTitle =jobTitle} className="form-control" placeholder="Enter Job Title" /><br/>
					<label>Salary: </label>
					<input type="text" ref={(salary)=>this.salary=salary} className="form-control" placeholder="Enter Salary" /><br/>
					<input type="submit" className="btn btn-lg btn-primary" value="Post" />
				</form>
			</div>
			)
	}
}