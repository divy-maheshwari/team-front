import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent
} from "@material-ui/core";
import React, { useState } from "react";
import { useLocalContext } from "../../context/Context";
import Form from "./Form";
import axios from "axios";
import "./style.css";

const CreateClass = () => {
   const { createClassDialog, setCreateClassDialog } = useLocalContext();
  return (
    <div>
      <Dialog
        onClose={() => setCreateClassDialog(false)}
        aria-labelledby="customized-dialog-title"
        open={createClassDialog}
        maxWidth="lg"
        className="form__dialog"
      >
          <Form /> 
      </Dialog>
    </div>
  );
};

export default CreateClass;
