import Button from "./ui/button";
import { Img } from "react-image";
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-9xl font-extrabold text-gray-800 animate-bounce">
            404
          </h1>
          <h2 className="text-4xl font-bold text-gray-700">Page Not Found</h2>
          <p className="text-xl text-gray-600">
            Oops! The page you're looking for doesn't exist.
          </p>
        </div>
        <div className="mt-8">
          <Img
            src="/placeholder.svg?height=200&width=300"
            alt="404 Illustration"
            width={300}
            height={200}
            className="mx-auto h-48 w-auto"
          />
        </div>
        <div className="mt-8">
          <a href="/">
            <Button className="w-full">Go back home</Button>
          </a>
        </div>
      </div>
    </div>
  );
}
