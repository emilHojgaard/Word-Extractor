import React from "react";
import { createRoot } from "react-dom/client";
import SmallOverlay from "./SmallOverlay.jsx";
import TextSelectionUI from "./TextSelectionUI.jsx";

let selectedText = "";
let isOverlayActive = false;
let selection;
let url;
let documentTitle;

document.addEventListener("mouseup", (event) => {
  if (event.target.id === "smallOverlay" || isOverlayActive) {
    return;
  }

  selection = window.getSelection();
  url = window.location.href;
  documentTitle = document.title;

  selectedText = selection.toString();

  if (selectedText.length > 0 && !isOverlayActive) {
    isOverlayActive = true;

    // Create a container for the React component
    const container = document.createElement("div");
    container.id = "react-overlay-container";
    document.body.appendChild(container);

    const root = createRoot(container);

    // Render the SmallOverlay component
    root.render(
      <SmallOverlay
        x={event.clientX}
        y={event.clientY}
        selectedText={selectedText}
        url={url}
        documentTitle={documentTitle}
        onClick={() => {
          root.unmount(); // Unmount the React component
          container.remove(); // Remove the container from the DOM
          isOverlayActive = false; // Reset the overlay state

          // Render the TextSelectionUI component
          const uiContainer = document.createElement("div");
          uiContainer.id = "react-text-ui-container";
          document.body.appendChild(uiContainer);

          const uiRoot = createRoot(uiContainer);
          uiRoot.render(
            <TextSelectionUI
              text={selectedText}
              url={url}
              documentTitle={documentTitle}
              onClose={() => {
                uiRoot.unmount();
                uiContainer.remove();
                isOverlayActive = false;
              }}
            />
          );
        }}
      />
    );
  }
});
