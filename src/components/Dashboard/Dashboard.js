import React, { useState, useEffect } from "react";
import "./Dashboard.css";

import Container from "react-bootstrap/Container";

const Dashboard = () => {
  const [state, setState] = useState("");

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Container>
      <h1>Verifique aqui suas queixas recentes</h1>
    </Container>
  );
};

export default Dashboard;
