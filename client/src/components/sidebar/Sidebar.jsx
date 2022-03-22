import React from 'react';
import {Link} from "react-router-dom";
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
  } from "@material-ui/icons";
import {Users} from "../../dummyData"
import CloseFriend from '../closeFriend/CloseFriend';

export default function Sidebar() {
    return (
      <div className="sidebar">
        <div className="sidebarWrapper">
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <RssFeed className="sidebarIcon" />
              <Link to = "/">
              <button className="sidebarButton">Feed</button>
              </Link>
            </li>
            <li className="sidebarListItem">
              <Chat className="sidebarIcon" />
              <Link to = "/">
              <button className="sidebarButton">Chats</button>
              </Link>
            </li>
            <li className="sidebarListItem">
              <PlayCircleFilledOutlined className="sidebarIcon" />
              <Link to = "/">
              <button className="sidebarButton">Videos</button>
              </Link>
            </li>
          </ul>

          <hr className="sidebarHr" />
          <ul className="sidebarFriendList">
            {Users.map(u => (
              
              <CloseFriend key={u.id}user={u}/>
            ))}
          </ul>
          
        </div>
      </div>
    );
  }
