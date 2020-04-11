import { combineReducers } from "redux-immutable";
import errors from "./errors";
import auth from "./auth";
import message from "./message";
import geolocation from "./geolocation";
import matcher from "./matcher";

export default combineReducers({ errors, auth, message, geolocation, matcher });
