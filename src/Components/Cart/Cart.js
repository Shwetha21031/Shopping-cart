import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  updateTotal,
  clearCart,
} from "../../Redux/cartSlice";
import "./Cart.css";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let cartItems = useSelector((state) => state.cart.cart);
  const total = useSelector((state) => state.cart.totalAmount);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(updateTotal());
    dispatch(updateQuantity());
    console.log(total);
  }, [cartItems]);

  const handlehome = () => {
    navigate("/homePage");
  };

  const handleDecrease = (item) => {
    dispatch(removeFromCart(item));
  };

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cartData"));
    if (cartData) {
      dispatch(updateTotal());
      dispatch(updateQuantity());
    }
  }, []);

  // Save cart items to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cartItems));
  }, [cartItems]);

  cartItems = cartItems.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleclearCart = () => {
    dispatch(clearCart())
    // Clear cart data in localStorage
    localStorage.removeItem("cartData");
  };

  return (
    <div className="cart-main">
      <div>
        <div className="cart-head">
          <input
            type="text"
            placeholder="Search for products here"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="home-btn" onClick={handlehome}>
            Back to home
          </button>
        </div>
      </div>

      <table border={1}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length > 0 ? (
            cartItems?.map((item) => {
              return (
                <tr key={item.id}>
                  <td style={{ fontSize: "12px" }}>
                    <img src={item.image} alt={item.title} />
                    <br></br>
                    {item.title}
                  </td>
                  <td className="changing-btns">
                    <button onClick={() => handleDecrease(item)}>-</button>
                    {item.itemQuantity}
                    <button onClick={() => dispatch(addToCart(item))}>+</button>
                  </td>
                  <td>{item.price}</td>
                  <td>
                    {Math.round(item.itemQuantity * item.price * 100) / 100}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={4} className="no-items">
                No items in the cart
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {
        <div className="total">
          <button onClick={handleclearCart}>Clear cart</button>
          <p>Net Total : {Math.round(total * 10) / 10}</p>
        </div>
      }
    </div>
  );
}

export default Cart;
