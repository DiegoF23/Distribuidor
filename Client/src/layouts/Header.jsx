import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { GiGorilla } from "react-icons/gi";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenuClick = () => console.log("Menu hamburguesa clickeado");
  const handleProfileClick = () => console.log("Configuración de perfil clickeada");

  return (
    <AppBar position="sticky" elevation={0} sx={{
      backgroundColor: 'var(--color-primary-400)',
      borderBottom: '1px solid rgba(255,255,255,.2)'
    }}>
      <Toolbar sx={{ minHeight: 64 }}>
        {isMobile && (
          <IconButton edge="start" color="inherit" onClick={handleMenuClick} sx={{ mr: 1 }}>
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, display:'flex', alignItems:'center', gap:1 }}>
          <GiGorilla /> Lomo Plateado — Distribución
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton edge="end" color="inherit" onClick={handleProfileClick}>
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
