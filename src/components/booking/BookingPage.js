import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
  LOADING_STATUS_IDLE,
  LOADING_STATUS_PENDING,
} from "../../redux/model/loadingStatus";
import {
  deleteBooking,
  loadCarpoolsByPassengerId,
  selectMyBookedCarpools,
} from "../../redux/slice/carpool/carpoolSlice";
import AlertErrorMessageSimple from "../common/AlertErrorMessageSimple";
import AlertInfoMessageSimple from "../common/AlertInfoMessageSimple";
import SpinnerLoadingSimple from "../common/SpinnerLoadingSimple";
import BookingList from "./BookingList";

const BookingPage = () => {
  const { user } = useAuth0();
  const myBookedCarpools = useSelector((state) =>
    selectMyBookedCarpools(state, user.sub)
  );
  const { loadingStatus, error } = useSelector((state) => state.carpool);
  const dispatch = useDispatch();

  const onCancelBookingClick = async (bookingToCancel) => {
    try {
      dispatch(
        deleteBooking({ carpool: bookingToCancel, user: { userId: user.sub } })
      );
      toast.success(`Booking cancelled 👍`);
    } catch (err) {
      toast.error(`Booking cancellation failed 😧`);
      console.log(
        `Booking cancellation for ${bookingToCancel?.carpoolName} failed! Error: ${err}`
      );
    }
  };

  const displayBookedCarpoolList = () => {
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
      myBookedCarpools.length === 0
    ) {
      return (
        <AlertInfoMessageSimple message="You have no booked carpools. Go to search page and book now! 😊" />
      );
    }

    return (
      <BookingList
        carpools={myBookedCarpools}
        onCancelBookingClick={onCancelBookingClick}
      />
    );
  };

  useEffect(() => {
    dispatch(loadCarpoolsByPassengerId(user.sub));
  }, [dispatch, user.sub]);

  return (
    <div>
      <div>
        <h2>My Bookings</h2>
      </div>

      {displayBookedCarpoolList()}
      <ToastContainer />
    </div>
  );
};

export default BookingPage;
