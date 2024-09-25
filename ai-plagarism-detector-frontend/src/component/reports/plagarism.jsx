import { Card, CardContent, CardHeader, CardTitle } from "../ui/card/card";
import Progress from "../ui/progress";

export default function PlagiarismResult({ result }) {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Plagiarism Check Result
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Plagiarism Score</span>
            <span className="text-2xl font-bold">
              {result.plagiarismScore}%
            </span>
          </div>
          <Progress value={result.plagiarismScore} className="h-2" />
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Highlighted Text</h3>
          {result.highlightedText.map((text, index) => (
            <div key={index} className="bg-yellow-100 p-3 rounded-md text-sm">
              <p className="whitespace-pre-wrap">{text}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
