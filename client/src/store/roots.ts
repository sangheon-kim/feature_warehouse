import { ENV, envReducer } from "./env/env.slice";
import { HYDRATE } from "next-redux-wrapper";
import { all, call } from "redux-saga/effects";
import { combineReducers } from "@reduxjs/toolkit";

/** Store */
import { COUNT, countReducer } from "src/store/counter/counter.slice";

import { countSaga } from "src/store/counter/counter.saga";

export const rootReducer = combineReducers({
  index: (state: { [key: string]: any } = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        return {
          ...state,
          ...action.payload,
        };

      default:
        return state;
    }
  },
  [COUNT]: countReducer,
  [ENV]: envReducer,
});

export function* rootSaga() {
  yield all([call(countSaga)]);
}

export type RootState = ReturnType<typeof rootReducer>;
