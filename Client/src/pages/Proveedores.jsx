import React from 'react'
import {useApiContext} from '../contexts/api/ApiContext'
import MainProveedores from '../components/Proveedores/MainProveedores'
import ProveedoresCreate from '../components/Proveedores/ProveedoresCreate'
import ProveedoresDelete from '../components/Proveedores/ProveedoresDelete'

const Proveedores = () => {
  const { API_URL } = useApiContext();

  <ProveedoresCreate API_URL={API_URL}/>;
  <ProveedoresDelete API_URL={API_URL}/>;

  return (
    <div>
        <MainProveedores API_URL={API_URL}/>
        
    </div>
  )
}

export default Proveedores