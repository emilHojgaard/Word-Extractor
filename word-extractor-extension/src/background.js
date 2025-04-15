//For selected text extension
chrome.runtime.onMessage.addListener(
  async (request, sender, sendResponse) => {
    if (request.type === "SELECTED_TEXT") {
      const { selectedText, url, documentTitle } = request;
      console.log("Selected text:", selectedText);
      console.log("URL:", url);
      console.log("Document title:", documentTitle);

    }
  },
);
