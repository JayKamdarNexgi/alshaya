import { combineReducers } from "redux";
import auth from './auth/reducer';
import dashboard from "./dashboard/reducer";

const appReducer = combineReducers({
  dashboard,
  auth
});

const reducer = (state, action) => {
  if (action.type === "LOGOUT_USER") {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default reducer;
