import React, { Component } from 'react';
import {firebaseAuth,userRef,jobsRef} from '../../config/constants';
import Loader from '../Loader';
import Admin from './Admin';

export default class Jobs extends Component{
	
	constructor(props){
		super(props);
		this.state = {
			jobInfo: [],
			loading: true,
			admin: false
		}
	}

	componentWillMount(){
		var that  = this;
	firebaseAuth().onAuthStateChanged((user)=>{
		if (user) {
			var userId  = user.uid;
			jobsRef.on('value',snap=>{
				var data = [];
				var companyData = [];

				snap.forEach(function(childSnap){

						var childData  = childSnap.val();
						if (childData.uid===user.uid) {
							companyData.push(childData)
							companyData.push(childSnap.key)
							that.setState({
								jobInfo:companyData 
							});
						} else if (that.state.admin===true) {
							
							//companyData.push(childData)
							var jobKey = { key: childSnap.key }
							var data = Object.assign({},childData,jobKey);
							companyData.push(data);
							//companyData.push(jobKey)
							that.setState({
								jobInfo:companyData 
							});
						}
						that.handleClick=(value)=>{
							jobsRef.child(value).remove().then(function() {
							    console.log('done');
							});
						}
						
				})
			})
		}
	})
		console.log(that.state.jobInfo);
		if (that.props.admin==='admin') { that.setState({ admin:true }) }
	}
	

	render(){
		return this.state.loading===false ? <Loader />  : (
			<div className="back" >
				<h1 className="panel-heading">My Jobs</h1>
			{
						
					this.state.jobInfo.map((index,key)=>
			<table className="table table-condensed table-back" key={key} >
				<thead>
					<tr>
					<th>Job Title</th>
					<th>Salary</th>
					<th>Company</th>
					<th>Action</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{index.jobTitle}</td>
						<td>{index.salary}</td>
						<td>{index.companyName}</td>
						{
							this.state.admin && 
							<td className="" ><button onClick={()=>this.handleClick(index.key)} className="btn-default">Delete</button> </td>
						}
					</tr>
						
				</tbody>
			</table>
			)
					}
			
			</div>
			)
	}
} 