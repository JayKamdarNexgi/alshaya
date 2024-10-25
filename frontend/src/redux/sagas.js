import { all } from "redux-saga/effects";
import auth from "./auth/saga";
import dashboard from "./dashboard/saga";

export default function* rootSaga() {
  yield all([dashboard(), auth()]);
}
