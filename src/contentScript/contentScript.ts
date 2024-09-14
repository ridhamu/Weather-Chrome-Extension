chrome.runtime.sendMessage("hello from content script", (response) => {
    console.log(response); 
}); 