import React from "react";
import YellowButton from "./YellowButton/YellowButton.jsx";
import SideMenu from "./SideMenu/SideMenu.jsx";

const TextSelectionUI = ({ selectionObject, onClick }) => {
  const overlayStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "1000",
  };

  const popupStyle = {
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
    display: "flex",
    flexDirection: "row",
    gap: "20px",
    width: "60%",
    maxWidth: "800px",
    textAlign: "left",
  };

  const contentStyle = {
    flex: "1",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div id="textOverlay" style={overlayStyle}>
      <div style={popupStyle}>
        <div style={contentStyle}>
          <p style={{ color: "black" }}>{selectionObject.selectedText}</p>
          <YellowButton text="Close" onClick={onClick} />
        </div>
        <SideMenu />
      </div>
    </div>
  );
};

export default TextSelectionUI;
