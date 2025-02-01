require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const proveedoresRoutes = require("./Routes/proveedoresRoutes");
const clientesRoutes = require("./Routes/clientesRoutes");
const ejemplo = require("./controllers/controller");

const app = express();
const port = process.env.PORT || 5000;
const productosRoutes = require("./routes/productosRoutes");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Rutas
app.use('/api', proveedoresRoutes);
app.use('/api', clientesRoutes);

app.use("/api", productosRoutes);

// Servidor
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    ejemplo.ejemplo();
});