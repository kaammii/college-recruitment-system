import {ref, firebaseAuth} from '../config/constants';


export function auth(email,pw){
	return firebaseAuth().createUserWithEmailAndPassword(email,pw)
		.then(saveUser) //save user is a function that is executing at the bottom of this file
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

export function otherInfo(info){
	return info;
}

export function saveUser(user){
	console.log(otherInfo());
	return ref.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid
      
    })
    .then(otherInfo)
}