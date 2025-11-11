import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

// ✅ Components
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import UserDetails from "./Components/Auth/UserDetails";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import Home from "./Layout/Home";
import DataDisplay from "./Layout/DataDisplay";
import CustomChatPage from "./Layout/CustomChatPage";
import EmbedCodePage from "./Layout/EmbedCodePage";
import EmbedChatbotFrame from "./Layout/EmbedChatbotFrame";

import "./Layout/Home.css";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  // ✅ Fetch logged-in user details once on load
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:5678/api/auth/getUserDetails", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
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
      {/* ✅ Navbar/Header */}
      <Header user={user} setUser={setUser} />

      <main className="main-content">
        <Routes>
          {/* 🏠 Home */}
          <Route path="/" element={<Home user={user} />} />

          {/* 🔐 Auth Routes */}
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login setUser={setUser} />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />

          {/* 👤 Protected User Dashboard */}
          <Route
            path="/userDetails"
            element={
              user ? (
                <UserDetails user={user} setUser={setUser} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* 🧠 Chatbot Customization (User-specific) */}
          <Route
            path="/custom-chat/:userId"
            element={
              user ? (
                <CustomChatPage user={user} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* 📜 Embed Code Page */}
          <Route
            path="/embed-code/:userId"
            element={
              user ? (
                <EmbedCodePage user={user} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* 💬 Chatbot Embed Frame — used inside iframe by script */}
          <Route path="/embed/chat/:userId" element={<EmbedChatbotFrame />} />
        </Routes>

        {/* Optional Data Display Component */}
        <DataDisplay />
      </main>

      {/* Optional Footer */}
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
