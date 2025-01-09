import { MouseEvent, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { themeColors } from '../../assets/theme';
import user from '../../interfaces/ResponseUser';
import Logo from '../Logo';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

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
      text: 'Ver Solicitudes',
      icon: <RequestQuoteIcon />,
      path: '/view-all-requests',
    },
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
            Hola, Ejecutivo {user.nameUser}!
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
            key={item.text}
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
