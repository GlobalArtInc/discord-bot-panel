/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "js/" + ({}[chunkId]||chunkId) + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/discord-bot-panel/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"chunk-vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ \"./node_modules/core-js/modules/es.symbol.js\");\n/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description */ \"./node_modules/core-js/modules/es.symbol.description.js\");\n/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.concat */ \"./node_modules/core-js/modules/es.array.concat.js\");\n/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ \"./node_modules/core-js/modules/es.array.for-each.js\");\n/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_es_array_from__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.from */ \"./node_modules/core-js/modules/es.array.from.js\");\n/* harmony import */ var core_js_modules_es_array_from__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_from__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var core_js_modules_es_array_includes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.includes */ \"./node_modules/core-js/modules/es.array.includes.js\");\n/* harmony import */ var core_js_modules_es_array_includes__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var core_js_modules_es_array_join__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.join */ \"./node_modules/core-js/modules/es.array.join.js\");\n/* harmony import */ var core_js_modules_es_array_join__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_join__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.function.name */ \"./node_modules/core-js/modules/es.function.name.js\");\n/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.regexp.exec */ \"./node_modules/core-js/modules/es.regexp.exec.js\");\n/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var core_js_modules_es_string_ends_with__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.string.ends-with */ \"./node_modules/core-js/modules/es.string.ends-with.js\");\n/* harmony import */ var core_js_modules_es_string_ends_with__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_ends_with__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var core_js_modules_es_string_includes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.string.includes */ \"./node_modules/core-js/modules/es.string.includes.js\");\n/* harmony import */ var core_js_modules_es_string_includes__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ \"./node_modules/core-js/modules/es.string.iterator.js\");\n/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var core_js_modules_es_string_match_all__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.string.match-all */ \"./node_modules/core-js/modules/es.string.match-all.js\");\n/* harmony import */ var core_js_modules_es_string_match_all__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_match_all__WEBPACK_IMPORTED_MODULE_12__);\n/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.string.replace */ \"./node_modules/core-js/modules/es.string.replace.js\");\n/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_13__);\n/* harmony import */ var core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.string.split */ \"./node_modules/core-js/modules/es.string.split.js\");\n/* harmony import */ var core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_14__);\n/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ \"./node_modules/core-js/modules/web.dom-collections.for-each.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_15__);\n/* harmony import */ var I_Projects_Bot_Panel_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/toConsumableArray */ \"./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js\");\n/* harmony import */ var I_Projects_Bot_Panel_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2 */ \"./node_modules/@babel/runtime/helpers/esm/objectSpread2.js\");\n/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! vuex */ \"./node_modules/vuex/dist/vuex.esm.js\");\n/* harmony import */ var _bot__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./bot */ \"./src/bot.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'App',\n  data: function data() {\n    return {\n      currentServer: 0,\n      form: {\n        token: ''\n      },\n      token: ''\n    };\n  },\n  computed: Object(I_Projects_Bot_Panel_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_17__[\"default\"])({}, Object(vuex__WEBPACK_IMPORTED_MODULE_18__[\"mapGetters\"])(['client', 'guild', 'guilds', 'channel', 'channels', 'messages', 'botLogged', 'status'])),\n  mounted: function mounted() {\n    if (localStorage.token) {\n      this.$store.dispatch('bot/setStatus', true);\n      this.$store.dispatch('bot/init', localStorage.token);\n    } else {\n      this.$store.dispatch('bot/setStatus', false);\n    }\n  },\n  methods: {\n    onScroll: function onScroll(e) {\n      this.offsetTop = e.target.scrollTop;\n    },\n    replaceMarkdown: function replaceMarkdown(text, markdown, start, end, join) {\n      if (text === \"\" || !text.includes(markdown)) {\n        return text;\n      } else {\n        var content = text.split(markdown);\n\n        if (content.length > 2) {\n          for (var i = 0; i < content.length; i++) {\n            if (i !== 0 && i % 2 !== 0 && content[i] !== \"\") {\n              content[i] = start + content[i] + end;\n            } else if (i !== 0 && i % 2 !== 0 && content[i] === \"\") {\n              content[i] = join + join;\n            }\n          }\n\n          return content.join(\"\");\n        } else {\n          return content.join(join);\n        }\n      }\n    },\n    escapeHtml: function escapeHtml(text) {\n      return text.replace(/&/g, \"&amp;\").replace(/</g, \"&lt;\").replace(/>/g, \"&gt;\").replace(/\"/g, \"&quot;\").replace(/'/g, \"&#039;\");\n    },\n    embedLinks: function embedLinks(element) {\n      var html = \"<div>\";\n\n      if (element.iconURL) {\n        html += \"<a href=\\\"\".concat(element.iconURL, \"\\\" target=\\\"_blank\\\"><img class=\\\"avatarIMG\\\" src=\\\"\").concat(element.iconURL, \"\\\" alt=\\\"\\\"></a>\");\n      }\n\n      if (element.url) {\n        html += \"<a href=\\\"\".concat(element.url, \"\\\">\").concat(element.name || element.text, \"</a>\");\n      } else {\n        html += element.name || element.text;\n      }\n\n      html += \"</div>\";\n      return html;\n    },\n    createMessage: function createMessage(message) {\n      var _this = this;\n\n      var html;\n      var attachments = [];\n      var embeds = [];\n      var links = [];\n      Array.from(message.attachments).forEach(function (attachment) {\n        var attachmentUrl = attachment[1].url;\n        var attachmentTxt = \"<a href=\\\"\".concat(_this.escapeHtml(attachmentUrl), \"\\\" target=\\\"_blank\\\">\");\n\n        if (attachmentUrl.endsWith(\".jpg\") || attachmentUrl.endsWith(\".jpeg\") || attachmentUrl.endsWith(\".png\")) {\n          return embeds.push(\"<div><a href=\\\"\".concat(attachmentUrl, \"\\\" target=\\\"_blank\\\"><img style=\\\"max-width: 100%;max-height: 300px;object-fit: scale-down;margin: 5px 0 0 0\\\" src=\\\"\").concat(attachmentUrl, \"\\\" alt=\\\"\\\"></a></div>\"));\n        } else if (attachmentUrl.endsWith(\".mp4\")) {\n          return embeds.push(\"<div><figure><figcaption>\".concat(attachment[1].name, \"</figcaption><video controls src=\\\"\").concat(attachmentUrl, \"\\\"></video></figure></div>\"));\n        } else if (attachmentUrl.endsWith(\".mp3\")) {\n          return embeds.push(\"<div><figure><figcaption>\".concat(attachment[1].name, \"</figcaption><audio controls src=\\\"\").concat(attachmentUrl, \"\\\"></audio></figure></div>\"));\n        } else if (attachmentUrl.endsWith(\".docx\") || attachmentUrl.endsWith(\".odt\")) {\n          attachmentTxt += 'doc';\n        } else if (attachmentUrl.endsWith(\".pdf\")) {\n          attachmentTxt += 'pdf';\n        } else {\n          attachmentTxt += 'unknown';\n        }\n\n        attachmentTxt += \"</a>\";\n        attachments.push(attachmentTxt);\n      });\n\n      if (message.embeds.length) {\n        var embed = message.embeds[0];\n        var images = [];\n        var fields = [];\n\n        var _html = \"<div class=\\\"embed\\\" \".concat(embed.hexColor ? \"style=\\\"border-left: 5px solid \".concat(embed.hexColor, \"\\\"\") : \"\", \">\");\n\n        if (embed.url) {\n          links.push(embed.url);\n        }\n\n        if (embed.image) {\n          var length = message.embeds.length;\n\n          for (var i = 0; i < message.embeds.length; i++) {\n            var style = \"padding: 2px;\";\n            var image = message.embeds[i].image;\n\n            if (length === 1) {\n              style += \"border-radius: 8px;width: 100%;height:300px;object-fit: scale-down;\";\n            } else if (length === 2) {\n              if (i === 0) {\n                style += \"border-radius: 8px 0 0 8px;width: 50%;height:300px;object-fit: cover;\";\n              } else {\n                style += \"border-radius: 0 8px 8px 0;width: 50%;height:300px;object-fit: cover;\";\n              }\n            } else if (length === 3) {\n              if (i === 0) {\n                style += \"border-radius: 8px 0 0 8px;width: 50%;height:300px;object-fit: cover;float: left;\";\n              } else if (i === 1) {\n                style += \"border-radius: 0 8px 0 0;width: 50%;height:150px;object-fit: cover;vertical-align: top;float: right;\";\n              } else {\n                style += \"border-radius: 0 0 8px 0;width: 50%;height:150px;object-fit: cover;vertical-align: top;float: right;\";\n              }\n            } else {\n              if (i === 0) {\n                style += \"border-radius: 8px 0 0 0;width: 50%;height:150px;object-fit: cover;\";\n              }\n\n              if (i === 1) {\n                style += \"border-radius:  0 8px 0 0;width: 50%;height:150px;object-fit: cover;\";\n              }\n\n              if (i === 2) {\n                style += \"border-radius:  0 0 0 8px;width: 50%;height:150px;object-fit: cover;\";\n              }\n\n              if (i === 3) {\n                style += \"border-radius:  0 0 8px 0;width: 50%;height:150px;object-fit: cover;\";\n              }\n            }\n\n            images.push(\"<a href=\\\"\".concat(image.url, \"\\\" target=\\\"_blank\\\"><img style=\\\"\").concat(style, \"\\\" src=\\\"\").concat(image.url, \"\\\" alt=\\\"\\\"></a>\"));\n          }\n        }\n\n        if (embed.author) {\n          _html += this.embedLinks(embed.author);\n        }\n\n        if (embed.title) {\n          _html += \"<div><b>\".concat(embed.title, \"</b></div>\");\n        }\n\n        if (embed.description) {\n          _html += \"<div style=\\\"word-break: break-word;\\\">\".concat(this.formatMessage(embed.description), \"</div>\");\n        }\n\n        if (embed.fields.length > 0) {\n          _html += \"<div>\";\n          embed.fields.forEach(function (field) {\n            if (field.inline) {\n              fields.push(\"<span style=\\\"display: inline-block;min-width: 50%;word-break: break-word;\\\"><b>\".concat(field.name, \"</b><br>\").concat(_this.formatMessage(field.value), \"</span>\"));\n            } else {\n              fields.push(\"<div><b>\".concat(field.name, \"</b><br>\").concat(_this.formatMessage(field.value), \"</div>\"));\n            }\n          });\n          _html += \"\".concat(fields.join(''), \"</div>\");\n        }\n\n        if (embed.video !== null) {\n          _html += \"<div><video controls src=\\\"\".concat(embed.video.url, \"\\\"></video></div>\");\n        } else if (images.length) {\n          _html += \"<div>\".concat(images.join(''), \"</div>\");\n        } else if (embed.thumbnail !== null) {// bhtml += `<div><a href=\"${embed.thumbnail.url}\" target=\"_blank\"><img style=\"border-radius: 8px;width: 100%;height:300px;object-fit: cover;\" src=\"${embed.thumbnail.url}\" alt=\"\"></a></div>`;\n        }\n\n        if (embed.footer) {\n          _html += this.embedLinks(embed.footer);\n        }\n\n        _html += \"</div>\";\n        embeds.push(_html);\n      }\n\n      html = \"<div class=\\\"chatMsg\\\" id=\\\"\".concat(message.id, \"\\\">\"); // Different types of messages\n\n      if (message.type === \"GUILD_MEMBER_JOIN\") {\n        html += \"ServerJoin\";\n      } else if (message.type === \"PINS_ADD\") {\n        html += \"pin\";\n      } else if (message.type === \"CHANNEL_FOLLOW_ADD\") {\n        html += \"\\u041D\\u043E\\u0432\\u043E\\u0441\\u0442\\u0438\";\n      } else if (message.type.includes(\"USER_PREMIUM_GUILD_SUBSCRIPTION\")) {\n        html += \"Boost\"; // Covers all levels of boosting\n      } else if (message.content === \"\" && attachments.length > 0) {\n        html += \"FileSent\";\n      }\n\n      html += \"</div>\";\n      html += \"<div class=\\\"messageContent\\\">\".concat(message.content ? this.formatMessage(message.content, links) : \"\", \"</div>\");\n\n      if (embeds.length) {\n        html += \"\".concat(embeds.join(\"\"));\n      }\n\n      if (attachments.length) {\n        html += \"<div>Text : \".concat(attachments.join(', '), \"</div>\");\n      }\n\n      return \"\".concat(html, \"</div>\");\n    },\n    formatMessage: function formatMessage(content) {\n      // no-useless-escape\n      content = this.escapeHtml(content).replace(/\\n/g, \"<br>\").replace(/(&lt;a:(.*?):(\\d{18})&gt;)/g, \"<img title=\\\"$2\\\" alt=\\\"\\\" class=\\\"smallEmojiImg\\\" src=\\\"https://cdn.discordapp.com/emojis/$3\\\" onclick=\\\"addText('$1')\\\">\").replace(/(&lt;:(.*?):(\\d{18})&gt;)/g, \"<img title=\\\"$2\\\" alt=\\\"\\\" class=\\\"smallEmojiImg\\\" src=\\\"https://cdn.discordapp.com/emojis/$3\\\" onclick=\\\"addText('$1')\\\">\").replace(/\\[(.*)]\\((.*)\\)/g, \"<a href=\\\"$2\\\" target=\\\"_blank\\\">$1</a>\");\n\n      Object(I_Projects_Bot_Panel_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_16__[\"default\"])(content.matchAll(/&lt;@(!|)(\\d{18})&gt;/g)).forEach(function (match) {\n        content = content.replace(match[0], \"@\".concat(Object(_bot__WEBPACK_IMPORTED_MODULE_19__[\"getUser\"])(match[2])));\n      });\n\n      Object(I_Projects_Bot_Panel_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_16__[\"default\"])(content.matchAll(/&lt;#(\\d{18})&gt;/g)).forEach(function (match) {\n        content = content.replace(match[0], \"#\".concat(Object(_bot__WEBPACK_IMPORTED_MODULE_19__[\"getChannel\"])(match[1])));\n      });\n\n      content = this.replaceMarkdown(content, \"***\", \"<b><em>\", \"</em></b>\", \"***\");\n      content = this.replaceMarkdown(content, \"**\", \"<b>\", \"</b>\", \"&ast;&ast;\");\n      content = this.replaceMarkdown(content, \"*\", \"<em>\", \"</em>\", \"&ast;\");\n      content = this.replaceMarkdown(content, \"__\", \"<u>\", \"</u>\", \"&lowbar;&lowbar;\");\n      content = this.replaceMarkdown(content, \"~~\", \"<s>\", \"</s>\", \"&tilde;&tilde;\");\n      content = this.replaceMarkdown(content, \"```\", \"<div class='codeBlock'>\", \"</div>\", \"```\");\n      content = this.replaceMarkdown(content, \"`\", \"<div class='code'>\", \"</div>\", \"&grave;\");\n      return content;\n    },\n    deleteMessage: function deleteMessage(id) {\n      this.$store.dispatch('bot/delMessage', id);\n    },\n    onChangeChannel: function onChangeChannel(item) {\n      this.$store.dispatch('bot/setChannel', item);\n    },\n    onChangeServer: function onChangeServer(item) {\n      this.$store.dispatch('bot/setGuild', item);\n    },\n    destroy: function destroy() {\n      this.$store.dispatch('bot/logout');\n    },\n    login: function login() {\n      this.$store.dispatch('bot/init', this.form.token);\n    }\n  },\n  created: function created() {}\n});\n\n//# sourceURL=webpack:///./src/App.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"275fe603-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=template&id=7ba5bd90&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"275fe603-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=template&id=7ba5bd90& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"v-app\",\n    [\n      _c(\n        \"v-app-bar\",\n        { attrs: { app: \"\", color: \"primary\", dark: \"\" } },\n        [\n          _c(\n            \"div\",\n            { staticClass: \"d-flex align-center\" },\n            [\n              _c(\n                \"router-link\",\n                { attrs: { to: \"/\" } },\n                [\n                  _c(\"v-img\", {\n                    staticClass: \"shrink mr-2\",\n                    attrs: {\n                      alt: \"Vuetify Logo\",\n                      contain: \"\",\n                      src: __webpack_require__(/*! ./assets/Discord-Logo-White.svg */ \"./src/assets/Discord-Logo-White.svg\"),\n                      transition: \"scale-transition\",\n                      width: \"40\"\n                    }\n                  })\n                ],\n                1\n              )\n            ],\n            1\n          ),\n          _c(\"v-spacer\"),\n          _vm.botLogged\n            ? [\n                _c(\"v-btn\", { attrs: { to: \"/commands\" } }, [\n                  _vm._v(\" Слэш-команды \")\n                ]),\n                _c(\n                  \"v-btn\",\n                  {\n                    staticStyle: { \"margin-left\": \"1em\" },\n                    on: {\n                      click: function($event) {\n                        return _vm.$store.dispatch(\"bot/logout\")\n                      }\n                    }\n                  },\n                  [_vm._v(\" Выйти \")]\n                )\n              ]\n            : _vm._e()\n        ],\n        2\n      ),\n      _c(\n        \"v-main\",\n        [\n          _c(\n            \"v-container\",\n            { attrs: { fluid: \"\" } },\n            [\n              _vm.botLogged\n                ? _c(\"router-view\")\n                : _vm.status\n                ? [\n                    _c(\"v-progress-linear\", {\n                      attrs: {\n                        color: \"error\",\n                        absolute: \"\",\n                        top: \"\",\n                        indeterminate: \"\"\n                      }\n                    })\n                  ]\n                : [\n                    _c(\n                      \"v-form\",\n                      { ref: \"form\", attrs: { \"lazy-validation\": \"\" } },\n                      [\n                        _c(\"v-text-field\", {\n                          attrs: { filled: \"\", label: \"Токен\" },\n                          model: {\n                            value: _vm.form.token,\n                            callback: function($$v) {\n                              _vm.$set(_vm.form, \"token\", $$v)\n                            },\n                            expression: \"form.token\"\n                          }\n                        }),\n                        _c(\n                          \"v-btn\",\n                          {\n                            staticClass: \"mr-4\",\n                            attrs: { color: \"success\" },\n                            on: { click: _vm.login }\n                          },\n                          [_vm._v(\"Вход\")]\n                        )\n                      ],\n                      1\n                    )\n                  ]\n            ],\n            2\n          )\n        ],\n        1\n      )\n    ],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/App.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%22275fe603-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"275fe603-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Layout.vue?vue&type=template&id=31a768e4&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"275fe603-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Layout.vue?vue&type=template&id=31a768e4& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"router-view\")\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/views/Layout.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%22275fe603-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/assets/style.css":
/*!******************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!./node_modules/postcss-loader/src??ref--6-oneOf-3-2!./src/assets/style.css ***!
  \******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \".embed {\\r\\n    margin: 5px 0 0 0;\\r\\n    padding: 5px 5px 5px 7px;\\r\\n    display: block;\\r\\n    width: 60%;\\r\\n    border-radius: 5px;\\r\\n    background: rgb(26 26 27);\\r\\n}\\r\\n\\r\\n.codeBlock {\\r\\n    background-color: rgb(26 26 27);\\r\\n    border-radius: 7px;\\r\\n    padding: 10px;\\r\\n    border: 1px solid #232528;\\r\\n    display: block;\\r\\n}\\r\\n\\r\\n.avatarIMG {\\r\\n    border-radius: 15px;\\r\\n    height: 30px;\\r\\n    width: 30px;\\r\\n    margin: 0 5px 0 0;\\r\\n}\\r\\n.smallEmojiImg {\\r\\n    width: 25px;\\r\\n    height: 25px;\\r\\n}\\r\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/assets/style.css?./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!./node_modules/postcss-loader/src??ref--6-oneOf-3-2");

/***/ }),

