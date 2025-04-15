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
    createSmallOverlay(event.clientX, event.clientY, isOverlayActive, selectedText, url, documentTitle);
  }
});

// smallOverlay function
function createSmallOverlay(x, y, isOverlayActive, selectedText, url, documentTitle) {
  // Remove any existing small overlay
  const existingSmallOverlay = document.getElementById("smallOverlay");
  if (existingSmallOverlay) {
    existingSmallOverlay.remove();
    isOverlayActive = false;
  }

  //Create a new small overlay
  const smallOverlay = document.createElement("img");
  smallOverlay.id = "smallOverlay";
  smallOverlay.style.position = "absolute";
  smallOverlay.style.top = `${y + window.scrollY}px`;
  smallOverlay.style.left = `${x + window.scrollX}px`;
  smallOverlay.style.background = "rgba(255, 255, 255, 0.5)";
  smallOverlay.style.padding = "5px 10px";
  smallOverlay.style.borderRadius = "10px";
  smallOverlay.style.border = "1px solid orange";
  smallOverlay.style.cursor = "pointer";
  smallOverlay.style.zIndex = "1000";
  smallOverlay.src = chrome.runtime.getURL("/images/gold-elephant16.png");

  document.body.appendChild(smallOverlay);
  isOverlayActive = true;

  // Saved in variable to be able to clear it onClick:
  let timeoutId = setTimeout(() => {
    if (smallOverlay) {
      smallOverlay.remove();
      isOverlayActive = false;
      // Debugging log:
      console.log("isoverlayactive(timeout) " + isOverlayActive);
    }
  }, 5000);

  smallOverlay.addEventListener("click", (event) => {
    // Send selected text, URL and documentTitle to the background script
    chrome.runtime.sendMessage({
      type: "SELECTED_TEXT",
      selectedText: selectedText,
      url: url,
      documentTitle: documentTitle
    });

    //cleanUp
    selection.removeAllRanges();
    smallOverlay.remove();
    clearTimeout(timeoutId);
    isOverlayActive = false;

    //text UI 
    textSelectionUI(selectedText, url, documentTitle);
  });


}


// textSelection UI function
function textSelectionUI(text, url, documentTitle) {
  // Check if overlay already exists
  if (!document.getElementById("textOverlay")) {
    isOverlayActive = true;

    // Create overlay element
    let overlay = document.createElement("div");
    overlay.id = "textOverlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(0, 0, 0, 0.5)";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "1000";

    // Create popup box
    let popup = document.createElement("div");
    popup.style.background = "white";
    popup.style.padding = "20px";
    popup.style.borderRadius = "8px";
    popup.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.3)";
    popup.style.textAlign = "center";
    popup.style.width = "50%";

    // Create paragraph text
    let overlayParagraph = document.createElement("p");
    overlayParagraph.innerHTML = text;
    overlayParagraph.style.color = "black";

    // Create close button
    let closeBtn = document.createElement("button");
    closeBtn.textContent = "Close";
    closeBtn.style.marginTop = "10px";
    closeBtn.style.padding = "5px 10px";
    closeBtn.style.background = "orange";
    closeBtn.style.color = "white";
    closeBtn.style.border = "none";
    closeBtn.style.cursor = "pointer";
    closeBtn.style.borderRadius = "5px";
    closeBtn.addEventListener("click", () => {
      overlay.remove();
      isOverlayActive = false;
    });

    // Append elements
    popup.appendChild(overlayParagraph);
    popup.appendChild(closeBtn);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
  }
}



