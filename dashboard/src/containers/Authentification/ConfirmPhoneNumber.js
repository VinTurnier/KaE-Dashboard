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

export default function ConfirmPhoneNumber(props){
    const classes = useStyles();
    const [confirmCode, setConfirmCode] = React.useState("");

    const handleConfirmCode=()=>{
        Auth.confirmSignUp(props.username, confirmCode
        ).then(()=>{
            props.history.push("/")
        })
        .catch(err => console.log(err));
    }

    const handleChange=(e)=>{
        console.log(e.target.value)
        setConfirmCode(e.target.value);
    }

    const handleResendCode=()=>{
        Auth.resendSignUp(props.username)
            .then(() => {
            console.log('code resent successfully');
        }).catch(e => {
            console.log(e);
        });
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
                autoComplete="confirmCode"
                name="confirmCode"
                variant="outlined"
                required
                fullWidth
                id="confirmCode"
                label="Confirm Code"
                autoFocus
                value = {confirmCode}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleConfirmCode}
          >
            Confirm
          </Button>
          <Grid container justify="flex-end">
          <Grid item xs>
                <Link variant="body2" onClick={handleResendCode}>
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