// import { compareTwoStrings } from "string-similarity";

export const filterByPickUpLocation = (carpool, pickUpLocation) => {
  if (pickUpLocation && pickUpLocation.length > 1) {
    return carpool.pickUpLocation
      .toLowerCase()
      .includes(pickUpLocation.toLowerCase());

    // TODO: implement only if you have complex string comparison maybe
    // const similarityScore = compareTwoStrings(
    //   carpool.pickUpLocation.toLowerCase(),
    //   pickUpLocation.toLowerCase()
    // );

    // if (similarityScore < 0.5) {
    //   return false;
    // }
  }

  return true;
};

export const filterByDropOffLocation = (carpool, dropOffLocation) => {
  if (dropOffLocation && dropOffLocation.length > 1) {
    return carpool.dropOffLocation
      .toLowerCase()
      .trim.includes(dropOffLocation.toLowerCase());
  }

  return true;
};
