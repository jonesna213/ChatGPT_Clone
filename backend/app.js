const express = require('express');
const helmet = require("helmet");

//creating app
const app = express();

//getting routes
const conversationsRoutes = require("./routes/conversations");

//middlewares
app.use(helmet());
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");                              //Which domains are allowed
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE"); //Which methods you want to allow
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");   //Which headers you want to allow
    next();
});


//setting routes
app.use("/", conversationsRoutes);


//default error route
app.use((error, req, res, next) => {
    console.log(error);
    const statusCode = error.statusCode || 500;
    const message = error.message;
    const data = error.data;

    res.status(statusCode).json({ message, data });
});

//starting server
app.listen(8080);