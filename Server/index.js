require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const proveedoresRoutes = require("./routes/proveedoresRoutes");
const clientesRoutes = require("./routes/clientesRoutes");
const lotesRoutes = require("./routes/lotesRoutes");
const productosRoutes = require("./routes/productosRoutes");
const stockRoutes = require("./routes/stockRoutes");
const loteConfiguracionesRoutes = require("./routes/loteConfiguracionesRoutes");
const app = express();


const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Rutas
app.use('/api', proveedoresRoutes);
app.use('/api', clientesRoutes);
app.use("/api", productosRoutes);
app.use("/api", stockRoutes);
app.use("/api", lotesRoutes);
app.use("/api", loteConfiguracionesRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 