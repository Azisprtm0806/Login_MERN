import React from "react";
import Login from "./component/Login";
import Daftar from "./component/Daftar";
import Dashboard from "./component/Dashboard";
import LupaPassword from "./component/LupaPassword";
import ResetPassword from "./component/ResetPassword";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/daftar" component={Daftar} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/lupa-password" component={LupaPassword} />
        <Route path="/resetpassword/:token" component={ResetPassword} />
      </Switch>
    </div>
  );
}

export default App;
