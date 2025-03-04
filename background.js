let clickedParagraph = "";

// Create the context menu
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "extractParagraph",
    title: "Extract clicked paragraph",
    contexts: ["all"],
  });
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.paragraph) {
    console.log("Paragraph received in background script:", message.paragraph);
    // Store the paragraph
    clickedParagraph = message.paragraph;
    sendResponse({ status: "word received" });
  }
});

// Listen for context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log("context menu clicked:", info);
  if (info.menuItemId === "extractParagraph") {
    // Send the stored paragraph back to the content script
    chrome.tabs.sendMessage(tab.id, { paragraph: clickedParagraph });

    console.log("Message send back from Service worker:", clickedParagraph);
    console.log("Tab ID:", tab?.id);
  }
});
