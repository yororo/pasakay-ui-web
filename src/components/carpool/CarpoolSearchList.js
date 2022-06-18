import { useAuth0 } from "@auth0/auth0-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { getCarpools, bookCarpool } from "../../apiService/coreApi";

import ConfirmationDialogSimple from "../common/ConfirmationDialogSimple";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CarpoolSearchList = () => {
  const { user } = useAuth0();
  const [carpools, setCarpools] = useState([]);
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

  const onBookClick = async () => {
    try {
      console.log(`Booking carpool ${carpoolToBook?.carpoolName}`);
      await bookCarpool(carpoolToBook, {
        userId: user.sub,
        name: user.name,
      });
      await loadCarpools();
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

  const loadCarpools = async () => {
    try {
      const carpools = await getCarpools();
      const filteredCarpools = carpools.filter((carpool) => {
        console.log(carpool.registeredPassengers);
        return !carpool.registeredPassengers.some(
          (passenger) => passenger.passengerId === user.sub
        );
      });
      setCarpools(filteredCarpools);
    } catch (err) {
      alert("Loading carpools failed" + err);
    }
  };

  useEffect(() => {
    // TODO: this is the same with loadCarpools. Just to avoid the ESLint warning for now :|
    const loadData = async () => {
      try {
        const carpools = await getCarpools();
        const filteredCarpools = carpools.filter((carpool) => {
          console.log(carpool.registeredPassengers);
          return !carpool.registeredPassengers.some(
            (passenger) => passenger.passengerId === user.sub
          );
        });
        setCarpools(filteredCarpools);
      } catch (err) {
        alert("Loading carpools failed" + err);
      }
    };
    loadData();
  }, [user.sub]);

  const displayCardList = () => {
    return carpools.map((carpool) => {
      return (
        <div className="my-3" key={carpool.carpoolId}>
          <Card>
            <Card.Header>{carpool.carpoolName}</Card.Header>
            <Card.Body>
              <Card.Title>
                {carpool.pickUpLocation} to {carpool.dropOffLocation} |{" "}
                {moment(carpool.pickUpDateTime).format("LLL")}
              </Card.Title>
              <Card.Text>
                <span>💸{carpool.fare} PHP</span>
                <br />
                <span>👌{carpool.status}</span>
                <br />
                <span>🧑{carpool.driverName}</span>
                <br />
                <span>🔟{carpool.vehicleCapacity}</span>
                <br />
                <span>🚙{carpool.vehicleModel}</span>
                <br />
                <span>
                  👨‍👩‍👦‍👦
                  {carpool.registeredPassengers.map(
                    (passenger, i) =>
                      `${passenger.passengerName}${
                        i === carpool.registeredPassengers.length - 1 ? "" : ","
                      } `
                  )}
                </span>
              </Card.Text>
              <Button
                variant="primary"
                type="button"
                onClick={() => handleShowModal(carpool)}
              >
                Book
              </Button>
            </Card.Body>
          </Card>
        </div>
      );
    });
  };
  return (
    <div>
      {displayCardList()}

      <ConfirmationDialogSimple
        showModal={showModal}
        onCancelClick={handleCloseModal}
        onConfirmClick={onBookClick}
        title="Confirm Booking"
        body="Are you sure you want to book this carpool?"
      />
      <ToastContainer />
    </div>
  );
};

export default CarpoolSearchList;
