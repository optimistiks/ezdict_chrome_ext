var ezdictTooltipElement = {
    locale: 'en',
    debug: false,
    pathPrefix: '..'
};

ezdictTooltipElement.setLocale = function (locale) {
    this.locale = locale;
};

ezdictTooltipElement.setDebug = function (debug) {
    this.debug = debug;
};

ezdictTooltipElement.setPathPrefix = function (path) {
    this.pathPrefix = path;
};

/**
 * get full shadow dom content (with styles)
 * if debug is on, template is compiled on-the-fly
 *
 * @param viewData
 * @returns {JQueryDeferred}
 */
ezdictTooltipElement.getHtml = function (viewData) {
    viewData = viewData || {};
    var deferred = $.Deferred();

    if (this.debug) {
        var tooltip = $.get('../html/template/tooltip.handlebars');
        var content = $.get('../html/template/content.handlebars');
        // tooltip and content are arguments resolved for the tooltip and content ajax requests, respectively.
        // Each argument is an array with the following structure: [ data, statusText, jqXHR ]
        $.when(tooltip, content).done(function (tooltip, content) {
            Handlebars.registerPartial('tooltip', tooltip[0]);
            deferred.resolve(Handlebars.compile(content[0])(viewData));
        });
    } else {
        Handlebars.registerPartial('tooltip', Handlebars.templates.tooltip);
        deferred.resolve(Handlebars.templates.content(viewData));
    }

    return deferred.promise();
};

/**
 * get root element contents (without styles)
 * if debug is on, template is compiled on-the-fly
 *
 * @param viewData
 * @returns {JQueryDeferred}
 */
ezdictTooltipElement.getTooltipHtml = function (viewData) {
    viewData = viewData || {};
    var deferred = $.Deferred();

    if (this.debug) {
        $.get('../html/template/tooltip.handlebars').done(function (tooltip) {
            deferred.resolve(Handlebars.compile(tooltip)(viewData));
        });
    } else {
        deferred.resolve(Handlebars.templates.tooltip(viewData));
    }

    return deferred.promise();
};

ezdictTooltipElement.register = function () {
    i18n.init({
        lng: this.locale,
        fallbackLng: false,
        ns: 'messages',
        resGetPath: this.pathPrefix + '/_locales/__lng__/__ns__.json'
    }, function (err, t) {
        this.getHtml().done(function (html) {
            xtag.register('ezdict-tooltip-element', {
                shadow: html,
                lifecycle: {
                    // Fires when an instance of the element is created
                    created: function () {
                        this.viewData = {};
                        this.state = null;
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
                        this.$shadowRoot = this.jq(this.shadowRoot);

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
                            this.$shadowRoot.find('#sticker').hide();
                        }.bind(this));

                        this.$shadowRoot.find('#create_card, #edit_card').on('click', function (e) {
                            var el = $(e.currentTarget);

                            var clickCount = el.data('clicked') || 0;
                            ++clickCount;

                            el.data('clicked', clickCount);

                            if (clickCount === 1) {
                                el.find('.st-btn_dummy').hide();
                                el.find('.st-btn_link').show();
                            }

                            if (clickCount === 2) {
                                el.data('clicked', 0);
                                el.find('.st-btn_dummy').show();
                                el.find('.st-btn_link').hide();
                            }
                        }.bind(this));

                        this.$shadowRoot.find('#create_card, #edit_card').on('mouseleave', function (e) {
                            var el = $(e.currentTarget);
                            el.data('clicked', 0);
                            el.find('.st-btn_dummy').show();
                            el.find('.st-btn_link').hide();
                        }.bind(this));

                        return this;
                    },

                    setJquery: function (jQuery) {
                        this.jq = jQuery;
                        return this;
                    },

                    setStateLoading: function () {
                        this.state = 'loading';
                        return this;
                    },

                    setStateError: function (error) {
                        this.state = 'error';
                        this.viewData.error = error;
                        return this;
                    },

                    setCardUrl: function (url) {
                        this.viewData.cardUrl = url;
                        return this;
                    },

                    setStateTranslation: function (translation) {
                        this.state = 'translation';

                        this.viewData.learning = translation.learning;
                        this.viewData.card = translation.card;
                        this.viewData.ya_dict = translation.ya_dict;
                        this.viewData.history = translation.translation_history;
                        this.viewData.count = translation.translation_history.count;
                        this.viewData.translation = translation.translation;

                        return this;
                    },

                    redraw: function () {
                        if (!this.state) {
                            throw new Error('State is not set');
                        }

                        // ease the state check in handlebars templates
                        this.viewData.state = {};
                        this.viewData.state[this.state] = true;

                        ezdictTooltipElement.getTooltipHtml(this.viewData).done(function (html) {
                            this.$shadowRoot.find('#sticker').html(html);
                            this.init();
                        }.bind(this));
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
        });
    }.bind(this));
};
