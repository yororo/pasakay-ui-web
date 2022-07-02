import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, NavDropdown, Spinner } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const NavUserProfile = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } =
    useAuth0();

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  const displayLoggedInUser = () => {
    return (
      <NavDropdown
        id="nav-dropdown-dark-example"
        title={user.name}
        menuVariant="dark"
      >
        <NavDropdown.Item>
          <LinkContainer to="/profile">
            <div>Profile</div>
          </LinkContainer>
        </NavDropdown.Item>
        <NavDropdown.Item>Settings</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Logout
        </NavDropdown.Item>
      </NavDropdown>
    );
  };

  const displayLoggedOutUser = () => {
    return (
      <Button variant="light" type="button" onClick={() => loginWithRedirect()}>
        Login
      </Button>
    );
  };

  return isAuthenticated ? displayLoggedInUser() : displayLoggedOutUser();
};

export default NavUserProfile;
