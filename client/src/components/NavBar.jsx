import '../App.css';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';
import { logoutUser } from '../slices/authSlice';
import { toast } from 'react-toastify';


const NavBar = () => {
    const dispatch = useDispatch();
    const {cartTotalQuantity} = useSelector(state => state.cart);
    const auth = useSelector(state => state.auth)

    return ( 
        <nav className="nav-bar">
            <Link to="/"><h2>SoftWeb</h2></Link>
            <Link to="/cart">
                <div className="nav-bag">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-cart-fill" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                    <span className="bag-quantity">
                        <span>{cartTotalQuantity}</span>
                    </span>
                </div>
            </Link>
            {auth._id ? (        //Αν ο Customer συνδεθεί επιτυχώς θα εμφανιστούν στο πάνω δεξιά μέρος της μπάρας 2 κουμπιά , Admin και Logout
                <Links>
                    <div>
                        <Link to='/admin/summary'>Admin</Link>        {/* Ανακατεύθυνση στο Menu του Admin (θα αποτύχει λόγω authorization) */}  
                    </div>
                    <div style={{fontWeight: 700, fontSize: "20px"}}
                        onClick={() => {
                            dispatch(logoutUser(null));
                            toast.success("Logged out successfully",{
                                position: "top-center",
                                autoClose: 1300
                            });
                        }}
                        >Logout
                    </div>
                </Links>
            ) : (
                <AuthLinks>
                    <Link to='/login'>Login</Link>
                    <Link to='/register'>Register</Link>
                </AuthLinks>
            )}
        </nav>
    );
}


const AuthLinks = styled.div`
  a {
    &:last-child {
      margin-left: 2rem;
    }
  }
`;
const Links = styled.div`
  color: white;
  display: flex;
  div {
    cursor: pointer;
    &:last-child {
      margin-left: 2rem;
    }
  }
`;


export default NavBar;