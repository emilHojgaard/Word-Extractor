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
      <SideMenu />
    </div>
  );
};

export default TextSelectionUI;
