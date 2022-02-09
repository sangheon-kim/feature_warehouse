import { all, takeLatest } from "redux-saga/effects";
import { countAction } from "./counter.slice";

function* increase() {
  console.log("increase Saga");
}

export const countSaga = function* () {
  yield all([takeLatest(countAction.increase, increase)]);
};
