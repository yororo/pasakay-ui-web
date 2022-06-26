import { useAuth0 } from "@auth0/auth0-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { deleteCarpool, getCarpoolsByDriverId } from "../../apiService/coreApi";
import ConfirmationDialogSimple from "../common/ConfirmationDialogSimple";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyCarpoolsList = () => {
  const { user } = useAuth0();
  const [carpools, setCarpools] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [carpoolToDelete, setCarpoolToDelete] = useState({});

  const handleCloseModal = () => {
    setShowModal(false);
    setCarpoolToDelete({});
    console.log(carpoolToDelete);
  };
  const handleShowModal = (carpool) => {
    setShowModal(true);
    setCarpoolToDelete(carpool);
  };

  const onDeleteCarpoolClick = async () => {
    try {
      console.log(
        `Deleting carpool ${carpoolToDelete?.carpoolName} - ${user.sub}:${user.name}`
      );
      await deleteCarpool(carpoolToDelete.carpoolId);
      toast.success(`Carpool deleted 👍`);
    } catch (err) {
      toast.error(`Deleting carpool failed 😧`);
      console.log(
        `Deleting carpool for ${carpoolToDelete?.carpoolName} failed! Error: ${err}`
      );
    } finally {
      setShowModal(false);
    }

    await loadCarpools();
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
    const loadData = async () => {
      try {
        const carpools = await getCarpoolsByDriverId(user.sub);
        setCarpools(carpools);
      } catch (err) {
        alert("Loading my carpools failed" + err);
      }
    };
    loadData();
  }, [user.sub]);

  return (
    <div>
      <ConfirmationDialogSimple
        showModal={showModal}
        onCancelClick={handleCloseModal}
        onConfirmClick={onDeleteCarpoolClick}
        title="Confirm Delete"
        body="Are you sure you want to delete this carpool?"
      />
      {displayCardList()}
      <ToastContainer />
    </div>
  );
};

export default MyCarpoolsList;
