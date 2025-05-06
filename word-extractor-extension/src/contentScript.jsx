import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import SmallOverlay from "./SmallOverlay.jsx";
import TextSelectionUI from "./TextSelectionUI.jsx";

const selectionObject = {
  selection: null,
  selectedText: "",
  url: "",
  documentTitle: "",
  isOverlayActive: false,
  x: 0,
  y: 0,
};

// container for the React component
const container = document.createElement("div");
container.id = "react-overlay-container";
document.body.appendChild(container);

const root = createRoot(container);

const App = () => {
  useEffect(() => {
    //debugging
    console.log("useEffect called");

    document.addEventListener("mouseup", (event) => {
      if (
        event.target.id === "smallOverlay" ||
        selectionObject.isOverlayActive
      ) {
        return;
      }

      //setting the selection object properties
      selectionObject.x = event.clientX;
      selectionObject.y = event.clientY;
      selectionObject.selection = window.getSelection();
      selectionObject.selectedText = selectionObject.selection
        .toString()
        .trim();
      selectionObject.url = window.location.href;
      selectionObject.documentTitle = document.title;

      // showing small overlay, if selected text
      if (selectionObject.selectedText.length > 0) {
        selectionObject.isOverlayActive = true;

        root.render(
          <SmallOverlay
            selectionObject={selectionObject}
            onClick={handleClick}
            onTimeout={() => {
              //cleaning up the small overlay
              root.render(<></>);
              selectionObject.isOverlayActive = false;
              window.getSelection().removeAllRanges();
            }}
          />
        );
      }
    });

    return () => {
      document.removeEventListener("mouseup", (event) => {});
    };
  }, []);

  let handleClick = (event) => {
    //cleaning up the small overlay
    event.stopPropagation();
    root.render(<></>);
    selectionObject.isOverlayActive = false;
    window.getSelection().removeAllRanges();

    root.render(
      <TextSelectionUI
        selectionObject={selectionObject}
        onClick={() => {
          root.render(<></>);
          selectionObject.isOverlayActive = false;
        }}
      />
    );
  };
};

// Render the App component (allowing use of React)
root.render(<App />);
