document.addEventListener("contextmenu", (event) => {
  const targetElement = document.elementsFromPoint(
    event.clientX,
    event.clientY
  );

  if (targetElement.length > 0) {
    // Getting the topmost element ([0], because the DOM-tree is reversed)
    let topElement = targetElement[0];

    // Getting paragraph text
    let paragraph = topElement.textContent;

    // Finding the clicked word
    let extractedWord = getClickedWord(event);

    if (extractedWord) {
      console.log("Extracted word:", extractedWord);
      console.log("Extracted paragraph:", paragraph);

      // Sending the paragraph and the clicked word to the background script
      chrome.runtime.sendMessage(
        { paragraph: paragraph, word: extractedWord },
        (response) => {
          if (chrome.runtime.lastError) {
            console.error("Error sending message:", chrome.runtime.lastError);
          } else {
            console.log("Word send to background:", extractedWord);
            console.log("Paragraph sent to background:", paragraph);
          }
        }
      );
    }
  }
});

// Function to find the clicked word
function getClickedWord(event) {
  let selection = window.getSelection();
  selection.removeAllRanges();

  let range = document.createRange();
  let textNode = null;
  let offset = 0;

  // Find the deepest text node at the clicked position
  const nodes = document.elementsFromPoint(event.clientX, event.clientY);
  for (const node of nodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      textNode = node;
      break;
    } else if (node.childNodes.length > 0) {
      for (const child of node.childNodes) {
        if (child.nodeType === Node.TEXT_NODE) {
          textNode = child;
          break;
        }
      }
    }
    if (textNode) break;
  }

  if (!textNode) return null;

  range.selectNodeContents(textNode);
  const rects = range.getClientRects();

  // Find the closest character offset
  for (let i = 0; i < textNode.length; i++) {
    range.setStart(textNode, i);
    range.setEnd(textNode, i + 1);
    const rect = range.getBoundingClientRect();
    if (rect.left <= event.clientX && rect.right >= event.clientX) {
      offset = i;
      break;
    }
  }

  let text = textNode.textContent;
  let before = text.slice(0, offset).split(/\s+/).pop() || "";
  let after = text.slice(offset).split(/\s+/).shift() || "";

  return before + after;
}

// Listen for message from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.paragraph && message.word) {
    console.log("Recieved from Service worker", message.paragraph);
    console.log("Recieved from Service worker", message.word);
    showOverlay(message.paragraph, message.word);
  }
});

// Function to create and show the overlay
function showOverlay(paragraph, word) {
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

    // Highlight the clicked word in bold
    let highlightedText = paragraph.replace(
      new RegExp(`\\b${word}\\b`, "gi"),
      `<b style="color:orange;">${word}</b>`
    );

    // Create paragraph text
    let overlayParagraph = document.createElement("p");
    overlayParagraph.innerHTML = highlightedText;
    console.log("this is the highlightedText", overlayParagraph.innerText);

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