/***/ "./node_modules/discord.js/src/client/websocket/handlers sync recursive ^\\.\\/.*\\.js$":
/*!*********************************************************************************!*\
  !*** ./node_modules/discord.js/src/client/websocket/handlers sync ^\.\/.*\.js$ ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./CHANNEL_CREATE.js\": \"./node_modules/discord.js/src/client/websocket/handlers/CHANNEL_CREATE.js\",\n\t\"./CHANNEL_DELETE.js\": \"./node_modules/discord.js/src/client/websocket/handlers/CHANNEL_DELETE.js\",\n\t\"./CHANNEL_PINS_UPDATE.js\": \"./node_modules/discord.js/src/client/websocket/handlers/CHANNEL_PINS_UPDATE.js\",\n\t\"./CHANNEL_UPDATE.js\": \"./node_modules/discord.js/src/client/websocket/handlers/CHANNEL_UPDATE.js\",\n\t\"./GUILD_BAN_ADD.js\": \"./node_modules/discord.js/src/client/websocket/handlers/GUILD_BAN_ADD.js\",\n\t\"./GUILD_BAN_REMOVE.js\": \"./node_modules/discord.js/src/client/websocket/handlers/GUILD_BAN_REMOVE.js\",\n\t\"./GUILD_CREATE.js\": \"./node_modules/discord.js/src/client/websocket/handlers/GUILD_CREATE.js\",\n\t\"./GUILD_DELETE.js\": \"./node_modules/discord.js/src/client/websocket/handlers/GUILD_DELETE.js\",\n\t\"./GUILD_EMOJIS_UPDATE.js\": \"./node_modules/discord.js/src/client/websocket/handlers/GUILD_EMOJIS_UPDATE.js\",\n\t\"./GUILD_INTEGRATIONS_UPDATE.js\": \"./node_modules/discord.js/src/client/websocket/handlers/GUILD_INTEGRATIONS_UPDATE.js\",\n\t\"./GUILD_MEMBERS_CHUNK.js\": \"./node_modules/discord.js/src/client/websocket/handlers/GUILD_MEMBERS_CHUNK.js\",\n\t\"./GUILD_MEMBER_ADD.js\": \"./node_modules/discord.js/src/client/websocket/handlers/GUILD_MEMBER_ADD.js\",\n\t\"./GUILD_MEMBER_REMOVE.js\": \"./node_modules/discord.js/src/client/websocket/handlers/GUILD_MEMBER_REMOVE.js\",\n\t\"./GUILD_MEMBER_UPDATE.js\": \"./node_modules/discord.js/src/client/websocket/handlers/GUILD_MEMBER_UPDATE.js\",\n\t\"./GUILD_ROLE_CREATE.js\": \"./node_modules/discord.js/src/client/websocket/handlers/GUILD_ROLE_CREATE.js\",\n\t\"./GUILD_ROLE_DELETE.js\": \"./node_modules/discord.js/src/client/websocket/handlers/GUILD_ROLE_DELETE.js\",\n\t\"./GUILD_ROLE_UPDATE.js\": \"./node_modules/discord.js/src/client/websocket/handlers/GUILD_ROLE_UPDATE.js\",\n\t\"./GUILD_UPDATE.js\": \"./node_modules/discord.js/src/client/websocket/handlers/GUILD_UPDATE.js\",\n\t\"./INVITE_CREATE.js\": \"./node_modules/discord.js/src/client/websocket/handlers/INVITE_CREATE.js\",\n\t\"./INVITE_DELETE.js\": \"./node_modules/discord.js/src/client/websocket/handlers/INVITE_DELETE.js\",\n\t\"./MESSAGE_CREATE.js\": \"./node_modules/discord.js/src/client/websocket/handlers/MESSAGE_CREATE.js\",\n\t\"./MESSAGE_DELETE.js\": \"./node_modules/discord.js/src/client/websocket/handlers/MESSAGE_DELETE.js\",\n\t\"./MESSAGE_DELETE_BULK.js\": \"./node_modules/discord.js/src/client/websocket/handlers/MESSAGE_DELETE_BULK.js\",\n\t\"./MESSAGE_REACTION_ADD.js\": \"./node_modules/discord.js/src/client/websocket/handlers/MESSAGE_REACTION_ADD.js\",\n\t\"./MESSAGE_REACTION_REMOVE.js\": \"./node_modules/discord.js/src/client/websocket/handlers/MESSAGE_REACTION_REMOVE.js\",\n\t\"./MESSAGE_REACTION_REMOVE_ALL.js\": \"./node_modules/discord.js/src/client/websocket/handlers/MESSAGE_REACTION_REMOVE_ALL.js\",\n\t\"./MESSAGE_REACTION_REMOVE_EMOJI.js\": \"./node_modules/discord.js/src/client/websocket/handlers/MESSAGE_REACTION_REMOVE_EMOJI.js\",\n\t\"./MESSAGE_UPDATE.js\": \"./node_modules/discord.js/src/client/websocket/handlers/MESSAGE_UPDATE.js\",\n\t\"./PRESENCE_UPDATE.js\": \"./node_modules/discord.js/src/client/websocket/handlers/PRESENCE_UPDATE.js\",\n\t\"./READY.js\": \"./node_modules/discord.js/src/client/websocket/handlers/READY.js\",\n\t\"./RESUMED.js\": \"./node_modules/discord.js/src/client/websocket/handlers/RESUMED.js\",\n\t\"./TYPING_START.js\": \"./node_modules/discord.js/src/client/websocket/handlers/TYPING_START.js\",\n\t\"./USER_UPDATE.js\": \"./node_modules/discord.js/src/client/websocket/handlers/USER_UPDATE.js\",\n\t\"./VOICE_SERVER_UPDATE.js\": \"./node_modules/discord.js/src/client/websocket/handlers/VOICE_SERVER_UPDATE.js\",\n\t\"./VOICE_STATE_UPDATE.js\": \"./node_modules/discord.js/src/client/websocket/handlers/VOICE_STATE_UPDATE.js\",\n\t\"./WEBHOOKS_UPDATE.js\": \"./node_modules/discord.js/src/client/websocket/handlers/WEBHOOKS_UPDATE.js\",\n\t\"./index.js\": \"./node_modules/discord.js/src/client/websocket/handlers/index.js\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./node_modules/discord.js/src/client/websocket/handlers sync recursive ^\\\\.\\\\/.*\\\\.js$\";\n\n//# sourceURL=webpack:///./node_modules/discord.js/src/client/websocket/handlers_sync_^\\.\\/.*\\.js$?");

/***/ }),

