import { Button, DialogActions, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useLocalContext } from "../../context/Context";
import axios from "axios"

const Form = () => {
  const {  setCreateClassDialog } = useLocalContext();
  const [classRoomName, setClassName] = useState("");
  const [classRoomId, setclassRoomId] = useState("");

  const [teacherId, setteacherId] = useState("");

  const { loggedInMail } = useLocalContext();

 const onFormSubmit = () => {
   console.log("yaha aa gya");
   axios.post("http://34.125.110.209/api/classRoom/new",{
     classRoomId,
     teacherId,
     classRoomName

   }).then((data)=>{
      if(data){
        console.log("succesfull")
      }
   }).catch((err)=>console.log(err))
  setCreateClassDialog(false)

  setClassName("");
  setclassRoomId("");
  setteacherId("");
 }
  return (
    <div className="form">
      <p className="class__title">Create Class</p>

      <div className="form__inputs">
        <TextField
          id="filled-basic"
          label="Class Name"
          required
          className="form__input"
          variant="filled"
          value={classRoomName}
          onChange={(e) => setClassName(e.target.value)}
        />
        <TextField
          id="filled-basic"
          label="Subject Code"
          className="form__input"
          variant="filled"
          required
          value={classRoomId}
          onChange={(e) => setclassRoomId(e.target.value)}
        />
        <TextField
          id="filled-basic"
          label="Teacher's Id"
          required
          className="form__input"
          variant="filled"
          value={teacherId}
          onChange={(e) => setteacherId(e.target.value)}
        />
       
      </div>
      <DialogActions>
        <Button color="primary"
        onClick={onFormSubmit}>Create</Button>
      </DialogActions>
    </div>
  );
};

export default Form;
