import React from "react";
import Link from "next/link";

import logo from "../../assets/images/handonkey.svg";
import businessman from "../../assets/images/icons/businessman.svg"
import businesswoman from "../../assets/images/icons/businesswoman.svg"
import checkIn from "../../assets/images/icons/in.svg";
import checkOut from "../../assets/images/icons/out.svg";

const Access = (props) => {
  return (
    <div className="access d-flex justify-content-center align-items-center bg-info">
      <div className="access-content d-flex flex-wrap flex-column p-4">
        <div
          className="access-content-logo w-100 d-flex justify-content-center flex-wrap align-items-center"
          style={{ backgroundImage: `url(${logo})` }}
        ></div>
        <h1 className="content-logo-title text-primary">
          Controle de Ambientes Fisicos
        </h1>
        <div className="access-content-options w-100 d-flex flex-grow-1 flex-wrap">
          <Link href="/checkin/email">
            <a className="btn btn-primary d-flex justify-content-center align-items-center">
              <img src={checkIn} alt="checkin icon" className="check-icon"/>
              Entrada
            </a>
          </Link>
          <Link href="/checkout/email">
            <a className="btn btn-primary d-flex justify-content-center align-items-center">
              <img src={checkOut} alt="checkin icon" className="check-icon"/>
              Saida
            </a>
          </Link>
        </div>
      </div>
      <div
        className="access-bg businessman"
        style={{ backgroundImage: `url(${businessman})` }}
      ></div>
      <div
        className="access-bg businesswoman"
        style={{ backgroundImage: `url(${businesswoman})` }}
      ></div>
    </div>
  );
};

export default Access;
