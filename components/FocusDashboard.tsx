import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AppDispatch, RootState } from '../store/store';

export const FocusDashboard: React.FC = () => {
  const { totalFocusTime, dailySessions, weeklyFocusTime } = useSelector((state: RootState) => state.focusTracker);

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const weeklyData = weeklyFocusTime.map((time, index) => ({
    day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index],
    focusTime: time,
  }));

  const getMotivationalMessage = (): string => {
    if (dailySessions >= 8) return "Incredible focus! You're unstoppable!";
    if (dailySessions >= 5) return "Great job! You're making excellent progress!";
    if (dailySessions >= 3) return "Good work! Keep up the momentum!";
    return "Every session counts. You've got this!";
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Focus Dashboard</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold">Total Focus Time</h3>
            <p className="text-2xl font-bold">{formatTime(totalFocusTime)}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Daily Sessions</h3>
            <p className="text-2xl font-bold">{dailySessions}</p>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="focusTime" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-center text-lg font-medium">{getMotivationalMessage()}</p>
      </CardContent>
    </Card>
  );
};

