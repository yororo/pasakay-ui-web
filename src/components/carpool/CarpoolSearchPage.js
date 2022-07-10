import React, { forwardRef, useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CarpoolSearchPage = () => {
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const carpools = useSelector((state) =>
    selectCarpoolsForBooking(state, user.sub)
  );
  const { loadingStatus, error } = useSelector((state) => state.carpool);
  const [showModal, setShowModal] = useState(false);
  const [carpoolToBook, setCarpoolToBook] = useState({});
  const [pickUpDate, setPickUpDate] = useState(new Date());
  // const [pickUpLocation, setPickUpLocation] = useState("");
  // const [dropOffLocation, setDropOffLocation] = useState("");

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
    dispatch(
      loadCarpoolsForBooking({ userId: user.sub, pickUpDate: pickUpDate })
    );
  }, [dispatch, user, pickUpDate]);

  const DateInput = forwardRef(({ value, onClick }, ref) => (
    <Form.Control
      id="dateFilter"
      type="text"
      onClick={onClick}
      onChange={() => {}} // TODO: just to suppress react warning that form field has no onChange even though it's not readonly
      ref={ref}
      value={value}
    />
  ));

  const displayFilters = () => {
    return (
      <Container>
        <Row>
          <Col xs={12} md={4} className="mt-2">
            <Form.Label htmlFor="dateFilter">📅 Date</Form.Label>
            <DatePicker
              selected={pickUpDate}
              onChange={(date) => setPickUpDate(date)}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              customInput={<DateInput />}
            />
          </Col>
          <Col xs={12} md={4} className="mt-2">
            <Form.Label htmlFor="pickUpFilter">📍 From</Form.Label>
            <Form.Control type="text" placeholder="Ex: 'SM Megamall Ortigas'" />
          </Col>
          <Col xs={12} md={4} className="mt-2">
            <Form.Label htmlFor="dropOffFilter">📍 To</Form.Label>
            <Form.Control type="text" placeholder="Ex: 'Glorietta Makati'" />
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
        <>
          {displayFilters()}
          <br />
          <AlertInfoMessageSimple message="No carpools found. Have you tried using a different filter? 😊 (TEST ONLY: try Nov. 16, 2022 6:00 PM)" />
        </>
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
