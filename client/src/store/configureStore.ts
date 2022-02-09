import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import createSagaMiddleware from "redux-saga";
import { createWrapper } from "next-redux-wrapper";

import { rootReducer, rootSaga } from "src/store/roots";

const sagaMiddleware = createSagaMiddleware();

const createStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(sagaMiddleware);
    },
  });

  sagaMiddleware.run(rootSaga);

  setupListeners(store.dispatch);
  return store;
};

const wrapper = createWrapper(createStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
