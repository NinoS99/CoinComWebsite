import React from 'react'
import "./rightbar.css"
import {Users} from "../../dummyData"
import Online from "../online/Online";
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { Add, Remove } from "@material-ui/icons";
import { ethers, Wallet } from 'ethers'
const Tx = require('ethereumjs-tx');
var Web3 = require('web3');
const ethNetwork = 'https://rinkeby.infura.io/v3/ddab8f0eb5044dccabc27d5c1e3c6715';
var web3;

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [subscriptions, setSubscriptions] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);

  useEffect(() => {
    const getSubscriptions = async ()=>{
      try {
        const subscriptionsList = await axios.get("/users/subscriptions/" + user._id);
        setSubscriptions(subscriptionsList.data);
        //console.log("/users/subscriptions/" + user._id)
        
        //console.log(profileUser)
      } catch (err) {
        console.log(err);
      }
    };
    getSubscriptions();
  },[user]);

  if(user){
  var profileUser = user._id
  //console.log(profileUser)
  }
  

  useEffect(() => {
    const getSubscribers = async ()=>{
      try {
        const subscribersList = await axios.get("/users/subscribers/" + user._id);
        setSubscribers(subscribersList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getSubscribers();
  },[user]);

  const filterData = subscribers.filter(item => item._id.includes(currentUser._id));
  var subscribed;

  if(filterData.length === 1){
     subscribed = true;
  } else {
     subscribed = false;
  }

  const [followed, setFollowed] = useState(
    currentUser.subscriptions.includes(user && user.id)
  );

  var account;

  async function getAccount() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      .catch((e) => {
        console.error(e.message)
        return
      })
    if (!accounts) {return}

    account = accounts[0];
    //console.log(account)
  }

  async function checkBalance() {
    let balance = await window.ethereum.request({method: 'eth_getBalance',
      params: [
        account,
        'latest'
      ]
  }).catch((err)=>{
    console.log(err)
  })
  //console.log(parseInt(balance) / Math.pow(10,18))
}

async function getCurrentGasPrices() {
  let response = await axios.get('https://ethgasstation.info/json/ethgasAPI.json');
  let prices = {
    low: response.data.safeLow / 10,
    medium: response.data.average / 10,
    high: response.data.fast / 10
  };
  return prices;
};

const minABI = [
  // balanceOf
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
  // transfer
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "success",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
];

//Declare addresses
const tokenAddress = "0x972FEb1FfFB6aAEF766123e24eCF5162c09d6dCa";
const toAddress = "0x72BfF596221936283069eC616cC9b027f5d5bC8c";
//const fromAddress = "0x0d03Ebc9565874D875C77b4868FDA4Bff2663C34"; TO DELETE
const amountToSend = '100';
//const data = 'a9059cbb00000000000000000000000072bff596221936283069ec616cc9b027f5d5bc8c0000000000000000000000000000000000000000000000000000000000000064';

// Get ERC20 Token contract instance
//const contract = new web3.eth.Contract(minABI, tokenAddress);

let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
let tempSigner = tempProvider.getSigner();
let tempContract = new ethers.Contract(tokenAddress, minABI, tempSigner)

const Provider = tempProvider;
const Signer = tempSigner;
const Contract = tempContract;

var tx;

async function sendmuck(){
  tx = await Contract.transfer(toAddress, amountToSend)
};

async function isMetaMaskConnected(){
  const accounts = await Provider.listAccounts();
  if (accounts.length > 0){
    console.log("Metamask is connected")
    account = accounts[0];
  } else {
    console.log("Metamask is not connected")
  }
}

//console.log(typeof window.ethereum)

// window.addEventListener('load', function(){
//   if (typeof web3 !== 'undefined') {
//     web3 = new Web3(web3.currentProvider);
//     console.log('GOATED')
//   } else {
//     console.log('RIP')
//   }
// });

var txstime;
var txsfrom;
var txsto;
var verified;

async function getTransaction(){
  const response = await axios.get('https://api-rinkeby.etherscan.io/api?module=account&action=tokentx&contractaddress=0x972FEb1FfFB6aAEF766123e24eCF5162c09d6dCa&address='+ account + '&page=1&offset=100&startblock=0&endblock=27025780&sort=desc&apikey=JJYV3HTNU5MSJ4FVUEMJJPYHXSCPAH3BXK')
  let txs = response.data.result;
  const myArray = []
  for (let i = 0; i < txs.length; i++) {
    txstime = txs[i].timeStamp
    txsfrom = txs[i].from
    txsto = txs[i].to
    if ((txstime >= (Math.floor(Date.now() / 1000)) - 2592000) && (txsfrom = account) && (txsto = toAddress)){
      myArray.push(txs[i])
    }
    if (myArray.length > 0) {
      verified = true;
    } else {
      verified = false;
    }
  }
}

const [data, setData] = useState([]);
    

    useEffect(() => {
        const getData = async ()=>{
          try {
            const dataList = await axios.get("/users/" + currentUser.username);
            setData(dataList.data);
          } catch (err) {
            console.log(err);
          }
        };
        getData();
      },[user]);
      
      

//const followbtn = document.getElementById('followbtn');

async function transactionReceipt(){

  const pending = await data.pending

  if (pending != ""){

    const followbtn = document.getElementById('followbtn');

    followbtn.style.backgroundColor = 'grey';
    followbtn.style.color = 'white';
    followbtn.textContent = 'Pending Confirmation...';
    followbtn.disabled = true;

    console.log(pending)

    const txReceipt = await Provider.getTransaction(pending);

    console.log(txReceipt)

    if (txReceipt.confirmations > 0) {
      const pendingUpdate = {
        userId: currentUser._id,
        pending: ""
      } 
      try {
        await axios.put('/users/'+ currentUser._id, pendingUpdate)
        console.log(currentUser)
      } catch (error) {
        console.log(error)
      }
      //window.location.reload();
    } else {
      console.log('nothing pending');
    }
  }
}

const checkForVerification = async () => {
  await isMetaMaskConnected();
  await getTransaction();
  await transactionReceipt();
}

//checkForVerification();

async function getBalance(account) {
  const result = await Contract.balanceOf(account);
 
  const format = Math.round((ethers.utils.formatEther(result)) * Math.pow(10, 18));

  console.log(format);
}



  const handleClick = async () => {
    try {
      if (subscribed === true) {
        await axios.put('/users/'+ user._id + '/unsubscribe', {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {

        if(!window.ethereum){
          console.log('Please Install Metamask')
        }

        console.log('Account:')
        await getAccount();
        console.log('Balance:')
        await checkBalance();
        console.log('Balance using eth.')
        await getBalance(account);

        document.getElementById("followbtn").disabled=true;

        const followbtn = document.getElementById('followbtn');

        followbtn.style.background='#000000';

        console.log(followbtn)

        followbtn.style.backgroundColor = 'grey';
        followbtn.style.color = 'white';
        followbtn.textContent = 'Pending Confirmation...';

        try {

          followbtn.style.backgroundColor = 'grey';
          followbtn.style.color = 'white';
          followbtn.textContent = 'Pending Confirmation...';

          await sendmuck();

          await tx.wait();

          console.log('done')

          console.log(tx.hash)

          const user = {
            userId: currentUser._id,
            pending: tx.hash,
          }

  
          try {
            await axios.put("/users/" + currentUser._id, user);
            console.log(user);
          } catch (err) {
          }

          await axios.put('/users/'+ profileUser + '/subscribe', {
            userId: currentUser._id,
          });
  
          dispatch({ type: "FOLLOW", payload: profileUser });

        } catch (error) {
          console.log('User rejected the muck')
        }

        

        console.log(profileUser)

    }
      setFollowed(!subscribed);
      window.location.reload();
    } catch (err) {
    }
  };

  const HomeRightbar = () => {
    return (
      <>
       <div className='birthdayContainer'>
            {/*<
            <img className='birthdayImg' src={PF+"gift.png"} alt=''/>
            span className='birthdayText'>
              <b>Jon Black </b> and <b> 4 other creators </b>  have a birthday today!
    </span>*/}
            <b>Powered by: </b>
            </div>  
            <img className='rightbarAd' src={PF+"Genecoin.png"} alt=''/>
            <a href="https://metamask.io/">
            <img  className='rightbarAd' src={PF+"metamask.png"} alt=''/>
            </a>
            <h4 className='rightbarTitle'>Online Creators</h4>
            <ul className='rightbarFriendList'>
              {Users.map((u)=>(
                <Online key={u.id} user={u} />
              ) )}
            </ul>
      </>
    )
  }
  

  const ProfileRightbar = () => {
    return(
      <>
        {user.username !== currentUser.username && ( //ToDO: Implement logic to show or hide profile based on if subbed to. Implement to every profile component or page
          <button id="followbtn" className="rightbarFollowButton" onClick={handleClick}>
            {subscribed ? "Unsubscribe" : "Subscribe"}
            {subscribed ? <Remove /> : <Add />}
          </button>
        )}
        {user.username === currentUser.username && (
          <Link to={'/settings'} style={{ textDecoration: 'none' }}>
            <button className='rightbarFollowButton' > Settings
            </button>
          </Link> 
        )}
      <h4 className='rightbarTitle'></h4>  
      <h4 className='rightbarTitle'>Creator Information</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City:</span>
          <span className="rightbarInfoValue">{user.city}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From:</span>
          <span className="rightbarInfoValue">{user.from}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Creator Type:</span>
          <span className="rightbarInfoValue">{user.creatorType}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Monthly Price:</span>
          <span className="rightbarInfoValue">{user.monthlyPrice} GeneCoin</span>
        </div>
      </div>
      <h4 className='rightbarTitle'>Subscribers</h4>
      <div className="rightbarFollowings">
        {subscribers.map((subscription) => (
          <Link to ={"/profile/" + subscription.username} style={{textDecoration: "none"}}>
          <div className="rightbarFollowing"> 
          <img src={subscription.profilePicture ? PF + subscription.profilePicture : PF + "person/noAvatar.png" } alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName" style={{textDecoration: "none", color: "grey"}}>{subscription.username}</span>
          </div>
          </Link>
        ))}
        </div>

        <h4 className='rightbarTitle'>Subscriptions</h4>
      <div className="rightbarFollowings">
        {subscriptions.map((subscription) => (
          <Link to ={"/profile/" + subscription.username} style={{textDecoration: "none"}}>
          <div className="rightbarFollowing"> 
          <img src={subscription.profilePicture ? PF + subscription.profilePicture : PF + "person/noAvatar.png" } alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName" style={{textDecoration: "none", color: "grey"}}>{subscription.username}</span>
          </div>
          </Link>
        ))}
        </div>
        
      </>
    )
  }

  return (
    <div className='sidebar'>
        <div className='rightbarWrapper'>
          {user ? <ProfileRightbar /> : <HomeRightbar />}
        </div>
    </div>
  )
}
