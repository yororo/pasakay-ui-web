// TODO: move some services to a core service - generic of datasource
// coreApi should only return actual data and then the "coreService" will be the one to process it and do validations (i.e. business logic)
import { handleResponse, handleError } from "./apiUtils";
import moment from "moment";

const baseUrl = process.env.REACT_APP_API_URL + "/carpools";

export async function getCarpools() {
  console.log(baseUrl);
  return await fetch(baseUrl).then(handleResponse).catch(handleError);
}

export async function getCarpoolsAvailableForBooking(userId, pickUpDate) {
  // TODO: move filtering in API instead to lessen throughput
  console.log(baseUrl);
  const date = moment(pickUpDate).unix();
  const allCarpools = await fetch(`${baseUrl}?status=Open&pickUpDate=${date}`)
    .then(handleResponse)
    .catch(handleError);

  return allCarpools.filter((carpool) => {
    return (
      carpool.status === "Open" &&
      !carpool.registeredPassengers.some(
        (passenger) => passenger.passengerId === userId
      )
    );
  });
}

export async function getCarpoolsByDriverId(driverId) {
  console.log(baseUrl);
  // WARN: improve security?
  return await fetch(`${baseUrl}?driverId=${driverId}`)
    .then(handleResponse)
    .catch(handleError);
}

export async function getCarpoolById(carpoolId) {
  console.log(baseUrl);
  // WARN: improve security?
  return await fetch(`${baseUrl}?carpoolId=${carpoolId}`)
    .then(handleResponse)
    .catch(handleError);
}

export async function getBookings(userId) {
  const carpools = await fetch(baseUrl).then(handleResponse).catch(handleError);
  const userBookings = carpools.filter((carpool) =>
    carpool.registeredPassengers.some(
      (passenger) => passenger.passengerId === userId
    )
  );

  return userBookings;
}

export function bookCarpool(carpool, user) {
  const newPassengers = [
    ...carpool.registeredPassengers,
    {
      passengerId: user.userId,
      passengerName: user.name,
      passengerNumber: user.phoneNumber,
    },
  ];
  const newStatus =
    newPassengers.length >= carpool.vehicleCapacity ? "Full" : "Open";
  const body = {
    status: newStatus,
    registeredPassengers: newPassengers,
  };

  return fetch(`${baseUrl}/${carpool.carpoolId}`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function createNewCarpool(carpool, user) {
  const body = {
    ...carpool,
    driverName: user.name,
    driverId: user.userId,
  };

  return fetch(`${baseUrl}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteBooking(carpool, user) {
  const newPassengers = carpool.registeredPassengers.filter(
    (passenger) => passenger.passengerId !== user.userId
  );

  const newStatus = carpool.status === "Full" ? "Open" : carpool.status;

  const body = {
    status: newStatus,
    registeredPassengers: newPassengers,
  };

  return fetch(`${baseUrl}/${carpool.carpoolId}`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteCarpool(carpoolId) {
  return fetch(`${baseUrl}/${carpoolId}`, {
    method: "DELETE",
  })
    .then(handleResponse)
    .catch(handleError);
}
