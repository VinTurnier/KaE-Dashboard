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
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
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
        if (user.isOwner){
          setMenus([{text:'Stations',icon: <LocalGasStationIcon/>},
                  {text:'Sales', icon: <AttachMoneyIcon/>},
                  {text: 'Inventory', icon: <AssignmentIcon/>},
                  {text:'Managers',icon: <PeopleIcon/>},
                  {text: "Trucks", icon: <LocalShippingIcon/>},
                ])
        }
        else{
          setMenus([
                  {text:'Stations',icon: <LocalGasStationIcon/>},
                  {text:'Sales', icon: <AttachMoneyIcon/>},
                  {text: 'Inventory', icon: <AssignmentIcon/>},
                  {text: "Trucks", icon: <LocalShippingIcon/>},
                  ])
        }
      }
      onLoad();
    },[user.isOwner])

    function renderListInventory(){
      props.history.push("/inventory")
      props.handleDrawerClose()
    }

    function renderListDeliverySummary(){
      props.history.push("/deliverySummary")
      props.handleDrawerClose()
    }

    function renderListStation(){
      props.history.push('/')
      props.handleDrawerClose()
    }

    function renderAddStation(){
      props.history.push("/addStation")
      props.handleDrawerClose()
    }

    function renderTrucksOrdered(){
      props.history.push("/trucksOrdered")
      props.handleDrawerClose()
    }

    function renderAddInventory(){
      props.history.push("/addInventory")
      props.handleDrawerClose()
    }

    function renderAddDelivery(){
      props.history.push("/addDelivery")
      props.handleDrawerClose()
    }

    function renderComponentFromPath(url){
      props.history.push(url)
      props.handleDrawerClose()
    }

    function selectSubMenu(text){
      switch(text){
        case 'Stations':
          setSubMenu([{text:'List Stations', icon:<LocalGasStationIcon/>, action: renderListStation},
                      {text: 'Add Station', icon: <AddIcon/>,action: renderAddStation}])
          break;

        case 'Managers':
          setSubMenu([{text:'List Managers',icon:<PeopleIcon/>,action: ()=>renderComponentFromPath("/managers")},
                      {text: 'Add Manager', icon:<AddIcon/>, action: ()=>renderComponentFromPath("addManager")},
                      ])
          break;
        
          case 'Inventory':
            setSubMenu([
              {text:'Dashboard', icon: <EqualizerIcon/>, action: renderListInventory},
              {text: 'Add Inventory', icon: <AddIcon/>, action: renderAddInventory },
              {text:'Delivery Summary', icon: <BallotIcon/>,action: renderListDeliverySummary},
              {text: 'Add Delivery', icon: <AddIcon/>, action: renderAddDelivery },
              {text:'Trucks Ordered', icon: <LocalShippingIcon/>,action: renderTrucksOrdered},
              
              
              
            ]);
            break;
          
          case 'Delivery':
            setSubMenu(['Order History','Add Delivery','Data Visualization']);
            break;
          
          case 'Trucks':
            setSubMenu(['List Trucks','Truck Rating']);
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

    