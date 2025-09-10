'use client'
import React from "react";
import Link from "next/link"; // <-- Use Next.js Link

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 px-4 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Mini Description */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-semibold text-white mb-4">About Us</h3>
          <p className="text-neutral-400 text-sm text-center md:text-left">
            We provide fast, accurate, and secure audio-to-text transcription services, empowering students, professionals, and creators worldwide.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-center">
            <li>
              <Link
                href="/"
                className="text-neutral-400 hover:text-blue-500 transition-colors duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-neutral-400 hover:text-blue-500 transition-colors duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/upload-audio"
                className="text-neutral-400 hover:text-blue-500 transition-colors duration-300"
              >
                Upload Audio
              </Link>
            </li>
            <li>
              <Link
                href="/watch-history"
                className="text-neutral-400 hover:text-blue-500 transition-colors duration-300"
              >
                Watch History
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact/Support */}
        <div className="flex flex-col items-center md:items-end">
          <h3 className="text-xl font-semibold text-white mb-4">Get in Touch</h3>
          <p className="text-neutral-400 text-sm text-center md:text-right">
            Need help? Reach out to our support team at{" "}
            <a
              href="mailto:support@transcriptionapp.com"
              className="text-blue-500 hover:underline"
            >
              support@transcriptionapp.com
            </a>
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 border-t border-neutral-800 pt-4 text-center">
        <p className="text-neutral-500 text-sm">
          &copy; {new Date().getFullYear()} Transcription App. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
