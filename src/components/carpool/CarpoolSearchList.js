import moment from "moment";
import React from "react";
import { Button, Card } from "react-bootstrap";
import carpoolsMock from "../../data/carpoolMock";

const CarpoolSearchList = () => {
  const displayCardList = () => {
    return carpoolsMock.map((carpool) => {
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
              <Button variant="primary">Book</Button>
            </Card.Body>
          </Card>
        </div>
      );
    });
  };
  return <div>{displayCardList()}</div>;
};

export default CarpoolSearchList;
