import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface ExecutionTimeData {
  timestamp: string;
  duration: number;
}

interface ExecutionTimeChartProps {
  data: ExecutionTimeData[];
}

export function ExecutionTimeChart({ data }: ExecutionTimeChartProps) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(value) => new Date(value).toLocaleDateString()}
          />
          <YAxis
            label={{ value: 'Duration (s)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip
            labelFormatter={(value) => new Date(value).toLocaleString()}
            formatter={(value: any) => [`${value}s`, 'Duration']}
          />
          <Line
            type="monotone"
            dataKey="duration"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={{ fill: '#3B82F6' }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}