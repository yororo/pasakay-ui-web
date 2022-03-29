import { Container, Nav, Navbar } from "react-bootstrap";
import CarpoolSearchPage from "./components/carpool/CarpoolSearchPage";

function App() {
  return (
    <>
      <div>
        <Navbar bg="dark" variant="dark" className="px-3">
          <Navbar.Brand href="/">🚗 Pasakay</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/bookings">Bookings</Nav.Link>
            <Nav.Link href="/carpools">Carpools</Nav.Link>
          </Nav>

          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              👩‍🦰 <a href="/login">Sheena</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <Container className="mt-4">
        <CarpoolSearchPage />
      </Container>
    </>
  );
}

export default App;
