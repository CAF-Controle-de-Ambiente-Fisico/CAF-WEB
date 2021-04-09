import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button, Form, Image } from "react-bootstrap";
import { useForm, FormProvider } from "react-hook-form";
import { getSession, getCsrfToken, signIn } from "next-auth/client";
import ReCAPTCHA from "react-google-recaptcha";

import Input from "../components/Form/Input";

import translate from "../assets/scripts/util/translate";
import bgContet from "../assets/images/arte-wave.svg";
import logo from "../assets/images/handonkey.svg";
import user from "../assets/images/icons/user.svg";
import password from "../assets/images/icons/password.svg";
import { nextAuth } from "../../service/api";

const Login = ({ firstStep, kindUser = "" }) => {
  const methods = useForm();
  const router = useRouter();
  const [reCaptcha, setReCaptcha] = useState(false);

  const handleRePCAPTCHA = () => setReCaptcha(true);

  const onSubmit = async (data) => {
    const csrfToken = await getCsrfToken();

    if (reCaptcha) {
      setLoading(true);
      nextAuth
        .post("api/auth/callback/domain-signin", {
          ...data,
          csrfToken,
          callbackUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/profile`,
        })
        .then((response) => {
          if (response.request.responseURL.includes("Error")) {
            MySwal.fire({
              icon: "error",
              title: "Oops...",
              text: "Email ou senha incorreto(s)",
            });
            setLoading(false);
          } else {
            MySwal.fire({
              icon: "success",
              title: "Tudo certo!",
              text: "Login realizado com sucesso",
            }).then(() => {
              router.push(`${process.env.NEXT_PUBLIC_SITE_URL}/profile`);
            });
            setLoading(false);
          }
        })
        .catch((error) => {
          MySwal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo deu errado",
          });
          setLoading(false);
        });
    }
  };

  return (
    <div className="login d-flex ">
      <div
        className="login-bg"
        style={{ backgroundImage: `url(${bgContet})` }}
      ></div>
      <div className="login-form h-100 d-flex flex-column align-items-center justify-content-center">
        <div className="login-form-logo d-flex flex-wrap flex-column align-items-center w-100">
          <Image src={logo} />
          <p>
            Faça seu login como{" "}
            <strong className="text-uppercase">{translate(kindUser)}</strong>
          </p>
        </div>
        <FormProvider {...methods}>
          <Form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="w-100 d-flex flex-column align-items-center flex-wrap"
          >
            <Input
              name="email"
              type="email"
              placeholder="Usuário ou email"
              label={<Image className="mb-1" src={user} />}
              contextClassName="position-relative d-flex justify-content-center"
              labelClassName="position-absolute login-form-label"
              className="text-center login-form-input input-username"
            />

            <Input
              name="password"
              type="password"
              placeholder="Senha"
              label={<Image className="mb-1" src={password} />}
              contextClassName="position-relative d-flex justify-content-center"
              labelClassName="position-absolute login-form-label"
              className="text-center login-form-input input-password"
            />

            <div className="d-flex justify-content-center mb-3">
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}
                onChange={handleRePCAPTCHA}
              />
            </div>

            <Button
              className="login-form-button mt-3 badge badge-pill"
              type="submit"
            >
              Login
            </Button>

            <Button
              variant="warning"
              onClick={() => firstStep()}
              className="login-form-button mt-3 badge badge-pill"
            >
              Voltar
            </Button>

            <Link href={`/signup/${kindUser}`}>
              <a className="mt-3 text-center text-primary login-form-link">
                Não possui conta? <br /> Clique aqui para cadastre-se
              </a>
            </Link>
          </Form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Login;
