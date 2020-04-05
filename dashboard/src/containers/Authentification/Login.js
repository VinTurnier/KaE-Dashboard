import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Phone from '@material-ui/icons/Phone';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';
import loginStyle from '../../styles/loginStyle';

import {Auth} from 'aws-amplify';


export default function Login(props) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [alert, setAlert] = React.useState(null)
    const classes = loginStyle();
    
    async function handleSubmit(event) {
        event.preventDefault();
        try {
            await Auth.signIn(email.toLowerCase(), password);
            props.userHasAuthenticated(true);
            props.setUsername(email);
        } catch (e) {
            if(e.message==="User is not confirmed."){
                props.setUsername(email);
                props.history.push("/confirmUser")
                
            }
            else{
                setAlert(e.message)
            }
        }
    }

    function renderCurrentPage(){
        props.history.push("/")
    }

    function renderSignInForm(){
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
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e)=>setEmail(e.target.value)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e)=>setPassword(e.target.value)}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Sign In
            </Button>
            <Grid container>
                <Grid item xs>
                <Link href="/forgotpassword" variant="body2">
                    Forgot password?
                </Link>
                </Grid>
                <Grid item>
                <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                </Link>
                </Grid>
            </Grid>
            </form>
        </div>
        </Container>
        )
    }

    return (
        <div>
            {props.isAuthenticated?renderCurrentPage():renderSignInForm()}
        </div>
    );
}