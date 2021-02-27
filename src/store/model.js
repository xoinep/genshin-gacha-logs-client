import { action, thunk } from "easy-peasy";
import axios from "axios";

const url = "https://genshin-gacha-logs.herokuapp.com";
const model = {
  loading: false,
  setLoading: action((state, payload) => {
    state.loading = payload;
  }),
  userKey: undefined,
  setUserKey: action((state, payload) => {
    state.userKey = payload;
  }),
  sendLoadDataRequest: thunk(async (actions, payload, helpers) => {
    actions.setLoading(true);
    const { userKey } = helpers.getState();
    const { data } = await axios.post(`${url}/load-data`, {
      userKey: userKey,
    });
    actions.setOrderedGachaTypes(data);
    actions.setLoading(false);
  }),
  orderedGachaTypes: [
    // { id: "15", key: "301", name: "Cầu Nguyện Nhân Vật" },
    // { id: "16", key: "302", name: "Cầu Nguyện Vũ Khí" },
    // { id: "14", key: "200", name: "Cầu Nguyện Thường" },
    // { id: "4", key: "100", name: "Cầu Nguyện Tân Thủ" },
  ],
  setOrderedGachaTypes: action((state, payload) => {
    state.orderedGachaTypes = payload;
  }),
  gachaLogs: [],
  updateGachaLogs: action((state, payload) => {
    state.gachaLogs = payload;
  }),
  getGachaLogs: thunk(async (actions, payload, helpers) => {
    actions.setLoading(true);
    const { userKey } = helpers.getState();
    const { data } = await axios.post(`${url}/get-gacha-logs`, {
      key: payload,
      url: userKey,
    });
    actions.updateGachaLogs(data);
    actions.setLoading(false);
  }),
};

export default model;
