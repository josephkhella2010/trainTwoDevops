import { call, put, takeLatest } from "redux-saga/effects";

import type { SagaIterator } from "redux-saga";
import { apiRequest } from "../../../utilities/HeaderFunction";
import {
  setClearLoading,
  setError,
  setLoading,
} from "../../Slices/LoadAndErrorSlice";
import { setUsers } from "../../Slices/userSlices/UserSlice";

async function FetchBooksApi() {
  const data = await apiRequest({
    api: "users",
    method: "GET",
    endpoint: "",
  });
  const users = data.users;
  return users;
}

function* FetchGetUsers(): SagaIterator {
  try {
    yield put(setLoading());

    const users = yield call(FetchBooksApi);

    yield put(setUsers(users));
  } catch (error: unknown) {
    let message = "Something went wrong";

    if (error instanceof Error) {
      message = error.message;
    }

    yield put(setError(message));
  } finally {
    yield put(setClearLoading());
  }
}

export function* WatchFetchGetUsers() {
  yield takeLatest("Fetch-USERS", FetchGetUsers);
}
