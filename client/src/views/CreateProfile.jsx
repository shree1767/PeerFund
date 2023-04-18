import axios from "axios";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

const CreateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [redirect, setRedirect] = useState(false);
  const registerUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        date
      });
      // alert("Registration Successfull,Now u can log in");
      setRedirect(true);
    } catch (e) {
      alert(e);
    }
  };


  if(redirect){
    return <Navigate to= '/' />
  }

  return (
    <div className="py-10 mt-32 bg-white text-gray-800">
      <div className="md:ml-60">
        <div className="mt-4 grow flex items-center justify-around ">
          <div className="bg-zinc-800 bg-opacity-80 px-6 py-20 rounded-md">
            <h1 className="text-4xl text-white text-center">Edit Profile</h1>
            <form
              action=""
              onSubmit={registerUser}
              className="max-w-md mx-auto  mt-4"
            >
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="outline-none"
              />
              <input
                type="email"
                placeholder={"Your@email.com"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* <input
                type="radio"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              /> */}
              <input
                type="date"
                placeholder="DOB"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              ></input>
              <button className="primary hover:bg-pink-600 my-4">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
