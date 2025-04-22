import React from "react";
import styles from "./SideMenu.module.css";
import YellowButton from "../YellowButton/YellowButton.jsx";

const SideMenu = () => {
  return (
    <div
      //inline for now
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        background: "rgba(255, 255, 255, 0.9)",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
        padding: "20px",
        borderRadius: "8px",
        minWidth: "200px",
      }}
      className={styles.sideMenu}
    >
      <YellowButton text="Home" />
      <label
        style={{
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <input type="checkbox" style={{ marginRight: "10px" }} />
        See Translation
      </label>
      <label
        style={{
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <input type="checkbox" style={{ marginRight: "10px" }} />
        Hear Pronunciation
      </label>
    </div>
  );
};

export default SideMenu;
