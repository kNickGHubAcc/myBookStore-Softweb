import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url, setHeaders } from "./api";
import { toast } from "react-toastify";

const initialState = {
  list: [],
  status: null,
  deleteStatus: null,
};

export const usersFetch = createAsyncThunk("users/usersFetch", async () => {      //Μέθοδος για την ανάκτηση όλων των χρηστών της βάσης
  try {
    const response = await axios.get(`${url}/users`, setHeaders());
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const userDelete = createAsyncThunk("users/userDelete", async (id) => {      //Μέθοδος για την διαγραφή ενός χρήστη
  try {
    const response = await axios.delete(`${url}/users/${id}`, setHeaders());
    return response.data;
  } catch (error) {
    toast.error(error.response?.data, {
      position: "top-center",
      autoClose: 1300,
    });
  }
});

const usersSlice = createSlice({          //Slice του Redux Store που διαχειρίζεται τους χρήστες
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [usersFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [usersFetch.fulfilled]: (state, action) => {
      state.list = action.payload;
      state.status = "success";
    },
    [usersFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },

    
    [userDelete.pending]: (state, action) => {
      state.deleteStatus = "pending";
    },
    [userDelete.fulfilled]: (state, action) => {
      const newList = state.list.filter(
        (user) => user._id !== action.payload._id
      );
      state.list = newList;
      state.deleteStatus = "success";
      toast.success("User deleted successfully", {
        position: "top-center",
        autoClose: 1300,
      });
    },
    [userDelete.rejected]: (state, action) => {
      state.deleteStatus = "rejected";
    },
  },
});


export default usersSlice.reducer;