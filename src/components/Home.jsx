import React from "react";
import { Button } from "react-bootstrap";

import bgContet from "../assets/images/arte-wave.svg";
import logo from "../assets/images/handonkey.svg";

const Home = ({ nextStep, setKindUser }) => {
  return (
    <div className="home d-flex justify-content-center align-items-center bg-info">
      <div className="home-content d-flex flex-column p-5">
        <div
          className="home-content-logo w-100 d-flex justify-content-center flex-wrap align-items-center"
          style={{ backgroundImage: `url(${logo})` }}
        ></div>
        <h1 className="content-logo-title text-primary">
          Controle de Ambientes Fisicos
        </h1>
        <div className="home-content-options d-flex">
          <Button
            onClick={() => {
              setKindUser("employee");
              nextStep();
            }}
          >
            Funcionário
          </Button>
          <Button
            onClick={() => {
              setKindUser("visitant");
              nextStep();
            }}
          >
            Visitante
          </Button>
        </div>
      </div>
      <div
        className="home-bg"
        style={{ backgroundImage: `url(${bgContet})` }}
      ></div>
    </div>
  );
};

export default Home;
