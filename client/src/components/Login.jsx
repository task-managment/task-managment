import React, { useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "./Header";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  //   const [passwordError, setPasswordError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const validatePassword = (password) => {
  //   const regex =
  //     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
  //   if (!regex.test(password)) {
  //     return "Password must contain at least 8 characters, one lowercase letter, one uppercase letter, one numeric digit, and one special character";
  //   }
  //   return "";
  // };

  const navigate = useNavigate();

  const handleLogin = async () => {
    // const passwordError = validatePassword(formData.password);
    // if (passwordError) {
    //   setPasswordError(passwordError);
    //   return;
    // }
    // setPasswordError("");
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        formData
      );
      console.log("Login successful", response.data);

      Cookies.set("Token", response.data.token);
      Cookies.set("user_id", response.data.user_id);
      //   if (response.data.role == 2) {
      //     setAdmin(true);
      //     Cookies.set("Role", response.data.role);
      //   }
      navigate("/");
      //   Swal.fire({
      //     title: "Welcome to our Website! :)",
      //   });
      // Handle successful login
    } catch (error) {
      console.error("Error logging in", error);
      // Handle login error
      alert("Password or Email wrong");
    }
  };
  return (
    <>
      <Header />
      <div class="py-16">
        <div class="flex w-96 flex-col space-y-5 rounded-lg border py-10 px-5 shadow-xl mx-auto">
          <div class="mx-auto mb-2 space-y-3">
            <h1 class=" text-3xl font-bold text-pink-800">Log into MyToDo</h1>
            <p class="text-gray-500">Login to access your account</p>
          </div>

          <div>
            <div class="relative mt-2 w-full">
              <input
                id="email"
                type="email"
                placeholder="email@gmail.com"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <label
                for="email"
                class="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
              >
                {" "}
                Enter Your Email{" "}
              </label>
            </div>
          </div>

          <div>
            <div class="relative mt-2 w-full">
              <input
                id="password"
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <label
                for="password"
                class="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
              >
                {" "}
                Enter Your Password
              </label>
            </div>
          </div>

          <button
            class="rounded-lg bg-pink-700 hover:bg-pink-800 py-3 font-bold text-white"
            onClick={() => {
              handleLogin();
              // handleButtonClick();
            }}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
