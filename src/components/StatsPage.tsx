import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const dummyData = [
  { date: "Mon", clicks: 5 },
  { date: "Tue", clicks: 12 },
  { date: "Wed", clicks: 8 },
  { date: "Thu", clicks: 15 },
  { date: "Fri", clicks: 20 },
  { date: "Sat", clicks: 18 },
  { date: "Sun", clicks: 25 },
];

const StatsPage: React.FC = () => {
  return (
    <div className="stats-container">
      <h2 className="stats-title">📊 URL Statistics</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total URLs</h3>
          <p>42</p>
        </div>
        <div className="stat-card">
          <h3>Most Clicked</h3>
          <p>my-link</p>
        </div>
        <div className="stat-card">
          <h3>Avg. Expiry</h3>
          <p>28 mins</p>
        </div>
      </div>

      <div className="chart-container">
        <h3>Clicks Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dummyData}>
            <Line type="monotone" dataKey="clicks" stroke="#2d89ff" strokeWidth={3} />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatsPage;
