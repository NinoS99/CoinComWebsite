import React from 'react';
import "./connect.css";
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import Rightbar from '../../components/rightbar/Rightbar';
import Feed from '../../components/feed/Feed';
//import {Users} from "../../dummyData"
import {useEffect, useState, useContext} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {Link} from "react-router-dom";
const Tx = require('ethereumjs-tx');
var Web3 = require('web3');
const ethNetwork = 'https://rinkeby.infura.io/v3/ddab8f0eb5044dccabc27d5c1e3c6715';
var web3;



export default function Connect() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const username = useParams().username;
    var account;
    const { user: currentUser, dispatch } = useContext(AuthContext);

    const userData = async()=>{
        await axios.get("/server/users/" + currentUser.username)
    } 
   

    async function getAccount() {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
          .catch((e) => {
            console.error(e.message)
            return
          })
        if (!accounts) {return}
    
        account = accounts[0];
        console.log(account)
        console.log(currentUser._id)
        console.log(currentUser.walletAddress)
      };

    const handleClick = async () => {
        try {
            console.log('Account:')
            await getAccount();

            if(!currentUser.walletAddress){
                console.log(account)
                await axios.put('/users/' + currentUser._id, {
                    userId: currentUser._id,
                    walletAddress : account,
                });
            
                dispatch({ type: "WALLETADDRESS", payload: currentUser._id});
            }
            
        } catch (error) {
            
        }
    }





return (
    <>
    <div classname='metatopbanner'>
       <img  className="metamaskImage1" src={PF+"metamask.png"} alt=''/>
    </div>
    <div className='connectTitle'> Eager to Get Started?</div>
    <div className='connectSubTitle'> Learn How To Connect Your Metamask Wallet to Start Getting Paid!</div>
    <a className='connectSubTitle' target="_blank" href="https://metamask.io/faqs/"> Click Here To Learn About Metamask! </a>
    <button className='connectButton' onClick={handleClick}>
        {currentUser.walletAddress ? "Already Connected to Metamask!" : "Click Here To Connect to Metamask"}
    </button>
    <Link to={`/profile/${currentUser.username}`} style={{ textDecoration: 'none' }}>
        <button className='connectButton' type='submit' >Back</button>
    </Link> 

    </>
)

}

