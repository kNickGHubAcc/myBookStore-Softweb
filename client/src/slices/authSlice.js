import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import {url} from './api';
import jwtDecode from 'jwt-decode';


//Αρχική κατάσταση του Redux store
const initialState = {
  token: localStorage.getItem("token"),     //Ανάκτηση του token από το localStorage
  name: "",
  email: "",
  _id: "",
  isAdmin: "",
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  // userLoaded: false,
}

//Δημιουργία ενός action, με χρήση της createAsyncThunk, για την εγγραφή ενός χρήστη. 
export const registerUser = createAsyncThunk("auth/registerUser",
  async (values, {rejectWithValue}) => {
    try{
      const token = await axios.post(`${url}/register`,       //Αποστολή POST request στον server, με τα δεδομένα εισόδου
      {
        name: values.name,
        email: values.email,
        password: values.password
      });
      localStorage.setItem("token", token.data);      //Αν η εγγραφή είναι επιτυχής, τότε το token αποθηκεύεται στο localstorage
      return token.data;
    }catch(err){
      return rejectWithValue(err.response.data);
    }
  }
);

//Δημιουργία ενός action, με χρήση της createAsyncThunk, για την σύνδεση ενός χρήστη.
export const loginUser = createAsyncThunk("auth/loginUser",
  async (user, {rejectWithValue}) => {
    try{
      const token = await axios.post(`${url}/login`, {
        email: user.email,
        password: user.password
      });
      localStorage.setItem("token", token.data);
      return token.data;
    }catch(err){
      return rejectWithValue(err.response.data);
    }
  }
);

//Slice του Redux Store που διαχειρίζεται την αυθεντικοποίηση του χρήστη
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser(state, action){          //Φορτώνει τα δεδομένα του χρήστη κατά την είσοδο στην εφαρμογή
      const token = state.token;

      if(token){        //Ανάκτηση του token (αν υπάρχει) από το state
        const user = jwtDecode(token);      //Αποκωδικοποίηση του token με σκοπό την ανάκτηση των δεδομένων του χρήστη
        return {            //Ενημέρωση του state με τα δεδομένα του αυθεντικοποιημένου χρήστη
          ...state,
          token,
          name: user.name,
          email: user.email,
          _id: user._id,
          isAdmin: user.isAdmin,
          userLoaded: true,
        };
      }else return { ...state, userLoaded: true };
    },

    logoutUser(state, action){        //Αποσύνδεση του χρήστη
      localStorage.removeItem("token");    //Αφαίρεση του token από το localStorage
      return{           //Επαναφορά στο αρχικό state
        ...state,
        token: "",
        name: "",
        email: "",
        _id: "",
        registerStatus: "",
        registerError: "",
        loginStatus: "",
        loginError: "",
        // userLoaded: false,
      };
    },
  },
  extraReducers: (builder) => {         //Για τα επιπλέον actions που προκύπτουν από τα actions registerUser και loginUser
    builder.addCase(registerUser.pending, (state, action) => {      //Όταν η εγγραφή είναι σε κατάσταση αναμονής
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {    //Αν η εγγραφή ολοκληρωθεί επιτυχώς
      if (action.payload) {
        const user = jwtDecode(action.payload);       //Τα δεδομένα του χρήστη αποκωδικοποιούνται
        return {          //Τα δεδομένα ενημερώνουν καταλλήλως το state του store
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          _id: user._id,
          isAdmin: user.isAdmin,
          registerStatus: "success",
        };
      }else return state;
    });
    builder.addCase(registerUser.rejected, (state, action) => {     //Αν η εγγραφή αποτύχει
      return {
        ...state,
        registerStatus: "rejected",
        registerError: action.payload,
      };
    });

    builder.addCase(loginUser.pending, (state, action) => {
      return { ...state, loginStatus: "pending" };
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if(action.payload) {
        const user = jwtDecode(action.payload);
        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          _id: user._id,
          isAdmin: user.isAdmin,
          loginStatus: "success",
        };
      }else return state;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        loginStatus: "rejected",
        loginError: action.payload,
      };
    });
  },
});


export const {loadUser, logoutUser} = authSlice.actions;
export default authSlice.reducer;