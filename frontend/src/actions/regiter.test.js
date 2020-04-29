import { register } from "../actions/auth";
import moxios from "moxios";
import mockLocalStorage from "./mockLocalStorage";
import { createMessage, MESSAGE_SUCCESS } from "../actions/messages";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { REGISTER_SUCCESS } from "../actions/types";
import configureStore from "redux-mock-store";

const mockData = {
  authResponse: {
    response: "Successfully created a new user.",
    token: "d148582dffbc0861b7cc73a7645419e931249ce32c4e38c11406b8676cf6ca14",
    user: {
      username: "XD",
      email: "XD@XD.XD",
      first_name: "XD",
      last_name: "XD",
      location_range: 3,
      date_joined: "2020-04-28T19:20:22.257682Z",
    },
  },
  signupData: {
    username: "123",
    email: "123@123.123",
    first_name: "123",
    last_name: "123",
    password: "123",
    password_repeat: "123",
  },
};

const mockStore = configureMockStore([thunk]);

window.localStorage = mockLocalStorage;

describe("Register", () => {
  //   beforeEach(() => moxios.install());
  //   afterEach(() => moxios.uninstall());
  //   it("creates SET_CURRENT_USER when signup action is successful", async (done) => {
  //     const { authResponse, signupData } = mockData;
  //     moxios.stubRequest("/api/v1/users/signup", {
  //       status: 200,
  //       response: authResponse,
  //     });
  //     const expectedActions = [
  //       createMessage(MESSAGE_SUCCESS, "User successfully registered"),
  //       {
  //         type: REGISTER_SUCCESS,
  //         payload: authResponse,
  //       },
  //     ];
  //     const store = mockStore({});
  //     await store.dispatch(register(signupData)).then(() => {
  //       expect(store.getActions()).toEqual(expectedActions);
  //     });
  //     done();
  //   });
});
