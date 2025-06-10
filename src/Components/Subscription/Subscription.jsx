import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Subscription.css";

export default function Subscription() {
  const [userID, setUserID] = useState("");
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/user/profile",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setUserID(response.data.user._id);
        localStorage.setItem("username", response.data.user.username);

        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSelect = async (plan) => {
    if (!userID) {
      alert("User ID not found. Please log in again.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/subscription/checkout",
        { userId: userID, plan: plan }
      );

      console.log("Checkout Success:", response.data);

      const checkoutUrl = response.data.url;
      if (checkoutUrl) {
        // Open checkout URL in the same tab
        window.location.href = checkoutUrl;
      } else {
        console.error("Checkout URL not found in response.");
      }
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
          <button className="w-100" onClick={() => handleSelect("diamond")}>
            Select
          </button>
        </div>
      </div>
      <div className="row text-center text-black my-2">
        <h3>Other Plans</h3>
      </div>
      <div className="row">
        {["basic", "silver", "gold"].map((plan, index) => {
          const planDetails = {
            basic: { color: "#808080", photos: 10, price: "Free" },
            silver: { color: "#C0C0C0", photos: 75, price: "$25" },
            gold: { color: "#FFD700", photos: 200, price: "$60" },
          }[plan];

          return (
            <div key={index} className="col-12 col-md-4">
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
