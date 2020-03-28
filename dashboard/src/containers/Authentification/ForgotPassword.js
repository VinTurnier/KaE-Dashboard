import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Phone from '@material-ui/icons/Phone';
import { Auth } from 'aws-amplify';

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

function GetEmailAddress(props){
    const classes = useStyles();
    const [data, setData] = props.data

    const handleNext=()=>{
        props.handler(props.step+1)
        Auth.forgotPassword(data.username)
        .then(() => {
            console.log('code successfully');
        }).catch(e => {
            console.log(e);
        });
    }

    const handleChange=(e)=>{
        setData({
            ...data,
            username: e.target.value
        })
    }
    return(
        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <Avatar className={classes.avatar}>
            <Phone />
            </Avatar>
            <Typography component="h1" variant="h5">
            Bienvenu a Kasik a L'Ecoute
            </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="email"
                name="email"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                type="email"
                value = {data.username}
                onChange={handleChange}
                autoFocus
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleNext}
          >
            Next
          </Button>
          <Grid container justify="flex-end">
          <Grid item xs>
                </Grid>
                <Grid item>
                <Link href="/login" variant="body2">
                    {"Already have an account? Sign in"}
                </Link>
                </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>

    )
}

function GetConfirmationCode(props){
    const classes = useStyles();
    const [data, setData] = props.data

    const handleNext=()=>{
        props.handler(props.step+1)
    }

    const handleBack=()=>{
        props.handler(props.step-1)
    }

    const handleChange=(e)=>{
        setData({
            ...data,
            code: e.target.value
        })
    }

    return(
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
        <Avatar className={classes.avatar}>
              <Phone />
              </Avatar>
              <Typography component="h1" variant="h5">
              Bienvenu a Kasik a L'Ecoute
              </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
                <TextField
                  name="confirmCode"
                  variant="outlined"
                  required
                  fullWidth
                  id="confirmCode"
                  label="Confirm Code"
                  value={data.code}
                  onChange={handleChange}
                  autoFocus
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleBack}
            >
              Back
            </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleNext}
            >
              Next
            </Button>
            </Grid>
            </Grid>
            <Grid container justify="flex-end">
            <Grid item xs>
            <Link variant="body2">
                    Resend Code
                </Link>
                  </Grid>
                  <Grid item>
                  <Link href="/login" variant="body2">
                      {"Already have an account? Sign in"}
                  </Link>
                  </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    )
}

function ResetPassWord(props){
    const classes = useStyles();
    const [passwords, setPasswords] = React.useState({
        password: "", password1: ""
    })
    const [data, setData] = props.data

    const handleChangePassword=(e)=>{
        let updatePassword = {...passwords}
        updatePassword[e.target.name] = e.target.value
        setPasswords(updatePassword)
    }

    const handleSubmit=()=>{
        if(passwords.password ===passwords.password1){
            Auth.forgotPasswordSubmit(data.username, 
                    data.code, 
                    passwords.password)
            .then(data =>{
             props.property.history.push("/login")
             console.log(data)})
            .catch(err => console.log(err));
            
        }else{
            alert("Passwords do not match")
        }
    }

    return(
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
        <Avatar className={classes.avatar}>
              <Phone />
              </Avatar>
              <Typography component="h1" variant="h5">
              Bienvenu a Kasik a L'Ecoute
              </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
                <TextField
                  name="password"
                  variant="outlined"
                  required
                  fullWidth
                  type="password"
                  id="password"
                  label="Password"
                  value={passwords.password}
                  onChange={handleChangePassword}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="password1"
                  variant="outlined"
                  required
                  fullWidth
                  type="password"
                  id="password1"
                  label="Re-Type Password"
                  value={passwords.password1}
                  onChange={handleChangePassword}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Confirm
            </Button>
            <Grid container justify="flex-end">
            <Grid item xs>
                  </Grid>
                  <Grid item>
                  <Link href="/login" variant="body2">
                      {"Already have an account? Sign in"}
                  </Link>
                  </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    )
}



function getStepContent(step,handler,data, props) {
    switch (step) {
      case 0:
        return <GetEmailAddress step={step} handler={handler} data={data}/>;
      case 1:
        return <GetConfirmationCode step={step} handler={handler} data={data}/>;
      case 2:
        return <ResetPassWord handler={handler} data={data} property={props}/>;
      default:
        throw new Error('Unknown step');
    }
}



export default function ForgotPassword(props){
    const classes = useStyles();
    const [step, setStep] = React.useState(0);
    const [data, setData] = React.useState({
        username: "", code: ""
    })

    const dataArr = [data, setData]
    console.log(data)
    return(
        <Container component="main" maxWidth="xs">
        {getStepContent(step,setStep, dataArr, props)}
        </Container>
    )
}