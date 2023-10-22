import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  filterByCategory,
  sortAsc,
  sortDsc,
  getAllProducts,
} from "../../Redux/ProductsSlice";
import { addToCart, updateQuantity } from "../../Redux/cartSlice";
import { search } from "../../Redux/ProductsSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {  BsCart3 } from "react-icons/bs";
import "./HomePage.css";
import img from "./logoo.jpeg";
import { Modal } from "bootstrap";
const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector((state) => state.login.userName);
  let items = useSelector((state) => state.products.temp);
  let load = useSelector((state) => state.products.status);
  let itemsQuantity = useSelector((state) => state.cart.quantity);
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(getAllProducts());
  }, []);

  // console.log(items)

  const handleLogout = () => {
    navigate("/");
    toast.error("logged out", {
      position: "top-right",
      autoClose: 1000,
    });
  };

  const handleCart = () => {
    navigate("/homePage/Cart");
  };
  const handleAddtoCart = (item) => {
    console.log(item);
    dispatch(addToCart(item));
    dispatch(updateQuantity());
  };

  const handleSearching = (txt) => {
    let text = txt.toLowerCase();
    dispatch(search(text));
  };

  return (
    <>
      <div className="home-main">
        <div className="header">
          <div className="welcome">
            <p>
              Welcome <span className="name">{userName}</span>
            </p>
          </div>

          <div className="logo">
            <img src={img} />
          </div>

          <div>
            <button onClick={handleCart} className="cart">
              <BsCart3 /> <span className="quantity">{itemsQuantity}</span>
            </button>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>

        <div className="sortContainer">
          <p>Sort by price</p>
          <button onClick={() => dispatch(sortAsc())}>Low to High</button>
          <button onClick={() => dispatch(sortDsc())}>High to Low</button>

          <div>
            <input
              type="text"
              placeholder="search for products here"
              onChange={(e) => handleSearching(e.target.value)}
            />
          </div>
        </div>

        <div className="productsCategory">
          <button onClick={() => dispatch(getAllProducts())}>
            Get all products
          </button>
          <button onClick={() => dispatch(filterByCategory(`men's clothing`))}>
            Mens Clothing
          </button>
          <button onClick={() => dispatch(filterByCategory(`jewelery`))}>
            Jewellery
          </button>
          <button onClick={() => dispatch(filterByCategory("electronics"))}>
            Electronics
          </button>
          <button
            onClick={() => dispatch(filterByCategory(`women's clothing`))}
          >
            Womens Clothing
          </button>
        </div>

        <div className="product-container">
          {load === "pending" ? (
            <h1 className="loading">...loading</h1>
          ) : items.length > 0 ? (
            items.map((item) => {
              return (
                <Link>
                  <div className="product-card" key={item.id}>
                    <p className="title">{item.title}</p>
                    <img src={item.image} />

                    <div className="details">
                      <span className="desc">{item.description}</span>
                      <br></br>
                      <span className="price">$ {item.price}</span>
                      <span
                        className="cart-btn"
                        onClick={() => handleAddtoCart(item)}
                      >
                        <button>Add to Cart</button>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="no-items">No items available</div>
          )}

        </div>
      </div>
    </>
  );
};

export default HomePage;
