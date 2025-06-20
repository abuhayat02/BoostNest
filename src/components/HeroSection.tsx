"use client"
import { motion } from 'framer-motion';
import {  FaRocket, FaChartLine, FaUsers } from 'react-icons/fa';
import dashboard from '../../public/das.png'
import Image from 'next/image';
import { Typewriter } from 'react-simple-typewriter';
function HeroSection() {
  return (
    
            <div className=" z-10 sticky top-0  pt-4 mx-auto grid md:grid-cols-2 items-center gap-12">

              <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className=" md:text-5xl  text-2xl font-extrabold text-center md:text-start leading-tight mb-6">
                  Grow Faster on <br />
                  <Typewriter
                    words={[' Supercharge Your ', ' Monetize with ']}
                    loop={Infinity}
                    cursor
                    cursorStyle="|"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1500}
                  /> <br /> <span className="text-red-600">YouTube Growth</span>
                </h1>
                <p className="text-gray-300 text-center md:text-start text-[15px] md:text-lg mb-6">
                  BoostNest delivers real subscribers, views, and watch time to help you go viral faster than ever — 100% safe and organic.
                </p>



                <div className="flex flex-wrap flex-row sticky top-0 md:justify-start justify-center gap-6 py-10 text-sm text-gray-400">
                  <div className="flex  items-center gap-2">
                    <FaUsers className="text-red-500" /> 10K+ Creators Helped
                  </div>
                  <div className="flex items-center gap-2">
                    <FaChartLine className="text-green-500" /> Real Organic Growth
                  </div>
                  <div className="flex items-center gap-2">
                    <FaRocket className="text-yellow-500" /> Fast & Safe Delivery
                  </div>
                </div>
                <div className="flex animate-bounce flex-row md:justify-start justify-center flex-wrap gap-4 mb-8">
                  <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition">
                    🚀 Get Started
                  </button>
                  <button className="border border-gray-500 hover:border-white px-6 py-3 rounded-lg text-white">
                    📊 View Pricing
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="flex justify-center sticky top-0"
              >
                <Image
                  src={dashboard}
                  className="rounded-xl animate-float"
                  alt="youtube dashboard picture"
                />
              </motion.div>

            </div>
  )
}

export default HeroSection