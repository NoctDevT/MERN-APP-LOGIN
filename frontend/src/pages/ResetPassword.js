import { useState} from 'react'

import '../App.css';
import axios from 'axios';
import queryString from "query-string"






export default function ResetPassword() {
    const queryParams = queryString.parse(window.location.search);
  
    const resetToken = queryParams.token;
    const email = queryParams.email;
  
    const [backendResponse, setBackendResponse] = useState("");
    const [password, setPassword] = useState();
  
    const handlePasswordInput = (e) => {
      e.preventDefault();
  
      setPassword(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      axios
        .post(
          "/user/resetPassword",
          { email: email, password: password, token: resetToken },
          { withCredentials: true }
        )
        .then((Response) => {
          setBackendResponse(Response.data.message + " redirecting you to home");
        })
        .catch((err) => {
          setBackendResponse(err.data.message);
        });
    };
  
    return (
      <div
        className="min-h-screen text-gray-300 bg-gray-700 py-6 flex flex-col justify-center 
      sm:py-12"
      >
        <div className="relative py-3 sm:w-96 mx-auto text-center">
          <span className="text-2xl"> Password Reset </span>
          <div className="text-1xl text-gray-500"> {backendResponse} </div>
  
          <div className="mt-6 bg-white shadow-md rounded-lg">
            <div className="h-2 bg-indigo-400 rounded-t-md "> </div>
            <div className="px-8 py-6">
              <label required className="block text-gray-800 font-semibold mt-1">
                {" "}
                Password{" "}
              </label>
              <input
                required
                value={password}
                onChange={handlePasswordInput}
                type="password"
                placeholder="Password"
                className="border w-full h-5 px-3 py-5 mt-2 
              text-gray-900
               hover:outline-none focus:outline-none  focus:ring-1 focus:ring-indigo-300 rounded-md"
              />
  
              <div className="flex justify-center items-baseline">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="mt-4 bg-indigo-500 text-white py-2 px-6 rounded-md hover:bg-indigo-600 center"
                >
                  {" "}
                  Send{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  