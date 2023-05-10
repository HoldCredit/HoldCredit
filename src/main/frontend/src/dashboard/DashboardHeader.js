import {styled} from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import {SidebarMainMenus, SidebarSubMenus} from "./DashboardSidebar";
import "../styles/dashboard.css"
import LogoutIcon from '@mui/icons-material/Logout';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import Box from '@mui/material/Box';
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

const drawerWidth = 280;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

function DashBoardHeader() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return(
    <>
      {/* Header */}
      <AppBar position="absolute" open={open} elevation={1} sx={{backgroundColor:'#FFE34A', color:'#464646'}}>
        <Toolbar sx={{ pr: '24px'}} >
          <IconButton edge="start" color="inherit" aria-label="open drawer"
            onClick={toggleDrawer} sx={{ marginRight: '36px',...(open && { display: 'none' }), }} >
            <MenuIcon />
          </IconButton>

          <Typography noWrap sx={{ flexGrow: 1 }}
                      onClick={() => {navigate('/')}}>
            <Button color="inherit" sx={{fontSize:'20px', fontStyle:'italic',fontWeight:'bold'}}>
              Hold Credit
            </Button >
          </Typography>

          {/* 개인정보수정 */}
          <Box>
            <Button sx={{ color: '#464646' }}>
              <AutoFixHighIcon/>개인정보 수정
            </Button>
          </Box>

          {/* 로그아웃 */}
          <Box>
            <Button sx={{ color: '#464646' }}>
              <LogoutIcon /> Logout
            </Button>
          </Box>

        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer variant="permanent" open={open}>
        <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: [1], }} >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>

        <Divider />
        <List component="nav">
          <SidebarMainMenus />
          <Divider sx={{ my: 1 }} />
          <SidebarSubMenus />
        </List>
      </Drawer>
    </>
  )
}
export default DashBoardHeader;

