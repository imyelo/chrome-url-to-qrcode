(function () {
  var Listener = function (namespace) {
    this._namespace = namespace || 'common';
    return this;
  };

  Listener.prototype.add = function (action, response) {
    var actionName = this._namespace + ':' + action;
    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
      var data = message.data || {};
      if (message.action == actionName) {
        sendResponse(response(data));
      }
    });
  };

  var listener = new Listener('qrcode');

  listener.add('location', function (data) {
    return {
      data: window.location
    };
  });

})();
