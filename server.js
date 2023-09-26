const express = require("express");
const authRoutes = require("./routes/authenticationRoutes");
const userRoutes = require("./routes/userRoutes");
const { SERVER_PORT } = require("./config/contants");
const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc =  require("swagger-jsdoc")
const connectDb = require("./config/dbConnection");
const cors = require("cors");
require("dotenv").config();

connectDb();
const options  = {
  definition:{
    openapi:'3.0.0',
    info:{
      title:"GUVI USERS API",
      version:"1.0.0",
      description:"Users Details API"
    },
      servers:[
        {
          url:process.env.BACKEND_HOSTED_URL
        }
      ],
  },
  apis:['./routes/*.js']
}
const specs = swaggerJsDoc(options)
const app = express();
const PORT = SERVER_PORT;

app.use(express.json());

var corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  optionsSuccessStatus: 200, // For legacy browser support
};
app.use(cors(corsOptions));

app.use("/api-docs",swaggerUI.serve, swaggerUI.setup(specs))
app.use("/auth", authRoutes);
app.use("/api", userRoutes);

app.use((req, res, next) => {
  res.status(404).send("404 - not found");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
