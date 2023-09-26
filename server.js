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
app.use(cors());

app.use("/auth", authRoutes);
app.use("/api", userRoutes);

app.use((req, res, next) => {
  res.status(404).send("404 - not found");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
