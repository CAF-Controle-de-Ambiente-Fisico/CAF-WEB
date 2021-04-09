import React, { useState, useEffect } from "react";
import { Image, Button } from "react-bootstrap";
import { getSession, signOut } from "next-auth/client";
import ReactLoading from "react-loading";
import copy from "copy-to-clipboard";
import toast, { Toaster } from "react-hot-toast";

import logoHeader from "./../../assets/images/handonkey.svg";
import userIcon from "./../../assets/images/icons/user-icon.svg";
import copyIcon from "./../../assets/images/icons/copy.svg";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  const notify = () => toast.success("Código Copiado");

  useEffect(async () => {
    const session = await getSession();
    console.log(session);
    setUser(session.user);
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
        <div className="dashboard-box d-flex justify-content-center align-items-center">
          <div className="dashboard-header d-flex justify-content-center align-items-center">
            <div className="dashboard-header-logo ml-2">
              <Image src={logoHeader} height="50px" />
            </div>

            <div className="dashboard-header-app-name">CAF</div>

            <div className="dashboard-header-user-info mr-2 d-flex align-items-center">
              <Button
                onClick={() => {
                  signOut({
                    callbackUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
                  });
                }}
              >
                Sair
              </Button>
              <div>{user.username}</div>
              <div className="divider-y ml-2 mr-2"></div>
              <div className="h-100 d-flex justify-content-center align-items-center">
                <Image src={userIcon} height="35px" />
              </div>
            </div>
          </div>

          <div className="dashboard-body ml-3 mr-3">
            <div className="dashboard-body-current-code d-flex flex-column justify-content-center align-items-center">
              <div className="text-code-title">Código ativo</div>
              <div className="divider-x mt-3 mb-3"></div>
              <div className="code-value ml-2 mr-2 d-flex justify-content-center align-items-center">
                <div className="code-value-text">{user.code}</div>
              </div>
              <div className="mt-2">
                <Button
                  onClick={() => {
                    copy(user.code);
                    notify();
                  }}
                  className="copy-button d-flex"
                >
                  <Image height="25" src={copyIcon} alt="" />
                  <div className="copy-button-text ml-2">Copiar código</div>
                  <Toaster />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
