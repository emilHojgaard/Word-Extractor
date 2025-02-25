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
    console.log("Paragraph received in background script:", message);
    sendResponse({ status: "word received" });

    // Send the paragraph text back to the same tab to display it
    chrome.tabs.sendMessage(sender.tab.id, { paragraph: message.paragraph });
    console.log("Message send back from Service worker:", message.paragraph);
  }
});
