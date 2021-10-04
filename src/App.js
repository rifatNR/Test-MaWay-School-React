import { Fragment, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "./Layouts/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

import AuthContextProvider from "./context/AuthContext";
import ProtectedRoute from "./Utility/ProtectedRoute";
import setDefaultHeader from "./Utility/SetAxiosDefaultHeader";
import Lisence from "./pages/Lisence/Lisence";

if(localStorage.maway_token){
  setDefaultHeader(localStorage.maway_token)
}

function App() {
  
  return (
    <AuthContextProvider>
    <BrowserRouter>
      <Fragment>
          <Navbar />
          <Switch>
              <Route exact path='/' component={Login} />
              <ProtectedRoute exact path='/dashboard' component={Dashboard} />
              <ProtectedRoute exact path='/lisences' component={Lisence} />
              <Route exact path='/login' component={Login} />
              <Route exact path='*' component={() => "404 not found"} />
          </Switch>

        </Fragment>
    </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;