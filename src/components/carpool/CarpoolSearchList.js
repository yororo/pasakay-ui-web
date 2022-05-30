import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { getCarpools, bookCarpool } from "../../apiService/coreApi";
import carpoolsMock from "../../data/carpoolMock";
import usersMock from "../../data/userMock";

const CarpoolSearchList = () => {
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
      await bookCarpool(carpoolToBook, usersMock[0]);
      await loadCarpools();
    } catch (err) {
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
      setCarpools(carpools);
    } catch (err) {
      alert("Loading carpools failed" + err);
    }
  };

  useEffect(() => {
    loadCarpools();
  }, []);

  const displayModal = () => {
    return (
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Booking</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Are you sure you want to book this carpool?</p>
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
      {displayModal()}
      {displayCardList()}
    </div>
  );
};

export default CarpoolSearchList;
