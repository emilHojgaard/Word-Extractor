let clickedWord = "";

// Create the context menu
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "extractWord",
    title: "Extract clicked word",
    contexts: ["all"]
  });
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "setClickedWord") {
    clickedWord = message.word;
    console.log("Word received in background script:", clickedWord);
    sendResponse({ status: "word received" });
  }
});

// Log the clicked word when the context menu is clicked
chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log("Context menu clicked, word is:", clickedWord);
});