/***/ "./src/App.vue":
/*!*********************!*\
  !*** ./src/App.vue ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=7ba5bd90& */ \"./src/App.vue?vue&type=template&id=7ba5bd90&\");\n/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js& */ \"./src/App.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../node_modules/vuetify-loader/lib/runtime/installComponents.js */ \"./node_modules/vuetify-loader/lib/runtime/installComponents.js\");\n/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var vuetify_lib_components_VApp__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VApp */ \"./node_modules/vuetify/lib/components/VApp/index.js\");\n/* harmony import */ var vuetify_lib_components_VAppBar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VAppBar */ \"./node_modules/vuetify/lib/components/VAppBar/index.js\");\n/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ \"./node_modules/vuetify/lib/components/VBtn/index.js\");\n/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ \"./node_modules/vuetify/lib/components/VGrid/index.js\");\n/* harmony import */ var vuetify_lib_components_VForm__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VForm */ \"./node_modules/vuetify/lib/components/VForm/index.js\");\n/* harmony import */ var vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuetify/lib/components/VImg */ \"./node_modules/vuetify/lib/components/VImg/index.js\");\n/* harmony import */ var vuetify_lib_components_VMain__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vuetify/lib/components/VMain */ \"./node_modules/vuetify/lib/components/VMain/index.js\");\n/* harmony import */ var vuetify_lib_components_VProgressLinear__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! vuetify/lib/components/VProgressLinear */ \"./node_modules/vuetify/lib/components/VProgressLinear/index.js\");\n/* harmony import */ var vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! vuetify/lib/components/VTextField */ \"./node_modules/vuetify/lib/components/VTextField/index.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* vuetify-loader */\n\n\n\n\n\n\n\n\n\n\n\n_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VApp: vuetify_lib_components_VApp__WEBPACK_IMPORTED_MODULE_4__[\"VApp\"],VAppBar: vuetify_lib_components_VAppBar__WEBPACK_IMPORTED_MODULE_5__[\"VAppBar\"],VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_6__[\"VBtn\"],VContainer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__[\"VContainer\"],VForm: vuetify_lib_components_VForm__WEBPACK_IMPORTED_MODULE_8__[\"VForm\"],VImg: vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_9__[\"VImg\"],VMain: vuetify_lib_components_VMain__WEBPACK_IMPORTED_MODULE_10__[\"VMain\"],VProgressLinear: vuetify_lib_components_VProgressLinear__WEBPACK_IMPORTED_MODULE_11__[\"VProgressLinear\"],VSpacer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__[\"VSpacer\"],VTextField: vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_12__[\"VTextField\"]})\n\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/App.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/App.vue?vue&type=script&lang=js&":
