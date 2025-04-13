import React, { useState, useEffect } from "react";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./Settings.css";
import UpdateProfile from "../UpdateProfile/UpdateProfile";
import Preferences from "../Preferences/Preferences";
import Security from "../Security/Security";

export default function Settings() {
  const [activeButton, setActiveButton] = useState("UpdateProfile");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname.split("/").pop();

    // Redirect to Update-Profile if only /Settings is visited
    if (path === "Settings") {
      navigate("Update-Profile");
    }

    if (path === "Preferences") {
      setActiveButton("Preferences");
    } else if (path === "Security") {
      setActiveButton("Security");
    } else {
      setActiveButton("UpdateProfile");
    }
  }, [location, navigate]);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <>
      <div className="container-fluid m-10">
        <div className="row">
          <div className="col-10 m-auto mt-5 bgi p-0 rounded-4xl">
            <div className="text-white bgf m-0 px-3">
              <div>
                <ul className="nav nav-underline pb-4 pt-3">
                  <li
                    className="nav-item"
                    onClick={() => handleButtonClick("UpdateProfile")}
                  >
                    <Link
                      to="Update-Profile"
                      className={`nav-link text-white w-100 text-start ${
                        activeButton === "UpdateProfile" ? "active-button" : ""
                      }`}
                    >
                      {"Update Profile"}
                    </Link>
                  </li>
                  <li
                    className="nav-item"
                    onClick={() => handleButtonClick("Preferences")}
                  >
                    <Link
                      to="Preferences"
                      className={`nav-link text-white w-100 text-start ${
                        activeButton === "Preferences" ? "active-button" : ""
                      }`}
                    >
                      {"Preferences"}
                    </Link>
                  </li>
                  <li
                    className="nav-item"
                    onClick={() => handleButtonClick("Security")}
                  >
                    <Link
                      to="Security"
                      className={`nav-link text-white w-100 text-start ${
                        activeButton === "Security" ? "active-button" : ""
                      }`}
                    >
                      {"Security"}
                    </Link>
                  </li>
                </ul>
                <Routes>
                  <Route path="Update-Profile" element={<UpdateProfile />} />
                  <Route path="Preferences" element={<Preferences />} />
                  <Route path="Security" element={<Security />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
