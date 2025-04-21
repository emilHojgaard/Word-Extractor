import React, { useEffect } from "react";

const SmallOverlay = ({ x, y, onClick, onTimeout }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onTimeout();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onTimeout]);

  const style = {
    position: "absolute",
    top: `${y + window.scrollY}px`,
    left: `${x + window.scrollX}px`,
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
