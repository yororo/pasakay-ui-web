import React from "react";
import AlertWarningMessageSimple from "../common/AlertWarningMessageSimple";

const Home = () => {
  return (
    <div>
      <h1>Welcome to Pasakay! 🎉</h1>
      <div className="mb-4">A Carpool app for the daily commuter</div>
      <h3>Features</h3>
      <div>🌟 Search and book for available carpools</div>
      <div>🌟 Manage your own carpools</div>
      <div>🌟 Manage your booked carpools</div>
      <div>🌟 View your profile</div>
      <div className="mt-5">
        <AlertWarningMessageSimple message="This site is currently in-progress. Some features may not work properly." />
      </div>
    </div>
  );
};

export default Home;