/*!**********************************************!*\
  !*** ./src/App.vue?vue&type=script&lang=js& ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js??ref--12-0!../node_modules/babel-loader/lib!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/App.vue?vue&type=template&id=7ba5bd90&":
/*!****************************************************!*\
  !*** ./src/App.vue?vue&type=template&id=7ba5bd90& ***!
  \****************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_275fe603_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"275fe603-vue-loader-template\"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=template&id=7ba5bd90& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"275fe603-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=template&id=7ba5bd90&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_275fe603_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_275fe603_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/assets/Discord-Logo-White.svg":
/*!*******************************************!*\
  !*** ./src/assets/Discord-Logo-White.svg ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"img/Discord-Logo-White.1c8a54f2.svg\";\n\n//# sourceURL=webpack:///./src/assets/Discord-Logo-White.svg?");

/***/ }),

/***/ "./src/assets/style.css":
/*!******************************!*\
  !*** ./src/assets/style.css ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!../../node_modules/postcss-loader/src??ref--6-oneOf-3-2!./style.css */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/assets/style.css\");\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"7213057f\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack:///./src/assets/style.css?");

/***/ }),

/***/ "./src/bot.js":
/*!********************!*\
  !*** ./src/bot.js ***!
  \********************/
/*! exports provided: checkGuild, formatDate, delMessage, getChannel, getUser, setChannel, setGuild, init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"checkGuild\", function() { return checkGuild; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"formatDate\", function() { return formatDate; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"delMessage\", function() { return delMessage; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getChannel\", function() { return getChannel; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getUser\", function() { return getUser; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setChannel\", function() { return setChannel; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setGuild\", function() { return setGuild; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"init\", function() { return init; });\n/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.filter */ \"./node_modules/core-js/modules/es.array.filter.js\");\n/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.find */ \"./node_modules/core-js/modules/es.array.find.js\");\n/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ \"./node_modules/core-js/modules/es.array.for-each.js\");\n/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_array_join__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.join */ \"./node_modules/core-js/modules/es.array.join.js\");\n/* harmony import */ var core_js_modules_es_array_join__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_join__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.function.name */ \"./node_modules/core-js/modules/es.function.name.js\");\n/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ \"./node_modules/core-js/modules/web.dom-collections.for-each.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! regenerator-runtime/runtime */ \"./node_modules/regenerator-runtime/runtime.js\");\n/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var I_Projects_Bot_Panel_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var discord_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! discord.js */ \"./node_modules/discord.js/src/index.js\");\n/* harmony import */ var discord_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(discord_js__WEBPACK_IMPORTED_MODULE_9__);\n\n\n\n\n\n\n\n\n\n\nvar client = new discord_js__WEBPACK_IMPORTED_MODULE_9___default.a.Client();\nfunction checkGuild(_x) {\n  return _checkGuild.apply(this, arguments);\n}\n\nfunction _checkGuild() {\n  _checkGuild = Object(I_Projects_Bot_Panel_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_8__[\"default\"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id) {\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            return _context.abrupt(\"return\", new Promise(function (resolve, reject) {\n              if (client.guilds.cache.get(id)) {\n                resolve();\n              } else {\n                reject();\n              }\n            }));\n\n          case 1:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n  return _checkGuild.apply(this, arguments);\n}\n\nvar fetchGuilds = function fetchGuilds(guilds) {\n  var arr = [];\n  guilds.forEach(function (item) {\n    arr.push({\n      id: item.id,\n      name: item.name\n    });\n  });\n  return arr;\n};\n\nvar fetchChannels = function fetchChannels(channels) {\n  var arr = [];\n  channels.filter(function (e) {\n    return e.type === 'text';\n  }).forEach(function (item) {\n    arr.push({\n      id: item.id,\n      name: item.name\n    });\n  });\n  return arr;\n};\n\nvar fetchMessages = function fetchMessages(messages) {\n  var arr = [];\n  messages.forEach(function (message) {\n    message['created'] = formatDate(message.createdAt);\n    arr.push(message);\n  });\n  return arr;\n};\n\nfunction formatDate(date) {\n  var d = new Date(date),\n      month = '' + (d.getMonth() + 1),\n      day = '' + d.getDate(),\n      year = d.getFullYear(),\n      hours = d.getHours(),\n      minutes = d.getMinutes(),\n      seconds = d.getSeconds();\n  if (month.length < 2) month = '0' + month;\n  if (day.length < 2) day = '0' + day;\n  return [day, month, year].join('-') + ' ' + [hours, minutes, seconds].join(':');\n}\nfunction delMessage(commit, state, id) {\n  var channel = client.channels.cache.get(state.channel.id);\n  var message = channel.messages.cache.get(id);\n  message.delete();\n\n  if (message.channel.id === state.channel.id) {\n    channel.messages.fetch().then(function (res) {\n      commit('SET_MESSAGES', fetchMessages(res));\n    });\n  }\n}\nfunction getChannel(id) {\n  var channel = client.channels.cache.get(id);\n\n  if (channel) {\n    return channel.name;\n  }\n}\nfunction getUser(id) {\n  var user = client.users.cache.find(function (user) {\n    return user.id === id;\n  });\n\n  if (user) {\n    return user.username;\n  }\n}\nfunction setChannel(commit, state, item) {\n  var channel = client.channels.cache.get(item);\n  channel.messages.fetch().then(function (res) {\n    commit('SET_MESSAGES', fetchMessages(res));\n  });\n  commit('SET_CHANNEL', channel);\n}\nfunction setGuild(commit, dispatch, id) {\n  commit('SET_GUILD', id); // console.log(client.guilds.cache.get(id).channels.cache.filter((с => c.value.type === 'text')))\n  // const channels = fetchChannels(client.guilds.cache.get(id).channels.cache)\n  // dispatch('setChannel', channels[0].id)\n  //  commit('SET_CHANNELS', channels)\n}\nfunction init(commit, dispatch, state, token) {\n  client.login(token).then(function () {\n    localStorage.setItem('token', token);\n    commit('SET_LOGGED', true);\n  }).catch(function () {\n    dispatch('logout');\n  });\n  client.on('ready', function () {\n    var guilds = fetchGuilds(client.guilds.cache);\n    commit('SET_GUILDS', guilds);\n  });\n  client.on('messageUpdate', function (e) {\n    if (e.channel.id === state.channel.id) {\n      var channel = client.guilds.cache.get(state.guild).channels.cache.get(state.channel.id);\n      channel.messages.fetch().then(function (res) {\n        commit('SET_MESSAGES', fetchMessages(res));\n      });\n    }\n  });\n  client.on('messageDelete', function (e) {\n    if (e.channel.id === state.channel.id) {\n      var channel = client.guilds.cache.get(state.guild).channels.cache.get(state.channel.id);\n      channel.messages.fetch().then(function (res) {\n        commit('SET_MESSAGES', fetchMessages(res));\n      });\n    }\n  });\n  client.on('message', function (e) {\n    if (e.channel.id === state.channel.id) {\n      var channel = client.guilds.cache.get(state.guild).channels.cache.get(state.channel.id);\n      channel.messages.fetch().then(function (res) {\n        commit('SET_MESSAGES', fetchMessages(res));\n      });\n    }\n  });\n  client.on('channelCreate', function (e) {\n    if (state.guild === e.guild.id) {\n      var channels = fetchChannels(client.guilds.cache.get(state.guild).channels.cache);\n      commit('SET_CHANNELS', channels);\n    }\n  });\n  client.on('channelDelete', function (e) {\n    if (state.guild === e.guild.id) {\n      var channels = fetchChannels(client.guilds.cache.get(state.guild).channels.cache);\n      commit('SET_CHANNELS', channels);\n    }\n  });\n  client.on('guildCreate', function () {\n    commit('SET_GUILDS', fetchGuilds(client.guilds.cache));\n  });\n  client.on('guildDelete', function () {\n    commit('SET_GUILDS', fetchGuilds(client.guilds.cache));\n  });\n  client.on('guildUpdate', function () {\n    commit('SET_GUILDS', fetchGuilds(client.guilds.cache));\n  });\n}\n\n//# sourceURL=webpack:///./src/bot.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var I_Projects_Bot_Panel_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.array.iterator.js */ \"./node_modules/core-js/modules/es.array.iterator.js\");\n/* harmony import */ var I_Projects_Bot_Panel_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(I_Projects_Bot_Panel_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var I_Projects_Bot_Panel_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.promise.js */ \"./node_modules/core-js/modules/es.promise.js\");\n/* harmony import */ var I_Projects_Bot_Panel_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(I_Projects_Bot_Panel_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var I_Projects_Bot_Panel_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.object.assign.js */ \"./node_modules/core-js/modules/es.object.assign.js\");\n/* harmony import */ var I_Projects_Bot_Panel_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(I_Projects_Bot_Panel_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var I_Projects_Bot_Panel_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.promise.finally.js */ \"./node_modules/core-js/modules/es.promise.finally.js\");\n/* harmony import */ var I_Projects_Bot_Panel_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(I_Projects_Bot_Panel_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var _App_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./App.vue */ \"./src/App.vue\");\n/* harmony import */ var _plugins_vuetify__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./plugins/vuetify */ \"./src/plugins/vuetify.js\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./store */ \"./src/store/index.js\");\n/* harmony import */ var vue2_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vue2-perfect-scrollbar */ \"./node_modules/vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.umd.js\");\n/* harmony import */ var vue2_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(vue2_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var vue2_perfect_scrollbar_dist_vue2_perfect_scrollbar_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css */ \"./node_modules/vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css\");\n/* harmony import */ var vue2_perfect_scrollbar_dist_vue2_perfect_scrollbar_css__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(vue2_perfect_scrollbar_dist_vue2_perfect_scrollbar_css__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _assets_style_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./assets/style.css */ \"./src/assets/style.css\");\n/* harmony import */ var _assets_style_css__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_assets_style_css__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./router */ \"./src/router/index.js\");\n\n\n\n\n\n\n\n\n\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_4__[\"default\"].use(vue2_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_8___default.a);\nvue__WEBPACK_IMPORTED_MODULE_4__[\"default\"].config.productionTip = false;\nnew vue__WEBPACK_IMPORTED_MODULE_4__[\"default\"]({\n  store: _store__WEBPACK_IMPORTED_MODULE_7__[\"default\"],\n  vuetify: _plugins_vuetify__WEBPACK_IMPORTED_MODULE_6__[\"default\"],\n  router: _router__WEBPACK_IMPORTED_MODULE_11__[\"default\"],\n  render: function render(h) {\n    return h(_App_vue__WEBPACK_IMPORTED_MODULE_5__[\"default\"]);\n  }\n}).$mount('#app');\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/plugins/vuetify.js":
/*!********************************!*\
  !*** ./src/plugins/vuetify.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var vuetify_lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuetify/lib */ \"./node_modules/vuetify/lib/index.js\");\n\n\nvue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].use(vuetify_lib__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {});\n/* harmony default export */ __webpack_exports__[\"default\"] = (new vuetify_lib__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n  theme: {\n    themes: {\n      light: {\n        primary: '#3f51b5',\n        secondary: '#b0bec5',\n        accent: '#8c9eff',\n        error: '#b71c1c'\n      },\n      dark: {//here you will define primary secondary stuff for dark theme\n      }\n    },\n    dark: true\n  }\n}));\n\n//# sourceURL=webpack:///./src/plugins/vuetify.js?");

