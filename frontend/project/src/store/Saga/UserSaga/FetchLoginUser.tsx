import { call, put, takeLatest } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";
import { apiRequest } from "../../../utilities/HeaderFunction";
import {
  setClearLoading,
  setError,
  setFields,
  setLoading,
} from "../../Slices/LoadAndErrorSlice";
import { setLoginUser, setToken } from "../../Slices/userSlices/UserSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";

/* ================= TYPES ================= */

type RegisterErrorResponse = {
  messages?: string[];
  message?: string;
  fieldNames: string[];
};
interface LoginPayload {
  username: string;
  password: string;
}

/* ================= API ================= */

async function FetchUsersApi(payload: LoginPayload) {
  const response = await apiRequest({
    api: "login-user",
    method: "POST",
    endpoint: "",
    body: payload,
  });

  return response;
}

/* ================= SAGA WORKER ================= */

function* FetchLoginUser(action: PayloadAction<LoginPayload>): SagaIterator {
  try {
    yield put(setLoading());
    yield put(setError(""));
    yield put(setFields([]));

    const data = yield call(FetchUsersApi, action.payload);

    if (data.user) {
      yield put(setLoginUser(data.user));
    }

    if (data.token) {
      yield put(setToken(data.token));
    }

    toast.success(data.message ?? "Login successful");
  } catch (error) {
    const err = error as AxiosError<RegisterErrorResponse>;
    const resData = err.response?.data;

    if (resData?.messages?.length) {
      resData.messages.forEach((msg) => toast.error(msg));
    }

    if (resData?.fieldNames?.length) {
      yield put(setFields(resData.fieldNames));
    }

    yield put(
      setError(
        resData?.message ??
          resData?.messages?.join(", ") ??
          "Something went wrong",
      ),
    );
  } finally {
    yield put(setClearLoading());
  }
}
/* ================= WATCHER ================= */

export function* WatchFetchLoginUsers() {
  yield takeLatest("Fetch-LOGIN-USERS", FetchLoginUser);
}
