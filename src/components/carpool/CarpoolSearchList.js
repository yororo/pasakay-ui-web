import moment from "moment";
import { Button, Card } from "react-bootstrap";

const CarpoolSearchList = ({ carpools, onBookClick }) => {
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
                onClick={() => onBookClick(carpool)}
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
