import AppBar from "@mui/material/AppBar";
import { useState, MouseEvent } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./Logo";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SubMenu from "./Sidemenu";
import {Fragment} from 'react';
import FormDrawer from "./FormDrawerLogin";

export default function NavbarHome() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuId, setMenuId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  // Lo que hace esto es que al hacer click en un botón, se abre un menú con opciones
  const handleClick = (event: MouseEvent<HTMLElement>, id: string) => {
    if (id === 'login') {
        setDrawerOpen(true);
    } else {
        setAnchorEl(event.currentTarget); // Se obtiene el elemento que se hizo click
        setMenuId(id); // Se obtiene el id del menú que se abrió
    }
  };

  const handleClose = () => {
    setAnchorEl(null); // Se cierra el menú
    setMenuId(null); // Se reinicia el id del menú
    setDrawerOpen(false);
  };

  // Submenús
  const menuOptions = {
    cuentas: ["Cuenta 1", "Cuenta 2"],
    tarjetas: ["Tarjeta 1", "Tarjeta 2"],
    creditos: ["Crédito 1", "Crédito 2"],
    inversiones: ["Inversión 1", "Inversión 2"],
    seguros: ["Seguro 1", "Seguro 2"],
    oportunidades: ["Oportunidad 1", "Oportunidad 2"],
    educacion: ["Educación 1", "Educación 2"]
  };

  // Botones que se van a generar con el .map
  const buttons = [
    { id: 'cuentas', label: 'CUENTAS' },
    { id: 'tarjetas', label: 'TARJETAS CMR' },
    { id: 'creditos', label: 'CRÉDITOS' },
    { id: 'inversiones', label: 'INVERSIONES' },
    { id: 'seguros', label: 'SEGUROS' },
    { id: 'oportunidades', label: 'OPORTUNIDADES ÚNICAS' },
    { id: 'educacion', label: 'EDUCACIÓN FINANCIERA' }
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: '#9B7EBD'}}>
        <Toolbar sx={{ justifyContent: "center", alignItems: "center" }}>
          <Logo />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
           {/* Se hace un botón de Ingesar y de Abre tu cuenta */}
            <Button variant="contained" sx={{ 
                borderRadius: '20px', 
                border: '2px solid #EEEEEE',
                color: 'white', 
                backgroundColor: 'transparent', 
                marginRight: '1em', 
                marginTop: '5em',
                transition: 'all 0.3s ease', 
                '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                },
                '&:active': {
                    transform: 'scale(0.95)', 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                }
                }}>
                Abre tu cuenta
            </Button>

            <Button variant="contained" sx={{ 
                borderRadius: '20px', 
                border: '2px solid white',
                bgcolor: '#EEEEEE', 
                color: '#3B1E54', 
                marginTop: '5em',
                transition: 'all 0.3s ease', 
                '&:hover': {
                    backgroundColor: '#d9d9d9', 
                },
                '&:active': {
                    transform: 'scale(0.95)', 
                    backgroundColor: '#cccccc', 
                }
            }} onClick={(event) => handleClick(event, 'login')}>
                Ingresar
            </Button>

          </Box>
        </Toolbar>
         <Toolbar sx={{ justifyContent: 'center' }}>
          {buttons.map((button, index) => (
            <Fragment key={button.id}>
              <Button
                sx={{ color: '#EEEEEE', transition: 'all 0.3s ease', '&:hover': { color: 'white' }, '&:active': { transform: 'scale(0.95)' }}}
                onClick={(event) => handleClick(event, button.id)}
              >
                {button.label}
              </Button>
              {index < buttons.length - 1 && (
                <Typography sx={{ color: '#EEEEEE', marginX: 1 }}>|</Typography>
              )}
            </Fragment>
          ))}
        </Toolbar>
      </AppBar>

      {Object.keys(menuOptions).map((key) => (
        <SubMenu
          key={key}
          menuId={key}
          anchorEl={anchorEl}
          open={Boolean(anchorEl) && menuId === key}
          onClose={handleClose}
          options={menuOptions[key as keyof typeof menuOptions]}
        />
      ))}

      <FormDrawer open={drawerOpen} onClose={handleClose} />
    </Box>
  );
}
