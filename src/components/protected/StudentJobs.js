import React, { Component } from 'react';
import {firebaseAuth,userRef,jobsRef,ref,applicantRef} from '../../config/constants';
import Loader from '../Loader';

export default class StudentJobs extends Component{
	
	constructor(props){
		super(props);
		this.state = {
			jobInfo: [],
			loading: true,
			user_id: '',
			applicantInfo: []
		}
	}
	
	componentWillMount(){
		var that  = this;

	firebaseAuth().onAuthStateChanged((user)=>{
		if (user) {
			var userId  = user.uid;
			that.setState({ user_id: userId })
			jobsRef.on('value',snap=>{
				var data = [];
				var companyData = [];

				snap.forEach(function(childSnap){
						var childData  = childSnap.val();
							
							companyData.push(childData)
							that.setState({
								jobInfo:companyData,
								loading:false 
							});
				})
			})
			applicantRef.on('value',applicantSnap=>{
				var applicantData = [];
				applicantSnap.forEach(function(childSnap){
					var childData = childSnap.val();
					
					applicantData.push(childData);
					that.setState({
						applicantInfo: applicantData
					});
				})
			})
		}
		that.handleClick=(value)=>{
			ref.child(`applicants`)
				.push({
					userId: userId,
					jobTitle: value
				})
		}
	})
	}
	
	

	render(){
		return this.state.loading===true ? <Loader />  : (
			<div className="back" >
				<h1 className="panel-heading">Jobs Available</h1>
			
						{
					this.state.jobInfo.map((index)=>
			<table className="table table-condensed table-back">
				<thead>
					<tr>
					<th>Company</th>
					<th>Job Title</th>
					<th>Salary</th>
					<th></th>
					</tr>
				</thead>
				<tbody>
					{console.log(this.state.applicantInfo,"sfdddgdfg")}
					<tr>
						<td>{index.companyName}</td>
						<td>{index.jobTitle}</td>
						<td>{index.salary}</td>
						<td><button onClick={()=>this.handleClick(index.jobTitle)} className="btn btn-success">Apply</button></td>
					</tr>
						
				</tbody>
			</table>
			)
					}
			
			</div>
			)
	}
} 