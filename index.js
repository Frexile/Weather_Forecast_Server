require('dotenv').config();
const express = require("express");
const cors = require("cors");
const {router, repo} = require("./routing/router");


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(router);
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error: err });
});

const server = app.listen(port, async (err, req, res, next) => {
  await repo.connect();

  if (err) {
    console.error(err.stack);
    res.status(500).send("Something broke!");
    return;
  }

  console.log("Server is listening on port:" + port);
});

