import React from "react";
import { useNavigate } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = process.env.REACT_APP_AUTH_CLIENT_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH_CLIENT_ID;

  const navigate = useNavigate();
  const onRedirectCallback = (appState) => {
    console.log("appState: ", appState);
    // TODO: for now always navigate to home page but should find a way to redirect from last visited page
    // console.log((appState && appState.returnTo) || "/");
    // navigate((appState && appState.returnTo) || "/");
    navigate("/");
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.href}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
