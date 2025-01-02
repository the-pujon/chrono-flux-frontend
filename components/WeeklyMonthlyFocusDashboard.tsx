import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { RootState } from '../store/store';
import { motion, AnimatePresence } from 'framer-motion';

export const WeeklyMonthlyFocusDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('weekly');
  const { weeklyFocusTime, weeklySessions, monthlyFocusTime, monthlySessions } = useSelector((state: RootState) => state.focusTracker);

  const weeklyData = weeklyFocusTime.map((time, index) => ({
    day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index],
    focusTime: time,
    sessions: weeklySessions[index],
  }));

  const monthlyData = monthlyFocusTime.map((time, index) => ({
    day: index + 1,
    focusTime: time,
    sessions: monthlySessions[index],
  }));

  const totalWeeklySessions = weeklySessions.reduce((sum, sessions) => sum + sessions, 0);
  const totalMonthlySessions = monthlySessions.reduce((sum, sessions) => sum + sessions, 0);

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const renderChart = (data: any[]) => (
    <motion.div
      className="h-64"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="focusTime" fill="#8884d8" name="Focus Time (minutes)" />
          <Bar yAxisId="right" dataKey="sessions" fill="#82ca9d" name="Sessions" />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full bg-white dark:bg-gray-800 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">Focus Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value="weekly">
                  <div className="mb-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Weekly Focus Time</p>
                      <p className="text-2xl font-bold text-blue-700 dark:text-blue-200">{formatTime(weeklyFocusTime.reduce((sum, time) => sum + time, 0))}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Weekly Sessions</p>
                      <p className="text-2xl font-bold text-green-700 dark:text-green-200">{totalWeeklySessions}</p>
                    </div>
                  </div>
                  {renderChart(weeklyData)}
                </TabsContent>
                <TabsContent value="monthly">
                  <div className="mb-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Monthly Focus Time</p>
                      <p className="text-2xl font-bold text-blue-700 dark:text-blue-200">{formatTime(monthlyFocusTime.reduce((sum, time) => sum + time, 0))}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Monthly Sessions</p>
                      <p className="text-2xl font-bold text-green-700 dark:text-green-200">{totalMonthlySessions}</p>
                    </div>
                  </div>
                  {renderChart(monthlyData)}
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

