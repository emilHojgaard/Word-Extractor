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
        boxShadow: "10px 0 10px rgba(0, 0, 0, 0.3)",
        padding: "20px",
        paddingBottom: "0px",
        borderTopRightRadius: "8px",
        borderBottomRightRadius: "8px",
        width: "185px",
        justifyContent: "space-between",
      }}
      className={styles.sideMenu}
    >
      <div>
        <YellowButton text="Home" />
      </div>
      <div
        style={{
          flexDirection: "column",
          display: "flex",
        }}
      >
        <MUISwitch label="See Translation" />
        <MUISwitch label="Hear Pronunciation" />
      </div>
    </div>
  );
};

export default SideMenu;
