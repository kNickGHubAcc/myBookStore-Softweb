import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const initialState = {
  cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({       //Slice του Redux Store που διαχειρίζεται το cart
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {        //Για την προσθήκη βιβλίων στο cart
      const itemIndex = state.cartItems.findIndex((item) => item._id === action.payload._id);    //Εύρεση του βιβλίου με βάση το id

      if (itemIndex >= 0) {       //Αν το βιβλίο υπάρχει ήδη στο cart, αυξάνεται το πλήθος
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.info(`"${state.cartItems[itemIndex].name}" quantity increased`, {
          position: "top-center",
          autoClose: 1300,
        })
      }else{          //Αν δεν υπάρχει, τότε προστίθεται στο cart
        let tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.info(`"${action.payload.name}" added to cart`, {
          position: "top-center",
          autoClose: 1300,
        })
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));     //Αποθήκευση του cart στο localStorage
    },

    removeFromCart(state, action){      //Για την αφαίρεση βιβλίων από το Cart
      const nextCartItems = state.cartItems.filter(       //Φιλτράρισμα του cart με σκοπό την διαγραφή συγκεκριμένου βιβλίου
        cartItem => cartItem._id !== action.payload._id
      )
      state.cartItems = nextCartItems; 
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));     //Αποθήκευση του νέου cart στο localStorage
      toast.info(`"${action.payload.name}" removed from cart`, {
        position: "top-center",
        autoClose: 1300,
      });
    },

    decreaseCart(state, action){        //Για την μείωση του πλήθους ενός βιβλίου στο cart
      const itemIndex = state.cartItems.findIndex(        //Εύρεση του βιβλίου με βάση το id
        cartItem => cartItem._id === action.payload._id
      )
      if(state.cartItems[itemIndex].cartQuantity > 1){        //Αν το πλήθος > 1, τότε μειώνεται κατά 1
        state.cartItems[itemIndex].cartQuantity -= 1
        toast.info(`"${action.payload.name}" quantity decreased`, {
          position: "top-center",
          autoClose: 1300,
        });
      }else if(state.cartItems[itemIndex].cartQuantity === 1){    //Αν το πλήθος είναι === 1, τότε αφαιρείται τελείως
        const nextCartItems = state.cartItems.filter(
          (cartItem) => cartItem._id !== action.payload._id
        )
        state.cartItems = nextCartItems; 
        toast.info(`"${action.payload.name}" removed from cart`, {
          position: "top-center",
          autoClose: 1300,
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));       //Αποθήκευση του 'νέου' cart στο localStorage
    },

    clearCart(state, action) {        //Για το άδειασμα του cart
      state.cartItems = [];
      toast.success("Cart cleared successfully", {
        position: "top-center",
        autoClose: 1300
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    
    getTotals(state, action) {        //Για τον υπολογισμό του συνολικού ποσού αλλά και του συνολικού πλήθους βιβλίων
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;
          return cartTotal;
        },{
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
});


export const { addToCart, removeFromCart, decreaseCart, clearCart, getTotals } = cartSlice.actions;
export default cartSlice.reducer;