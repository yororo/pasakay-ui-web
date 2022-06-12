import React from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";

const ProtectedRoute = ({ component, ...args }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <div>Loading...</div>,
  });

  return <Component {...args} />;
};

//     return <Component />

//   <Route
//     component={withAuthenticationRequired(component, {
//       onRedirecting: () => <div>Loading...</div>,
//     })}
//     {...args}
//   />

export default ProtectedRoute;
