import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { getCourses } from "../../api/coreApi";
import carpoolsMock from "../../data/carpoolMock";

const CarpoolSearchList = () => {
  const [carpools, setCarpools] = useState([]);

  useEffect(() => {
    getCourses()
      .then((results) => setCarpools(results))
      .catch((error) => {
        alert("Loading carpools failed" + error);
      });
  }, []);

  const displayCardList = () => {
    return carpools.map((carpool) => {
      return (
        <div className="my-3">
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
                <span>🚙{carpool.vehicleModel}</span>
              </Card.Text>
              <Button
                variant="primary"
                type="button"
                onClick={() => alert(`test book alert ${carpool.carpoolName}`)}
              >
                Book
              </Button>
            </Card.Body>
          </Card>
        </div>
      );
    });
  };
  return <div>{displayCardList()}</div>;
};

export default CarpoolSearchList;
