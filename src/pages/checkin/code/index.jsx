import React from "react";
import { useRouter } from "next/router";
import { Image, Button, Form } from "react-bootstrap";
import { useForm, FormProvider } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import password from "../../../assets/images/icons/password.svg";
import artform from "../../../assets/images/icons/artform.svg"
import checkIn from "../../../assets/images/icons/Entrada-azul.svg";
import box from "../../../assets/images/icons/artbox.svg"
import logo from "../../../assets/images/handonkey.svg";
import Input from "../../../components/Form/Input";
import api from "../../../../service/api"

const CheckinToken = () => {
  const methods = useForm();
  const router = useRouter();

  const MySwal = withReactContent(Swal);
  
  const onSubmit = (data) => {
    console.log(" data = ", data);
    api
      .post("v1/checkin", data)
      .then((res) => {
        console.log(res);
        MySwal.fire({
          icon: "success",
          title: "Bem vindo ao TRTRN-21",
          text: "Entrada registrada com Sucesso!",
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
          setLoading(false);
        });
      });
  };

  return (
    <div className="check d-flex justify-content-center align-items-center vh-100 bg-green">
      <div className="check-content d-flex flex-wrap flex-column p-4">
        <div className="check-content-logo w-100 position-relative d-flex justify-content-center flex-wrap align-items-center">
          <Image src={logo} className="content-logo position-absolute caf" />
          <Image src={checkIn} className="content-logo p-3 mr-3" />
          <strong className="check-content-title">Entrada</strong>
        </div>
        <div className="check-content-form flex-grow-1">
        <FormProvider {...methods}>
          <Form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="h-100 container"
          >
            <div className="row mt-5">
              <div className="offset-2 col-8 d-flex justify-content-around">
                <Input
                  name="code"
                  placeholder="Senha de acesso"
                  label={<Image className="mb-1" src={password} />}
                  contextClassName="position-relative d-flex justify-content-center"
                  labelClassName="position-absolute check-form-label"
                  className="text-center check-form-input input-username"
                />
              </div>
            </div>

            <div className="row mt-5">
              <div className="offset-2 col-8 d-flex justify-content-around">
                <Button
                  variant="primary"
                  className="p-3 text-white m-auto"
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

export default CheckinToken;
