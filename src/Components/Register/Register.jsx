import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(" ");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (password !== confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/auth/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        confirmPassword,
        phone,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Signup successful:", data);
      navigate("/Login");
    } else {
      const errorData = await response.json();

      // Try to extract the first detailed validation message
      const detailedMessage = errorData?.error?.[0]?.message;

      setError(detailedMessage || errorData.message || "Signup failed. Please try again.");
      console.error("Signup failed:", errorData);
    }
  } catch (error) {
    setError("An error occurred. Please try again later.");
    console.error("Error during signup:", error);
  }
};


  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-6 content-center">
            <div className="row col-7 m-auto BG-Gradient rounded-2xl center">
              <div className="">
                <img
                  className="col-4 m-auto"
                  src="https://imgur.com/4YwzsaW.jpg"
                  alt="Qualitronix Logo"
                />
                <form className="row py-1 w-75 m-auto" onSubmit={handleSubmit}>
                  <input
                    className="border-1 rounded-md border-white my-2 p-1"
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    className="border-1 rounded-md border-white my-2 p-1"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    className="border-1 rounded-md border-white my-2 p-1 [&::-webkit-inner-spin-button]:appearance-none"
                    type="number"
                    inputMode="numeric"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <input
                    className="border-1 rounded-md border-white my-2 p-1"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <input
                    className="border-1 rounded-md border-white my-2 p-1"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />

                  <button
                    className="mt-2 Button-bg rounded-pill p-1 mb-2"
                    type="submit"
                  >
                    Register
                  </button>

                  {error && (
                    <div className="text-red-600 text-sm text-center">
                      {error}
                    </div>
                  )}
                </form>
                <div className="title text-center mx-5">
                  <hr className="text-white" />
                  <div className="text-sm text-white font-light p-2">
                    Or continue with
                  </div>
                  <hr className="text-white" />
                </div>
              </div>
              <div className="col-12">
                <div className="Gmail-bg col-3 m-auto mb-1 mt-4 text-light font-light text-center border-white border-1 pt-1 pb-1 rounded-2xl">
                  <img
                    className="col-5 mt-2 mb-2 mx-auto"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/2560px-Gmail_icon_%282020%29.svg.png"
                    alt="Gmail Logo"
                  />
                  Gmail
                </div>
              </div>
              <div className="text-light text-center border-1 w-auto px-4 rounded-md mt-5 mb-5 m-auto">
                Already have an account?
                <Link to="/Login">{" Login here"}</Link>
              </div>
            </div>
            <div className="col-8 mx-auto text-center text-light pt-7">
              Get the Application
              <div className="row mx-auto">
                <div className="col-6">
                  <button>
                    <img
                      src="https://imgur.com/uPXtOKg.png"
                      alt="Google Play"
                    />
                  </button>
                </div>
                <div className="col-6">
                  <button>
                    <img src="https://imgur.com/vVOobox.png" alt="App Store" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 panel-background d-none d-md-block">
            <div className="images mb-28">
              <img
                className="col-2 m-auto"
                src="https://imgur.com/4YwzsaW.jpg"
                alt="Qualitronix Logo"
              />
              <img
                className="col-6 p-1 m-auto"
                src="https://imgur.com/aM95Zwr.png"
                alt="Qualitronix"
              />
            </div>
            <div className="slogan col-6 text-center m-auto pb-36">
              <h2>Defect Zero, Quality Hero</h2>
              <hr />
            </div>
            <div className="slogan col-6 text-center m-auto pb-20">
              <h2>PCB Defect Detection</h2>
              <hr />
            </div>
            <div className="text-center">
              <Link
                to="/About"
                className="p-2 px-4 rounded-lg text-2xl font-normal drop-shadow-2xl text-white bg-black"
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
