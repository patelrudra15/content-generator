"use client";
import React from "react";
import { motion } from "framer-motion";

function Hero() {
  return (
    <div className="mt-10 mb-20">
      <motion.main
        className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className="text-6xl font-bold"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          AI Content <span className="text-primary">Generator</span>
        </motion.h1>
        <motion.p
          className="mt-3 text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Revolutionize your content creation with our AI-powered app, delivering
          engaging and high-quality text in seconds.
        </motion.p>
        <motion.div
          className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: "easeOut",
            staggerChildren: 0.2,
          }}
        >
          <FeatureCard
            title="15+ templates"
            description="Responsive, and mobile-first project on the web"
          />
          <FeatureCard
            title="Customizable"
            description="Components are easily customized and extendable"
          />
          <FeatureCard
            title="Free to Use"
            description="Every component and plugin is well documented"
          />
          <FeatureCard
            title="24/7 Support"
            description="Contact us 24 hours a day, 7 days a week"
          />
        </motion.div>
      </motion.main>
    </div>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => {
  return (
    <motion.div
      className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-primary focus:text-primary"
      whileHover={{ scale: 1.05, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}
      whileTap={{ scale: 0.95 }}
    >
      <h3 className="text-2xl font-bold">{title} &rarr;</h3>
      <p className="mt-4 text-xl">{description}</p>
    </motion.div>
  );
};

export default Hero;