/***/ }),

/***/ "./src/router/index.js":
/*!*****************************!*\
  !*** ./src/router/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-router */ \"./node_modules/vue-router/dist/vue-router.esm.js\");\n/* harmony import */ var _views_Layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../views/Layout */ \"./src/views/Layout.vue\");\n\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_1__[\"default\"].use(vue_router__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\nvar routes = [{\n  path: '/',\n  component: _views_Layout__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n  children: [{\n    path: '',\n    name: 'Home',\n    component: function component() {\n      return __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ../views/Home */ \"./src/views/Home.vue\"));\n    }\n  }]\n}, {\n  path: '/server',\n  component: _views_Layout__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n  children: [{\n    path: \":id\",\n    name: 'Server',\n    component: function component() {\n      return __webpack_require__.e(/*! import() */ 1).then(__webpack_require__.bind(null, /*! ../views/Server.vue */ \"./src/views/Server.vue\"));\n    }\n  }]\n}, {\n  path: '/commands',\n  component: _views_Layout__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n  children: [{\n    path: '',\n    name: 'Commands',\n    component: function component() {\n      return __webpack_require__.e(/*! import() */ 2).then(__webpack_require__.bind(null, /*! ../views/Commands/Index */ \"./src/views/Commands/Index.vue\"));\n    }\n  }]\n}, {\n  path: '*',\n  redirect: '/'\n}];\nvar router = new vue_router__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({\n  mode:  true ? 'hash' : undefined,\n  base: \"/discord-bot-panel/\",\n  routes: routes\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n//# sourceURL=webpack:///./src/router/index.js?");

