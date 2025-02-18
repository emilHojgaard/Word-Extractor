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
  if (message.paragraph) {
    console.log("Paragraph received in background script:", message.paragraph);
    sendResponse({ status: "word received" });
  }
});
