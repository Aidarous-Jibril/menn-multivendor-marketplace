import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Helper function to check if we are in the browser environment
const isBrowser = () => typeof window !== "undefined";

// Helper function to get storeInfo from localStorage
const getStoreInfoFromStorage = () => {
  if (isBrowser()) {
    const userInfo = localStorage.getItem("userInfo");
    return userInfo ? JSON.parse(userInfo) : {};
  }
  return null;
};



// Login User
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/users/login",
        userData,
        {
          withCredentials: true, // Ensure cookies are sent and received
        }
      );
      if (isBrowser()) {
        localStorage.setItem("userInfo", JSON.stringify(data.user));
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

// Logout User
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/users/logout", {
        withCredentials: true,
      });
      if (isBrowser()) {
        localStorage.removeItem("userInfo");
        localStorage.removeItem("cartItems");
        localStorage.removeItem("wishListItems");
      }
      return data.msg;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

// Register User
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/users/register", userData);
      if (isBrowser()) {
        localStorage.setItem("userInfo", JSON.stringify(data.user));
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

// Update User Information
export const updateUserInformation = createAsyncThunk(
  "user/updateUserInformation",
  async ({ name, email, phoneNumber, password, id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        "/api/users/update-user-info", // Ensure this matches the route in your backend
        { name, email, phoneNumber, password, id },
        { withCredentials: true } // This ensures credentials are included for authentication
      );
      localStorage.setItem("userInfo", JSON.stringify(data.user)); // Ensure localStorage is updated with the new user info
      return data; // Return the updated user data
    } catch (error) {
      return rejectWithValue(error.response.data.error); // Handle errors properly
    }
  }
);

// Change Password
export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (
    { oldPassword, newPassword, confirmPassword },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `/api/users/update-user-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

// Async thunk for updating user avatar
export const updateUserAvatar = createAsyncThunk(
  "user/updateUserAvatar",
  async ({ id, avatar }, { rejectWithValue }) => {
    console.log("avatar:", avatar)
    try {
      const formData = new FormData();
      formData.append("avatar", avatar); // Attach the file

      const response = await axios.put(
        `/api/users/update-avatar/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      return response.data.user; // Updated user information
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Add User Address
export const addUserAddress = createAsyncThunk(
  "user/addUserAddress",
  async (addressData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "/api/users/add-address",
        addressData,
        {
          withCredentials: true,
          headers: { "Access-Control-Allow-Credentials": true },
        }
      );
      localStorage.setItem("userInfo", JSON.stringify(data.user));
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

// Delete User Address
export const deleteUserAddress = createAsyncThunk(
  "user/deleteUserAddress",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `/api/users/delete-user-address/${id}`,
        { withCredentials: true }
      );
      localStorage.setItem("userInfo", JSON.stringify(data.user));
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);


// Add Payment Method
export const addPaymentMethod = createAsyncThunk(
  "user/addPaymentMethod",
  async (paymentData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "/api/users/add-payment-method",
        paymentData,
        {
          withCredentials: true,
        }
      );
      if (isBrowser()) {
        localStorage.setItem("userInfo", JSON.stringify(data.user));
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);


// Delete Payment Method
export const deletePaymentMethod = createAsyncThunk(
  "user/deletePaymentMethod",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete("/api/users/delete-payment-method", {
        withCredentials: true,
      });
      if (isBrowser()) {
        localStorage.setItem("userInfo", JSON.stringify(data.user));
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);


const initialState = {
  userInfo: getStoreInfoFromStorage(),
  isLoading: false,
  error: null,
  successMessage: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    clearMessages: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload.user;
        state.successMessage = action.payload.msg;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload;
        state.userInfo = {}; 
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Register User
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload.user;
        state.successMessage = action.payload.msg;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Handling the thunk in the reducer
      .addCase(updateUserInformation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserInformation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload.user; 
        state.successMessage = action.payload.message; 
      })
      .addCase(updateUserInformation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Store the error in the state
      })
      // Change Password
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload.msg;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update User avatar
      .addCase(updateUserAvatar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = { ...state.userInfo, avatar: action.payload.avatar };
        localStorage.setItem("userInfo", JSON.stringify(state.userInfo)); // Sync with local storage
        state.successMessage = "Avatar updated successfully!";
      })
      .addCase(updateUserAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Error updating avatar";
      })
      // Add User Address
      .addCase(addUserAddress.pending, (state) => {
        state.addressLoading = true;
      })
      .addCase(addUserAddress.fulfilled, (state, action) => {
        state.addressLoading = false;
        state.successMessage = action.payload.msg;
        state.userInfo = action.payload.user;
      })
      .addCase(addUserAddress.rejected, (state, action) => {
        state.addressLoading = false;
        state.error = action.payload;
      })
      // Delete User Address
      .addCase(deleteUserAddress.pending, (state) => {
        state.addressLoading = true;
      })
      .addCase(deleteUserAddress.fulfilled, (state, action) => {
        state.addressLoading = false;
        state.successMessage = action.payload.msg;
        state.userInfo = action.payload.user;
      })
      .addCase(deleteUserAddress.rejected, (state, action) => {
        state.addressLoading = false;
        state.error = action.payload;
      })
      // Add Payment Method
      .addCase(addPaymentMethod.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addPaymentMethod.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload.user;
        state.successMessage = action.payload.msg;
      })
      .addCase(addPaymentMethod.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete Payment Method
      .addCase(deletePaymentMethod.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePaymentMethod.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload.user;
        state.successMessage = action.payload.msg;
      })
      .addCase(deletePaymentMethod.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearErrors, clearMessages } = userSlice.actions;

export default userSlice.reducer;
