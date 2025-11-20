import React from "react";
import styles from "./Home.css";

const Home = ({ user }) => {
  return (
    <div className="home-container">
      {!user && (
        <>
          <h1 className={styles.title}>Welcome to Your Dashboard</h1>
          <p className={styles.loginPrompt}>
            Please <strong>login</strong> to continue.
          </p>
        </>
      )}

      {user && (
        <>
          <h1 className={styles.title}>Welcome {user.name}</h1>
          <p className={styles.loginPrompt}>
            Go to <a href="/add-website">Add Website</a> to continue.
          </p>
        </>
      )}
    </div>
  );
};

export default Home;
