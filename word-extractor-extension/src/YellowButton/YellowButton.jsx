import React from "react";
import style from "./YellowButton.module.css";

const YellowButton = ({ text, onClick }) => {
  return (
    <button
      // remove this, when we get the style sheets to work
      style={{
        marginBottom: "20px",
        padding: "10px 20px",
        background: "rgb(255, 187, 84)",
        color: "rgb(25, 118, 210)",
        border: "none",
        cursor: "pointer",
        borderRadius: "5px",
        fontSize: "16px",
        fontWeight: "500",
      }}
      className={style.yellowButton}
      onClick={() => {
        onClick
          ? onClick()
          : console.log(`${text} button clicked(no function passed down)`);
      }}
    >
      {text}
    </button>
  );
};

export default YellowButton;
