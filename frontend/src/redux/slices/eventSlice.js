import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunks
export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (newForm, { rejectWithValue }) => {
    console.log("FORM:", newForm)
    try {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };
      const { data } = await axios.post(
        '/api/events/create-event',
        newForm,
        config
      );
      return data.event;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getAllEvents = createAsyncThunk(
  "events/getAllEvents",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/events`);
      return data.sales;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const storeGetAllEvents = createAsyncThunk(
  "events/storeGetAllEvents",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/events/vendor/${id}`);
      return data.sales;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getSingleEvent = createAsyncThunk(
  "events/getSingleEvent",
  async (id, { rejectWithValue }) => {
    console.log(id)
    try {
      const { data } = await axios.get(`/api/events/event/${id}`); // Updated path
      console.log(data)
      return data.sale;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const storeDeleteEvent = createAsyncThunk(
  "events/storeDeleteEvent",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/events/event/${id}`); // Updated path
      // return data.message;
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Slice
const eventSlice = createSlice({
  name: "events",
  initialState: {
    sale: null,
    sales: [],
    message: null,
    isLoading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    clearMessages: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // createEvent
    .addCase(createEvent.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(createEvent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.event = action.payload;
      state.success = true;
    })
    .addCase(createEvent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
      // storeGetAllEvents
      .addCase(storeGetAllEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(storeGetAllEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sales = action.payload;
      })
      .addCase(storeGetAllEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // getSingleEvent
      .addCase(getSingleEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sale = action.payload;
      })
      .addCase(getSingleEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // storeDeleteEvent
      // .addCase(storeDeleteEvent.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(storeDeleteEvent.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.message = action.payload;
      // })
      // .addCase(storeDeleteEvent.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.error = action.payload;
      // })

      .addCase(storeDeleteEvent.fulfilled, (state, action) => {
        state.sales = state.sales.filter(
          (product) => product._id !== action.payload
        );
        state.successMessage = "Sale Product deleted successfully!";
      })
      .addCase(storeDeleteEvent.rejected, (state, action) => {
        state.error = action.payload;
      })
      // getAllEvents
      .addCase(getAllEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sales = action.payload;
      })
      .addCase(getAllEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearErrors, clearMessages } = eventSlice.actions;
export default eventSlice.reducer;
