// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if ((message.selectedText)) {
    // Store the paragraph
    selectedText = message.selectedText;
    //debugging log
    console.log("Service worker:", selectedText);
  }
});
