function parseQuote (response) {
  renderMsg(response.quoteText, 'response');
  saveMessage('user2', response.quoteText, Date.now());
}

function getMessages (data) {
  $.ajax({
    url: '/messages',
    method: 'GET',
    // data: JSON.stringify(),
    // dataType: 'json',
    success: function (db) {
      db.msgs.forEach(function (msg) {
        renderMsg(msg);
      });
    },
    error: function(err) {
      console.log(err);
      return;
    },
  });
}

function renderMsgJSON (msg, className) {
  const $msgHtml = $('<div class="msg">').html(msg.content);
  if (className) $msgHtml.addClass(className);
  else if (msg.userId === 'user1') $msgHtml.addClass('userMsg');
  $('.chatWindow').append($msgHtml);
}

function renderMsg (msg, className) {
  const $msgHtml = $('<div class="msg">').html(msg);
  if (className) $msgHtml.addClass(className);
  $('.chatWindow').append($msgHtml);
}

function saveMessage (userId, content, timeStamp) {
  $.ajax({
    url: '/messages',
    method: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({
      userId,
      content,
      timeStamp
    }),
    success: function (data) {
      console.log('data saved:', data);
    },
    error: function (err) {
      console.log(err);
    },
  });
}

function getQuote() {
  $.ajax({
    url: 'http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=parseQuote',
    type: 'GET',
    dataType: 'jsonp',
    success: function (data) {
      // saveMessage(data.quoteText);
    }
  });
}

$(document).ready(function () {
  $('#target').submit(function (event) {
    event.preventDefault();
    let userText = $('#textbox').val();
    if (userText) renderMsg(userText, 'userMsg');
    $('#textbox').val('');
    saveMessage('user1', userText, Date.now());
    getQuote();
    // chatDiv.scrollTop = chatDiv.scrollHeight;
    // let height = chatDiv.scrollHeight;
    // chatDiv.scrollTop = chatDiv.height();
    // let chatDiv = document.getElementsByClassName('chatWindow')[0];
    let chatDiv = $('.chatWindow');
    chatDiv.clientHeight = chatDiv.scrollHeight;
    // chatDiv.scrollTop = $(".msg").last().offset().top;//chatDiv.scrollHeight;
    // console.log('chatDiv height',chatDiv.height(),'chatDiv.scrollTop',chatDiv.scrollTop, 'chatDiv.scrollHeight', chatDiv.scrollHeight);
  });
});
