import React from 'react';
// import { useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { RootState } from '../store/store';
import { Clock, Target } from 'lucide-react';
import { motion } from 'framer-motion';
// import { RootState } from '@/redux/store';
import { useTodayFocusSession } from '@/hooks/focusSessionService.hook';

export const DailyFocusDashboard: React.FC = () => {
  // const { dailyFocusTime, dailySessions } = useSelector((state: RootState) => state.focusTracker);
  const {data: todayFocusSession} = useTodayFocusSession()
  console.log(todayFocusSession)

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${mins}m ${secs}s`;
  };
  

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full bg-white dark:bg-gray-800 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">Daily Focus</CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div className="grid grid-cols-2 gap-4">
            <motion.div
              className="flex flex-col items-center justify-center p-4 bg-blue-100 dark:bg-blue-900 rounded-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <Clock className="w-8 h-8 mb-2 text-blue-600 dark:text-blue-300" />
              <p className="text-sm text-gray-600 dark:text-gray-400">Total focus time today</p>
              <motion.p
                className="text-2xl font-bold text-blue-700 dark:text-blue-200"
                key={todayFocusSession?.data?.totalSessions}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {formatTime(todayFocusSession?.data?.totalTimes)}
              </motion.p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center justify-center p-4 bg-green-100 dark:bg-green-900 rounded-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <Target className="w-8 h-8 mb-2 text-green-600 dark:text-green-300" />
              <p className="text-sm text-gray-600 dark:text-gray-400">Total sessions today</p>
              <motion.p
                className="text-2xl font-bold text-green-700 dark:text-green-200"
                key={todayFocusSession?.data?.totalSessions}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {todayFocusSession?.data?.totalSessions}
              </motion.p>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

