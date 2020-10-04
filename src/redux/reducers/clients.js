import * as ActionType from "../actions/ActionTypes";

export const Clients = (
  state = {
    clients: [],
    isLoading: true,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case ActionType.ADD_CLIENTS:
      return {
        ...state,
        clients: action.payload,
        errMess: null,
        isLoading: false,
      };

    case ActionType.CLIENTS_LOADING:
      return {
        ...state,
        isLoading: true,
        clients: [],
        errMess: null,
      };

    case ActionType.CLIENTS_FAILED:
      return {
        ...state,
        isLoading: false,
        clients: [],
        errMess: action.payload,
      };

    default:
      return state;
  }
};
