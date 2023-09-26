const express = require("express");
const authRoutes = require("./routes/authenticationRoutes");
const userRoutes = require("./routes/userRoutes");
const { SERVER_PORT } = require("./config/contants");
const connectDb = require("./config/dbConnection");
const cors = require("cors");
require("dotenv").config();

connectDb();
const app = express();
const PORT = SERVER_PORT;

app.use(express.json());

var corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  optionsSuccessStatus: 200, // For legacy browser support
};
app.use(cors(corsOptions));

app.use("/auth", authRoutes);
app.use("/api", userRoutes);

app.use((req, res, next) => {
  res.status(404).send("404 - not found");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
