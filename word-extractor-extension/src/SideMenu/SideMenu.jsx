import React from "react";
import styles from "./SideMenu.module.css";
import MUISwitch from "../toggleSwitch";
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
        </label>
        <MUISwitch label="See Translation" />
      
        <label
        style={{
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <MUISwitch label="Hear Pronunciation" />
      </label>
  

    </div>
  );
};

export default SideMenu;
