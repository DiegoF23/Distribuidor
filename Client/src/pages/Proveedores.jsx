import React from 'react'
import MainProveedores from '../components/Proveedores/MainProveedores'
import ProveedoresCreate from '../components/Proveedores/ProveedoresCreate'
import ProveedoresDelete from '../components/Proveedores/ProveedoresDelete'

const Proveedores = ({API_URL}) => {

  <ProveedoresCreate API_URL={API_URL}/>;
  <ProveedoresDelete API_URL={API_URL}/>;

  return (
    <div>
        <MainProveedores API_URL={API_URL}/>
        
    </div>
  )
}

export default Proveedores