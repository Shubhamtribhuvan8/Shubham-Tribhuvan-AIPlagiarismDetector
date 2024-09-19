import React from "react";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Testimonials() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                img: "https://media.licdn.com/dms/image/v2/D5603AQFb7-nIVZ-Myw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1711938117707?e=1732147200&v=beta&t=Ry7PWcYzwesQqPi8Mrwf7y9JD7y1q3C4BlH8b9EsIPg",
                name: "Shubhan Dua",
                title: "COO at AnswersAi",
                rating: 4,
                feedback:
                  "We recognized the challenges higher learning had once we were stuck in Office Hour lines at Berkeley for over 4 hours.",
              },
              {
                img: "https://media.licdn.com/dms/image/v2/C5603AQGLa6Wysh0LiQ/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1642581897242?e=1732147200&v=beta&t=LmV0P95427iT9Qr_o0A13WtXrU5H0gCIiTOUMc9IxJM",
                name: "Siddhant Satapathy",
                title: "Co founder at AnswersAi",
                rating: 5,
                feedback:
                  "We understand the pressures of academic life, especially for students in today's competitive era. Our technology is designed to ease this burden, making learning a more engaging and productive experience for students everywhere.",
              },
              {
                img: "https://media.licdn.com/dms/image/v2/D5603AQED221HI45BrA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1722418508345?e=1732147200&v=beta&t=igKx18ZDXnnedieDOx8kEex81lU49T2lLslZkzyZPfI",
                name: "Shubham Tribhuvan",
                title: "Senior Software Designer",
                rating: 3,
                feedback:
                  "An exceptional AI plagiarism detection platform with seamless UI, accurate results, and professional design, perfectly tailored for educational use.",
              },
            ].map((user, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 flex flex-col h-full"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <p className="text-gray-600 mb-4 flex-grow">{`"${user.feedback}"`}</p>
                <div className="mt-auto">
                  <div className="flex items-center mb-4">
                    <img
                      src={user.img}
                      alt={user.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <div className="font-semibold">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.title}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {Array(5)
                      .fill(0)
                      .map((_, starIndex) => (
                        <svg
                          key={starIndex}
                          xmlns="http://www.w3.org/2000/svg"
                          fill={starIndex < user.rating ? "gold" : "none"}
                          viewBox="0 0 24 24"
                          stroke="gold"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.136 6.58a1 1 0 00.95.69h6.91c.969 0 1.371 1.24.588 1.81l-5.598 4.066a1 1 0 00-.363 1.118l2.136 6.58c.3.921-.755 1.688-1.539 1.118l-5.598-4.066a1 1 0 00-1.176 0l-5.598 4.066c-.784.57-1.838-.197-1.539-1.118l2.136-6.58a1 1 0 00-.363-1.118L2.374 12.007c-.783-.57-.38-1.81.588-1.81h6.91a1 1 0 00.95-.69l2.136-6.58z"
                          />
                        </svg>
                      ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
