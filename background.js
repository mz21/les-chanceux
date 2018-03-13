chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === "submit") {
    for (let i = 0; i < request.formInfo.checkedItems.length; i++) {
      let musical = request.formInfo.checkedItems[i];
      let url = null;
      switch(musical) {
        case 'aladdin':
          url = 'https://lottery.broadwaydirect.com/show/aladdin/';
          break;
        case 'angels':
          url = 'https://lottery.broadwaydirect.com/show/angels/';
          break;
        case 'mormon':
          url = 'https://www.luckyseat.com/book-of-mormon/';
          break
        case 'escape':
          url = 'https://lottery.broadwaydirect.com/show/escape/';
          break;
        case 'frozen':
          url = 'https://baa.turnkeysurveyor.com/se/5145A8F937B3D592';
          break;
        case 'hamilton':
          url = 'http://www.luckyseat.com/hamilton-ny/';
          break;
        case 'kinky':
          url = 'http://www.luckyseat.com/kinky-boots/';
          break;
        case 'lionking':
          url = 'https://lottery.broadwaydirect.com/show/the-lion-king/';
          break;
        case 'meangirls':
          url = 'https://www.luckyseat.com/mean-girls/';
          break;
        case 'spongebob':
          url = 'https://lottery.broadwaydirect.com/show/sponge/';
          break;
        case 'springsteen':
          url = 'https://baa.turnkeysurveyor.com/se/5145A8F96ABFD2D0';
          break;
        case 'wicked':
          url = 'https://lottery.broadwaydirect.com/show/wicked/';
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
