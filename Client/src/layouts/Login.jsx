import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import '../styles/Layouts/Login.css';
import Gorila from '../Assets/Gorila-login.webp';

const Login = () => {
  return (
    <Box className="body-login">
      <Box className="login-container">
        <img src={Gorila} alt="Gorila" className="img-gorila-login" />
        <h1 className="login-title">Iniciar Sesión</h1>
        <TextField
          className="inputs-mui-login"
          id="outlined-user-input"
          label="Usuario"
          type="text"
          fullWidth
          margin="normal"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
          }}
        />
        <TextField
          className="inputs-mui-login"
          id="outlined-password-input"
          label="Contraseña"
          type="password"
          autoComplete="current-password"
          fullWidth
          margin="normal"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
          }}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Mostrar Contraseña"
          className="checkbox-label"
        />
        <Button
          variant="contained"
          fullWidth
          sx={{
            marginTop: "20px",
            borderRadius: "10px",
            padding: "10px",
            backgroundColor: "#1976d2",
            "&:hover": {
              backgroundColor: "#115293",
            },
          }}
        >
          Ingresar
        </Button>
      </Box>
    </Box>
  );
};

export default Login;