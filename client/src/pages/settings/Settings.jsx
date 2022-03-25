import React from 'react';
import "./settings.css";
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import Rightbar from '../../components/rightbar/Rightbar';
import Feed from '../../components/feed/Feed';
//import {Users} from "../../dummyData"
import {useEffect, useState, useContext} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {PermMedia, Label, Room, EmojiEmotions, Cancel} from "@material-ui/icons"
import { useRef } from "react";
import {useHistory} from "react-router-dom";
import {Link} from "react-router-dom";


//const username = useRef();


export default function Settings() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
   // const username = useParams().username;
    const { user: currentUser, dispatch } = useContext(AuthContext);   
    const username = useRef();
    const email = useRef();
    const desc = useRef();
    const city = useRef();
    const from = useRef();
    const creatorType = useRef();
    const monthlyPrice = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history = useHistory();
    const [data, setData] = useState([]);
    const [file, setFile] = useState(null);
    const [file1, setFile1] = useState(null);

    console.log(currentUser.profilePicture);
    console.log(user);

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



    console.log(data._id);
    console.log(data.profilePicture);
    console.log(file);
    console.log(file1);

    const handleClick = async (e)=>{
        e.preventDefault();


        const user1 = {
            userId: data._id,
            username: username.current.value ? username.current.value : data.username,
            email: email.current.value ? email.current.value : data.email,
            desc: desc.current.value ? desc.current.value : data.desc,
            city: city.current.value ? city.current.value : data.city,
            from: from.current.value ? from.current.value : data.from,
            creatorType: creatorType.current.value ? creatorType.current.value : data.creatorType,
            monthlyPrice: monthlyPrice.current.value ? monthlyPrice.current.value : data.monthlyPrice,

        };

        if(file){
          const data = new FormData();
          const fileName = Date.now() + file.name;
          data.append("name", fileName);
          data.append("file", file);
          console.log(fileName); 
          user1.profilePicture = fileName;
          console.log(user1)
          console.log(PF + fileName)

          try {
            await axios.post("/upload", data);
          } catch (err) {
              console.log(err)
          }
        }

        if(file1){
          const data = new FormData();
          const fileName = Date.now() + file1.name;
          data.append("name", fileName);
          data.append("file", file1);
          console.log(fileName); 
          user1.coverPicture = fileName;
          console.log(user1)
          console.log(PF + fileName)

          try {
            await axios.post("/upload", data);
          } catch (err) {
              console.log(err)
          }
        }

        try {
            await axios.put("/users/" + data._id, user1);
            console.log(user1);
            window.location.reload();

        } catch (err) {
            console.log(err)
        }

        
    }

    return(

        <div className='login'>
          <div className="loginWrapper">
              <div className="loginLeft">
                  <h3 className='loginLogo'>CoinCom</h3>
                  <span className='loginDesc'> Settings</span>

                <label htmlFor='file' className='shareOption'>
                    <img src={data.profilePicture ? PF + data.profilePicture : PF + 'person/noAvatar.png'} alt="" className="shareProfileImg1" />
                    <span className='shareOptionText1'> Update Profile Picture </span>
                    <input style={{display: "none" }} type="file" id="file" accept='.png,.jpeg,.jpg' onChange={(e)=>setFile(e.target.files[0])} />
                </label>
                <label htmlFor='file1' className='shareOption'>
                    <img src={data.coverPicture ? PF + data.coverPicture : PF + 'person/noCover.png'}alt="" className="shareCoverImg" />
                    <span className='shareOptionText1'> Update Cover Picture </span>
                    <input style={{display: "none" }} type="file" id="file1" accept='.png,.jpeg,.jpg' onChange={(e)=>setFile1(e.target.files[0])} />
                </label>
              </div>
              <div className="loginRight">
                  <form className="loginBox" >
                      <span > Username</span>
                      <input placeholder= {data.username ? data.username: "Username"}  ref={username} className="loginInput" />
                      <span > Email</span>
                      <input placeholder= {data.email ? data.email: "Email"} ref={email}  className="loginInput" type="email" />
                      <span > Description</span>
                      <input placeholder= {data.desc ? data.desc: "Update your description!"}  ref={desc} className="loginInput" />
                      <span > City</span>
                      <input placeholder= {data.city ? data.city: "Update your city!"}  ref={city} className="loginInput" />
                      <span > Hometown</span>
                      <input placeholder= {data.from ? data.from: "Update your hometown!"} ref={from} className="loginInput" />
                      <span > Creator Type</span>
                      <input placeholder= {data.creatorType ? data.creatorType: "What type of Creator Are You?"}  ref={creatorType} className="loginInput" />
                      <span > Monthly Charge</span>
                      <input placeholder= {data.monthlyPrice ? "Current Charge: " + data.monthlyPrice + " (Default Price)": "Default Price is 20 GeneCoins!"} ref={monthlyPrice} className="loginInput" />
                      <button className='loginButton' type='submit' onClick={handleClick} >Update Profile!</button>
                      <Link to={`/profile/${data.username}`} style={{ textDecoration: 'none' }}>
                        <button className='loginButton' type='submit' >Back</button>
                        </Link> 
                  </form>
              </div>
          </div> 
      </div>
      
    );
}