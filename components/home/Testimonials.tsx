'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

const testimonials = [
  {
    content: "Chrono Flux has revolutionized my work routine. I'm more productive than ever!",
    author: "Sarah L.",
    role: "Freelance Designer",
  },
  {
    content: "The gamification aspect keeps me motivated. It's like a productivity game!",
    author: "Mike R.",
    role: "Software Developer",
  },
  {
    content: "I love how I can visualize my progress. It's incredibly motivating!",
    author: "Emily T.",
    role: "Marketing Manager",
  },
]

const Testimonials = () => {
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1.1])

  return (
    <section id="testimonials" className="py-12 bg-gray-50 dark:bg-gray-800 overflow-hidden">
      <motion.div 
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ scale }}
      >
        <div className="relative">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              <span className="block">Hear from our users</span>
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-500 dark:text-gray-300">
              Discover how Chrono Flux has transformed the way people work and manage their time.
            </p>
          </motion.div>
          <div className="mt-20">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-700 overflow-hidden shadow rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="px-4 py-5 sm:p-6">
                    <motion.p 
                      className="text-base text-gray-500 dark:text-gray-300"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {testimonial.content}
                    </motion.p>
                    <motion.div 
                      className="mt-6"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <p className="text-base font-medium text-gray-900 dark:text-white">{testimonial.author}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Testimonials

