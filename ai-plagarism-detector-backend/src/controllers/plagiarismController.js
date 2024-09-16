const path = require("path");
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");
const { createResponse } = require("../services/responseService");
const { v4: uuidv4 } = require("uuid");
const pdfParse = require("pdf-parse");
const fetch = require("node-fetch");
const mammoth = require("mammoth");
require("dotenv").config();
const reports = {};

// Extract text from PDF files
async function extractTextFromPdf(filePath) {
  const data = fs.readFileSync(filePath);
  const pdfData = await pdfParse(data);
  return pdfData.text;
}

// Extract text from Word files
async function extractTextFromWord(filePath) {
  const result = await mammoth.extractRawText({ path: filePath });
  return result.value;
}

// Convert text into JSONL format for OpenAI processing
function convertTextToJsonl(text) {
  const lines = text.split("\n");
  return lines.map((line) => JSON.stringify({ text: line })).join("\n");
}

// Upload document and analyze for plagiarism
exports.uploadDocument = async (req, res) => {
  try {
    const file = req.file;
    if (!file || !file.path) {
      return res
        .status(400)
        .json({ error: "No file uploaded or file path is missing" });
    }

    const filePath = path.resolve(file.path);
    const ext = path.extname(filePath).toLowerCase();

    let text;
    if (ext === ".pdf") {
      text = await extractTextFromPdf(filePath);
    } else if (ext === ".docx") {
      text = await extractTextFromWord(filePath);
    } else {
      return res.status(400).json({
        error: "Invalid file format. Only PDF and Word documents are supported",
      });
    }

    const jsonlText = convertTextToJsonl(text);
    const jsonlFilePath = filePath.replace(ext, ".jsonl");

    fs.writeFileSync(jsonlFilePath, jsonlText);

    const fileStream = fs.createReadStream(jsonlFilePath);

    const formData = new FormData();
    formData.append("file", fileStream);
    formData.append("purpose", "fine-tune");

    const aiApiUrl = "https://api.openai.com/v1/files";
    const apiKey = process.env.CHAT_GPT_API_KEY;

    const response = await axios.post(aiApiUrl, formData, {
      headers: {
        ...formData.getHeaders(),
        Authorization: `Bearer ${apiKey}`,
      },
    });

    const fileId = response.data.id;

    // Clean up temporary files
    fs.unlinkSync(filePath);
    fs.unlinkSync(jsonlFilePath);

    // Store report temporarily for retrieval
    reports[fileId] = {
      fileId,
      text,
      analysis: null,
    };

    return res.status(200).json({
      status: 200,
      message: "Document uploaded and queued for analysis",
      data: { fileId },
    });
  } catch (error) {
    console.error(
      "Upload Document error:",
      error.response ? error.response.data : error.message
    );
    return res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

// Generate similarity analysis using OpenAI GPT
// Updated Plagiarism Analysis using a newer GPT model
async function analyzeTextForPlagiarism(text) {
  const apiKey = process.env.CHAT_GPT_API_KEY;
  const model = "gpt-3.5-turbo-16k"; // Use GPT-3.5-turbo-16k for larger token limits

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: model,
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that checks for plagiarism.",
          },
          {
            role: "user",
            content: `Check the following text for plagiarism:\n\n${text}`,
          },
        ],
        max_tokens: 16000, // Max tokens for GPT-3.5-turbo-16k
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const analysis = response.data.choices[0].message.content;
    return analysis;
  } catch (error) {
    console.error(
      "Error performing plagiarism analysis",
      error.response?.data || error.message
    );
    throw new Error("Error performing plagiarism analysis");
  }
}

exports.getPlagiarismReport = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Retrieving report with ID:", id);

    const report = reports[id];

    if (!report) {
      console.log("Report not found:", id);
      return res.status(404).json(createResponse(404, "Report not found"));
    }

    // Call plagiarism analysis function
    const analysis = await analyzeTextForPlagiarism(report.text);

    return res.status(200).json(
      createResponse(200, "Plagiarism report retrieved successfully", {
        report,
        analysis,
      })
    );
  } catch (error) {
    console.error("Get Plagiarism Report error:", error);
    return res.status(500).json(createResponse(500, "Server error"));
  }
};

exports.testApi = async (req, res) => {
  try {
    const testData = {
      message: "Test API is working!",
      timestamp: new Date().toISOString(),
    };

    res.status(200).json({
      status: "success",
      data: testData,
    });
  } catch (error) {
    console.error("Error in testApi:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

exports.testApi = async (req, res) => {
  try {
    const testData = {
      message: "Test API is working!",
      timestamp: new Date().toISOString(),
    };

    res.status(200).json({
      status: "success",
      data: testData,
    });
  } catch (error) {
    console.error("Error in testApi:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

exports.plagariseApi = async (req, res) => {
  const { text: inputText, website, version, language, country } = req.body;
  let file = req.file;

  let extractedText = inputText || "";
  if (file) {
    if (file.mimetype === "application/pdf") {
      const pdfBuffer = fs.readFileSync(file.path);
      const pdfData = await pdfParse(pdfBuffer);
      extractedText = pdfData.text;
    } else if (
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const docxBuffer = fs.readFileSync(file.path);
      const docxData = await mammoth.extractRawText({ buffer: docxBuffer });
      extractedText = docxData.value;
    }
  }

  if (extractedText.length < 300) {
    return res.status(400).json({
      statusCode: 400,
      message: "Text must be at least 300 characters long.",
    });
  }

  const formData = new FormData();
  formData.append("text", extractedText);
  formData.append("website", website || "");
  formData.append("version", version || "");
  formData.append("language", language || "");

  if (file) {
    formData.append("file", fs.createReadStream(file.path), file.originalname);
  }

  const token = process.env.GO_WINSTON_API_KEY;

  let text = extractedText;
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, file, website, language, country }),
  };

  try {
    const response = await fetch(
      "https://api.gowinston.ai/v2/plagiarism",
      options
    );
    const data = await response.json();
    if (data.error) {
      return res.status(400).json(data);
    }
    res.json(data);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "An internal server error occurred" });
  }
};
