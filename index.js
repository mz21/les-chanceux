document.addEventListener('DOMContentLoaded', () => {
  $(".numtixopt").click(function() {
    $(".numtixopt").removeClass("numtixselected");
    $(this).addClass("numtixselected");
  });

  var firstname = document.getElementById('firstname');
  var lastname = document.getElementById('lastname');
  var email = document.getElementById('email');
  var zipcode = document.getElementById('zipcode');
  var month = document.getElementById('month');
  var day = document.getElementById('day');
  var year = document.getElementById('year');
  var age = document.getElementById('age');
  chrome.storage.sync.get(null, (form) => {
    if(form.firstnameval) {
      firstname.value = form.firstnameval;
    }
    if(form.lastnameval) {
      lastname.value = form.lastnameval;
    }
    if(form.emailval) {
      email.value = form.emailval;
    }
    if(form.zipcodeval) {
      zipcode.value = form.zipcodeval;
    }
    if(form.monthval) {
      month.value = form.monthval;
    }
    if(form.dayval) {
      day.value = form.dayval;
    }
    if(form.yearval) {
      year.value = form.yearval;
    }
    if(form.ageval) {
      age.value = form.ageval;      
    }
    if(form.numtix) {
      if(form.numtix === 2) {
        document.getElementsByClassName("numtixopt")[1].className = "numtixopt numtixselected";
        document.getElementsByClassName("numtixopt")[0].className = "numtixopt";
      }
      else {
        document.getElementsByClassName("numtixopt")[0].className = "numtixopt numtixselected";
        document.getElementsByClassName("numtixopt")[1].className += "numtixopt";
      }
    }
    let items = document.getElementsByName('musicals');

    for(let i = 0; i < items.length; i++) {
      let item = items[i].value;
      if(!form.checkedItems.includes(item)) {
        items[i].checked = false;
      }
    }
  });
  var submitButton = document.getElementById('submit_button');
  submitButton.addEventListener("click", () => {
    let items = document.getElementsByName('musicals');
    var checkedItems = [];
    for (let i = 0; i < items.length; i++) {
      if(items[i].checked) {
        checkedItems.push(items[i].value);
      }
    }
    var numtix = 1;
    $(".numtixopt").each(function (i) {
      if($(this).hasClass('numtixselected')) {
        if(i === 1) {
          numtix = 2;
        }
      }
    })
    var firstnameval = firstname.value;
    var lastnameval = lastname.value;
    var emailval = email.value;
    var zipcodeval = zipcode.value;
    var monthval = month.value;
    var dayval = day.value;
    var yearval = year.value;
    var ageval = age.value;
    formInfo = {
      firstnameval,
      lastnameval,
      emailval,
      zipcodeval,
      monthval,
      dayval,
      yearval,
      ageval,
      numtix,
      checkedItems
    };
    chrome.storage.sync.set(formInfo);
    chrome.runtime.sendMessage({type: "submit", formInfo: formInfo}, () => {
    });
  })
})
