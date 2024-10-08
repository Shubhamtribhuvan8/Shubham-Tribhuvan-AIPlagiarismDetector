import React, { useEffect, useRef, useState } from "react";
import { jsPDF } from "jspdf";
// import { Input } from "@/components/ui/input";
import PlagiarismReport from "./plagiarismReports";
// import { Label } from "@/components/ui/label";
import Spinner from "./ui/spinner";
import Button from "./ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Upload, Download, FileText, AlertCircle } from "lucide-react";
import GeminiReports from "./geminiReports";
const AIUserScreen = () => {
  let API =
    process.env.REACT_APP_API_URL || process.env.REACT_APP_API_URL_UPDATED;
  const geminiReportsRef = useRef(null);
  const [text, setText] = useState("");
  const [website, setWebsite] = useState("");
  const [version, setVersion] = useState("");
  const [language, setLanguage] = useState("");
  const [country, setCountry] = useState("");
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [geminiFile, setGeminiFile] = useState(null);
  const [geminiResponse, setGeminiResponse] = useState(null);
  const [geminiError, setGeminiError] = useState(null);
  const [geminiLoading, setGeminiLoading] = useState(false);
  const [geminiVersion, setGeminiVersion] = useState("1.5");

  useEffect(() => {
    if (geminiResponse && geminiReportsRef.current) {
      window.scrollTo({
        top: geminiReportsRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  }, [geminiResponse]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedExtensions = ["pdf", "docx"];

    if (selectedFile) {
      const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
      if (allowedExtensions.includes(fileExtension)) {
        setFile(selectedFile);
        setError(null);
      } else {
        setFile(null);
        setError("Invalid file type. Please upload a .pdf or .docx file.");
      }
    }
  };

  const handleGeminiFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedExtensions = ["pdf"];

    if (selectedFile) {
      const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
      if (allowedExtensions.includes(fileExtension)) {
        setGeminiFile(selectedFile);
        setGeminiError(null);
      } else {
        setGeminiFile(null);
        setGeminiError(
          "Invalid file type. Please upload a .pdf or .docx file."
        );
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitted(true);
    let formData = new FormData();
    formData.append("text", text);
    formData.append("website", website);
    formData.append("version", version);
    formData.append("language", language);
    if (file) {
      formData.append("file", file);
    }

    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`${key}: File - ${value.name}`);
      } else {
        console.log(`${key}: ${value}`);
      }
    }

    const options = {
      method: "POST",
      body: formData,
    };

    try {
      const res = await fetch(`${API}/api/plagiarism-report`, options);
      const result = await res.json();
      if (result) {
        setResponse(result);
      }
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGeminiSubmit = async (e) => {
    e.preventDefault();
    setGeminiLoading(true);

    let formData = new FormData();
    if (geminiFile) {
      formData.append("file", geminiFile);
    }

    let apiEndpoint;
    if (geminiVersion === "1.5") {
      apiEndpoint = `${API}/api/gemini-plagiarism`;
    } else if (geminiVersion === "1.5 Pro") {
      apiEndpoint = `${API}/api/gemini-pro-plagiarism`;
    }

    try {
      const res = await fetch(apiEndpoint, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (res.ok) {
        setGeminiResponse(result);
      } else {
        setGeminiError(result.error || "Something went wrong.");
      }
    } catch (err) {
      setGeminiError("Error: " + err.message);
    } finally {
      setGeminiLoading(false);
    }
  };

  const handleDownload = () => {
    if (response) {
      generatePdf(response.data, response.averagePlagiarismPercentage);
    }
  };
  const generatePdf = (data, percentage) => {
    const doc = new jsPDF();
    doc.setLineWidth(0.5);

    doc.setFontSize(16);
    doc.text("Plagiarism Report", 20, 20);

    doc.setFontSize(12);
    doc.text(`Plagiarism Percentage: ${percentage}%`, 20, 30);

    if (data.scanInformation) {
      doc.text(
        `Scan Time: ${new Date(
          data.scanInformation.scanTime
        ).toLocaleString()}`,
        20,
        40
      );
      doc.text(`Service: ${data.scanInformation.service}`, 20, 50);
    }

    let yPosition = 60;
    doc.setFontSize(14);
    doc.text("Sources:", 20, yPosition);
    doc.setFontSize(12);
    yPosition += 10;

    data.sources.forEach((source, index) => {
      doc.text(`Source ${index + 1}:`, 20, yPosition);
      doc.text(`Title: ${source.title || "N/A"}`, 20, yPosition + 10);
      doc.text(`URL: ${source.url || "N/A"}`, 20, yPosition + 20);
      doc.text(
        `Description: ${source.description || "N/A"}`,
        20,
        yPosition + 30
      );
      doc.text(`Score: ${source.score || "N/A"}`, 20, yPosition + 40);
      yPosition += 50;
    });

    doc.save(`Plagiarism_Report_${data.reportId || "report"}.pdf`);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-500 to-purple-600 p-4 sm:p-8">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Plagiarism Detection
            </h2>
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="file-upload"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Upload your document
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.docx"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById("file-upload").click()
                      }
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <Upload className="w-4 h-4 inline-block mr-2" />
                      Choose File
                    </button>
                    {file && (
                      <span className="text-sm text-gray-500 truncate max-w-[150px]">
                        {file.name}
                      </span>
                    )}
                  </div>
                  {error && (
                    <p className="text-sm text-red-500 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {error}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                  disabled={loading || !file}
                >
                  {loading ? "Processing..." : "Check for Plagiarism"}
                </Button>
              </form>
            )}
            <div className="mt-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Gemini Plagiarism Detection
              </h3>
              {geminiLoading ? (
                <div className="flex justify-center items-center h-32">
                  <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
                </div>
              ) : (
                <form onSubmit={handleGeminiSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="gemini-file-upload"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Upload your file for Gemini Plagiarism Check
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        id="gemini-file-upload"
                        type="file"
                        className="hidden"
                        onChange={handleGeminiFileChange}
                        accept=".pdf"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          document.getElementById("gemini-file-upload").click()
                        }
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <Upload className="w-4 h-4 inline-block mr-2" />
                        Choose File
                      </button>
                      {geminiFile && (
                        <span className="text-sm text-gray-500 truncate max-w-[150px]">
                          {geminiFile.name}
                        </span>
                      )}
                    </div>
                    {geminiError && (
                      <p className="text-sm text-red-500 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {geminiError}
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <label>
                      <input
                        type="radio"
                        name="gemini-version"
                        value="1.5"
                        checked={geminiVersion === "1.5"}
                        onChange={(e) => setGeminiVersion(e.target.value)}
                      />
                      Gemini 1.5 Flash
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gemini-version"
                        value="1.5 Pro"
                        checked={geminiVersion === "1.5 Pro"}
                        onChange={(e) => setGeminiVersion(e.target.value)}
                      />
                      Gemini 1.5 Pro
                    </label>
                  </div>
                  <Button
                    type="submit"
                    className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={geminiLoading || !geminiFile}
                  >
                    {geminiLoading
                      ? "Processing..."
                      : "Check Plagiarism with Gemini"}
                  </Button>
                </form>
              )}
            </div>
            {submitted && response && (
              <div className="mt-6 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Plagiarism Report
                  </h3>
                  <p className="text-3xl font-bold text-indigo-600">
                    {response.averagePlagiarismPercentage}%
                  </p>
                  <p className="text-sm text-gray-500">Plagiarism Detected</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleDownload}
                    className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Download className="w-4 h-4 inline-block mr-2" />
                    Download
                  </button>
                  <button
                    onClick={() =>
                      window.scrollTo(0, document.body.scrollHeight)
                    }
                    className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <FileText className="w-4 h-4 inline-block mr-2" />
                    View Details
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {response && (
        <div id="plagiarism-report">
          <PlagiarismReport data={response?.data} />
        </div>
      )}
      {geminiResponse && (
        <div ref={geminiReportsRef}>
          <GeminiReports data={geminiResponse?.data} />
        </div>
      )}
    </>
  );
};

export default AIUserScreen;
