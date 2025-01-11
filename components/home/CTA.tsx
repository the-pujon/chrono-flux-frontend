'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'

const CTA = () => {
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1.1])

  return (
    <div id="cta" className="bg-indigo-700 dark:bg-indigo-900 overflow-hidden">
      <motion.div 
        className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8"
        style={{ scale }}
      >
        <motion.h2
          className="text-3xl font-extrabold text-white sm:text-4xl"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.span 
            className="block"
            initial={{ x: -20 }}
            whileInView={{ x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Ready to boost your productivity?
          </motion.span>
          <motion.span 
            className="block"
            initial={{ x: 20 }}
            whileInView={{ x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Start using Chrono Flux today.
          </motion.span>
        </motion.h2>
        <motion.p
          className="mt-4 text-lg leading-6 text-indigo-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          Join thousands of users who have transformed their time management and achieved their goals with Chrono Flux.
        </motion.p>
        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex rounded-md shadow">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
              >
                Get started for free
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default CTA

