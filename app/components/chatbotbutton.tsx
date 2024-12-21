"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export const IssueButton = () => {
  return (
    <motion.div
      className="fixed bottom-2 right-2 z-50"
      initial={{ width: "4rem" }}
      whileHover={{ width: "auto" }}
      transition={{ duration: 0.3 }}
    >
      <Link
        href="/chatbot"
        className="group flex items-center justify-start bg-blue-600 text-white rounded-full overflow-hidden text-lg p-4"
        style={{ height: "4rem" }}
      >
        <span className="text-3xl">🤔</span>
        <motion.p
          className="text-lg font-semibold ml-2 whitespace-nowrap overflow-hidden"
          initial={{ opacity: 1 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Chat With Us 
        </motion.p>
      </Link>
    </motion.div>
  );
};
