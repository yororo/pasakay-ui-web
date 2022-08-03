import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Button, Spinner } from "react-bootstrap";
import LogoutButton from "./LogoutButton";

const LoginButton = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  const displayLoginButton = () => {
    return (
      <Button
        variant="light"
        type="button"
        onClick={() =>
          loginWithRedirect({
            appState: { targetUrl: window.location.pathname },
          })
        }
      >
        Login
      </Button>
    );
  };

  const displayUserLogout = () => {
    return (
      <div>
        Hi, {user.name} <LogoutButton />
      </div>
    );
  };

  if (isAuthenticated) {
    return displayUserLogout();
  } else {
    return displayLoginButton();
  }
};

export default LoginButton;
