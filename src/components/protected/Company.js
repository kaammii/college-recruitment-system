import React, { Component } from 'react';
import {firebaseAuth,userRef} from '../../config/constants';
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom';
import StudentList from './StudentList';
import JobPost from './JobPost';
import Jobs from './Jobs';
import Applicant from './Applicants';

export default class Student extends Component{

	constructor(props){
		super(props);

		this.state={
			companyInfo: [],
			userInfo: [],
			type: '	'

		}
	}	
	   componentWillMount(){
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

						    

					      if (childData.info.uid===userId) {

								var info = {
									cname: childData.info.cname,
									email: childData.info.email,
									address: childData.info.address
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
<BrowserRouter>
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

                                        <h2>{this.state.userInfo.cname}</h2>
                                        <p> <span className="glyphicon glyphicon-envelope"></span> {this.state.userInfo.email}</p>
                                        <p><span className="glyphicon glyphicon-globe"></span> {this.state.userInfo.address}</p>
                                        <p>
                                            <Link to="/Dashboard/StudentInfo" ><a href="#" className="remove-decoration"><i className="glyphicon glyphicon-file"></i> View all Students</a></Link><br/>
                                            <Link to="/Dashboard/JobPost" ><a href="#" className="remove-decoration"><i className="glyphicon glyphicon-info-sign"></i> Post a Job </a><br/></Link>
                                            <Link to="/Dashboard/JobsList" ><a href="#" className="remove-decoration"><i className="glyphicon glyphicon-info-sign"></i> View my Jobs </a></Link><br/>
                                        	<Link to="/Dashboard/Applicant" ><a href="#" className="remove-decoration"><i className="glyphicon glyphicon-file"></i>View all applicants</a></Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                         </div>
                    </div>
     			</div>
        

        <div className="col-md-6">
        		<Switch>
        			<Route path="/Dashboard/StudentInfo" component={StudentList} />
        			<Route path="/Dashboard/JobPost" component={JobPost} />
        			<Route path="/Dashboard/JobsList" component={Jobs} />
        			<Route path="/Dashboard/Applicant" component={Applicant} />
        		</Switch>
        </div>
     </div>	
 </div>
 </BrowserRouter>
)}
}
