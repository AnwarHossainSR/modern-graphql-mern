const express = require("express");
const cookieParser = require("cookie-parser");
//const errorMiddleware = require("./middleware/error");
const bodyParser = require("body-parser");
const cors = require("cors");
const graphqlUploadExpress = require("graphql-upload/graphqlUploadExpress.js");
const { path } = require("path");

const app = express();
app.use(graphqlUploadExpress());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));

// Middleware for Errors
//app.use(errorMiddleware);

module.exports = app;
