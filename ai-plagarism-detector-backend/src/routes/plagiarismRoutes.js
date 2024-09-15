const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const plagiarismController = require("../controllers/plagiarismController");
// const upload = require("../middleware/uploadMiddleware");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

let upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDFs are allowed"));
    }
  },
});

router.post(
  "/upload",
  // upload.array("uploads[]"),
  upload.single("file"),
  plagiarismController.uploadDocument
);

router.get("/report/:id", plagiarismController.getPlagiarismReport);

router.get("/test", plagiarismController.testApi);

module.exports = router;
