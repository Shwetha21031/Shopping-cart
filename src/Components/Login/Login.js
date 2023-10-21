import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setName, setUserDetails } from "../../Redux/loginSlice";
import axios from "axios";
import './Login.css'

function Login() {
  const users = useSelector((state) => state.login.users);
  let name = useSelector((state)=>state.login.userName)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tempuname, setTempuname] = useState("");
  const [temppwd, setTempPwd] = useState("");

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      const user = res.data;
      const userss = user.map((u) => ({
        username: u.name,
        password: u.email,
      }));
      console.log(userss);
      dispatch(setUserDetails(userss));
    });
   
    // console.log(users);
    // console.log(users[0], "array");
  }, []);
  const handleLogin = () => {
    const user = users.find((u) => u.username === tempuname);

    if (user) {
      if (user.password === temppwd) {
        toast.success("Logged in successfully", {
          position: "bottom-left",
          autoClose: 500,
        });
        
        dispatch(setName(tempuname));
        console.log('name set to' , name)
        navigate("/homePage");

      } else {
        toast.error("Incorrect password", {
          position: "bottom-left",
          autoClose: 500,
        });
      }
    } else {
      toast.error("User not found", {
        position: "bottom-left",
        autoClose: 500,
      });
    }
  };

  const handleRegister = () => {
    navigate("/Register");
  };

  return (
    <div className="login-main">
      <div className="Login-container">
        <input
          type="text"
          placeholder="enter username"
          onChange={(e) => setTempuname(e.target.value)}
        />
        <br></br>
        <input
          type="text"
          placeholder="enter password"
          onChange={(e) => setTempPwd(e.target.value)}
        />
        <br></br>
        <button onClick={handleLogin}>Login</button>

        <br></br>
        <button onClick={handleRegister}>Register </button>
      </div>
    </div>
  );
}

export default Login;
