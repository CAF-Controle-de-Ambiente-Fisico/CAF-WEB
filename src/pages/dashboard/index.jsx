import React from "react";
import { Image, Button } from "react-bootstrap";
import logoHeader from "./../../assets/images/handonkey.svg";
import userIcon from "./../../assets/images/icons/user-icon.svg";
import copyIcon from "./../../assets/images/icons/copy.svg";

function index() {
  // const copyCode = () => {
  //  if (process.browser) {
  //    let inputCode = document.getElementById("current-code");
  //    inputCode.select();
  //    inputCode.setSelectionRange(0, 99999);

  //    document.execCommand("copy");
  //  }
  // };
  return (
    <div className="dashboard-box d-flex justify-content-center align-items-center">
      <div className="dashboard-header d-flex justify-content-center align-items-center">
        <div className="dashboard-header-logo ml-2">
          <Image src={logoHeader} height="50px" />
        </div>

        <div className="dashboard-header-app-name">CAF</div>

        <div className="dashboard-header-user-info mr-2 d-flex align-items-center">
          <div>Fulano</div>
          <div className="divider-y ml-2 mr-2"></div>
          <div className="h-100 d-flex justify-content-center align-items-center">
            <Image src={userIcon} height="35px" />
          </div>
        </div>
      </div>

      <div className="dashboard-body ml-3 mr-3">
        <div className="dashboard-body-current-code d-flex flex-column justify-content-center align-items-center">
          <div className="text-code-title">Código ativo</div>
          <div className="divider-x mt-3 mb-3"></div>
          <div className="code-value ml-2 mr-2 d-flex justify-content-center align-items-center">
            <div className="code-value-text">
              aa23dfe32aa23dfe32aa23dfe32aa23dfe32aa23dfe32aa23dfe32
            </div>
          </div>
          <div className="mt-2">
            <Button onClick={() => {}} className="copy-button d-flex">
              <Image height="25" src={copyIcon} alt="" />
              <div className="copy-button-text ml-2">Copiar código</div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
