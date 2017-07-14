import React, { Component } from 'react';
import {firebaseAuth,userRef} from '../../config/constants';

export default class Dashboard extends Component {
       constructor(props){
       	super(props);
       	this.state ={
			userInfo: []
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
						snap.forEach(function(childSnapshot) {
					      var childData = childSnapshot.val();
						

					      if (childData.info.uid===userId) {
					      	console.log(childData.info.name)
								var info = {
									username: childData.info.name,
									qual: childData.info.qual,
									inst: childData.info.inst
								}
								
								that.setState({
									userInfo: info
								})
								console.log(that.state.userInfo);
							}
					    });

						
					
				})
				}
			})
  					
  		}
    
  render () {
		
		
	return (
		<div classNameName="container-fluid">
        <div className="row">
            <div className="col-md-5">
                    <div className="col-md-8">
                        <div className="panel panel-default">
                            <div className="panel-heading"><span className="glyphicon glyphicon-user" ></span> Student</div>
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

                                        <h2>Sachith Seram</h2>
                                        <p>Software Developer at ceymplon</p>
                                        <p>
                                            <a href="#" className="remove-decoration"><i className="glyphicon glyphicon-envelope"></i> poolsachitha@gmail.com</a> <br/>
                                            <a href="http://sachitha-seram.branded.me/" className="remove-decoration"><i className="glyphicon glyphicon-globe"></i> www.sachitha-seram.branded.me </a><br/>
                                            <a href="#" className="remove-decoration"> <i className="glyphicon glyphicon-phone"></i> +94 710 000 000</a>
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
					<th>Home</th>
					<th>Home</th>
					<th>Home</th>
					<th>Home</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>alkfjlkfaj</td>
						<td>alkfjlkfaj</td>
						<td>alkfjlkfaj</td>
						<td><button className="btn btn-success"><span className="glyphicon glyphicon-eye-open"></span></button></td>
					</tr>
					<tr>
						<td>alkfjlkfaj</td>
						<td>alkfjlkfaj</td>
						<td>alkfjlkfaj</td>
						<td><button className="btn btn-success"><span className="glyphicon glyphicon-eye-open"></span></button></td>
					</tr>
				</tbody>
			</table>	
        </div>
     </div>	
 </div>
              
    )
  }
}