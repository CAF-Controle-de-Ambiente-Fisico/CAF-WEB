import React from "react";
import { Image, Button, Form } from "react-bootstrap";
import { useForm, FormProvider } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import user from "../../../assets/images/icons/user.svg";
import artform from "../../../assets/images/icons/artform.svg"
import checkIn from "../../../assets/images/icons/Entrada-azul.svg";
import box from "../../../assets/images/icons/artbox.svg"
import logo from "../../../assets/images/handonkey.svg";
import Input from "../../../components/Form/Input";

const CheckinEmail = () => {
  const methods = useForm();

  const MySwal = withReactContent(Swal);
  
  const onSubmit = (data) => {
    console.log(" data = ", data);
  };

  return (
    <div className="check d-flex justify-content-center align-items-center vh-100 bg-green">
      <div className="check-content d-flex flex-wrap flex-column p-4">
        <div className="check-content-logo w-100 position-relative d-flex justify-content-center flex-wrap align-items-center">
          <Image src={logo} className="content-logo position-absolute caf" />
          <Image src={checkIn} className="content-logo checkin p-3 mr-3" />
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
                  name="username"
                  placeholder="Usuário ou email"
                  label={<Image className="mb-1" src={user} />}
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

export default CheckinEmail;
