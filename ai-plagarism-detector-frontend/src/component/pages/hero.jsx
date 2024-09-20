import React, { useState } from "react";
import Button from "../ui/button";
import Input from "../ui/input";
import { ArrowRight } from "lucide-react";
import DynamicSpinner from "../ui/dynamicSpinner";

const HeroSection = () => {
  let API = process.env.REACT_APP_API_URL;
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const apiUploadUrl = `${API}/api/send-email`;

    try {
      const response = await fetch(apiUploadUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipientEmail: email }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      const data = await response.json();
      setSubmitted(true);
    } catch (error) {
      console.error("Error:", error.message);
      setError("There was a problem sending the email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleMoreInfo = () => {
    setSubmitted(false);
    setEmail("");
  };

  return (
    <div className="min-h-screen text-white">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                AI-Powered Plagiarism Detection
              </h1>
              <p className="mx-auto max-w-[700px] text-white ">
                Ensure academic integrity with our cutting-edge AI technology.
                Detect plagiarism with unparalleled accuracy and speed.
              </p>
            </div>
            <div className="w-full max-w-sm mx-auto p-4">
              <div className="space-y-2">
                {!submitted ? (
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"
                  >
                    <Input
                      className="flex-1 text-black"
                      placeholder="Enter your email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Button
                      type="submit"
                      size="sm"
                      className="flex-shrink-0"
                      disabled={loading}
                    >
                      {loading ? (
                        <DynamicSpinner size={8} color="red-500" />
                      ) : (
                        <>
                          <span>Get Started</span>
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className="text-green-600 font-semibold flex flex-col items-center">
                    <p>
                      Thank you for your interest! We'll reach out to you within
                      the day.
                    </p>
                    <Button
                      onClick={handleMoreInfo}
                      size="sm"
                      className="mt-4 py-2 px-4 font-semibold rounded-lg flex-shrink-0"
                    >
                      Request More Information
                    </Button>
                  </div>
                )}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <p className="text-xs dark:text-white-400 text-center sm:text-center">
                  Start your free trial. No credit card required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
