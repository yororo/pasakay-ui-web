import moment from "moment";
import { Button, Card } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { deleteBooking, getBookings } from "../../apiService/coreApi";
import ConfirmationDialogSimple from "../common/ConfirmationDialogSimple";
import { useAuth0 } from "@auth0/auth0-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookingList = () => {
  const { user } = useAuth0();
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

  const onDeleteBookingClick = async () => {
    try {
      console.log(
        `Booking cancellation for ${bookingToDelete?.carpoolName} - ${user.sub}:${user.name}`
      );
      await deleteBooking(bookingToDelete, { userId: user.sub });
      toast.success(`Booking cancelled 👍`);
    } catch (err) {
      toast.error(`Booking cancellation failed 😧`);
      console.log(
        `Booking cancellation for ${bookingToDelete?.carpoolName} failed! Error: ${err}`
      );
    } finally {
      setShowModal(false);
    }

    try {
      const bookings = await getBookings(user.sub);
      setBookings(bookings);
    } catch (err) {
      console.log(`Error when loading bookings after a cancellation: ${err}`);
    }
  };
  useEffect(() => {
    const loadData = async () => {
      const bookings = await getBookings(user.sub);
      setBookings(bookings);
    };
    loadData();
  }, [user.sub]);

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
        onConfirmClick={onDeleteBookingClick}
        title="Confirm Cancellation"
        body="Are you sure you want to cancel this booking?"
      />
      <ToastContainer />
    </div>
  );
};

export default BookingList;
