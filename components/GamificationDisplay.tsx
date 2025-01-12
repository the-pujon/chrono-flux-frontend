import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
// import { RootState } from '@/store/store';
import { Award, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGetFocusStreakByUserId } from '@/hooks/focusSessionService.hook';

export const GamificationDisplay: React.FC = () => {

  const {data: focusStreakByUserId} = useGetFocusStreakByUserId();
  console.log("focusStreakByUserId", focusStreakByUserId);
  const continuousSessionStreak = focusStreakByUserId?.data?.streak || 0;
  const badges = focusStreakByUserId?.data?.badges || [];

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
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Achievements</h3>
            <motion.div className="flex flex-wrap gap-2">
              {badges.map((badge: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                 
                  <Badge variant="secondary" className="relative bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 flex flex-col rounded-t-full w-20 h-20 items-center justify-center">
                  <div className='absolute inset-0 flex items-center justify-center '>
                    <Award className="w-16 h-16 text-indigo-500" />
                  </div>
                    <p className="text-sm font-semibold z-10 text-nowrap backdrop-blur-lg absolute bottom-0 shadow-lg" >{badge}</p>
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

