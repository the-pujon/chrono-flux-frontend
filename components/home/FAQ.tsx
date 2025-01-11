'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
  {
    question: "What is the Pomodoro Technique?",
    answer: "The Pomodoro Technique is a time management method that uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks. Chrono Flux is built around this concept but allows for customizable work and break durations."
  },
  {
    question: "Can I customize the work and break durations?",
    answer: "Yes, Chrono Flux allows you to set custom durations for both work sessions and breaks. This flexibility helps you tailor the app to your personal productivity style and preferences."
  },
  {
    question: "How does the task management feature work?",
    answer: "Chrono Flux includes a built-in task manager where you can add, prioritize, and categorize your tasks. You can associate tasks with specific Pomodoro sessions, set due dates, and mark them as complete when finished."
  },
  {
    question: "Is my data synced across devices?",
    answer: "Yes, Chrono Flux uses cloud synchronization to ensure your data is available and up-to-date across all your devices. Simply log in to your account on any device to access your tasks, statistics, and settings."
  },
  {
    question: "How does the gamification aspect work?",
    answer: "Chrono Flux incorporates gamification elements to keep you motivated. You can earn badges for completing tasks, maintaining focus streaks, and reaching productivity milestones. There's also a leaderboard where you can compare your progress with friends or colleagues."
  },
]

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="bg-white dark:bg-gray-900 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">FAQ</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Frequently Asked Questions
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
            Find answers to common questions about Chrono Flux and how it can help boost your productivity.
          </p>
        </div>

        <div className="mt-20">
          <dl className="space-y-6 divide-y divide-gray-200 dark:divide-gray-700">
            {faqs.map((faq, index) => (
              <div key={faq.question} className="pt-6">
                <dt className="text-lg">
                  <button
                    className="text-left w-full flex justify-between items-start text-gray-400"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  >
                    <span className="font-medium text-gray-900 dark:text-white">{faq.question}</span>
                    <span className="ml-6 h-7 flex items-center">
                      {openIndex === index ? (
                        <ChevronUp className="h-6 w-6" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="h-6 w-6" aria-hidden="true" />
                      )}
                    </span>
                  </button>
                </dt>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.dd
                      className="mt-2 pr-12"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-base text-gray-500 dark:text-gray-300">{faq.answer}</p>
                    </motion.dd>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

export default FAQ

