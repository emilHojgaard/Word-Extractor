document.addEventListener("contextmenu", (event) => {
  let selectedText = window.getSelection().toString().trim();

  if (selectedText) {
    // Send the selected text to the background script
    chrome.runtime.sendMessage({ paragraph: selectedText }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Error sending message:", chrome.runtime.lastError);
      } else {
        console.log("Selected text sent to background:", selectedText);
      }
    });
  } else {
    // If no text is selected, fall back to the original paragraph extraction
    const targetElement = document.elementsFromPoint(event.clientX, event.clientY);
    
    if (targetElement.length > 0) {
      let paragraph = targetElement.find(el => el.tagName === "P");
      
      if (paragraph) {
        paragraph = paragraph.textContent.trim();
        
        chrome.runtime.sendMessage({ paragraph: paragraph }, (response) => {
          if (chrome.runtime.lastError) {
            console.error("Error sending message:", chrome.runtime.lastError);
          } else {
            console.log("Paragraph sent to background:", paragraph);
          }
        });
      }
    }
  }
});


// Listen for message from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.paragraph) {
    console.log("Recieved from Service worker", message.paragraph);
    showOverlay(message.paragraph);
  }
});

// Function to create and show the overlay
function showOverlay(text) {
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
    let para = document.createElement("p");
    para.textContent = text;

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
    popup.appendChild(para);
    popup.appendChild(closeBtn);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
  }
}
