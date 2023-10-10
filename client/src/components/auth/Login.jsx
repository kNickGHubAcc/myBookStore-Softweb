import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../slices/authSlice";
import { StyledForm } from "./StyledForm";


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });


  useEffect(() => {
    if (auth._id) {             //Αν κατά το login, ο χρήστης αυθεντικοποιηθεί επιτυχώς
      navigate("/");            //Αποκτά πρόσβαση και συγκεκριμένα μεταφέρεται στην αρχική σελίδα ('/')
    }
  }, [auth._id, navigate]);
  

  const handleSubmit = (e) => {         //Σύνδεση του χρήστη και ενημέρωση του store καταλλήλως
    e.preventDefault();
    dispatch(loginUser(user));
  };

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button> 
          {auth.loginStatus === "pending" ? "Submitting..." : "Login"}          {/* Τιμή που παίρνει το κουμπί ανάλογα με το αν η προσπάθεια σύνδεσης είναι επιτυχής */}
        </button>
        {auth.loginStatus === "rejected" ? (
          <p>{auth.loginError}</p>
        ) : null}
      </StyledForm>
    </>
  );
};


export default Login;