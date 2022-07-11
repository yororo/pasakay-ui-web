import React from "react";
import { Alert } from "react-bootstrap";

const AlertInfoMessageSimple = ({ message }) => {
  return <Alert variant="info">❕ {message}</Alert>;
};

export default AlertInfoMessageSimple;
