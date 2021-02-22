/** @format */

import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-full bg-blue-100 border fixed">
      <Link className="font-bold" to="/">
        Home
      </Link>
      <Link className="text-green-500 font-bold ml-5" to="/logcat">
        LogCat
      </Link>
    </div>
  );
};

export default Header;
