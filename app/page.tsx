'use client'

import React from 'react';
// import store from '../store/store';
import { PomodoroTimer } from '../components/PomodoroTimer';
import { DailyFocusDashboard } from '../components/DailyFocusDashboard';
import { WeeklyMonthlyFocusDashboard } from '../components/WeeklyMonthlyFocusDashboard';
import { GamificationDisplay } from '../components/GamificationDisplay';
import { UserChatHead } from '../components/UserChatHead';
import { TaskChatHead } from '../components/TaskChatHead';
import { motion } from 'framer-motion';

export default function Home() {
  return (

      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
        <motion.div
          className="container mx-auto py-8 px-4 pt-16 pb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-4xl font-bold text-center mb-8 text-indigo-800 dark:text-indigo-200"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Focus Flow: Your Productivity Companion
          </motion.h1>
          <motion.div
            className="grid gap-8 md:grid-cols-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="space-y-8">
              <PomodoroTimer />
              <DailyFocusDashboard />
            </div>
            <div className="space-y-8">
              <WeeklyMonthlyFocusDashboard />
              <GamificationDisplay />
            </div>
          </motion.div>
        </motion.div>
        <UserChatHead />
        <TaskChatHead />
      </main>

  );
}

