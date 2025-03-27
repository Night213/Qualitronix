import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    axios
      .get("http://localhost:3000/detection/summary", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setSummary(response.data.summary);
      })
      .catch((error) => {
        console.error("Error fetching summary:", error);
      });
  }, []);

  if (!summary) return <p>Loading...</p>;

  return (
    <div className="container-fluid mt-5">
      {/* Defect Percentage Section */}
      <div className="row gap-4">
        <div className="col-6">
          <div className="defects-percentage">
            <h3>Defects Percentage</h3>
            <div className="row">
              {summary.defect_percentages.map((defect, index) => (
                <div className="col-6">
                  <div
                    key={index}
                    className="defect-item bg-dark text-gold me-2 my-2 p-3 font-bold flex justify-between rounded-xl"
                  >
                    <span className="text-start">{defect.name}</span>
                    <span className="text-end">{defect.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pie Chart for Defective vs Non-Defective PCBs */}
        <div className="col-4 ms-auto">
          <div className="charts">
            <div className="chart-card text-start">
              <h3>Defective vs Non-Defective</h3>
              <div className="flex justify-center bgc rounded-3xl">
                <DefectivePieChart data={summary.defective_chart} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-6">
          <div className="charts">
            {/* Line Chart for Daily Fault Detection */}
            <div className="chart-card">
              <h3>Daily Batch Fault Detection</h3>
              <div className="bgc w-fit pe-3 py-3 rounded-3xl">
                <DailyFaultChart />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Defects Section */}
        <div className="col-4 ms-auto">
          <div className="recent-defects">
            <h3>Recent Defects</h3>
            <div className="bgc text-gold px-5 py-3 rounded-3xl">
              {summary.recent_defects.map((pcb, index) => (
                <div className="row">
                  <div className="col-2 self-center text-5xl">
                    <i class="fa-solid fa-microchip"></i>
                  </div>
                  <div className="col-9 ms-auto">
                    <div key={index} className="pcb-item">
                      <span>{pcb.pcb_id}</span>
                      <p>Defects: {pcb.defects.join(", ")}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Pie Chart Component
const COLORS = ["#009669", "#eda10d"]; // Good PCBs, Defective PCBs
const DefectivePieChart = ({ data }) => (
  <PieChart width={250} height={250}>
    <Pie
      data={data}
      cx="50%"
      cy="50%"
      outerRadius={100}
      fill="#8884d8"
      dataKey="value"
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index]} />
      ))}
    </Pie>
    <Tooltip />
  </PieChart>
);

// Fake Data for Line Chart
const dailyData = [
  { name: "Sat", faultRate: 98 },
  { name: "Sun", faultRate: 95 },
  { name: "Mon", faultRate: 96 },
  { name: "Tue", faultRate: 98 },
  { name: "Wed", faultRate: 93 },
  { name: "Thu", faultRate: 97 },
  { name: "Fri", faultRate: 99 },
];

// Line Chart Component
const DailyFaultChart = () => (
  <LineChart width={600} height={250} data={dailyData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" tick={{ fill: "#009669" }} />
    <YAxis domain={[90, 100]} tick={{ fill: "#009669" }} />
    <Tooltip />
    <Line type="bump" dataKey="faultRate" stroke="#eda10d" strokeWidth={2} />
  </LineChart>
);
