import React, { useMemo } from 'react';
import { Cell, Pie, PieChart } from 'recharts';

const ActivityChart = () => {
  // Generate dummy data for subscribers and unsubscribers
  const { datas, totalValue } = useMemo(() => {
    // Generate random numbers with a realistic ratio (more subscribers than unsubscribers)
    const subscribed = Math.floor(Math.random() * 500) + 300; // 300-800
    const unsubscribed = Math.floor(subscribed * (0.1 + Math.random() * 0.15)); // 10-25% of subscribed
    
    const data = [
      { name: 'Active User', value: subscribed },
      { name: 'Active Agent', value: unsubscribed },
    ];
    
    return {
      datas: data,
      totalValue: subscribed + unsubscribed
    };
  }, []);

  const COLORS = ['#7E22CE', '#9333EA']; // Purple shades to match the theme

  return (
    <div className="bg-purple-50 rounded-xl p-6 w-full h-[450px]">
      <h1 className="!text-sm xl:!text-2xl font-bold text-purple-950 mb-6">
        Activity Statistics
      </h1>

      <div className="relative h-64 flex justify-center">
        {/* PieChart Component */}
        <PieChart width={240} height={240}>
          <Pie
            data={datas}
            cx={120}
            cy={120}
            startAngle={90}
            endAngle={-270}
            innerRadius={60}
            outerRadius={100}
            paddingAngle={0}
            dataKey="value"
          >
            {datas.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                strokeWidth={0}
              />
            ))}
          </Pie>
        </PieChart>

        {/* Center Total Value */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="text-xl xl:text-3xl font-bold text-gray-800">
            {totalValue >= 1000 ? (
              (totalValue / 1000).toFixed(1) + 'K'
            ) : (
              totalValue
            )}
          </div>
        </div>
      </div>

      {/* Legend Section */}
      <div className="mt-2 space-y-4">
        {datas.map((entry, index) => (
          <div
            key={`legend-${index}`}
            className="flex items-center justify-between"
          >
            <div className="flex items-center">
              <div
                className="w-2 h-2 rounded-full mr-3"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></div>
              <span className="text-xl text-gray-800">{entry.name}</span>
            </div>
            <div
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
              className="min-w-[100px] flex items-center justify-center rounded-lg px-4 py-1 text-xl text-white"
            >
              {entry.value.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityChart;