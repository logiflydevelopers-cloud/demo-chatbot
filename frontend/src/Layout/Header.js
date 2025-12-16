import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Header.css";
import { FaUserCircle } from "react-icons/fa";
import logo from "../image/logo.png";
import axios from "axios";

function Header({ user, setUser }) {
  const navigate = useNavigate();
  const location = useLocation();
  const apiBase = "https://backend-demo-chatbot.vercel.app";

  const userId = user?._id || user?.id || user?.userId;

  const goDashboard = () => {
    navigate("/dashboard/train");
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    window.location.href = "/login";
  };

  const goProfile = () => {
    if (!userId) return;
    navigate(`/userDetails/${userId}`);
  };

  /* ================= CUSTOMIZE (DB BASED) ================= */
  const handleCustomizeClick = async () => {
    if (!userId) {
      navigate("/login");
      return;
    }

    try {
      const res = await axios.get(
        `${apiBase}/api/chatbot/knowledge-status/${userId}`
      );

      if (!res.data.hasKnowledge) {
        alert("⚠️ Please upload FILE, LINK or add Q&A first.");
        navigate("/dashboard/knowledge");
        return;
      }

      navigate("/custom-chat");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  /* ================= PUBLISH ================= */
  const handlePublishClick = () => {
    if (!localStorage.getItem("chatbotSaved")) {
      alert("⚠️ Please customize and SAVE your chatbot before publishing.");
      return;
    }
    navigate(`/embed-code/${userId}`);
  };

  return (
    <>
      <header className="jf-header">
        <div className="jf-left" onClick={goDashboard}>
          <img src={logo} className="jf-logo" alt="logo" />
        </div>

        <div className="jf-center">
          <h2 className="jf-title">{user?.name}'s AI Assistant</h2>
        </div>

        <div className="jf-right" onClick={goProfile}>
          <FaUserCircle size={34} className="jf-user-icon" />
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          🔒 Logout
        </button>
      </header>

      {/* TOP BAR */}
      <div className="jf-bluebar">
        <Link
          to="/dashboard/train"
          className={`jf-tab ${location.pathname.includes("/train") ? "active" : ""}`}
        >
          TRAIN
        </Link>

        <div
          onClick={handleCustomizeClick}
          className={`jf-tab ${location.pathname.includes("/custom-chat") ? "active" : ""}`}
        >
          CUSTOMIZE
        </div>

        <div
          onClick={handlePublishClick}
          className={`jf-tab ${location.pathname.includes("/embed-code") ? "active" : ""}`}
        >
          PUBLISH
        </div>
      </div>
    </>
  );
}

export default Header;
