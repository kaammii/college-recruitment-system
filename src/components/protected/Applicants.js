import React, { Component } from 'react';
import {firebaseAuth,userRef,jobsRef,ref,applicantRef,cv} from '../../config/constants';

export default class Applicants extends Component{
	constructor(props){
		super(props);
		this.state= {
			applicantInfo: [],
			studentInfo: [],
			user_id: '',
			cvInfo:[],
			rawInfo: {}
		}
	}
	componentDidMount(){
		var that = this;
		firebaseAuth().onAuthStateChanged((user)=>{ 
		applicantRef.on('value',applicantSnap=>{
				var applicantData = [];
				applicantSnap.forEach(function(childSnap){
					var childData = childSnap.val();
					
						applicantData.push(childData);
						that.setState({
						applicantInfo: applicantData,
						rawInfo: childData
						});
					
				})
			})
			cv.on('value',cvSnap=>{
				var cvData = [];
				cvSnap.forEach(function(childSnap){
					var childData = childSnap.val();
							if(that.state.rawInfo.userId===childData.uid){
							cvData.push(childData);
							that.setState({
								cvInfo: cvData
							})
						}
					
					
				})
			})
		})
			/*
		userRef.on('value',student=>{
				var studentData = [];
				student.forEach(childSnap=>{
					var childData = childSnap.val();
						var appInfo = that.state.applicantInfo;
							console.log(appInfo);
							if (appInfo.userId===childData.info.uid) {
							studentData.push(childData)
							}
						
						that.setState({
							studentInfo: studentData
						});
				})
			}) */
			


	} 
	
	render(){
		return(
			<div className="back" >
				<h1>List of Applicants</h1>
				{this.state.cvInfo.map((cv,index)=>
					<div key={index}>
						<table className="table table-condensed table-back">
							<thead>
								<th>Name</th>
								<th>Email</th>
								<th>Qualification</th>
								<th>Institute</th>
								<th>Organization</th>
								<th>Position</th>
							</thead>
							<tbody>
								 <tr>
									<td>{cv.name}</td>
									<td>{cv.email}</td>
									<td>{cv.qual}</td>
									<td>{cv.inst}</td>
									<td>{cv.org}</td>
									<td>{cv.pos}</td>

								 </tr>
							</tbody>
						</table>
					</div>
				)}
			</div>
			)
	}
}