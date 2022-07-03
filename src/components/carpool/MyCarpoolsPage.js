import React, { useEffect, useState } from "react";
import MyCarpoolsList from "./MyCarpoolsList";
import { Button, Form, Modal } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addCarpool,
  deleteCarpool,
  loadCarpoolsByDriverId,
  selectMyCarpools,
} from "../../redux/slice/carpool/carpoolSlice";
import {
  LOADING_STATUS_IDLE,
  LOADING_STATUS_PENDING,
} from "../../redux/model/loadingStatus";
import AlertErrorMessageSimple from "../common/AlertErrorMessageSimple";
import SpinnerLoadingSimple from "../common/SpinnerLoadingSimple";
import AlertInfoMessageSimple from "../common/AlertInfoMessageSimple";

const MyCarpools = () => {
  const { user } = useAuth0();
  const myCarpools = useSelector((state) => selectMyCarpools(state, user.sub));
  const { loadingStatus, error } = useSelector((state) => state.carpool);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [newCarpool, setNewCarpool] = useState({});

  const onCancelCarpoolClick = async (carpoolToDelete) => {
    try {
      console.log(
        `Deleting carpool ${carpoolToDelete?.carpoolName} - ${user.sub}:${user.name}`
      );
      dispatch(deleteCarpool(carpoolToDelete.carpoolId));
      toast.success(`Carpool deleted 👍`);
    } catch (err) {
      toast.error(`Deleting carpool failed 😧`);
      console.log(
        `Deleting carpool for ${carpoolToDelete?.carpoolName} failed! Error: ${err}`
      );
    }
  };

  useEffect(() => {
    dispatch(loadCarpoolsByDriverId(user.sub));
  }, [dispatch, user.sub]);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleNewCarpool = async (event) => {
    event.preventDefault();

    try {
      console.log(`Creating new carpool: ${Object.values(newCarpool)}`);
      dispatch(
        addCarpool({
          carpool: newCarpool,
          user: {
            name: user.name,
            userId: user.sub,
          },
        })
      );
      toast.success(`Carpool created 🔥`);
    } catch (err) {
      toast.error(`Creating new carpool failed 😧`);
      console.log(`Creating new carpool failed! ${err}`);
    } finally {
      setShowModal(false);
    }
  };

  const handleNewCarpoolChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setNewCarpool((values) => ({ ...values, [name]: value }));
  };

  const displayMyCarpoolList = () => {
    if (loadingStatus === LOADING_STATUS_PENDING) {
      return (
        <div className="text-center">
          <SpinnerLoadingSimple />
        </div>
      );
    } else if (loadingStatus === LOADING_STATUS_IDLE && error !== null) {
      return <AlertErrorMessageSimple />;
    } else if (
      loadingStatus === LOADING_STATUS_IDLE &&
      myCarpools.length === 0
    ) {
      return (
        <AlertInfoMessageSimple message="You have no created carpools. Create one now! 😊" />
      );
    }

    return (
      <>
        <MyCarpoolsList
          carpools={myCarpools}
          onCancelCarpoolClick={onCancelCarpoolClick}
        />
      </>
    );
  };

  const displayNewCarpoolModal = () => {
    return (
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>New Carpool</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Pick-up address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tower 3 lobby, Dansalan Gardens, M. Vicente St., Mandaluyong City"
                name="pickUpLocation"
                value={newCarpool.pickUpLocation || ""}
                onChange={handleNewCarpoolChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Pick-up date and time</Form.Label>
              <Form.Control
                type="text"
                placeholder="January 1, 2022 8:00 AM"
                name="pickUpDateTime"
                value={newCarpool.pickUpDateTime || ""}
                onChange={handleNewCarpoolChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Drop-off location</Form.Label>
              <Form.Control
                type="text"
                placeholder="RCBC Tower, Ayala Ave., Cor. Buendia St., Makati City"
                name="dropOffLocation"
                value={newCarpool.dropOffLocation || ""}
                onChange={handleNewCarpoolChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Vehicle Model</Form.Label>
              <Form.Control
                type="text"
                placeholder="Toyota Vios"
                name="vehicleModel"
                value={newCarpool.vehicleModel || ""}
                onChange={handleNewCarpoolChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Vehicle Capacity</Form.Label>
              <Form.Control
                type="number"
                placeholder="4"
                name="vehicleCapacity"
                value={newCarpool.vehicleCapacity || ""}
                onChange={handleNewCarpoolChange}
              />
              <Form.Text className="text-muted">Excluding the driver</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Vehicle Plate Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="AAA 1111"
                name="vehiclePlateNumber"
                value={newCarpool.vehiclePlateNumber || ""}
                onChange={handleNewCarpoolChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Fare</Form.Label>
              <Form.Control
                type="number"
                placeholder="250"
                name="fare"
                value={newCarpool.fare || ""}
                onChange={handleNewCarpoolChange}
              />
              <Form.Text className="text-muted">PHP</Form.Text>
            </Form.Group>
            <h5 className="pt-2">Driver Details</h5>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="09XXXXXXXXX"
                name="driverNumber"
                value={newCarpool.driverNumber || ""}
                onChange={handleNewCarpoolChange}
              />
              <Form.Text className="text-muted">
                Your passengers will use this to contact you
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="email@example.com"
                name="driverEmail"
                value={newCarpool.driverEmail || ""}
                onChange={handleNewCarpoolChange}
              />
              <Form.Text className="text-muted">
                We'll use this to send notifications to you
              </Form.Text>
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" onClick={handleNewCarpool}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="p-2">
          <h2>My Carpools</h2>
        </div>
        <div className="p-2">
          <Button variant="primary" type="button" onClick={handleShowModal}>
            New
          </Button>
        </div>
      </div>

      {displayMyCarpoolList()}
      {displayNewCarpoolModal()}
      <ToastContainer />
    </>
  );
};

export default MyCarpools;
