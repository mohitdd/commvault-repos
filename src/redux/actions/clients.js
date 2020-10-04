import * as ActionType from "./ActionTypes";
import axios from "axios";

export const fetchClients = () => (dispatch) => {
  dispatch(clientsLoading());
  axios
    .get("https://api.jsonbin.io/b/5f3218e46f8e4e3faf300630/1")
    .then((response) => {
      if (response.status === 200) {
        dispatch(addClients(response.data.clients));
      }
    })
    .catch((err) => dispatch(errorClient(err.message)));
};

export const clientsLoading = () => ({
  type: ActionType.CLIENTS_LOADING,
});

export const addClients = (clients) => ({
  type: ActionType.ADD_CLIENTS,
  payload: clients,
});

export const errorClient = (message) => ({
  type: ActionType.CLIENTS_FAILED,
  payload: message,
});
