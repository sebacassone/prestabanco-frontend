import { MouseEvent, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import PaymentIcon from '@mui/icons-material/Payment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SecurityIcon from '@mui/icons-material/Security';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import { Link } from 'react-router-dom';
import user from '../../interfaces/ResponseUser';

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [user, setUser] = useState<user>({
    idUser: 0,
    rutUser: '',
    phoneUser: '',
    emailUser: '',
    birthdayUser: '',
    nameUser: '',
    firstLastNameUser: '',
    secondLastNameUser: '',
    passwordUser: '',
    statusUser: '',
    typeUser: '',
    idAddress: 0,
  });

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user: user = JSON.parse(storedUser);
      setUser(user);
    }
  }, []);

  const menuItems = [
    { text: '', icon: <HomeIcon />, path: '/intranet' },
    {
      text: 'Credit Simulator',
      icon: <MonetizationOnIcon />,
      path: '/credit-simulator',
    },
    {
      text: 'Ver Solicitudes',
      icon: <RequestQuoteIcon />,
      path: '/view-requests',
    },
    {
      text: 'Transferir',
      icon: <TransferWithinAStationIcon />,
      path: '/transfer',
    },
    {
      text: 'Pagar o Recuperar',
      icon: <PaymentIcon />,
      path: '/pay-or-recover',
    },
    { text: 'Inversiones', icon: <TrendingUpIcon />, path: '/investments' },
    { text: 'Seguros', icon: <SecurityIcon />, path: '/insurance' },
    { text: 'Descuentos', icon: <LocalOfferIcon />, path: '/discounts' },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#3f51b5' }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontFamily: 'Roboto, sans-serif' }}
          >
            Hola {user.nameUser}!
          </Typography>
          <div>
            <IconButton
              size="large"
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
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={handleClose}
                sx={{ fontFamily: 'Roboto, sans-serif' }}
              >
                Profile
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                sx={{ fontFamily: 'Roboto, sans-serif' }}
              >
                My account
              </MenuItem>
              <MenuItem
                onClick={handleLogout}
                sx={{ fontFamily: 'Roboto, sans-serif' }}
              >
                Logout
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 1,
          marginTop: 2,
          flexWrap: 'wrap',
        }}
      >
        {menuItems.map((item) => (
          <Button
            key={item.text || 'home'}
            component={Link}
            to={item.path}
            variant="contained"
            color="primary"
            startIcon={item.icon}
            sx={{ fontFamily: 'Roboto, sans-serif', minWidth: '120px' }}
          >
            {item.text}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
