import { all } from "redux-saga/effects";
import { WatchFetchGetUsers } from "./UserSaga/FetchGetUsersSaga";
import { WatchFetchRegisterUsers } from "./UserSaga/FetchRegisterSaga";
import { WatchFetchLoginUsers } from "./UserSaga/FetchLoginUser";

export default function* RootSaga() {
  yield all([
    WatchFetchGetUsers(),
    WatchFetchRegisterUsers(),

    WatchFetchLoginUsers(),
  ]);
}
