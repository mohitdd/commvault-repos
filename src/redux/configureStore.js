import { createStore, combineReducers, applyMiddleware } from "redux";
import { Clients } from "./reducers/clients";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";

export const configureStore = () => {
  const store = createStore(
    combineReducers({
      clients: Clients,
    }),
    composeWithDevTools(applyMiddleware(thunk))
  );

  return store;
};
