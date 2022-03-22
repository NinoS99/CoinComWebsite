import React from 'react'
import "./login.css"
import {useRef, useContext} from "react";
import { loginCall } from '../../apiCalls';
import {AuthContext} from "../../context/AuthContext";
import {CircularProgress} from "@material-ui/core"

export default function Login() {
    
    const email = useRef();
    const password = useRef();
    const {user, isFetching, error, dispatch} = useContext(AuthContext);

    const handleClick = (e)=>{
        e.preventDefault();
        loginCall({email:email.current.value,password:password.current.value}, dispatch)
    };
 
    console.log(user);

    return (
      <div className='login'>
          <div className="loginWrapper">
          <div className="loginLeft">
                <img style= {{width: undefined, height: undefined, paddingRight: '20px'}} src={process.env.PUBLIC_URL + '/assets/logo.png'} alt="logo" />  
                <span className='loginDesc'> Welcome to GeneBase! Connect with inspiring creators!</span>
              </div>
              <div className="loginRight">
                  <form className="loginBox" onSubmit={handleClick}>
                      <input placeholder="Email" type="email" className="loginInput" required ref={email} />
                      <input placeholder="Password" type="password" className="loginInput" required minLength="6" ref={password}/>
                      <button className='loginButton' type='submit' disabled={isFetching}>
                          {isFetching ? <CircularProgress size="20px" /> : "Log In"} </button>
                      <span className='loginForgot'>Forgot Password?</span>
                      <button className="loginRegisterButton"> {isFetching ? <CircularProgress size="20px" /> : "Create New Account"} </button>
                  </form>
              </div>
          </div>
      </div>
    )
  }

