import React, { useEffect, useState } from "react";
import { Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import CarpoolSearchList from "./CarpoolSearchList";
import { useSelector, useDispatch } from "react-redux";
import {
  loadCarpoolsForBooking,
  bookCarpool,
  selectCarpoolsForBooking,
} from "../../redux/slice/carpool/carpoolSlice";
import { useAuth0 } from "@auth0/auth0-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationDialogSimple from "../common/ConfirmationDialogSimple";
import {
  LOADING_STATUS_IDLE,
  LOADING_STATUS_PENDING,
} from "../../redux/model/loadingStatus";
import AlertErrorMessageSimple from "../common/AlertErrorMessageSimple";
import SpinnerLoadingSimple from "../common/SpinnerLoadingSimple";
import AlertInfoMessageSimple from "../common/AlertInfoMessageSimple";

const CarpoolSearchPage = () => {
  const { user } = useAuth0();
  const carpools = useSelector((state) =>
    selectCarpoolsForBooking(state, user.sub)
  );

  const { loadingStatus, error } = useSelector((state) => state.carpool);
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
      dispatch(
        bookCarpool({
          carpool: carpoolToBook,
          user: {
            name: user.name,
            userId: user.sub,
          },
        })
      );
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

  useEffect(() => {
    dispatch(loadCarpoolsForBooking(user.sub));
  }, [dispatch, user]);

  const displayFilters = () => {
    return (
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
    );
  };

  const displayCarpoolList = () => {
    if (loadingStatus === LOADING_STATUS_PENDING) {
      return (
        <div className="text-center">
          <SpinnerLoadingSimple />
        </div>
      );
    } else if (loadingStatus === LOADING_STATUS_IDLE && error !== null) {
      return <AlertErrorMessageSimple />;
    } else if (loadingStatus === LOADING_STATUS_IDLE && carpools.length === 0) {
      return (
        <AlertInfoMessageSimple message="No carpools found. Have you tried using a different filter? 😊" />
      );
    }

    return (
      <>
        {displayFilters()}
        <div className="mt-4">
          <CarpoolSearchList carpools={carpools} onBookClick={onBookClick} />
        </div>
      </>
    );
  };

  return (
    <div>
      <div>
        <h2>Search Carpools</h2>
      </div>
      {displayCarpoolList()}
      <ConfirmationDialogSimple
        showModal={showModal}
        onCancelClick={handleCloseModal}
        onConfirmClick={onConfirmBookClick}
        title="Confirm Booking"
        body="Are you sure you want to book this carpool?"
      />
      <ToastContainer />
    </div>
  );
};

export default CarpoolSearchPage;
