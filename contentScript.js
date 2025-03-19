document.addEventListener("dblclick", (event) => {
  const topElement = document.elementsFromPoint(
    event.clientX,
    event.clientY
  )?.[0];

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
    topElement.tagName === "INPUT" ||
    topElement.tagName === "FIGURE"
  ) {
    showOverlay("You have to click a word", "word");
    //debugging log:
    console.log("Clicked element is not a word");
    return;
  }

  //making sure that the clicked element contains child-nodes
  //that are text(to not get a random container-element by cliking a weird place on the side)
  let childNodesArray = Array.from(topElement.childNodes);
  //debugging check:
  console.log("Unfiltered child nodes:", childNodesArray);

  let filtered = childNodesArray.filter(
    (node) => node.nodeType === Node.TEXT_NODE
  );
  //debugging check:
  console.log("Text nodes:", filtered);

  //removing empty text nodes
  filtered = filtered.filter((node) => node.textContent.trim().length > 0);
  //Debugging check:
  if (filtered.length === 0) {
    showOverlay("You have to click a word", "word");
    //debugging log:
    console.log("Clicked element is not a word");
    return;
  }

  //Gets content of the clicked element
  let paragraph = topElement.innerText;
  console.log("Extracted paragraph:", paragraph);

  // Finding the clicked word
  let extractedWord = getClickedWord(event, filtered);

  if (extractedWord) {
    //debugging log:
    console.log("Extracted word:", extractedWord);

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

  // Show a small overlay option
  showSmallOverlay(event.clientX, event.clientY, paragraph, extractedWord);
}
);

// Function to show a small overlay when double-clicking a word:
function showSmallOverlay(x, y, paragraph, word) {
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
    showOverlay(paragraph, word);
    smallOverlay.remove(); // Remove the small overlay after clicking
  });

  // Automatically remove the small overlay after a few seconds (optional)
  setTimeout(() => {
    if (smallOverlay) smallOverlay.remove();
  }, 3000);
}

// Function to find the clicked word
function getClickedWord(event, filtered) {
  let selection = window.getSelection();
  selection.removeAllRanges(); // clearing any existing text selection

  let allText = ""; // Store the text node containing the clicked character
  let offset = 0; // Will store the character index within the text node where the click occured

  filtered.forEach(node => {
    let range = document.createRange(); // to create a selection around the text
    range.selectNodeContents(node);

    for (let i = 0; i < node.length; i++) {
      range.setStart(node, i);
      range.setEnd(node, i + 1);
      const rect = range.getBoundingClientRect();
      if (rect.left <= event.clientX && rect.right >= event.clientX && rect.top <= event.clientY && rect.bottom >= event.clientY) {
        offset = i;
        console.log("Offset:", offset);
        allText = node;
        break;
      }
    }
    if (offset !== 0) {
      return offset;
    }
  });

  //Checking if a word was clicked
  if (offset === 0) {
    showOverlay("You have to click a word", "word");
    // degugging log:
    console.log("Clicked element is not a word");
    return;
  }
  // Extracting the word containing the clicked character
  let inner = allText.textContent.trim();
  let before = inner.slice(0, offset).split(/\s+/).pop() || "";
  let after = inner.slice(offset).split(/\s+/).shift() || "";
  let word = before + after; // combines to reconstruct the full clicked word.

  // Trim the word for any special characters
  word = word.replace(/^[^\wæøåÆØÅ]+|[^\wæøåÆØÅ]+$/g, "");

  return word;

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

// Function to create and show the Zeeguu overlay
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
    const regex = new RegExp(`(^|\\s)(${word})(?=\\s|$|[.,!?])`, "gi");
    let highlightedText = paragraph.replace(
      regex,
      (match, before, matchedWord) => `${before}<b style="color:orange;">${matchedWord}</b>`
    );

    // Create paragraph text
    let overlayParagraph = document.createElement("p");
    overlayParagraph.innerHTML = highlightedText;
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
