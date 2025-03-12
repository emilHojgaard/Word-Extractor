document.addEventListener("contextmenu", (event) => {
  const targetElement = document.elementsFromPoint(
    event.clientX,
    event.clientY
  );

  if (targetElement) {
    // Get the top most element (the clicked DOM-element)
    let topElement = targetElement[0]; // ([0] --> the DOM-tree is reversed)
    let childNodesArray = Array.from(topElement.childNodes);
    //Debugging checks:
    console.log("Clicked element is:", topElement.tagName);

    // Makes sure to avoid extracting text from wrong elements:
    if (
      topElement.tagName === "MAIN" ||
      topElement.tagName === "BODY" ||
      topElement.tagName === "ARTICLE" ||
      topElement.tagName === "SECTION" ||
      topElement.tagName === "IMG" ||
      topElement.tagName === "A" ||
      topElement.tagName === "BUTTON" ||
      topElement.tagName === "INPUT"
    ) {
      //debugging log:
      console.log("Clicked element is not a word");
      return;
    }

    //makeing sure that the clicked element contains child-nodes
    //that are text(to not get a rendom container-element by cliking a wierd place on the side)
    let filtered = childNodesArray.filter(
      (node) => node.nodeType === Node.TEXT_NODE
    );
    //debugging check:
    console.log("Text nodes:", filtered);

    //Debugging check:
    if (filtered.length === 0) {
      console.log("Clicked element is not a word");
      return;
    }

    //Gets content of the clicked element
    let paragraph = topElement.innerText;

    // Finding the clicked word
    let extractedWord = getClickedWord(event);

    if (extractedWord) {
      //debugging log:
      console.log("Extracted word:", extractedWord);
      console.log("Extracted paragraph:", paragraph);

      // Sending the paragraph and the clicked word to the background script
      chrome.runtime.sendMessage(
        { paragraph: paragraph, word: extractedWord },
        (response) => {
          if (chrome.runtime.lastError) {
            console.error("Error sending message:", chrome.runtime.lastError);
          }
        }
      );
    }
  }
});

// Function to find the clicked word
function getClickedWord(event) {
  let selection = window.getSelection();
  selection.removeAllRanges(); // clearing any existing text selection // alias for selection.empty() method....

  let range = document.createRange(); // to create a selection around the text
  let textNode = null; // to store the deepest text node at the clicked position
  let offset = 0; // Will store the character index within the text node where the click occured

  // Find the deepest text node at the clicked position
  const nodes = document.elementsFromPoint(event.clientX, event.clientY); // returns all elements stacked at the clicked coordinates
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

  if (!textNode) return null; // the user has clicked on a non-text area

  range.selectNodeContents(textNode); // selects the entire context of the identified text node
  const rects = range.getClientRects(); // gets the bounding boxes of the text in the node ??? not used?!

  // Find the closest character offset
  // The loop moves one character at a time through the text node.
  // It checks if the left and right boundary of the character contains the clicked position (clientX).
  // When a match is found, it stores the index (offset) of the clicked character.
  for (let i = 0; i < textNode.length; i++) {
    range.setStart(textNode, i);
    range.setEnd(textNode, i + 1);
    const rect = range.getBoundingClientRect();
    if (rect.left <= event.clientX && rect.right >= event.clientX) {
      offset = i;
      break;
    }
  }

  // Extracting the word containing the clicked character
  let text = textNode.textContent;
  let before = text.slice(0, offset).split(/\s+/).pop() || "";
  let after = text.slice(offset).split(/\s+/).shift() || "";
  //  text.slice(0, offset) --> gets all characters before the clicked character
  //  .split(/\s+/).pop()  --> regex that splits the text at whitespace and gets the last word before the clicked position.
  //  text.slice(offset) --> gets all characters after the clicked character
  //  .split(/\s+/).shift() --> splits at whitespace and gets the first word after the clicked position.
  return before + after; // combines to reconstruct the full clicked word.
}

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
