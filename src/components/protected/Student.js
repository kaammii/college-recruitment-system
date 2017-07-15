import React, { Component } from 'react';
import {firebaseAuth,userRef} from '../../config/constants';
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom';

export default class Student extends Component{

	constructor(props){
		super(props);

		this.state={
			companyInfo: [],
			userInfo: [],
			type: '	'

		}
	}	
	   componentDidMount(){
	       	var that = this;
	  		var user_name = '';
	  			firebaseAuth().onAuthStateChanged((user)=>{
				if (user) {

					
					var userId = user.uid;
					
					userRef.on('value',snap=>{
						//var data = [];
							var data = [];
							var companyData = [];
							snap.forEach(function(childSnapshot) {
						      var childData = childSnapshot.val();

						      			

								if (childData.info.type==='company') {
								
								companyData.push(childData.info);
								that.setState({
									companyInfo: companyData
								})
								//console.log(that.state.companyInfo);
							}

					      else if (childData.info.uid===userId) {
					      	
								var info = {
									username: childData.info.name,
									qual: childData.info.qual,
									inst: childData.info.inst
								}
								if (childData.info.type==='student') { that.setState({type: 'Student'}) }
								else if (childData.info.type==='company'){that.setState({type: 'Company'})} 
								
								that.setState({
									userInfo: info
								})
								//console.log(that.state.userInfo);
							}
					    });

						
					
				})
				}
			})
  					
  		}

render(){
	return(
	<div className="container-fluid">
        <div className="row">
            <div className="col-md-5">
                    <div className="col-md-8">
                        <div className="panel panel-default">
                            <div className="panel-heading"><span className="glyphicon glyphicon-user" ></span> {this.state.type}</div>
                            <div className="panel-body text-left">
                                <div className="row">
                                    <div className="col-md-12 ">
                                        <center>
                                            <a className="" href="#">
                                                <img className="media-object dp img-circle" src="https://wiki.cam.ac.uk/wiki/ajmorris/img_auth.php/4/41/Unknown_user.png"/>
                                            </a>
                                        </center>
                                    </div>
                                    <div className="col-md-12">

                                        <h2>{this.state.userInfo.username}</h2>
                                        <p> <span className="glyphicon glyphicon-book"></span> {this.state.userInfo.inst}</p>
                                        <p>
                                            <a href="#" className="remove-decoration"><i className="glyphicon glyphicon-file"></i> View all jobs</a> <br/>
                                            <a href="#" className="remove-decoration"><i className="glyphicon glyphicon-info-sign"></i> View all companies </a><br/>
                                            
                                        </p>
                                    </div>
                                </div>
                            </div>
                         </div>
                    </div>
     			</div>
        

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
						
					this.state.companyInfo.map((index)=>
					<tr key={index.uid}>
						<td>{index.cname}</td>
						<td>{index.address}</td>
						<td>{index.email}</td>
						<Link to="/Dashboard/View" ><td><button className="btn btn-success"><span className="glyphicon glyphicon-eye-open"></span></button></td></Link>
					</tr>
					)
					}	
				</tbody>
			</table>	
				 	
        </div>
     </div>	
 </div>
)}
}
