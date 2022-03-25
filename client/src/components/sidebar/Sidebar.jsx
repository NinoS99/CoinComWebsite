import React from 'react';
import "./sidebar.css";

import {
    RssFeed,
    Chat,
    PlayCircleFilledOutlined,
    Group,
    Bookmark,
    HelpOutline,
    WorkOutline,
    Event,
    School,
    Search,
  } from "@material-ui/icons";
import {Users} from "../../dummyData"
import CloseFriend from '../closeFriend/CloseFriend';
import {Link} from "react-router-dom"
import { AuthContext } from '../../context/AuthContext'
import {useEffect, useState, useContext, useRef} from "react";
import axios from "axios";

export default function Sidebar() {
const [query, setQuery] = useState("");
const [data1, setData1] = useState([]);
const searchUser = useRef();

var URL = window.location.href  
let result = URL.includes("profile");

useEffect(() => {
  const fetchData = async () => {
    const search = {
        query: searchUser.current.value,
    }
    const res = await axios.post('users/search', search);
    //setData1(res.data.user);

    var length = res.data.user.length

    if(length === 1){
        var result1 = res.data.user[0].username;
        var searchResults = [result1];
    }

    else if(length === 2){
        var result1 = res.data.user[0].username;
        var result2 = res.data.user[1].username;
        var searchResults = [result1, result2];
    }

    else if(length === 3){
        var result1 = res.data.user[0].username;
        var result2 = res.data.user[1].username;
        var result3 = res.data.user[2].username;
        var searchResults = [result1, result2, result3];
    }

    setData1(searchResults);
    console.log(searchUser.current.value);
    console.log(searchResults);
    console.log(data1);
    //console.log(results);
  };
  if (query.length > 0) fetchData();
}, [query]);

    return (
      <> 
      <div className="sidebar">
        <div className="sidebarWrapper">
 
          <hr className="sidebarHr" />
          <ul className="sidebarFriendList">
          {!result && (  
          <div className="searchbar"> 
            <Search className='searchIcon'/>
            <input type="text" placeholder= "Search for content creators... "  className='searchInput2' ref={searchUser} onChange={(e)=>{
                setQuery(e.target.value);
                console.log(e.target.value);
            }} />
            </div>
            )}
            {data1 && query && (
              <> 
          <div className='searchbar1'>
          <Link style={{textDecoration:"none"}} to={`profile/${data1[0]}`}> 
          <ul className='searchResult'> {data1[0]}
          </ul>
          </Link>
          </div> 
          <div className='searchbar1'>
          <Link style={{textDecoration:"none"}}  textDecoration="none" to={`profile/${data1[1]}`}>
          <ul className='searchResult'> {data1[1]}
          </ul>
          </Link>
          </div> 
          <div className='searchbar1'>
          <Link style={{textDecoration:"none"}}  textDecoration="none" to={`profile/${data1[1]}`}>
          <ul className='searchResult'> {data1[2]}
          </ul>
          </Link>
          </div> 
          </>
            )
          }
          </ul>
        </div>
      </div>
      </>
    );
  }
