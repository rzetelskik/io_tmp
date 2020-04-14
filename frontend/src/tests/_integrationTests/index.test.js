import moxios from "moxios";
import { testStore } from "../../../Utils";
import { loadUser } from "../../actions/auth";
import { createStore } from "../../store";

describe("loadUser astion", () => {
  //TODO
  // beforeEach(() => {
  //   moxios.install();
  // });
  // afterEach(() => {
  //   moxios.uninstall();
  // });
  // test("Store is updated correctly", () => {
  //   const expectedState = {
  //     token: "sometoken",
  //     isAuthenticated: true,
  //     user: {
  //       username: "dupa",
  //       email: "dupa@dupa.com",
  //       first_name: "dupa",
  //       last_name: "dupa",
  //       location_range: 3,
  //       date_joined: "2020-04-12T16:23:16.242473Z",
  //     },
  //     response: "Logged in successfully.",
  //   };
  //   const store = testStore();
  //   moxios.wait(() => {
  //     const request = moxios.request.mostRecent();
  //     request.respondWith({
  //       status: 200,
  //       response: expectedState,
  //     });
  //   });
  //   return store.dispatch(loadUser()).then(() => {
  //     // const newState = store.getState();
  //     // expect(newState.posts).toBe(expectedState);
  //   });
  // });
});
