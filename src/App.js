import { Fragment, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './assets/styles.css'

import Navbar from "./Layouts/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

import AuthContextProvider from "./context/AuthContext";
import ProtectedRoute from "./Utility/ProtectedRoute";
import setDefaultHeader from "./Utility/SetAxiosDefaultHeader";
import Lisence from "./pages/Lisence/Lisence";
import InvoiceList from "./pages/Invoice/InvoiceList";
import Invoice from "./pages/Invoice/Invoice";

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

              <ProtectedRoute exact path='/invoice-list' component={InvoiceList} />
              <ProtectedRoute exact path='/invoice' component={Invoice} />
              <Route exact path='/login' component={Login} />
              <Route exact path='*' component={() => "404 not found"} />
          </Switch>

        </Fragment>
    </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;