import React from 'react'
import "./rightbar.css"
import {Users} from "../../dummyData"
import Online from "../online/Online";
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { Add, Remove } from "@material-ui/icons";

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
      } catch (err) {
        console.log(err);
      }
    };
    getSubscriptions();
  },[user]);

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


  const handleClick = async () => {
    try {
      if (subscribed === true) {
        await axios.put('/users/'+ user._id + '/unsubscribe', {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put('/users/'+ user._id + '/subscribe', {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
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
            
            </div>  
            <h4 className='rightbarTitle'>Powered By:</h4>
            <img style= {{flex:1 , width: '90%', height: undefined, resizeMode: 'contain'}} src={process.env.PUBLIC_URL + '/assets/ad.png'} alt="logo" />
            <a href="https://metamask.io/">
              <img style= {{flex:1 , width: '90%', height: undefined, resizeMode: 'contain'}} src={process.env.PUBLIC_URL + '/assets/meta.png'} alt="logo" />
              </a>
            <h4 className='rightbarTitle'>How to Buy:</h4>
            <h7 className='rightbarTitle'>To buy GeneCoin* you must</h7>
            {/* <ul className='rightbarFriendList'>
              {Users.map((u)=>(
                <Online key={u.id} user={u} />
              ) )}
            </ul>
              */}
      </>
    )
  }
  

  const ProfileRightbar = () => {
    return(
      <>
        {user.username !== currentUser.username && ( //ToDO: Implement logic to show or hide profile based on if subbed to. Implement to every profile component or page
          <button className="rightbarFollowButton" onClick={handleClick}>
            {subscribed ? "Unfollow" : "Follow"}
            {subscribed ? <Remove /> : <Add />}
          </button>
        )}
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
      </div>
      <h4 className='rightbarTitle'>Subscriptions</h4>
      <div className="rightbarFollowings">
        {subscriptions.map((subscription) => (
          <Link to ={"/profile/" + subscription.username} style={{textDecoration: "none"}}>
          <div className="rightbarFollowing"> 
          <img src={subscription.profilePicture ? PF + subscription.profilePicture : PF + "person/noAvatar.png" } alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">{subscription.username}</span>
          </div>
          </Link>
        ))}
        </div>
        
      </>
    );
  };

  return (
    <div className='sidebar'>
        <div className='rightbarWrapper'>
          {user ? <ProfileRightbar /> : <HomeRightbar />}
        </div>
    </div>
  )
}
