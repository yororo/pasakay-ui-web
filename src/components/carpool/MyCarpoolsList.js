import { useAuth0 } from "@auth0/auth0-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { getCarpoolsByDriverId } from "../../apiService/coreApi";

const MyCarpoolsList = () => {
  const { user } = useAuth0();
  const [carpools, setCarpools] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [carpoolToDelete, setCarpoolToBook] = useState({});

  const handleCloseModal = () => {
    setShowModal(false);
    setCarpoolToBook({});
  };
  const handleShowModal = (carpool) => {
    setShowModal(true);
    setCarpoolToBook(carpool);
  };

  const loadCarpools = async () => {
    try {
      const carpools = await getCarpoolsByDriverId(user.sub);
      setCarpools(carpools);
      console.log(carpools);
    } catch (err) {
      alert("Loading my carpools failed" + err);
    }
  };

  const displayModal = () => {
    return (
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Booking</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Are you sure you want to cancel this carpool?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => {}}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => {}}>
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
                variant="danger"
                type="button"
                onClick={() => handleShowModal(carpool)}
              >
                Cancel
              </Button>
            </Card.Body>
          </Card>
        </div>
      );
    });
  };

  useEffect(() => {
    loadCarpools();
  }, []);

  return (
    <div>
      {displayModal()}
      {displayCardList()}
    </div>
  );
};

export default MyCarpoolsList;
