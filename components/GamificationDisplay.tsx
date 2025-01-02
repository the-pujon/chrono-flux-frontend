import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { RootState } from '@/store/store';
import { Trophy, Award, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export const GamificationDisplay: React.FC = () => {
  const { dailyUseStreak, continuousSessionStreak, longestDailyUseStreak, longestContinuousSessionStreak, badges } = useSelector((state: RootState) => state.focusTracker);

  const getDailyUseStreakMessage = (streak: number) => {
    if (streak === 0) return "Start your daily journey today!";
    if (streak < 3) return "Great start! Keep using the app daily!";
    if (streak < 7) return "You're building a daily habit!";
    if (streak < 14) return "Impressive daily dedication!";
    if (streak < 30) return "You're on fire with daily use!";
    return "Unstoppable daily focus master!";
  };

  const getContinuousSessionStreakMessage = (streak: number) => {
    if (streak === 0) return "Ready for your first session?";
    if (streak < 3) return "Good start! Keep the sessions going!";
    if (streak < 5) return "You're in the zone!";
    if (streak < 10) return "Impressive focus!";
    return "Laser-focused champion!";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full bg-white dark:bg-gray-800 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">Your Focus Journey</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex items-center mb-2">
              <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Daily Use Streak</h3>
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Progress value={(dailyUseStreak / 30) * 100} className="w-full h-2 bg-gray-200 dark:bg-gray-700" />
            </motion.div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{dailyUseStreak} days - {getDailyUseStreakMessage(dailyUseStreak)}</p>
          </div>
          <div>
            <div className="flex items-center mb-2">
              <Zap className="w-6 h-6 mr-2 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Continuous Session Streak</h3>
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Progress value={(continuousSessionStreak / 10) * 100} className="w-full h-2 bg-gray-200 dark:bg-gray-700" />
            </motion.div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{continuousSessionStreak} sessions - {getContinuousSessionStreakMessage(continuousSessionStreak)}</p>
          </div>
          <div>
            <div className="flex items-center mb-2">
              <Award className="w-6 h-6 mr-2 text-green-500" />
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Personal Bests</h3>
            </div>
            <p className="text-md text-gray-700 dark:text-gray-300">Longest Daily Use: <span className="font-bold text-green-600 dark:text-green-400">{longestDailyUseStreak} days</span></p>
            <p className="text-md text-gray-700 dark:text-gray-300">Longest Continuous Sessions: <span className="font-bold text-blue-600 dark:text-blue-400">{longestContinuousSessionStreak} sessions</span></p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Achievements</h3>
            <motion.div className="flex flex-wrap gap-2">
              {badges.map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                    {badge}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Collect badges to showcase your progress!</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

