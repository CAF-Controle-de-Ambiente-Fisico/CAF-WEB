import React from "react";
import { Image, Button } from "react-bootstrap";

import bgContet from "../assets/images/arte-wave.svg";
import logo from "../assets/images/handonkey.svg";

const Home = ({ nextStep, setKindUser }) => {
  return (
    <div className="home d-flex justify-content-center align-items-center bg-info">
      <div className="home-content d-flex flex-wrap flex-column p-4">
        <div
          className="home-content-logo w-100 d-flex justify-content-center flex-wrap align-items-center"
          style={{ backgroundImage: `url(${logo})` }}
        ></div>
        <h1 className="content-logo-title text-primary">
          Controle de Ambientes Fisicos
        </h1>
        <div className="home-content-options w-100 d-flex flex-grow-1 flex-wrap">
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
