import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const GraphChart = ({ data }) => {
  return (
    <ResponsiveContainer aspect={16 / 6}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={16}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar dataKey="total" fill="#3498db" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GraphChart;
