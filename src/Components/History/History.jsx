import axios from "axios";
import React, { useEffect, useState } from "react";
import "./History.css";
import Details from "../Details/Details";

export default function History() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [error, setError] = useState(null);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://ec2-13-48-37-38.eu-north-1.compute.amazonaws.com/detection/results",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log("Detection Results:", response.data);
        setData(response.data.results || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch results.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="row gap-y-2 mt-2">
      {data.map((item, index) => (
        <div key={item._id || index} className="col-xl-3 col-lg-4 col-sm-6">
          <div className="p-4 bg-dark rounded-2xl">
            <div className="row">
              <p className="text-center text-orange-300 ">PCB #{index + 1}</p>
              <div className="col-4">
                <img
                  src={item.image_url}
                  alt={`PCB ${index + 1}`}
                  className="img-fluid rounded"
                />
              </div>
              <div className="col-8 text-light">
                <p>Defects: {item.predictions.length}</p>
                <p>
                  Score:{" "}
                  {(
                    item.predictions.reduce((sum, p) => sum + p.confidence, 0) /
                    item.predictions.length
                  ).toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => setShowDetailsModal(true)}
                className="text-light button-bg col-4 ms-auto"
              >
                Details <i className="fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      ))}

      {showDetailsModal && (
        <Details onClose={() => setShowDetailsModal(false)} />
      )}
    </div>
  );
}
