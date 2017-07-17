import React, { Component } from 'react';
import {firebaseAuth,userRef} from '../../config/constants';
import Loader from '../Loader';

export default class CompaniesList extends Component{
	
	constructor(props){
		super(props);
		this.state = {
			companyInfo: [],
			loading: true
		}
	}

	componentDidMount(){
		var that  = this;
	this.removeListner= firebaseAuth().onAuthStateChanged((user)=>{
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
								companyInfo: companyData,
								loading: false
							});
						}
				})
			})
		}
	})
	}
	componentWillUnmount(){
			this.removeListner()
	}

	render(){
		return this.state.loading===true ? <Loader />  : (
			<div className="back" >
				<h1 className="panel-heading">List of Companies</h1>
				{
						
					this.state.companyInfo.map((index)=>
			<table className="table table-condensed table-back">
				<thead>
					<tr>
					<th>Name</th>
					<th>Address</th>
					<th>Email</th>
					<th></th>
					</tr>
				</thead>
				<tbody>
					
					<tr key={index.uid}>
						<td>{index.cname}</td>
						<td>{index.address}</td>
						<td>{index.email}</td>
						
					</tr>
					
				</tbody>
			</table>	
			)
					}	
			</div>
			)
	}
} 