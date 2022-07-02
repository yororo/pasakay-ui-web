import moment from "moment";
import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import ConfirmationDialogSimple from "../common/ConfirmationDialogSimple";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyCarpoolsList = ({ carpools, onCancelCarpoolClick }) => {
  const [showModal, setShowModal] = useState(false);
  const [carpoolToDelete, setCarpoolToDelete] = useState({});

  const handleCloseModal = () => {
    setShowModal(false);
    setCarpoolToDelete({});
  };
  const handleShowModal = (carpool) => {
    setShowModal(true);
    setCarpoolToDelete(carpool);
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

  return (
    <div>
      <ConfirmationDialogSimple
        showModal={showModal}
        onCancelClick={handleCloseModal}
        onConfirmClick={() => {
          onCancelCarpoolClick(carpoolToDelete);
          handleCloseModal();
        }}
        title="Confirm Delete"
        body="Are you sure you want to delete this carpool?"
      />
      {displayCardList()}
      <ToastContainer />
    </div>
  );
};

export default MyCarpoolsList;
