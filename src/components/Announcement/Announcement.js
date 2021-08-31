import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./style.css";
const Announcement = ({classData}) => {
 
  return (
    <div>
      {classData.map(({announcement}) => (
        <div className="amt">
          <div className="amt__Cnt">
            <div className="amt__top">
              <Avatar />
              <div>{announcement.author}</div>
             
            </div>
            <span className="time">{new Date(announcement.updated).toISOString().substring(0, 10)}</span>
            <p className="amt__txt">{announcement.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Announcement;
