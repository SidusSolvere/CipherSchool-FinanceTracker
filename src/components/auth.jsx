import { auth, googleProvide } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";
export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  }; // firebase uses promises so it needs async
  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth,googleProvide);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <input
        placeholder="Email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button onClick={signIn}>Sign In</button>

      <button onClick={signInWithGoogle}>Sign in with google</button>
      <button onClick={logOut}>Log Out</button>
    </>
  );
};
