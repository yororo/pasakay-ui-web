import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import BookingPage from "./components/booking/BookingPage";
import CarpoolSearchPage from "./components/carpool/CarpoolSearchPage";

function App() {
  return (
    <Container className="mt-4">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<ProtectedRoute component={CarpoolSearchPage} />}
          />
          <Route
            path="/carpools"
            element={<ProtectedRoute component={CarpoolSearchPage} />}
          />
          <Route
            path="/bookings"
            element={<ProtectedRoute component={BookingPage} />}
          />
        </Routes>
      </BrowserRouter>
    </Container>
    // <>
    //   <Container className="mt-4">
    //     <CarpoolSearchPage />
    //   </Container>
    // </>
  );
}

export default App;
