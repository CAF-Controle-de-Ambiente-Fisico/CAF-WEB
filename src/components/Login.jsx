import React from "react";
import { Image, Button } from "react-bootstrap";

import bgContet from "../assets/images/arte-wave.svg";
import logo from "../assets/images/handonkey.svg";

const Login = ({ nextStep, firstStep, kindUser = "" }) => {
  return (
    <div className="login d-flex justify-content-center align-items-center">
      <div
        className="login-bg w-50"
        style={{ backgroundImage: `url(${bgContet})` }}
      ></div>
    </div>
  );
};

export default Login;
