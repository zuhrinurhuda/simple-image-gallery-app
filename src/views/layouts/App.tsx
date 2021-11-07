import React from "react";
import { Route } from "react-router-dom";

import routes from "routes";
import Container from "views/components/Container";
import Navigation from "views/components/Navigation";

import "./App.css";

const App: React.FC = () => {
  return (
    <Container>
      {routes.map((route) => (
        <Route key={route.path} {...route} />
      ))}
      <Navigation />
    </Container>
  );
};

export default App;
