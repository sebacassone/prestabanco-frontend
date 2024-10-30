import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Overlay from '../assets/images/overlay.png';

const OverlayImage: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100vw',
        height: '50vh',
        backgroundImage: `url(${Overlay})`, // Make sure to replace this with the correct path to your image
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover', // Ensure the entire image is displayed
        display: 'flex',
        justifyContent: 'center', // Center the text horizontally
        alignItems: 'center', // Center the text vertically
        color: 'white',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay covering the entire image
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
            padding: '20px',
            borderRadius: '10px',
            maxWidth: '600px', // Adjust this value as needed
          }}
        >
          <Typography variant="h4" gutterBottom>
            Porque nos mueve un mundo financiero simple y transparente
          </Typography>
          <Typography variant="h5">
            Endeudate con nosotros y vive una experiencia financiera única.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default OverlayImage;
