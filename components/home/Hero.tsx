'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Clock, Zap, BarChart } from 'lucide-react'
import Link from 'next/link'

const Hero = () => {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  return (
    <motion.div 
      className="relative bg-white dark:bg-gray-900 overflow-hidden"
      style={{ opacity, scale }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white dark:bg-gray-900 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white dark:text-gray-900 transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <motion.div
              className="sm:text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h1
                className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.span 
                  className="block xl:inline"
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Master Your Time with
                </motion.span>{' '}
                <motion.span 
                  className="block text-indigo-600 dark:text-indigo-400 xl:inline"
                  initial={{ x: 20 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  Chrono Flux
                </motion.span>
              </motion.h1>
              <motion.p
                className="mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                Boost your productivity and achieve your goals with Chrono Flux, the ultimate time management companion. Track your focus sessions, manage tasks, and visualize your progress all in one place.
              </motion.p>
              <motion.div
                className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="#cta" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                    Get started
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-3 sm:mt-0 sm:ml-3">
                  <Link href="#features" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                    Learn more
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </main>
        </div>
      </div>
      <motion.div 
        className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <motion.div
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="h-full flex items-center justify-center">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Clock className="h-32 w-32 text-white" />
            </motion.div>
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Zap className="h-24 w-24 text-white ml-4" />
            </motion.div>
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <BarChart className="h-24 w-24 text-white ml-4" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default Hero

