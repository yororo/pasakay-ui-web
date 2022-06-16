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

function App() {
  return (
    <>
      <div>
        <Navbar bg="dark" variant="dark" className="px-3">
          <LinkContainer to="/">
            <Navbar.Brand>🚗 Pasakay</Navbar.Brand>
          </LinkContainer>
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

          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <NavUserProfile />
            </Navbar.Text>
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
        </Routes>
      </Container>
    </>
  );
}

export default App;
