import React from "react";
import { useRouter } from "next/router";
import { Image, Form, Button } from "react-bootstrap";
import { useForm, FormProvider } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import bgContet from "../../../assets/images/arte-wave.svg";
import logo from "../../../assets/images/handonkey.svg";
import Input from "../../../components/Form/Input";

const Confirmation = () => {
  const MySwal = withReactContent(Swal);
  const router = useRouter();

  const onSubmit = (data) => {
    if (data.password === data.passwordConfirmation) {
      console.log(data);
      MySwal.fire({
        icon: "success",
        title: "Parabens!",
        text: "Você foi cadastrado com Sucesso!",
      }).then(() => {
        router.push("/");
      });
    } else {
      MySwal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Senhas não são iguais",
      });
    }
  };

  const methods = useForm();

  return (
    <div className="confirmation d-flex justify-content-center align-items-center bg-info vh-100">
      <div className="confirmation-content d-flex flex-wrap flex-column p-4">
        <div className="confirmation-content-logo w-100 d-flex justify-content-center flex-wrap align-items-center">
          <Image src={logo} className="content-logo-image w-100" />
          <p>Cadastre sua senha</p>
        </div>
        <div className="confirmation-content-form w-100 d-flex justify-content-around align-items-center flex-grow-1 flex-wrap">
          <FormProvider {...methods}>
            <Form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="w-100 d-flex flex-column align-items-center flex-wrap"
            >
              <Input
                required
                name="password"
                type="password"
                placeholder="Senha"
                contextClassName="position-relative mt-3 d-flex justify-content-center"
                labelClassName="position-absolute confirmation-form-label"
                className="confirmation-form-input input-password"
              />

              <Input
                required
                name="passwordConfirmation"
                type="password"
                placeholder="Digite sua senha novamente"
                contextClassName="position-relative mt-3 d-flex justify-content-center"
                labelClassName="position-absolute confirmation-form-label"
                className="confirmation-form-input input-password"
              />

              <Button
                className="login-form-button mt-3 badge badge-pill"
                type="submit"
              >
                Salvar
              </Button>
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
