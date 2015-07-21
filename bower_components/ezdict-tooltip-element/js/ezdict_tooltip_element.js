Polymer({
  is: 'ezdict-tooltip-element',
  properties: {
    jq: Object,
    translation: String
  },

  ready: function () {
    this.fire(this._buildEventName('ready'));
  },

  attached: function () {
    // `attached` fires once the element and its parents have been inserted
    // into a document.
    //
    // This is a good place to perform any work related to your element's
    // visual state or active behavior (measuring sizes, beginning animations,
    // loading resources, etc).
  },

  detached: function () {
    // The analog to `attached`, `detached` fires when the element has been
    // removed from a document.
    //
    // Use this to clean up anything you did in `attached`.
  },

  _buildEventName: function (name) {
    return 'ezdict-tooltip-element_' + name;
  },

  init: function () {
    var element = this;
    var $ = this.jq;

    $(this.$.st_translate).slimScroll({
      distance: '5px',
      height: '100%',
      size: '4px'
    });

    var $stSourceBtns = $(element.shadowRoot).find('.st-source-btn');
    var $stSourceTranslates = $(element.shadowRoot).find('.st-source-translate');

    $stSourceBtns.on('click', function () {
      if (!$(this).hasClass('active')) {
        $stSourceBtns.removeClass('active');
        $(this).addClass('active');
        var index = $(this).index();
        $stSourceTranslates.stop().hide().promise().done(function () {
          $(element.$.st_translate).scrollTop(0);
          $stSourceTranslates.eq(index).stop().fadeIn(200);
        });
        $(element.$.sticker).find('.slimScrollBar').animate({'top': '0'}, 300);
      }
    });

    $(element.$$('.slide-down-btn')).on('click', function () {
      if (!$(element.$$('.st-translate')).hasClass('large')) {
        $(this).toggleClass('slide-up');
        $(element.$$('.st-translate')).toggleClass('large');
        $(element.$$('.like-it')).stop().fadeIn();
      } else {
        $(this).toggleClass('slide-up');
        $(element.$$('.st-translate')).toggleClass('large').scrollTop(0);
        $(element.$$('.like-it')).stop().hide();
      }
    });

    $(this.$.close_sticker).on('click', function () {
      $(this.$.sticker).hide();
    }.bind(this));
  },

  setJquery: function (jQuery) {
    this.jq = jQuery;
  },

  setTranslation: function (translation) {
    this.translation = translation;
  },

  setTop: function (top) {
    this.$.sticker.style.top = top;
  },

  setLeft: function (left) {
    this.$.sticker.style.left = left;
  },

  hide: function () {
    this.$.sticker.style.display = 'none';
  },

  show: function () {
    this.$.sticker.style.display = 'block';
  }
});
