import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Subscription() {
  const [userID, setUserID] = useState("");
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://13.48.37.38:3000/user/profile", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

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
        "http://13.48.37.38:3000/subscription/checkout",
        { userId: userID, plan: plan }
      );

      const checkoutUrl = response.data.url;
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        console.error("Checkout URL not found in response.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const planOptions = [
    {
      id: "diamond",
      title: "Diamond",
      description: "Batch(s) of 500 Photos/Day",
      price: "$100",
      color: "bg-cyan-200",
      highlight: true,
    },
    {
      id: "basic",
      title: "Basic",
      description: "Batch(s) of 10 Photos/Day",
      price: "Free",
      color: "bg-gray-400",
    },
    {
      id: "silver",
      title: "Silver",
      description: "Batch(s) of 75 Photos/Day",
      price: "$25",
      color: "bg-slate-300",
    },
    {
      id: "gold",
      title: "Gold",
      description: "Batch(s) of 200 Photos/Day",
      price: "$60",
      color: "bg-yellow-300",
    },
  ];

  return (
    <div className="w-full px-4 py-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-black mb-8">
        Most Popular
      </h2>

      {/* Diamond Plan */}
      <div className="bg-black text-white p-6 rounded-2xl mb-10 shadow-lg">
        <div className="flex flex-col  gap-4">
          <div className="w-full text-left">
            <div className="py-3 px-4 rounded-2xl bg-cyan-200 text-black font-semibold">
              <h3 className="text-xl">Diamond</h3>
              <p>Batch(s) of 500 Photos/Day</p>
            </div>
          </div>
          <div className="text-start mb-0">
            <p className="text-sm">Monthly Price</p>
            <h3 className="text-2xl font-bold">$100</h3>
          </div>
          <hr className="text-light m-0" />
          <div className="w-full mt-0">
            <button
              onClick={() => handleSelect("diamond")}
              className="w-full px-6 py-2 button-bg text-black font-medium rounded-lg hover:bg-gray-200 transition"
            >
              Select
            </button>
          </div>
        </div>
      </div>

      {/* Other Plans */}
      <h3 className="text-2xl text-center text-black mb-6">Other Plans</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {planOptions
          .filter((plan) => plan.id !== "diamond")
          .map((plan) => (
            <div
              key={plan.id}
              className="bg-black text-white p-3 rounded-2xl shadow-md flex flex-col"
            >
              <div className={`rounded-2xl p-4 mb-4 ${plan.color} text-black`}>
                <h3 className="text-xl font-bold">{plan.title}</h3>
                <p>{plan.description}</p>
              </div>
              <div className="mb-0">
                <p className="text-sm">Monthly Price</p>
                <h3 className="text-xl font-bold">{plan.price}</h3>
              </div>
              <hr className="text-light" />
              <button
                onClick={() => handleSelect(plan.id)}
                className="w-full px-4 py-2 button-bg text-black font-medium rounded-lg hover:bg-gray-200 transition"
              >
                Select
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
