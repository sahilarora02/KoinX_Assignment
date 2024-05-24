const express = require("express");
const db = require("./config/dbConnect");
const dotenv = require("dotenv");
const tradeRoutes = require("./Routes/trades")
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8000;
dotenv.config();

db();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/trades', tradeRoutes);
app.listen(PORT, () => {
  console.log(`Server has started and running on port ${PORT}`);
});
