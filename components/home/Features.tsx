'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Clock, BarChart2, CheckCircle, Zap, Bell, Users } from 'lucide-react'

const features = [
  {
    name: 'Pomodoro Timer',
    description: 'Stay focused with our customizable Pomodoro timer. Set work and break intervals that suit your workflow. Boost productivity by working in focused sprints.',
    icon: Clock,
  },
  {
    name: 'Progress Tracking',
    description: 'Visualize your productivity with detailed charts and statistics. Track daily, weekly, and monthly progress to identify trends and improve your time management.',
    icon: BarChart2,
  },
  {
    name: 'Task Management',
    description: 'Organize your tasks efficiently. Prioritize, set due dates, and mark completed items with ease. Keep all your to-dos in one place and never miss a deadline.',
    icon: CheckCircle,
  },
  {
    name: 'Gamification',
    description: 'Stay motivated with achievement badges and streaks. Turn productivity into a fun, rewarding game. Compete with yourself and others to reach new productivity heights.',
    icon: Zap,
  },
  {
    name: 'Smart Notifications',
    description: 'Receive gentle reminders to stay on track. Customize notifications to suit your preferences and work style. Never lose focus or forget an important task again.',
    icon: Bell,
  },
  {
    name: 'Team Collaboration',
    description: 'Share progress and tasks with your team. Boost collective productivity and align on goals. Perfect for remote teams and collaborative projects.',
    icon: Users,
  },
]

const Features = () => {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <div id="features" className="py-24 bg-white dark:bg-gray-900 overflow-hidden">
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ y }}
      >
        <motion.div 
          className="lg:text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Everything you need to boost productivity
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
            Chrono Flux combines powerful features to help you manage your time effectively and achieve your goals.
          </p>
        </motion.div>

        <div className="mt-20">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                className="relative"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <dt>
                  <motion.div 
                    className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </motion.div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">{feature.description}</dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </motion.div>
    </div>
  )
}

export default Features