/***/ }),

/***/ "./src/store/getters.js":
/*!******************************!*\
  !*** ./src/store/getters.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar getters = {\n  client: function client(state) {\n    return state.bot.client;\n  },\n  status: function status(state) {\n    return state.bot.status;\n  },\n  guild: function guild(state) {\n    return state.bot.guild;\n  },\n  guilds: function guilds(state) {\n    return state.bot.guilds;\n  },\n  channel: function channel(state) {\n    return state.bot.channel;\n  },\n  channels: function channels(state) {\n    return state.bot.channels;\n  },\n  messages: function messages(state) {\n    return state.bot.messages;\n  },\n  currentGuild: function currentGuild(state) {\n    return state.bot.currentGuild;\n  },\n  botLogged: function botLogged(state) {\n    return state.bot.botLogged;\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (getters);\n\n//# sourceURL=webpack:///./src/store/getters.js?");

/***/ }),

/***/ "./src/store/index.js":
/*!****************************!*\
  !*** ./src/store/index.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_array_reduce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.reduce */ \"./node_modules/core-js/modules/es.array.reduce.js\");\n/* harmony import */ var core_js_modules_es_array_reduce__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_reduce__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.regexp.exec */ \"./node_modules/core-js/modules/es.regexp.exec.js\");\n/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.string.replace */ \"./node_modules/core-js/modules/es.string.replace.js\");\n/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ \"./node_modules/core-js/modules/web.dom-collections.iterator.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuex */ \"./node_modules/vuex/dist/vuex.esm.js\");\n/* harmony import */ var _getters__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./getters */ \"./src/store/getters.js\");\n\n\n\n\n\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_5__[\"default\"].use(vuex__WEBPACK_IMPORTED_MODULE_6__[\"default\"]); // https://webpack.js.org/guides/dependency-management/#requirecontext\n\nvar modulesFiles = __webpack_require__(\"./src/store/modules sync recursive \\\\.js$\"); // you do not need `import app from './modules/app'`\n// it will auto require all vuex module from modules file\n\n\nvar modules = modulesFiles.keys().reduce(function (modules, modulePath) {\n  // set './app.js' => 'app'\n  var moduleName = modulePath.replace(/^\\.\\/(.*)\\.\\w+$/, '$1');\n  var value = modulesFiles(modulePath);\n  modules[moduleName] = value.default;\n  return modules;\n}, {});\nvar store = new vuex__WEBPACK_IMPORTED_MODULE_6__[\"default\"].Store({\n  modules: modules,\n  getters: _getters__WEBPACK_IMPORTED_MODULE_7__[\"default\"]\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (store);\n\n//# sourceURL=webpack:///./src/store/index.js?");

