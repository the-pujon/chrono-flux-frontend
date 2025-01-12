'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Menu, X } from 'lucide-react'
import Link from 'next/link'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-white/30 backdrop-blur-lg dark:bg-gray-800 shadow-md self-start sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <span className="sr-only">Chrono Flux</span>
              <motion.div
                className="flex items-center text-indigo-600 dark:text-indigo-400"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Clock className="h-8 w-auto sm:h-10" />
                <span className="ml-2 text-xl font-bold">Chrono Flux</span>
              </motion.div>
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <button
              type="button"
              className="bg-white dark:bg-gray-800 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <nav className="hidden md:flex gap-10 items-center">
            <Link href="#features" className="text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              Features
            </Link>
            <Link href="#testimonials" className="text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              Testimonials
            </Link>
            <Link href="#cta" className="w-full rounded-full py-2 px-4 flex items-center justify-center  border border-transparent text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                    Get started
                  </Link>
          </nav>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-gray-800 divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <Clock className="h-8 w-auto text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="-mr-2">
                  <button
                    type="button"
                    className="bg-white dark:bg-gray-800 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <span className="sr-only">Close menu</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  <Link href="#features" className="text-base font-medium text-gray-900 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300">
                    Features
                  </Link>
                  <Link href="#testimonials" className="text-base font-medium text-gray-900 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300">
                    Testimonials
                  </Link>
                  <Link href="#cta" className="text-base font-medium text-gray-900 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300">
                    Get Started
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header

