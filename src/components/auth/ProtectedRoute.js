import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Spinner } from "react-bootstrap";

const ProtectedRoute = ({ component, ...args }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    ),
  });

  return <Component {...args} />;
};

export default ProtectedRoute;
