import { useState } from "react";

import "../App.css";
import axios from "axios";




export default function ForgotPassword() {
  const [backendResponse, setBackendResponse] = useState();
  const [email, setEmail] = useState();

  const handleEmailInput = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/user/sendResetEmail", { email: email }, { withCredentials: true })
      .then((Response) => {
        setBackendResponse(Response.data.message);
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
        <span className="text-2xl"> Password Reset </span>
        <div className="text-1xl text-gray-500"> {backendResponse} </div>

        <div className="mt-6 bg-white shadow-md rounded-lg">
          <div className="h-2 bg-indigo-400 rounded-t-md "> </div>
          <div className="px-8 py-6">
            <label className="block text-gray-600 font-semibold mt-1">
              {" "}
              Enter your email{" "}
            </label>
            <input
              type="email"
              value={email}
              onChange={handleEmailInput}
              placeholder="Email"
              className="border w-full h-5 px-3 py-5 mt-2 text-gray-900 hover:outline-none focus:outline-none  focus:ring-1 focus:ring-indigo-300 rounded-md"
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
