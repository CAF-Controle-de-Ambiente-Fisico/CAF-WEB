import React from "react";
import { Image, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

import Input from "../components/Form/Input";

import bgContet from "../assets/images/arte-wave.svg";
import logo from "../assets/images/handonkey.svg";

const Login = ({ nextStep, firstStep, kindUser = "" }) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="login d-flex">
      <div
        className="login-bg"
        style={{ backgroundImage: `url(${bgContet})` }}
      ></div>
      <div className="login-form w-50 h-100">
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="w-100 h-100 d-flex flex-column align-items-center flex-wrap"
        >
          <Input
            className="mt-3 text-center login-form-input input-username"
            name="username"
            placeholder="Usuário ou email"
            insideLabel={() => <i class="fas fa-user"></i>}
          />
          <Input
            className="mt-3 text-center login-form-input input-password"
            name="password"
            type="password"
            placeholder="Senha"
          />
          <Button className="mt-3 w-50 badge badge-pill" type="submit">
            Login
          </Button>

          <Button
            variant="danger"
            onClick={() => firstStep()}
            className="mt-3 w-50 badge badge-pill"
          >
            Voltar
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
