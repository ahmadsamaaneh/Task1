const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

const userRoutes = require("./routes/user.routes");
app.use("/api/users", userRoutes);

const errorHandler = require("./middlewares/error.middleware");
app.use(errorHandler);

module.exports = app;
