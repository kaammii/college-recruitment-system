import React, { Component } from 'react';
import {firebaseAuth,userRef} from '../../config/constants';

export default class JobPost extends Component{
constructor(props){
	super(props);
}
	componentWillMount(){
		firebaseAuth().onAuthStateChanged((user)=>{
			if (user) {
				userRef.on('value',snap=>{
					snap.forEach(function(childSnap){
						var childSnap = childSnap.val();
						if (childSnap.info.uid===user.uid) {
							console.log(childSnap.info);
						}
					})
				})
			}
		})
	}
	render(){
		return(
			<div className="back">
				<h1 className="text-center">Post a Job</h1>
				<form className="form-group">
					<label>Job Title: </label>
					<input type="text" className="form-control" placeholder="Enter Job Title" /><br/>
					<label>Salary: </label>
					<input type="text" className="form-control" placeholder="Enter Salary" /><br/>
					<button className="btn btn-lg btn-primary" >Post</button>
				</form>
			</div>
			)
	}
}