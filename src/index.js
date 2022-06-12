import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import reportWebVitals from "./reportWebVitals";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CarpoolSearchPage from "./components/carpool/CarpoolSearchPage";
import { Container, Nav, Navbar } from "react-bootstrap";
import BookingPage from "./components/booking/BookingPage";
import { Auth0Provider } from "@auth0/auth0-react";
import LoginButton from "./components/auth/LoginButton";
import Profile from "./components/auth/Profile";
import App from "./App";

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH_CLIENT_DOMAIN}
    clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
    redirectUri={window.location.origin}
  >
    <React.StrictMode>
      <div>
        <Navbar bg="dark" variant="dark" className="px-3">
          <Navbar.Brand href="/">🚗 Pasakay</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/carpools">Carpools</Nav.Link>
            <Nav.Link href="/bookings">My Bookings</Nav.Link>
          </Nav>

          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <LoginButton />
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <App />
    </React.StrictMode>
  </Auth0Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
