import React, { useEffect } from "react";
import axios from "axios";
import "./Subscription.css";

export default function Subscription() {
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "http://ec2-13-48-37-38.eu-north-1.compute.amazonaws.com/user/profile",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const { username } = response.data.user;

        localStorage.setItem("username", username);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSelect = async (plan) => {
    if (!userId) {
      alert("User ID not found. Please log in again.");
      return;
    }

    try {
      const response = await axios.post(
        "http://ec2-13-48-37-38.eu-north-1.compute.amazonaws.com/subscription/checkout",
        { userId: userId, plan: plan }
      );

      console.log("Checkout Success:", response.data);
      alert(`You selected the ${plan} plan!`);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container p-3 gap-1">
      <div className="row text-center text-black my-1">
        <h2>Most Popular</h2>
      </div>
      <div className="row bg-black p-3 rounded-2xl gap-2 mx-1">
        <div className="bg-cyan-200 rounded-2xl py-2">
          <h3>Diamond</h3>
          <p className="m-0">Batch(s) of 500 Photos/Day</p>
        </div>
        <div className="text-light">
          <p className="m-1">Monthly Price</p>
          <h3>$100</h3>
          <hr className="text-light" />
        </div>
        <div className="button-bg col-3 text-center m-auto p-0">
          <button className="w-100" onClick={() => handleSelect("Diamond")}>
            Select
          </button>
        </div>
      </div>
      <div className="row text-center text-black my-2">
        <h3>Other Plans</h3>
      </div>
      <div className="row">
        {["Basic", "Silver", "Gold"].map((plan, index) => {
          const planDetails = {
            Basic: { color: "#808080", photos: 10, price: "Free" },
            Silver: { color: "#C0C0C0", photos: 75, price: "$25" },
            Gold: { color: "#FFD700", photos: 200, price: "$60" },
          }[plan];

          return (
            <div key={index} className="col-4">
              <div className="row bg-black p-3 rounded-2xl gap-2 m-1">
                <div
                  className="rounded-2xl py-2"
                  style={{ backgroundColor: planDetails.color }}
                >
                  <h3>{plan}</h3>
                  <p className="m-0">
                    Batch(s) of {planDetails.photos} Photos/Day
                  </p>
                </div>
                <div className="text-light">
                  <p className="m-1">Monthly Price</p>
                  <h3>{planDetails.price}</h3>
                  <hr className="text-light" />
                </div>
                <div className="button-bg col-3 text-center m-auto p-0">
                  <button className="w-100" onClick={() => handleSelect(plan)}>
                    Select
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
