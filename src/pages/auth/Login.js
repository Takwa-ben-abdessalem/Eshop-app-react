import React, { useState } from 'react'
import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Card from '../../components/card/Card';
import { auth } from '../../firebase/config';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import Loader from '../../components/loader/Loader';
import {  toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { selectPreviousURL } from '../../redux/slice/cartSlice';


const Login = () => {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [isloading, setIsLoading] =useState(false)
  const navigate = useNavigate()
  const provider = new GoogleAuthProvider();
  const previousURL = useSelector(selectPreviousURL)
  
  const redirectUser = () => {
    if (previousURL.includes("cart")) {
      return navigate("/cart")
    }
    navigate("/")
  }

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
  .then((result) => {
    // The signed-in user info.
    toast.success("Login successful...")
    redirectUser()

  }).catch((error) => {
    toast.error(error.message)
  });
  }


  const loginUser = (e) => {
    e.preventDefault()  //do not reload the page 
    setIsLoading(true)

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => { 
      //const user = userCredential.user;
      setIsLoading(false)
      toast.success("Login successful...")
      redirectUser()
    })
    .catch((error) => {
      setIsLoading(false)

      toast.error(error.message)

    });

  }

  return (
    <>
    {isloading && <Loader/>}

    <section className={`container ${styles.auth}`}>
 
    <div className={styles.img}>
      <img src={loginImg} alt="Login" width="400" />
    </div>
    <Card>
      <div className={styles.form}>
        <h2>Login</h2>
       
        <form onSubmit={loginUser} >
          <input
            type="text"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) =>  setPassword(e.target.value)}
          />
          <button type="submit" className="--btn --btn-primary --btn-block">
            Login
          </button>
          <div className={styles.links}>
            <Link to="/reset">Reset Password</Link>
          </div>
          <p>-- or --</p>
        </form>
        
        <button
          className="--btn --btn-danger --btn-block"
          onClick={signInWithGoogle}
        >
          <FaGoogle color="#fff"  /> Login With Google
        </button>
        <span className={styles.register}>
          <p>Don't have an account?</p>
          <Link to="/register">Register</Link>
        </span>
      </div>
      </Card>
  </section>
  </>
  )
}

export default Login