import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import reportWebVitals from "./reportWebVitals";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CarpoolSearchPage from "./components/carpool/CarpoolSearchPage";
import { Container, Nav, Navbar } from "react-bootstrap";
import BookingPage from "./components/booking/BookingPage";

ReactDOM.render(
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
            👩‍🦰 <a href="/login">Sheena</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </div>

    <Container className="mt-4">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CarpoolSearchPage />} />
          <Route path="carpools" element={<CarpoolSearchPage />} />
          <Route path="bookings" element={<BookingPage />} />
        </Routes>
      </BrowserRouter>
    </Container>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
