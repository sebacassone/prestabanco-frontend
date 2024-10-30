import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Error from '../assets/images/error.jpeg';
import NavbarHome from './NavbarHome';

const Error404: React.FC = () => {
  return (
    <div>
      <NavbarHome></NavbarHome>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundImage: `url(${Error})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h1"
          sx={{ fontSize: '6rem', marginBottom: '1rem' }}
        >
          404
        </Typography>
        <Typography variant="h4" sx={{ marginBottom: '1rem' }}>
          Página no encontrada
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: '2rem' }}>
          Lo sentimos, pero la página que estás buscando no existe.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{
            padding: '10px 20px',
            bgcolor: '#9B7EBD',
            borderRadius: '20px',
          }}
          href="/"
        >
          Volver al inicio
        </Button>
      </Box>
    </div>
  );
};

export default Error404;
