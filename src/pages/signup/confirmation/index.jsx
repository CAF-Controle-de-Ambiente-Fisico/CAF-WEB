import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Image, Button, Alert, Form } from "react-bootstrap";
import { useForm, FormProvider } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import bgContet from "../../../assets/images/arte-wave.svg";
import logo from "../../../assets/images/handonkey.svg";
import Input from "../../../components/Form/Input";

const Confirmation = () => {
  const methods = useForm();

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

  return (
    <div className="confirmation d-flex justify-content-center align-items-center bg-info vh-100">
      <div className="confirmation-content d-flex flex-wrap flex-column p-4">
        <div className="confirmation-content-logo w-100 d-flex justify-content-center flex-wrap align-items-center">
          <Image src={logo} className="content-logo-image w-100" />
        </div>
        <div className="confirmation-content-options w-100 d-flex justify-content-around mt-5 flex-wrap">
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
              contextClassName="position-relative mt-4 d-flex justify-content-center"
              className="signup-form-input input-password"
            />

            <Input
              required
              name="passwordConfirmation"
              type="password"
              placeholder="Digite sua senha novamente"
              contextClassName="position-relative mt-4 d-flex justify-content-center"
              className="signup-form-input input-password"
            />

            <Button
              variant="warning"
              className="signup-form-button mt-4 badge badge-pill text-white"
              type="submit"
            >
              Confirmar
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
