$(function(){

  'use strict';

  $(window).on('message', function(event) {
    var ajaxSetting;

    // return if unknown origin
    if (event.originalEvent.origin !== 'http://sasaplus1-prototype.github.io') {
      return;
    }

    // parse JSON data
    ajaxSetting = $.parseJSON(event.originalEvent.data);

    // post data
    $.ajax(ajaxSetting)
      .then(function(data, textStatus, jqXHR) {
        var result = JSON.stringify({
          result: 'success',
          data: data
        });

        event.originalEvent.source.postMessage(
            result, event.originalEvent.origin);
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        var result = JSON.stringify({
          result: 'failure',
          data: textStatus
        });

        event.originalEvent.source.postMessage(
            result, event.originalEvent.origin);
      });
  });

});
