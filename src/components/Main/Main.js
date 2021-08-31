import { Avatar, Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import "./style.css";
import { useLocalContext } from "../../context/Context";
import axios from "axios";
import { Announcement } from "../index";

const Main = ({ classData }) => {
  const { loggedInMail } = useLocalContext();
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInput] = useState("");
  const [announcements, setAnnouncements] = useState(classData.announcements);
  const [assignment, setAssignment] = useState(classData.assignment);

  console.log(classData)
  const onSubmitClick = () => {
    axios
      .patch(
        `http://localhost:4000/api/classRoom/${classData.classRoomId}/announcement`,
        {
           text:inputValue
        }
      )
      .then((res) => {
        if (res) {
          console.log("succesful");
        }
        setAnnouncements(res.data.announcements)
      })
      .catch((err) => {
        console.log("failed");
      });
    setInput("");
    setShowInput(false);
  };

  return (
    <div className="main">
      <div className="main__wrapper">
        <div className="main__content">
          <div className="main__wrapper1">
            <div className="main__bgImage">
              <div className="main__emptyStyles" />
            </div>
            <div className="main__text">
              <h1 className="main__heading main__overflow">
                {classData.classRoomName}
              </h1>
              <div className="main__section main__overflow">
                {classData.section}
              </div>
              <div className="main__wrapper2">
                <em className="main__code">Class Code :</em>
                <div className="main__id">{classData.classRoomId}</div>
              </div>
              <div className="main__wrapper2">
                <em className="main__code">Teacher's Name :</em>
                <div className="main__id">{classData.teacherId}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="main__announce">
         <div className="main__status">
            <p>Upcoming</p>
            <p className="main__subText">No work due</p>
          </div>
          <div className="main__announcements">
            <div className="main__announcementsWrapper">
              <div className="main__ancContent">
                {showInput ? (
                  <div className="main__form">
                    <TextField
                      id="filled-multiline-flexible"
                      multiline
                      label="Announce Something to class"
                      variant="filled"
                      value={inputValue}
                      onChange={(e) => setInput(e.target.value)}
                    />
                    <div className="main__buttons">
                      <div>
                        <Button onClick={() => setShowInput(false)}>
                          Cancel
                        </Button>

                        <Button
                          onClick={onSubmitClick}
                          color="primary"
                          variant="contained"
                        >
                          Post
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="main__wrapper100"
                    onClick={() => setShowInput(true)}
                  >
                    <Avatar />
                    <div>Announce Something to class</div>
                  </div>
                )}
              </div>
            </div>
            <Announcement classData={announcements} />
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
