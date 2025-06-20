"use client"

import { motion } from 'framer-motion';
import { FaYoutube, FaRocket, FaChartLine, FaUsers } from 'react-icons/fa';
import dashboard from '../../public/das.png'
import Image from 'next/image';
import { Typewriter } from 'react-simple-typewriter';
import ServicesCardSection from '@/components/Services';
export default function Home() {
  return (
    <div className="relative min-h-[200vh] font-[family-name:var(--font-geist-sans)] overflow-hidden">

      <div className="fixed top-0 left-0 -z-10 h-[850px] w-[830px] rotate-45 bg-gradient-to-l from-red-950 to-red-500 opacity-30 blur-[150px]"></div>

      <div className="grid   items-center justify-items-center min-h-screen  sm:p-20 z-10">
        <div className="container ">
          <section className="relative   text-white  flex items-center  ">

            <div className="absolute top-0  left-0 w-full h-full pointer-events-none z-0">
              <div className="absolute top-80   rounded-full blur-3xl" />
            </div>

            <div className="relative z-10   mx-auto grid md:grid-cols-2 items-center gap-12">

              <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className=" md:text-5xl text-2xl font-extrabold text-center md:text-start leading-tight mb-6">
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
                <p className="text-gray-300 text-lg mb-6">
                  BoostNest delivers real subscribers, views, and watch time to help you go viral faster than ever — 100% safe and organic.
                </p>



                <div className="flex flex-wrap gap-6  py-10 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <FaUsers className="text-red-500" /> 10K+ Creators Helped
                  </div>
                  <div className="flex items-center gap-2">
                    <FaChartLine className="text-green-500" /> Real Organic Growth
                  </div>
                  <div className="flex items-center gap-2">
                    <FaRocket className="text-yellow-500" /> Fast & Safe Delivery
                  </div>
                </div>
                <div className="flex animate-bounce  flex-wrap gap-4 mb-8">
                  <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition">
                    🚀 Get Started
                  </button>
                  <button className="border border-gray-500 hover:border-white px-6 py-3 rounded-lg text-white">
                    📊 View Pricing
                  </button>
                </div>
              </motion.div>

              {/* RIGHT SIDE IMAGE / ANIMATION */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="flex justify-center"
              >
                <Image
                  src={dashboard}
                  className="rounded-xl animate-float"
                  alt="youtube dashboard picture"
                />
              </motion.div>

            </div>
          </section>


        </div>


      </div>

      <div className="h-screen snap-y snap-mandatory overflow-scroll">
        <ServicesCardSection></ServicesCardSection>



      </div>

    </div>
  );
}
