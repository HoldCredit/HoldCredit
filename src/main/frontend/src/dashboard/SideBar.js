import {useState} from "react";
import {
  Box,
  Collapse, Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DehazeIcon from '@mui/icons-material/Dehaze';
import HomeIcon from '@mui/icons-material/Home';
import {ExpandLess, ExpandMore, StarBorder} from "@mui/icons-material";
import PersonIcon from '@mui/icons-material/Person';

function SideBar(props) {

  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box spacing={2}>
      <List>
        {
          props.sideMenus.map(function (menuValue, i) {
            return (
              <div key={i}>
                <ListItem onClick={() => {
                  props.selectMenu(menuValue)
                }}>
                  <ListItemButton>
                    <ListItemIcon>
                      {
                        menuValue == "Home" ? <HomeIcon/> : <DehazeIcon/>
                      }
                    </ListItemIcon>
                    <ListItemText primary={menuValue}/>
                  </ListItemButton>
                </ListItem>
              </div>
            )
          })
        }
        <ListItem>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <PersonIcon/>
            </ListItemIcon>
            <ListItemText primary="고객센터"/>
            {open ? <ExpandLess/> : <ExpandMore/>}
          </ListItemButton>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" in={open} timeout="auto" unmountOnExit>
            {
              props.serviceMenus.map(function (sideMenuValue, i) {
                return (
                  <div key={i}>
                    <ListItemButton sx={{pl: 4}} onClick={() => {
                      props.selectMenu(sideMenuValue)
                    }}>
                      <ListItemIcon>
                        <DehazeIcon/>
                      </ListItemIcon>
                      <ListItemText primary={sideMenuValue}/>
                    </ListItemButton>
                  </div>
                )
              })
            }
          </List>
        </Collapse>
      </List>


    </Box>

  )
}

  export default SideBar;
