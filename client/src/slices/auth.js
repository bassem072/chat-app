import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import authService from "../services/auth.service";
import { setMessage } from "./message";

const user = JSON.parse(localStorage.getItem("user"));

export const register = createAsyncThunk(
  "/register",
  async ({ email, password, name, bio, gender, birthday }, thunkAPI) => {
    try {
      const data = await authService.register(
        email,
        password,
        name,
        bio,
        gender,
        birthday
      );
      return { user: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const login = createAsyncThunk(
  "/login",
  async ({ email, password, remember }, thunkAPI) => {
    try {
      const data = await authService.login(email, password, remember);
      console.log("bassem", data);
      return { user: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const logout = createAsyncThunk("logout", () => {
  console.log("user" + user);

  authService.logout();
});

const initialState = {
  isLoading: false,
  isRegister: false,
  isAuthenticated: false,
  user: user ?? null,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    refreshToken: (state, action) => {
      state.user = { ...state.user, accessToken: action.payload };
    },
    register: (state, action) => {
      state.isRegister = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.user = null;
      });
  },
});

export const { refreshToken } = auth.actions;

export default auth.reducer;
