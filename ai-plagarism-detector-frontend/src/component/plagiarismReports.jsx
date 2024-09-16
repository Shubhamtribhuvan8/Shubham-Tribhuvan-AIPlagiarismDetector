import { useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart/chart";
import { Info } from "lucide-react";

const PlagiarismReport = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sources = Array.isArray(data?.sources) ? data.sources : [];

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 mb-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Plagiarism Report</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Plagiarism Score</CardTitle>
              <CardDescription>Overall plagiarism percentage</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-64">
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
                    fill="hsl(var(--chart-1))"
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                  >
                    <Cell key="cell-0" fill="hsl(var(--chart-1))" />
                    <Cell key="cell-1" fill="hsl(var(--chart-5))" />
                  </Pie>
                  <Tooltip content={<ChartTooltipContent hideLabel />} />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Plagiarism Sources</CardTitle>
              <CardDescription>
                Sources with the highest plagiarism scores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-64">
                {sources.length > 0 && (
                  <BarChart data={sources.slice(0, 5)}>
                    <XAxis dataKey="source" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent hideLabel />} />
                    <Bar dataKey="plagiarismWords" fill="hsl(var(--chart-2))">
                      {sources.slice(0, 5).map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={`hsl(var(--chart-${index + 1}))`}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                )}
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Detailed Source Information</CardTitle>
            <CardDescription>
              Comprehensive list of plagiarism sources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Source</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Plagiarized Words</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sources.length > 0 ? (
                  sources.map((source, index) => (
                    <TableRow key={index}>
                      <TableCell>{source.source}</TableCell>
                      <TableCell>{source.score}%</TableCell>
                      <TableCell>{source.plagiarismWords}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3}>No data available</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Info className="h-4 w-4" />
            <span>Total Words: {data?.result?.textWordCounts}</span>
            <span>|</span>
            <span>Plagiarized Words: {data?.result?.totalPlagiarismWords}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const renderActiveShape = (props) => {
  const { cx, cy, percent, fill, payload } = props;
  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={fill}
        className="text-2xl font-bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
      <text
        x={cx}
        y={cy + 30}
        dy={8}
        textAnchor="middle"
        fill={fill}
        className="text-sm"
      >
        {payload.name}
      </text>
    </g>
  );
};

export default PlagiarismReport;
