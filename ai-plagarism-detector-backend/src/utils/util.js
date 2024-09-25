// util.js
const path = require("path");
const fs = require("fs");
const fetch = require("node-fetch");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
require("dotenv").config();

async function extractTextFromPdf(filePath) {
  const data = fs.readFileSync(filePath);
  const pdfData = await pdfParse(data);
  return pdfData.text;
}

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

async function extractTextFromBuffer(buffer, fileExtension) {
  try {
    let text;

    if (fileExtension === ".pdf") {
      text = await pdfParse(buffer).then((data) => data.text);
    } else if (fileExtension === ".docx") {
      text = await mammoth
        .extractRawText({ buffer })
        .then((result) => result.value);
    } else {
      throw new Error("Unsupported file type");
    }

    return text;
  } catch (error) {
    console.error("Error extracting text from buffer:", error);
    throw new Error("Failed to extract text from buffer");
  }
}

async function extractTextFromWord(filePath) {
  const result = await mammoth.extractRawText({ path: filePath });
  return result.value;
}

function convertTextToJsonl(text) {
  const lines = text.split("\n");
  return lines.map((line) => JSON.stringify({ text: line })).join("\n");
}

function getFileExtensionFromContentType(contentType) {
  const mimeTypes = {
    "application/pdf": ".pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      ".docx",
  };
  return mimeTypes[contentType] || "";
}

function calculateAveragePlagiarismPercentage(data) {
  if (!data.sources || data.sources.length === 0) {
    return 0;
  }
  const totalScore = data.sources.reduce(
    (acc, source) => acc + source.score,
    0
  );
  const averageScore = totalScore / data.sources.length;
  return averageScore;
}

async function uploadFileToOpenAI(filePath, file) {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("purpose", "fine-tune");

    const aiApiUrl = "https://api.openai.com/v1/files";
    const apiKey = process.env.CHAT_GPT_API_KEY;

    const response = await axios.post(aiApiUrl, formData, {
      headers: {
        ...formData.getHeaders(),
        Authorization: `Bearer ${apiKey}`,
      },
    });

    return response.data.id;
  } catch (error) {
    console.error(
      "Error uploading file:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to upload file");
  }
}

async function fetchFileFromLink(fileLink) {
  try {
    const response = await axios.get(fileLink, { responseType: "arraybuffer" });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching file:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to fetch file");
  }
}

async function uploadToFileIO(file) {
  const form = new FormData();
  form.append("file", file.buffer, file.originalname);

  const response = await fetch("https://file.io", {
    method: "POST",
    body: form,
  });

  const data = await response.json();
  if (!data.success) {
    throw new Error("File upload to file.io failed");
  }
  return data.link;
}

const uploadFileIO = async (req, res, next) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileLink = await uploadToFileIO(file);
    req.fileLink = fileLink;
    next();
  } catch (error) {
    console.error("File upload error:", error);
    return res.status(500).json({ error: "File upload failed" });
  }
};
const getFileExtensionContentType = (contentType) => {
  const mimeTypes = {
    "application/pdf": "pdf",
    "application/msword": "doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "docx",
  };
  return mimeTypes[contentType] || null;
};

async function extractGeminiText(filePath) {
  const fileExtension = path.extname(filePath).toLowerCase();
  let extractedText = "";

  if (fileExtension === ".pdf") {
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    extractedText = pdfData.text;
  } else if (fileExtension === ".docx") {
    const dataBuffer = fs.readFileSync(filePath);
    const docxData = await mammoth.extractRawText({ buffer: dataBuffer });
    extractedText = docxData.value;
  } else {
    throw new Error("Unsupported file type for text extraction");
  }

  return extractedText;
}

module.exports = {
  extractTextFromPdf,
  extractTextFromBuffer,
  extractTextFromWord,
  convertTextToJsonl,
  getFileExtensionFromContentType,
  calculateAveragePlagiarismPercentage,
  analyzeTextForPlagiarism,
  uploadFileToOpenAI,
  fetchFileFromLink,
  uploadFileIO,
  getFileExtensionContentType,
  extractGeminiText,
};
