import axios from 'axios';
import React from 'react'
import { useRef } from "react";
import "./register.css";
import {useHistory} from "react-router-dom";
import {Link} from "react-router-dom";

export default function Register() {
    const username = useRef();
    const email = useRef();
    const age = useRef();
    const walletAddress = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history = useHistory();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER


    const handleClick = async (e)=>{
        e.preventDefault();
        if(passwordAgain.current.value !== password.current.value){
            password.current.setCustomValidity("Passwords don't match...")
        } else{
            const user = {
                username: username.current.value,
                email: email.current.value,
                age: age.current.value,
                password: password.current.value,
            };
            try {
                await axios.post("/auth/register", user);
                history.push("/login");

            } catch (err) {
                console.log(err)
            }

        }

    }

    return (
      <div className='login'>
          <div className="loginWrapper">
              <div className="loginLeft1">
                  <img style= {{borderRadius: "10px", display:'flex' , width: '400px', height: '200px', marginTop: "0px"}} src={PF + 'logo2.png'} alt="logo" />
                  <span className='loginDesc2'> </span>
                  <span className='loginDesc2'> Ready to Join the Action?</span>
                  <span className='loginDesc2'> </span>
                  <span className='loginDesc2'> </span>
                  <span className='loginDesc2'> </span>
                  <span className='loginDesc2'> Powered By:</span>
                  <img style= {{borderRadius: "10px", width: undefined, height: '100px', marginTop: "0px", paddingTop: "10px", marginLeft: "150px"}} src={PF + 'metamaskFox.png'} alt="logo" />
              </div>
              <div className="loginRight">
                  <form className="loginBox" onSubmit={handleClick}>
                      <input placeholder="Username" required ref={username} className="loginInput" />
                      <input placeholder="Email" required ref={email} className="loginInput" type="email" />
                      <input placeholder="Age" required ref={age} className="loginInput" />
                      <input placeholder="Password" required ref={password} className="loginInput" type="password" minLength="6"/>
                      <input placeholder="Password Again" required ref={passwordAgain} className="loginInput" type="password" minLength="6" />
                      <button className='loginButton1' type='submit'>Sign Up</button>
                      <Link to={"./login"} style={{textDecoration:"none"}}> 
                      <button className="loginButton1"> Log into Account</button>
                      </Link>
                  </form>
              </div>
          </div> 

      </div>
    )
  }