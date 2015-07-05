var contentApp = {
  tooltip: null
};

contentApp.createTooltip = function () {
  return $('<div>').css({'position': 'fixed', 'background': 'red'}).html('some loader');
};

contentApp.showTooltip = function (selection) {
  if (!this.tooltip) {
    this.tooltip = this.createTooltip();
  }

  var range = selection.getRangeAt(0); //get the text range
  var rect = range.getBoundingClientRect();

  this.tooltip.css({top: rect.top - rect.height, left: rect.left});
  this.tooltip.appendTo(document.body);

  console.log('contentApp.showTooltip', 'show tooltip with loader at', rect);
};

contentApp.setTooltipContent = function () {
  console.log('contentApp.setTooltipContent', 'set tooltip content');
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
    contentApp.showTooltip(selection);
  }
});

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.translation) {
      contentApp.setTooltipContent(request.translation);
    }
  });
