"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const banners = [
  {
    title: "Welcome to IdeaVault",
    desc: "Securely store your creative ideas and organize them with ease."
  },
  {
    title: "Capture Your Vision",
    desc: "A digital vault designed to ensure your best ideas are never lost."
  },
  {
    title: "Start Your Journey",
    desc: "Share your new ideas and inspire others along the way."
  }
];

const Banner = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-slate-950 py-24 px-6 border border-slate-800  overflow-hidden shadow-2xl">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900/50 to-slate-950"></div>
      
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">
              {banners[index].title}
            </h1>
            <p className="text-slate-400 text-xl md:text-2xl mb-12 max-w-2xl font-light">
              {banners[index].desc}
            </p>
          </motion.div>
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:bg-blue-500 transition-colors"
        >
          EXPLORE THE VAULT →
        </motion.button>
      </div>
    </section>
  );
};

export default Banner;