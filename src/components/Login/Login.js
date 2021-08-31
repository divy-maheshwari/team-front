import { Button,Switch,FormGroup,FormLabel,FormControlLabel } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import logo from "../../assets/logo.png";
import axios from "axios";
import { useLocalContext } from "../../context/Context";
import "./style.css";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";


const Login = () => {
  const {loggedInMail,setLoggedInMail,setIsTeacher, setLoggedInUser } = useLocalContext();
  const [ruTeacher, setRUteacher]=useState(true);
 
  const data ={
    isTeacher:ruTeacher
  }
  useEffect(()=>{
    data.isTeacher=ruTeacher

  },[ruTeacher])
  const onSuccessfulLogin = (response) => {
    console.log("yayy ho gya!!!");
     data.name= response.profileObj.name;
     data.email=response.profileObj.email;
     data.token=response.tokenId;
    console.log(data)
    axios
      .post("http://localhost:4000/api/user/api/v1/auth/google", data)
      .then((user) => {
        console.log("succesful");
        console.log(user);
        Cookies.set("token", user.data.token2, { expires: 1 });
        console.log(user.data.user)
        setLoggedInUser(user.data.user.name);
        setLoggedInMail(user.data.user.email);
        setIsTeacher(user.data.user.isTeacher);
      })
      .catch((err) => {
        console.log("failed in login");
      });
  };

  const onLoginFailure = (response) => {
    console.log("nahi hua!!!");
    <Redirect to="/signin" />;
  };
  return (
    <div className="login">
      <img className="login__logo" src={logo} alt="Classroom" />
  <FormGroup>
  <FormControlLabel
    control={<Switch checked={ruTeacher} onChange={()=>setRUteacher((prev)=>!prev)} />}
    label="Are you Teacher"
  />
</FormGroup>
      <GoogleLogin
        clientId="1006688868253-jr5nt1ekg4lgf4rstj2gjdo9oa29ppeu.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={onSuccessfulLogin}
        onFailure={onLoginFailure}
        cookiePolicy={"single_host_origin"}
        clientSecret="m_LdLAT1uMXx3IfmrnCKmrlW"
      />
    </div>
  );
};

export default Login;
