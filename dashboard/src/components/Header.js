// React 
import React from 'react'
import {withRouter} from 'react-router-dom';

// Material UI
import {AppBar, 
        Toolbar, 
        IconButton, 
        Typography, Menu, MenuItem} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// AWS Amplify 
import {Auth, API} from 'aws-amplify';

// Styles
import KaeStyle from '../styles/KaeStyle';
import KaeDrawerStyle from '../styles/KaeDrawerStyle';
// Components
import KAEDrawer from './KAEDrawer';

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
      backgroundColor: "white",
      borderRadius: 10
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));


const GmsAppBar= props =>{
    const classes = KaeStyle();
    const drawerClass = KaeDrawerStyle()
    const Formclass = useStyles();
    const {menuProps} = props
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    const [open, setOpen] = React.useState(false);
    const blankStatus = {userId: 0, statusId: 0}
    const [status, setStatus] = React.useState(blankStatus);

    async function loadStatus(){
      return await API.get("user","/userstatus")
    }
    React.useEffect(()=>{
      if (menuProps.isAuthenticated === false){
        return
      }
      setOpen(false)
      loadStatus().then(resp =>{
        setStatus({
          userId: resp.message.userId,
          statusId: resp.message.statusId})
      });
    },[menuProps.isAuthenticated])

    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };
  
    const handleMenu = event => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    async function handleSignOutButton(){
        let info ={
          body: {
            userId: status.userId,
            statusId: 2 // 2 for busy
          }
        }
        await API.post("user","/userstatus", info).then(resp=>{
          console.log("Status Updated")
          setAnchorEl(null);
          Auth.signOut().then(()=>{
            menuProps.userHasAuthenticated(false);
            props.history.push('/login')
          });
          
        });
    }
    const handleChange = event => {
        setStatus({
          ...status,
          statusID: event.target.value});
        let info ={
          body: {
            userId: status.userId,
            statusId: event.target.value
          }
        }
        API.post("user","/userstatus", info).then(resp=>{
          console.log("Status Updated");
          window.location.reload(true);
        });
      };

    const renderUserOptions=()=>{
        return(
            <div>
                <FormControl className={Formclass.formControl}>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status.statusId}
                    onChange={handleChange}
                    >
                    <MenuItem value={1}>Available</MenuItem>
                    <MenuItem value={2}>Busy</MenuItem>
                    <MenuItem disabled value={3}>On Call</MenuItem>
                    </Select>
                </FormControl>
                <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        open={openMenu}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleSignOutButton}>Logout</MenuItem>
                    </Menu>
            </div>
        )
    }

    return (
    <div className={drawerClass.root}>
        <AppBar 
            position="fixed"
            className={clsx(drawerClass.appBar, {
                [drawerClass.appBarShift]: open,
              })}
              >
            <Toolbar>
            {menuProps.isAuthenticated
                ? <IconButton 
                    edge="start" 
                    className={clsx(drawerClass.menuButton, open && drawerClass.hide)} 
                    color="inherit" 
                    onClick={handleDrawerOpen}
                    aria-label="menu">
                    <MenuIcon />
                </IconButton>:null}
                <Typography variant="h6" className={classes.title}>
                Kasik a L'ecoute
                </Typography>
                <div>
                    {menuProps.isAuthenticated?renderUserOptions():null}
                </div>
            </Toolbar>
        </AppBar>
        <KAEDrawer 
                history={props.history} 
                handleDrawerClose={handleDrawerClose} 
                open={open} 
                isAuthenticated={menuProps.isAuthenticated}/>
    </div>
    )
}

export default withRouter(GmsAppBar);