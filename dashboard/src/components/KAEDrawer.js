import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import KaeDrawerStyle from '../styles/KaeDrawerStyle';
import {useTheme } from '@material-ui/core/styles';
import AssignmentIcon from '@material-ui/icons/Assignment';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import HistoryIcon from '@material-ui/icons/History';
import PhoneIcon from '@material-ui/icons/Phone';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PeopleIcon from '@material-ui/icons/People';
import AddIcon from '@material-ui/icons/Add';
import BallotIcon from '@material-ui/icons/Ballot';

export default function GmsDrawer(props){
    const classes = KaeDrawerStyle();
    const theme = useTheme();
    const [menus,setMenus] = React.useState([])
    const [subMenu,setSubMenu] = React.useState([])
    const user = {
      isOwner: true
    }

    React.useEffect(()=>{
      
      function onLoad(){
          setMenus([{text:'History',icon: <HistoryIcon/>},
                ])
        }
      onLoad();
    },[])

    function renderComponentFromPath(url){
      props.history.push(url)
      props.handleDrawerClose()
    }

    function selectSubMenu(text){
      switch(text){
        case 'History':
          setSubMenu([{text:'Call History', icon:<PhoneIcon/>, action: ()=>renderComponentFromPath("/")},
                      ])
          break;

          default:
            setSubMenu([]);
            break;
      }
    }

    return(
        <div>
        <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={props.open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={props.handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {menus.map((menu, index) => (
            <ListItem button key={menu.text} onClick={()=>selectSubMenu(menu.text)}>
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {subMenu.map((submenu, index) => (
            <ListItem button key={submenu.text} onClick={submenu.action}>
              <ListItemIcon>{submenu.icon}</ListItemIcon>
              <ListItemText primary={submenu.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className={classes.drawerHeader} />
    </div>
    )
}

    