import React from 'react';
import "./profile.css";
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import Rightbar from '../../components/rightbar/Rightbar';
import Feed from '../../components/feed/Feed';
//import {Users} from "../../dummyData"
import {useEffect, useState, useContext} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const username = useParams().username;
    const [subscribers, setSubscribers] = useState([]);
    const { user: currentUser, dispatch } = useContext(AuthContext);
  
    useEffect(() => {
      const fetchUser = async () => {
        const res = await axios.get('/users/' + username);
        setUser(res.data);
  
      };
      fetchUser();
    }, [username]);

    console.log(user._id);

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

    console.log(subscribed);

    return (
      <>
        <Topbar />
        <div className="profile">
          <Sidebar />
          <div className="profileRight">
            <div className="profileRightTop">
              <div className="profileCover">
                <img
                  className="profileCoverImg"
                  src={
                    user.coverPicture
                      ? PF + user.coverPicture
                      : PF + "person/noCover.png"
                  }
                  alt=""
                />
                <img
                  className="profileUserImg"
                  src={
                    user.profilePicture
                      ? PF + user.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                />
              </div>
              <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
              </div>
            </div>
            {user.username !== currentUser.username && subscribed === true && (
            <div className="profileRightBottom">
              <Feed username={username} />
              <Rightbar user={user} />
            </div>
            )}
          </div>
        </div>
      </>
    );
  }