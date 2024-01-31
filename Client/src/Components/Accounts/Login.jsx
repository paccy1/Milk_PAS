/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../../images/RAB_Logo2.png";
import "../../index.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Login = () => {
  const [load, setLoad] = useState();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = () => {
    let error = "";

    if (password.length < 4) {
      error =
        "Password must be at least 8 characters long at least one digit one special character one upper and lowercase letter";
    } else if (!/\d/.test(password)) {
      error = "Digit is missing";
    }
    // else if (!/[!@#$%^&*]/.test(password)) {
    //   error = "Special character is missing";
    // }
    else if (!/[a-z]/.test(password)) {
      error = "Lowercase letter is missing";
    } else if (!/[A-Z]/.test(password)) {
      error = "Uppercase letter is missing";
    }

    setPasswordError(error);
  };

  let token  = localStorage.getItem("token")

  const handleSubmit = (e) => {
    setLoad(true);
    e.preventDefault();
    

    axios({
      method: "POST",
      url: "http://localhost:5680/mpas/authentication/v1/auth/signin",
      data:{
        email: email,
        password: password
      },
      headers: {
        "Content-Type" : "application/json"
      }

    })
    .then((response) =>{
      console.log("respo", response)
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      if(response.data.user.role == "admin"){
        navigate("/dashboard")
      }else{
        navigate("/")
      }
      console.log(response.data.user.role)
      setLoad(false)
    })
    .catch((error) =>{
      console.log("err", error)
    })
  };
  

  return (
    <>
      <div className="wrapper w-full h-screen bg-no-repeat flex justify-center items-center">
        <div className="blue bg-[#009048] w-[27%] h-[80%] rounded-l-md text-white hidden md:flex flex-col justify-between">
          <div className="top flex flex-col space-y-2 justify-center items-center">
            <div className="tit w-1/3 mt-10">
              <img src={img} alt="image" className=" bg-contain" />
            </div>
            <div className="decri px-14 text-3xl font-bold">
              Welcome to MPAS
            </div>
          </div>
          <div className="bootom flex flex-col items-center mb-14">
            <div className="acc flex flex-col items-center py-10">
              Don't have an account?
              <Link to={"/register"}>
                <span className="my-1 underline font-semibold">
                  Get started
                </span>
              </Link>
            </div>
            <div className="foot">© All rights reserved. MMPAS 2024</div>
          </div>
        </div>
        <div className="white bg-white px-10 w-[90%] md:w-[43%] md:h-[80%] rounded-r-md flex flex-col justify-center">
          <div className="top flex flex-col space-y-2 justify-center items-center py-4 md:hidden">
            <div className="tit w-1/3 ">
              <img src={img} alt="image" className=" bg-contain" />
            </div>
            <div className="decri px-1 text-xl md:text-3xl font-bold">Welcome to MPAS</div>
          </div>

          <h1 className="text-4xl font-bold pb-2">Sign In</h1>
          <form className="flex flex-col w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col py-3">
              <label>Email address</label>
              <input
                required
                type="email"
                placeholder="email"
                className="border border-green-700 px-4 py-2 rounded mt-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onInput={validateEmail}
              />
              {/* {emailError && (
                <span className="validation-error">{emailError}</span>
              )} */}
            </div>
            <div className="flex flex-col py-3">
              <label>Password</label>
              <input
                required
                type="password"
                placeholder="password"
                className="border border-green-700 px-4 py-2 rounded mt-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onInput={validatePassword}
              />
              {/* {passwordError && (
                <span className="validation-error">{passwordError}</span>
              )} */}
            </div>

            <span className="text-blue-800 font-semibold underline cursor-pointer">
              Forgot password?
            </span>

            <button className="bg-[#1a8cff] py-1 mt-4 rounded uppercase text-white font-semibold">
              {load ? "Loging in..." : "Login"}
            </button>
          </form>
          <div className="bootom flex flex-col items-center  md:hidden">
            <div className="acc flex flex-col items-center py-10"></div>
            <div className="foot py-2 font-bold">
              © All rights reserved. MPAS 2024
            </div>
          </div>
        </div>

        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
