/** @format */

import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Header from "../component/Header";
import Home from "../component/Home";
import Logcat from "../component/Logcat";

const AdbtronRouter = () => {
  return (
    <Router>
      <Header />
      <div className="pt-7">
        <Route exact path="/" component={Home} />
        <Route exact path="/logcat" component={Logcat} />
      </div>
    </Router>
  );
};

export default AdbtronRouter;
