import React, { useEffect, useRef } from "react";

const SmallOverlay = ({ x, y, selectedText, url, documentTitle, onClose }) => {
  const overlayRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Auto-dismiss after 5 seconds
    timeoutRef.current = setTimeout(() => {
      if (onClose) onClose();
    }, 5000);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [onClose]);

  const handleClick = () => {
    chrome.runtime.sendMessage({
      type: "SELECTED_TEXT",
      selectedText,
      url,
      documentTitle,
    });

    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    }

    if (onClose) onClose();

    // Launch any follow-up UI
    textSelectionUI(selectedText, url, documentTitle);
  };

  return (
    <img
      ref={overlayRef}
      id="smallOverlay"
      onClick={handleClick}
      src={chrome.runtime.getURL("/images/gold-elephant16.png")}
      style={{
        position: "absolute",
        top: `${y + window.scrollY}px`,
        left: `${x + window.scrollX}px`,
        background: "rgba(255, 255, 255, 0.5)",
        padding: "5px 10px",
        borderRadius: "10px",
        border: "1px solid orange",
        cursor: "pointer",
        zIndex: 1000,
      }}
    />
  );
};

export default SmallOverlay;

// // smallOverlay function
// export default function createSmallOverlay(
//   x,
//   y,
//   isOverlayActive,
//   selectedText,
//   url,
//   documentTitle
// ) {
//   // Remove any existing small overlay
//   const existingSmallOverlay = document.getElementById("smallOverlay");
//   if (existingSmallOverlay) {
//     existingSmallOverlay.remove();
//     isOverlayActive = false;
//   }

//   //Create a new small overlay
//   const smallOverlay = document.createElement("img");
//   smallOverlay.id = "smallOverlay";
//   smallOverlay.style.position = "absolute";
//   smallOverlay.style.top = `${y + window.scrollY}px`;
//   smallOverlay.style.left = `${x + window.scrollX}px`;
//   smallOverlay.style.background = "rgba(255, 255, 255, 0.5)";
//   smallOverlay.style.padding = "5px 10px";
//   smallOverlay.style.borderRadius = "10px";
//   smallOverlay.style.border = "1px solid orange";
//   smallOverlay.style.cursor = "pointer";
//   smallOverlay.style.zIndex = "1000";
//   smallOverlay.src = chrome.runtime.getURL("/images/gold-elephant16.png");

//   document.body.appendChild(smallOverlay);
//   isOverlayActive = true;

//   // Saved in variable to be able to clear it onClick:
//   let timeoutId = setTimeout(() => {
//     if (smallOverlay) {
//       smallOverlay.remove();
//       isOverlayActive = false;
//       // Debugging log:
//       console.log("isoverlayactive(timeout) " + isOverlayActive);
//     }
//   }, 5000);

//   smallOverlay.addEventListener("click", (event) => {
//     // Send selected text, URL and documentTitle to the background script
//     chrome.runtime.sendMessage({
//       type: "SELECTED_TEXT",
//       selectedText: selectedText,
//       url: url,
//       documentTitle: documentTitle,
//     });

//     //cleanUp
//     selection.removeAllRanges();
//     smallOverlay.remove();
//     clearTimeout(timeoutId);
//     isOverlayActive = false;

//     //text UI
//     textSelectionUI(selectedText, url, documentTitle);
//   });
// }
