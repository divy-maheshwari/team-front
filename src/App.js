import React, { useEffect, useState } from "react";
import {
  Drawer,
  JoinedClasses,
  Login,
  Main
} from "./components/index.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { IsUserRedirect, ProtectedRoute } from "./routes/Routes";
import { useLocalContext } from "./context/Context";
import axios from "axios";
import Cookies from "js-cookie";
function App() {
  const { loggedInMail, isTeacher } = useLocalContext();
  const [joinedClasses, setJoinedClasses] = useState([]);
  const token = Cookies.get("token");


  useEffect(() => {
      axios
        .get(`http://34.125.110.209/api/user/`,{isTeacher},{
          headers: {
              Authorization: 'Bearer '+ token
          }
      })
        .then((data) => {
          console.log("success in app");
          setJoinedClasses(data.data.classRoomData);
        })
        .catch((err) => {

          console.log("failed in app",err);
        });
    }, [loggedInMail,isTeacher,token]);

  useEffect(() => {
  }, [loggedInMail]);
  return (
    <Router>
      <Switch>
        {joinedClasses && joinedClasses.map((item, index) => (
          <Route key={index} exact path={`/${item.id}`}>
            <Drawer />
            <Main classData={item} />
          </Route>
        ))}
        <IsUserRedirect
          user={loggedInMail}
          loggedInPath="/"
          path="/signin"
          exact
        >
          <Login />
        </IsUserRedirect>

        <ProtectedRoute user={loggedInMail} path="/" exact>
          <Drawer />
          <ol className="joined">
            {joinedClasses && joinedClasses.map((item) => (
              <JoinedClasses classData={item} />
            ))}
          </ol>
        </ProtectedRoute>
      </Switch>
    </Router>
  );
}

export default App;
