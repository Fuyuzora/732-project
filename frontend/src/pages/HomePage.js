import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";

// pages
import DashboardOverview from "./MBTI";
import Transactions from "./Networking";
import Settings from "./Demo";

// documentation pages

// components
import Sidebar from "../components/Sidebar";
import Preloader from "../components/Preloader";

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route {...rest} render={props => (
      <>
        <Preloader show={loaded ? false : true} />
        <Sidebar />
        <main className="content">
          <Component {...props} />
        </main>
      </>
    )}
    />
  );
};

export default () => (
  <Switch>
    <RouteWithSidebar exact path={Routes.MBTI.path} component={DashboardOverview} />
    <RouteWithSidebar exact path={Routes.Networking.path} component={Transactions} />
    <RouteWithSidebar exact path={Routes.Demo.path} component={Settings} />
    <Redirect to={Routes.MBTI.path} />
  </Switch>
);
