import React, { useState, useEffect } from "react";
import { Image, Button } from "react-bootstrap";
import { getSession, signOut } from "next-auth/client";
import ReactLoading from "react-loading";
import copy from "copy-to-clipboard";
import toast, { Toaster } from "react-hot-toast";

import logoHeader from "./../../assets/images/handonkey.svg";
import userIcon from "./../../assets/images/icons/user-icon.svg";
import copyIcon from "./../../assets/images/icons/copy.svg";
import { api } from "./../../../service/api";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  const notify = () => toast.success("Código Copiado");

  const getNewCode = () => {
    console.log(user.id);
    api
      .get(`v1/code/${user.id}`)
      .then((res) => {
        setUser({ ...user, code: res.data.access.code });
        toast.success("Código Ativo Atualizado");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(async () => {
    const session = await getSession();
    console.log(session.user);
    setUser({
      id: session.user.user_id,
      username: session.user.username,
      email: session.user.email,
      code: session.user.code,
      photo: session.user.photo,
    });
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
      ) : (
        <div className="dashboard d-flex justify-content-center flex-wrap vh-100 bg-gray-light">
          <Toaster />
          <div className="dashboard-header w-100 d-flex justify-content-center align-items-center bg-info shadow rounded">
            <div className="flex-grow-1">
              <Image src={logoHeader} />
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <strong className="mx-4">{user.username}</strong>
            </div>
            <div className="d-flex justify-content-end flex-grow-1">
              <Button
                className="mr-4"
                variant="danger"
                onClick={() => {
                  signOut({
                    callbackUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
                  });
                }}
              >
                Sair
              </Button>
            </div>
          </div>

          <div className="dashboard-user w-100 d-flex justify-content-center align-items-center">
            <div
              className="dashboard-user-avatar rounded-circle shadow-lg"
              style={{
                backgroundImage: `url(${user.photo ? user.photo : userIcon})`,
              }}
            ></div>
          </div>

          <div className="flex-grow-1">
            <div className="dashboard-body m-auto shadow-lg card p-3 d-flex flex-column justify-content-center align-items-center">
              <p className="w-100 text-center p-3 bg-primary color-white rounded">
                Código ativo
              </p>
              <div
                className="code-value border-bottom my-4 p-2"
                onClick={() => {
                  copy(user.code);
                  notify();
                }}
              >
                <strong>{user.code}</strong>
                <span className="color-dark ml-3">
                  <Image height="25" src={copyIcon} alt="" />
                </span>
              </div>
              <Button onClick={() => getNewCode()}>Verificar código</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
