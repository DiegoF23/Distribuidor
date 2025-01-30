import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import '../styles/Layouts/Login.css';
import Gorila from '../Assets/Gorila-login.webp';

const Login = () => {
  return (
    <div className="body-login">
      <img src={Gorila} alt="" className="img-gorila-login"/>
       <TextField
       className="inputs-mui-login"
        id="outlined-user-input"
        label="Usuario"
        type="text"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px", // Aplica el border-radius correctamente
          },
        }}
      />
      <TextField
      className="inputs-mui-login"
        id="outlined-password-input"
        label="Contraseña"
        type="password"
        autoComplete="current-password"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px", // Aplica el border-radius correctamente
          },
        }}
      />
      <div> <input type='Checkbox' /> Mostrar Contraseña</div>
     
      <button> Ingresar </button>
      
    </div>
  );
};

export default Login;