/***/ }),

/***/ "./src/store/modules sync recursive \\.js$":
/*!**************************************!*\
  !*** ./src/store/modules sync \.js$ ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./bot.js\": \"./src/store/modules/bot.js\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./src/store/modules sync recursive \\\\.js$\";\n\n//# sourceURL=webpack:///./src/store/modules_sync_\\.js$?");

/***/ }),

/***/ "./src/store/modules/bot.js":
/*!**********************************!*\
  !*** ./src/store/modules/bot.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _bot__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../bot */ \"./src/bot.js\");\n\nvar state = {\n  dev: '',\n  status: false,\n  botLogged: false,\n  bot: {},\n  client: {},\n  guild: 0,\n  guilds: [],\n  channel: {},\n  channels: [],\n  messages: []\n};\nvar mutations = {\n  dev: function dev(state, data) {\n    state.dev = data;\n  },\n  SET_BOT: function SET_BOT(state, data) {\n    state.bot = data;\n  },\n  SET_CLIENT: function SET_CLIENT(state, data) {\n    state.client = data;\n  },\n  SET_GUILD: function SET_GUILD(state, data) {\n    state.guild = data;\n  },\n  SET_CHANNEL: function SET_CHANNEL(state, data) {\n    state.channel = data;\n  },\n  SET_CHANNELS: function SET_CHANNELS(state, data) {\n    state.channels = data;\n  },\n  SET_LOGGED: function SET_LOGGED(state, data) {\n    state.botLogged = data;\n  },\n  SET_STATUS: function SET_STATUS(state, data) {\n    state.status = data;\n  },\n  SET_GUILDS: function SET_GUILDS(state, data) {\n    state.guilds = data;\n  },\n  SET_MESSAGES: function SET_MESSAGES(state, data) {\n    state.messages = data;\n  }\n};\nvar actions = {\n  delMessage: function delMessage(_ref, id) {\n    var commit = _ref.commit,\n        state = _ref.state;\n\n    Object(_bot__WEBPACK_IMPORTED_MODULE_0__[\"delMessage\"])(commit, state, id);\n  },\n  setLogged: function setLogged(_ref2, data) {\n    var commit = _ref2.commit;\n    commit('SET_LOGGED', data);\n  },\n  setStatus: function setStatus(_ref3, data) {\n    var commit = _ref3.commit;\n    commit('SET_STATUS', data);\n  },\n  setChannel: function setChannel(_ref4, item) {\n    var commit = _ref4.commit,\n        state = _ref4.state;\n\n    Object(_bot__WEBPACK_IMPORTED_MODULE_0__[\"setChannel\"])(commit, state, item);\n  },\n  setGuild: function setGuild(_ref5, id) {\n    var commit = _ref5.commit,\n        dispatch = _ref5.dispatch;\n\n    Object(_bot__WEBPACK_IMPORTED_MODULE_0__[\"setGuild\"])(commit, dispatch, id);\n  },\n  logout: function logout() {\n    // commit('SET_LOGGED', false)\n    // commit('SET_STATUS', false)\n    localStorage.removeItem('token');\n    window.location.reload();\n  },\n  init: function init(_ref6, token) {\n    var commit = _ref6.commit,\n        dispatch = _ref6.dispatch,\n        state = _ref6.state;\n\n    Object(_bot__WEBPACK_IMPORTED_MODULE_0__[\"init\"])(commit, dispatch, state, token);\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  namespaced: true,\n  state: state,\n  mutations: mutations,\n  actions: actions\n});\n\n//# sourceURL=webpack:///./src/store/modules/bot.js?");

