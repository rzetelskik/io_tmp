import {
  login,
  register,
  updateDetails,
  changePassword,
  logout,
} from "../../../actions/auth";
import { makeMockStore } from "../../../../Utils";
import moxios from "moxios";

const store = makeMockStore({ user: {}, isAuthenticated: false });
const mockSuccess = (data) => ({ status: 200, response: { data } });
const mockError = (data) => ({ status: 500, response: error });

describe("auth actions", () => {
  describe("login", () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it("successfull api request", () => {
      const response = {
        user: {
          username: "dupa",
          email: "dupa@dupa.com",
          first_name: "dupa",
          last_name: "dupa",
          location_range: 50,
          date_joined: "2020-04-12T16:23:16.242473Z",
        },
        response: "Logged in successfully.",
        token:
          "7caf7a5f079a12c7d9c53fbcfd92e5b0666d9b943763ebf798928ecccb606e8a",
      };

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(mockSuccess(response));
      });

      store.dispatch(login()).then(() => {
        const actionsCalled = store.getActions();
        expect(actionsCalled[0]).toEqual(login());
      });
    });
  });
});
