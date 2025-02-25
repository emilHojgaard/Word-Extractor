document.addEventListener("contextmenu", (event) => {
  const targetElement = document.elementsFromPoint(
    event.clientX,
    event.clientY
  );

  if (targetElement) {
    //[0], because it grabs the top most element(the DOM-tree reversed)
    let paragraph = targetElement[0].textContent;

    // Send the paragraph to the background script
    chrome.runtime.sendMessage({ paragraph: paragraph }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Error sending message:", chrome.runtime.lastError);
      } else {
        console.log("Paragraph sent to background:", paragraph);
      }
    });
  }
});
