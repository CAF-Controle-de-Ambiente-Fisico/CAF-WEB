import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm, FormProvider } from "react-hook-form";
import { Button, Form, Image, Alert } from "react-bootstrap";
import Dropzone from "react-dropzone";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReactLoading from "react-loading";

import translate from "../../../assets/scripts/util/translate";
import Input from "../../../components/Form/Input";
import bgContet from "../../../assets/images/arte-wave.svg";
import logo from "../../../assets/images/handonkey.svg";
import avatar from "../../../assets/images/avatar.svg";
import api from "../../../../service/api";

const Singup = () => {
  const [image, setImage] = useState();
  const [sendEmail, setSendEmail] = useState();
  const [loading, setLoading] = useState(false);
  const MySwal = withReactContent(Swal);
  const router = useRouter();

  const user = router.pathname.split("/")[2];

  const methods = useForm();
  const onSubmit = (data) => {
    setLoading(true);
    api
      .post(`v1/${user}`, data)
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
        }).then(() => {
          router.reload();
          setLoading(false);
        });
      });
  };

  useEffect(() => {
    methods.register({ name: "photo" });
    methods.setValue("photo", image);
    return () => {
      URL.revokeObjectURL(image?.preview);
    };
  }, [image]);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <ReactLoading
            type="spinningBubbles"
            color="#1d3557"
            height={200}
            width={200}
          />
        </div>
      ) : sendEmail ? (
        <div className="confirmation d-flex justify-content-center align-items-center bg-info vh-100">
          <div className="confirmation-content d-flex flex-wrap flex-column p-4">
            <div className="confirmation-content-logo w-100 d-flex justify-content-center flex-wrap align-items-center">
              <Image src={logo} className="content-logo-image w-100" />
            </div>
            <div className="confirmation-content-options w-100 d-flex justify-content-around align-items-center flex-grow-1 flex-wrap">
              <Alert variant="info">
                <Alert.Heading className="text-center">
                  Estamos quase lá!
                </Alert.Heading>
                <p className="text-center">Enviamos um email para você.</p>
                <p className="text-center">
                  Verifique sua caixa de email com o link de confirmação!
                </p>
                <Alert
                  className="d-flex justify-content-center"
                  variant="primary"
                >
                  <strong className="text-primary">{sendEmail}</strong>
                </Alert>
              </Alert>
            </div>
          </div>
          <div
            className="confirmation-bg"
            style={{ backgroundImage: `url(${bgContet})` }}
          ></div>
        </div>
      ) : (
        <div className="signup d-flex">
          <div
            className="signup-bg"
            style={{ backgroundImage: `url(${bgContet})` }}
          >
            <Image src={logo} className="ml-5" />
          </div>
          <div className="signup-form h-100 d-flex flex-column align-items-center justify-content-center">
            <div className="signup-form-title d-flex flex-wrap flex-column justify-content-center align-items-center w-100">
              <div
                className="signup-form-logo"
                style={{ backgroundImage: `url(${logo})` }}
              ></div>
              <span className="text-primary text-capitalize">
                Cadastro de {translate(user)}
              </span>
              <FormProvider {...methods}>
                <Form
                  onSubmit={methods.handleSubmit(onSubmit)}
                  className="w-100 d-flex flex-column align-items-center flex-wrap"
                >
                  <Input
                    required
                    name="username"
                    placeholder="Nome de usuário"
                    contextClassName="position-relative mt-4 d-flex justify-content-center"
                    className="signup-form-input"
                  />

                  <Input
                    required
                    name="registration"
                    type="text"
                    placeholder="Matrícula"
                    contextClassName="position-relative mt-4 d-flex justify-content-center"
                    className="signup-form-input"
                  />

                  <Input
                    name="email"
                    type="email"
                    required
                    placeholder="Digite seu melhor email"
                    contextClassName="position-relative mt-4 d-flex justify-content-center"
                    className="signup-form-input"
                  />

                  <Dropzone
                    onDrop={(acceptedFiles) =>
                      setImage(
                        Object.assign(acceptedFiles[0], {
                          preview: URL.createObjectURL(acceptedFiles[0]),
                        })
                      )
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div
                        {...getRootProps()}
                        className={`mt-4 signup-form-dropzone ${
                          image && "rounded-circle border-0"
                        }`}
                      >
                        <input
                          {...getInputProps({ multiple: false })}
                          name="photo"
                        />
                        <div
                          className="d-flex form-dropzone-avatar justify-content-center align-items-center h-100 w-100"
                          style={{
                            backgroundImage: `url(${
                              image ? image.preview : avatar
                            })`,
                          }}
                        ></div>
                      </div>
                    )}
                  </Dropzone>

                  <Button
                    variant="warning"
                    className="signup-form-button mt-4 badge badge-pill text-white"
                    type="submit"
                  >
                    Inscrever-se
                  </Button>

                  <Link href="/">
                    <a className="mt-4 text-center text-primary signup-form-link">
                      Voltar
                    </a>
                  </Link>
                </Form>
              </FormProvider>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Singup;
