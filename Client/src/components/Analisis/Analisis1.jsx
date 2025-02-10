import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Alert,
  Container,
  CssBaseline,
} from "@mui/material";
import LoteForm from "./LoteForm";
import LoteList from "./LoteList";
import StockCharts from "./StockCharts";

const Analisis1 = () => {
  const [lote, setLote] = useState({
    producto: "Pepsi 2L",
    pallets: 0,
    basesPorPallet: 0,
    fardosPorBase: 0,
    botellasPorFardo: 0,
  });
  const [stock, setStock] = useState([]);
  const [lotes, setLotes] = useState([]);
  const [editingLoteId, setEditingLoteId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStock = async () => {
      try {
        await axios.get("https://jsonplaceholder.typicode.com/users");
        const datosSimulados = [
          { producto: "Pepsi 2L", cantidad: 100 },
          { producto: "Coca-Cola 2L", cantidad: 150 },
          { producto: "Sprite 2L", cantidad: 75 },
        ];
        setStock(datosSimulados);
      } catch (err) {
        setError("Error al cargar los datos del stock.");
      }
    };
    fetchStock();
  }, []);

  const calcularBotellas = (loteData) => {
    const { pallets, basesPorPallet, fardosPorBase, botellasPorFardo } = loteData;
    return pallets * basesPorPallet * fardosPorBase * botellasPorFardo;
  };

  const handleSubmitLote = (loteData) => {
    const botellas = calcularBotellas(loteData);
    if (botellas <= 0) {
      setError("El lote no puede tener 0 botellas.");
      return;
    }
    if (editingLoteId !== null) {
      const oldLote = lotes.find((l) => l.id === editingLoteId);
      let nuevoStock = stock.map((item) => {
        if (item.producto === oldLote.producto) {
          return { ...item, cantidad: item.cantidad - oldLote.total };
        }
        return item;
      });
      nuevoStock = nuevoStock.map((item) => {
        if (item.producto === loteData.producto) {
          return { ...item, cantidad: item.cantidad + botellas };
        }
        return item;
      });
      setStock(nuevoStock);
      const nuevosLotes = lotes.map((l) =>
        l.id === editingLoteId ? { ...loteData, total: botellas, id: editingLoteId } : l
      );
      setLotes(nuevosLotes);
      setEditingLoteId(null);
    } else {
      const nuevaLote = { ...loteData, total: botellas, id: Date.now() };
      setLotes([...lotes, nuevaLote]);
      const nuevoStock = stock.map((item) =>
        item.producto === loteData.producto
          ? { ...item, cantidad: item.cantidad + botellas }
          : item
      );
      setStock(nuevoStock);
    }
    setError("");
  };

  const handleEditLote = (id) => {
    setEditingLoteId(id);
  };

  const handleDeleteLote = (id) => {
    const loteToDelete = lotes.find((l) => l.id === id);
    if (loteToDelete) {
      const nuevoStock = stock.map((item) =>
        item.producto === loteToDelete.producto
          ? { ...item, cantidad: item.cantidad - loteToDelete.total }
          : item
      );
      setStock(nuevoStock);
      setLotes(lotes.filter((l) => l.id !== id));
    }
  };

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" color="primary">
          Análisis de Datos
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        <Grid container spacing={4}>
          {/* Formulario de Lote */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Crear o Editar Lote
              </Typography>
              <LoteForm
                lote={lote}
                setLote={setLote}
                onSubmit={handleSubmitLote}
                editingLoteId={editingLoteId}
              />
            </Paper>
          </Grid>
          {/* Lista de Lotes */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Lista de Lotes
              </Typography>
              <LoteList
                lotes={lotes}
                onEdit={handleEditLote}
                onDelete={handleDeleteLote}
              />
            </Paper>
          </Grid>
          {/* Gráficos de Stock */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Gráficos de Stock
              </Typography>
              <StockCharts stock={stock} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Analisis1;