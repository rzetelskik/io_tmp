import { createMessage, MESSAGE_INFO } from "./messages";

export const getUserOffers = () => (dispatch, getState) => {
  dispatch(
    createMessage(MESSAGE_INFO, "Sruty pierduty teraz pytam o userów wokoło")
  );
};