/***/ }),

/***/ "./src/views/Layout.vue":
/*!******************************!*\
  !*** ./src/views/Layout.vue ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Layout_vue_vue_type_template_id_31a768e4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Layout.vue?vue&type=template&id=31a768e4& */ \"./src/views/Layout.vue?vue&type=template&id=31a768e4&\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\nvar script = {}\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\n  script,\n  _Layout_vue_vue_type_template_id_31a768e4___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _Layout_vue_vue_type_template_id_31a768e4___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/views/Layout.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/views/Layout.vue?");

/***/ }),

/***/ "./src/views/Layout.vue?vue&type=template&id=31a768e4&":
/*!*************************************************************!*\
  !*** ./src/views/Layout.vue?vue&type=template&id=31a768e4& ***!
  \*************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_275fe603_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Layout_vue_vue_type_template_id_31a768e4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"275fe603-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Layout.vue?vue&type=template&id=31a768e4& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"275fe603-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Layout.vue?vue&type=template&id=31a768e4&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_275fe603_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Layout_vue_vue_type_template_id_31a768e4___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_275fe603_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Layout_vue_vue_type_template_id_31a768e4___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/views/Layout.vue?");

/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/main.js */\"./src/main.js\");\n\n\n//# sourceURL=webpack:///multi_./src/main.js?");

/***/ }),

/***/ 1:
/*!***********************!*\
  !*** https (ignored) ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///https_(ignored)?");

/***/ }),

/***/ 10:
/*!********************************************!*\
  !*** ./sharding/ShardingManager (ignored) ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///./sharding/ShardingManager_(ignored)?");

/***/ }),

/***/ 2:
/*!********************************************!*\
  !*** ./voice/ClientVoiceManager (ignored) ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///./voice/ClientVoiceManager_(ignored)?");

/***/ }),

/***/ 3:
/*!*************************!*\
  !*** erlpack (ignored) ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///erlpack_(ignored)?");

/***/ }),

/***/ 4:
/*!********************!*\
  !*** ws (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///ws_(ignored)?");

/***/ }),

/***/ 5:
/*!***************************!*\
  !*** zlib-sync (ignored) ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///zlib-sync_(ignored)?");

/***/ }),

/***/ 6:
/*!*********************************************!*\
  !*** ../sharding/ShardClientUtil (ignored) ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///../sharding/ShardClientUtil_(ignored)?");

/***/ }),

/***/ 7:
/*!********************************!*\
  !*** worker_threads (ignored) ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///worker_threads_(ignored)?");

/***/ }),

/***/ 8:
/*!**********************************!*\
  !*** ./sharding/Shard (ignored) ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///./sharding/Shard_(ignored)?");

/***/ }),

/***/ 9:
/*!********************************************!*\
  !*** ./sharding/ShardClientUtil (ignored) ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///./sharding/ShardClientUtil_(ignored)?");

/***/ })

/******/ });