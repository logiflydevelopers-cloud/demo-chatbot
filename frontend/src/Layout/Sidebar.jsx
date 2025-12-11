import { NavLink, useParams } from "react-router-dom";
import "./dashboard.css";

const Sidebar = () => {
  const { userId } = useParams();

  return (
    <div className="sidebar">
      <NavLink to={`/dashboard/${userId}/persona`} className="side-item">
        <span>🤖</span> AI PERSONA
      </NavLink>

      <NavLink to={`/dashboard/${userId}/knowledge`} className="side-item">
        <span>📘</span> KNOWLEDGE BASE
      </NavLink>

      <NavLink to={`/dashboard/${userId}/teach`} className="side-item">
        <span>💬</span> TEACH YOUR AGENT
      </NavLink>
    </div>
  );
};

export default Sidebar;
