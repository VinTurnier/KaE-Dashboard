import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Phone from '@material-ui/icons/Phone';
import MuiPhoneNumber from 'material-ui-phone-number';
import Alert from '@material-ui/lab/Alert';

import {Auth, API} from 'aws-amplify';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
  const classes = useStyles();
  const [alert, setAlert] = React.useState(null)
  const blankSignUp = {
      firstName: "", lastName: "", email: "",
      phoneNumber: "", password: "", password1: "",errors:{
          passwordError: false
      } 
    }
  const [signUpData, setSignUpData] = React.useState(blankSignUp)

  const handleOnChange=(e)=>{
    let updateSignUp = {...signUpData}
    updateSignUp[e.target.name] = e.target.value
    setSignUpData(updateSignUp)
  }

  const handlePhoneNumber=(value)=>{
      setSignUpData(
          {...signUpData,
          phoneNumber: value}
      )
  }

  const handlePasswordComparison=()=>{
    if (signUpData.password === signUpData.password1){
      return signUpData.password
    }
    else{
      setAlert("The Password's entered do not match");
    }
    return "";
  }

  const createUser=()=>{
      Auth.signUp({
        username: signUpData.email.toLowerCase(),
        password: handlePasswordComparison(),
        attributes: { 
            phone_number: signUpData.phoneNumber,
            given_name: signUpData.firstName.capitalize(),
            family_name: signUpData.lastName.capitalize()
            }
        }).then((data)=>{
            let info = {
              body: {
                aws_cognito_sub: data.userSub,
                firstName: signUpData.firstName.capitalize(),
                lastName: signUpData.lastName.capitalize(),
                phoneNumber: signUpData.phoneNumber,
                description: ""
              }
            }
            props.setUsername(signUpData.email);
            console.log(info)
            API.post("user","/user",info).then(response=>{
              console.log(response);
              props.history.push("/confirmUser")
            }).catch(error => {
              setAlert(error.message)
              console.log(error.response)
          });
            
            
        })
          .catch(err =>{
            if (signUpData.password !== signUpData.password1){
              setAlert("The Passwords entered do not match");
            }
            else{
              setAlert(err.message);
            }
             console.log(err)});
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <Avatar className={classes.avatar}>
            <Phone />
            </Avatar>
            <Typography component="h1" variant="h5">
            Bienvenu a Kasik a L'Ecoute
            </Typography>
            {alert!==null?<Alert severity="error">{alert}</Alert>:null}
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={signUpData.firstName}
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={signUpData.lastName}
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={signUpData.email}
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
            <MuiPhoneNumber 
                variant="outlined"
                required
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                autoFormat={false}
                id="number"
                defaultCountry={'ht'}
                value={signUpData.phoneNumber}
                onChange={handlePhoneNumber}
                />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={signUpData.password}
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password1"
                label="Re-Enter Password"
                type="password"
                id="password1"
                autoComplete="current-password"
                value={signUpData.password1}
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={createUser}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}