import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import StepWizard from "react-step-wizard";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useForm, FormProvider } from "react-hook-form";
import { Image, Form } from "react-bootstrap";

import Email from "../../components/Steps/Email";
import AccessCode from "../../components/Steps/AccessCode";

import artform from "../../assets/images/icons/artform.svg";
import checkOut from "../../assets/images/icons/saida-icon-blue.svg";
import box from "../../assets/images/icons/artbox.svg";
import logo from "../../assets/images/handonkey.svg";

import { api } from "../../../service/api";

const Checkout = () => {
  const stepWizard = useRef();
  const router = useRouter();
  const MySwal = withReactContent(Swal);
  const [checkout, setCheckout] = useState({ email: "", code: "" });
  const methods = useForm();
  const email = methods.watch("email");

  const onSubmit = (data) => {
    console.log(" data = ", data);
    api
      .post("v1/checkout", data)
      .then((res) => {
        console.log(res);
        MySwal.fire({
          icon: "success",
          title: "Volte sempre ao TRTRN-21",
          text: "Sua saida foi registrada com sucesso!",
        }).then(() => {
          router.push("/access");
        });
      })
      .catch((err) => {
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: "Desculpe, houve um erro no preenchimento dos requisitos",
        }).then(() => {
          router.push("/access");
        });
      });
  };

  useEffect(() => {
    setCheckout({
      ...checkout,
      email,
    });
  }, [email]);

  return (
    <div className="check d-flex justify-content-center align-items-center vh-100 bg-red">
      <div className="check-content d-flex flex-wrap flex-column p-4">
        <div className="check-content-logo w-100 position-relative d-flex justify-content-center flex-wrap align-items-center">
          <Image src={logo} className="content-logo position-absolute caf" />
          <Image src={checkOut} className="mr-1" />
          <strong className="check-content-title">Saida</strong>
        </div>
        <div className="check-content-form flex-grow-1">
          <FormProvider {...methods}>
            <Form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="w-100 h-100 container"
            >
              <StepWizard ref={stepWizard} className="overflow-hidden">
                <Email email={checkout.email} />
                <AccessCode access={checkout.code} />
              </StepWizard>
            </Form>
          </FormProvider>
        </div>
      </div>
      <div
        className="check-bg"
        style={{ backgroundImage: `url(${artform})` }}
      ></div>
      <div
        className="check-bg box w-100"
        style={{ backgroundImage: `url(${box})` }}
      ></div>
    </div>
  );
};

export default Checkout;
