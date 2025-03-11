"use client";
import { UserProfile } from "@clerk/nextjs";
import React from "react";
import { motion } from "framer-motion"; // Import Framer Motion for animations

function Settings() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Start faded out and slightly below
      animate={{ opacity: 1, y: 0 }} // Fade in and slide up
      transition={{ duration: 0.8, ease: "easeOut" }} // Smooth transition
      className="flex items-center justify-center h-full"
    >
      <UserProfile routing="hash" />
    </motion.div>
  );
}

export default Settings;
