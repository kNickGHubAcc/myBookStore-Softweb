import React from 'react'; 
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {addToCart} from '../slices/cartSlice';


const Home = () => {
    const {items: data, status} = useSelector((state) => state.products);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddToCart = (product) =>{       //Προσθήκη βιβλίου στο cart, ανακατεύθυνση στην σελίδα του cart και ενημέρωση του state
      dispatch(addToCart(product));
      navigate("/cart");
    }
    
    return ( 
      <div className="home-container">
        {status === "success" ? (         //Αν τα βιβλία φορτωθούν επιτυχώς στην αρχική σελίδα της εφαρμογής
          <>
            <h2>Welcome to my Book Store</h2>
            <div className="products">
              {data && data?.map((product) => (           //Εμφάνιση όλων των βιβλίων στην αρχική σελίδα της εφαρμογής
                <div key={product._id} className="product">
                  <h3>{product.name}</h3>
                  <img src={product.image?.url} alt={product.name} />
                  <div className="details">
                    <span>{product.description}</span>
                    <span className="price">{product.price}€</span>
                  </div>
                  <button onClick={() => handleAddToCart(product)}>
                    Add To Cart
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : status === "pending" ? (
          <p>Loading...</p>
        ) : (
          <p>Unexpected error occured...</p>
        )}
    </div>
  );
}
 

export default Home;