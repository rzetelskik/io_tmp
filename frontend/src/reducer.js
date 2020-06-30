import { combineReducers } from "redux-immutable";
import errors, * as fromErrors from "./containers/main-panel/reducer";
import auth, * as fromAuth from "./containers/auth/register/reducer";
import message from "./containers/previous-meeting/previous-chat/reducer";
import geolocation, * as fromGeolocation from "./containers/matcher/helper-matcher/reducer";
import matcher, * as fromMatcher from "./containers/matcher/main-matcher/reducer";
import chat from "./containers/meeting/reducer";

export default combineReducers({
  errors,
  auth,
  message,
  geolocation,
  matcher,
  chat,
});


// AUTH SELECTORS
export const selectIsAuthenticated = state => (
    fromAuth.selectIsAuthenticated(state.get("auth"))
);

export const selectIsLoading = state => (
    fromAuth.selectIsLoading(state.get("auth"))
);

export const selectUser = state => (
    fromAuth.selectUser(state.get("auth"))
);

// ERRORS SELECTORS
export const selectMsg = state => (
    fromErrors.selectMsg(state.get("errors"))
);

export const selectStatus = state => (
    fromErrors.selectStatus(state.get("errors"))
);

// MATCHER HELPER SELECTORS
export const selectAccepted = state => (
    fromGeolocation.selectAccepted(state.get("geolocation"))
);

export const selectMatcherIsLoading = state => (
    fromGeolocation.selectMatcherIsLoading(state.get("geolocation"))
);

export const selectCoords = state => (
    fromGeolocation.selectCoords(state.get("geolocation"))
);

export const selectTimestamp = state => (
    fromGeolocation.selectTimestamp(state.get("geolocation"))
);

export const selectLocationSent = state => (
    fromGeolocation.selectLocationSent(state.get("geolocation"))
);

// MATCHER SELECTORS
export const selectMatchClient = state => (
    fromMatcher.selectMatchClient(state.get('matcher'))
);

export const selectUsers = state => (
    fromMatcher.selectUsers(state.get('matcher'))
);

export const selectUserCount = state => (
    fromMatcher.selectUserCount(state.get('matcher'))
);

export const selectCurrentMatch = state => (
    fromMatcher.selectCurrentMatch(state.get('matcher'))
);

export const selectPreviousMatches = state => (
    fromMatcher.selectPreviousMatches(state.get('matcher'))
);
