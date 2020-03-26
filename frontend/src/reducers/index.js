import { combineReducers } from "redux";
import errors from "./errors";
import auth from "./auth";
import messages from "./message";

export default combineReducers({ errors, auth, messages });
