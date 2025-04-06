
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useTrendData } from '@/hooks/useTrendData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Skeleton } from './ui/skeleton';

// Memoize the tooltip component to prevent unnecessary renders
const CustomTooltip = React.memo(({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border shadow-sm rounded-md">
        <p className="font-medium">{label}</p>
        <p className="text-aiblue-dark">
          <span className="font-medium">{payload[0].value}</span> new models
        </p>
      </div>
    );
  }

  return null;
});

CustomTooltip.displayName = 'CustomTooltip';

// Using memo to prevent unnecessary re-renders
const TrendChart: React.FC = React.memo(() => {
  const { data: trendData, isLoading, error } = useTrendData();

  // Format dates for better display
  const formattedData = useMemo(() => {
    if (!trendData) return [];
    
    return trendData.map(item => ({
      ...item,
      formattedDate: new Date(item.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })
    }));
  }, [trendData]);

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>AI Model Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 border border-red-300 bg-red-50 rounded-md text-red-600">
            Error loading trend data: {error instanceof Error ? error.message : 'Unknown error'}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-[400px]">
      <CardHeader>
        <CardTitle>AI Model Trends</CardTitle>
      </CardHeader>
      <CardContent className="h-[320px]">
        {isLoading ? (
          <Skeleton className="h-full w-full" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={formattedData}
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
            >
              <defs>
                <linearGradient id="colorModels" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1d4ed8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="formattedDate" 
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickMargin={8}
                interval="preserveStartEnd"
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                tickMargin={8}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="models" 
                stroke="#1d4ed8" 
                fillOpacity={1} 
                fill="url(#colorModels)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
});

TrendChart.displayName = 'TrendChart';

export default TrendChart;
