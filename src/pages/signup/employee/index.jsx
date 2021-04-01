import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm, FormProvider } from "react-hook-form";
import { Button, Form, Image, Alert } from "react-bootstrap";
import Dropzone from "react-dropzone";

import Input from "../../../components/Form/Input";

import translate from "../../../assets/scripts/util/translate";

import bgContet from "../../../assets/images/arte-wave.svg";
import logo from "../../../assets/images/handonkey.svg";
import avatar from "../../../assets/images/avatar.svg";

const Singup = () => {
  const [image, setImage] = useState();
  const [sendEmail, setSendEmail] = useState();

  const methods = useForm();
  const onSubmit = (data) => {
    setSendEmail(data.email);
    console.log(data);
  };
  const router = useRouter();

  const user = router.pathname.split("/")[2];

  useEffect(() => {
    methods.register({ name: "avatar" });
    methods.setValue("avatar", image);
    return () => {
      URL.revokeObjectURL(image?.preview);
    };
  }, [image]);

  return (
    <>
      {sendEmail ? (
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
            </div>
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
                  className="signup-form-input input-username"
                />

                <Input
                  required
                  name="register"
                  type="text"
                  placeholder="Matrícula"
                  contextClassName="position-relative mt-4 d-flex justify-content-center"
                  className="signup-form-input input-password"
                />

                <Input
                  name="email"
                  type="email"
                  required
                  placeholder="Digite seu melhor email"
                  contextClassName="position-relative mt-4 d-flex justify-content-center"
                  className="signup-form-input input-username"
                />

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
                        name="avatar"
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
      )}
    </>
  );
};

export default Singup;
