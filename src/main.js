function parseQuote (response) {
  $('.chatWindow').append('<div class="response">'+ response.quoteText + '</div>');
}

function getQuote() {
  $.ajax({
    url: 'http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=parseQuote',
    type: 'GET',
    dataType: 'jsonp'
  });
}

$(document).ready(function() {
  $('#target').submit(function(event) {
    event.preventDefault();
    getQuote();
  });
});
