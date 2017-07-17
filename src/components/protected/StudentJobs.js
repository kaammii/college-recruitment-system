import React, { Component } from 'react';
import {firebaseAuth,userRef,jobsRef} from '../../config/constants';
import Loader from '../Loader';

export default class StudentJobs extends Component{
	
	constructor(props){
		super(props);
		this.state = {
			jobInfo: [],
			loading: true
		}
	}

	componentDidMount(){
		var that  = this;
	firebaseAuth().onAuthStateChanged((user)=>{
		if (user) {
			var userId  = user.uid;
			jobsRef.on('value',snap=>{
				var data = [];
				var companyData = [];

				snap.forEach(function(childSnap){
						var childData  = childSnap.val();
						
							companyData.push(childData)
							that.setState({
								jobInfo:companyData 
							});
						
						
				})
			})
		}
	})
	}
	

	render(){
		return this.state.loading===false ? <Loader />  : (
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
					
					<tr>
						<td>{index.companyName}</td>
						<td>{index.jobTitle}</td>
						<td>{index.salary}</td>
						<td><button className="btn btn-success">Apply</button></td>
					</tr>
						
				</tbody>
			</table>
			)
					}
			
			</div>
			)
	}
} 