chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === "submit") {
    for (let i = 0; i < request.formInfo.checkedItems.length; i++) {
      let musical = request.formInfo.checkedItems[i];
      let url = null;
      switch(musical) {
        case 'aladdin':
          url = 'https://lottery.broadwaydirect.com/show/aladdin/';
          break;
        case 'anastasia':
          url = 'http://www.anastasiabroadwaylottery.com/';
          break;
        case 'mormon':
          url = 'https://www.luckyseat.com/book-of-mormon/';
          break
        case 'cats':
          url = 'https://lottery.broadwaydirect.com/show/cats/';
          break
        case 'charlie':
          url = 'https://lottery.broadwaydirect.com/show/charlie/';
          break;
        case 'deh':
          url = 'http://www.dearevanhansenlottery.com/';
          break;
        case 'hamilton':
          url = 'http://www.luckyseat.com/hamilton-ny/';
          break;
        case 'holidays':
          url = 'http://www.luckyseat.com/holidays-broadway/';
          break;
        case 'junk':
          url = 'http://junkbroadwaylottery.com/';
          break;
        case 'kinky':
          url = 'http://www.luckyseat.com/kinky-boots/';
          break;
        case 'lionking':
          url = 'https://lottery.broadwaydirect.com/show/the-lion-king/';
          break;
        case 'phantom':
          url = 'http://www.phantombroadwaylottery.com/';
          break;
        case 'spongebob':
          url = 'https://lottery.broadwaydirect.com/show/sponge/';
          break;
        case 'springsteen':
          url = 'http://www.luckyseat.com/springsteen-broadway/';
          break;
        case 'wicked':
          url = 'https://lottery.broadwaydirect.com/show/wicked/';
          break;
        default:
          console.log(request);
      }
      chrome.tabs.create({"url": url, "active": false}, (tab) => {
        chrome.tabs.executeScript(tab.id, {file:"content.js"}, () => {
          chrome.tabs.sendMessage(tab.id, {type: "done", musical: musical, formInfo: request.formInfo})
        })
      });
    }
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //   var activeTab = tabs[0];
    //   chrome.tabs.sendMessage(activeTab.id, {"type": "done", content: request.content});
    // });
  }
})
