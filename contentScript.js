document.addEventListener("contextmenu", (event) => {
  // getting the topElement (the clicked DOM-element).
  const topElement = document.elementsFromPoint(
    event.clientX,
    event.clientY
  )?.[0]; // [0] --> first element in the list of elements

  if (!topElement || isIgnoredElement(topElement)) return;

  console.log("Clicked element:", topElement.tagName);

  let extractedWord = getClickedWord(event, topElement);
  if (!extractedWord) return;

  let extractedParagraph = topElement.innerText;

  //debugging log:
  console.log("Extracted word:", extractedWord);
  console.log("Extracted paragraph:", extractedParagraph);

  // Sending extracted word and paragraph to the background script
  chrome.runtime.sendMessage(
    { paragraph: extractedParagraph, word: extractedWord },
    (response) => {
      if (chrome.runtime.lastError) {
        console.error("Error sending message:", chrome.runtime.lastError);
      }
    }
  );
});

function isIgnoredElement(element) {
  const ignoredTags = new Set([
    "MAIN",
    "BODY",
    "ARTICLE",
    "SECTION",
    "IMG",
    "A",
    "BUTTON",
    "INPUT",
  ]);

  childArray = Array.from(element.childNodes);
  console.log("ChildArray:", childArray);
  return (
    ignoredTags.has(element.tagName) ||
    !Array.from(element.childNodes).some(
      (node) => node.nodeType === Node.TEXT_NODE
    )
  );
}

// Function to find clicked word
function getClickedWord(event, topElement) {
  let selection = window.getSelection(); // retrieves the current selection of the page (only done to be able to clear any previous selection (removeAllRangers())).
  selection.removeAllRanges(); // clearing any existing text selection // alias for selection.empty() method....
  // Clearing the selection ensures that only the word under the click is considered.

  // A range object is created to manipulate text selections programmatically
  let range = document.createRange();
  let textNode = ""; // to store the first text node found inside TopElement
  let offset = 0; // to track the position of the clicked character

  // Look for the first text node inside the clicked element
  for (const child of topElement.childNodes) {
    if (child.nodeType === Node.TEXT_NODE) {
      textNode += child.innerText;
      break;
    }
  }

  if (!textNode) return null; // Return null if no text is found in the element

  // Selecting the entire text node
  range.selectNodeContents(textNode);

  // Finding the clicked characters position
  let foundOffset = -1;
  // The loop iterates through every character in the textNode
  for (let i = 0; i < textNode.length; i++) {
    range.setStart(textNode, i);
    range.setEnd(textNode, i + 1);
    const rect = range.getBoundingClientRect();
    // If the click is within the bounds of the character
    if (
      rect.left <= event.clientX &&
      rect.right >= event.clientX &&
      rect.top <= event.clientY &&
      rect.bottom >= event.clientY
    ) {
      foundOffset = i;
      break;
    }
  }

  if (foundOffset === -1) return null; // No valid offset was found

  let text = textNode.textContent.trim();
  let before = text.slice(0, foundOffset).split(/\s+/).pop() || "";
  let after = text.slice(foundOffset).split(/\s+/).shift() || "";

  // Clean up punctuation handling (e.g., "word." should return "word")
  let word = before + after;
  return word;
}

//.replace(/[^\w\s]/g, ""); // Remove punctuation around the word

// // Determines the character offset within the text node
// function getCharacterOffset(textNode, clientX) {
//   let range = document.createRange(); // to create a selection around the text

//   // The loop moves one character at a time through the text node.
//   // It checks if the left and right boundary of the character contains the clicked position (clientX).
//   // When a match is found, it returns the index (offset) of the clicked character.
//   for (let i = 0; i < textNode.length; i++) {
//     range.setStart(textNode, i);
//     range.setEnd(textNode, i + 1);
//     const rect = range.getBoundingClientRect();
//     if (rect.left <= clientX && rect.right >= clientX) return i;
//   }
//   return 0;
// }

// Listen for the message from the background script
chrome.runtime.onMessage.addListener((message) => {
  if (message.paragraph && message.word) {
    //debugging log:
    console.log("Recieved from Service worker", message.paragraph);
    console.log("Recieved from Service worker", message.word);
    showOverlay(message.paragraph, message.word);
  }
});

// Listen for message from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.paragraph && message.word) {
    //debugging log:
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
    Object.assign(overlay.style, {
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
    });
    overlay.id = "textOverlay";

    // Create popup box
    let popup = document.createElement("div");
    Object.assign(popup.style, {
      background: "white",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
      textAlign: "center",
      width: "50%",
    });

    // Create paragraph text with the clicked word highlighted
    let overlayParagraph = document.createElement("p");
    overlayParagraph.innerHTML = paragraph.replace(
      new RegExp(`\\b${word}\\b`, "gi"),
      `<b style="color:orange;">${word}</b>`
    );

    // Create close button
    let closeBtn = document.createElement("button");
    Object.assign(closeBtn.style, {
      marginTop: "10px",
      padding: "5px 10px",
      background: "orange",
      color: "white",
      border: "none",
      cursor: "pointer",
      borderRadius: "5px",
    });
    closeBtn.textContent = "Close";
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
