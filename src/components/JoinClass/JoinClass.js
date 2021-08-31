import React, { useState } from "react";
import { Avatar, Button, Dialog, Slide, TextField } from "@material-ui/core";
import { useLocalContext } from "../../context/Context";
import { Close } from "@material-ui/icons";
import "./style.css";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const JoinClass = () => {
  const {
    joinClassDialog,
    setJoinClassDialog,
    loggedInUser,
    loggedInMail,
    setLoggedInMail
  } = useLocalContext();

  const [classCode, setClassCode] = useState("");
  const [error, setError] = useState(false);


  const handleSubmit = () => {
    console.log("yayy ho gya!!!");
    const data = {
      classRoomId: classCode
    };
    const token = Cookies.get('token');
    axios
      .patch("http://34.125.110.209/api/user/join", data,{
        headers: {
          Authorization: 'Bearer '+ token
      }
      })
      .then((data) => {
        setJoinClassDialog(false);
        setLoggedInMail("user");
      })
      .catch((err) => {
        setError(true)
        console.log("failed");
      });
  };
  return (
    <div>
      <Dialog
        fullScreen
        open={joinClassDialog}
        onClose={() => setJoinClassDialog(false)}
        TransitionComponent={Transition}
      >
        <div className="joinClass">
          <div className="joinClass__wrapper">
            <div
              className="joinClass__wraper2"
              onClick={() => setJoinClassDialog(false)}
            >
              <Close className="joinClass__svg" />
              <div className="joinClass__topHead">Join Class</div>
            </div>
            <Button
              className="joinClass__btn"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Join
            </Button>
          </div>
          <div className="joinClass__form">
            <p className="joinClass__formText">
              You're currently signed in as {loggedInUser?loggedInUser: "Guest"}
            </p>
            <div className="joinClass__loginInfo">
              <div className="joinClass__classLeft">
                <Avatar src={loggedInUser?.photoURL} />
                {loggedInMail}
                <div className="joinClass__loginText">
                  <div className="joinClass__loginName">
                    {loggedInUser?.loggedInUser}
                  </div>
                  <div className="joinClass__loginEmail">
                    {loggedInUser?.loggedInMail}
                  </div>
                </div>
              </div>
            
            </div>
          </div>
          <div className="joinClass__form">
            <div
              style={{ fontSize: "1.25rem", color: "#3c4043" }}
              className="joinClass__formText"
            >
              Class Code
            </div>
            <div
              style={{ color: "#3c4043", marginTop: "-5px" }}
              className="joinClass__formText"
            >
              Ask your teacher for the class code, then enter it here.
            </div>
            <div className="joinClass__loginInfo">
              <TextField
                id="outlined-basic"
                label="Class Code"
                variant="outlined"
                value={classCode}
                onChange={(e) => setClassCode(e.target.value)}
                helperText={error && "No class was found"}
              />

            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
export default JoinClass;
