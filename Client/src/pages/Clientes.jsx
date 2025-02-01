import React from 'react'
import ClientesDelete from '../components/clientes/ClientesDelete';
import ClientesCreate from '../components/clientes/ClientesCreate';
import MainClientes from '../components/clientes/MainClientes';

const Clientes = ({API_URL}) => {

    <ClientesCreate />;
    <ClientesDelete API_URL={API_URL}/>;
  
    return (
      <div>
          <MainClientes API_URL={API_URL}/>
          
      </div>
    )
  }

export default Clientes