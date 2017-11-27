import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import nock from "nock";
import axios from "axios";
import httpAdapter from "axios/lib/adapters/http";
import * as actions from "./actions";

const BASE_URL = "http://localhost:3001/api";
axios.defaults.host = BASE_URL;
axios.defaults.adapter = httpAdapter;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("async actions", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  test("current should return a SET_CURRENT_CONTENT when gets the current integer", () => {
    const content = {a: 1, id: 10};
    nock(BASE_URL)
    .get(`/documents/${content.id}`)
    .reply(200, content);
    
    const expectedActions = [
      { type: "SET_CURRENT_CONTENT", payload: content }
    ];

    const store = mockStore({});
    store.dispatch(actions.fetchContent(content.id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
  });
});