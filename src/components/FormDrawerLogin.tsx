import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormDrawerProps from "../interfaces/FormDrawerLogin";
import RUTInput from "./RutInput";
import PasswordInput from "./PasswordComponent";

const FormDrawer: React.FC<FormDrawerProps> = ({ open, onClose }) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      PaperProps={{
        sx: {
          width: 400,
          backgroundColor: 'white',
          padding: 4,
          transition: 'transform 0.6s ease-in-out',
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: '20em',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Ingresa a tu cuenta
        </Typography>
        <RUTInput />
        <PasswordInput />

        <Button
          variant="contained"
          sx={{
            marginTop: 2,
            bgcolor: '#F6F6F6',
            color: 'black',
            borderRadius: '50px',
            padding: '10px 20px',
            width: '80%',
            '&:hover': {
              bgcolor: '#D4BEE4',
            }
          }}
        >
          Ingresar
        </Button>
      </Box>
    </Drawer>
  );
};

export default FormDrawer;
