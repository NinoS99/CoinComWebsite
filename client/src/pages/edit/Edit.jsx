import React from 'react';
import "./edit.css";
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

export default function Edit() {

    //const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext);
    const postId = useParams().postId;
    console.log(postId)
    const [data, setData] = useState([]);

    let history = useHistory();

    const desc = useRef();
    //var descInput = ("#descInput").html();
    //var descInput = ('#descInput').text();

    useEffect(() => {
        const getData = async ()=>{
          try {
            const dataList = await axios.get("/posts/" + postId);
            setData(dataList.data);
            console.log(data)
          } catch (err) {
            console.log(err);
          }
        };
        getData();
      },[postId]);

      console.log(currentUser._id);
      console.log(data.img)
      console.log(data.createdAt)

      const handleClick = async () => {

        var descInput = document.getElementById('descInput').textContent;

        const post = {
            userId: currentUser._id,
            desc: descInput? descInput : data.desc,

        };

        try {
            await axios.put("/posts/" + data._id, post);
            window.location.reload();

        } catch (err) {
            console.log(err)
        }

      }

      const handleClickDeletePost = async () => {

        console.log(currentUser._id);
        console.log(data.userId);

      const user = {
          userId: data.userId,
      };

      console.log(user);

        try {
            await axios.delete("/posts/" + postId, user);


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
        <span className='editHeader'> Edit Post </span>
        </div>
          <div className="post1">
                  <div className='postWrapper'>
                      <div className='postTop'>
                          <div className='postTopLeft'>
                              <span className='postUsername'>
                                  {currentUser.username}
                              </span>
                              <span className='postDate'> {format(data.createdAt)}</span>
                          </div>
                      </div>
                      <div className='postCenter'>
                          <div id='descInput' contenteditable="true" className='editInput1' ref={desc}> {data.desc} </div>
                          {/*<input defaultValue={data.desc} className='editInput' ref={desc} /> */}
                          <img className='postImg1' src={PF + data.img} alt='' />
                      </div>
                      <div className='postBottom'>
                      <button className='confirmButton' type='submit' onClick={handleClick} >Update Post!</button>
                      <Link to='/' style={{textDecoration:"none"}}>
                      <button className='confirmButton' type='submit'> Go Back</button>
                      </Link>
                      <Link to='/' style={{textDecoration:"none"}}>
                      <button className='confirmButton' type='submit' onClick={handleClickDeletePost} > Delete Post </button>
                      </Link>
                      </div>
                  </div>
                  
              </div>
              </>
      )

}