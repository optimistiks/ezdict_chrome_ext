var getSelectedText = function () {
  var userSelection = window.getSelection();
  return userSelection.toString();
};

document.addEventListener('mouseup', function () {
  alert(getSelectedText());
});
