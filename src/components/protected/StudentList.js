import React, { Component } from 'react';
import {firebaseAuth,userRef} from '../../config/constants';

export default class CompaniesList extends Component{
	
	constructor(props){
		super(props);
		this.state = {
			studentInfo: []
		}
	}

	componentDidMount(){
		var that  = this;
	firebaseAuth().onAuthStateChanged((user)=>{
		if (user) {
			var userId  = user.uid;
			userRef.on('value',snap=>{
				var data = [];
				var studentData = [];
				snap.forEach(function(childSnap){
						var childData  = childSnap.val();

						if (childData.info.type==='student') {
							studentData.push(childData.info);
							that.setState({
								studentInfo: studentData
							});
						}
				})
			})
		}
	})
	}

	render(){
		return(
			<div className="back" >
				<h1 className="panel-heading">List of Students</h1>
			<table className="table table-condensed">
				<thead>
					<tr>
					<th>Name</th>
					<th>Email</th>
					<th>Qualification</th>
					<th>Institution</th>
					</tr>
				</thead>
				<tbody>
					{
						
					this.state.studentInfo.map((index)=>
					<tr key={index.uid}>
						<td>{index.name}</td>
						<td>{index.email}</td>
						<td>{index.qual}</td>
						<td>{index.inst}</td>
						
					</tr>
					)
					}	
				</tbody>
			</table>	
			
			</div>
			)
	}
} 