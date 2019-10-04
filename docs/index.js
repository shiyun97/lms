import React from "react";
import ReactDOM from "react-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "../dist/css/mdb.css";
import "./index.css";
import App from "./App";
import { Provider } from 'mobx-react';
import DataStore from './stores/DataStore';

import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<Provider dataStore={new DataStore()}><App /></Provider>, document.getElementById("root"));

registerServiceWorker();
