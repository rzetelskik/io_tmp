import reducer from "../../reducers/matcher";
import { GET_USERS, NEXT_USER } from "../../actions/types";
import { fromJS } from "immutable";

describe("matcher reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(
      fromJS({
        users: [],
        userCount: 0,
      })
    );
  });

  // it("should handle GET_USERS", () => {
  //   expect(
  //     reducer([], {
  //       type: GET_USERS,
  //       text: "Run the tests",
  //     })
  //   ).toEqual([
  //     {
  //       ...state,
  //       users: state.users.concat(action.payload),
  //       userCount: state.userCount + action.payload.length,
  //     },
  //   ]);

  //     expect(
  //       reducer(
  //         [
  //           {
  //             text: "Use Redux",
  //             completed: false,
  //             id: 0,
  //           },
  //         ],
  //         {
  //           type: types.ADD_TODO,
  //           text: "Run the tests",
  //         }
  //       )
  //     ).toEqual([
  //       {
  //         text: "Run the tests",
  //         completed: false,
  //         id: 1,
  //       },
  //       {
  //         text: "Use Redux",
  //         completed: false,
  //         id: 0,
  //       },
  //     ]);
  //   });
});
