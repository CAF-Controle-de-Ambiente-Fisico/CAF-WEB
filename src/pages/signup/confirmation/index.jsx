import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Image, Button, Alert } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import bgContet from "../../../assets/images/arte-wave.svg";
import logo from "../../../assets/images/handonkey.svg";

const Confirmation = () => {
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
          <Alert variant="success" className="w-50 p-4">
            <Alert.Heading className="text-center">
              Bem vindo <br />{" "}
              <strong className="text-uppercase"> {"fulano de tal"}</strong>.
            </Alert.Heading>
            <hr />
            <p className="text-center">Faça login para acessar sua conta!</p>
            <div className="d-flex justify-content-center">
              <Link href="/">
                <a className="btn btn-success mt-3 text-center">Acessar CAF</a>
              </Link>
            </div>
          </Alert>
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