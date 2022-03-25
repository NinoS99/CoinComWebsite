import React from 'react'
import "./login.css"
import {useRef, useContext} from "react";
import { loginCall } from '../../apiCalls';
import {AuthContext} from "../../context/AuthContext";
import {CircularProgress} from "@material-ui/core"
import {Link} from "react-router-dom";

export default function Login() {
    
    const email = useRef();
    const password = useRef();
    const {user, isFetching, error, dispatch} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const handleClick = (e)=>{
        e.preventDefault();
        loginCall({email:email.current.value,password:password.current.value}, dispatch)
    };
 
    console.log(user);

    return (
      <div className='login'>
          <div className="loginWrapper">
              <div className="loginLeft1">
                  <img style= {{borderRadius: "10px", display:'flex' , width: '400px', height: '200px', marginTop: "0px"}} src={PF + 'logo2.png'} alt="logo" />
                  <span className='loginDesc1'> Connect With Inspiring Creators!</span>
                  <span className='loginDesc2'> Powered By:</span>
                  {/*<img style= {{borderRadius: "10px",  width: undefined, height: '100px', marginTop: "0px", paddingTop: "20px", marginLeft: "30px"}} src={PF + 'GeneCoin.png'} alt="logo" /> */}
                  <img style= {{borderRadius: "10px", width: undefined, height: '100px', marginTop: "0px", paddingTop: "10px", marginLeft: "150px"}} src={PF + 'metamaskFox.png'} alt="logo" />
              </div>
              <div className="loginRight">
                  <form className="loginBox" onSubmit={handleClick}>
                      <input placeholder="Email" type="email" className="loginInput" required ref={email} />
                      <input placeholder="Password" type="password" className="loginInput" required minLength="6" ref={password}/>
                      <button className='loginButton1' type='submit' disabled={isFetching}>
                          {isFetching ? <CircularProgress size="20px" /> : "Log In"} </button>
                      <Link to={"./register"} style={{textDecoration:"none"}}> 
                      <button className="loginButton1"> {isFetching ? <CircularProgress size="20px" /> : "Create New Account"} </button>
                      </Link>
                      <span className='loginForgot1'>Forgot Password?</span>
                  </form>
              </div>
          </div>
      </div>
    )
  }

