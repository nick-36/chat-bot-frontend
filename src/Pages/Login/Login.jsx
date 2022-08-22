import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import "./Login.scss";

const cookies = new Cookies();
const Login = () => {
  const initialState = {
    userName: "",
    password: "",
  };
  const [user, setUser] = useState(initialState);
  const navigate = useNavigate();
  const authToken = cookies.get("token");

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_DEV_SERVER_URL}login`,
        user
      );
      const { token, fullName, userId, userName, hashedPassword } = data.user;

      cookies.set("token", token);
      cookies.set("fullName", fullName);
      cookies.set("userId", userId);
      cookies.set("userName", userName);
      cookies.set("hashedPassword", hashedPassword);
      setUser(initialState);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (authToken) {
      navigate("/");
    }
  }, [authToken, navigate]);
  return (
    <div className="section__login">
      <div className="login__box">
        <p className="login__text">
          Use "pratik" as Username And Password For Login
        </p>
        <form className="form">
          <div className="form__group">
            <input
              type="text"
              className="form__input"
              id="userName"
              name="userName"
              placeholder="Username"
              onChange={handleChange}
              value={user.userName}
              autoComplete="off"
              required
            />
            <label htmlFor="userName" className="form__label">
              Username
            </label>
          </div>
          <div className="form__group">
            <input
              type="password"
              className="form__input"
              id="password"
              placeholder="Password"
              autoComplete="off"
              name="password"
              onChange={handleChange}
              value={user.password}
              required
            />
            <label htmlFor="password" className="form__label">
              Password
            </label>
          </div>

          <div className="form__group-btn ">
            <Link to="/">
              <button type="submit" className="btn" onClick={handleSubmit}>
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className=" btn btn--green">Register</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
