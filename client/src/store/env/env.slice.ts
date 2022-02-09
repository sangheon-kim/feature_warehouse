import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type EnvState = {
  device: "pc" | "ph" | "";
};

const initialState: EnvState = {
  device: "",
};

const name = "env";

const envSlice = createSlice({
  name,
  initialState,
  reducers: {
    deviceSetting(state, action: PayloadAction<"pc" | "ph">) {
      state.device = action.payload;
    },
  },
});

export const envReducer = envSlice.reducer;
export const envAction = envSlice.actions;
export const ENV = envSlice.name;
