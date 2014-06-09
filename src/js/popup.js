(function () {

  var $qrcode = document.getElementById('qrcode');
  var $description = document.getElementById('description');
  var $input = document.getElementById('input');

  var empty = function (element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  };
  
  var createQRCode = function (text) {
    empty($qrcode);
    return new QRCode('qrcode',  {
      text: text,
      width: 150,
      height: 150,
      colorDark : '#333',
      colorLight : '#fff',
      correctLevel : QRCode.CorrectLevel.H
    });
  };

  try {
    chrome.windows.getCurrent(function(w) {
      chrome.tabs.getSelected(w.id, function (response) {
        createQRCode(response.url);
        $description.textContent = response.url;
      });
    });
  } catch (e) {}

  $description.onfocus = function () {
    this.select();
  };

  $description.onchange = $description.onkeydown = $description.onmousedown = function (e) {
    if (e && e.which === 13) {
      this.blur();
    }
    createQRCode(this.textContent);
  };

})();
