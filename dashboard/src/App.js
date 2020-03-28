import React from 'react';
import './App.css';
import {Auth} from 'aws-amplify';
import Routes from './services/Routes';
import LinearProgress from '@material-ui/core/LinearProgress';
import appStyle from './styles/appStyle';

export default function App() {
  const classes = appStyle();
  const [isAuthenticated, userHasAuthenticated] = React.useState(false);
  const [isAuthenticating, setIsAuthenticating] = React.useState(true);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const appProps={
    isAuthenticated,
    userHasAuthenticated,
    isAuthenticating,
    setIsAuthenticating,
    username,
    setUsername
  }
  
  React.useEffect(() => {
    async function onLoad() {
      try {
        await Auth.currentSession();
        appProps.userHasAuthenticated(true);
      }
      catch(e) {
        console.log(e)
      }
      appProps.setIsAuthenticating(false);
    }
    onLoad();
  },[appProps]);

  function renderApp(){
    return(
      <div className="App">
      <Routes appProps={appProps}/>
    </div>
    )
  }


  return (
    <div>
      {!isAuthenticating
          ?renderApp()
          :<div className={classes.root}>
            <LinearProgress />
          </div>}
    </div>
  );
}

