// src/SequenceView.js
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import style from './ChartView.module.css'

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartView = ({ labels, data, bindingSites }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "sequence view",
        data: data,
        backgroundColor: bindingSites.map((site) =>
          site ? "orange" : "#D9D9D9"
        ),
        borderColor: bindingSites.map((site) => (site ? "#FF4500" : "#555555")),

        borderWidth: 1,
        barPercentage: 1.0,
        categoryPercentage: 1.0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            size: 14,
            weight: "bold",
          },
          color: "white",
        },
      },
      tooltip: {
        enabled: true,
        displayColors: false,
        backgroundColor: "black",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "white",
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      y: {
        grid: {
          color: "gray",
        },
        ticks: {
          display: false,
        },
      },
    },
  };

  return (
    <div 
    className={style["chart-container"]+" mb-5"}>
      <div
        style={{
          width: `${labels.length * 50}px`, // Adjust this value to control the width of each bar
          height: '300px',
          position: "relative",
          backgroundColor: "#1e1e1e",
          border: "3px solid #777777",
          borderRadius: "10px",
        }}
      >
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ChartView;
