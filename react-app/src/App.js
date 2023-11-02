import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import Homepage from "./components/Homepage";
import Dashboard from "./components/Dashboard";
import BoardDetail from "./components/BoardDetail";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/boards">
            <Dashboard />
          </Route>
          <Route exact path="/boards/:id">
            <BoardDetail />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;

{/* <Route path="/login" >
  <LoginFormPage />
</Route>
<Route path="/signup">
  <SignupFormPage />
</Route> */}
