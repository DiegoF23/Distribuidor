import React from 'react'
import { Card, CardContent, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { MdAttachMoney, MdWarning, MdPeople, MdTrendingUp } from "react-icons/md";

// Datos de ejemplo para los gráficos
const salesData = [
  { name: "Ene", ventas: 4000 },
  { name: "Feb", ventas: 3000 },
  { name: "Mar", ventas: 2000 },
  { name: "Abr", ventas: 2780 },
  { name: "May", ventas: 1890 },
];

// Estilos CSS Grid
const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    padding: "20px",
  },
  card: {
    width: "100%",
  },
};


const MainHome = () => {
  
 return (
  <div style={styles.container}>
  {/* Resumen general */}
  

  {/* Gráfico de ganancias */}
  <Card style={styles.card}>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        <MdAttachMoney /> Ganancias Mensuales
      </Typography>
      <BarChart width={500} height={300} data={salesData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="ventas" fill="#8884d8" />
      </BarChart>
    </CardContent>
  </Card>

  {/* Bebidas con próximo vencimiento */}
  <Card style={styles.card}>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        <MdWarning /> Bebidas con Próximo Vencimiento
      </Typography>
      <Typography variant="body1">
        Espacio para lista de bebidas...
      </Typography>
    </CardContent>
  </Card>

  {/* Clientes deudores */}
  <Card style={styles.card}>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        <MdPeople /> Clientes Deudores
      </Typography>
      <Typography variant="body1">
        Espacio para lista de clientes...
      </Typography>
    </CardContent>
  </Card>

  {/* Resumen de salud del negocio */}
  <Card style={styles.card}>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        <MdTrendingUp /> Resumen General
      </Typography>
      <Typography variant="body1">
        Espacio para métricas generales...
      </Typography>
    </CardContent>
  </Card>
</div>
  )
}

export default MainHome