import moment from "moment";
import { Button, Card, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { getBookings } from "../../apiService/coreApi";
import usersMock from "../../data/userMock";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState({});

  const handleCloseModal = () => {
    setShowModal(false);
    setBookingToDelete({});
  };
  const handleShowModal = (booking) => {
    setShowModal(true);
    setBookingToDelete(booking);
  };

  const loadBookings = async () => {
    const bookings = await getBookings(usersMock[0].userId);
    setBookings(bookings);
  };

  const onBookClick = async () => {
    try {
      console.log(`Deleting booking ${bookingToDelete?.carpoolName}`);
    } catch (err) {
      console.log(
        `Deleting booking ${bookingToDelete?.carpoolName} failed! ${err}`
      );
    } finally {
      setShowModal(false);
    }
  };
  useEffect(() => {
    loadBookings();
  }, []);

  const displayModal = () => {
    return (
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Are you sure you want to delete this booking?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onBookClick}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const displayBookings = () => {
    return bookings.map((booking) => {
      return (
        <div className="my-3" key={booking.carpoolId}>
          <Card>
            <Card.Header>{booking.carpoolName}</Card.Header>
            <Card.Body>
              <Card.Title>
                {booking.pickUpLocation} to {booking.dropOffLocation} |{" "}
                {moment(booking.pickUpDateTime).format("LLL")}
              </Card.Title>
              <Card.Text>
                <span>💸{booking.fare} PHP</span>
                <br />
                <span>👌{booking.status}</span>
                <br />
                <span>🧑{booking.driverName}</span>
                <br />
                <span>🔟{booking.vehicleCapacity}</span>
                <br />
                <span>🚙{booking.vehicleModel}</span>
                <br />
                <span>
                  👨‍👩‍👦‍👦
                  {booking.registeredPassengers.map(
                    (passenger, i) =>
                      `${passenger.passengerName}${
                        i === booking.registeredPassengers.length - 1 ? "" : ","
                      } `
                  )}
                </span>
              </Card.Text>
              <Button
                variant="primary"
                type="button"
                onClick={() => handleShowModal(booking)}
              >
                Cancel
              </Button>
            </Card.Body>
          </Card>
        </div>
      );
    });
  };

  return (
    <div>
      {displayBookings()}
      {displayModal()}
    </div>
  );
};

export default BookingList;
