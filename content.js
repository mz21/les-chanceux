chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    $( document ).ready(function() {
      let musicals = {
        aladdin: 'direct',
        anastasia: 'social',
        mormon: 'lucky',
        cats: 'direct',
        charlie: 'direct',
        deh: 'social',
        hamilton: 'lucky',
        holidays: 'lucky',
        junk: 'social',
        kinky: 'lucky',
        lionking: 'direct',
        phantom: 'social',
        spongebob: 'direct',
        springsteen: 'lucky',
        wicked: 'direct'
      };
      let musical = request.musical;
      let formInfo = request.formInfo;
      if( request.type === "done") {
        if(musicals[musical] === 'direct') {
          var lotteryLink = document.getElementsByClassName('enter-lottery-link')[0];
          lotteryLink.click();
          $('iframe').load(function() {
             let iframe = iframeRef(document.getElementsByTagName('iframe')[0]);
             iframe.getElementById('dlslot_name_first').value = formInfo.firstnameval;
             iframe.getElementById('dlslot_name_last').value = formInfo.lastnameval;
             iframe.getElementById('dlslot_email').value = formInfo.emailval;
             iframe.getElementById('dlslot_zip').value = formInfo.zipcodeval;
             iframe.getElementById('dlslot_dob_month').value = formInfo.monthval;
             iframe.getElementById('dlslot_dob_day').value = formInfo.dayval;
             iframe.getElementById('dlslot_dob_year').value = formInfo.yearval;
             iframe.getElementById('dlslot_agree').checked = true;
             iframe.getElementById('dlslot_ticket_qty')[formInfo.numtix].selected = true;
          });
        }
        else if(musicals[musical] === 'lucky') {
          $('.checkbox-line input').each(function(i) {
            $(this).prop('checked', true);
          });
          document.getElementById('firstname').value = formInfo.firstnameval;
          document.getElementById('lastname').value = formInfo.lastnameval;
          document.getElementById('email').value = formInfo.emailval;
          document.getElementById('zipcode').value = formInfo.zipcodeval;
          document.getElementById('age').value = formInfo.ageval;
          let twitter = document.getElementById('social_twitter');
          let facebook = document.getElementById('social_facebook');
          if(twitter) {
            twitter.checked = true;
          }
          if(facebook) {
            facebook.checked = true;
          }
          if(formInfo.numtix === 2) {
            document.getElementById('two_tickets').checked = true;
          }
          else if(formInfo.numtix === 1) {
            document.getElementById('one_ticket').checked = true;
          }
        }
      }
    });
  }
);

function iframeRef( frameRef ) {
    return frameRef.contentWindow
        ? frameRef.contentWindow.document
        : frameRef.contentDocument
}
