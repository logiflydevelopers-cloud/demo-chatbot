import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Header.css";
import { FaUserCircle } from "react-icons/fa";
import logo from "../image/logo.png";

function Header({ user, setUser }) {
  const navigate = useNavigate();
  const location = useLocation();

  const userId = user?._id;

  const goDashboard = () => {
    navigate(`/dashboard/${userId}/train`);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  const goProfile = () => {
    navigate(`/userDetails/${userId}`);
  };

  const handleCustomizeClick = () => {
    if (
      !localStorage.getItem("hasPDF") &&
      !localStorage.getItem("hasQA") &&
      !localStorage.getItem("uploadedWebsite")
    ) {
      alert("⚠️ Please upload FILE, LINK or add Q&A first.");
      return;
    }
    navigate(`/custom-chat/${userId}`);
  };

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

      {/* BLUE TABS */}
      <div className="jf-bluebar">
        <Link
          to={`/dashboard/${userId}/train`}
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
