import { MouseEvent, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import PaymentIcon from '@mui/icons-material/Payment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SecurityIcon from '@mui/icons-material/Security';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import user from '../../interfaces/ResponseUser';
import { themeColors } from '../../assets/theme';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Logo from '../Logo';

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
      <AppBar position="static" sx={{ backgroundColor: themeColors.primary }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Logo />
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontFamily: 'Roboto, sans-serif',
              marginLeft: '1rem',
            }}
          >
            Hola, {user.nameUser}!
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: 'auto',
              marginRight: '1rem',
            }}
          >
            <Button
              variant="contained"
              sx={{
                borderRadius: '20px',
                bgcolor: 'grey',
                color: 'white',
                marginRight: '1em',
                transition: 'all 0.3s ease',
              }}
              startIcon={<AccountCircleIcon />}
            >
              Mi cuenta
            </Button>
            <Button
              variant="contained"
              sx={{
                borderRadius: '20px',
                bgcolor: 'red',
                color: 'white',
                transition: 'all 0.3s ease',
              }}
              onClick={handleLogout}
              startIcon={<LogoutIcon sx={{ color: 'white' }} />}
            >
              Salir de la cuenta
            </Button>
          </Box>
        </Box>
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
            sx={{
              fontFamily: 'Roboto, sans-serif',
              minWidth: '120px',
              backgroundColor: themeColors.secondary,
              '&:hover': {
                backgroundColor: themeColors.accent,
              },
            }}
          >
            {item.text}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
