import React from "react";
import { Alert } from "react-bootstrap";

const AlertErrorMessageSimple = ({ errorMessage }) => {
  return (
    <Alert variant="danger">
      🛑{" "}
      {!errorMessage
        ? "Something wrong happened, please try again 😔"
        : errorMessage}
    </Alert>
  );
};

export default AlertErrorMessageSimple;
