(function () {
  var exports = {};

  var Emitter = function (namespace) {
    this._namespace = namespace;
    return this;
  };
  Emitter.prototype.send = function (action, data, response) {
    var actionName = this._namespace + ':' + action;
    var query = {
      active: true, currentWindow: true
    };
    if (arguments.length === 2) {
      response = data;
      data = {};
    }
    chrome.tabs.query(query, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: actionName,
        data: data
      }, response);
    });
  };

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

  exports.Emitter = Emitter;
  exports.Listener = Listener;

})();