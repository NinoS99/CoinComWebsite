import React from 'react';
import "./report.css";
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
import {format} from "timeago.js";
import { useRef } from "react";
import { useHistory } from "react-router-dom";

export default function Report() {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext);
    const postId = useParams().postId;
    const userId = useParams().userId;
    console.log(postId);
    console.log(userId);
    const [data, setData] = useState([]);
    const [userData, setData1] = useState([data]);

    const desc = useRef();


    useEffect(() => {
        const getData = async ()=>{
          try {
            const dataList = await axios.get("/posts/" + postId);
            setData(dataList.data);
          } catch (err) {
            console.log(err);
          }
        };
        getData();
      },[postId]);


      //console.log(user.username);

    useEffect(() => {
        const getData1 = async ()=>{
            
          try {
            const dataList1 = await axios.get("/users/id/" + userId);
            setData1(dataList1.data);
          } catch (err) {
            console.log(err);
          }
        };
        getData1();
      },[userData]);

      console.log(currentUser._id);
      console.log(postId._id);
      console.log(userData.username);

      const handleClick = async () => {

        var descInput = document.getElementById('descInput').textContent;

        const report = {
            postId: postId,
            desc: descInput? descInput : "No reason given",
            userReporting: currentUser._id,

        };

        try {
            await axios.post("/reports", report);
            //window.location.reload();

        } catch (err) {
            console.log(err)
        }

      }

      return(
        <>
        <div className='topbarContainer'>
        <Link to='/' style={{textDecoration:"none"}}>
        <img style= {{ width: undefined, height: '45px', resizeMode: 'contain', justifyContent: "left"}} src={PF + 'CoinComLogo.png'} alt="logo" />
        </Link>
        <span className='editHeader'> Report Post </span>
        </div>
          <div className="post1">
                  <div className='postWrapper'>
                      <div className='postTop'>
                          <div className='postTopLeft'>
                              <span className='postUsername'>
                                  {userData.username}
                              </span>
                              <span className='postDate'> date</span>
                          </div>
                      </div>
                      <div className='postCenter'>
                        <span className='postText'>{data.desc}</span>
                        <img className='postImg' src={PF+data.img} alt=''/>
                      </div>
                      <div className='postBottom'>
                      <div id='descInput' contenteditable="true" className='editInput1' ref={desc}> Enter Reason for Report</div>
                      <Link to='/' style={{textDecoration:"none"}}>
                      <button className='confirmButton' type='submit' onClick={handleClick} >Report Post!</button>
                      </Link>
                      <Link to='/' style={{textDecoration:"none"}}>
                      <button className='confirmButton' type='submit'> Go Back</button>
                      </Link>
                      </div>
                  </div>
                  
              </div>
        </>
      )









}