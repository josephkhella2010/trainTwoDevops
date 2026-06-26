import { call, put, takeLatest } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";
import { apiRequest } from "../../../utilities/HeaderFunction";
import {
  setClearLoading,
  setError,
  setFields,
  setLoading,
} from "../../Slices/LoadAndErrorSlice";
import { setRegisterUser } from "../../Slices/userSlices/UserSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { UserType } from "../../../utilities/Interfaces";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";

/* ================= TYPES ================= */

type RegisterErrorResponse = {
  messages?: string[];
  message?: string;
  fieldNames: string[];
};

/* ================= API ================= */

async function FetchUsersApi(action: PayloadAction<UserType>) {
  const response = await apiRequest({
    api: "register-user",
    method: "POST",
    endpoint: "",
    body: action.payload,
  });

  return response;
}

/* ================= SAGA WORKER ================= */
function* FetchRegisterUsers(action: PayloadAction<UserType>): SagaIterator {
  try {
    yield put(setLoading());

    const data = yield call(FetchUsersApi, action);

    const user = data.user;
    const message = data.message || "Success";

    if (user) {
      yield put(setRegisterUser(user));
    }
    yield put(setFields([]));
    toast.success(message);
  } catch (error: unknown) {
    const err = error as AxiosError<RegisterErrorResponse>;
    const resData = err.response?.data;

    if (resData?.messages?.length) {
      resData.messages.forEach((msg: string) => {
        toast.error(msg);
      });
    }

    if (resData?.fieldNames) {
      yield put(setFields(resData.fieldNames));
    }

    yield put(setError("Something went wrong"));
  } finally {
    yield put(setClearLoading());
  }
}
/* ================= WATCHER ================= */

export function* WatchFetchRegisterUsers() {
  yield takeLatest("Fetch-REGISTER-USERS", FetchRegisterUsers);
}
