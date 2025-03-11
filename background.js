let clickedParagraph = "You need to click on a word";
let clickedWord = "word";

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
  if ((message.paragraph, message.word)) {
    console.log("Paragraph received in background script:", message.paragraph);
    console.log("Word received in background script:", message.word);

    // Store the paragraph
    clickedParagraph = message.paragraph;
    // Store word
    clickedWord = message.word;
    sendResponse({ status: "word received" });
  }
});

// Listen for context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log("context menu clicked:", info);
  if (info.menuItemId === "extractParagraph") {
    // Send the stored paragraph back to the content script
    chrome.tabs.sendMessage(tab.id, {
      paragraph: clickedParagraph,
      word: clickedWord,
    });

    console.log("Paragraph send back from Service worker:", clickedParagraph);
    console.log("Word send back from Service worker:", clickedWord);

    // Reset the stored paragraph
    clickedParagraph = "You need to click on a word";
    clickedWord = "word";

    console.log("Tab ID:", tab?.id);
  }
});
