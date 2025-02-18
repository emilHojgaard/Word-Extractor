document.addEventListener("contextmenu", (event) => {
  const targetElement = document.elementFromPoint(event.clientX, event.clientY);

  if (targetElement && targetElement.nodeType === Node.ELEMENT_NODE) {
    const text = getWordUnderMouse(targetElement, event.clientX, event.clientY);
    if (text) {
      // Send the word to the background script
      chrome.runtime.sendMessage(
        { action: "setClickedWord", word: word },
        (response) => {
          if (chrome.runtime.lastError) {
            console.error("Error sending message:", chrome.runtime.lastError);
          } else {
            console.log("Word sent to background:", word);
          }
        }
      );
    }
  }
});

function getWordUnderMouse(element, x, y) {
  const range = document.caretRangeFromPoint(x, y);
  if (range && range.startContainer.nodeType === Node.TEXT_NODE) {
    const text = range.startContainer.nodeValue;
    return text;
  }
  return null;
}
