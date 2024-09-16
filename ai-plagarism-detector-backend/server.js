const serverless = require("serverless-http");
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.use(cors());

const plagiarismRoutes = require("./src/routes/plagiarismRoutes");

app.use("/api", plagiarismRoutes);

// Serverless handler export
module.exports.handler = serverless(app);

// Local server setup
if (process.env.NODE_ENV !== "lambda") {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
