module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _SettingsItem = __webpack_require__(1);

	var _SettingsItem2 = _interopRequireDefault(_SettingsItem);

	var _MoveSlideLeftItem = __webpack_require__(3);

	var _MoveSlideLeftItem2 = _interopRequireDefault(_MoveSlideLeftItem);

	var _MoveSlideRightItem = __webpack_require__(6);

	var _MoveSlideRightItem2 = _interopRequireDefault(_MoveSlideRightItem);

	var _AddSlideItem = __webpack_require__(7);

	var _AddSlideItem2 = _interopRequireDefault(_AddSlideItem);

	var _RemoveSlideItem = __webpack_require__(8);

	var _RemoveSlideItem2 = _interopRequireDefault(_RemoveSlideItem);

	var _Settings = __webpack_require__(9);

	var _Settings2 = _interopRequireDefault(_Settings);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = novi.react.React;

	var Language = novi.language;
	var Plugin = {
	    name: "novi-plugin-owl-carousel",
	    title: "Novi Owl Carousel Plugin",
	    description: "Novi Plugin for owl carousel customization",
	    version: "1.0.2",
	    dependencies: {
	        novi: "0.9.0"
	    },
	    defaults: {
	        querySelector: '.owl-carousel',
	        childQuerySelector: '.owl-carousel .owl-item > *'
	    },
	    ui: {
	        editor: [_MoveSlideLeftItem2.default, _SettingsItem2.default, _AddSlideItem2.default, _RemoveSlideItem2.default, _MoveSlideRightItem2.default],
	        settings: React.createElement(_Settings2.default, null)
	    },
	    onLanguageChange: onLanguageChange
	};
	function onLanguageChange(plugin) {
	    var messages = Language.getDataByKey("novi-plugin-owl-carousel");
	    plugin.ui.editor[1].title = messages.editor.settings.title;
	    plugin.ui.editor[1].tooltip = messages.editor.settings.tooltip;
	    plugin.ui.editor[1].header[1] = React.createElement(
	        "span",
	        null,
	        messages.editor.settings.header
	    );

	    plugin.ui.editor[2].title = messages.editor.addSlide.title;
	    plugin.ui.editor[2].tooltip = messages.editor.addSlide.tooltip;

	    plugin.ui.editor[3].title = messages.editor.removeSlide.title;
	    plugin.ui.editor[3].tooltip = messages.editor.removeSlide.tooltip;

	    return plugin;
	}
	novi.plugins.register(Plugin);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _SettingsBody = __webpack_require__(2);

	var _SettingsBody2 = _interopRequireDefault(_SettingsBody);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = novi.react.React;
	var Icons = novi.ui.icons;
	var Icon = novi.ui.icon;
	var lodash = novi.utils.lodash;
	var messages = novi.language.getDataByKey("novi-plugin-owl-carousel");
	var icon = React.createElement(
	    Icon,
	    null,
	    React.createElement(
	        "svg",
	        { viewBox: "0 0 27 16", style: { height: 28, width: 28, maxWidth: "inherit", maxHeight: "inherit" } },
	        React.createElement("path", {
	            d: "M17,10 C15.8976,10 15,9.1024 15,8 C15,6.8976 15.8976,6 17,6 C18.1024,6 19,6.8976 19,8 C19,9.1024 18.1024,10 17,10 Z M17,7 C16.4486667,7 16,7.44866667 16,8 C16,8.55133333 16.4486667,9 17,9 C17.5513333,9 18,8.55133333 18,8 C18,7.44866667 17.5513333,7 17,7 Z"
	        }),
	        React.createElement("path", {
	            d: "M8,1 L8,2.05144019 L19,2.0758879 L19,1 L8,1 Z M8,0 L19,0 C19.5522847,-1.01453063e-16 20,0.44771525 20,1 L20,2.08777076 L7,2.0470348 L7,1 C7,0.44771525 7.44771525,1.01453063e-16 8,0 Z"
	        }),
	        React.createElement("path", {
	            d: "M20.5,2 L6.5,2 C5.673,2 5,2.673 5,3.5 L5,14.5 C5,15.327 5.673,16 6.5,16 L20.5,16 C21.327,16 22,15.327 22,14.5 L22,3.5 C22,2.673 21.327,2 20.5,2 Z M6,12.693 L10.197,8.076 C10.282,7.983 10.393,7.931 10.511,7.929 C10.629,7.927 10.742,7.977 10.829,8.068 L17.329,15 L6.499,15 C6.223,15 5.999,14.776 5.999,14.5 L6,12.693 Z M20.5,15 L18.714,15 L11.553,7.377 C11.272,7.083 10.898,6.925 10.5,6.93 C10.102,6.935 9.732,7.103 9.458,7.404 L6.001,11.207 L6.001,3.5 C6.001,3.224 6.225,3 6.501,3 L20.501,3 C20.777,3 21.001,3.224 21.001,3.5 L21.001,14.5 C21,14.776 20.776,15 20.5,15 Z"
	        }),
	        React.createElement("path", {
	            d: "M2.85325,11.85225 C3.04825,11.65725 3.04825,11.34025 2.85325,11.14525 L1.20725,9.49925 L2.85325,7.85325 C3.04825,7.65825 3.04825,7.34125 2.85325,7.14625 C2.65825,6.95125 2.34125,6.95125 2.14625,7.14625 L0.14625,9.14625 C-0.04875,9.34125 -0.04875,9.65825 0.14625,9.85325 L2.14625,11.85325 C2.24425,11.95125 2.37225,11.99925 2.50025,11.99925 C2.62725,11.99825 2.75525,11.94925 2.85325,11.85225 Z"
	        }),
	        React.createElement("path", {
	            d: "M26.85325,11.85225 C27.04825,11.65725 27.04825,11.34025 26.85325,11.14525 L25.20725,9.49925 L26.85325,7.85325 C27.04825,7.65825 27.04825,7.34125 26.85325,7.14625 C26.65825,6.95125 26.34125,6.95125 26.14625,7.14625 L24.14625,9.14625 C23.95125,9.34125 23.95125,9.65825 24.14625,9.85325 L26.14625,11.85325 C26.24425,11.95125 26.37225,11.99925 26.50025,11.99925 C26.62725,11.99825 26.75525,11.94925 26.85325,11.85225 Z",
	            transform: "translate(25.499750, 9.499625) scale(-1, 1) translate(-25.499750, -9.499625) "
	        })
	    )
	);

	var SettingsItem = {
	    trigger: icon,
	    tooltip: messages.editor.settings.tooltip,
	    title: messages.editor.settings.title,
	    header: [icon, React.createElement(
	        "span",
	        null,
	        messages.editor.settings.header
	    )],
	    body: [React.createElement(_SettingsBody2.default, null)],
	    closeIcon: "submit",
	    onSubmit: onSubmitAction,
	    width: 350,
	    height: 170,
	    submitOnBlur: false
	};

	exports.default = SettingsItem;


	function onSubmitAction(headerStates, bodyStates) {
	    var shoudPageReload = false;
	    var state = bodyStates[0];
	    var values = {
	        loop: state.loop,
	        autoplayTime: state.autoplayTime,
	        autoplay: state.autoplay,
	        items: state.items,
	        margins: state.margins
	    };

	    if (lodash.isEqual(state.initValue, values)) return;

	    if (!lodash.isEqual(values.margins, state.initValue.margins)) {
	        var resolutions = ['data-margin', 'data-xs-margin', 'data-sm-margin', 'data-md-margin', 'data-lg-margin', 'data-xl-margin'];

	        for (var i = 0; i < resolutions.length; i++) {
	            if (values.margins[i] !== state.initValue.margins[i]) {
	                novi.element.setAttribute(state.element, "" + resolutions[i], values.margins[i]);
	            }
	        }
	        shoudPageReload = true;
	    }

	    if (!lodash.isEqual(values.items, state.initValue.items)) {
	        var _resolutions = ['data-items', 'data-xs-items', 'data-sm-items', 'data-md-items', 'data-lg-items', 'data-xl-items'];

	        for (var _i = 0; _i < _resolutions.length; _i++) {
	            if (values.items[_i] !== state.initValue.items[_i]) {
	                novi.element.setAttribute(state.element, "" + _resolutions[_i], values.items[_i]);
	            }
	        }
	        shoudPageReload = true;
	    }
	    if (values.loop !== state.initValue.loop) {
	        novi.element.setAttribute(state.element, "data-loop", values.loop);
	        state.element.setAttribute("data-loop", values.loop);
	    }

	    if (values.autoplay !== state.initValue.autoplay) {
	        novi.element.setAttribute(state.element, "data-autoplay", values.autoplay);
	        state.element.setAttribute("data-autoplay", values.autoplay);
	    }

	    if (values.autoplayTime !== state.initValue.autoplayTime) {
	        novi.element.setAttribute(state.element, "data-autoplay-timeout", values.autoplayTime * 1000);
	        state.element.setAttribute("data-autoplay-timeout", values.autoplayTime * 1000);
	    }

	    if (shoudPageReload) novi.page.forceUpdate();
	}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Input = novi.ui.input;
	var React = novi.react.React;
	var Component = novi.react.Component;
	var Switcher = novi.ui.switcher;
	var InputNumber = novi.ui.inputNumber;
	var Editor = novi.editor;
	var Language = novi.language;

	var Body = function (_Component) {
	    _inherits(Body, _Component);

	    function Body(props) {
	        _classCallCheck(this, Body);

	        var _this = _possibleConstructorReturn(this, (Body.__proto__ || Object.getPrototypeOf(Body)).call(this, props));

	        var autoplayTime = novi.element.getAttribute(props.element, 'data-autoplay-timeout') / 1000 || "";
	        var autoplay = novi.element.getAttribute(props.element, 'data-autoplay') === "true";
	        var loop = novi.element.getAttribute(props.element, 'data-loop') === "true";
	        var margins = _this.getMargins(props.element);
	        var items = _this.getItems(props.element);

	        if (autoplay) Editor.setBodyHeight(220);
	        _this.state = {
	            loop: loop,
	            autoplayTime: autoplayTime,
	            autoplay: autoplay,
	            items: items,
	            margins: margins,
	            initValue: {
	                loop: loop,
	                autoplayTime: autoplayTime,
	                autoplay: autoplay,
	                items: items,
	                margins: margins
	            },
	            element: props.element,
	            childElement: props.childElement
	        };
	        _this.style = '\n        .owl-wrap{\n            padding: 0 12px;\n            display: flex;\n            flex-direction: column;\n            justify-content: center;\n            height: 100%;\n            color: #6E778A;\n        }\n        .owl-switcher{\n            display: flex;\n            flex-direction: row;\n            justify-content: space-between;\n            align-items: center;\n            margin-top: 16px;\n            -webkit-transition: 0.15s all cubic-bezier(0.4, 0, 1, 1);\n            transition: 0.15s all cubic-bezier(0.4, 0, 1, 1);\n            opacity: 1;\n            visibility: visible;\n        }\n        .owl-switcher.disabled{\n            opacity: 0;\n            visibility: hidden;\n            height: 0;\n            margin-top: 0;\n        }\n      \n        .owl-switcher .novi-input{\n            width: 55px;\n        }  \n        .owl-wrap .Select-menu-outer, .owl-wrap .Select-menu{\n            max-height: 85px;\n        }\n        .owl-group{\n            display: flex;\n            align-items: center;\n            justify-content: space-between;\n        }\n        ';
	        _this._handleItemChange = _this._handleItemChange.bind(_this);
	        _this._handleMarginChange = _this._handleMarginChange.bind(_this);
	        _this._handleAutoplayChange = _this._handleAutoplayChange.bind(_this);
	        _this._handleSwitcherChange = _this._handleSwitcherChange.bind(_this);
	        _this._handleLoopChange = _this._handleLoopChange.bind(_this);
	        _this._renderAutoPlaySeconds = _this._renderAutoPlaySeconds.bind(_this);
	        _this.messages = Language.getDataByKey("novi-plugin-owl-carousel");
	        return _this;
	    }

	    _createClass(Body, [{
	        key: 'render',
	        value: function render() {
	            var activeItem = this.getActiveItemValue(this.state.items);
	            var activeMargin = this.getActiveItemValue(this.state.margins);
	            return React.createElement(
	                'div',
	                { className: 'owl-wrap' },
	                React.createElement(
	                    'style',
	                    null,
	                    this.style
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'owl-group' },
	                    React.createElement(
	                        'div',
	                        null,
	                        React.createElement(
	                            'p',
	                            { className: 'novi-label', style: { "marginTop": "0" } },
	                            this.messages.editor.settings.body.visibleItems
	                        ),
	                        React.createElement(InputNumber, { min: 1, value: activeItem, onChange: this._handleItemChange })
	                    ),
	                    React.createElement(
	                        'div',
	                        { style: { "marginLeft": "10px" } },
	                        React.createElement(
	                            'p',
	                            { className: 'novi-label', style: { "marginTop": "0" } },
	                            this.messages.editor.settings.body.indent
	                        ),
	                        React.createElement(InputNumber, { min: 0, value: activeMargin, onChange: this._handleMarginChange })
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'owl-switcher' },
	                    React.createElement(
	                        'p',
	                        { className: 'novi-label', style: { "margin": 0 } },
	                        this.messages.editor.settings.body.loop
	                    ),
	                    React.createElement(Switcher, { isActive: this.state.loop, onChange: this._handleLoopChange })
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'owl-switcher' },
	                    React.createElement(
	                        'p',
	                        { className: 'novi-label', style: { "margin": 0 } },
	                        this.messages.editor.settings.body.autoplay
	                    ),
	                    React.createElement(Switcher, { isActive: this.state.autoplay, onChange: this._handleSwitcherChange })
	                ),
	                this._renderAutoPlaySeconds()
	            );
	        }
	    }, {
	        key: '_renderAutoPlaySeconds',
	        value: function _renderAutoPlaySeconds() {
	            var switcherName = this.state.autoplay ? "owl-switcher" : "owl-switcher disabled";
	            return React.createElement(
	                'div',
	                { className: switcherName },
	                React.createElement(
	                    'p',
	                    { className: 'novi-label', style: { "margin": 0 } },
	                    this.messages.editor.settings.body.autoplayDelay
	                ),
	                React.createElement(
	                    'div',
	                    { style: { "maxWidth": "56px" } },
	                    React.createElement(InputNumber, { min: 1, value: this.state.autoplayTime, onChange: this._handleAutoplayChange })
	                )
	            );
	        }
	    }, {
	        key: '_handleAutoplayChange',
	        value: function _handleAutoplayChange(value) {
	            this.setState({
	                autoplayTime: value
	            });
	        }
	    }, {
	        key: '_handleSwitcherChange',
	        value: function _handleSwitcherChange(isActive) {
	            if (isActive) Editor.setBodyHeight(220);else Editor.setBodyHeight(170);
	            this.setState({
	                autoplay: isActive
	            });
	        }
	    }, {
	        key: '_handleLoopChange',
	        value: function _handleLoopChange(isActive) {
	            this.setState({
	                loop: isActive
	            });
	        }
	    }, {
	        key: '_handleItemChange',
	        value: function _handleItemChange(value) {
	            var items = [];
	            items = items.concat(this.state.items);
	            var activeItem = this.getActiveItem(this.state.element);
	            items[activeItem] = value.toString();
	            this.setState({
	                items: items
	            });
	        }
	    }, {
	        key: '_handleMarginChange',
	        value: function _handleMarginChange(value) {
	            var margins = [];
	            margins = margins.concat(this.state.margins);
	            var activeItem = this.getActiveItem(this.state.element);
	            margins[activeItem] = value.toString();
	            this.setState({
	                margins: margins
	            });
	        }
	    }, {
	        key: 'getItems',
	        value: function getItems(element) {
	            return [novi.element.getAttribute(element, 'data-items') || null, novi.element.getAttribute(element, 'data-xs-items') || null, novi.element.getAttribute(element, 'data-sm-items') || null, novi.element.getAttribute(element, 'data-md-items') || null, novi.element.getAttribute(element, 'data-lg-items') || null, novi.element.getAttribute(element, 'data-xl-items') || null];
	        }
	    }, {
	        key: 'getMargins',
	        value: function getMargins(element) {
	            return [novi.element.getAttribute(element, 'data-margin') ? novi.element.getAttribute(element, 'data-margin').replace("px", "") : null, novi.element.getAttribute(element, 'data-xs-margin') ? novi.element.getAttribute(element, 'data-xs-margin').replace("px", "") : null, novi.element.getAttribute(element, 'data-sm-margin') ? novi.element.getAttribute(element, 'data-sm-margin').replace("px", "") : null, novi.element.getAttribute(element, 'data-md-margin') ? novi.element.getAttribute(element, 'data-md-margin').replace("px", "") : null, novi.element.getAttribute(element, 'data-lg-margin') ? novi.element.getAttribute(element, 'data-lg-margin').replace("px", "") : null, novi.element.getAttribute(element, 'data-xl-margin') ? novi.element.getAttribute(element, 'data-xl-margin').replace("px", "") : null];
	        }
	    }, {
	        key: 'getActiveItem',
	        value: function getActiveItem(element) {
	            var size = novi.viewport.getActiveSize();
	            if (!size.width) {
	                size.width = element.ownerDocument.defaultView.innerWidth;
	            }

	            return size.width < 480 ? 0 : size.width < 768 ? 1 : size.width < 992 ? 2 : size.width < 1200 ? 3 : size.width < 1600 ? 4 : 5;
	        }
	    }, {
	        key: 'getActiveItemValue',
	        value: function getActiveItemValue(items) {
	            var resolutionIndex = this.getActiveItem(this.state.element);
	            if (items[resolutionIndex]) return items[resolutionIndex];

	            for (var i = resolutionIndex; resolutionIndex >= 0; i--) {
	                if (items[i] !== null) return items[i];
	            }
	        }
	    }]);

	    return Body;
	}(Component);

	exports.default = Body;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _Utils = __webpack_require__(4);

	var Utils = _interopRequireWildcard(_Utils);

	var _Excerpts = __webpack_require__(5);

	var Excerpts = _interopRequireWildcard(_Excerpts);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var React = novi.react.React;
	var Icons = novi.ui.icons;
	var Icon = novi.ui.icon;

	var messages = novi.language.getDataByKey("novi-plugin-owl-carousel");
	var MoveSlideLeftItem = {
	    trigger: React.createElement(
	        Icon,
	        null,
	        Icons.ICON_ENTER_LEFT
	    ),
	    tooltip: messages.editor.moveSlideLeft.tooltip,
	    closeIcon: "submit",
	    title: messages.editor.moveSlideLeft.title,
	    excerpt: Excerpts.canMoveLeft,
	    onTriggerClick: moveSlideLeft,
	    highlightChild: true
	};

	exports.default = MoveSlideLeftItem;


	function moveSlideLeft(element, childElement) {

	    var staticSlide = novi.element.getStaticReference(childElement),
	        prevSlide = Utils.getPrevElement(element, childElement),
	        prevStaticSlide = novi.element.getStaticReference(prevSlide);

	    if (!staticSlide || !prevStaticSlide) return;

	    if (element.owl) {
	        moveStaticLeft(staticSlide, prevSlide);
	        moveElementLeft(element, childElement, staticSlide);
	    } else {
	        moveStaticLeft(staticSlide, prevSlide);
	        novi.page.forceUpdate();
	    }
	}

	function moveStaticLeft(staticSlide, prevSlide) {
	    novi.element.insertStaticBefore(staticSlide, prevSlide);
	}

	function moveElementLeft(element, childElement, staticItem) {
	    var carousel = element.owl;
	    var itemIndex = Utils.getRemoveElementIndex(element, childElement);
	    var newItem = novi.element.map(staticItem);
	    carousel.trigger('remove.owl.carousel', itemIndex);
	    carousel.trigger('add.owl.carousel', [newItem, itemIndex - 1]);
	    carousel.trigger('refresh.owl.carousel');
	}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getLastSlideElement = getLastSlideElement;
	exports.getElementIndex = getElementIndex;
	exports.getRemoveElementIndex = getRemoveElementIndex;
	exports.getPrevElement = getPrevElement;
	exports.getNextElement = getNextElement;
	exports.isLastPrevSlide = isLastPrevSlide;
	var utils = novi.utils;
	function getLastSlideElement(element) {
	    var slides = element.querySelectorAll(".owl-stage-outer .owl-stage > *");
	    return slides[slides.length - 1].firstChild;
	}

	function getElementIndex(element, childElement) {
	    var slides = element.querySelectorAll(".owl-stage-outer .owl-stage > *");
	    var targetElement = childElement.parentNode;
	    for (var i = 0; i < slides.length; i++) {
	        if (slides[i] === targetElement && i !== slides.length - 1) return i + 1;
	    }
	}
	function getRemoveElementIndex(element, childElement) {
	    var slides = element.querySelectorAll(".owl-stage-outer .owl-stage > *");
	    if (!childElement) return slides.length - 1;
	    var targetElement = childElement.parentNode;
	    for (var i = 0; i < slides.length; i++) {
	        if (slides[i] === targetElement) return i;
	    }
	}
	function getPrevElement(element, childElement) {
	    var index = getRemoveElementIndex(element, childElement);
	    if (index === undefined) return;
	    var slides = element.querySelectorAll(".owl-stage-outer .owl-stage > *");
	    return slides[index - 1].firstChild;
	}

	function getNextElement(element, childElement) {
	    var index = getRemoveElementIndex(element, childElement);
	    if (index === undefined) return false;
	    var slides = element.querySelectorAll(".owl-stage-outer .owl-stage > *");
	    return slides[index + 2].firstChild;
	}

	function isLastPrevSlide(element, childElement) {
	    var index = getRemoveElementIndex(element, childElement);
	    if (index === undefined) return false;
	    var slides = element.querySelectorAll(".owl-stage-outer .owl-stage > *");
	    return index + 1 === slides.length - 1;
	}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.canMoveLeft = canMoveLeft;
	exports.canMoveRight = canMoveRight;

	var _Utils = __webpack_require__(4);

	var Utils = _interopRequireWildcard(_Utils);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function canMoveLeft(element, childElement) {
	    if (!childElement) return false;
	    var itemIndex = Utils.getRemoveElementIndex(element, childElement);
	    return itemIndex > 0;
	}
	function canMoveRight(element, childElement) {
	    if (!childElement) return false;
	    var itemIndex = Utils.getRemoveElementIndex(element, childElement);
	    var lastIndex = Utils.getRemoveElementIndex(element);
	    return lastIndex !== itemIndex;
	}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _Utils = __webpack_require__(4);

	var Utils = _interopRequireWildcard(_Utils);

	var _Excerpts = __webpack_require__(5);

	var Excerpts = _interopRequireWildcard(_Excerpts);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var React = novi.react.React;
	var Icons = novi.ui.icons;
	var Icon = novi.ui.icon;

	var messages = novi.language.getDataByKey("novi-plugin-owl-carousel");
	var MoveSlideRightItem = {
	    trigger: React.createElement(
	        Icon,
	        null,
	        Icons.ICON_ENTER_RIGHT
	    ),
	    tooltip: messages.editor.moveSlideRight.tooltip,
	    closeIcon: "submit",
	    title: messages.editor.moveSlideRight.title,
	    excerpt: Excerpts.canMoveRight,
	    onTriggerClick: moveSlideRight,
	    highlightChild: true
	};

	exports.default = MoveSlideRightItem;


	function moveSlideRight(element, childElement) {
	    novi.element.hover(element);
	    var staticSlide = novi.element.getStaticReference(childElement);
	    if (!staticSlide) return novi.element.hover(element);

	    // use append for last prev slide
	    if (Utils.isLastPrevSlide(element, childElement)) {
	        if (element.owl) {
	            appendStatic(element, childElement);
	            moveElementRight(element, childElement, staticSlide, true);
	        } else {
	            appendStatic(element, childElement);
	            novi.page.forceUpdate();
	        }
	    } else {
	        var nextSlide = Utils.getNextElement(element, childElement),
	            nextStaticSlide = novi.element.getStaticReference(nextSlide);

	        if (!nextStaticSlide) return novi.element.hover(element);

	        if (element.owl) {
	            novi.element.insertStaticBefore(staticSlide, nextSlide);
	            moveElementRight(element, childElement, staticSlide);
	        } else {
	            novi.element.insertStaticBefore(staticSlide, nextSlide);
	            novi.page.forceUpdate();
	        }
	    }
	}

	function moveElementRight(element, childElement, staticItem, last) {
	    var carousel = element.owl;
	    var itemIndex = Utils.getRemoveElementIndex(element, childElement);
	    var newItem = novi.element.map(staticItem);
	    carousel.trigger('remove.owl.carousel', itemIndex);
	    if (last) {
	        carousel.trigger('add.owl.carousel', [newItem]);
	    } else {
	        carousel.trigger('add.owl.carousel', [newItem, itemIndex + 1]);
	    }
	    carousel.trigger('refresh.owl.carousel');
	}

	function appendStatic(element, currentSlide) {
	    var staticElement = novi.element.getStaticReference(currentSlide);
	    var staticSlideParent = novi.element.getStaticReference(element);
	    novi.element.appendStatic(staticElement, staticSlideParent);
	}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _Utils = __webpack_require__(4);

	var Utils = _interopRequireWildcard(_Utils);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var React = novi.react.React;
	var Icons = novi.ui.icons;
	var Icon = novi.ui.icon;
	var messages = novi.language.getDataByKey("novi-plugin-owl-carousel");
	var AddSlideItem = {
	    trigger: React.createElement(
	        Icon,
	        null,
	        Icons.ICON_PLUS_SQUARE
	    ),
	    tooltip: messages.editor.addSlide.tooltip,
	    closeIcon: "submit",
	    title: messages.editor.addSlide.title,
	    onTriggerClick: addSlide,
	    highlightChild: true
	};

	exports.default = AddSlideItem;


	function addSlide(element, childElement) {
	    if (element.owl) {
	        if (childElement) {
	            var staticSlide = insertStaticChildElement(element, childElement);
	            insertChildElement(element, childElement, staticSlide);
	        } else {
	            var _staticSlide = insertStaticElement(element);
	            insertElement(element, _staticSlide);
	        }
	    } else {
	        if (childElement) {
	            insertStaticChildElement(element, childElement);
	            novi.page.forceUpdate();
	        } else {
	            insertStaticElement(element);
	            novi.page.forceUpdate();
	        }
	    }
	}

	function insertStaticChildElement(element, childElement) {
	    var staticSlide = novi.element.getStaticReference(childElement);
	    if (!staticSlide) return;
	    var newStaticSlide = staticSlide.cloneNode(true);
	    var staticSlideNextSibling = novi.element.getStaticReference(childElement.parentNode.nextSibling);
	    if (staticSlideNextSibling) {
	        novi.element.insertStaticBefore(newStaticSlide, staticSlideNextSibling);
	    } else {
	        var staticSlideParent = novi.element.getStaticReference(element);
	        novi.element.appendStatic(newStaticSlide, staticSlideParent);
	    }
	    return newStaticSlide;
	}

	function insertStaticElement(element) {
	    var slide = Utils.getLastSlideElement(element);
	    if (!slide) return;
	    var staticSlide = novi.element.getStaticReference(slide);
	    if (!staticSlide) return;
	    var newStaticSlide = staticSlide.cloneNode(true);
	    var staticSlideParent = novi.element.getStaticReference(element);
	    novi.element.appendStatic(newStaticSlide, staticSlideParent);

	    return newStaticSlide;
	}

	function insertChildElement(element, childElement, staticSlide) {
	    if (!staticSlide) return;
	    var newDynamicSlide = novi.element.map(staticSlide);
	    var carousel = element.owl;
	    var insertIndex = Utils.getElementIndex(element, childElement);
	    if (insertIndex) {
	        carousel.trigger('add.owl.carousel', [newDynamicSlide, insertIndex]);
	    } else {
	        carousel.trigger('add.owl.carousel', [newDynamicSlide]);
	    }

	    carousel.trigger('refresh.owl.carousel');

	    if (insertIndex) {
	        carousel.trigger('to.owl.carousel', [insertIndex, 200, true]);
	    } else {
	        var _insertIndex = element.querySelectorAll(".owl-stage-outer .owl-stage > *").length;
	        carousel.trigger('to.owl.carousel', [_insertIndex, 200, true]);
	    }
	}
	function insertElement(element, staticSlide) {
	    if (!staticSlide) return;
	    var newDynamicSlide = novi.element.map(staticSlide);
	    var carousel = element.owl;
	    carousel.trigger('add.owl.carousel', [newDynamicSlide]);
	    carousel.trigger('refresh.owl.carousel');
	    var insertIndex = element.querySelectorAll(".owl-stage-outer .owl-stage > *").length;
	    carousel.trigger('to.owl.carousel', [insertIndex, 200, true]);
	}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _Utils = __webpack_require__(4);

	var Utils = _interopRequireWildcard(_Utils);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var React = novi.react.React;
	var Icons = novi.ui.icons;
	var Icon = novi.ui.icon;
	var messages = novi.language.getDataByKey("novi-plugin-owl-carousel");
	var RemoveSlideItem = {
	    trigger: React.createElement(
	        Icon,
	        null,
	        Icons.ICON_MINUS_SQUARE
	    ),
	    tooltip: messages.editor.removeSlide.tooltip,
	    closeIcon: "submit",
	    title: messages.editor.removeSlide.title,
	    onTriggerClick: removeSlide,
	    highlightChild: true
	};

	exports.default = RemoveSlideItem;


	function removeSlide(element, childElement) {
	    if (element.owl) {
	        if (childElement) {
	            var staticSlide = removeStaticChildElement(childElement);
	            removeElement(element, staticSlide, childElement);
	            novi.element.removeStatic(staticSlide);
	        } else {
	            var _staticSlide = removeStaticElement(element);
	            removeElement(element, _staticSlide);
	            novi.element.removeStatic(_staticSlide);
	        }
	    } else {
	        if (childElement) {
	            var _staticSlide2 = removeStaticChildElement(childElement);
	            novi.element.removeStatic(_staticSlide2);
	            novi.page.forceUpdate();
	        } else {
	            var _staticSlide3 = removeStaticElement(element);
	            novi.element.removeStatic(_staticSlide3);
	            novi.page.forceUpdate();
	        }
	    }
	}

	function removeStaticChildElement(childElement) {
	    var staticSlide = novi.element.getStaticReference(childElement);
	    if (!staticSlide) return;
	    return staticSlide;
	}

	function removeStaticElement(element) {
	    var lastElement = Utils.getLastSlideElement(element);
	    var staticSlide = novi.element.getStaticReference(lastElement);
	    if (!staticSlide) return;
	    return staticSlide;
	}

	function removeElement(element, staticSlide, childElement) {
	    if (!staticSlide) return;
	    var carousel = element.owl;
	    var removeIndex = Utils.getRemoveElementIndex(element, childElement);
	    carousel.trigger('remove.owl.carousel', removeIndex);
	    carousel.trigger('refresh.owl.carousel');
	}

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = novi.react.React;
	var Component = novi.react.Component;
	var Input = novi.ui.input;
	var Button = novi.ui.button;
	var Language = novi.language;

	var Settings = function (_Component) {
	    _inherits(Settings, _Component);

	    function Settings(props) {
	        _classCallCheck(this, Settings);

	        var _this = _possibleConstructorReturn(this, (Settings.__proto__ || Object.getPrototypeOf(Settings)).call(this));

	        _this.state = {
	            settings: {
	                querySelector: props.settings.querySelector
	            }
	        };
	        _this.saveSettings = _this.saveSettings.bind(_this);
	        _this.onChange = _this.onChange.bind(_this);
	        _this.messages = Language.getDataByKey("novi-plugin-owl-carousel");
	        return _this;
	    }

	    _createClass(Settings, [{
	        key: "componentWillReceiveProps",
	        value: function componentWillReceiveProps(props) {
	            this.setState({
	                settings: {
	                    querySelector: props.settings.querySelector
	                }
	            });
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            return React.createElement(
	                "div",
	                null,
	                React.createElement(
	                    "span",
	                    { style: { letterSpacing: "0,0462em" } },
	                    "Owl Carousel Plugin"
	                ),
	                React.createElement(
	                    "div",
	                    { style: { fontSize: 13, color: "#6E778A", marginTop: 21 } },
	                    this.messages.settings.inputPlaceholder
	                ),
	                React.createElement(Input, { style: { marginTop: 10, width: 340 }, value: this.state.settings.querySelector, onChange: this.onChange }),
	                React.createElement(
	                    "div",
	                    { style: { marginTop: 30 } },
	                    React.createElement(Button, { type: "primary", messages: { textContent: this.messages.settings.submitButton }, onClick: this.saveSettings })
	                )
	            );
	        }
	    }, {
	        key: "onChange",
	        value: function onChange(e) {
	            var value = e.target.value;
	            this.setState({
	                settings: {
	                    querySelector: value
	                }
	            });
	        }
	    }, {
	        key: "saveSettings",
	        value: function saveSettings() {
	            novi.plugins.settings.update("novi-plugin-owl-carousel", this.state.settings);
	        }
	    }]);

	    return Settings;
	}(Component);

	exports.default = Settings;

/***/ })
/******/ ]);