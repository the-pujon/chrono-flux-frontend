'use client'

import { motion } from 'framer-motion'
import { Clock, CheckSquare, BarChart, Award } from 'lucide-react'

const steps = [
  {
    title: 'Set Your Timer',
    description: 'Choose your work duration and break time. The default Pomodoro technique suggests 25 minutes of work followed by a 5-minute break.',
    icon: Clock,
  },
  {
    title: 'Focus on Tasks',
    description: 'Work on your tasks during the focused work sessions. Use the task management feature to keep track of your to-dos.',
    icon: CheckSquare,
  },
  {
    title: 'Track Progress',
    description: 'View your productivity stats and charts to understand your work patterns and improve your time management skills.',
    icon: BarChart,
  },
  {
    title: 'Earn Rewards',
    description: 'Complete tasks and maintain focus streaks to earn badges and climb the productivity leaderboard.',
    icon: Award,
  },
]

const HowItWorks = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">How It Works</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Simple steps to boost your productivity
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
            Follow these easy steps to get started with Chrono Flux and transform your work habits.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <span className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <step.icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{step.title}</h3>
                </div>
                <p className="text-lg text-gray-500 dark:text-gray-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks

