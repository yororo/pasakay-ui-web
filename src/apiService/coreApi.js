import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/carpools";

export async function getCarpools() {
  console.log(baseUrl);
  return await fetch(baseUrl).then(handleResponse).catch(handleError);
}

export async function getCarpoolsByDriverId(driverId) {
  console.log(baseUrl);
  // WARN: improve security?
  return await fetch(`${baseUrl}?driverId=${driverId}`)
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
