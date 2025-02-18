let clickedWord = "";

// Create the context menu
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "extractWord",
    title: "Extract clicked word",
    contexts: ["all"],
  });
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Paragraph received in background script:", message);
  if (message.paragraph) {
    console.log("innertext:", message.paragraph);
  } else {
    console.log("cant access inner text");
  }
});
