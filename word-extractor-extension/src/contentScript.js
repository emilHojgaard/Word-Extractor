import createSmallOverlay from "./smallOverlay";

let selectedText = "";
let isOverlayActive = false;
let selection;
let url;
let documentTitle;

document.addEventListener("mouseup", (event) => {

  // Ignore mouseup events on the small overlay or when the big overlay is active
  if (event.target.id === "smallOverlay" || isOverlayActive) {
    return;
  }

  if (isOverlayActive) return;

  selection = window.getSelection();
  url = window.location.href;
  documentTitle = document.title;

  selectedText = selection.toString();

  if (selectedText.length > 0 && isOverlayActive === false) {
    createSmallOverlay(event.clientX, event.clientY, isOverlayActive, selectedText, selection, url, documentTitle);
  }
});
