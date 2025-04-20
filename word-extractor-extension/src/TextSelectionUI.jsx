import React from "react";

const TextSelectionUI = ({ text, url, documentTitle, onClick }) => {
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

  const navbarStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    background: "rgba(255, 255, 255, 0.9)",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
    padding: "20px",
    borderRadius: "8px",
    minWidth: "200px",
  };

  return (
    <div id="textOverlay" style={overlayStyle}>
      <div style={popupStyle}>
        <div style={contentStyle}>
          <p style={{ color: "black" }}>{text}</p>
          <button
            style={{
              marginTop: "10px",
              padding: "5px 10px",
              background: "orange",
              color: "white",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
            }}
            onClick={onClick}
          >
            Close
          </button>
        </div>
        <div style={navbarStyle}>
          <button
            style={{
              marginBottom: "20px",
              padding: "10px 20px",
              background: "orange",
              color: "white",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Home
          </button>
          <label
            style={{
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <input type="checkbox" style={{ marginRight: "10px" }} />
            See Translation
          </label>
          <label
            style={{
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <input type="checkbox" style={{ marginRight: "10px" }} />
            Hear Pronunciation
          </label>
        </div>
      </div>
    </div>
  );
};

export default TextSelectionUI;
