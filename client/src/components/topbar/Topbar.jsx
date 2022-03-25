import React from 'react'
import "./topbar.css"
import {Search, Person, Chat, Notifications} from "@material-ui/icons"
import {Link} from "react-router-dom"
import { AuthContext } from '../../context/AuthContext'
import {useEffect, useState, useContext, useRef} from "react";
import axios from "axios";

export default function Topbar(){

    //const {user} = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [data, setData] = useState([]);
    const [user, setUser] = useState({});
    const { user: currentUser, dispatch } = useContext(AuthContext);   
    
    useEffect(() => {
        const fetchUser = async () =>{
          const res = await axios.get('/users/id/' + currentUser._id);
          setUser(res.data)
    
        };
        fetchUser();
      }, [currentUser._id]);


    return (
        <div   
            className='topbarContainer'>
                <div className= 'topbarLeft'>
                    <Link to='/' style={{textDecoration:"none"}}>
                    <img style= {{ display: "flex", width: undefined, height: '45px', resizeMode: 'contain'}} src={PF + 'CoinComLogo.png'} alt="logo" />
                    </Link>
                </div>
                <div className= 'topbarCenter'>
                    <span className='searchInput'> {"Today is " + ((new Date().toLocaleString('en-us', {  weekday: 'long' })))  + ", " + ((new Date().toLocaleString('en-us', {  month: 'long' }))) + " " + (new Date().getDate()) + "... Let's make it a special one!" } </span>
                    </div>
                <div className= 'topbarRight'>
                    <div className='topbarLink'>
                        <Link to={'/connect'} style={{textDecoration:"none"}}>
                        <ul className='topbarLink'>Connect to Metamask </ul>
                        </Link>
                    </div>
                    <div className="topbarIcons">
                        <div className='topbarIconItem'>
                            <Person />
                            <span className="topbarIconBadge">1</span>
                        </div>
                        {/*<div className='topbarIconItem'>
                            <Chat />
                            <span className="topbarIconBadge">2</span>
    </div>*/}
                        <div className='topbarIconItem'>
                            <Notifications />
                            <span className="topbarIconBadge">1</span>
                        </div>
                    </div>
                    <Link to= {`/profile/${user.username}`}>
                    <img src={user.profilePicture ? PF + user.profilePicture : PF + 'person/noAvatar.png'}alt="" className="topbarImg" />
                    </Link> 
            </div>
        </div>
    );
}