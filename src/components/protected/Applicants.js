import React, { Component } from 'react';
import {firebaseAuth,userRef,jobsRef,ref,applicantRef,cv} from '../../config/constants';

export default class Applicants extends Component{
	constructor(props){
		super(props);
		this.state= {
			applicantInfo: [],
			studentInfo: [],
			user_id: ''
		}
	}
	componentWillMount(){
		var that = this; 
		applicantRef.on('value',applicantSnap=>{
				var applicantData = [];
				applicantSnap.forEach(function(childSnap){
					var childData = childSnap.val();
					
						applicantData.push(childData);
						that.setState({
						applicantInfo: applicantData
						});
					
				})
			})/*
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
			<div>
				{this.state.applicantInfo.map((app,index)=>
					<div key={index}>
						<h3>{app.jobTitle}</h3>
						{
							this.setState({
								user_id: app.userId
							})
						}
					</div>
				)}
			</div>
			)
	}
}