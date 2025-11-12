const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path);
});

const PORT = 5000;
app.listen(PORT, () => console.log(` Server started on port ${PORT}`));
