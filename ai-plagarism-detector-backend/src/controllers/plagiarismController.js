const path = require("path");
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");
const { createResponse } = require("../services/responseService");
const { v4: uuidv4 } = require("uuid");
const fetch = require("node-fetch");
const mammoth = require("mammoth");
const mime = require("mime-types");
const nodemailer = require("nodemailer");
const {
  extractTextFromPdd,
  extractTextFromWord,
  getFileExtensionFromContentType,
  calculateAveragePlagiarismPercentage,
  extractTextFromBuffer,
  convertTextToJsonl,
  analyzeTextForPlagiarism,
} = require("../utils/util");
require("dotenv").config();
const reports = {};

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
      text = await extractTextFromPdd(filePath);
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

exports.plagariseApi = async (req, res) => {
  const { text: inputText, website, version, language, country } = req.body;
  let extractedText = inputText || "";

  try {
    const fileLink = req.fileLink;

    if (fileLink) {
      const response = await axios.get(fileLink, {
        responseType: "arraybuffer",
      });
      const fileBuffer = response.data;

      const contentType = response.headers["content-type"];
      const fileExtension = getFileExtensionFromContentType(contentType);

      if (!fileExtension) {
        throw new Error("Unsupported file type");
      }
      extractedText = await extractTextFromBuffer(fileBuffer, fileExtension);
    }

    // Prepare data for the plagiarism API
    const token = process.env.GO_WINSTON_API_KEY;
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: extractedText,
        website,
        version,
        language,
        country,
      }),
    };

    // Call the plagiarism API
    const response = await fetch(
      "https://api.gowinston.ai/v2/plagiarism",
      options
    );
    let data = await response.json();
    const averagePlagiarismPercentage =
      calculateAveragePlagiarismPercentage(data);

    if (data.error) {
      return res.status(400).json(data);
    }

    res.json({ data, averagePlagiarismPercentage });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "An internal server error occurred" });
  }
};

exports.sendEmailApi = async (req, res) => {
  const { recipientEmail } = req.body;

  if (!recipientEmail) {
    return res.status(400).json({ error: "Recipient email is required" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      // type: "OAuth2",
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
      // clientId: process.env.OAUTH_CLIENTID,
      // clientSecret: process.env.OAUTH_CLIENT_SECRET,
      // refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipientEmail,
    subject: "AI-Powered Plagiarism Detection: Ensure Academic Integrity",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="background-color: #f5f5f5; padding: 20px; text-align: center;">
          <h1 style="color: #4CAF50;">AI-Powered Plagiarism Detection</h1>
        </div>
        <div style="padding: 20px;">
          <p style="font-size: 16px;">
            Dear User,
          </p>
          <p style="font-size: 16px;">
            Ensure academic integrity with our cutting-edge AI technology. Detect plagiarism with unparalleled accuracy and speed. Whether you are a student, researcher, or institution, our tool offers reliable results that help you maintain originality in your work.
          </p>
          <p style="font-size: 16px;">
            Our system scans billions of online sources to provide comprehensive plagiarism reports, ensuring that your content is free from any unintentional duplication. It's fast, secure, and easy to use.
          </p>
          <p style="font-size: 16px;">
            Start using our service today and keep your content authentic!
          </p>
          <p style="font-size: 16px;">
            Best Regards,<br/>
            The AI Plagiarism Detection Team
          </p>
        </div>
        <div style="background-color: #f5f5f5; padding: 10px; text-align: center;">
          <p style="font-size: 14px; color: #888;">
            © 2024 AI Plagiarism Detection, All rights reserved.<br/>
            <a href="#" style="color: #4CAF50; text-decoration: none;">Unsubscribe</a> | 
            <a href="#" style="color: #4CAF50; text-decoration: none;">Contact Us</a>
          </p>
        </div>
      </div>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("❌ Error:", error.message);
      return res.status(500).json({ error: "Failed to send email" });
    } else {
      return res.status(200).json({ message: "Email sent successfully", info });
    }
  });
};
