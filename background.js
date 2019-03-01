chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === "submit") {
    for (let i = 0; i < request.formInfo.checkedItems.length; i++) {
      let musical = request.formInfo.checkedItems[i];
      let url = null;
      switch(musical) {
        case 'aladdin':
          url = 'https://lottery.broadwaydirect.com/show/aladdin/';
          break;
        case 'mormon':
          url = 'https://www.luckyseat.com/book-of-mormon/';
          break
        case 'frozen':
          url = 'https://www.luckyseat.com/frozen/';
          break;
        case 'hamilton':
          url = 'https://www.luckyseat.com/hamilton-ny/';
          break;
        case 'kinky':
          url = 'https://www.luckyseat.com/kinky-boots/';
          break;
        case 'lionking':
          url = 'https://lottery.broadwaydirect.com/show/the-lion-king/';
          break;
        case 'meangirls':
          url = 'https://www.luckyseat.com/mean-girls/';
          break;
        case 'pretty':
          url = 'https://lottery.broadwaydirect.com/show/pretty/';
          break;
        case 'wicked':
          url = 'https://lottery.broadwaydirect.com/show/wicked/';
          break;
        case 'hamiltonsf':
          url = 'https://www.luckyseat.com/hamilton-sanfrancisco/';
          break;
        case 'hamiltonchi':
          url = 'https://www.luckyseat.com/hamilton-chi/';
          break;
        default:
          console.log(request);
      }
      chrome.tabs.create({"url": url, "active": false}, (tab) => {
        chrome.tabs.executeScript(tab.id, {file: "jquery-2.2.4.min.js"}, () => {
          chrome.tabs.executeScript(tab.id, {file: "content.js"}, () => {
            chrome.tabs.sendMessage(tab.id, {type: "done", musical: musical, formInfo: request.formInfo})
          })
        })
      });
    }
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //   var activeTab = tabs[0];
    //   chrome.tabs.sendMessage(activeTab.id, {"type": "done", content: request.content});
    // });
  }
})
