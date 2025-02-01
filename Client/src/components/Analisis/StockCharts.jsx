import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import ChartJS from "chart.js/auto"; 

const StockCharts = ({ stock }) => {
  const dataPie = {
    labels: stock.map((item) => item.producto),
    datasets: [
      {
        label: "Stock",
        data: stock.map((item) => item.cantidad),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  const dataBar = {
    labels: stock.map((item) => item.producto),
    datasets: [
      {
        label: "Cantidad en stock",
        data: stock.map((item) => item.cantidad),
        backgroundColor: "#36A2EB",
      },
    ],
  };

  return (
    <div>
      <div>
        <h2>Porcentaje de Stock por Producto</h2>
        <Pie data={dataPie} key="pie-chart" redraw />
      </div>
      <div>
        <h2>Comparación de Stock</h2>
        <Bar data={dataBar} key="bar-chart" redraw />
      </div>
    </div>
  );
};

export default StockCharts;
