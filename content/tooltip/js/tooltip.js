var tooltip = {
  rootElem: null
};

tooltip.createTooltip = function () {
  var deferred = new $.Deferred();

  $.get(chrome.extension.getURL('content/tooltip/tooltip.html'), function (data) {
    this.rootElem = $(data);
    this.rootElem.appendTo(document.body);
    this.bindEvents();
    deferred.resolve(this.rootElem);
  }.bind(this));

  return deferred.promise();
};

/**
 * todo: refactor
 */
tooltip.bindEvents = function () {
  $('.st-translate').slimScroll({
    distance: '5px',
    height: '100%',
    size: '4px'
  });

  $('.item-annotation-inner').slimScroll({
    height: '100%',
    size: '4px'
  });

  $('.pop-new-item').on('mouseenter', function () {
    $(this).find('.item-annotation').stop().animate({'height': '100%'}, 'fast', function () {
      $(this).find('.item-description-wrap').stop().fadeIn('fast').css('display', 'table');
    });
  });

  $('.pop-new-item').on('mouseleave', function () {
    $(this).find('.item-description-wrap').css('display', 'none');
    $(this).find('.item-annotation').stop().animate({'height': '40px'}, 'fast');
  });

  $('.slide-btn').on('click', function () {
    $('.slide-btn').removeClass('active');
    $(this).addClass('active');
    $('.carousel-item').addClass('next').stop().fadeOut(400, function () {
      $(this).removeClass('next')
    });
    var index = $(this).index();
    $('.carousel-item').eq(index).stop().fadeIn();
  });

  $(".slide-down-btn").on('click', function () {
    if (!$('.st-translate').hasClass('large')) {
      $(this).toggleClass('slide-up');
      $('.st-translate').toggleClass('large');
      $('.like-it').stop().fadeToggle();
    } else {
      $(this).toggleClass('slide-up');
      $('.st-translate').toggleClass('large').scrollTop(0);
      $('.like-it').stop().fadeToggle('fast');
    }
  });

  $('.st-source-btn').on('click', function () {
    if (!$(this).hasClass('active')) {
      $('.st-source-btn').removeClass('active');
      $(this).addClass('active');
      var index = $(this).index();
      $('.st-source-translate').stop().fadeOut(200).promise().done(function () {
        $('.st-translate').scrollTop(0);
        $('.st-source-translate').eq(index).stop().fadeIn(200);
      });
      $('.sticker').find('.slimScrollBar').animate({'top': '0'}, 300);
    }
  });

  $('#close-sticker').on('click', function () {
    $('.sticker').hide();
  });
};

tooltip.ready = function (callback) {
  if (!this.rootElem) {
    this.createTooltip().done(function () {
      callback.apply(this);
    }.bind(this));
  } else {
    callback.apply(this);
  }
};

tooltip.showTooltip = function () {
  this.ready(function () {
    this.rootElem.show();
    this.setTooltipContent('loading...');
    this.updateTooltipPosition();
  }.bind(this));
};

tooltip.hideTooltip = function () {
  if (!this.rootElem) {
    return false;
  }
  this.rootElem.hide();
};

tooltip.setTooltipContent = function (content) {
  this.ready(function () {
    this.rootElem.find('#ezdict-sticker').text(content);
    this.updateTooltipPosition();
  }.bind(this));
};

tooltip.updateTooltipPosition = function () {
  var selection = window.getSelection();
  var range = selection.getRangeAt(0); //get the text range
  var rect = range.getBoundingClientRect();
  this.rootElem.css({
    top:  window.pageYOffset + rect.top - (this.rootElem.height() + 40),
    left: rect.left + rect.width / 2 - this.rootElem.width() / 2
  });
};
