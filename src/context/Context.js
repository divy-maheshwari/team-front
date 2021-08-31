import { createContext, useContext, useState } from "react";

const AddContext = createContext();

export function useLocalContext() {
  return useContext(AddContext);
}

export function ContextProvider({ children }) {
  const [createClassDialog, setCreateClassDialog] = useState(false);
  const [joinClassDialog, setJoinClassDialog] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loggedInMail, setLoggedInMail] = useState(null);
  const [isTeacher, setIsTeacher] = useState(false);
  
  const value = {
    createClassDialog,
    setCreateClassDialog,
    joinClassDialog,
    setJoinClassDialog,
    loggedInMail,
    loggedInUser,
    isTeacher,
    setIsTeacher,
    setLoggedInMail,
    setLoggedInUser
  };
  return <AddContext.Provider value={value}>{children}</AddContext.Provider>;
}
