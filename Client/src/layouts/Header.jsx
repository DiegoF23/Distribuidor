import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { GiGorilla } from "react-icons/gi";


const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Detecta si es vista móvil

  const handleMenuClick = () => {
    console.log("Menu hamburguesa clickeado");
  };

  const handleProfileClick = () => {
    console.log("Configuración de perfil clickeada");
  };



  return (
    <div>
      <AppBar position="static" style={{backgroundColor: 'var(--color-primary-400)'}}>
      <Toolbar>
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <GiGorilla/> Lomo Plateado
        </Typography>
        <Box display="flex" alignItems="center">
          
          <IconButton
            edge="end"
            color="inherit"
            aria-label="profile"
            onClick={handleProfileClick}
          >
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
    </div>
  )
}

export default Header