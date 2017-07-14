import React, { Component } from 'react';
import {firebaseAuth,userRef} from '../../config/constants';

export default class Dashboard extends Component {
       constructor(props){
       	super(props);
       	this.state ={
			username: ''
		}
       }
  render () {
		
		

  	firebaseAuth().onAuthStateChanged((user)=>{
			if (user) {
				var userId = user.uid;
				
				userRef.on('value',snap=>{
					//var data = [];
					
						snap.forEach(function(childSnapshot) {
					      var childData = childSnapshot.val();

					      if (childData.info.uid===userId) {
					      	console.log(childData.info.name)
					      	this.setState({
								username: 'kamran'
					      	});
					      }
					    });

						
					
				})
				}
			})
    return (
      <div>
        <h1>Hi, Welcome {this.state.username}</h1>
      </div>
    )
  }
}