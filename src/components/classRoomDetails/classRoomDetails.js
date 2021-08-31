import React, { useEffect, useState } from "react";
import "./style.css";
import { useLocalContext } from "../../context/Context";
import axios from "axios";
import { Drawer, Header } from "../index";

const ClassRoomDetails = (classRoomId) => {
  const { loggedInMail } = useLocalContext();
  const [classRoomData, setData] = useState(null);
  useEffect(() => {
    axios
      .get(`http://34.125.110.209/api/classRoom/${classRoomId}`)
      .then((req, res) => {
        if (res) {
          setData(res);
        }
      })
      .catch((err) => {
        console.log("failed");
      });
  }, [classRoomId]);

  return (
    <div className="main">
      <Header />
      <Drawer />
      <div className="data">
        <h1 className="heading">{classRoomData.className}</h1>
        <h1 className="tacherName">{classRoomData.teacherName}</h1>
        <div className="annnouncements">
          {classRoomData.annnouncements.map((idx, data) => {
            return (
              <div key={idx} className="card">
                <div className="text">{data.text}</div>
                <div className="time">{data.lastUpdated}</div>
              </div>
            );
          })}
        </div>
        <div className="assignment">
          {classRoomData.assignments.map((idx, data) => {
            return (
              <div key={idx} className="card">
                <div className="text">{data.text}</div>
                <div className="time">{data.dueDate}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ClassRoomDetails;
