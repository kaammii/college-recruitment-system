import React,{Component} from 'react';
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import Dashboard from './protected/Dashboard';
import {logout} from '../helpers/auth';
import {firebaseAuth,userRef} from '../config/constants';
import {ref} from '../config/constants';

function PrivateRoute({component: Component, authed, ...rest}){
	return(
			<Route
				{...rest}
				render={(props)=> authed ===true
					? <Component {...props} />
					: <Redirect to ={{pathname: '/Login', state: {from: props.location}}} />
				}
			/>
		)
}

function PublicRoute({component: Component, authed, ...rest}){
	return (
		<Route
			{...rest}
			render={(props)=> authed===false
				? <Component {...props} />
				: <Redirect to="/Dashboard" />}
		/>
		)
}

export default class App extends Component{
	state = {
		authed: false,
		loading: false
	}
	componentDidMount(){
		this.removeListner = firebaseAuth().onAuthStateChanged((user)=>{
			if (user) {
				var userId = user.uid;
				
				userRef.on('value',snap=>{
					//var data = [];
					
						snap.forEach(function(childSnapshot) {
					      var childData = childSnapshot.val();

					      if (childData.info.uid===userId) {console.log(childData.info.name)}
					    });

						
					
				})
				this.setState({
					authed:true,
					loading:false 
				});
			} else{
				this.setState({
					authed:false,
					loading: false 
				});
			}
		})
	}
	componentWillUnmount(){
		this.removeListner()
	}
	render(){
		return this.state.loading===true ?<h1>Loading</h1> :(
				<BrowserRouter>
					<div>
						<nav className="navbar navbar-default navbar-static-top">
				            <div className="container">
				              <div className="navbar-header">
				                <Link to="/" className="navbar-brand">Campus Recruitment System</Link>
				              </div>
				              <ul className="nav navbar-nav pull-right">
				                <li>
				                  <Link to="/" className="navbar-brand">Home</Link>
				                </li>
				                <li>
				                  <Link to="/Dashboard" className="navbar-brand">Dashboard</Link>
				                </li>
				                <li>
				                {this.state.authed
									? <button style={ {border: 'none', backgroud: 'transparent'}}
									onClick={()=>{
										logout()
									}}
									className="navbar-brand" >Logout</button>
									: <span>
										<Link to="/Login" className="navbar-brand" >Login </Link>
										<Link to="/Register" className="navbar-brand" >Register</Link>
									</span>
				                }
          						</li>
          					</ul>
					    </div>
					</nav>
					<div className="container" >
						<div className="row">
							<Switch>
								<Route exact path="/"  component={Home} />
								<PublicRoute authed={this.state.authed} path='/Login' component={Login} />
								<PublicRoute authed={this.state.authed} path="/Register" component={Register} />
								<PrivateRoute authed={this.state.authed} path='/Dashboard' component={Dashboard} />
								<Route render={() => <h3>No Match</h3>} />
							</Switch>
						</div>
					</div>
				</div>
			</BrowserRouter>
			);
	}
}