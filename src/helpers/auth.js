import {ref, firebaseAuth} from '../config/constants';


export function studentAuth(email,pw,name,qual,inst){
	
	return firebaseAuth().createUserWithEmailAndPassword(email,pw)
		.then(function(user){
			var currUser = firebaseAuth.currentUser;
			return ref.child(`users/${user.uid}/info`)
				.set({
					email: user.email,
      				uid: user.uid,
      				name: name,
      				qual: qual,
      				inst: inst
				})
		}) //save user is a function that is executing at the bottom of this file
	
}
export function compAuth(email,pw,cname,address){
	
	return firebaseAuth().createUserWithEmailAndPassword(email,pw)
		.then(function(user){
			var currUser = firebaseAuth.currentUser;
			return ref.child(`users/${user.uid}/info`)
				.set({
					email: user.email,
      				uid: user.uid,
      				cname: cname,
      				address: address
				})
		}) //save user is a function that is executing at the bottom of this file
	
}

export function logout(){
	return firebaseAuth().signOut()
}

export function login(email,pw){
	return firebaseAuth().signInWithEmailAndPassword(email,pw)
}

export function resetPassword(email){
	return firebaseAuth().sendPasswordResetEmail(email)
}
