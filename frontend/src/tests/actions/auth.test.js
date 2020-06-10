import {
  login,
  register,
  updateDetails,
  changePassword,
  logout,
  loadUser,
} from "../../actions/action-creators/auth";
import { makeMockStore } from "../../../Utils";
import moxios from "moxios";
import {
  REGISTER_SUCCESS,
  CREATE_MESSAGE,
  UPDATE_DETAILS_SUCCESS,
  USER_LOADED,
  USER_LOADING,
  LOGOUT_SUCCESS,
} from "../../actions/types";
import { MESSAGE_SUCCESS } from "../../actions/action-creators/messages";

const mockSuccess = (data) => ({ status: 200, response: { data } });
const mockError = (error) => ({ status: 400, response: error });
const mockLogout = () => ({ status: 204 });

describe("auth actions", () => {
  describe("login", () => {
    const store = makeMockStore({ user: {}, isAuthenticated: false });
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it("successful api request", async () => {
      const response = {
        response: "Successfully created a new user.",
        token: "token",
        user: {
          username: "XD",
          email: "XD@XD.XD",
          first_name: "XD",
          last_name: "XD",
          location_range: 3,
          date_joined: "2020-04-28T19:20:22.257682Z",
        },
      };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(mockSuccess(response));
      });

      const expected = {
        payload: {
          data: response,
        },
        type: "LOGIN_SUCCESS",
      };

      await store
        .dispatch(login(response.user.username, "password"))
        .then(() => {
          const actionsCalled = store.getActions();
          expect(actionsCalled[0]).toEqual(expected);
        });
    });
  });

  describe("register", () => {
    const store = makeMockStore({ user: {}, isAuthenticated: false });
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    const response = {
      response: "Successfully created a new user.",
      token: "token",
      user: {
        username: "XD",
        email: "XD@XD.XD",
        first_name: "XD",
        last_name: "XD",
        location_range: 3,
        date_joined: "2020-04-28T19:20:22.257682Z",
      },
    };

    it("successful api request", async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(mockSuccess(response));
      });

      const expected = [
        {
          payload: {
            messageType: MESSAGE_SUCCESS,
            msg: "User successfully registered",
          },
          type: CREATE_MESSAGE,
        },
        {
          payload: {
            data: response,
          },
          type: REGISTER_SUCCESS,
        },
      ];

      await store.dispatch(register()).then(() => {
        const actionsCalled = store.getActions();
        expect(actionsCalled).toEqual(expected);
      });
    });
  });

  describe("updateDetails", () => {
    const store = makeMockStore({
      auth: {
        token: "token",
        isAuthenticated: true,
        isLoading: false,
        user: {},
      },
    });
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());
    const response = { response: "User details updated successfully." };

    it("successful api request", async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(mockSuccess(response));
      });

      const expected = [
        {
          payload: {
            messageType: MESSAGE_SUCCESS,
            msg: "Account details updated successfully.",
          },
          type: CREATE_MESSAGE,
        },
        {
          payload: {
            first_name: "firstname",
            last_name: "lastname",
            location_range: "range",
          },
          type: UPDATE_DETAILS_SUCCESS,
        },
      ];
      await store
        .dispatch(updateDetails("firstname", "lastname", "range"))
        .then(() => {
          const actionsCalled = store.getActions();
          expect(actionsCalled).toEqual(expected);
        });
    });
  });

  describe("changePassword", () => {
    const store = makeMockStore({
      auth: {
        token: "token",
        isAuthenticated: true,
        isLoading: false,
        user: {},
      },
    });
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());
    const response = { response: "Password changed successfully." };

    it("successful api request", async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(mockSuccess(response));
      });

      const expected = [
        {
          payload: {
            messageType: MESSAGE_SUCCESS,
            msg: response.response,
          },
          type: CREATE_MESSAGE,
        },
      ];
      await store.dispatch(changePassword("old", "new", "new")).then(() => {
        const actionsCalled = store.getActions();
        expect(actionsCalled).toEqual(expected);
      });
    });
  });

  describe("logout", () => {
    const store = makeMockStore({
      auth: {
        token: "token",
        isAuthenticated: true,
        isLoading: false,
        user: {},
      },
    });
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it("successful api request", async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(mockLogout());
      });

      const expected = [
        {
          payload: {
            messageType: "MESSAGE_INFO",
            msg: "Logged out.",
          },
          type: CREATE_MESSAGE,
        },
        {
          type: LOGOUT_SUCCESS,
        },
      ];
      await store.dispatch(logout()).then(() => {
        const actionsCalled = store.getActions();
        expect(actionsCalled).toEqual(expected);
      });
    });
  });

  describe("loadUser", () => {
    const store = makeMockStore({
      auth: {
        token: "token",
        isAuthenticated: true,
        isLoading: false,
        user: {},
      },
    });
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it("successful api request", async () => {
      const response = {
        username: "dupa",
        email: "dupa@dupa.com",
        first_name: "dupa",
        last_name: "dupa",
        location_range: 22,
        date_joined: "2020-04-12T16:23:16.242473Z",
        tags: {},
      };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(mockSuccess(response));
      });

      const expected = [
        { type: USER_LOADING },
        { payload: { data: response }, type: USER_LOADED },
      ];
      await store.dispatch(loadUser()).then(() => {
        const actionsCalled = store.getActions();
        expect(actionsCalled).toEqual(expected);
      });
    });
  });
});
