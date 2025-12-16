"use client";

import { useState } from "react";
import { FiMessageCircle } from "react-icons/fi";

export default function FloatingChat() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/254750468852"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg flex items-center justify-center transition-transform duration-200 hover:scale-110"
        title="Chat with us on WhatsApp"
      >
        <FiMessageCircle className="w-6 h-6" />
      </a>

      {/* Optional Share Modal Trigger */}
      {/* Example: uncomment if you want a toggleable share modal */}
      {/* <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-20 right-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg"
      >
        Share
      </button> */}

      {/* Share Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-80 max-w-sm relative shadow-lg">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 font-bold"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-4">Share this page</h2>
            <div className="flex gap-4">
              <a
                href="#"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Facebook
              </a>
              <a
                href="#"
                className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}