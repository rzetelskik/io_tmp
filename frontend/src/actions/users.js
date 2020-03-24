import axios from "axios";

import { GET_USERS, ADD_USER } from "./types";

// GET USER
export const getUsers = () => dispatch => {
  axios
    .get("/api/account/list/")
    .then(res => {
      dispatch({
        type: GET_USERS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// ADD USER
export const addUser = user => dispatch => {
  axios
    .post("/api/account/register/", user)
    .then(res => {
      dispatch({
        type: ADD_USER,
        payload: user
      });
    })
    .catch(err => console.log(err));
};
