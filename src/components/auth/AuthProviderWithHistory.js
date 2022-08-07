import React from "react";
import { useNavigate } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = process.env.REACT_APP_AUTH_CLIENT_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH_CLIENT_ID;

  const navigate = useNavigate();
  const onRedirectCallback = (appState) => {
    console.log("appState: ", appState);
    let returnTo = undefined;
    // TODO: move "/apps/carpool" to an environment variable instead
    if (appState && appState.returnTo) {
      returnTo = appState.returnTo.replace("/apps/carpool", "");
    }

    navigate(returnTo || "/");
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={`${window.location.origin}/apps/carpool/`}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
