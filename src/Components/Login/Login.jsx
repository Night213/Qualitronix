import axios from "axios";
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(" ");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://13.48.37.38:3000/auth/signin", {
        email,
        password,
      });

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      console.log("Login Successful:", response.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login Failed");
      console.error("Login failed:", err);
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
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <button
                    className="mt-2 Button-bg rounded-pill p-1 mb-2"
                    type="submit"
                  >
                    Login
                  </button>

                  <Link to="/ForgotPassword" className="text-center slogan">
                    Forgot Password? Click Here
                  </Link>

                  {error && <div className="text-red-600 text-sm">{error}</div>}
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
                Don’t Have an Account?
                <Link to="/Register">{" Register here"}</Link>
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
          <div className="col-6 d-none d-md-block panel-background ">
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
