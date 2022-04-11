import React from 'react'
import { useContext } from "react";
import "./post.css"
import {MoreVert, Flag} from '@material-ui/icons'
//import {Users} from "../../dummyData"
import {useEffect, useState} from "react";
import axios from "axios";
import {format} from "timeago.js"
import { Link } from "react-router-dom"
import { AuthContext } from '../../context/AuthContext'

export default function Post({post}) {
  const [like,setLike] = useState(post.likes.length)
  const [isLiked,setisLiked] = useState(false)
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  var URL = window.location.href  
  let result = URL.includes("profile");

  useEffect(() =>{
    setisLiked(post.likes.includes(currentUser._id))
  },[currentUser._id], post.likes)

  useEffect(() => {
    const fetchUser = async () =>{
      const res = await axios.get('/users/id/' + post.userId);
      setUser(res.data)

    };
    fetchUser();
  }, [post.userId]);

  const likeHandler =()=>{
      try {
          axios.put("/posts/"+post._id+"/like", {userId:currentUser._id})
      } catch (err) {
          
      }
      setLike(isLiked ? like-1 : like+1)
      setisLiked(!isLiked)
  };

  //TODO handle click
  //const handleClick = async (e)=>{
   //     console.log(post.userId);
   //     console.log(currentUser._id)
   //     window.prompt("sometext","defaultText");

 // }

  return (
    <div className="post">
        <div className='postWrapper'>
            <div className='postTop'>
                <div className='postTopLeft'>
                    {result === false && ( 
                    <Link to={`profile/${user.username}`}>
                    <img className='postProfileImg' 
                    src={user.profilePicture ? PF + user.profilePicture : PF + 'person/noAvatar.png'}
                    alt=''
                    />
                    </Link>
                    )}
                    {result === true && ( 
                    <img className='postProfileImg' 
                    src={user.profilePicture ? PF + user.profilePicture : PF + 'person/noAvatar.png'}
                    alt=''
                    />
                    )}
                    <span className='postUsername'> 
                        {user.username}
                    </span>
                    <span className='postDate'> {format(post.createdAt)}</span>
                </div>
                {post.userId === currentUser._id && (
                <Link to ={'../edit/' + post._id} style={{ textDecoration: 'none' }}>
                <div className='postTopRight' >
                <MoreVert color='white' style={{textDecoration: "none"}}/>
                </div>
                </Link>
                )}
                {post.userId !== currentUser._id && (
                <Link to ={'../report/' + post._id + "/" + post.userId} style={{ textDecoration: 'none' }}>
                <div className='postTopRight' >
                <Flag color='white' style={{textDecoration: "none"}}/>
                </div>
                </Link>
                )}
            </div>
            <div className='postCenter'>
                <span className='postText'>{post.desc}</span>
                <img className='postImg' src={PF+post.img} alt=''/>
            </div>
            <div className='postBottom'>
                <div className="postBottomLeft">
                    <img className='likeIcon' src={PF+'like.png'} onClick={likeHandler} alt=''/>
                    <img className='likeIcon' src={PF+'heart.png'} onClick={likeHandler} alt=''/>
                    <span className='postLikeCounter'>{like} people like this post!</span>
                </div>
                <div className='postBottomRight'>
                    <span className='postCommentText'>{post.comment} comments</span>
                </div>
            </div>
        </div>
    </div>
  )
}

