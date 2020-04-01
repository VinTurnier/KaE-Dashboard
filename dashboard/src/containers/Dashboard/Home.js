import React from 'react';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import CallHistory from './CallHistory';

import { API } from "aws-amplify";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
      },
    fixedHeight: {
        height: 240,
      },
}));



export default function Home(props){
    const {isAuthenticated} = props
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [inventory, setInventory] = React.useState([])
    const [station, setStation] = React.useState([])
    const [query, setQuery] = React.useState("/0?start_date="+Date.now()+"&end_date="+Date.now()-30)

    React.useEffect(()=>{

        if (!isAuthenticated) {
            return;
          }

        function loadUserProfile() {
            return API.get("user", '/user');
          }

        async function onLoad(){
            try{
                let response = await loadUserProfile();
                console.log(response)
            } catch (e){
               console.log(e)
            }

        }
        onLoad();
    },[isAuthenticated,query])

    return(
        <div style={{width:'100%', padding: '20px'}}>
            <Grid container direction='row' justify='center' alignContent='center'>
                <Grid item sm={9}>
                    <CallHistory 
                        inventoryData={inventory} 
                        stationData={station} 
                        queryString={query} />
                </Grid>
            </Grid>
            
        </div>
        
    )
}