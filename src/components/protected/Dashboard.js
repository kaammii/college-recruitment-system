import React, { Component } from 'react';
import {firebaseAuth,userRef} from '../../config/constants';
import Student from './Student';
import Company from './Company';


export default class Dashboard extends Component {
       constructor(props){
       	super(props);
       	this.state ={
				userInfo: [],
				companyInfo: [],
				student: false,
				company: false
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
								if (childData.info.uid===userId) {
					      	
								if (childData.info.type==='student') { that.setState({student: true}) }
								else if (childData.info.type==='company'){that.setState({company:true})} 
								
								//console.log(that.state.userInfo);
							}
					    });

						
					
				})
				}
			})
  					
  		}
    
  render () {
		

		

	return (
		<div>
		{
			this.state.student &&
			<Student />}
			{
			this.state.company &&
			<Company />
		}
        </div> 
    )
  }
}


