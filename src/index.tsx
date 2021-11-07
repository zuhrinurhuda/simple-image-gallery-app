import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Switch } from "react-router-dom";

import App from "views/layouts/App";
import Spinner from "views/components/Spinner";
import { store } from "state/store";
import * as serviceWorker from "serviceWorker";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <React.Suspense
      fallback={
        <div className="loading-page-container">
          <Spinner />
        </div>
      }
    >
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <App />
          </Switch>
        </BrowserRouter>
      </Provider>
    </React.Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
