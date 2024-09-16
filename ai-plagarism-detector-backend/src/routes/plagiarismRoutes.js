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

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDFs and DOCs are allowed"), false);
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

router.post(
  "/plagiarism-report",
  upload.single("file"),
  plagiarismController.plagariseApi
);

module.exports = router;
