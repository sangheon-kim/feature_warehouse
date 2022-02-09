import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ajaxUtil from "src/utils/ajaxUtil";

const initialState: CountState = {
  count: ajaxUtil.init(),
};

const name = "Count";

const countSlice = createSlice({
  name,
  initialState,
  reducers: {
    increase(state) {
      state.count = state.count += 1;
    },
    decrease(state) {
      state.count = state.count -= 1;
    },
  },
});

export const countReducer = countSlice.reducer;
export const countAction = countSlice.actions;
export const COUNT = countSlice.name;
