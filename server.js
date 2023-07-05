const express = require("express");

const app = express();

app.get("/test", (req, res) => {
  res.end("route is working-");
});

app.listen(3003, () => {
  console.log("STARTED THE SERVER");
});
