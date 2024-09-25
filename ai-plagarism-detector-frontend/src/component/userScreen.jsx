import React, { useState } from "react";
import axios from "axios";
import Button from "./ui/button";

//TODO: NO CHAT GPT/CLOUD AI API TOKEN CREDITIALS
const UserScreen = () => {
  let API =
    process.env.REACT_APP_API_URL || process.env.REACT_APP_API_URL_UPDATED;
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) return alert("Please upload a file");

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    const apiUploadUrl = `${API}/api/upload`;

    try {
      const response = await axios.post(apiUploadUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const reportId = response.data.data.fileId;
      const apiUrl = `${API}/api/report/${reportId}`;
      const reportResponse = await axios.get(apiUrl);
      setResult(reportResponse.data.data);
    } catch (error) {
      console.log(error, "errror");
      console.error("Error processing file:", error);
      alert("Error detecting plagiarism");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!result) return alert("No report available to download");
    const blob = new Blob([JSON.stringify(result, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "plagiarism-report.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-8">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Plagiarism Detection
        </h1>

        <div className="mb-6">
          <label
            htmlFor="file-upload"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Upload your document:
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleFileUpload}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <Button
          onClick={handleSubmit}
          className={`w-full text-center py-3 px-4 text-white font-semibold rounded-lg transition ${
            loading && "opacity-50 cursor-not-allowed"
          }`}
          disabled={loading}
        >
          {loading ? "Processing..." : "Check for Plagiarism"}
        </Button>

        {result && (
          <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-inner">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Plagiarism Report
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              Plagiarism Percentage:{" "}
              <span className="font-bold">{result.percentage}%</span>
            </p>
            <div className="plagiarized-sections">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Plagiarized Sections:
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                {result.sections.map((section, index) => (
                  <li key={index} className="text-gray-700">
                    {section}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={handleDownload}
              className="mt-4 py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
            >
              Download Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserScreen;
