import React from "react";
import SideMenu from "./SideMenu/SideMenu.jsx";
import TextContainer from "./TextContainer/TextContainer.jsx";
import MUISwitch from "./toggleSwitch";

const TextSelectionUI = ({ selectionObject, onClick }) => {
  const overlayStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "1000",
  };

  return (
    <div id="textOverlay" style={overlayStyle}>
      <TextContainer text={selectionObject.selectedText} onClick={onClick} />
      <div style={popupStyle}>
        <div style={contentStyle}>
          <p style={{ color: "black" }}>{selectionObject.selectedText}</p>
          <YellowButton text="Close" onClick={onClick} />
        </div>

        <label
          style={{
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        ></label>
        <label
          style={{
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        ></label>
      </div>
      <SideMenu />
    </div>
  );
};

export default TextSelectionUI;
