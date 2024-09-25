import React from "react";
import { Info, Clock } from "lucide-react";
import PlagiarismResult from "./reports/plagarism";

const GeminiReports = ({ data }) => {
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const { result, scanInformation } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Plagiarism Report
        </h1>

        {/* Plagiarism Data */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Plagiarism Results
          </h2>
          <p className="text-gray-600 mb-4">
            Below is the information returned from the plagiarism scan.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 text-gray-800">
            {result?.highlightedText?.length > 0 ? (
              <PlagiarismResult result={result} />
            ) : (
              <p>{result?.plagiarismData}</p>
            )}
          </div>
        </div>

        {/* Scan Information */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Scan Information
          </h2>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <Info className="h-5 w-5" />
            <div>
              <p>Service: {scanInformation?.service}</p>
              <p>Input Type: {scanInformation?.inputType}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
            <Clock className="h-5 w-5" />
            <p>
              Scan Time: {new Date(scanInformation?.scanTime).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeminiReports;
