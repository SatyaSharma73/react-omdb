import { createContext, useContext, useEffect, useState } from "react";
import {

    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup

} from "firebase/auth"

import {auth} from "../../common/firebase"

const userAuthContext=createContext();


export function UserAuthContextProvider({children}){

    const [user,setuser]=useState("");

    function signup(email,password){
        return createUserWithEmailAndPassword(auth,email,password,)
    }

    function Login(email,password){
        return signInWithEmailAndPassword(auth,email,password,)
    }

    function logout(){
        return signOut(auth)
    }

    function googleSignin(){
        const googleauthprovider=new GoogleAuthProvider();
        return signInWithPopup(auth,googleauthprovider)
    }

    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{
            setuser(currentUser);
            
        });
        return ()=>{
            unsubscribe();
        }
    },[user]);


    return <userAuthContext.Provider value={{user, signup, Login,logout,googleSignin }}>
        
        {children}
        </userAuthContext.Provider>
}

export function useUserAuth(){
    return useContext(userAuthContext)
}
