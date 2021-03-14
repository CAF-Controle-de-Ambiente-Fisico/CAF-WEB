import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Button, Form, Image } from "react-bootstrap";
import Dropzone from "react-dropzone";

import Input from "../../../components/Form/Input";

import translate from "../../../assets/scripts/util/translate";

import bgContet from "../../../assets/images/arte-wave.svg";
import logo from "../../../assets/images/handonkey.svg";
import avatar from "../../../assets/images/avatar.svg";

const Singup = () => {
  const [image, setImage] = useState();

  const { register, handleSubmit, watch, errors, setValue } = useForm();
  const onSubmit = (data) => console.log(data);
  const router = useRouter();

  const user = router.pathname.split("/")[2];

  useEffect(() => {
    register({ name: "avatar" });
    setValue("avatar", image);
    return () => {
      URL.revokeObjectURL(image?.preview);
    };
  }, [image]);

  return (
    <div className="signup d-flex">
      <div
        className="signup-bg"
        style={{ backgroundImage: `url(${bgContet})` }}
      >
        <Image src={logo} className="ml-5" />
      </div>
      <div className="signup-form w-50 h-100 d-flex flex-column align-items-center justify-content-center">
        <div className="signup-form-title d-flex flex-wrap flex-column align-items-center w-100">
          <span className="text-primary text-capitalize">
            Cadastro de {translate(user)}
          </span>
        </div>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="w-100 d-flex flex-column align-items-center flex-wrap"
        >
          <Input
            name="username"
            placeholder="Nome de usuário"
            contextClassName="position-relative mt-4 d-flex justify-content-center"
            labelClassName="position-absolute signup-form-label"
            className="signup-form-input input-username"
          />

          <Input
            name="cpf"
            type="text"
            placeholder="CPF"
            contextClassName="position-relative mt-4 d-flex justify-content-center"
            labelClassName="position-absolute signup-form-label"
            className="signup-form-input input-password"
          />

          <Input
            name="email"
            type="email"
            placeholder="Digite seu melhor email"
            contextClassName="position-relative mt-4 d-flex justify-content-center"
            labelClassName="position-absolute signup-form-label"
            className="signup-form-input input-username"
          />

          <Input
            name="password"
            type="password"
            placeholder="Senha"
            contextClassName="position-relative mt-4 d-flex justify-content-center"
            labelClassName="position-absolute signup-form-label"
            className="signup-form-input input-password"
          />

          <Input
            name="password_confirmation"
            type="password_confirmation"
            placeholder="Digite sua senha novamente"
            contextClassName="position-relative mt-4 d-flex justify-content-center"
            labelClassName="position-absolute signup-form-label"
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
                <input {...getInputProps({ multiple: false })} name="avatar" />
                <div
                  className="d-flex form-dropzone-avatar justify-content-center align-items-center h-100 w-100"
                  style={{
                    backgroundImage: `url(${image ? image.preview : avatar})`,
                  }}
                ></div>
              </div>
            )}
          </Dropzone>

          <Button
            variant="warning"
            className="signup-form-button mt-3 badge badge-pill text-white"
            type="submit"
          >
            Inscrever-se
          </Button>

          <Link href="/">
            <a className="mt-3 text-center text-primary signup-form-link">
              Voltar
            </a>
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Singup;
