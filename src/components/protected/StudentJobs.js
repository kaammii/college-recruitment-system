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
								loading:false,
								user_id: user.uid 
							});
				})
			})
			applicantRef.on('value',applicantSnap=>{
				var applicantData = [];
				applicantSnap.forEach(function(childSnap){
					var childData = childSnap.val();
					var arr = that.state.jobInfo;

					applicantData.push(childData);
					
					that.setState({
						applicantInfo: applicantData
					});
					var app = that.state.applicantInfo;
					
				})
			})
		}
		that.handleClick=(value)=>{
			ref.child(`jobpost/applicants`)
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
				<div>		
			<table className="table table-condensed table-back" >
				<thead>
					<tr>
					<th>Company</th>
					<th>Job Title</th>
					<th>Salary</th>
					<th></th>
					</tr>
				</thead>
				<tbody>

					<tr>
						<td>{index.companyName}</td>
						<td>{index.jobTitle}</td>
						<td>{index.salary}</td>
							
						<td><button onClick={()=>this.handleClick(index.jobTitle)} className="btn btn-success">Apply</button></td> 

					</tr>
						
				</tbody>
			</table>
				<div className="applicants" >
				{ this.state.applicantInfo.map((applicant)=>{
					{console.log(index.jobTitle +" "+applicant.jobTitle)}
					{applicant.jobTitle === index.jobTitle ? 
					<table className="table table-condensed table-back" > 
						<thead> 
							<th>Name</th>
							<th>Email</th>
						</thead>
						<tbody> 
							<tr> 
								<td>lkasdjkdsa</td>
								<td>sdassd</td>
						    </tr>
						</tbody>
					</table> : <h2>No applicant</h2> } }) }
				</div>
			</div>
			)} 
			</div>

			)
	}
} 