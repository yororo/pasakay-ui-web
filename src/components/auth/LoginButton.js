import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Button } from "react-bootstrap";
import LogoutButton from "./LogoutButton";

const LoginButton = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const displayLoginButton = () => {
    return (
      <Button variant="light" type="button" onClick={() => loginWithRedirect()}>
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
