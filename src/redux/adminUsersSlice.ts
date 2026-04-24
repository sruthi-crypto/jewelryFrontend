import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api";

// TYPES
export interface RegisterPayload {
  username: string;
  email: string;
  role: string;
}

export interface SetupPayload {
  email: string;
}

export interface VerifySetupPayload {
  email: string;
  token: string;
}

export const registerAdmin = createAsyncThunk(
  "adminUsers/register",
  async (payload: RegisterPayload) => {
    const res = await api("/users/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return res.data;
  }
);

export const setup2FA = createAsyncThunk(
  "adminUsers/setup2FA",
  async (payload: SetupPayload) => {
    const res = await api("/users/2fa/setup", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return res.data;
  }
);

export const verify2FA = createAsyncThunk(
  "adminUsers/verify2FA",
  async (payload: VerifySetupPayload) => {
    const res = await api("/users/2fa/verify-setup", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return res.data;
  }
);

interface AdminUsersState {
  registerLoading: boolean;
  setupLoading: boolean;
  verifyLoading: boolean;

  registerData: any;
  setupData: any;
  verifyData: any;

  error: string | null;
}

const initialState: AdminUsersState = {
  registerLoading: false,
  setupLoading: false,
  verifyLoading: false,

  registerData: null,
  setupData: null,
  verifyData: null,

  error: null,
};

const adminUsersSlice = createSlice({
  name: "adminUsers",
  initialState,
  reducers: {
    clearAdminFlow(state) {
      state.registerData = null;
      state.setupData = null;
      state.verifyData = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // REGISTER
      .addCase(registerAdmin.pending, (state) => {
        state.registerLoading = true;
      })
      .addCase(registerAdmin.fulfilled, (state, action) => {
        state.registerLoading = false;
        state.registerData = action.payload;
      })
      .addCase(registerAdmin.rejected, (state, action) => {
        state.registerLoading = false;
        state.error = action.error.message || "Register failed";
      })

      // SETUP
      .addCase(setup2FA.pending, (state) => {
        state.setupLoading = true;
      })
      .addCase(setup2FA.fulfilled, (state, action) => {
        state.setupLoading = false;
        state.setupData = action.payload;
      })
      .addCase(setup2FA.rejected, (state, action) => {
        state.setupLoading = false;
        state.error = action.error.message || "Setup failed";
      })

      // VERIFY
      .addCase(verify2FA.pending, (state) => {
        state.verifyLoading = true;
      })
      .addCase(verify2FA.fulfilled, (state, action) => {
        state.verifyLoading = false;
        state.verifyData = action.payload;
      })
      .addCase(verify2FA.rejected, (state, action) => {
        state.verifyLoading = false;
        state.error = action.error.message || "Verify failed";
      });
  },
});

export const { clearAdminFlow } = adminUsersSlice.actions;
export default adminUsersSlice.reducer;

