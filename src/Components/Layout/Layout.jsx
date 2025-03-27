import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar.jsx";
import "./Layout.css";
import { Outlet } from "react-router-dom";
import Sidemenu from "../Sidemenu/Sidemenu.jsx";
import axios from "axios";

export default function Layout() {
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
  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 menu p-0">
            <Sidemenu />
          </div>
          <div className="col-10 bg23 border-t-2 border-dark">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
