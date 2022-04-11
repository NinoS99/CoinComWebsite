import React from 'react'
import "./share.css"
import {PermMedia, Label, Room, EmojiEmotions, Cancel} from "@material-ui/icons"
import { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";


export default function Share() {
    //const { user } = useContext(AuthContext);
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file, setFile] = useState(null);
    const { user: currentUser, dispatch } = useContext(AuthContext); 

    useEffect(() => {
        const fetchUser = async () =>{
          const res = await axios.get('/users/id/' + currentUser._id);
          setUser(res.data)
    
        };
        fetchUser();
      }, [currentUser._id]);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
          userId: user._id,
          desc: desc.current.value,
        };

        if(file){
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName;
            console.log(newPost);
            try {
              await axios.post("/upload", data);
            } catch (err) {
                console.log(err)
            }
        }

        try {
            await axios.post("/posts", newPost);
            window.location.reload();
        } catch (err) {
            
        }

    };


  return (
    <div className='share'>
        <div className='shareWrapper'>
            <div className='shareTop'>
                <img className='shareProfileImg' src={user.profilePicture ? PF + user.profilePicture: PF + "person/noAvatar.png"} alt=""/>
                <input placeholder={"What's on your mind " + user.username + "?"}
                className='shareInput' ref={desc}/>
            </div>
            <hr className='shareHr'/>
            {file && (
                <div className="shareImgContainer"> 
                <img className='shareImg' src={URL.createObjectURL(file)} alt="" />
                <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
                 </div>
            )}
            <form className='shareBottom' onSubmit={submitHandler}>
                <label htmlFor='file' className='shareOption'>
                    <PermMedia htmlColor='tomato' className='shareIcon'/>
                    <span className='shareOptionText'> Photo or Video </span>
                    <input style={{display: "none" }} type="file" id="file" accept='.png,.jpeg,.jpg,.mp4' onChange={(e)=>setFile(e.target.files[0])} />
                </label>
                <div className='shareOption'>
                    <Label htmlColor='green' className='shareIcon'/>
                    <span className='shareOptionText'> Tag </span>
                </div>
                <div className='shareOption'>
                    <Room htmlColor='blue' className='shareIcon'/>
                    <span className='shareOptionText'> Location </span>
                </div>
                <div className='shareOption'>
                    <EmojiEmotions htmlColor='goldenrod' className='shareIcon'/>
                    <span className='shareOptionText'> Mood </span>
                </div>
                <button className='shareButton' type='submit'>Share Now!</button>
            </form>
        </div>
    </div>
  );
}
