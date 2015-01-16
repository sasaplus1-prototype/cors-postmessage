$(function(){

  'use strict';

  $('#directAjax').on('click', function() {
    var ajaxSetting = {
      type: 'GET',
      cache: false,
      url: 'https://sasaplus1-prototype.github.io/cors-postmessage/data.json'
    };

    $.ajax(ajaxSetting)
      .then(function(data, textStatus, jqXHR) {
        var result = JSON.stringify({
          data: data,
          textStatus: textStatus
        }, null, 2);

        $('#result').text(result);
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        var result = JSON.stringify({
          textStatus: textStatus,
          errorThrown: errorThrown
        }, null, 2);

        $('#result').text(result);
      });
  });

  $('#postMessage').on('click', function() {
    var ajaxSetting = JSON.stringify({
      type: 'GET',
      cache: false,
      url: 'https://sasaplus1-prototype.github.io/cors-postmessage/data.json'
    });

    $(window).off('message').on('message', function(event) {
      var result = $.parseJSON(event.originalEvent.data);

      $('#result').text(JSON.stringify(result, null, 2));
    });

    if (typeof bypassFrame.postMessage === 'function') {
      // IE
      bypassFrame.postMessage(
          ajaxSetting, 'https://sasaplus1-prototype.github.io');
    } else {
      // Firefox, Chrome
      bypassFrame.contentWindow.postMessage(
          ajaxSetting, 'https://sasaplus1-prototype.github.io');
    }

    // or
    //$('#bypassframe').get(0).contentWindow.postMessage(
    //    ajaxSetting, 'https://sasaplus1-prototype.github.io');
  });

});
