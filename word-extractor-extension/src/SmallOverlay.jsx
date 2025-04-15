import React from "react";

const SmallOverlay = ({ x, y, selectedText, url, documentTitle, onClose }) => {
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
            onClick={onClose}
            alt="Small Overlay"
        />
    );
};

export default SmallOverlay;