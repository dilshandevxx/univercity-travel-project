const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const authRoutes = require("./routes/auth");
const guiderRoutes = require("./routes/guiders");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../", "frontend")));
app.use("/api/auth", authRoutes);
app.use("/api/guiders", guiderRoutes);

app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../", "frontend", "pages", "start-page.html")
  );
});

app.get("/LoginStart.html", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../", "frontend", "pages", "LoginStart.html")
  );
});

const PORT = 5000;
app.listen(PORT, () => console.log(` Server started on port ${PORT}`));
