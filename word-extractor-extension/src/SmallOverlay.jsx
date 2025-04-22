import React from "react";
import { useEffect } from "react";

const SmallOverlay = ({ selectionObject, onClick, root }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      //cleaning up the small overlay
      root.render(<></>);
      selectionObject.isOverlayActive = false;
      window.getSelection().removeAllRanges();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const style = {
    position: "absolute",
    top: `${selectionObject.y + window.scrollY}px`,
    left: `${selectionObject.x + window.scrollX}px`,
    background: "rgba(255, 255, 255, 0.5)",
    padding: "5px 10px",
    borderRadius: "10px",
    border: "1px solid orange",
    cursor: "pointer",
    zIndex: "1000",
  };

  return (
    <img
      id="smallOverlay"
      src={chrome.runtime.getURL("/images/gold-elephant16.png")}
      style={style}
      onClick={onClick}
      alt="Small Overlay"
    />
  );
};

export default SmallOverlay;
