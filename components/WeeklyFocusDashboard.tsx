import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RootState } from '@/redux/store';
// import { RootState } from '../store/store';

export const WeeklyFocusDashboard: React.FC = () => {
  const { weeklyFocusTime } = useSelector((state: RootState) => state.focusTracker);

  const weeklyData = weeklyFocusTime.map((time, index) => ({
    day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index],
    focusTime: time,
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Weekly Focus</CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};

