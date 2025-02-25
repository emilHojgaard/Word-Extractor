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
  console.log("Paragraph received in background script:", message);
  if (message.paragraph) {
    console.log("innertext:", message.paragraph);
    sendResponse({ status: "Paragraph received" });
  } else {
    console.log("cant access inner text");
    sendResponse({ status: "No paragraph found" });
    jfjfj

    
  }
});
