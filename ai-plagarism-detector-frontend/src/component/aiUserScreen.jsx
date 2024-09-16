import React, { useState } from "react";
import { jsPDF } from "jspdf";
import PlagiarismReport from "./plagiarismReports";
import Spinner from "./ui/spinner";
import Button from "./ui/button";
const AIUserScreen = () => {
  const API = process.env.REACT_APP_API_URL;
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
      setResponse(result);
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleDownload = () => {
    if (response) {
      generatePdf(response);
    }
  };
  const generatePdf = (data) => {
    console.log(data);

    const doc = new jsPDF();
    // Remove custom font addition to see if this resolves the issue
    // doc.addFont("Helvetica", "Helvetica", "normal"); // Comment this line

    doc.setLineWidth(0.5);

    doc.setFontSize(16);
    doc.text("Plagiarism Report", 20, 20);
    const totalPlagiarismWords = data.totalPlagiarismWords || 0;
    const textWordCounts = data.textWordCounts || 1;
    const plagiarismPercentage = (totalPlagiarismWords / textWordCounts) * 100;

    const percentageText = isNaN(plagiarismPercentage)
      ? "N/A"
      : plagiarismPercentage.toFixed(2);

    doc.setFontSize(12);
    doc.text(`Plagiarism Percentage: ${percentageText}%`, 20, 30);

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
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-8">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
            Plagiarism Detection
          </h1>
          {loading ? (
            <Spinner />
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="file-upload"
                  className="block text-lg font-medium text-gray-700 mb-2"
                >
                  Upload your document:
                </label>
                <input
                  required="true"
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <Button
                type="submit"
                className={`w-full text-center py-3 px-4 text-white font-semibold rounded-lg transition ${
                  loading && "opacity-50 cursor-not-allowed"
                }`}
                disabled={loading}
              >
                {loading ? "Processing..." : "Check for Plagiarism"}
              </Button>
            </form>
          )}
          {error && (
            <div className="mt-4 text-red-500">
              <strong>{error}</strong>
            </div>
          )}
          {submitted && (
            <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
              {response ? (
                <>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Plagiarism Report
                  </h2>
                  <p className="text-lg text-gray-700 mb-4">
                    Plagiarism Percentage:{" "}
                    <span className="font-bold">
                      {response.percentage || 0}%
                    </span>
                  </p>
                  <Button
                    onClick={handleDownload}
                    className="mt-4 py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
                  >
                    Download Report
                  </Button>
                  <div className="mt-6 text-center">
                    <Button
                      onClick={() =>
                        window.scrollTo(0, document.body.scrollHeight)
                      }
                      className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                    >
                      Check Detailed Report
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    No Plagiarism Report Available
                  </h2>
                  <p className="text-lg text-gray-700 mb-4">
                    Please submit a document to generate a plagiarism report.
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      {response && <PlagiarismReport data={response} />}
    </>
  );
};

export default AIUserScreen;
