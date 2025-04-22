import React from "react";
import YellowButton from "../YellowButton/YellowButton.jsx";

const TextContainer = ({ text, onClick }) => {
  return (
    <div
      style={{
        flex: "1",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "white",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
        width: "60%",
        maxWidth: "800px",
        overflow: "hidden",
        padding: "20px",
        paddingBottom: "5px",
      }}
    >
      <div
        style={{
          flex: "1",
          overflowY: "auto", // Enables vertical scrolling if content overflows
          textAlign: "justify",
          margin: "0 20px",
          lineHeight: "1.6",
          fontSize: "18px",
        }}
      >
        {text}
      </div>

      <div
        style={{
          marginTop: "10px",
          marginBottom: "0px",
        }}
      >
        <YellowButton text="Close" onClick={onClick} />
      </div>
    </div>
  );
};

export default TextContainer;
