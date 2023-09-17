import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import authService from "../services/auth.service";
import { setMessage } from "./message";

const user = JSON.parse(localStorage.getItem("user"));

export const register = createAsyncThunk(
  "/register",
  async (userDate, thunkAPI) => {
    try {
      const data = await authService.register(userDate);
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

export const socialLogin = createAsyncThunk(
  "/social",
  async ({ email }, thunkAPI) => {
    try {
      const data = await authService.socialLogin(email);
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
  registerData: {},
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    refreshToken: (state, action) => {
      state.user = { ...state.user, accessToken: action.payload };
    },
    changeRegister: (state, action) => {
      state.isRegister = action.payload;
    },
    changeRegisterData: (state, action) => {
      console.log("this is ", action.payload);
      state.registerData = {
        ...state.registerData,
        ...action.payload,
      };
      console.log("this is ", state.registerData);
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
      .addCase(socialLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(socialLogin.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(socialLogin.fulfilled, (state, action) => {
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

export const { refreshToken, changeRegister, changeRegisterData } = auth.actions;

export default auth.reducer;
