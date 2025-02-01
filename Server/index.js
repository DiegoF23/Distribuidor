require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();



const productosRoutes = require("./routes/productosRoutes");
const stockRoutes = require("./routes/stockRoutes");

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


app.use("/api", productosRoutes);
app.use("/api", stockRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 