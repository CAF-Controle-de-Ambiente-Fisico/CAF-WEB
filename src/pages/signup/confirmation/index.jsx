import React, { useState } from "react";
import { useRouter } from "next/router";
import { Image, Button, Alert, Form } from "react-bootstrap";
import { useForm, FormProvider } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import bgContet from "../../../assets/images/arte-wave.svg";
import logo from "../../../assets/images/handonkey.svg";
import Input from "../../../components/Form/Input";
import api from "../../../../service/api";

const Confirmation = () => {
  const methods = useForm();
  const [loading, setLoading] = useState(false);

  const MySwal = withReactContent(Swal);
  const router = useRouter();
  const { token } = router.query;

  const onSubmit = (data) => {
    if (data.password === data.passwordConfirmation) {
      data["token"] = token;
      api
        .post("v1/employee/confirmation", data)
        .then((res) => {
          console.log(res.data);
          setSendEmail(res.data.user.email);
          setLoading(false);
        })
        .catch((error) => {
          console.log("error:", error);
          MySwal.fire({
            icon: "error",
            title: "Oops...",
            text: "Desculpe, houve um erro no preenchimento dos requisitos",
          }).then(() => setLoading(false));
        });
    } else {
      MySwal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Senhas não são iguais",
      });
    }
  };

  return (
    <div className="confirmation d-flex justify-content-center align-items-center bg-info vh-100">
      <div className="confirmation-content d-flex flex-wrap flex-column p-4">
        <div className="confirmation-content-logo w-100 d-flex justify-content-center flex-wrap align-items-center">
          <Image src={logo} className="content-logo-image w-100" />
        </div>
        <div className="confirmation-content-form d-flex justify-content-center mt-5 flex-wrap">
          <FormProvider {...methods}>
            <Form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="container"
            >
              <div className="row">
                <div className="offset-2 col-8 d-flex justify-content-around">
                  <Input
                    required
                    name="password"
                    type="password"
                    placeholder="Senha"
                    contextClassName="mt-4"
                    className="confirmation-form-input"
                  />
                </div>
              </div>
              <div className="row">
                <div className="offset-2 col-8 d-flex justify-content-around">
                  <Input
                    required
                    name="passwordConfirmation"
                    type="password"
                    placeholder="Digite sua senha novamente"
                    contextClassName="mt-4"
                    className="confirmation-form-input"
                  />
                </div>
              </div>

              <div className="row mt-4">
                <div className="offset-2 col-8 d-flex justify-content-center">
                  <Button
                    variant="success"
                    className="p-3 badge badge-pill text-white m-auto"
                    type="submit"
                    size="lg"
                  >
                    Confirmar
                  </Button>
                </div>
              </div>
            </Form>
          </FormProvider>
        </div>
      </div>
      <div
        className="confirmation-bg"
        style={{ backgroundImage: `url(${bgContet})` }}
      ></div>
    </div>
  );
};

export default Confirmation;
