import React from "react";
import { Image, Button } from "react-bootstrap";

import password from "../../assets/images/icons/password.svg";

import Input from "../../components/Form/Input";

const AccessCode = ({ code, ...rest }) => {
  return (
    <>
      <div className="row w-100 mt-5 justify-content-center">
        <Input
          name="code"
          placeholder="Senha de acesso"
          label={<Image className="mb-1" src={password} />}
          contextClassName="position-relative d-flex justify-content-center"
          labelClassName="position-absolute check-form-label"
          className="text-center check-form-input input-username"
        />
      </div>
      <div className="row mt-5 d-flex row-buttons justify-content-center align-items-center">
        <div className="d-flex justify-content-around confirm-div">
          <Button
            variant="primary"
            className="p-3 text-white m-auto"
            type="submit"
            size="lg"
          >
            Confirmar
          </Button>
        </div>
        <div className="d-flex justify-content-around">
          <a>
            <Button
              variant="secondary"
              className="text-white"
              onClick={() => rest.previousStep()}
            >
              Voltar
            </Button>
          </a>
        </div>
      </div>
    </>
  );
};

export default AccessCode;
