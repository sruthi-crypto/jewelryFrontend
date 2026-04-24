import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api";

export interface UserData {
  id: string;
  username: string;
  email: string;
  role: string;
  twoFactorEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetAllUsersResponse {
  success: boolean;
  data: UserData[];
}

interface UsersState {
  items: UserData[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UsersState = {
  items: [],
  status: "idle",
  error: null,
};

// ✅ API CALL
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async () => {
    const response = await api("/users"); // your endpoint
    return (response as GetAllUsersResponse).data;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch users";
      });
  },
});

export default usersSlice.reducer;