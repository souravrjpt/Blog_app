import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Link from '@mui/material/Link';
import PersonIcon from '@mui/icons-material/Person';

import Btn from '../button/Button'
import BasicButtons from '../button/Button';
import { useNavigate } from 'react-router-dom';
import { BASE_URL, CREATE_BLOG_URL, MY_BLOG_URL } from '../../constants/routes';
import { CREATE_BLOG, LOGGED_USER, MY_BLOGS } from '../../constants/helpers';

const pages = ['My Blogs','Create Blog'];
const settings = ['Logout'];

export const  Header = ({loggedUser, setLoggedUser}) => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    // console.log(setting, event.currentTarget);
    // localStorage.removeItem(LOGGED_USER);
    // setLoggedUser(null);
    // navigate(BASE_URL); 
    setAnchorElUser(null);
  };

  const onClickLogout = (event, setting) => {
    localStorage.removeItem(LOGGED_USER);
    setLoggedUser(null);
    navigate(BASE_URL);
  }

  const openPageClickHandler = (page) => {
    if(page === MY_BLOGS){
      navigate(MY_BLOG_URL);
    }
    if(page === CREATE_BLOG){
      navigate(CREATE_BLOG_URL);
    }
  }


  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href={BASE_URL}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
           
          </Typography>

          {loggedUser && <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              // anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              // open={Boolean(anchorElNav)}
              // onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <Button key={page} onClick={openPageClickHandler}>
                  <Typography textAlign="center">{page}</Typography>
                </Button>
              ))}
            </Menu>
          </Box>}
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
            
          </Typography>
          {loggedUser && <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => openPageClickHandler(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>}
          {
           !loggedUser && <Box sx={{flexGrow: 0, width:"90%", textAlign:"right", margin:"1rem"}}>
              <Button
                variant='outlined'
                sx={{
                  background: "white"
                }}
              >
                <Link
                  href="/signin"
                  sx={{
                    color: "black",
                    textDecoration: "none"
                  }}
                >
                  Sign In
                </Link>
              </Button>
            </Box>
          }
          {loggedUser && <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Typography sx={{margin: '1rem'}}>{loggedUser.name}</Typography>
                <PersonIcon/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} >
                  <Typography onClick={(event) => onClickLogout(event, setting)} textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;