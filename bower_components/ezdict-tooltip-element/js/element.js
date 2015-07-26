var ezdictTooltipElement = {};
ezdictTooltipElement.register = function (content) {
  xtag.register('ezdict-tooltip-element', {
    shadow: content,
    lifecycle: {
      // Fires when an instance of the element is created
      created: function () {
      },
      // Fires when an instance was inserted into the document
      inserted: function () {
        xtag.fireEvent(this, this._getEventName('inserted'));
      },
      // Fires when an instance was removed from the document
      removed: function () {
      },
      // Fires when an attribute was added, removed, or updated
      attributeChanged: function (attr, oldVal, newVal) {
      }
    },
    events: {},
    accessors: {},
    methods: {
      _getEventName: function (name) {
        return 'ezdict-tooltip-element_' + name;
      },

      init: function () {
        var element = this;
        var $ = this.jq;

        this.$shadowRoot.find('#st_translate').slimScroll({
          distance: '5px',
          height: '100%',
          size: '4px'
        });

        var $stSourceBtns = this.$shadowRoot.find('.st-source-btn');
        var $stSourceTranslates = this.$shadowRoot.find('.st-source-translate');

        $stSourceBtns.on('click', function () {
          if (!$(this).hasClass('active')) {
            $stSourceBtns.removeClass('active');
            $(this).addClass('active');
            var index = $(this).index();
            $stSourceTranslates.stop().hide().promise().done(function () {
              element.$shadowRoot.find('#st_translate').scrollTop(0);
              $stSourceTranslates.eq(index).stop().fadeIn(200);
            });
            element.$shadowRoot.find('#sticker').find('.slimScrollBar').animate({'top': '0'}, 300);
          }
        });

        element.$shadowRoot.find('.slide-down-btn').on('click', function () {
          if (!element.$shadowRoot.find('.st-translate').hasClass('large')) {
            $(this).toggleClass('slide-up');
            element.$shadowRoot.find('.st-translate').toggleClass('large');
            element.$shadowRoot.find('.like-it').stop().fadeIn();
          } else {
            $(this).toggleClass('slide-up');
            element.$shadowRoot.find('.st-translate').toggleClass('large').scrollTop(0);
            element.$shadowRoot.find('.like-it').stop().hide();
          }
        });

        this.$shadowRoot.find('#close_sticker').on('click', function () {
          element.$shadowRoot.find('#sticker').hide();
        }.bind(this));

        return this;
      },

      setJquery: function (jQuery) {
        this.jq = jQuery;
        this.$shadowRoot = jQuery(this.shadowRoot);
        return this;
      },

      setTranslation: function (translation) {
        this.$shadowRoot.find('#ezdict-sticker').text(translation);
        return this;
      },

      setCounter: function (count) {
        this.$shadowRoot.find('#counter').text(count);
        return this;
      },

      setTop: function (top) {
        this.$shadowRoot.find('#sticker').css({'top': top});
        return this;
      },

      setLeft: function (left) {
        this.$shadowRoot.find('#sticker').css({'left': left});
        return this;
      },

      hide: function () {
        this.$shadowRoot.find('#sticker').hide();
        return this;
      },
      show: function () {
        this.$shadowRoot.find('#sticker').show();
        return this;
      },
      getHeight: function () {
        return this.$shadowRoot.find('#sticker').height();
      },
      getWidth: function () {
        return this.$shadowRoot.find('#sticker').width();
      }
    }
  });
};
