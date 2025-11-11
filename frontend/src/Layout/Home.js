import React, { useState } from "react";
import AddWebsiteForm from "./AddWebsiteForm";
import DataDisplay from "./DataDisplay";
import styles from "./Home.css";

const Home = ({ user }) => {
  const [refresh, setRefresh] = useState(false);

  // form submit થયા પછી call થવાનું function
  const handleWebsiteAdded = () => {
    setRefresh((prev) => !prev); // toggle કરી રિફ્રેશ ટ્રિગર કરશે
  };

  return (
    <div className="home-container">
      {!user && <h1 className={styles.title}>Welcome to Your Dashboard</h1>}

      {user ? (
        <>
          <AddWebsiteForm user={user} onWebsiteAdded={handleWebsiteAdded} />

          <hr style={{ margin: "30px 0" }} />

          <DataDisplay user={user} triggerRefresh={refresh} />
        </>
      ) : (
        <p className={styles.loginPrompt}>
          Please <strong>login</strong> to add your website.
        </p>
      )}
    </div>
  );
};

export default Home;
