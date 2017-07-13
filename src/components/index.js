import React,{Component} from 'react';
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom';
import Register from './Register';


export default class App extends Component{
	state = {
		authed: false,
		loading: false
	}
	componentDidMount(){
		this.removeListner = firebaseAuth().onAuthStateChanged((user)=>{
			if (user) {
				console.log(user);
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
				                  <Link to="/dashboard" className="navbar-brand">Dashboard</Link>
				                </li>
				                <li>
				                {this.state.authed
									? <button style={ {border: 'none', backgroud: 'transparent'}}
									onClick={()=>{
										logout()
									}}
									className="navbar-brand" >Logout</button>
									: <span>
										<Link to="/login" className="navbar-brand" >Login </Link>
										<Link to="/register" className="navbar-brand" >Register</Link>
									</span>
				                }
          						</li>
          					</ul>
					    </div>
					</nav>
					<div className="container" >
						<div className="row">
							<Switch>
								<Route path="/"  component={Home} />
								<PublicRoute authed={this.state.authed} path="/login" component={Login} />
								<PublicRoute authed={this.state.authed} path="/register" component={Register} />
								<PrivateRoute authed={this.state.authed} path='/dashboard' component={Dashboard} />
								<Route render={() => <h3>No Match</h3>} />
							</Switch>
						</div>
					</div>
				</div>
			</BrowserRouter>
			);
	}
}