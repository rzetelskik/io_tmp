import { combineReducers } from "redux";
import errors from "./errors";
import auth from "./auth";
import messages from "./message";
import geolocation from "./geolocation";

export default combineReducers({ errors, auth, messages, geolocation });
