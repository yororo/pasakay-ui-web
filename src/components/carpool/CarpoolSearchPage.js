import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import CarpoolSearchList from "./CarpoolSearchList";
import { useSelector, useDispatch } from "react-redux";
import { loadCarpools } from "../../redux/slice/carpool/carpoolSlice";
import {
  bookCarpool,
  getCarpoolsAvailableForBooking,
} from "../../apiService/coreApi";
import { useAuth0 } from "@auth0/auth0-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationDialogSimple from "../common/ConfirmationDialogSimple";

const CarpoolSearchPage = () => {
  const carpools = useSelector((state) => state.carpool);
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [carpoolToBook, setCarpoolToBook] = useState({});

  const handleCloseModal = () => {
    setShowModal(false);
    setCarpoolToBook({});
  };
  const handleShowModal = (carpool) => {
    setShowModal(true);
    setCarpoolToBook(carpool);
  };

  const onConfirmBookClick = async () => {
    try {
      console.log(`Booking carpool ${carpoolToBook?.carpoolName}`);
      await bookCarpool(carpoolToBook, {
        userId: user.sub,
        name: user.name,
      });
      // TODO: double check if useCallback has unintended implications if called outside useEffect();
      loadData();
      toast.success(`You're now booked at ${carpoolToBook?.carpoolName} 🔥`);
    } catch (err) {
      toast.error(`Booking failed for ${carpoolToBook?.carpoolName} 😧`);
      console.log(
        `Booking carpool ${carpoolToBook?.carpoolName} failed! ${err}`
      );
    } finally {
      setShowModal(false);
    }
  };

  const onBookClick = async (carpoolToBook) => {
    handleShowModal(carpoolToBook);
  };

  const loadData = useCallback(async () => {
    const carpools = await getCarpoolsAvailableForBooking(user.sub);
    dispatch(loadCarpools(carpools));
  }, [dispatch, user.sub]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div>
      <div>
        <h2>Search Carpools</h2>
      </div>

      <Container>
        <Row>
          <Col>
            <FloatingLabel
              controlId="floatingInput"
              label="Filter by date and time"
              className="mb-3"
            >
              <Form.Control type="text" placeholder="2022-01-01" />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel
              controlId="floatingInput"
              label="Filter by pick-up location"
              className="mb-3"
            >
              <Form.Control type="text" placeholder="SM Megamall, Ortigas" />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel
              controlId="floatingInput"
              label="Filter by drop-off location"
              className="mb-3"
            >
              <Form.Control type="text" placeholder="NEX Tower, Makati" />
            </FloatingLabel>
          </Col>
        </Row>
      </Container>

      <div className="mt-4">
        <CarpoolSearchList carpools={carpools.all} onBookClick={onBookClick} />
        <ConfirmationDialogSimple
          showModal={showModal}
          onCancelClick={handleCloseModal}
          onConfirmClick={onConfirmBookClick}
          title="Confirm Booking"
          body="Are you sure you want to book this carpool?"
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default CarpoolSearchPage;
