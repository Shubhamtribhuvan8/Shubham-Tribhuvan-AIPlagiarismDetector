import React, { useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Info,
  Download,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const PlagiarismReport = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showFullTable, setShowFullTable] = useState(false);
  const sources = Array.isArray(data?.sources) ? data.sources : [];

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const toggleFullTable = () => setShowFullTable(!showFullTable);

  const renderActiveShape = (props) => {
    const { cx, cy, percent, fill } = props;
    return (
      <g>
        <text
          x={cx}
          y={cy}
          dy={-10}
          textAnchor="middle"
          fill={fill}
          className="text-3xl font-bold"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
        <text
          x={cx}
          y={cy}
          dy={30}
          textAnchor="middle"
          fill={fill}
          className="text-lg"
        >
          Plagiarized
        </text>
      </g>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
          Plagiarism Report
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Plagiarism Score
              </h2>
              <p className="text-gray-600 mb-4">
                Overall plagiarism percentage
              </p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      activeIndex={activeIndex}
                      activeShape={renderActiveShape}
                      data={[
                        { name: "Plagiarized", value: data?.result?.score },
                        { name: "Original", value: 100 - data?.result?.score },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      onMouseEnter={onPieEnter}
                    >
                      <Cell key="cell-0" fill="#4F46E5" />
                      <Cell key="cell-1" fill="#E5E7EB" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Top Plagiarism Sources
              </h2>
              <p className="text-gray-600 mb-4">
                Sources with the highest plagiarism scores
              </p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sources.slice(0, 5)}>
                    <XAxis dataKey="source" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="plagiarismWords" fill="#4F46E5">
                      {sources.slice(0, 5).map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={`hsl(${220 + index * 20}, 70%, 50%)`}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Detailed Source Information
            </h2>
            <p className="text-gray-600 mb-4">
              Comprehensive list of plagiarism sources
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Plagiarized Words
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sources.length > 0 ? (
                    sources
                      .slice(0, showFullTable ? undefined : 5)
                      .map((source, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {source.source}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {source.score}%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {source.plagiarismWords}
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                      >
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {sources.length > 5 && (
              <button
                onClick={toggleFullTable}
                className="mt-4 flex items-center justify-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {showFullTable ? (
                  <>
                    <EyeOff className="mr-2 h-4 w-4" />
                    Show Less
                  </>
                ) : (
                  <>
                    <Eye className="mr-2 h-4 w-4" />
                    Show All Sources
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Info className="h-4 w-4" />
              <span>Total Words: {data?.result?.textWordCounts}</span>
              <span>|</span>
              <span>
                Plagiarized Words: {data?.result?.totalPlagiarismWords}
              </span>
            </div>
            <button className="flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              <Download className="mr-2 h-4 w-4" />
              Download Full Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlagiarismReport;
