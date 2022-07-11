import React from "react";
import { Alert } from "react-bootstrap";

const AlertWarningMessageSimple = ({ message }) => {
  return <Alert variant="warning">⚠️ {message}</Alert>;
};

export default AlertWarningMessageSimple;
