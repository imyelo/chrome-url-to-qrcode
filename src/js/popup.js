(function () {
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

  (function () {

    chrome.windows.getCurrent(function(w) {
      chrome.tabs.getSelected(w.id, function (response) {
        var qrcode = new QRCode('qrcode',  {
          text: response.url,
          width: 150,
          height: 150,
          colorDark : '#333',
          colorLight : '#fff',
          correctLevel : QRCode.CorrectLevel.H
        });
        document.getElementById('description').textContent = response.url;
      });
    });

  })();

})();
