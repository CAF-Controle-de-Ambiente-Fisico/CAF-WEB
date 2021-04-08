import React, { useEffect, useState } from "react";
import { Image, Button } from "react-bootstrap";
import Link from "next/link";
import * as yup from "yup";

import user from "../../assets/images/icons/user.svg";
import Input from "../Form/Input";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("O email é obrigatório!")
    .email("O formato do email está incorreto"),
});

const AccessEmail = ({ email, ...rest }) => {
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    schema.isValid({ email }).then((valid) => {
      console.log("valid = ", valid);
      valid ? setDisabled(false) : setDisabled(true);
    });
  }, [email]);
  return (
    <>
      <div className="row mt-5">
        <div className="offset-2 col-8 d-flex justify-content-around">
          <Input
            name="email"
            placeholder="Digite seu Email"
            label={<Image className="mb-1" src={user} />}
            contextClassName="position-relative d-flex justify-content-center"
            labelClassName="position-absolute check-form-label"
            className="text-center check-form-input input-username"
            required
          />
        </div>
      </div>
      <div className="row mt-5 d-flex row-buttons justify-content-center align-items-center">
        <div className="d-flex justify-content-around confirm-div">
          <Button
            variant="primary"
            className="text-white"
            onClick={() => {
              rest.nextStep();
            }}
            disabled={disabled}
          >
            Continuar
          </Button>
        </div>
        <div className="d-flex justify-content-around">
          <Link href="/access">
            <a>
              <Button variant="secondary" className="text-white">
                Voltar
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AccessEmail;
