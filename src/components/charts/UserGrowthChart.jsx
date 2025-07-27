import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import React, { memo, useMemo, useState } from 'react';
import { Select } from 'antd';

// Dummy data for user growth
const generateDummyData = (year) => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  // Generate random growth data
  return months.map((month, index) => {
    // Base number with some randomness
    const base = (year - 2020) * 20 + Math.floor(Math.random() * 10) + 10;
    // Increase numbers as months progress
    const growth = Math.floor(base * (1 + index * 0.08));
    return {
      name: month,
      totalUser: growth,
    };
  });
};

const UserGrowthChart = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const years = [currentYear - 1, currentYear, currentYear + 1]; // Show previous, current, and next year
  
  // Generate dummy data for the selected year
  const growthData = useMemo(() => generateDummyData(year), [year]);

  const { monthlyData, maxUsers } = useMemo(() => {
    const max = Math.max(...growthData.map(item => item.totalUser), 0) + 4;
    return { 
      monthlyData: [...growthData], 
      maxUsers: max 
    };
  }, [growthData]);

  return (
    <div
      style={{
        width: '100%',
        height: '450px',
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h3
        style={{
          textAlign: 'left',
          marginBottom: '15px',
          color: '#333',
          fontWeight: 'bold',
          fontSize: '18px',
        }}
      >
        📈 User Growth Chart
      </h3>
      <Select
        loading={false}
        className="min-w-32"
        value={year}
        placeholder="Select year"
        onChange={(value) => setYear(value)}
        style={{
          marginBottom: '15px',
          width: '150px',
          fontWeight: '500',
        }}
        options={years.map((item) => ({ value: item, label: item }))}
      />
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={monthlyData}
          margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#9333EA" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#9333EA" stopOpacity={0.8} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
          <XAxis
            dataKey="name"
            stroke="#333"
            tick={{ fontSize: 12, fontWeight: 500 }}
          />
          <YAxis
            stroke="#333"
            tickCount={6}
            domain={[0, maxUsers]}
            tick={{ fontSize: 12, fontWeight: 500 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '8px',
            }}
            cursor={{ fill: 'rgba(2,44,34,0.1)' }}
          />
          <Legend wrapperStyle={{ fontSize: '13px', fontWeight: 'bold' }} />
          <Bar
            dataKey="totalUser"
            fill="url(#colorUv)"
            barSize={75}
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default memo(UserGrowthChart);