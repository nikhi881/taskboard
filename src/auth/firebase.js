// Import the functions you need from the SDKs you need
import {  signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import  {auth}  from "../firebasaeConfig";


// Initialize Firebase
const provider = new GoogleAuthProvider();
const gitProvider = new GithubAuthProvider();
  
// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({   
    prompt : "select_account "
});
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGithubPopup = () => signInWithPopup(auth, gitProvider);