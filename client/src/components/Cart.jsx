import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {addToCart, clearCart, decreaseCart, getTotals, removeFromCart} from '../slices/cartSlice';
import PayButton from './PayButton';


const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);
    

    const handleRemoveFromCart = (cartItem) =>{         //Αφαίρεση βιβλίου από το Cart και ενημέρωση του state
        dispatch(removeFromCart(cartItem));
    }

    const handleDecreaseCart = (cartItem) => {          //Μείωση της ποσότητας ενός βιβλίου που βρίσκεται στο Cart και ενημέρωση του state
        dispatch(decreaseCart(cartItem));
    }

    const handleIncreaseCart = (cartItem) => {
        dispatch(addToCart(cartItem));
    }

    const handleClearCart = () => {           //Άδειασμα του Cart και ενημέρωση του state
        dispatch(clearCart());
    }

    return ( 
        <div className='cart-container'>
            <h2>Shopping Cart</h2>
            {cart.cartItems.length === 0 ? (        //Αν το Cart δεν περιέχει καθόλου βιβλία
                <div className='cart-empty'>
                    <p>Your cart is empty</p>
                    <div className='start-shopping'>
                        <Link to='/'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                            </svg>
                            <span>Back to Store</span>
                        </Link>
                    </div>
                </div>
            ) : (
                <div>
                    <div className='titles'>
                        <h3 className="product-title">Book</h3>
                        <h3 className="price">Price</h3>
                        <h3 className='Quantity'>Quantity</h3>
                        <h3 className='total'>Total</h3>
                    </div>
                    <div className="cart-items">
                        {cart.cartItems &&
                            cart.cartItems.map((cartItem) => (
                            <div className="cart-item" key={cartItem._id}>
                                <div className="cart-product">
                                    <img src={cartItem.image?.url} alt={cartItem.name} />
                                    <div>
                                        <h3>{cartItem.name}</h3>
                                        <p>{cartItem.description}</p>
                                        <button onClick={() => handleRemoveFromCart(cartItem)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="23" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0
                                                    1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5
                                                    0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8
                                                    4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="cart-product-price">{cartItem.price}€</div>
                                <div className="cart-product-quantity">
                                    <button onClick={() => handleDecreaseCart(cartItem)}> - </button>
                                    <div className="count">{cartItem.cartQuantity}</div>
                                    <button onClick={() => handleIncreaseCart(cartItem)}> + </button>
                                </div>
                                <div className="cart-product-total-price">
                                    {cartItem.price * cartItem.cartQuantity}€      {/* Υπολογισμός του συνολικού ποσού ενός βιβλίου ανάλογα με το πλήθος των τεμαχίων */}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='cart-summary'>
                        <button onClick={() => handleClearCart()} className='clear-cart'>Clear Cart</button>
                        <div className='cart-checkout'>
                            <div className='subtotal'>
                                <span>Subtotal</span>
                                <span className='amount'>{cart.cartTotalAmount}€</span>
                            </div>
                            {auth._id ? (                   //Ο χρήστης θα πρέπει να είναι συνδεδεμένος προκειμένου να κάνει checkout
                                <PayButton cartItems={cart.cartItems} />
                                ) : (
                                <button className='cart-login' onClick={() => navigate("/login")}>
                                    Login to checkout
                                </button>
                            )}
                            <div className='continue-shopping'>
                                <Link to='/'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                    </svg>
                                    <span>Back to Store</span>
                                </Link>
                            </div>
                        </div>
                    </div>    
                </div>
            )}
        </div>
    );
}


export default Cart;