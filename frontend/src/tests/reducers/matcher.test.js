import reducer from "../../containers/matcher/main-matcher/reducer";
import { GET_USERS, NEXT_USER } from "../../actions/types";
import { fromJS } from "immutable";

describe("matcher reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(
      fromJS({
        matchClient: null,
        users: [],
        userCount: 0,
        currentMatch: null,
        previousMatches: null
      })
    );
  });
});
