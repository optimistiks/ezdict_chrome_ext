var contentApp = {
  tooltip: null
};

contentApp.createTooltip = function () {
  return $('<div>').css({
    'position': 'absolute',
    'background': 'red',
    'max-width': '500px'
  });
};

contentApp.showTooltip = function () {
  if (!this.tooltip) {
    this.tooltip = this.createTooltip();
    this.tooltip.appendTo(document.body);
  }
  this.tooltip.show();
  this.tooltip.html('loading...');
  this.updateTooltipPosition();
};

contentApp.hideTooltip = function () {
  if (!this.tooltip) {
    return false;
  }
  this.tooltip.hide();
};

contentApp.setTooltipContent = function (translation) {
  this.tooltip.text(translation);
  this.updateTooltipPosition();
};

contentApp.updateTooltipPosition = function () {
  var selection = window.getSelection();
  var range = selection.getRangeAt(0); //get the text range
  var rect = range.getBoundingClientRect();
  this.tooltip.css({
    top: window.pageYOffset + rect.top - this.tooltip.height(),
    left: rect.left + rect.width / 2 - this.tooltip.width() / 2
  });
};

// mouseuo
// if tooltip not exist create tooltip
// set tooltip content as loader
// put tooltip to coordinates
// change tooltip contents to translation when done

$(document).on('mouseup', function (e) {
  var selection = window.getSelection();
  var text = selection.toString().replace(/^\s+|\s+$/g, '');
  if (text && text.length > 1) {
    console.log(text);
    chrome.runtime.sendMessage({text: text});
    contentApp.showTooltip();
  } else {
    contentApp.hideTooltip();
  }
});

$(document).ready(function () {
  console.log('tooltip.html');
  $.get(chrome.extension.getURL('content/tooltip/tooltip.html'), function (data) {
    console.log("Load was performed.", data);
    $(data).appendTo(document.body);
  });
});

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.translation) {
      contentApp.setTooltipContent(request.translation);
    }
  });
