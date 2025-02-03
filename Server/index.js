require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const proveedoresRoutes = require("./Routes/proveedoresRoutes");
const clientesRoutes = require("./Routes/clientesRoutes");
const lotesRoutes = require("./Routes/lotesRoutes");
const productosRoutes = require("./Routes/productosRoutes");
const stockRoutes = require("./Routes/stockRoutes");
const sociosRoutes = require("./Routes/sociosRoutes");
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
app.use("/api", sociosRoutes);
app.use("/api", loteConfiguracionesRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});