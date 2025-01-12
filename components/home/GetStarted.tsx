'use client'

import { motion } from 'framer-motion'
import { UserPlus, Download, PlayCircle } from 'lucide-react'

const steps = [
  {
    title: 'Sign Up',
    description: 'Create your free account to get started with Chrono Flux.',
    icon: UserPlus,
  },
  {
    title: 'Download App',
    description: 'Get the Chrono Flux app for your desktop or mobile device.',
    icon: Download,
  },
  {
    title: 'Start Your First Session',
    description: 'Set up your first Pomodoro session and begin boosting your productivity.',
    icon: PlayCircle,
  },
]

const GetStarted = () => {
  return (
    <div className="bg-indigo-50 dark:bg-gray-800 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">Get Started</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Begin Your Productivity Journey
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
            Follow these simple steps to start using Chrono Flux and transform your work habits today.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-x-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md flex flex-col gap-4"
              >
                <div>
                  <span className="  inline-block p-3 bg-indigo-100 dark:bg-indigo-800 rounded-full">
                    <step.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                  </span>
                  <h3 className=" text-lg font-medium text-gray-900 dark:text-white">{step.title}</h3>
                  <p className=" text-base text-gray-500 dark:text-gray-300">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GetStarted

