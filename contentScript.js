let selectedText = "";
document.addEventListener("mouseup", (event) => {
  let selection = window.getSelection();
  selectedText = selection.toString();
  if (selectedText.length > 0) {
    //debugging log:
    console.log("Selected text:", selectedText);
    // small overlay:
    showSmallOverlay(event.clientX, event.clientY, selectedText);
    //sending to background script:
    chrome.runtime.sendMessage({ selectedText });
    //clearing selection
    selection.removeAllRanges();
  }
});


// Listen for message from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.paragraph) {
    //debugging log:
    console.log("Recieved from Service worker", message.paragraph);
    showOverlay(message.paragraph);
  }
});


// Function to show a small overlay when double-clicking a word:
function showSmallOverlay(x, y, paragraph) {
  // Remove any existing small overlay
  const existingSmallOverlay = document.getElementById("smallOverlay");
  if (existingSmallOverlay) existingSmallOverlay.remove();

  // Create a small overlay (e.g., a floating button)
  const smallOverlay = document.createElement("img");
  smallOverlay.id = "smallOverlay";
  smallOverlay.style.position = "absolute";
  smallOverlay.style.top = `${y + window.scrollY + 10}px`;
  smallOverlay.style.left = `${x + window.scrollX}px`;
  smallOverlay.style.background = "rgba(255, 255, 255, 0.5)";
  smallOverlay.style.padding = "5px 10px";
  smallOverlay.style.borderRadius = "10px";
  smallOverlay.style.border = "1px solid orange";
  smallOverlay.style.cursor = "pointer";
  smallOverlay.style.zIndex = "1000";
  smallOverlay.src = chrome.runtime.getURL("/images/gold-elephant16.png");

  // Append the small overlay to the body
  document.body.appendChild(smallOverlay);

  // Add click event to trigger the main overlay
  smallOverlay.addEventListener("click", () => {
    showOverlay(paragraph);
    smallOverlay.remove(); // Remove the small overlay after clicking
  });

  // Automatically remove the small overlay after a few seconds (optional)
  setTimeout(() => {
    if (smallOverlay) smallOverlay.remove();
  }, 3000);
}

// Function to create and show the overlay
function showOverlay(paragraph) {
  // Check if overlay already exists
  if (!document.getElementById("textOverlay")) {
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
    overlayParagraph.innerHTML = paragraph;
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
    });

    // Append elements
    popup.appendChild(overlayParagraph);
    popup.appendChild(closeBtn);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
  }
}
