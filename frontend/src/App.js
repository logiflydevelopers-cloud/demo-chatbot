import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import UserDetails from "./Components/Auth/UserDetails";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import Home from "./Layout/Home";
import "./Layout/Home.css";
import "./App.css";


function App() {
  const [user, setUser] = useState(null);

  // Fetch user details on app load if access token exists
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const res = await axios.get(
          "https://admin-chatbot-backend.vercel.app/api/auth/getUserDetails",
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setUser(res.data);
      } catch (error) {
        console.log("User not logged in or token expired");
        localStorage.removeItem("accessToken");
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <Router>
      <Header user={user} setUser={setUser} />

      <main className="main-content">
        <Routes>
          {/* Pass user prop so Home can conditionally render form */}
          <Route path="/" element={<Home user={user} />} />

          {/* Redirect logged-in users away from login/register */}
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login setUser={setUser} />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />

          {/* Protect UserDetails route */}
          <Route
            path="/userDetails"
            element={user ? <UserDetails user={user} setUser={setUser} /> : <Navigate to="/login" />}
          />
        </Routes>
      </main>

      {/* <Footer /> */}
    </Router>
  );
}

export default App;
