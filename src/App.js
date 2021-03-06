import { Container, Nav, Navbar } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import BookingPage from "./components/booking/BookingPage";
import CarpoolSearchPage from "./components/carpool/CarpoolSearchPage";
import MyCarpools from "./components/carpool/MyCarpoolsPage";
import Home from "./components/home/Home";
import { LinkContainer } from "react-router-bootstrap";
import Profile from "./components/user/Profile";
import NavUserProfile from "./components/nav/NavUserProfile";
import About from "./components/home/About";

function App() {
  return (
    <>
      <div>
        <Navbar bg="dark" variant="dark" className="px-3" expand="lg">
          <LinkContainer to="/">
            <Navbar.Brand>🚗 Pasakay</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/carpools">
                <Nav.Link>Search</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/mycarpools">
                <Nav.Link>My Carpools</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/bookings">
                <Nav.Link>My Bookings</Nav.Link>
              </LinkContainer>
            </Nav>

            <Nav className="">
              <NavUserProfile />
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <Container className="mt-4">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route
            path="/carpools"
            element={<ProtectedRoute component={CarpoolSearchPage} />}
          />
          <Route
            path="/mycarpools"
            element={<ProtectedRoute component={MyCarpools} />}
          />
          <Route
            path="/bookings"
            element={<ProtectedRoute component={BookingPage} />}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute component={Profile} />}
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
