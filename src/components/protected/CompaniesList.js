import React, { Component } from 'react';
import {firebaseAuth,userRef} from '../../config/constants';

export default class CompaniesList extends Component{
	
	constructor(props){
		super(props);
		this.state = {
			companyInfo: []
		}
	}

	componentDidMount(){
		var that  = this;
	firebaseAuth().onAuthStateChanged((user)=>{
		if (user) {
			var userId  = user.uid;
			userRef.on('value',snap=>{
				var data = [];
				var companyData = [];
				snap.forEach(function(childSnap){
						var childData  = childSnap.val();

						if (childData.info.type==='company') {
							companyData.push(childData.info);
							that.setState({
								companyInfo: companyData
							});
						}
				})
			})
		}
	})
	}

	render(){
		return(
			<div>
				<h1 className="panel-heading">List of Companies</h1>
			<table className="table table-condensed">
				<thead>
					<tr>
					<th>Name</th>
					<th>Address</th>
					<th>Email</th>
					<th></th>
					</tr>
				</thead>
				<tbody>
					{
						
					this.state.companyInfo.map((index)=>
					<tr key={index.uid}>
						<td>{index.cname}</td>
						<td>{index.address}</td>
						<td>{index.email}</td>
						
					</tr>
					)
					}	
				</tbody>
			</table>	
			
			</div>
			)
	}
} 