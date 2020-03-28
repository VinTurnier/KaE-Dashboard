import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import NotFound from './NotFound';

//Auth
import Login from '../containers/Authentification/Login';
import SignUp from '../containers/Authentification/SignUp';
import ForgotPassword from '../containers/Authentification/ForgotPassword';
import ConfirmPhoneNumber from '../containers/Authentification/ConfirmPhoneNumber';

//Dashboard
import Home from '../containers/Dashboard/Home';

export default function Routes({appProps}) {

    const styleList = {
        display: "flex",
        justifyContent: 'center',
        alignContent: 'center'
    }

    return (
        <div style={styleList}>
        <Switch>
          <PublicRoute exact path='/login' component={Login} appProps={appProps}/>
          <PublicRoute exact path='/signup' component={SignUp} appProps={appProps}/>
          <PublicRoute exact path='/forgotpassword' component={ForgotPassword} appProps={appProps}/>
          <PublicRoute exact path='/confirmUser' component={ConfirmPhoneNumber} appProps={appProps}/>
          <PrivateRoute exact path="/" component={Home} appProps={appProps} />

          <Route component={NotFound} />
        </Switch>
        </div>
      );
}
