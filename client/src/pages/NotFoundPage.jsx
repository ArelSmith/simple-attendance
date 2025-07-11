import React from "react";
import notfound from "../../public/not-found-removedbg.png";
// import NavigationBar from "../components/NavigationBar";
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div>
      {/* <NavigationBar /> */}
      <div className="h-screen flex flex-col gap-y-3 items-center justify-center">
        <h1 className="text-center font-bold text-6xl ">Page isn't exist</h1>
        <p className="text-xl">Check if you're typo while typing the url</p>
        <img src={notfound} alt="Not Found" />
        <Link to="/" className="btn btn-primary">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
