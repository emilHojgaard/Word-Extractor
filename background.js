let clickedParagraph = "You need to click on a word";
let clickedWord = "word";

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if ((message.paragraph, message.word)) {
    // Store the paragraph
    clickedParagraph = message.paragraph;
    // Store word
    clickedWord = message.word;
    sendResponse({ status: "word received" });
  }
});

// Listen for context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "extractParagraph") {
    // Send the stored paragraph back to the content script
    chrome.tabs.sendMessage(tab.id, {
      paragraph: clickedParagraph,
      word: clickedWord,
    });
    //debugging check
    console.log("Paragraph from Service worker:", clickedParagraph);
    console.log("Word from Service worker:", clickedWord);

    // Reset the stored paragraph
    clickedParagraph = "You need to click on a word";
    clickedWord = "word";
  }
});
