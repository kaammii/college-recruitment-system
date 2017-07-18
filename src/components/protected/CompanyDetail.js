import React, { Component } from 'react';
import {firebaseAuth,userRef} from '../../config/constants';

export default class CompanyDetail extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div>
	
        <div className="col-md-6">
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
						
					this.props.companyInfo.map((index)=>
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
        
			</div>
			)
	}
}