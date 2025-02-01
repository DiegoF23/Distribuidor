require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const proveedoresRoutes = require("./Routes/proveedoresRoutes");
const clientesRoutes = require("./Routes/clientesRoutes");


const app = express();
const port = process.env.PORT || 5000;
const productosRoutes = require("./routes/productosRoutes");
const stockRoutes = require("./routes/stockRoutes");

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Rutas
app.use('/api', proveedoresRoutes);
app.use('/api', clientesRoutes);

app.use("/api", productosRoutes);
app.use("/api", stockRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 