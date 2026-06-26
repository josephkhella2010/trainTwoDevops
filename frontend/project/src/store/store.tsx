import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./Saga/rootSaga";
import UserSliceReducer from "./Slices/userSlices/UserSlice";
import LoadAndErrorSliceReducer from "./Slices/LoadAndErrorSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    usersSlice: UserSliceReducer,
    loadingSlice: LoadAndErrorSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
