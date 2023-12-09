import  { useState } from 'react'

import '../App.css';
import axios from 'axios';

import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom'


export default function Login() {
  // const CheckLogin = () => {
  //   axios.get('/user/account/signedin', { withCredentials: true }).then(Response => {
  //     return Response;
  //   }).catch((error) => {
  //     return error
  //   })
  // }

  // console.log(CheckLogin())

  let navigate = useNavigate();

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const [backendResponse, setBackendResponse] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleUsernameInput = (e) => {
    e.preventDefault();
    setFormData({ ...formData, email: e.target.value });
  };
  const handlePasswordInput = (e) => {
    e.preventDefault();
    setFormData({ ...formData, password: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.email) return setBackendResponse("Please enter your email");
    if (!formData.password)
      return setBackendResponse("Please enter your password");

    axios
      .post(
        "/user/login",
        { email: formData.email, password: formData.password },
        { withCredentials: true }
      )
      .then((Response) => {
        setBackendResponse(Response.data.message + " redirecting you to home");
        setTimeout(() => {
          navigate(Response.data.redirectUrl);
        }, 1500);
      })
      .catch((error) => {
        let errMsg = error.response.data.message.replaceAll('"', "");
        setBackendResponse(errMsg);
      });
  };

  return (
    <div
      className="min-h-screen text-gray-300 bg-gray-700 py-6 flex flex-col justify-center 
            sm:py-12"
    >
      <div className="relative py-3 sm:w-96 mx-auto text-center">
        <span className="text-2xl"> Login to your account </span>
        <div className="text-1xl text-gray-500"> {backendResponse} </div>

        <div className="mt-6 bg-white shadow-md rounded-lg text-left">
          <div className="h-2 bg-indigo-400 rounded-t-md "> </div>
          <div className="px-8 py-6">
            <label className="block text-gray-600 font-semibold mt-1">
              {" "}
              Email{" "}
            </label>
            <input
              type="text"
              value={formData.email}
              onChange={handleUsernameInput}
              placeholder="Email"
              className="border w-full h-5 px-3 py-5 mt-2 text-gray-900 hover:outline-none focus:outline-none  focus:ring-1 focus:ring-indigo-300 rounded-md"
            />

            <label required className="block text-gray-600 font-semibold mt-1">
              {" "}
              Password{" "}
            </label>
            <input
              required
              value={formData.password}
              onChange={handlePasswordInput}
              type="password"
              placeholder="Password"
              className="border w-full h-5 px-3 py-5 mt-2 text-gray-900 hover:outline-none focus:outline-none  focus:ring-1 focus:ring-indigo-300 rounded-md"
            />

            <div className="flex justify-between items-baseline">
              <button
                type="submit"
                onClick={handleSubmit}
                className="mt-4 bg-indigo-500 text-white py-2 px-6 rounded-md hover:bg-indigo-600"
              >
                {" "}
                Login{" "}
              </button>
              <Link to="/forgotPassword">
                <div className="text-sm hover:underline text-gray-700">
                  {" "}
                  Forgot Password?{" "}
                </div>{" "}
              </Link>
            </div>
          </div>
        </div>

        <span className="text-1xl mt-2">
          Don't have an account?
          <Link className="text-indigo-400" to="/Register">
            {" "}
            Sign up{" "}
          </Link>
        </span>
      </div>
    </div>
  );
}
