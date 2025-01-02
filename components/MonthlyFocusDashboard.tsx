import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RootState } from '../store/store';

export const MonthlyFocusDashboard: React.FC = () => {
  const { monthlyFocusTime } = useSelector((state: RootState) => state.focusTracker);

  const monthlyData = monthlyFocusTime.map((time, index) => ({
    day: index + 1,
    focusTime: time,
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Monthly Focus</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
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

