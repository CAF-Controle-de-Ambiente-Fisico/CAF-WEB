import React, { useRef, useState } from "react";
import StepWizard from "react-step-wizard";

import Home from "../components/Home";
import Login from "../components/Login";

const App = () => {
  const stepWizard = useRef();
  const [kindUser, setKindUser] = useState("");

  return (
    <StepWizard ref={stepWizard} className="overflow-hidden">
      <Home setKindUser={setKindUser} />
      <Login kindUser={kindUser} />
    </StepWizard>
  );
};

export default App;
