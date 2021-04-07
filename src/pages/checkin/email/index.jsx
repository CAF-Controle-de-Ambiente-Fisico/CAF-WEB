import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Image, Button, Form } from "react-bootstrap";
import { useForm, FormProvider } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import user from "../../../assets/images/icons/user.svg";
import artform from "../../../assets/images/icons/artform.svg";
import checkIn from "../../../assets/images/icons/Entrada-azul.svg";
import box from "../../../assets/images/icons/artbox.svg";
import logo from "../../../assets/images/handonkey.svg";
import Input from "../../../components/Form/Input";
import api from "../../../../service/api";

const CheckinEmail = () => {
  const methods = useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const MySwal = withReactContent(Swal);

  const onSubmit = (data) => {
    console.log(" data = ", data);
    api
      .post("v1/initiatecheckin", data)
      .then((res) => {
        console.log(res);
        router.push("/checkin/code");
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

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="check d-flex justify-content-center align-items-center vh-100 bg-green">
      <div className="check-content d-flex flex-wrap flex-column p-4">
        <div className="check-content-logo w-100 position-relative d-flex justify-content-center flex-wrap align-items-center">
          <Image src={logo} className="content-logo position-absolute caf" />
          <Image src={checkIn} className="mr-1" />
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
                    name="email"
                    placeholder="Digite seu Email"
                    label={<Image className="mb-1" src={user} />}
                    contextClassName="position-relative d-flex justify-content-center"
                    labelClassName="position-absolute check-form-label"
                    className="text-center check-form-input input-username"
                  />
                </div>
              </div>

              <div className="row mt-5 d-flex row-buttons justify-content-center align-items-center">
                <div className="d-flex justify-content-around confirm-div">
                  <Button
                    variant="primary"
                    className="text-white"
                    type="submit"
                  >
                    Confirmar
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
