import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { axiosDefault } from "../../axios.js";
import "./Register.scss";

const cookies = new Cookies();
const initialState = {
  userName: "",
  fullName: "",
  password: "",
  confirmPassword: "",
};
const Register = () => {
  const [form, setForm] = useState(initialState);
  const [errMsg, setErrMsg] = useState("");
  const [isValidMatch, setIsValidMatch] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [success, navigate]);

  useEffect(() => {
    if (!form.password || !form.confirmPassword) return;
    setIsValidMatch(form.password === form.confirmPassword);
  }, [form.password, form.confirmPassword]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form.password === form.confirmPassword);
    if (!isValidMatch) {
      console.log("hey", isValidMatch);
      setErrMsg("Confirm Password Must Match with Password Field!");
      return;
    }
    try {
      const { data } = await axiosDefault.post("signup", form);

      console.log(data);
      const { token, userId, fullName, userName, hashedPassword } = data.user;

      cookies.set("token", token);
      cookies.set("fullName", fullName);
      cookies.set("userId", userId);
      cookies.set("userName", userName);
      cookies.set("hashedPassword", hashedPassword);
      setForm(initialState);
      setErrMsg("");
      setSuccess(true);
    } catch (err) {
      console.log(err);
      setErrMsg("Registration Fail!");
    }
  };
  return (
    <section className="register">
      <div className="register__box">
        {errMsg && <p className="errmsg">{errMsg}</p>}
        <h1 className="heading">Create Account</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__group">
            <label htmlFor="userName" className="form__label">
              Username
            </label>
            <input
              required
              type="text"
              id="userName"
              name="userName"
              className="form__input"
              value={form.userName}
              onChange={handleChange}
            />
          </div>
          <div className="form__group">
            <label htmlFor="fullName" className="form__label">
              FullName
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="form__input"
              onChange={handleChange}
              value={form.fullName}
              required
            />
          </div>
          <div className="form__group">
            <label htmlFor="password" className="form__label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form__input"
              onChange={handleChange}
              value={form.password}
              required
            />
          </div>

          <div className="form__group">
            <label htmlFor="confirmPassword" className="form__label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="form__input"
              onChange={handleChange}
              value={form.confirmPassword}
              required
            />
          </div>

          <button className="btn__signup">SIGN UP</button>
        </form>
        <div className="login__box">
          <p className="text">Have already an account?</p>
          <Link to="/login">
            <span className="btn__login">Login Here</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Register;
