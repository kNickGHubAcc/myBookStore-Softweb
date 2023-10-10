import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import {url, setHeaders} from './api';
import {toast} from 'react-toastify';


const initialState = {
    items: [],
    status: null,
    createStatus: null,
    editStatus: null,
    deleteStatus: null,
}


export const productsFetch = createAsyncThunk("products/productsFetch",    //Μέθοδος για την ανάκτηση όλων των βιβλίων που βρίσκονται στη βάση
  async () => {
    try{
      const response = await axios.get(`${url}/products`);
      return response.data;
    }catch(error){
      console.log(error);
    }
  }
);


export const productsCreate = createAsyncThunk("products/productsCreate",    //Μέθοδος για την δημιουργία ενός νέου βιβλίου
  async (values) => {
    try{
      const response = await axios.post(`${url}/products`, values, setHeaders());
      return response.data;
    }catch(error){
      toast(error.response?.data,{
        position: "top-center",
        autoClose: 1300
      });
    }  
  }
);


export const productsEdit = createAsyncThunk("products/productsEdit",     //Μέθοδος για το update των στοιχείων ενός βιβλίου
  async (values) => {
    try {
      const response = await axios.put(`${url}/products/${values.product._id}`,
        values,
        setHeaders()
      );
      return response.data;
    } catch (error) {
      toast.error(error.response?.data, {
        position: "top-center",
        autoClose: 1300,
      });
    }
  }
);


export const productDelete = createAsyncThunk("products/productDelete",     //Μέθοδος για την διαγραφή ενός βιβλίου
  async (id) => {
    try {
      const response = await axios.delete(`${url}/products/${id}`,
        setHeaders()
      );
      return response.data;
    } catch (error) {
      toast.error(error.response?.data, {
        position: "top-center",
        autoClose: 1300,
      });
    }
  }
);


const productsSlice = createSlice({         //Slice του Redux Store που διαχειρίζεται τα βιβλία
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [productsFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [productsFetch.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [productsFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },


    [productsCreate.pending]: (state, action) => {
      state.createStatus = "pending";
    },
    [productsCreate.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.createStatus = "success";
      toast.success("New book created", {
        position: "top-center",
        autoClose: 1300,
      });
    },
    [productsCreate.rejected]: (state, action) => {
      state.createStatus = "rejected";
    },


    [productDelete.pending]: (state, action) => {
      state.deleteStatus = "pending";
    },
    [productDelete.fulfilled]: (state, action) => {
      const newList = state.items.filter(
        (item) => item._id !== action.payload._id
      );
      state.items = newList;
      state.deleteStatus = "success";
      toast.success("Book deleted successfully", {
        position: "top-center",
        autoClose: 1300,
      });
    },
    [productDelete.rejected]: (state, action) => {
        state.deleteStatus = "rejected";
    },


    [productsEdit.pending]: (state, action) => {
      state.editStatus = "pending";
    },
    [productsEdit.fulfilled]: (state, action) => {
      const updatedProducts = state.items.map((product) =>
        product._id === action.payload._id ? action.payload : product
      );
      state.items = updatedProducts;
      state.editStatus = "success";
      toast.success("Book edited successfully", {
        position: "top-center",
        autoClose: 1300,
      });
    },
    [productsEdit.rejected]: (state, action) => {
      state.editStatus = "rejected";
    },
  },
});


export default productsSlice.reducer;