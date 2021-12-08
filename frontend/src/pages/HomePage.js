import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";

// pages
import MBTI from "./MBTI";
import Networking from "./Networking";
import Demo from "./Demo";
import Intro from './Intro';
import Conclusion from './Conclusion'

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
    <RouteWithSidebar exact path={Routes.Intro.path} component={Intro} />
    <RouteWithSidebar exact path={Routes.MBTI.path} component={MBTI} />
    <RouteWithSidebar exact path={Routes.Networking.path} component={Networking} />
    <RouteWithSidebar exact path={Routes.Demo.path} component={Demo} />
    <RouteWithSidebar exact path={Routes.Conclusion.path} component={Conclusion} />
    <Redirect to={Routes.Intro.path} />
  </Switch>
);
