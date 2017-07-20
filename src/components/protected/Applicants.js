import React, { Component } from 'react';
import {firebaseAuth,userRef,jobsRef,ref,applicantRef} from '../../config/constants';

export default class Applicants extends Component{
	constructor(props){
		super(props);
		this.state= {
			applicantInfo: [],
			studentInfo: []
		}
	}
	componentWillMount(){
		var that = this;
		applicantRef.on('value',applicantSnap=>{
				var applicantData = [];
				applicantSnap.forEach(function(childSnap){
					var childData = childSnap.val();
					if (that.props.jobTitle===childData.jobTitle) {
						applicantData.push(childData);
						that.setState({
						applicantInfo: applicantData
						});
					}
				})
			})
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
			})

	}

	render(){
		return(
			<div>
				{this.state.studentInfo.map((app)=>
					<div>
						<h1>{app.info.name}</h1>
					</div>
					)}
				
			</div>
			)
	}
}