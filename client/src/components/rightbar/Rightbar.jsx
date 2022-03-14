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

  console.log(subscribers);
  console.log(currentUser._id);
  const filterData = subscribers.filter(item => item._id.includes(currentUser._id));
  console.log(filterData);
  //console.log(subscribers["_id"].includes(currentUser._id));
  var subscribed = 0 ;

  if(filterData.length === 1){
     subscribed = 1;
  } else {
     subscribed = 2;
  }

  console.log(subscribed);

  const [followed, setFollowed] = useState(
    currentUser.subscriptions.includes(user && user.id)
  );

  console.log(followed);


  const handleClick = async () => {
    try {
      if (followed) {
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
      setFollowed(!followed);
    } catch (err) {
    }
  };

  const HomeRightbar = () => {
    return (
      <>
       <div className='birthdayContainer'>
            <img className='birthdayImg' src={PF+"gift.png"} alt=''/>
            <span className='birthdayText'>
              <b>Jon Black </b> and <b> 4 other creators </b>  have a birthday today!
              </span>
            </div>  
            <img className='rightbarAd' src={PF+"ad.png"} alt=''/>
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
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
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