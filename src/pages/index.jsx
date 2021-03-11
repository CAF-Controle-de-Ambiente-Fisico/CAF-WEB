import React from "react";
import { Image, Button } from "react-bootstrap";

import bgContet from "../assets/images/arte-wave.svg";
import logo from "../assets/images/handonkey.svg";

const Home = () => {
  return (
    <div className="home d-flex justify-content-center align-items-center">
      <div className="home-content d-flex flex-wrap flex-column p-4">
        <div className="home-content-logo w-100 d-flex justify-content-center flex-wrap align-items-center">
          <Image src={logo} className="content-logo-image w-100" />
          <h1 className="content-logo-title">
            CAF - Controle de Ambientes Fisicos
          </h1>
        </div>
        <div className="home-content-options w-100 d-flex justify-content-around flex-grow-1">
          <div className="button-content mt-5">
            <Button className="p-4">Funcionário</Button>
          </div>
          <div className="button-content mt-5">
            <Button className="p-4">Visitante</Button>
          </div>
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
