import moment from "moment";
import { Button, Card } from "react-bootstrap";
import React, { useState } from "react";
import ConfirmationDialogSimple from "../common/ConfirmationDialogSimple";
import "react-toastify/dist/ReactToastify.css";

const BookingList = ({ carpools, onCancelBookingClick }) => {
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

  const displayBookings = () => {
    return carpools.map((booking) => {
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
                variant="danger"
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

      <ConfirmationDialogSimple
        showModal={showModal}
        onCancelClick={handleCloseModal}
        onConfirmClick={() => {
          onCancelBookingClick(bookingToDelete);
          handleCloseModal();
        }}
        title="Confirm Cancellation"
        body="Are you sure you want to cancel this booking?"
      />
    </div>
  );
};

export default BookingList;
