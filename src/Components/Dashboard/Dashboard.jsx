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
  const [dailyData, setDailyData] = useState([]); // State to store daily fault data
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    axios
      .get("http://13.48.37.38:3000/detection/Dashboard", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const summaryData = response.data.summary;
        if (summaryData) {
          setSummary(summaryData);

          if (
            summaryData.weekly_summary &&
            summaryData.weekly_summary.length > 0
          ) {
            const transformedData = summaryData.weekly_summary.map((entry) => ({
              name: entry.name, // Corrected field from day -> name
              faultRate: entry.faultRate,
            }));
            setDailyData(transformedData);
          } else {
            console.warn("Weekly summary is empty or missing");
          }
        } else {
          console.error("Summary data is missing in the response");
        }
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
                <div className="col-6" key={index}>
                  <div className="defect-item bg-dark text-gold me-2 my-2 p-3 font-bold flex justify-between rounded-xl">
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

        {/* Line Chart for Daily Fault Detection */}
        <div className="col-6">
          <div className="charts">
            <div className="chart-card">
              <h3>Daily Batch Fault Detection</h3>
              <div className="bgc w-fit pe-3 py-3 rounded-3xl">
                <DailyFaultChart data={dailyData} />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Defects Section */}
        <div className="col-4 ms-auto">
          <div className="recent-defects">
            <h3>Recent Defects</h3>
            <div className="bgc text-gold px-5 py-3 rounded-3xl">
              {[...summary.recent_defects].reverse().map((pcb, index) => (
                <div className="row" key={index}>
                  <div className="col-2 self-center text-5xl">
                    <i className="fa-solid fa-microchip"></i>
                  </div>
                  <div className="col-9 ms-auto">
                    <div className="pcb-item">
                      <span className="font-bold">{pcb.pcb_id}</span>
                      <p>Defects: {pcb.defects.join(", ")}</p>
                      {/* Uncomment below when timestamp becomes available */}
                      {/* <p className="text-sm text-muted">Detected: {new Date(pcb.detected_at).toLocaleString()}</p> */}
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

// Line Chart Component for Daily Fault Detection (Fixed)
const DailyFaultChart = ({ data }) => (
  <LineChart width={600} height={250} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" tick={{ fill: "#009669", fontSize: 14 }} />
    <YAxis domain={[90, 100]} tick={{ fill: "#009669" }} />
    <Tooltip
      labelFormatter={(label) => `Day: ${label}`}
      formatter={(value) => [`${value}%`, "Fault Rate"]}
    />
    <Line
      type="monotone"
      dataKey="faultRate"
      stroke="#eda10d"
      strokeWidth={2}
      dot={{ r: 4 }}
    />
  </LineChart>
);
