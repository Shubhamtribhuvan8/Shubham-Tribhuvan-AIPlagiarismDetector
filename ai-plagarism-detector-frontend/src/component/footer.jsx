import React from "react";
import { FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi";

const Footer = () => {
  return (
    <div>
      <div id="contact" className="bg-gray-100 py-6">
        <div className="container mx-auto text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} PlagiarismGuard. All rights reserved.
          </p>
          <div className="mt-1">
            <a href="#" className="text-gray-600 mx-2 hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 mx-2 hover:underline">
              Terms of Service
            </a>
            <a href="#" className="text-gray-600 mx-2 hover:underline">
              Contact Us
            </a>
          </div>
          <div className="mt-2 flex justify-center">
            <a href="#" className="text-gray-600 mx-2 hover:text-gray-800">
              <FiGithub size={24} />
            </a>
            <a href="#" className="text-gray-600 mx-2 hover:text-gray-800">
              <FiTwitter size={24} />
            </a>
            <a href="#" className="text-gray-600 mx-2 hover:text-gray-800">
              <FiLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
