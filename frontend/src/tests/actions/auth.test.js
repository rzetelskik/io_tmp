import axios from "axios";
import loadUser from "../../actions/auth";

jest.mock("axios");

test("should do smthn", () => {
  const userData = [{ smthn: "some data" }];
  const res = { data: userData };
  axios.get.mockResolvedValue(res);
  return loadUser().then((data) => expect(data).toEqual(userData));
});
