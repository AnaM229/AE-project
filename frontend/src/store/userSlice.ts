import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    token: string | null;
    email: string | null;
    role: string | null;
}

const initialState: UserState = {
    token: localStorage.getItem("token"),
    email: localStorage.getItem("email"),
    role: localStorage.getItem("role"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
        state.token = action.payload.token;
        state.email = action.payload.email;
        state.role = action.payload.role;

        localStorage.setItem("token", action.payload.token || "");
        localStorage.setItem("email", action.payload.email || "");
        localStorage.setItem("role", action.payload.role || "");
    },
    logout(state) {
        state.token = null;
        state.email = null;
        state.role = null;
        localStorage.clear();
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
