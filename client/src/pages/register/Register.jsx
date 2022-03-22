import axios from 'axios';
import React from 'react'
import { useRef } from "react";
import "./register.css";
import {useHistory} from "react-router-dom"
import { Link } from "react-router-dom";

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history = useHistory();


    const handleClick = async (e)=>{
        e.preventDefault();
        if(passwordAgain.current.value !== password.current.value){
            password.current.setCustomValidity("Passwords don't match...")
        } else{
            const user = {
                username: username.current.value,
                email: email.current.value,
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
              <div className="loginLeft">
                <img style= {{width: undefined, height: undefined, paddingRight: '20px'}} src={process.env.PUBLIC_URL + '/assets/logo.png'} alt="logo" />  
                <span className='loginDesc'> Welcome to GeneBase! Connect with inspiring creators!</span>
              </div>
              <div className="loginRight">
                  <form className="loginBox" onSubmit={handleClick}>
                    <input placeholder="Username" required ref={username} className="loginInput" />
                    <input placeholder="Email" required ref={email} className="loginInput" type="email" />
                    <input placeholder="Password" required ref={password} className="loginInput" type="password" minLength="6"/>
                    <input placeholder="Password Again" required ref={passwordAgain} className="loginInput" type="password" minLength="6" />
                    <button className='loginButton' type='submit'>Sign Up</button>
                    <Link to = "/login">
                        <button className="loginRegisterButton"> Log into Account</button>
                    </Link>
                      
                  </form>
              </div>
          </div> 

      </div>
    )
  }