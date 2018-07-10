const express = require("express");
const router = require("./routes/routes.js");
const db = require("./db");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/", router);

const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

module.exports = server; //server ci servirà per i test
