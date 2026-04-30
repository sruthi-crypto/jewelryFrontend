import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { api } from "../api";

export type AppView = "home" | "admin-login" | "user-store";

interface AuthUser {
  id: string;
  username?: string;
  email: string;
  role: string;
}

interface AuthState {
  user: AuthUser | null;
  isAdminLoggedIn: boolean;
  view: AppView;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const AUTH_USER_KEY = "lumina_auth_user";

function loadStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

const storedUser = loadStoredUser();
const hasToken = Boolean(localStorage.getItem("token"));

export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async (credentials: { user?: string; pass?: string; email?: string; token?: string }) => {
    const payload = {
      email: credentials.email ?? credentials.user ?? "",
      token: credentials.token ?? credentials.pass ?? "",
    };

    const response = await api("/users/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const result = (response.data ?? response) as {
      user?: AuthUser;
      token?: string;
    };

    const user = result.user;
    const token = result.token;

    if (!user || !token) {
      throw new Error("Invalid login response");
    }

    if (user.role !== "admin") {
      throw new Error("Admin access only");
    }

    localStorage.setItem("token", token);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));

    return user;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser,
    isAdminLoggedIn: hasToken && storedUser?.role === "admin",
    view: "home",
    status: "idle",
    error: null,
  } as AuthState,
  reducers: {
    setView(state, action: PayloadAction<AppView>) {
      state.view = action.payload;
    },
    logoutAdmin(state) {
      state.user = null;
      state.isAdminLoggedIn = false;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem(AUTH_USER_KEY);
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginAdmin.pending, state => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isAdminLoggedIn = action.payload.role === "admin";
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.isAdminLoggedIn = false;
        state.error = action.error.message || "Login failed";
      });
  },
});

export const { setView, logoutAdmin, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
