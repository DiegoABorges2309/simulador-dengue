// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/leaflet/dist/leaflet-src.js":[function(require,module,exports) {
var define;
var global = arguments[3];
/* @preserve
 * Leaflet 1.7.1, a JS library for interactive maps. http://leafletjs.com
 * (c) 2010-2019 Vladimir Agafonkin, (c) 2010-2011 CloudMade
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.L = {})));
}(this, (function (exports) { 'use strict';

  var version = "1.7.1";

  /*
   * @namespace Util
   *
   * Various utility functions, used by Leaflet internally.
   */

  // @function extend(dest: Object, src?: Object): Object
  // Merges the properties of the `src` object (or multiple objects) into `dest` object and returns the latter. Has an `L.extend` shortcut.
  function extend(dest) {
  	var i, j, len, src;

  	for (j = 1, len = arguments.length; j < len; j++) {
  		src = arguments[j];
  		for (i in src) {
  			dest[i] = src[i];
  		}
  	}
  	return dest;
  }

  // @function create(proto: Object, properties?: Object): Object
  // Compatibility polyfill for [Object.create](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
  var create = Object.create || (function () {
  	function F() {}
  	return function (proto) {
  		F.prototype = proto;
  		return new F();
  	};
  })();

  // @function bind(fn: Function, …): Function
  // Returns a new function bound to the arguments passed, like [Function.prototype.bind](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
  // Has a `L.bind()` shortcut.
  function bind(fn, obj) {
  	var slice = Array.prototype.slice;

  	if (fn.bind) {
  		return fn.bind.apply(fn, slice.call(arguments, 1));
  	}

  	var args = slice.call(arguments, 2);

  	return function () {
  		return fn.apply(obj, args.length ? args.concat(slice.call(arguments)) : arguments);
  	};
  }

  // @property lastId: Number
  // Last unique ID used by [`stamp()`](#util-stamp)
  var lastId = 0;

  // @function stamp(obj: Object): Number
  // Returns the unique ID of an object, assigning it one if it doesn't have it.
  function stamp(obj) {
  	/*eslint-disable */
  	obj._leaflet_id = obj._leaflet_id || ++lastId;
  	return obj._leaflet_id;
  	/* eslint-enable */
  }

  // @function throttle(fn: Function, time: Number, context: Object): Function
  // Returns a function which executes function `fn` with the given scope `context`
  // (so that the `this` keyword refers to `context` inside `fn`'s code). The function
  // `fn` will be called no more than one time per given amount of `time`. The arguments
  // received by the bound function will be any arguments passed when binding the
  // function, followed by any arguments passed when invoking the bound function.
  // Has an `L.throttle` shortcut.
  function throttle(fn, time, context) {
  	var lock, args, wrapperFn, later;

  	later = function () {
  		// reset lock and call if queued
  		lock = false;
  		if (args) {
  			wrapperFn.apply(context, args);
  			args = false;
  		}
  	};

  	wrapperFn = function () {
  		if (lock) {
  			// called too soon, queue to call later
  			args = arguments;

  		} else {
  			// call and lock until later
  			fn.apply(context, arguments);
  			setTimeout(later, time);
  			lock = true;
  		}
  	};

  	return wrapperFn;
  }

  // @function wrapNum(num: Number, range: Number[], includeMax?: Boolean): Number
  // Returns the number `num` modulo `range` in such a way so it lies within
  // `range[0]` and `range[1]`. The returned value will be always smaller than
  // `range[1]` unless `includeMax` is set to `true`.
  function wrapNum(x, range, includeMax) {
  	var max = range[1],
  	    min = range[0],
  	    d = max - min;
  	return x === max && includeMax ? x : ((x - min) % d + d) % d + min;
  }

  // @function falseFn(): Function
  // Returns a function which always returns `false`.
  function falseFn() { return false; }

  // @function formatNum(num: Number, digits?: Number): Number
  // Returns the number `num` rounded to `digits` decimals, or to 6 decimals by default.
  function formatNum(num, digits) {
  	var pow = Math.pow(10, (digits === undefined ? 6 : digits));
  	return Math.round(num * pow) / pow;
  }

  // @function trim(str: String): String
  // Compatibility polyfill for [String.prototype.trim](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/Trim)
  function trim(str) {
  	return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
  }

  // @function splitWords(str: String): String[]
  // Trims and splits the string on whitespace and returns the array of parts.
  function splitWords(str) {
  	return trim(str).split(/\s+/);
  }

  // @function setOptions(obj: Object, options: Object): Object
  // Merges the given properties to the `options` of the `obj` object, returning the resulting options. See `Class options`. Has an `L.setOptions` shortcut.
  function setOptions(obj, options) {
  	if (!Object.prototype.hasOwnProperty.call(obj, 'options')) {
  		obj.options = obj.options ? create(obj.options) : {};
  	}
  	for (var i in options) {
  		obj.options[i] = options[i];
  	}
  	return obj.options;
  }

  // @function getParamString(obj: Object, existingUrl?: String, uppercase?: Boolean): String
  // Converts an object into a parameter URL string, e.g. `{a: "foo", b: "bar"}`
  // translates to `'?a=foo&b=bar'`. If `existingUrl` is set, the parameters will
  // be appended at the end. If `uppercase` is `true`, the parameter names will
  // be uppercased (e.g. `'?A=foo&B=bar'`)
  function getParamString(obj, existingUrl, uppercase) {
  	var params = [];
  	for (var i in obj) {
  		params.push(encodeURIComponent(uppercase ? i.toUpperCase() : i) + '=' + encodeURIComponent(obj[i]));
  	}
  	return ((!existingUrl || existingUrl.indexOf('?') === -1) ? '?' : '&') + params.join('&');
  }

  var templateRe = /\{ *([\w_-]+) *\}/g;

  // @function template(str: String, data: Object): String
  // Simple templating facility, accepts a template string of the form `'Hello {a}, {b}'`
  // and a data object like `{a: 'foo', b: 'bar'}`, returns evaluated string
  // `('Hello foo, bar')`. You can also specify functions instead of strings for
  // data values — they will be evaluated passing `data` as an argument.
  function template(str, data) {
  	return str.replace(templateRe, function (str, key) {
  		var value = data[key];

  		if (value === undefined) {
  			throw new Error('No value provided for variable ' + str);

  		} else if (typeof value === 'function') {
  			value = value(data);
  		}
  		return value;
  	});
  }

  // @function isArray(obj): Boolean
  // Compatibility polyfill for [Array.isArray](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)
  var isArray = Array.isArray || function (obj) {
  	return (Object.prototype.toString.call(obj) === '[object Array]');
  };

  // @function indexOf(array: Array, el: Object): Number
  // Compatibility polyfill for [Array.prototype.indexOf](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)
  function indexOf(array, el) {
  	for (var i = 0; i < array.length; i++) {
  		if (array[i] === el) { return i; }
  	}
  	return -1;
  }

  // @property emptyImageUrl: String
  // Data URI string containing a base64-encoded empty GIF image.
  // Used as a hack to free memory from unused images on WebKit-powered
  // mobile devices (by setting image `src` to this string).
  var emptyImageUrl = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';

  // inspired by http://paulirish.com/2011/requestanimationframe-for-smart-animating/

  function getPrefixed(name) {
  	return window['webkit' + name] || window['moz' + name] || window['ms' + name];
  }

  var lastTime = 0;

  // fallback for IE 7-8
  function timeoutDefer(fn) {
  	var time = +new Date(),
  	    timeToCall = Math.max(0, 16 - (time - lastTime));

  	lastTime = time + timeToCall;
  	return window.setTimeout(fn, timeToCall);
  }

  var requestFn = window.requestAnimationFrame || getPrefixed('RequestAnimationFrame') || timeoutDefer;
  var cancelFn = window.cancelAnimationFrame || getPrefixed('CancelAnimationFrame') ||
  		getPrefixed('CancelRequestAnimationFrame') || function (id) { window.clearTimeout(id); };

  // @function requestAnimFrame(fn: Function, context?: Object, immediate?: Boolean): Number
  // Schedules `fn` to be executed when the browser repaints. `fn` is bound to
  // `context` if given. When `immediate` is set, `fn` is called immediately if
  // the browser doesn't have native support for
  // [`window.requestAnimationFrame`](https://developer.mozilla.org/docs/Web/API/window/requestAnimationFrame),
  // otherwise it's delayed. Returns a request ID that can be used to cancel the request.
  function requestAnimFrame(fn, context, immediate) {
  	if (immediate && requestFn === timeoutDefer) {
  		fn.call(context);
  	} else {
  		return requestFn.call(window, bind(fn, context));
  	}
  }

  // @function cancelAnimFrame(id: Number): undefined
  // Cancels a previous `requestAnimFrame`. See also [window.cancelAnimationFrame](https://developer.mozilla.org/docs/Web/API/window/cancelAnimationFrame).
  function cancelAnimFrame(id) {
  	if (id) {
  		cancelFn.call(window, id);
  	}
  }

  var Util = ({
    extend: extend,
    create: create,
    bind: bind,
    lastId: lastId,
    stamp: stamp,
    throttle: throttle,
    wrapNum: wrapNum,
    falseFn: falseFn,
    formatNum: formatNum,
    trim: trim,
    splitWords: splitWords,
    setOptions: setOptions,
    getParamString: getParamString,
    template: template,
    isArray: isArray,
    indexOf: indexOf,
    emptyImageUrl: emptyImageUrl,
    requestFn: requestFn,
    cancelFn: cancelFn,
    requestAnimFrame: requestAnimFrame,
    cancelAnimFrame: cancelAnimFrame
  });

  // @class Class
  // @aka L.Class

  // @section
  // @uninheritable

  // Thanks to John Resig and Dean Edwards for inspiration!

  function Class() {}

  Class.extend = function (props) {

  	// @function extend(props: Object): Function
  	// [Extends the current class](#class-inheritance) given the properties to be included.
  	// Returns a Javascript function that is a class constructor (to be called with `new`).
  	var NewClass = function () {

  		// call the constructor
  		if (this.initialize) {
  			this.initialize.apply(this, arguments);
  		}

  		// call all constructor hooks
  		this.callInitHooks();
  	};

  	var parentProto = NewClass.__super__ = this.prototype;

  	var proto = create(parentProto);
  	proto.constructor = NewClass;

  	NewClass.prototype = proto;

  	// inherit parent's statics
  	for (var i in this) {
  		if (Object.prototype.hasOwnProperty.call(this, i) && i !== 'prototype' && i !== '__super__') {
  			NewClass[i] = this[i];
  		}
  	}

  	// mix static properties into the class
  	if (props.statics) {
  		extend(NewClass, props.statics);
  		delete props.statics;
  	}

  	// mix includes into the prototype
  	if (props.includes) {
  		checkDeprecatedMixinEvents(props.includes);
  		extend.apply(null, [proto].concat(props.includes));
  		delete props.includes;
  	}

  	// merge options
  	if (proto.options) {
  		props.options = extend(create(proto.options), props.options);
  	}

  	// mix given properties into the prototype
  	extend(proto, props);

  	proto._initHooks = [];

  	// add method for calling all hooks
  	proto.callInitHooks = function () {

  		if (this._initHooksCalled) { return; }

  		if (parentProto.callInitHooks) {
  			parentProto.callInitHooks.call(this);
  		}

  		this._initHooksCalled = true;

  		for (var i = 0, len = proto._initHooks.length; i < len; i++) {
  			proto._initHooks[i].call(this);
  		}
  	};

  	return NewClass;
  };


  // @function include(properties: Object): this
  // [Includes a mixin](#class-includes) into the current class.
  Class.include = function (props) {
  	extend(this.prototype, props);
  	return this;
  };

  // @function mergeOptions(options: Object): this
  // [Merges `options`](#class-options) into the defaults of the class.
  Class.mergeOptions = function (options) {
  	extend(this.prototype.options, options);
  	return this;
  };

  // @function addInitHook(fn: Function): this
  // Adds a [constructor hook](#class-constructor-hooks) to the class.
  Class.addInitHook = function (fn) { // (Function) || (String, args...)
  	var args = Array.prototype.slice.call(arguments, 1);

  	var init = typeof fn === 'function' ? fn : function () {
  		this[fn].apply(this, args);
  	};

  	this.prototype._initHooks = this.prototype._initHooks || [];
  	this.prototype._initHooks.push(init);
  	return this;
  };

  function checkDeprecatedMixinEvents(includes) {
  	if (typeof L === 'undefined' || !L || !L.Mixin) { return; }

  	includes = isArray(includes) ? includes : [includes];

  	for (var i = 0; i < includes.length; i++) {
  		if (includes[i] === L.Mixin.Events) {
  			console.warn('Deprecated include of L.Mixin.Events: ' +
  				'this property will be removed in future releases, ' +
  				'please inherit from L.Evented instead.', new Error().stack);
  		}
  	}
  }

  /*
   * @class Evented
   * @aka L.Evented
   * @inherits Class
   *
   * A set of methods shared between event-powered classes (like `Map` and `Marker`). Generally, events allow you to execute some function when something happens with an object (e.g. the user clicks on the map, causing the map to fire `'click'` event).
   *
   * @example
   *
   * ```js
   * map.on('click', function(e) {
   * 	alert(e.latlng);
   * } );
   * ```
   *
   * Leaflet deals with event listeners by reference, so if you want to add a listener and then remove it, define it as a function:
   *
   * ```js
   * function onClick(e) { ... }
   *
   * map.on('click', onClick);
   * map.off('click', onClick);
   * ```
   */

  var Events = {
  	/* @method on(type: String, fn: Function, context?: Object): this
  	 * Adds a listener function (`fn`) to a particular event type of the object. You can optionally specify the context of the listener (object the this keyword will point to). You can also pass several space-separated types (e.g. `'click dblclick'`).
  	 *
  	 * @alternative
  	 * @method on(eventMap: Object): this
  	 * Adds a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
  	 */
  	on: function (types, fn, context) {

  		// types can be a map of types/handlers
  		if (typeof types === 'object') {
  			for (var type in types) {
  				// we don't process space-separated events here for performance;
  				// it's a hot path since Layer uses the on(obj) syntax
  				this._on(type, types[type], fn);
  			}

  		} else {
  			// types can be a string of space-separated words
  			types = splitWords(types);

  			for (var i = 0, len = types.length; i < len; i++) {
  				this._on(types[i], fn, context);
  			}
  		}

  		return this;
  	},

  	/* @method off(type: String, fn?: Function, context?: Object): this
  	 * Removes a previously added listener function. If no function is specified, it will remove all the listeners of that particular event from the object. Note that if you passed a custom context to `on`, you must pass the same context to `off` in order to remove the listener.
  	 *
  	 * @alternative
  	 * @method off(eventMap: Object): this
  	 * Removes a set of type/listener pairs.
  	 *
  	 * @alternative
  	 * @method off: this
  	 * Removes all listeners to all events on the object. This includes implicitly attached events.
  	 */
  	off: function (types, fn, context) {

  		if (!types) {
  			// clear all listeners if called without arguments
  			delete this._events;

  		} else if (typeof types === 'object') {
  			for (var type in types) {
  				this._off(type, types[type], fn);
  			}

  		} else {
  			types = splitWords(types);

  			for (var i = 0, len = types.length; i < len; i++) {
  				this._off(types[i], fn, context);
  			}
  		}

  		return this;
  	},

  	// attach listener (without syntactic sugar now)
  	_on: function (type, fn, context) {
  		this._events = this._events || {};

  		/* get/init listeners for type */
  		var typeListeners = this._events[type];
  		if (!typeListeners) {
  			typeListeners = [];
  			this._events[type] = typeListeners;
  		}

  		if (context === this) {
  			// Less memory footprint.
  			context = undefined;
  		}
  		var newListener = {fn: fn, ctx: context},
  		    listeners = typeListeners;

  		// check if fn already there
  		for (var i = 0, len = listeners.length; i < len; i++) {
  			if (listeners[i].fn === fn && listeners[i].ctx === context) {
  				return;
  			}
  		}

  		listeners.push(newListener);
  	},

  	_off: function (type, fn, context) {
  		var listeners,
  		    i,
  		    len;

  		if (!this._events) { return; }

  		listeners = this._events[type];

  		if (!listeners) {
  			return;
  		}

  		if (!fn) {
  			// Set all removed listeners to noop so they are not called if remove happens in fire
  			for (i = 0, len = listeners.length; i < len; i++) {
  				listeners[i].fn = falseFn;
  			}
  			// clear all listeners for a type if function isn't specified
  			delete this._events[type];
  			return;
  		}

  		if (context === this) {
  			context = undefined;
  		}

  		if (listeners) {

  			// find fn and remove it
  			for (i = 0, len = listeners.length; i < len; i++) {
  				var l = listeners[i];
  				if (l.ctx !== context) { continue; }
  				if (l.fn === fn) {

  					// set the removed listener to noop so that's not called if remove happens in fire
  					l.fn = falseFn;

  					if (this._firingCount) {
  						/* copy array in case events are being fired */
  						this._events[type] = listeners = listeners.slice();
  					}
  					listeners.splice(i, 1);

  					return;
  				}
  			}
  		}
  	},

  	// @method fire(type: String, data?: Object, propagate?: Boolean): this
  	// Fires an event of the specified type. You can optionally provide an data
  	// object — the first argument of the listener function will contain its
  	// properties. The event can optionally be propagated to event parents.
  	fire: function (type, data, propagate) {
  		if (!this.listens(type, propagate)) { return this; }

  		var event = extend({}, data, {
  			type: type,
  			target: this,
  			sourceTarget: data && data.sourceTarget || this
  		});

  		if (this._events) {
  			var listeners = this._events[type];

  			if (listeners) {
  				this._firingCount = (this._firingCount + 1) || 1;
  				for (var i = 0, len = listeners.length; i < len; i++) {
  					var l = listeners[i];
  					l.fn.call(l.ctx || this, event);
  				}

  				this._firingCount--;
  			}
  		}

  		if (propagate) {
  			// propagate the event to parents (set with addEventParent)
  			this._propagateEvent(event);
  		}

  		return this;
  	},

  	// @method listens(type: String): Boolean
  	// Returns `true` if a particular event type has any listeners attached to it.
  	listens: function (type, propagate) {
  		var listeners = this._events && this._events[type];
  		if (listeners && listeners.length) { return true; }

  		if (propagate) {
  			// also check parents for listeners if event propagates
  			for (var id in this._eventParents) {
  				if (this._eventParents[id].listens(type, propagate)) { return true; }
  			}
  		}
  		return false;
  	},

  	// @method once(…): this
  	// Behaves as [`on(…)`](#evented-on), except the listener will only get fired once and then removed.
  	once: function (types, fn, context) {

  		if (typeof types === 'object') {
  			for (var type in types) {
  				this.once(type, types[type], fn);
  			}
  			return this;
  		}

  		var handler = bind(function () {
  			this
  			    .off(types, fn, context)
  			    .off(types, handler, context);
  		}, this);

  		// add a listener that's executed once and removed after that
  		return this
  		    .on(types, fn, context)
  		    .on(types, handler, context);
  	},

  	// @method addEventParent(obj: Evented): this
  	// Adds an event parent - an `Evented` that will receive propagated events
  	addEventParent: function (obj) {
  		this._eventParents = this._eventParents || {};
  		this._eventParents[stamp(obj)] = obj;
  		return this;
  	},

  	// @method removeEventParent(obj: Evented): this
  	// Removes an event parent, so it will stop receiving propagated events
  	removeEventParent: function (obj) {
  		if (this._eventParents) {
  			delete this._eventParents[stamp(obj)];
  		}
  		return this;
  	},

  	_propagateEvent: function (e) {
  		for (var id in this._eventParents) {
  			this._eventParents[id].fire(e.type, extend({
  				layer: e.target,
  				propagatedFrom: e.target
  			}, e), true);
  		}
  	}
  };

  // aliases; we should ditch those eventually

  // @method addEventListener(…): this
  // Alias to [`on(…)`](#evented-on)
  Events.addEventListener = Events.on;

  // @method removeEventListener(…): this
  // Alias to [`off(…)`](#evented-off)

  // @method clearAllEventListeners(…): this
  // Alias to [`off()`](#evented-off)
  Events.removeEventListener = Events.clearAllEventListeners = Events.off;

  // @method addOneTimeEventListener(…): this
  // Alias to [`once(…)`](#evented-once)
  Events.addOneTimeEventListener = Events.once;

  // @method fireEvent(…): this
  // Alias to [`fire(…)`](#evented-fire)
  Events.fireEvent = Events.fire;

  // @method hasEventListeners(…): Boolean
  // Alias to [`listens(…)`](#evented-listens)
  Events.hasEventListeners = Events.listens;

  var Evented = Class.extend(Events);

  /*
   * @class Point
   * @aka L.Point
   *
   * Represents a point with `x` and `y` coordinates in pixels.
   *
   * @example
   *
   * ```js
   * var point = L.point(200, 300);
   * ```
   *
   * All Leaflet methods and options that accept `Point` objects also accept them in a simple Array form (unless noted otherwise), so these lines are equivalent:
   *
   * ```js
   * map.panBy([200, 300]);
   * map.panBy(L.point(200, 300));
   * ```
   *
   * Note that `Point` does not inherit from Leaflet's `Class` object,
   * which means new classes can't inherit from it, and new methods
   * can't be added to it with the `include` function.
   */

  function Point(x, y, round) {
  	// @property x: Number; The `x` coordinate of the point
  	this.x = (round ? Math.round(x) : x);
  	// @property y: Number; The `y` coordinate of the point
  	this.y = (round ? Math.round(y) : y);
  }

  var trunc = Math.trunc || function (v) {
  	return v > 0 ? Math.floor(v) : Math.ceil(v);
  };

  Point.prototype = {

  	// @method clone(): Point
  	// Returns a copy of the current point.
  	clone: function () {
  		return new Point(this.x, this.y);
  	},

  	// @method add(otherPoint: Point): Point
  	// Returns the result of addition of the current and the given points.
  	add: function (point) {
  		// non-destructive, returns a new point
  		return this.clone()._add(toPoint(point));
  	},

  	_add: function (point) {
  		// destructive, used directly for performance in situations where it's safe to modify existing point
  		this.x += point.x;
  		this.y += point.y;
  		return this;
  	},

  	// @method subtract(otherPoint: Point): Point
  	// Returns the result of subtraction of the given point from the current.
  	subtract: function (point) {
  		return this.clone()._subtract(toPoint(point));
  	},

  	_subtract: function (point) {
  		this.x -= point.x;
  		this.y -= point.y;
  		return this;
  	},

  	// @method divideBy(num: Number): Point
  	// Returns the result of division of the current point by the given number.
  	divideBy: function (num) {
  		return this.clone()._divideBy(num);
  	},

  	_divideBy: function (num) {
  		this.x /= num;
  		this.y /= num;
  		return this;
  	},

  	// @method multiplyBy(num: Number): Point
  	// Returns the result of multiplication of the current point by the given number.
  	multiplyBy: function (num) {
  		return this.clone()._multiplyBy(num);
  	},

  	_multiplyBy: function (num) {
  		this.x *= num;
  		this.y *= num;
  		return this;
  	},

  	// @method scaleBy(scale: Point): Point
  	// Multiply each coordinate of the current point by each coordinate of
  	// `scale`. In linear algebra terms, multiply the point by the
  	// [scaling matrix](https://en.wikipedia.org/wiki/Scaling_%28geometry%29#Matrix_representation)
  	// defined by `scale`.
  	scaleBy: function (point) {
  		return new Point(this.x * point.x, this.y * point.y);
  	},

  	// @method unscaleBy(scale: Point): Point
  	// Inverse of `scaleBy`. Divide each coordinate of the current point by
  	// each coordinate of `scale`.
  	unscaleBy: function (point) {
  		return new Point(this.x / point.x, this.y / point.y);
  	},

  	// @method round(): Point
  	// Returns a copy of the current point with rounded coordinates.
  	round: function () {
  		return this.clone()._round();
  	},

  	_round: function () {
  		this.x = Math.round(this.x);
  		this.y = Math.round(this.y);
  		return this;
  	},

  	// @method floor(): Point
  	// Returns a copy of the current point with floored coordinates (rounded down).
  	floor: function () {
  		return this.clone()._floor();
  	},

  	_floor: function () {
  		this.x = Math.floor(this.x);
  		this.y = Math.floor(this.y);
  		return this;
  	},

  	// @method ceil(): Point
  	// Returns a copy of the current point with ceiled coordinates (rounded up).
  	ceil: function () {
  		return this.clone()._ceil();
  	},

  	_ceil: function () {
  		this.x = Math.ceil(this.x);
  		this.y = Math.ceil(this.y);
  		return this;
  	},

  	// @method trunc(): Point
  	// Returns a copy of the current point with truncated coordinates (rounded towards zero).
  	trunc: function () {
  		return this.clone()._trunc();
  	},

  	_trunc: function () {
  		this.x = trunc(this.x);
  		this.y = trunc(this.y);
  		return this;
  	},

  	// @method distanceTo(otherPoint: Point): Number
  	// Returns the cartesian distance between the current and the given points.
  	distanceTo: function (point) {
  		point = toPoint(point);

  		var x = point.x - this.x,
  		    y = point.y - this.y;

  		return Math.sqrt(x * x + y * y);
  	},

  	// @method equals(otherPoint: Point): Boolean
  	// Returns `true` if the given point has the same coordinates.
  	equals: function (point) {
  		point = toPoint(point);

  		return point.x === this.x &&
  		       point.y === this.y;
  	},

  	// @method contains(otherPoint: Point): Boolean
  	// Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
  	contains: function (point) {
  		point = toPoint(point);

  		return Math.abs(point.x) <= Math.abs(this.x) &&
  		       Math.abs(point.y) <= Math.abs(this.y);
  	},

  	// @method toString(): String
  	// Returns a string representation of the point for debugging purposes.
  	toString: function () {
  		return 'Point(' +
  		        formatNum(this.x) + ', ' +
  		        formatNum(this.y) + ')';
  	}
  };

  // @factory L.point(x: Number, y: Number, round?: Boolean)
  // Creates a Point object with the given `x` and `y` coordinates. If optional `round` is set to true, rounds the `x` and `y` values.

  // @alternative
  // @factory L.point(coords: Number[])
  // Expects an array of the form `[x, y]` instead.

  // @alternative
  // @factory L.point(coords: Object)
  // Expects a plain object of the form `{x: Number, y: Number}` instead.
  function toPoint(x, y, round) {
  	if (x instanceof Point) {
  		return x;
  	}
  	if (isArray(x)) {
  		return new Point(x[0], x[1]);
  	}
  	if (x === undefined || x === null) {
  		return x;
  	}
  	if (typeof x === 'object' && 'x' in x && 'y' in x) {
  		return new Point(x.x, x.y);
  	}
  	return new Point(x, y, round);
  }

  /*
   * @class Bounds
   * @aka L.Bounds
   *
   * Represents a rectangular area in pixel coordinates.
   *
   * @example
   *
   * ```js
   * var p1 = L.point(10, 10),
   * p2 = L.point(40, 60),
   * bounds = L.bounds(p1, p2);
   * ```
   *
   * All Leaflet methods that accept `Bounds` objects also accept them in a simple Array form (unless noted otherwise), so the bounds example above can be passed like this:
   *
   * ```js
   * otherBounds.intersects([[10, 10], [40, 60]]);
   * ```
   *
   * Note that `Bounds` does not inherit from Leaflet's `Class` object,
   * which means new classes can't inherit from it, and new methods
   * can't be added to it with the `include` function.
   */

  function Bounds(a, b) {
  	if (!a) { return; }

  	var points = b ? [a, b] : a;

  	for (var i = 0, len = points.length; i < len; i++) {
  		this.extend(points[i]);
  	}
  }

  Bounds.prototype = {
  	// @method extend(point: Point): this
  	// Extends the bounds to contain the given point.
  	extend: function (point) { // (Point)
  		point = toPoint(point);

  		// @property min: Point
  		// The top left corner of the rectangle.
  		// @property max: Point
  		// The bottom right corner of the rectangle.
  		if (!this.min && !this.max) {
  			this.min = point.clone();
  			this.max = point.clone();
  		} else {
  			this.min.x = Math.min(point.x, this.min.x);
  			this.max.x = Math.max(point.x, this.max.x);
  			this.min.y = Math.min(point.y, this.min.y);
  			this.max.y = Math.max(point.y, this.max.y);
  		}
  		return this;
  	},

  	// @method getCenter(round?: Boolean): Point
  	// Returns the center point of the bounds.
  	getCenter: function (round) {
  		return new Point(
  		        (this.min.x + this.max.x) / 2,
  		        (this.min.y + this.max.y) / 2, round);
  	},

  	// @method getBottomLeft(): Point
  	// Returns the bottom-left point of the bounds.
  	getBottomLeft: function () {
  		return new Point(this.min.x, this.max.y);
  	},

  	// @method getTopRight(): Point
  	// Returns the top-right point of the bounds.
  	getTopRight: function () { // -> Point
  		return new Point(this.max.x, this.min.y);
  	},

  	// @method getTopLeft(): Point
  	// Returns the top-left point of the bounds (i.e. [`this.min`](#bounds-min)).
  	getTopLeft: function () {
  		return this.min; // left, top
  	},

  	// @method getBottomRight(): Point
  	// Returns the bottom-right point of the bounds (i.e. [`this.max`](#bounds-max)).
  	getBottomRight: function () {
  		return this.max; // right, bottom
  	},

  	// @method getSize(): Point
  	// Returns the size of the given bounds
  	getSize: function () {
  		return this.max.subtract(this.min);
  	},

  	// @method contains(otherBounds: Bounds): Boolean
  	// Returns `true` if the rectangle contains the given one.
  	// @alternative
  	// @method contains(point: Point): Boolean
  	// Returns `true` if the rectangle contains the given point.
  	contains: function (obj) {
  		var min, max;

  		if (typeof obj[0] === 'number' || obj instanceof Point) {
  			obj = toPoint(obj);
  		} else {
  			obj = toBounds(obj);
  		}

  		if (obj instanceof Bounds) {
  			min = obj.min;
  			max = obj.max;
  		} else {
  			min = max = obj;
  		}

  		return (min.x >= this.min.x) &&
  		       (max.x <= this.max.x) &&
  		       (min.y >= this.min.y) &&
  		       (max.y <= this.max.y);
  	},

  	// @method intersects(otherBounds: Bounds): Boolean
  	// Returns `true` if the rectangle intersects the given bounds. Two bounds
  	// intersect if they have at least one point in common.
  	intersects: function (bounds) { // (Bounds) -> Boolean
  		bounds = toBounds(bounds);

  		var min = this.min,
  		    max = this.max,
  		    min2 = bounds.min,
  		    max2 = bounds.max,
  		    xIntersects = (max2.x >= min.x) && (min2.x <= max.x),
  		    yIntersects = (max2.y >= min.y) && (min2.y <= max.y);

  		return xIntersects && yIntersects;
  	},

  	// @method overlaps(otherBounds: Bounds): Boolean
  	// Returns `true` if the rectangle overlaps the given bounds. Two bounds
  	// overlap if their intersection is an area.
  	overlaps: function (bounds) { // (Bounds) -> Boolean
  		bounds = toBounds(bounds);

  		var min = this.min,
  		    max = this.max,
  		    min2 = bounds.min,
  		    max2 = bounds.max,
  		    xOverlaps = (max2.x > min.x) && (min2.x < max.x),
  		    yOverlaps = (max2.y > min.y) && (min2.y < max.y);

  		return xOverlaps && yOverlaps;
  	},

  	isValid: function () {
  		return !!(this.min && this.max);
  	}
  };


  // @factory L.bounds(corner1: Point, corner2: Point)
  // Creates a Bounds object from two corners coordinate pairs.
  // @alternative
  // @factory L.bounds(points: Point[])
  // Creates a Bounds object from the given array of points.
  function toBounds(a, b) {
  	if (!a || a instanceof Bounds) {
  		return a;
  	}
  	return new Bounds(a, b);
  }

  /*
   * @class LatLngBounds
   * @aka L.LatLngBounds
   *
   * Represents a rectangular geographical area on a map.
   *
   * @example
   *
   * ```js
   * var corner1 = L.latLng(40.712, -74.227),
   * corner2 = L.latLng(40.774, -74.125),
   * bounds = L.latLngBounds(corner1, corner2);
   * ```
   *
   * All Leaflet methods that accept LatLngBounds objects also accept them in a simple Array form (unless noted otherwise), so the bounds example above can be passed like this:
   *
   * ```js
   * map.fitBounds([
   * 	[40.712, -74.227],
   * 	[40.774, -74.125]
   * ]);
   * ```
   *
   * Caution: if the area crosses the antimeridian (often confused with the International Date Line), you must specify corners _outside_ the [-180, 180] degrees longitude range.
   *
   * Note that `LatLngBounds` does not inherit from Leaflet's `Class` object,
   * which means new classes can't inherit from it, and new methods
   * can't be added to it with the `include` function.
   */

  function LatLngBounds(corner1, corner2) { // (LatLng, LatLng) or (LatLng[])
  	if (!corner1) { return; }

  	var latlngs = corner2 ? [corner1, corner2] : corner1;

  	for (var i = 0, len = latlngs.length; i < len; i++) {
  		this.extend(latlngs[i]);
  	}
  }

  LatLngBounds.prototype = {

  	// @method extend(latlng: LatLng): this
  	// Extend the bounds to contain the given point

  	// @alternative
  	// @method extend(otherBounds: LatLngBounds): this
  	// Extend the bounds to contain the given bounds
  	extend: function (obj) {
  		var sw = this._southWest,
  		    ne = this._northEast,
  		    sw2, ne2;

  		if (obj instanceof LatLng) {
  			sw2 = obj;
  			ne2 = obj;

  		} else if (obj instanceof LatLngBounds) {
  			sw2 = obj._southWest;
  			ne2 = obj._northEast;

  			if (!sw2 || !ne2) { return this; }

  		} else {
  			return obj ? this.extend(toLatLng(obj) || toLatLngBounds(obj)) : this;
  		}

  		if (!sw && !ne) {
  			this._southWest = new LatLng(sw2.lat, sw2.lng);
  			this._northEast = new LatLng(ne2.lat, ne2.lng);
  		} else {
  			sw.lat = Math.min(sw2.lat, sw.lat);
  			sw.lng = Math.min(sw2.lng, sw.lng);
  			ne.lat = Math.max(ne2.lat, ne.lat);
  			ne.lng = Math.max(ne2.lng, ne.lng);
  		}

  		return this;
  	},

  	// @method pad(bufferRatio: Number): LatLngBounds
  	// Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
  	// For example, a ratio of 0.5 extends the bounds by 50% in each direction.
  	// Negative values will retract the bounds.
  	pad: function (bufferRatio) {
  		var sw = this._southWest,
  		    ne = this._northEast,
  		    heightBuffer = Math.abs(sw.lat - ne.lat) * bufferRatio,
  		    widthBuffer = Math.abs(sw.lng - ne.lng) * bufferRatio;

  		return new LatLngBounds(
  		        new LatLng(sw.lat - heightBuffer, sw.lng - widthBuffer),
  		        new LatLng(ne.lat + heightBuffer, ne.lng + widthBuffer));
  	},

  	// @method getCenter(): LatLng
  	// Returns the center point of the bounds.
  	getCenter: function () {
  		return new LatLng(
  		        (this._southWest.lat + this._northEast.lat) / 2,
  		        (this._southWest.lng + this._northEast.lng) / 2);
  	},

  	// @method getSouthWest(): LatLng
  	// Returns the south-west point of the bounds.
  	getSouthWest: function () {
  		return this._southWest;
  	},

  	// @method getNorthEast(): LatLng
  	// Returns the north-east point of the bounds.
  	getNorthEast: function () {
  		return this._northEast;
  	},

  	// @method getNorthWest(): LatLng
  	// Returns the north-west point of the bounds.
  	getNorthWest: function () {
  		return new LatLng(this.getNorth(), this.getWest());
  	},

  	// @method getSouthEast(): LatLng
  	// Returns the south-east point of the bounds.
  	getSouthEast: function () {
  		return new LatLng(this.getSouth(), this.getEast());
  	},

  	// @method getWest(): Number
  	// Returns the west longitude of the bounds
  	getWest: function () {
  		return this._southWest.lng;
  	},

  	// @method getSouth(): Number
  	// Returns the south latitude of the bounds
  	getSouth: function () {
  		return this._southWest.lat;
  	},

  	// @method getEast(): Number
  	// Returns the east longitude of the bounds
  	getEast: function () {
  		return this._northEast.lng;
  	},

  	// @method getNorth(): Number
  	// Returns the north latitude of the bounds
  	getNorth: function () {
  		return this._northEast.lat;
  	},

  	// @method contains(otherBounds: LatLngBounds): Boolean
  	// Returns `true` if the rectangle contains the given one.

  	// @alternative
  	// @method contains (latlng: LatLng): Boolean
  	// Returns `true` if the rectangle contains the given point.
  	contains: function (obj) { // (LatLngBounds) or (LatLng) -> Boolean
  		if (typeof obj[0] === 'number' || obj instanceof LatLng || 'lat' in obj) {
  			obj = toLatLng(obj);
  		} else {
  			obj = toLatLngBounds(obj);
  		}

  		var sw = this._southWest,
  		    ne = this._northEast,
  		    sw2, ne2;

  		if (obj instanceof LatLngBounds) {
  			sw2 = obj.getSouthWest();
  			ne2 = obj.getNorthEast();
  		} else {
  			sw2 = ne2 = obj;
  		}

  		return (sw2.lat >= sw.lat) && (ne2.lat <= ne.lat) &&
  		       (sw2.lng >= sw.lng) && (ne2.lng <= ne.lng);
  	},

  	// @method intersects(otherBounds: LatLngBounds): Boolean
  	// Returns `true` if the rectangle intersects the given bounds. Two bounds intersect if they have at least one point in common.
  	intersects: function (bounds) {
  		bounds = toLatLngBounds(bounds);

  		var sw = this._southWest,
  		    ne = this._northEast,
  		    sw2 = bounds.getSouthWest(),
  		    ne2 = bounds.getNorthEast(),

  		    latIntersects = (ne2.lat >= sw.lat) && (sw2.lat <= ne.lat),
  		    lngIntersects = (ne2.lng >= sw.lng) && (sw2.lng <= ne.lng);

  		return latIntersects && lngIntersects;
  	},

  	// @method overlaps(otherBounds: LatLngBounds): Boolean
  	// Returns `true` if the rectangle overlaps the given bounds. Two bounds overlap if their intersection is an area.
  	overlaps: function (bounds) {
  		bounds = toLatLngBounds(bounds);

  		var sw = this._southWest,
  		    ne = this._northEast,
  		    sw2 = bounds.getSouthWest(),
  		    ne2 = bounds.getNorthEast(),

  		    latOverlaps = (ne2.lat > sw.lat) && (sw2.lat < ne.lat),
  		    lngOverlaps = (ne2.lng > sw.lng) && (sw2.lng < ne.lng);

  		return latOverlaps && lngOverlaps;
  	},

  	// @method toBBoxString(): String
  	// Returns a string with bounding box coordinates in a 'southwest_lng,southwest_lat,northeast_lng,northeast_lat' format. Useful for sending requests to web services that return geo data.
  	toBBoxString: function () {
  		return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(',');
  	},

  	// @method equals(otherBounds: LatLngBounds, maxMargin?: Number): Boolean
  	// Returns `true` if the rectangle is equivalent (within a small margin of error) to the given bounds. The margin of error can be overridden by setting `maxMargin` to a small number.
  	equals: function (bounds, maxMargin) {
  		if (!bounds) { return false; }

  		bounds = toLatLngBounds(bounds);

  		return this._southWest.equals(bounds.getSouthWest(), maxMargin) &&
  		       this._northEast.equals(bounds.getNorthEast(), maxMargin);
  	},

  	// @method isValid(): Boolean
  	// Returns `true` if the bounds are properly initialized.
  	isValid: function () {
  		return !!(this._southWest && this._northEast);
  	}
  };

  // TODO International date line?

  // @factory L.latLngBounds(corner1: LatLng, corner2: LatLng)
  // Creates a `LatLngBounds` object by defining two diagonally opposite corners of the rectangle.

  // @alternative
  // @factory L.latLngBounds(latlngs: LatLng[])
  // Creates a `LatLngBounds` object defined by the geographical points it contains. Very useful for zooming the map to fit a particular set of locations with [`fitBounds`](#map-fitbounds).
  function toLatLngBounds(a, b) {
  	if (a instanceof LatLngBounds) {
  		return a;
  	}
  	return new LatLngBounds(a, b);
  }

  /* @class LatLng
   * @aka L.LatLng
   *
   * Represents a geographical point with a certain latitude and longitude.
   *
   * @example
   *
   * ```
   * var latlng = L.latLng(50.5, 30.5);
   * ```
   *
   * All Leaflet methods that accept LatLng objects also accept them in a simple Array form and simple object form (unless noted otherwise), so these lines are equivalent:
   *
   * ```
   * map.panTo([50, 30]);
   * map.panTo({lon: 30, lat: 50});
   * map.panTo({lat: 50, lng: 30});
   * map.panTo(L.latLng(50, 30));
   * ```
   *
   * Note that `LatLng` does not inherit from Leaflet's `Class` object,
   * which means new classes can't inherit from it, and new methods
   * can't be added to it with the `include` function.
   */

  function LatLng(lat, lng, alt) {
  	if (isNaN(lat) || isNaN(lng)) {
  		throw new Error('Invalid LatLng object: (' + lat + ', ' + lng + ')');
  	}

  	// @property lat: Number
  	// Latitude in degrees
  	this.lat = +lat;

  	// @property lng: Number
  	// Longitude in degrees
  	this.lng = +lng;

  	// @property alt: Number
  	// Altitude in meters (optional)
  	if (alt !== undefined) {
  		this.alt = +alt;
  	}
  }

  LatLng.prototype = {
  	// @method equals(otherLatLng: LatLng, maxMargin?: Number): Boolean
  	// Returns `true` if the given `LatLng` point is at the same position (within a small margin of error). The margin of error can be overridden by setting `maxMargin` to a small number.
  	equals: function (obj, maxMargin) {
  		if (!obj) { return false; }

  		obj = toLatLng(obj);

  		var margin = Math.max(
  		        Math.abs(this.lat - obj.lat),
  		        Math.abs(this.lng - obj.lng));

  		return margin <= (maxMargin === undefined ? 1.0E-9 : maxMargin);
  	},

  	// @method toString(): String
  	// Returns a string representation of the point (for debugging purposes).
  	toString: function (precision) {
  		return 'LatLng(' +
  		        formatNum(this.lat, precision) + ', ' +
  		        formatNum(this.lng, precision) + ')';
  	},

  	// @method distanceTo(otherLatLng: LatLng): Number
  	// Returns the distance (in meters) to the given `LatLng` calculated using the [Spherical Law of Cosines](https://en.wikipedia.org/wiki/Spherical_law_of_cosines).
  	distanceTo: function (other) {
  		return Earth.distance(this, toLatLng(other));
  	},

  	// @method wrap(): LatLng
  	// Returns a new `LatLng` object with the longitude wrapped so it's always between -180 and +180 degrees.
  	wrap: function () {
  		return Earth.wrapLatLng(this);
  	},

  	// @method toBounds(sizeInMeters: Number): LatLngBounds
  	// Returns a new `LatLngBounds` object in which each boundary is `sizeInMeters/2` meters apart from the `LatLng`.
  	toBounds: function (sizeInMeters) {
  		var latAccuracy = 180 * sizeInMeters / 40075017,
  		    lngAccuracy = latAccuracy / Math.cos((Math.PI / 180) * this.lat);

  		return toLatLngBounds(
  		        [this.lat - latAccuracy, this.lng - lngAccuracy],
  		        [this.lat + latAccuracy, this.lng + lngAccuracy]);
  	},

  	clone: function () {
  		return new LatLng(this.lat, this.lng, this.alt);
  	}
  };



  // @factory L.latLng(latitude: Number, longitude: Number, altitude?: Number): LatLng
  // Creates an object representing a geographical point with the given latitude and longitude (and optionally altitude).

  // @alternative
  // @factory L.latLng(coords: Array): LatLng
  // Expects an array of the form `[Number, Number]` or `[Number, Number, Number]` instead.

  // @alternative
  // @factory L.latLng(coords: Object): LatLng
  // Expects an plain object of the form `{lat: Number, lng: Number}` or `{lat: Number, lng: Number, alt: Number}` instead.

  function toLatLng(a, b, c) {
  	if (a instanceof LatLng) {
  		return a;
  	}
  	if (isArray(a) && typeof a[0] !== 'object') {
  		if (a.length === 3) {
  			return new LatLng(a[0], a[1], a[2]);
  		}
  		if (a.length === 2) {
  			return new LatLng(a[0], a[1]);
  		}
  		return null;
  	}
  	if (a === undefined || a === null) {
  		return a;
  	}
  	if (typeof a === 'object' && 'lat' in a) {
  		return new LatLng(a.lat, 'lng' in a ? a.lng : a.lon, a.alt);
  	}
  	if (b === undefined) {
  		return null;
  	}
  	return new LatLng(a, b, c);
  }

  /*
   * @namespace CRS
   * @crs L.CRS.Base
   * Object that defines coordinate reference systems for projecting
   * geographical points into pixel (screen) coordinates and back (and to
   * coordinates in other units for [WMS](https://en.wikipedia.org/wiki/Web_Map_Service) services). See
   * [spatial reference system](http://en.wikipedia.org/wiki/Coordinate_reference_system).
   *
   * Leaflet defines the most usual CRSs by default. If you want to use a
   * CRS not defined by default, take a look at the
   * [Proj4Leaflet](https://github.com/kartena/Proj4Leaflet) plugin.
   *
   * Note that the CRS instances do not inherit from Leaflet's `Class` object,
   * and can't be instantiated. Also, new classes can't inherit from them,
   * and methods can't be added to them with the `include` function.
   */

  var CRS = {
  	// @method latLngToPoint(latlng: LatLng, zoom: Number): Point
  	// Projects geographical coordinates into pixel coordinates for a given zoom.
  	latLngToPoint: function (latlng, zoom) {
  		var projectedPoint = this.projection.project(latlng),
  		    scale = this.scale(zoom);

  		return this.transformation._transform(projectedPoint, scale);
  	},

  	// @method pointToLatLng(point: Point, zoom: Number): LatLng
  	// The inverse of `latLngToPoint`. Projects pixel coordinates on a given
  	// zoom into geographical coordinates.
  	pointToLatLng: function (point, zoom) {
  		var scale = this.scale(zoom),
  		    untransformedPoint = this.transformation.untransform(point, scale);

  		return this.projection.unproject(untransformedPoint);
  	},

  	// @method project(latlng: LatLng): Point
  	// Projects geographical coordinates into coordinates in units accepted for
  	// this CRS (e.g. meters for EPSG:3857, for passing it to WMS services).
  	project: function (latlng) {
  		return this.projection.project(latlng);
  	},

  	// @method unproject(point: Point): LatLng
  	// Given a projected coordinate returns the corresponding LatLng.
  	// The inverse of `project`.
  	unproject: function (point) {
  		return this.projection.unproject(point);
  	},

  	// @method scale(zoom: Number): Number
  	// Returns the scale used when transforming projected coordinates into
  	// pixel coordinates for a particular zoom. For example, it returns
  	// `256 * 2^zoom` for Mercator-based CRS.
  	scale: function (zoom) {
  		return 256 * Math.pow(2, zoom);
  	},

  	// @method zoom(scale: Number): Number
  	// Inverse of `scale()`, returns the zoom level corresponding to a scale
  	// factor of `scale`.
  	zoom: function (scale) {
  		return Math.log(scale / 256) / Math.LN2;
  	},

  	// @method getProjectedBounds(zoom: Number): Bounds
  	// Returns the projection's bounds scaled and transformed for the provided `zoom`.
  	getProjectedBounds: function (zoom) {
  		if (this.infinite) { return null; }

  		var b = this.projection.bounds,
  		    s = this.scale(zoom),
  		    min = this.transformation.transform(b.min, s),
  		    max = this.transformation.transform(b.max, s);

  		return new Bounds(min, max);
  	},

  	// @method distance(latlng1: LatLng, latlng2: LatLng): Number
  	// Returns the distance between two geographical coordinates.

  	// @property code: String
  	// Standard code name of the CRS passed into WMS services (e.g. `'EPSG:3857'`)
  	//
  	// @property wrapLng: Number[]
  	// An array of two numbers defining whether the longitude (horizontal) coordinate
  	// axis wraps around a given range and how. Defaults to `[-180, 180]` in most
  	// geographical CRSs. If `undefined`, the longitude axis does not wrap around.
  	//
  	// @property wrapLat: Number[]
  	// Like `wrapLng`, but for the latitude (vertical) axis.

  	// wrapLng: [min, max],
  	// wrapLat: [min, max],

  	// @property infinite: Boolean
  	// If true, the coordinate space will be unbounded (infinite in both axes)
  	infinite: false,

  	// @method wrapLatLng(latlng: LatLng): LatLng
  	// Returns a `LatLng` where lat and lng has been wrapped according to the
  	// CRS's `wrapLat` and `wrapLng` properties, if they are outside the CRS's bounds.
  	wrapLatLng: function (latlng) {
  		var lng = this.wrapLng ? wrapNum(latlng.lng, this.wrapLng, true) : latlng.lng,
  		    lat = this.wrapLat ? wrapNum(latlng.lat, this.wrapLat, true) : latlng.lat,
  		    alt = latlng.alt;

  		return new LatLng(lat, lng, alt);
  	},

  	// @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
  	// Returns a `LatLngBounds` with the same size as the given one, ensuring
  	// that its center is within the CRS's bounds.
  	// Only accepts actual `L.LatLngBounds` instances, not arrays.
  	wrapLatLngBounds: function (bounds) {
  		var center = bounds.getCenter(),
  		    newCenter = this.wrapLatLng(center),
  		    latShift = center.lat - newCenter.lat,
  		    lngShift = center.lng - newCenter.lng;

  		if (latShift === 0 && lngShift === 0) {
  			return bounds;
  		}

  		var sw = bounds.getSouthWest(),
  		    ne = bounds.getNorthEast(),
  		    newSw = new LatLng(sw.lat - latShift, sw.lng - lngShift),
  		    newNe = new LatLng(ne.lat - latShift, ne.lng - lngShift);

  		return new LatLngBounds(newSw, newNe);
  	}
  };

  /*
   * @namespace CRS
   * @crs L.CRS.Earth
   *
   * Serves as the base for CRS that are global such that they cover the earth.
   * Can only be used as the base for other CRS and cannot be used directly,
   * since it does not have a `code`, `projection` or `transformation`. `distance()` returns
   * meters.
   */

  var Earth = extend({}, CRS, {
  	wrapLng: [-180, 180],

  	// Mean Earth Radius, as recommended for use by
  	// the International Union of Geodesy and Geophysics,
  	// see http://rosettacode.org/wiki/Haversine_formula
  	R: 6371000,

  	// distance between two geographical points using spherical law of cosines approximation
  	distance: function (latlng1, latlng2) {
  		var rad = Math.PI / 180,
  		    lat1 = latlng1.lat * rad,
  		    lat2 = latlng2.lat * rad,
  		    sinDLat = Math.sin((latlng2.lat - latlng1.lat) * rad / 2),
  		    sinDLon = Math.sin((latlng2.lng - latlng1.lng) * rad / 2),
  		    a = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon,
  		    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  		return this.R * c;
  	}
  });

  /*
   * @namespace Projection
   * @projection L.Projection.SphericalMercator
   *
   * Spherical Mercator projection — the most common projection for online maps,
   * used by almost all free and commercial tile providers. Assumes that Earth is
   * a sphere. Used by the `EPSG:3857` CRS.
   */

  var earthRadius = 6378137;

  var SphericalMercator = {

  	R: earthRadius,
  	MAX_LATITUDE: 85.0511287798,

  	project: function (latlng) {
  		var d = Math.PI / 180,
  		    max = this.MAX_LATITUDE,
  		    lat = Math.max(Math.min(max, latlng.lat), -max),
  		    sin = Math.sin(lat * d);

  		return new Point(
  			this.R * latlng.lng * d,
  			this.R * Math.log((1 + sin) / (1 - sin)) / 2);
  	},

  	unproject: function (point) {
  		var d = 180 / Math.PI;

  		return new LatLng(
  			(2 * Math.atan(Math.exp(point.y / this.R)) - (Math.PI / 2)) * d,
  			point.x * d / this.R);
  	},

  	bounds: (function () {
  		var d = earthRadius * Math.PI;
  		return new Bounds([-d, -d], [d, d]);
  	})()
  };

  /*
   * @class Transformation
   * @aka L.Transformation
   *
   * Represents an affine transformation: a set of coefficients `a`, `b`, `c`, `d`
   * for transforming a point of a form `(x, y)` into `(a*x + b, c*y + d)` and doing
   * the reverse. Used by Leaflet in its projections code.
   *
   * @example
   *
   * ```js
   * var transformation = L.transformation(2, 5, -1, 10),
   * 	p = L.point(1, 2),
   * 	p2 = transformation.transform(p), //  L.point(7, 8)
   * 	p3 = transformation.untransform(p2); //  L.point(1, 2)
   * ```
   */


  // factory new L.Transformation(a: Number, b: Number, c: Number, d: Number)
  // Creates a `Transformation` object with the given coefficients.
  function Transformation(a, b, c, d) {
  	if (isArray(a)) {
  		// use array properties
  		this._a = a[0];
  		this._b = a[1];
  		this._c = a[2];
  		this._d = a[3];
  		return;
  	}
  	this._a = a;
  	this._b = b;
  	this._c = c;
  	this._d = d;
  }

  Transformation.prototype = {
  	// @method transform(point: Point, scale?: Number): Point
  	// Returns a transformed point, optionally multiplied by the given scale.
  	// Only accepts actual `L.Point` instances, not arrays.
  	transform: function (point, scale) { // (Point, Number) -> Point
  		return this._transform(point.clone(), scale);
  	},

  	// destructive transform (faster)
  	_transform: function (point, scale) {
  		scale = scale || 1;
  		point.x = scale * (this._a * point.x + this._b);
  		point.y = scale * (this._c * point.y + this._d);
  		return point;
  	},

  	// @method untransform(point: Point, scale?: Number): Point
  	// Returns the reverse transformation of the given point, optionally divided
  	// by the given scale. Only accepts actual `L.Point` instances, not arrays.
  	untransform: function (point, scale) {
  		scale = scale || 1;
  		return new Point(
  		        (point.x / scale - this._b) / this._a,
  		        (point.y / scale - this._d) / this._c);
  	}
  };

  // factory L.transformation(a: Number, b: Number, c: Number, d: Number)

  // @factory L.transformation(a: Number, b: Number, c: Number, d: Number)
  // Instantiates a Transformation object with the given coefficients.

  // @alternative
  // @factory L.transformation(coefficients: Array): Transformation
  // Expects an coefficients array of the form
  // `[a: Number, b: Number, c: Number, d: Number]`.

  function toTransformation(a, b, c, d) {
  	return new Transformation(a, b, c, d);
  }

  /*
   * @namespace CRS
   * @crs L.CRS.EPSG3857
   *
   * The most common CRS for online maps, used by almost all free and commercial
   * tile providers. Uses Spherical Mercator projection. Set in by default in
   * Map's `crs` option.
   */

  var EPSG3857 = extend({}, Earth, {
  	code: 'EPSG:3857',
  	projection: SphericalMercator,

  	transformation: (function () {
  		var scale = 0.5 / (Math.PI * SphericalMercator.R);
  		return toTransformation(scale, 0.5, -scale, 0.5);
  	}())
  });

  var EPSG900913 = extend({}, EPSG3857, {
  	code: 'EPSG:900913'
  });

  // @namespace SVG; @section
  // There are several static functions which can be called without instantiating L.SVG:

  // @function create(name: String): SVGElement
  // Returns a instance of [SVGElement](https://developer.mozilla.org/docs/Web/API/SVGElement),
  // corresponding to the class name passed. For example, using 'line' will return
  // an instance of [SVGLineElement](https://developer.mozilla.org/docs/Web/API/SVGLineElement).
  function svgCreate(name) {
  	return document.createElementNS('http://www.w3.org/2000/svg', name);
  }

  // @function pointsToPath(rings: Point[], closed: Boolean): String
  // Generates a SVG path string for multiple rings, with each ring turning
  // into "M..L..L.." instructions
  function pointsToPath(rings, closed) {
  	var str = '',
  	i, j, len, len2, points, p;

  	for (i = 0, len = rings.length; i < len; i++) {
  		points = rings[i];

  		for (j = 0, len2 = points.length; j < len2; j++) {
  			p = points[j];
  			str += (j ? 'L' : 'M') + p.x + ' ' + p.y;
  		}

  		// closes the ring for polygons; "x" is VML syntax
  		str += closed ? (svg ? 'z' : 'x') : '';
  	}

  	// SVG complains about empty path strings
  	return str || 'M0 0';
  }

  /*
   * @namespace Browser
   * @aka L.Browser
   *
   * A namespace with static properties for browser/feature detection used by Leaflet internally.
   *
   * @example
   *
   * ```js
   * if (L.Browser.ielt9) {
   *   alert('Upgrade your browser, dude!');
   * }
   * ```
   */

  var style$1 = document.documentElement.style;

  // @property ie: Boolean; `true` for all Internet Explorer versions (not Edge).
  var ie = 'ActiveXObject' in window;

  // @property ielt9: Boolean; `true` for Internet Explorer versions less than 9.
  var ielt9 = ie && !document.addEventListener;

  // @property edge: Boolean; `true` for the Edge web browser.
  var edge = 'msLaunchUri' in navigator && !('documentMode' in document);

  // @property webkit: Boolean;
  // `true` for webkit-based browsers like Chrome and Safari (including mobile versions).
  var webkit = userAgentContains('webkit');

  // @property android: Boolean
  // `true` for any browser running on an Android platform.
  var android = userAgentContains('android');

  // @property android23: Boolean; `true` for browsers running on Android 2 or Android 3.
  var android23 = userAgentContains('android 2') || userAgentContains('android 3');

  /* See https://stackoverflow.com/a/17961266 for details on detecting stock Android */
  var webkitVer = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10); // also matches AppleWebKit
  // @property androidStock: Boolean; `true` for the Android stock browser (i.e. not Chrome)
  var androidStock = android && userAgentContains('Google') && webkitVer < 537 && !('AudioNode' in window);

  // @property opera: Boolean; `true` for the Opera browser
  var opera = !!window.opera;

  // @property chrome: Boolean; `true` for the Chrome browser.
  var chrome = !edge && userAgentContains('chrome');

  // @property gecko: Boolean; `true` for gecko-based browsers like Firefox.
  var gecko = userAgentContains('gecko') && !webkit && !opera && !ie;

  // @property safari: Boolean; `true` for the Safari browser.
  var safari = !chrome && userAgentContains('safari');

  var phantom = userAgentContains('phantom');

  // @property opera12: Boolean
  // `true` for the Opera browser supporting CSS transforms (version 12 or later).
  var opera12 = 'OTransition' in style$1;

  // @property win: Boolean; `true` when the browser is running in a Windows platform
  var win = navigator.platform.indexOf('Win') === 0;

  // @property ie3d: Boolean; `true` for all Internet Explorer versions supporting CSS transforms.
  var ie3d = ie && ('transition' in style$1);

  // @property webkit3d: Boolean; `true` for webkit-based browsers supporting CSS transforms.
  var webkit3d = ('WebKitCSSMatrix' in window) && ('m11' in new window.WebKitCSSMatrix()) && !android23;

  // @property gecko3d: Boolean; `true` for gecko-based browsers supporting CSS transforms.
  var gecko3d = 'MozPerspective' in style$1;

  // @property any3d: Boolean
  // `true` for all browsers supporting CSS transforms.
  var any3d = !window.L_DISABLE_3D && (ie3d || webkit3d || gecko3d) && !opera12 && !phantom;

  // @property mobile: Boolean; `true` for all browsers running in a mobile device.
  var mobile = typeof orientation !== 'undefined' || userAgentContains('mobile');

  // @property mobileWebkit: Boolean; `true` for all webkit-based browsers in a mobile device.
  var mobileWebkit = mobile && webkit;

  // @property mobileWebkit3d: Boolean
  // `true` for all webkit-based browsers in a mobile device supporting CSS transforms.
  var mobileWebkit3d = mobile && webkit3d;

  // @property msPointer: Boolean
  // `true` for browsers implementing the Microsoft touch events model (notably IE10).
  var msPointer = !window.PointerEvent && window.MSPointerEvent;

  // @property pointer: Boolean
  // `true` for all browsers supporting [pointer events](https://msdn.microsoft.com/en-us/library/dn433244%28v=vs.85%29.aspx).
  var pointer = !!(window.PointerEvent || msPointer);

  // @property touch: Boolean
  // `true` for all browsers supporting [touch events](https://developer.mozilla.org/docs/Web/API/Touch_events).
  // This does not necessarily mean that the browser is running in a computer with
  // a touchscreen, it only means that the browser is capable of understanding
  // touch events.
  var touch = !window.L_NO_TOUCH && (pointer || 'ontouchstart' in window ||
  		(window.DocumentTouch && document instanceof window.DocumentTouch));

  // @property mobileOpera: Boolean; `true` for the Opera browser in a mobile device.
  var mobileOpera = mobile && opera;

  // @property mobileGecko: Boolean
  // `true` for gecko-based browsers running in a mobile device.
  var mobileGecko = mobile && gecko;

  // @property retina: Boolean
  // `true` for browsers on a high-resolution "retina" screen or on any screen when browser's display zoom is more than 100%.
  var retina = (window.devicePixelRatio || (window.screen.deviceXDPI / window.screen.logicalXDPI)) > 1;

  // @property passiveEvents: Boolean
  // `true` for browsers that support passive events.
  var passiveEvents = (function () {
  	var supportsPassiveOption = false;
  	try {
  		var opts = Object.defineProperty({}, 'passive', {
  			get: function () { // eslint-disable-line getter-return
  				supportsPassiveOption = true;
  			}
  		});
  		window.addEventListener('testPassiveEventSupport', falseFn, opts);
  		window.removeEventListener('testPassiveEventSupport', falseFn, opts);
  	} catch (e) {
  		// Errors can safely be ignored since this is only a browser support test.
  	}
  	return supportsPassiveOption;
  }());

  // @property canvas: Boolean
  // `true` when the browser supports [`<canvas>`](https://developer.mozilla.org/docs/Web/API/Canvas_API).
  var canvas = (function () {
  	return !!document.createElement('canvas').getContext;
  }());

  // @property svg: Boolean
  // `true` when the browser supports [SVG](https://developer.mozilla.org/docs/Web/SVG).
  var svg = !!(document.createElementNS && svgCreate('svg').createSVGRect);

  // @property vml: Boolean
  // `true` if the browser supports [VML](https://en.wikipedia.org/wiki/Vector_Markup_Language).
  var vml = !svg && (function () {
  	try {
  		var div = document.createElement('div');
  		div.innerHTML = '<v:shape adj="1"/>';

  		var shape = div.firstChild;
  		shape.style.behavior = 'url(#default#VML)';

  		return shape && (typeof shape.adj === 'object');

  	} catch (e) {
  		return false;
  	}
  }());


  function userAgentContains(str) {
  	return navigator.userAgent.toLowerCase().indexOf(str) >= 0;
  }

  var Browser = ({
    ie: ie,
    ielt9: ielt9,
    edge: edge,
    webkit: webkit,
    android: android,
    android23: android23,
    androidStock: androidStock,
    opera: opera,
    chrome: chrome,
    gecko: gecko,
    safari: safari,
    phantom: phantom,
    opera12: opera12,
    win: win,
    ie3d: ie3d,
    webkit3d: webkit3d,
    gecko3d: gecko3d,
    any3d: any3d,
    mobile: mobile,
    mobileWebkit: mobileWebkit,
    mobileWebkit3d: mobileWebkit3d,
    msPointer: msPointer,
    pointer: pointer,
    touch: touch,
    mobileOpera: mobileOpera,
    mobileGecko: mobileGecko,
    retina: retina,
    passiveEvents: passiveEvents,
    canvas: canvas,
    svg: svg,
    vml: vml
  });

  /*
   * Extends L.DomEvent to provide touch support for Internet Explorer and Windows-based devices.
   */


  var POINTER_DOWN =   msPointer ? 'MSPointerDown'   : 'pointerdown';
  var POINTER_MOVE =   msPointer ? 'MSPointerMove'   : 'pointermove';
  var POINTER_UP =     msPointer ? 'MSPointerUp'     : 'pointerup';
  var POINTER_CANCEL = msPointer ? 'MSPointerCancel' : 'pointercancel';

  var _pointers = {};
  var _pointerDocListener = false;

  // Provides a touch events wrapper for (ms)pointer events.
  // ref http://www.w3.org/TR/pointerevents/ https://www.w3.org/Bugs/Public/show_bug.cgi?id=22890

  function addPointerListener(obj, type, handler, id) {
  	if (type === 'touchstart') {
  		_addPointerStart(obj, handler, id);

  	} else if (type === 'touchmove') {
  		_addPointerMove(obj, handler, id);

  	} else if (type === 'touchend') {
  		_addPointerEnd(obj, handler, id);
  	}

  	return this;
  }

  function removePointerListener(obj, type, id) {
  	var handler = obj['_leaflet_' + type + id];

  	if (type === 'touchstart') {
  		obj.removeEventListener(POINTER_DOWN, handler, false);

  	} else if (type === 'touchmove') {
  		obj.removeEventListener(POINTER_MOVE, handler, false);

  	} else if (type === 'touchend') {
  		obj.removeEventListener(POINTER_UP, handler, false);
  		obj.removeEventListener(POINTER_CANCEL, handler, false);
  	}

  	return this;
  }

  function _addPointerStart(obj, handler, id) {
  	var onDown = bind(function (e) {
  		// IE10 specific: MsTouch needs preventDefault. See #2000
  		if (e.MSPOINTER_TYPE_TOUCH && e.pointerType === e.MSPOINTER_TYPE_TOUCH) {
  			preventDefault(e);
  		}

  		_handlePointer(e, handler);
  	});

  	obj['_leaflet_touchstart' + id] = onDown;
  	obj.addEventListener(POINTER_DOWN, onDown, false);

  	// need to keep track of what pointers and how many are active to provide e.touches emulation
  	if (!_pointerDocListener) {
  		// we listen document as any drags that end by moving the touch off the screen get fired there
  		document.addEventListener(POINTER_DOWN, _globalPointerDown, true);
  		document.addEventListener(POINTER_MOVE, _globalPointerMove, true);
  		document.addEventListener(POINTER_UP, _globalPointerUp, true);
  		document.addEventListener(POINTER_CANCEL, _globalPointerUp, true);

  		_pointerDocListener = true;
  	}
  }

  function _globalPointerDown(e) {
  	_pointers[e.pointerId] = e;
  }

  function _globalPointerMove(e) {
  	if (_pointers[e.pointerId]) {
  		_pointers[e.pointerId] = e;
  	}
  }

  function _globalPointerUp(e) {
  	delete _pointers[e.pointerId];
  }

  function _handlePointer(e, handler) {
  	e.touches = [];
  	for (var i in _pointers) {
  		e.touches.push(_pointers[i]);
  	}
  	e.changedTouches = [e];

  	handler(e);
  }

  function _addPointerMove(obj, handler, id) {
  	var onMove = function (e) {
  		// don't fire touch moves when mouse isn't down
  		if ((e.pointerType === (e.MSPOINTER_TYPE_MOUSE || 'mouse')) && e.buttons === 0) {
  			return;
  		}

  		_handlePointer(e, handler);
  	};

  	obj['_leaflet_touchmove' + id] = onMove;
  	obj.addEventListener(POINTER_MOVE, onMove, false);
  }

  function _addPointerEnd(obj, handler, id) {
  	var onUp = function (e) {
  		_handlePointer(e, handler);
  	};

  	obj['_leaflet_touchend' + id] = onUp;
  	obj.addEventListener(POINTER_UP, onUp, false);
  	obj.addEventListener(POINTER_CANCEL, onUp, false);
  }

  /*
   * Extends the event handling code with double tap support for mobile browsers.
   */

  var _touchstart = msPointer ? 'MSPointerDown' : pointer ? 'pointerdown' : 'touchstart';
  var _touchend = msPointer ? 'MSPointerUp' : pointer ? 'pointerup' : 'touchend';
  var _pre = '_leaflet_';

  // inspired by Zepto touch code by Thomas Fuchs
  function addDoubleTapListener(obj, handler, id) {
  	var last, touch$$1,
  	    doubleTap = false,
  	    delay = 250;

  	function onTouchStart(e) {

  		if (pointer) {
  			if (!e.isPrimary) { return; }
  			if (e.pointerType === 'mouse') { return; } // mouse fires native dblclick
  		} else if (e.touches.length > 1) {
  			return;
  		}

  		var now = Date.now(),
  		    delta = now - (last || now);

  		touch$$1 = e.touches ? e.touches[0] : e;
  		doubleTap = (delta > 0 && delta <= delay);
  		last = now;
  	}

  	function onTouchEnd(e) {
  		if (doubleTap && !touch$$1.cancelBubble) {
  			if (pointer) {
  				if (e.pointerType === 'mouse') { return; }
  				// work around .type being readonly with MSPointer* events
  				var newTouch = {},
  				    prop, i;

  				for (i in touch$$1) {
  					prop = touch$$1[i];
  					newTouch[i] = prop && prop.bind ? prop.bind(touch$$1) : prop;
  				}
  				touch$$1 = newTouch;
  			}
  			touch$$1.type = 'dblclick';
  			touch$$1.button = 0;
  			handler(touch$$1);
  			last = null;
  		}
  	}

  	obj[_pre + _touchstart + id] = onTouchStart;
  	obj[_pre + _touchend + id] = onTouchEnd;
  	obj[_pre + 'dblclick' + id] = handler;

  	obj.addEventListener(_touchstart, onTouchStart, passiveEvents ? {passive: false} : false);
  	obj.addEventListener(_touchend, onTouchEnd, passiveEvents ? {passive: false} : false);

  	// On some platforms (notably, chrome<55 on win10 + touchscreen + mouse),
  	// the browser doesn't fire touchend/pointerup events but does fire
  	// native dblclicks. See #4127.
  	// Edge 14 also fires native dblclicks, but only for pointerType mouse, see #5180.
  	obj.addEventListener('dblclick', handler, false);

  	return this;
  }

  function removeDoubleTapListener(obj, id) {
  	var touchstart = obj[_pre + _touchstart + id],
  	    touchend = obj[_pre + _touchend + id],
  	    dblclick = obj[_pre + 'dblclick' + id];

  	obj.removeEventListener(_touchstart, touchstart, passiveEvents ? {passive: false} : false);
  	obj.removeEventListener(_touchend, touchend, passiveEvents ? {passive: false} : false);
  	obj.removeEventListener('dblclick', dblclick, false);

  	return this;
  }

  /*
   * @namespace DomUtil
   *
   * Utility functions to work with the [DOM](https://developer.mozilla.org/docs/Web/API/Document_Object_Model)
   * tree, used by Leaflet internally.
   *
   * Most functions expecting or returning a `HTMLElement` also work for
   * SVG elements. The only difference is that classes refer to CSS classes
   * in HTML and SVG classes in SVG.
   */


  // @property TRANSFORM: String
  // Vendor-prefixed transform style name (e.g. `'webkitTransform'` for WebKit).
  var TRANSFORM = testProp(
  	['transform', 'webkitTransform', 'OTransform', 'MozTransform', 'msTransform']);

  // webkitTransition comes first because some browser versions that drop vendor prefix don't do
  // the same for the transitionend event, in particular the Android 4.1 stock browser

  // @property TRANSITION: String
  // Vendor-prefixed transition style name.
  var TRANSITION = testProp(
  	['webkitTransition', 'transition', 'OTransition', 'MozTransition', 'msTransition']);

  // @property TRANSITION_END: String
  // Vendor-prefixed transitionend event name.
  var TRANSITION_END =
  	TRANSITION === 'webkitTransition' || TRANSITION === 'OTransition' ? TRANSITION + 'End' : 'transitionend';


  // @function get(id: String|HTMLElement): HTMLElement
  // Returns an element given its DOM id, or returns the element itself
  // if it was passed directly.
  function get(id) {
  	return typeof id === 'string' ? document.getElementById(id) : id;
  }

  // @function getStyle(el: HTMLElement, styleAttrib: String): String
  // Returns the value for a certain style attribute on an element,
  // including computed values or values set through CSS.
  function getStyle(el, style) {
  	var value = el.style[style] || (el.currentStyle && el.currentStyle[style]);

  	if ((!value || value === 'auto') && document.defaultView) {
  		var css = document.defaultView.getComputedStyle(el, null);
  		value = css ? css[style] : null;
  	}
  	return value === 'auto' ? null : value;
  }

  // @function create(tagName: String, className?: String, container?: HTMLElement): HTMLElement
  // Creates an HTML element with `tagName`, sets its class to `className`, and optionally appends it to `container` element.
  function create$1(tagName, className, container) {
  	var el = document.createElement(tagName);
  	el.className = className || '';

  	if (container) {
  		container.appendChild(el);
  	}
  	return el;
  }

  // @function remove(el: HTMLElement)
  // Removes `el` from its parent element
  function remove(el) {
  	var parent = el.parentNode;
  	if (parent) {
  		parent.removeChild(el);
  	}
  }

  // @function empty(el: HTMLElement)
  // Removes all of `el`'s children elements from `el`
  function empty(el) {
  	while (el.firstChild) {
  		el.removeChild(el.firstChild);
  	}
  }

  // @function toFront(el: HTMLElement)
  // Makes `el` the last child of its parent, so it renders in front of the other children.
  function toFront(el) {
  	var parent = el.parentNode;
  	if (parent && parent.lastChild !== el) {
  		parent.appendChild(el);
  	}
  }

  // @function toBack(el: HTMLElement)
  // Makes `el` the first child of its parent, so it renders behind the other children.
  function toBack(el) {
  	var parent = el.parentNode;
  	if (parent && parent.firstChild !== el) {
  		parent.insertBefore(el, parent.firstChild);
  	}
  }

  // @function hasClass(el: HTMLElement, name: String): Boolean
  // Returns `true` if the element's class attribute contains `name`.
  function hasClass(el, name) {
  	if (el.classList !== undefined) {
  		return el.classList.contains(name);
  	}
  	var className = getClass(el);
  	return className.length > 0 && new RegExp('(^|\\s)' + name + '(\\s|$)').test(className);
  }

  // @function addClass(el: HTMLElement, name: String)
  // Adds `name` to the element's class attribute.
  function addClass(el, name) {
  	if (el.classList !== undefined) {
  		var classes = splitWords(name);
  		for (var i = 0, len = classes.length; i < len; i++) {
  			el.classList.add(classes[i]);
  		}
  	} else if (!hasClass(el, name)) {
  		var className = getClass(el);
  		setClass(el, (className ? className + ' ' : '') + name);
  	}
  }

  // @function removeClass(el: HTMLElement, name: String)
  // Removes `name` from the element's class attribute.
  function removeClass(el, name) {
  	if (el.classList !== undefined) {
  		el.classList.remove(name);
  	} else {
  		setClass(el, trim((' ' + getClass(el) + ' ').replace(' ' + name + ' ', ' ')));
  	}
  }

  // @function setClass(el: HTMLElement, name: String)
  // Sets the element's class.
  function setClass(el, name) {
  	if (el.className.baseVal === undefined) {
  		el.className = name;
  	} else {
  		// in case of SVG element
  		el.className.baseVal = name;
  	}
  }

  // @function getClass(el: HTMLElement): String
  // Returns the element's class.
  function getClass(el) {
  	// Check if the element is an SVGElementInstance and use the correspondingElement instead
  	// (Required for linked SVG elements in IE11.)
  	if (el.correspondingElement) {
  		el = el.correspondingElement;
  	}
  	return el.className.baseVal === undefined ? el.className : el.className.baseVal;
  }

  // @function setOpacity(el: HTMLElement, opacity: Number)
  // Set the opacity of an element (including old IE support).
  // `opacity` must be a number from `0` to `1`.
  function setOpacity(el, value) {
  	if ('opacity' in el.style) {
  		el.style.opacity = value;
  	} else if ('filter' in el.style) {
  		_setOpacityIE(el, value);
  	}
  }

  function _setOpacityIE(el, value) {
  	var filter = false,
  	    filterName = 'DXImageTransform.Microsoft.Alpha';

  	// filters collection throws an error if we try to retrieve a filter that doesn't exist
  	try {
  		filter = el.filters.item(filterName);
  	} catch (e) {
  		// don't set opacity to 1 if we haven't already set an opacity,
  		// it isn't needed and breaks transparent pngs.
  		if (value === 1) { return; }
  	}

  	value = Math.round(value * 100);

  	if (filter) {
  		filter.Enabled = (value !== 100);
  		filter.Opacity = value;
  	} else {
  		el.style.filter += ' progid:' + filterName + '(opacity=' + value + ')';
  	}
  }

  // @function testProp(props: String[]): String|false
  // Goes through the array of style names and returns the first name
  // that is a valid style name for an element. If no such name is found,
  // it returns false. Useful for vendor-prefixed styles like `transform`.
  function testProp(props) {
  	var style = document.documentElement.style;

  	for (var i = 0; i < props.length; i++) {
  		if (props[i] in style) {
  			return props[i];
  		}
  	}
  	return false;
  }

  // @function setTransform(el: HTMLElement, offset: Point, scale?: Number)
  // Resets the 3D CSS transform of `el` so it is translated by `offset` pixels
  // and optionally scaled by `scale`. Does not have an effect if the
  // browser doesn't support 3D CSS transforms.
  function setTransform(el, offset, scale) {
  	var pos = offset || new Point(0, 0);

  	el.style[TRANSFORM] =
  		(ie3d ?
  			'translate(' + pos.x + 'px,' + pos.y + 'px)' :
  			'translate3d(' + pos.x + 'px,' + pos.y + 'px,0)') +
  		(scale ? ' scale(' + scale + ')' : '');
  }

  // @function setPosition(el: HTMLElement, position: Point)
  // Sets the position of `el` to coordinates specified by `position`,
  // using CSS translate or top/left positioning depending on the browser
  // (used by Leaflet internally to position its layers).
  function setPosition(el, point) {

  	/*eslint-disable */
  	el._leaflet_pos = point;
  	/* eslint-enable */

  	if (any3d) {
  		setTransform(el, point);
  	} else {
  		el.style.left = point.x + 'px';
  		el.style.top = point.y + 'px';
  	}
  }

  // @function getPosition(el: HTMLElement): Point
  // Returns the coordinates of an element previously positioned with setPosition.
  function getPosition(el) {
  	// this method is only used for elements previously positioned using setPosition,
  	// so it's safe to cache the position for performance

  	return el._leaflet_pos || new Point(0, 0);
  }

  // @function disableTextSelection()
  // Prevents the user from generating `selectstart` DOM events, usually generated
  // when the user drags the mouse through a page with text. Used internally
  // by Leaflet to override the behaviour of any click-and-drag interaction on
  // the map. Affects drag interactions on the whole document.

  // @function enableTextSelection()
  // Cancels the effects of a previous [`L.DomUtil.disableTextSelection`](#domutil-disabletextselection).
  var disableTextSelection;
  var enableTextSelection;
  var _userSelect;
  if ('onselectstart' in document) {
  	disableTextSelection = function () {
  		on(window, 'selectstart', preventDefault);
  	};
  	enableTextSelection = function () {
  		off(window, 'selectstart', preventDefault);
  	};
  } else {
  	var userSelectProperty = testProp(
  		['userSelect', 'WebkitUserSelect', 'OUserSelect', 'MozUserSelect', 'msUserSelect']);

  	disableTextSelection = function () {
  		if (userSelectProperty) {
  			var style = document.documentElement.style;
  			_userSelect = style[userSelectProperty];
  			style[userSelectProperty] = 'none';
  		}
  	};
  	enableTextSelection = function () {
  		if (userSelectProperty) {
  			document.documentElement.style[userSelectProperty] = _userSelect;
  			_userSelect = undefined;
  		}
  	};
  }

  // @function disableImageDrag()
  // As [`L.DomUtil.disableTextSelection`](#domutil-disabletextselection), but
  // for `dragstart` DOM events, usually generated when the user drags an image.
  function disableImageDrag() {
  	on(window, 'dragstart', preventDefault);
  }

  // @function enableImageDrag()
  // Cancels the effects of a previous [`L.DomUtil.disableImageDrag`](#domutil-disabletextselection).
  function enableImageDrag() {
  	off(window, 'dragstart', preventDefault);
  }

  var _outlineElement, _outlineStyle;
  // @function preventOutline(el: HTMLElement)
  // Makes the [outline](https://developer.mozilla.org/docs/Web/CSS/outline)
  // of the element `el` invisible. Used internally by Leaflet to prevent
  // focusable elements from displaying an outline when the user performs a
  // drag interaction on them.
  function preventOutline(element) {
  	while (element.tabIndex === -1) {
  		element = element.parentNode;
  	}
  	if (!element.style) { return; }
  	restoreOutline();
  	_outlineElement = element;
  	_outlineStyle = element.style.outline;
  	element.style.outline = 'none';
  	on(window, 'keydown', restoreOutline);
  }

  // @function restoreOutline()
  // Cancels the effects of a previous [`L.DomUtil.preventOutline`]().
  function restoreOutline() {
  	if (!_outlineElement) { return; }
  	_outlineElement.style.outline = _outlineStyle;
  	_outlineElement = undefined;
  	_outlineStyle = undefined;
  	off(window, 'keydown', restoreOutline);
  }

  // @function getSizedParentNode(el: HTMLElement): HTMLElement
  // Finds the closest parent node which size (width and height) is not null.
  function getSizedParentNode(element) {
  	do {
  		element = element.parentNode;
  	} while ((!element.offsetWidth || !element.offsetHeight) && element !== document.body);
  	return element;
  }

  // @function getScale(el: HTMLElement): Object
  // Computes the CSS scale currently applied on the element.
  // Returns an object with `x` and `y` members as horizontal and vertical scales respectively,
  // and `boundingClientRect` as the result of [`getBoundingClientRect()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect).
  function getScale(element) {
  	var rect = element.getBoundingClientRect(); // Read-only in old browsers.

  	return {
  		x: rect.width / element.offsetWidth || 1,
  		y: rect.height / element.offsetHeight || 1,
  		boundingClientRect: rect
  	};
  }

  var DomUtil = ({
    TRANSFORM: TRANSFORM,
    TRANSITION: TRANSITION,
    TRANSITION_END: TRANSITION_END,
    get: get,
    getStyle: getStyle,
    create: create$1,
    remove: remove,
    empty: empty,
    toFront: toFront,
    toBack: toBack,
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass,
    setClass: setClass,
    getClass: getClass,
    setOpacity: setOpacity,
    testProp: testProp,
    setTransform: setTransform,
    setPosition: setPosition,
    getPosition: getPosition,
    disableTextSelection: disableTextSelection,
    enableTextSelection: enableTextSelection,
    disableImageDrag: disableImageDrag,
    enableImageDrag: enableImageDrag,
    preventOutline: preventOutline,
    restoreOutline: restoreOutline,
    getSizedParentNode: getSizedParentNode,
    getScale: getScale
  });

  /*
   * @namespace DomEvent
   * Utility functions to work with the [DOM events](https://developer.mozilla.org/docs/Web/API/Event), used by Leaflet internally.
   */

  // Inspired by John Resig, Dean Edwards and YUI addEvent implementations.

  // @function on(el: HTMLElement, types: String, fn: Function, context?: Object): this
  // Adds a listener function (`fn`) to a particular DOM event type of the
  // element `el`. You can optionally specify the context of the listener
  // (object the `this` keyword will point to). You can also pass several
  // space-separated types (e.g. `'click dblclick'`).

  // @alternative
  // @function on(el: HTMLElement, eventMap: Object, context?: Object): this
  // Adds a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
  function on(obj, types, fn, context) {

  	if (typeof types === 'object') {
  		for (var type in types) {
  			addOne(obj, type, types[type], fn);
  		}
  	} else {
  		types = splitWords(types);

  		for (var i = 0, len = types.length; i < len; i++) {
  			addOne(obj, types[i], fn, context);
  		}
  	}

  	return this;
  }

  var eventsKey = '_leaflet_events';

  // @function off(el: HTMLElement, types: String, fn: Function, context?: Object): this
  // Removes a previously added listener function.
  // Note that if you passed a custom context to on, you must pass the same
  // context to `off` in order to remove the listener.

  // @alternative
  // @function off(el: HTMLElement, eventMap: Object, context?: Object): this
  // Removes a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
  function off(obj, types, fn, context) {

  	if (typeof types === 'object') {
  		for (var type in types) {
  			removeOne(obj, type, types[type], fn);
  		}
  	} else if (types) {
  		types = splitWords(types);

  		for (var i = 0, len = types.length; i < len; i++) {
  			removeOne(obj, types[i], fn, context);
  		}
  	} else {
  		for (var j in obj[eventsKey]) {
  			removeOne(obj, j, obj[eventsKey][j]);
  		}
  		delete obj[eventsKey];
  	}

  	return this;
  }

  function browserFiresNativeDblClick() {
  	// See https://github.com/w3c/pointerevents/issues/171
  	if (pointer) {
  		return !(edge || safari);
  	}
  }

  var mouseSubst = {
  	mouseenter: 'mouseover',
  	mouseleave: 'mouseout',
  	wheel: !('onwheel' in window) && 'mousewheel'
  };

  function addOne(obj, type, fn, context) {
  	var id = type + stamp(fn) + (context ? '_' + stamp(context) : '');

  	if (obj[eventsKey] && obj[eventsKey][id]) { return this; }

  	var handler = function (e) {
  		return fn.call(context || obj, e || window.event);
  	};

  	var originalHandler = handler;

  	if (pointer && type.indexOf('touch') === 0) {
  		// Needs DomEvent.Pointer.js
  		addPointerListener(obj, type, handler, id);

  	} else if (touch && (type === 'dblclick') && !browserFiresNativeDblClick()) {
  		addDoubleTapListener(obj, handler, id);

  	} else if ('addEventListener' in obj) {

  		if (type === 'touchstart' || type === 'touchmove' || type === 'wheel' ||  type === 'mousewheel') {
  			obj.addEventListener(mouseSubst[type] || type, handler, passiveEvents ? {passive: false} : false);

  		} else if (type === 'mouseenter' || type === 'mouseleave') {
  			handler = function (e) {
  				e = e || window.event;
  				if (isExternalTarget(obj, e)) {
  					originalHandler(e);
  				}
  			};
  			obj.addEventListener(mouseSubst[type], handler, false);

  		} else {
  			obj.addEventListener(type, originalHandler, false);
  		}

  	} else if ('attachEvent' in obj) {
  		obj.attachEvent('on' + type, handler);
  	}

  	obj[eventsKey] = obj[eventsKey] || {};
  	obj[eventsKey][id] = handler;
  }

  function removeOne(obj, type, fn, context) {

  	var id = type + stamp(fn) + (context ? '_' + stamp(context) : ''),
  	    handler = obj[eventsKey] && obj[eventsKey][id];

  	if (!handler) { return this; }

  	if (pointer && type.indexOf('touch') === 0) {
  		removePointerListener(obj, type, id);

  	} else if (touch && (type === 'dblclick') && !browserFiresNativeDblClick()) {
  		removeDoubleTapListener(obj, id);

  	} else if ('removeEventListener' in obj) {

  		obj.removeEventListener(mouseSubst[type] || type, handler, false);

  	} else if ('detachEvent' in obj) {
  		obj.detachEvent('on' + type, handler);
  	}

  	obj[eventsKey][id] = null;
  }

  // @function stopPropagation(ev: DOMEvent): this
  // Stop the given event from propagation to parent elements. Used inside the listener functions:
  // ```js
  // L.DomEvent.on(div, 'click', function (ev) {
  // 	L.DomEvent.stopPropagation(ev);
  // });
  // ```
  function stopPropagation(e) {

  	if (e.stopPropagation) {
  		e.stopPropagation();
  	} else if (e.originalEvent) {  // In case of Leaflet event.
  		e.originalEvent._stopped = true;
  	} else {
  		e.cancelBubble = true;
  	}
  	skipped(e);

  	return this;
  }

  // @function disableScrollPropagation(el: HTMLElement): this
  // Adds `stopPropagation` to the element's `'wheel'` events (plus browser variants).
  function disableScrollPropagation(el) {
  	addOne(el, 'wheel', stopPropagation);
  	return this;
  }

  // @function disableClickPropagation(el: HTMLElement): this
  // Adds `stopPropagation` to the element's `'click'`, `'doubleclick'`,
  // `'mousedown'` and `'touchstart'` events (plus browser variants).
  function disableClickPropagation(el) {
  	on(el, 'mousedown touchstart dblclick', stopPropagation);
  	addOne(el, 'click', fakeStop);
  	return this;
  }

  // @function preventDefault(ev: DOMEvent): this
  // Prevents the default action of the DOM Event `ev` from happening (such as
  // following a link in the href of the a element, or doing a POST request
  // with page reload when a `<form>` is submitted).
  // Use it inside listener functions.
  function preventDefault(e) {
  	if (e.preventDefault) {
  		e.preventDefault();
  	} else {
  		e.returnValue = false;
  	}
  	return this;
  }

  // @function stop(ev: DOMEvent): this
  // Does `stopPropagation` and `preventDefault` at the same time.
  function stop(e) {
  	preventDefault(e);
  	stopPropagation(e);
  	return this;
  }

  // @function getMousePosition(ev: DOMEvent, container?: HTMLElement): Point
  // Gets normalized mouse position from a DOM event relative to the
  // `container` (border excluded) or to the whole page if not specified.
  function getMousePosition(e, container) {
  	if (!container) {
  		return new Point(e.clientX, e.clientY);
  	}

  	var scale = getScale(container),
  	    offset = scale.boundingClientRect; // left and top  values are in page scale (like the event clientX/Y)

  	return new Point(
  		// offset.left/top values are in page scale (like clientX/Y),
  		// whereas clientLeft/Top (border width) values are the original values (before CSS scale applies).
  		(e.clientX - offset.left) / scale.x - container.clientLeft,
  		(e.clientY - offset.top) / scale.y - container.clientTop
  	);
  }

  // Chrome on Win scrolls double the pixels as in other platforms (see #4538),
  // and Firefox scrolls device pixels, not CSS pixels
  var wheelPxFactor =
  	(win && chrome) ? 2 * window.devicePixelRatio :
  	gecko ? window.devicePixelRatio : 1;

  // @function getWheelDelta(ev: DOMEvent): Number
  // Gets normalized wheel delta from a wheel DOM event, in vertical
  // pixels scrolled (negative if scrolling down).
  // Events from pointing devices without precise scrolling are mapped to
  // a best guess of 60 pixels.
  function getWheelDelta(e) {
  	return (edge) ? e.wheelDeltaY / 2 : // Don't trust window-geometry-based delta
  	       (e.deltaY && e.deltaMode === 0) ? -e.deltaY / wheelPxFactor : // Pixels
  	       (e.deltaY && e.deltaMode === 1) ? -e.deltaY * 20 : // Lines
  	       (e.deltaY && e.deltaMode === 2) ? -e.deltaY * 60 : // Pages
  	       (e.deltaX || e.deltaZ) ? 0 :	// Skip horizontal/depth wheel events
  	       e.wheelDelta ? (e.wheelDeltaY || e.wheelDelta) / 2 : // Legacy IE pixels
  	       (e.detail && Math.abs(e.detail) < 32765) ? -e.detail * 20 : // Legacy Moz lines
  	       e.detail ? e.detail / -32765 * 60 : // Legacy Moz pages
  	       0;
  }

  var skipEvents = {};

  function fakeStop(e) {
  	// fakes stopPropagation by setting a special event flag, checked/reset with skipped(e)
  	skipEvents[e.type] = true;
  }

  function skipped(e) {
  	var events = skipEvents[e.type];
  	// reset when checking, as it's only used in map container and propagates outside of the map
  	skipEvents[e.type] = false;
  	return events;
  }

  // check if element really left/entered the event target (for mouseenter/mouseleave)
  function isExternalTarget(el, e) {

  	var related = e.relatedTarget;

  	if (!related) { return true; }

  	try {
  		while (related && (related !== el)) {
  			related = related.parentNode;
  		}
  	} catch (err) {
  		return false;
  	}
  	return (related !== el);
  }

  var DomEvent = ({
    on: on,
    off: off,
    stopPropagation: stopPropagation,
    disableScrollPropagation: disableScrollPropagation,
    disableClickPropagation: disableClickPropagation,
    preventDefault: preventDefault,
    stop: stop,
    getMousePosition: getMousePosition,
    getWheelDelta: getWheelDelta,
    fakeStop: fakeStop,
    skipped: skipped,
    isExternalTarget: isExternalTarget,
    addListener: on,
    removeListener: off
  });

  /*
   * @class PosAnimation
   * @aka L.PosAnimation
   * @inherits Evented
   * Used internally for panning animations, utilizing CSS3 Transitions for modern browsers and a timer fallback for IE6-9.
   *
   * @example
   * ```js
   * var fx = new L.PosAnimation();
   * fx.run(el, [300, 500], 0.5);
   * ```
   *
   * @constructor L.PosAnimation()
   * Creates a `PosAnimation` object.
   *
   */

  var PosAnimation = Evented.extend({

  	// @method run(el: HTMLElement, newPos: Point, duration?: Number, easeLinearity?: Number)
  	// Run an animation of a given element to a new position, optionally setting
  	// duration in seconds (`0.25` by default) and easing linearity factor (3rd
  	// argument of the [cubic bezier curve](http://cubic-bezier.com/#0,0,.5,1),
  	// `0.5` by default).
  	run: function (el, newPos, duration, easeLinearity) {
  		this.stop();

  		this._el = el;
  		this._inProgress = true;
  		this._duration = duration || 0.25;
  		this._easeOutPower = 1 / Math.max(easeLinearity || 0.5, 0.2);

  		this._startPos = getPosition(el);
  		this._offset = newPos.subtract(this._startPos);
  		this._startTime = +new Date();

  		// @event start: Event
  		// Fired when the animation starts
  		this.fire('start');

  		this._animate();
  	},

  	// @method stop()
  	// Stops the animation (if currently running).
  	stop: function () {
  		if (!this._inProgress) { return; }

  		this._step(true);
  		this._complete();
  	},

  	_animate: function () {
  		// animation loop
  		this._animId = requestAnimFrame(this._animate, this);
  		this._step();
  	},

  	_step: function (round) {
  		var elapsed = (+new Date()) - this._startTime,
  		    duration = this._duration * 1000;

  		if (elapsed < duration) {
  			this._runFrame(this._easeOut(elapsed / duration), round);
  		} else {
  			this._runFrame(1);
  			this._complete();
  		}
  	},

  	_runFrame: function (progress, round) {
  		var pos = this._startPos.add(this._offset.multiplyBy(progress));
  		if (round) {
  			pos._round();
  		}
  		setPosition(this._el, pos);

  		// @event step: Event
  		// Fired continuously during the animation.
  		this.fire('step');
  	},

  	_complete: function () {
  		cancelAnimFrame(this._animId);

  		this._inProgress = false;
  		// @event end: Event
  		// Fired when the animation ends.
  		this.fire('end');
  	},

  	_easeOut: function (t) {
  		return 1 - Math.pow(1 - t, this._easeOutPower);
  	}
  });

  /*
   * @class Map
   * @aka L.Map
   * @inherits Evented
   *
   * The central class of the API — it is used to create a map on a page and manipulate it.
   *
   * @example
   *
   * ```js
   * // initialize the map on the "map" div with a given center and zoom
   * var map = L.map('map', {
   * 	center: [51.505, -0.09],
   * 	zoom: 13
   * });
   * ```
   *
   */

  var Map = Evented.extend({

  	options: {
  		// @section Map State Options
  		// @option crs: CRS = L.CRS.EPSG3857
  		// The [Coordinate Reference System](#crs) to use. Don't change this if you're not
  		// sure what it means.
  		crs: EPSG3857,

  		// @option center: LatLng = undefined
  		// Initial geographic center of the map
  		center: undefined,

  		// @option zoom: Number = undefined
  		// Initial map zoom level
  		zoom: undefined,

  		// @option minZoom: Number = *
  		// Minimum zoom level of the map.
  		// If not specified and at least one `GridLayer` or `TileLayer` is in the map,
  		// the lowest of their `minZoom` options will be used instead.
  		minZoom: undefined,

  		// @option maxZoom: Number = *
  		// Maximum zoom level of the map.
  		// If not specified and at least one `GridLayer` or `TileLayer` is in the map,
  		// the highest of their `maxZoom` options will be used instead.
  		maxZoom: undefined,

  		// @option layers: Layer[] = []
  		// Array of layers that will be added to the map initially
  		layers: [],

  		// @option maxBounds: LatLngBounds = null
  		// When this option is set, the map restricts the view to the given
  		// geographical bounds, bouncing the user back if the user tries to pan
  		// outside the view. To set the restriction dynamically, use
  		// [`setMaxBounds`](#map-setmaxbounds) method.
  		maxBounds: undefined,

  		// @option renderer: Renderer = *
  		// The default method for drawing vector layers on the map. `L.SVG`
  		// or `L.Canvas` by default depending on browser support.
  		renderer: undefined,


  		// @section Animation Options
  		// @option zoomAnimation: Boolean = true
  		// Whether the map zoom animation is enabled. By default it's enabled
  		// in all browsers that support CSS3 Transitions except Android.
  		zoomAnimation: true,

  		// @option zoomAnimationThreshold: Number = 4
  		// Won't animate zoom if the zoom difference exceeds this value.
  		zoomAnimationThreshold: 4,

  		// @option fadeAnimation: Boolean = true
  		// Whether the tile fade animation is enabled. By default it's enabled
  		// in all browsers that support CSS3 Transitions except Android.
  		fadeAnimation: true,

  		// @option markerZoomAnimation: Boolean = true
  		// Whether markers animate their zoom with the zoom animation, if disabled
  		// they will disappear for the length of the animation. By default it's
  		// enabled in all browsers that support CSS3 Transitions except Android.
  		markerZoomAnimation: true,

  		// @option transform3DLimit: Number = 2^23
  		// Defines the maximum size of a CSS translation transform. The default
  		// value should not be changed unless a web browser positions layers in
  		// the wrong place after doing a large `panBy`.
  		transform3DLimit: 8388608, // Precision limit of a 32-bit float

  		// @section Interaction Options
  		// @option zoomSnap: Number = 1
  		// Forces the map's zoom level to always be a multiple of this, particularly
  		// right after a [`fitBounds()`](#map-fitbounds) or a pinch-zoom.
  		// By default, the zoom level snaps to the nearest integer; lower values
  		// (e.g. `0.5` or `0.1`) allow for greater granularity. A value of `0`
  		// means the zoom level will not be snapped after `fitBounds` or a pinch-zoom.
  		zoomSnap: 1,

  		// @option zoomDelta: Number = 1
  		// Controls how much the map's zoom level will change after a
  		// [`zoomIn()`](#map-zoomin), [`zoomOut()`](#map-zoomout), pressing `+`
  		// or `-` on the keyboard, or using the [zoom controls](#control-zoom).
  		// Values smaller than `1` (e.g. `0.5`) allow for greater granularity.
  		zoomDelta: 1,

  		// @option trackResize: Boolean = true
  		// Whether the map automatically handles browser window resize to update itself.
  		trackResize: true
  	},

  	initialize: function (id, options) { // (HTMLElement or String, Object)
  		options = setOptions(this, options);

  		// Make sure to assign internal flags at the beginning,
  		// to avoid inconsistent state in some edge cases.
  		this._handlers = [];
  		this._layers = {};
  		this._zoomBoundLayers = {};
  		this._sizeChanged = true;

  		this._initContainer(id);
  		this._initLayout();

  		// hack for https://github.com/Leaflet/Leaflet/issues/1980
  		this._onResize = bind(this._onResize, this);

  		this._initEvents();

  		if (options.maxBounds) {
  			this.setMaxBounds(options.maxBounds);
  		}

  		if (options.zoom !== undefined) {
  			this._zoom = this._limitZoom(options.zoom);
  		}

  		if (options.center && options.zoom !== undefined) {
  			this.setView(toLatLng(options.center), options.zoom, {reset: true});
  		}

  		this.callInitHooks();

  		// don't animate on browsers without hardware-accelerated transitions or old Android/Opera
  		this._zoomAnimated = TRANSITION && any3d && !mobileOpera &&
  				this.options.zoomAnimation;

  		// zoom transitions run with the same duration for all layers, so if one of transitionend events
  		// happens after starting zoom animation (propagating to the map pane), we know that it ended globally
  		if (this._zoomAnimated) {
  			this._createAnimProxy();
  			on(this._proxy, TRANSITION_END, this._catchTransitionEnd, this);
  		}

  		this._addLayers(this.options.layers);
  	},


  	// @section Methods for modifying map state

  	// @method setView(center: LatLng, zoom: Number, options?: Zoom/pan options): this
  	// Sets the view of the map (geographical center and zoom) with the given
  	// animation options.
  	setView: function (center, zoom, options) {

  		zoom = zoom === undefined ? this._zoom : this._limitZoom(zoom);
  		center = this._limitCenter(toLatLng(center), zoom, this.options.maxBounds);
  		options = options || {};

  		this._stop();

  		if (this._loaded && !options.reset && options !== true) {

  			if (options.animate !== undefined) {
  				options.zoom = extend({animate: options.animate}, options.zoom);
  				options.pan = extend({animate: options.animate, duration: options.duration}, options.pan);
  			}

  			// try animating pan or zoom
  			var moved = (this._zoom !== zoom) ?
  				this._tryAnimatedZoom && this._tryAnimatedZoom(center, zoom, options.zoom) :
  				this._tryAnimatedPan(center, options.pan);

  			if (moved) {
  				// prevent resize handler call, the view will refresh after animation anyway
  				clearTimeout(this._sizeTimer);
  				return this;
  			}
  		}

  		// animation didn't start, just reset the map view
  		this._resetView(center, zoom);

  		return this;
  	},

  	// @method setZoom(zoom: Number, options?: Zoom/pan options): this
  	// Sets the zoom of the map.
  	setZoom: function (zoom, options) {
  		if (!this._loaded) {
  			this._zoom = zoom;
  			return this;
  		}
  		return this.setView(this.getCenter(), zoom, {zoom: options});
  	},

  	// @method zoomIn(delta?: Number, options?: Zoom options): this
  	// Increases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
  	zoomIn: function (delta, options) {
  		delta = delta || (any3d ? this.options.zoomDelta : 1);
  		return this.setZoom(this._zoom + delta, options);
  	},

  	// @method zoomOut(delta?: Number, options?: Zoom options): this
  	// Decreases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
  	zoomOut: function (delta, options) {
  		delta = delta || (any3d ? this.options.zoomDelta : 1);
  		return this.setZoom(this._zoom - delta, options);
  	},

  	// @method setZoomAround(latlng: LatLng, zoom: Number, options: Zoom options): this
  	// Zooms the map while keeping a specified geographical point on the map
  	// stationary (e.g. used internally for scroll zoom and double-click zoom).
  	// @alternative
  	// @method setZoomAround(offset: Point, zoom: Number, options: Zoom options): this
  	// Zooms the map while keeping a specified pixel on the map (relative to the top-left corner) stationary.
  	setZoomAround: function (latlng, zoom, options) {
  		var scale = this.getZoomScale(zoom),
  		    viewHalf = this.getSize().divideBy(2),
  		    containerPoint = latlng instanceof Point ? latlng : this.latLngToContainerPoint(latlng),

  		    centerOffset = containerPoint.subtract(viewHalf).multiplyBy(1 - 1 / scale),
  		    newCenter = this.containerPointToLatLng(viewHalf.add(centerOffset));

  		return this.setView(newCenter, zoom, {zoom: options});
  	},

  	_getBoundsCenterZoom: function (bounds, options) {

  		options = options || {};
  		bounds = bounds.getBounds ? bounds.getBounds() : toLatLngBounds(bounds);

  		var paddingTL = toPoint(options.paddingTopLeft || options.padding || [0, 0]),
  		    paddingBR = toPoint(options.paddingBottomRight || options.padding || [0, 0]),

  		    zoom = this.getBoundsZoom(bounds, false, paddingTL.add(paddingBR));

  		zoom = (typeof options.maxZoom === 'number') ? Math.min(options.maxZoom, zoom) : zoom;

  		if (zoom === Infinity) {
  			return {
  				center: bounds.getCenter(),
  				zoom: zoom
  			};
  		}

  		var paddingOffset = paddingBR.subtract(paddingTL).divideBy(2),

  		    swPoint = this.project(bounds.getSouthWest(), zoom),
  		    nePoint = this.project(bounds.getNorthEast(), zoom),
  		    center = this.unproject(swPoint.add(nePoint).divideBy(2).add(paddingOffset), zoom);

  		return {
  			center: center,
  			zoom: zoom
  		};
  	},

  	// @method fitBounds(bounds: LatLngBounds, options?: fitBounds options): this
  	// Sets a map view that contains the given geographical bounds with the
  	// maximum zoom level possible.
  	fitBounds: function (bounds, options) {

  		bounds = toLatLngBounds(bounds);

  		if (!bounds.isValid()) {
  			throw new Error('Bounds are not valid.');
  		}

  		var target = this._getBoundsCenterZoom(bounds, options);
  		return this.setView(target.center, target.zoom, options);
  	},

  	// @method fitWorld(options?: fitBounds options): this
  	// Sets a map view that mostly contains the whole world with the maximum
  	// zoom level possible.
  	fitWorld: function (options) {
  		return this.fitBounds([[-90, -180], [90, 180]], options);
  	},

  	// @method panTo(latlng: LatLng, options?: Pan options): this
  	// Pans the map to a given center.
  	panTo: function (center, options) { // (LatLng)
  		return this.setView(center, this._zoom, {pan: options});
  	},

  	// @method panBy(offset: Point, options?: Pan options): this
  	// Pans the map by a given number of pixels (animated).
  	panBy: function (offset, options) {
  		offset = toPoint(offset).round();
  		options = options || {};

  		if (!offset.x && !offset.y) {
  			return this.fire('moveend');
  		}
  		// If we pan too far, Chrome gets issues with tiles
  		// and makes them disappear or appear in the wrong place (slightly offset) #2602
  		if (options.animate !== true && !this.getSize().contains(offset)) {
  			this._resetView(this.unproject(this.project(this.getCenter()).add(offset)), this.getZoom());
  			return this;
  		}

  		if (!this._panAnim) {
  			this._panAnim = new PosAnimation();

  			this._panAnim.on({
  				'step': this._onPanTransitionStep,
  				'end': this._onPanTransitionEnd
  			}, this);
  		}

  		// don't fire movestart if animating inertia
  		if (!options.noMoveStart) {
  			this.fire('movestart');
  		}

  		// animate pan unless animate: false specified
  		if (options.animate !== false) {
  			addClass(this._mapPane, 'leaflet-pan-anim');

  			var newPos = this._getMapPanePos().subtract(offset).round();
  			this._panAnim.run(this._mapPane, newPos, options.duration || 0.25, options.easeLinearity);
  		} else {
  			this._rawPanBy(offset);
  			this.fire('move').fire('moveend');
  		}

  		return this;
  	},

  	// @method flyTo(latlng: LatLng, zoom?: Number, options?: Zoom/pan options): this
  	// Sets the view of the map (geographical center and zoom) performing a smooth
  	// pan-zoom animation.
  	flyTo: function (targetCenter, targetZoom, options) {

  		options = options || {};
  		if (options.animate === false || !any3d) {
  			return this.setView(targetCenter, targetZoom, options);
  		}

  		this._stop();

  		var from = this.project(this.getCenter()),
  		    to = this.project(targetCenter),
  		    size = this.getSize(),
  		    startZoom = this._zoom;

  		targetCenter = toLatLng(targetCenter);
  		targetZoom = targetZoom === undefined ? startZoom : targetZoom;

  		var w0 = Math.max(size.x, size.y),
  		    w1 = w0 * this.getZoomScale(startZoom, targetZoom),
  		    u1 = (to.distanceTo(from)) || 1,
  		    rho = 1.42,
  		    rho2 = rho * rho;

  		function r(i) {
  			var s1 = i ? -1 : 1,
  			    s2 = i ? w1 : w0,
  			    t1 = w1 * w1 - w0 * w0 + s1 * rho2 * rho2 * u1 * u1,
  			    b1 = 2 * s2 * rho2 * u1,
  			    b = t1 / b1,
  			    sq = Math.sqrt(b * b + 1) - b;

  			    // workaround for floating point precision bug when sq = 0, log = -Infinite,
  			    // thus triggering an infinite loop in flyTo
  			    var log = sq < 0.000000001 ? -18 : Math.log(sq);

  			return log;
  		}

  		function sinh(n) { return (Math.exp(n) - Math.exp(-n)) / 2; }
  		function cosh(n) { return (Math.exp(n) + Math.exp(-n)) / 2; }
  		function tanh(n) { return sinh(n) / cosh(n); }

  		var r0 = r(0);

  		function w(s) { return w0 * (cosh(r0) / cosh(r0 + rho * s)); }
  		function u(s) { return w0 * (cosh(r0) * tanh(r0 + rho * s) - sinh(r0)) / rho2; }

  		function easeOut(t) { return 1 - Math.pow(1 - t, 1.5); }

  		var start = Date.now(),
  		    S = (r(1) - r0) / rho,
  		    duration = options.duration ? 1000 * options.duration : 1000 * S * 0.8;

  		function frame() {
  			var t = (Date.now() - start) / duration,
  			    s = easeOut(t) * S;

  			if (t <= 1) {
  				this._flyToFrame = requestAnimFrame(frame, this);

  				this._move(
  					this.unproject(from.add(to.subtract(from).multiplyBy(u(s) / u1)), startZoom),
  					this.getScaleZoom(w0 / w(s), startZoom),
  					{flyTo: true});

  			} else {
  				this
  					._move(targetCenter, targetZoom)
  					._moveEnd(true);
  			}
  		}

  		this._moveStart(true, options.noMoveStart);

  		frame.call(this);
  		return this;
  	},

  	// @method flyToBounds(bounds: LatLngBounds, options?: fitBounds options): this
  	// Sets the view of the map with a smooth animation like [`flyTo`](#map-flyto),
  	// but takes a bounds parameter like [`fitBounds`](#map-fitbounds).
  	flyToBounds: function (bounds, options) {
  		var target = this._getBoundsCenterZoom(bounds, options);
  		return this.flyTo(target.center, target.zoom, options);
  	},

  	// @method setMaxBounds(bounds: LatLngBounds): this
  	// Restricts the map view to the given bounds (see the [maxBounds](#map-maxbounds) option).
  	setMaxBounds: function (bounds) {
  		bounds = toLatLngBounds(bounds);

  		if (!bounds.isValid()) {
  			this.options.maxBounds = null;
  			return this.off('moveend', this._panInsideMaxBounds);
  		} else if (this.options.maxBounds) {
  			this.off('moveend', this._panInsideMaxBounds);
  		}

  		this.options.maxBounds = bounds;

  		if (this._loaded) {
  			this._panInsideMaxBounds();
  		}

  		return this.on('moveend', this._panInsideMaxBounds);
  	},

  	// @method setMinZoom(zoom: Number): this
  	// Sets the lower limit for the available zoom levels (see the [minZoom](#map-minzoom) option).
  	setMinZoom: function (zoom) {
  		var oldZoom = this.options.minZoom;
  		this.options.minZoom = zoom;

  		if (this._loaded && oldZoom !== zoom) {
  			this.fire('zoomlevelschange');

  			if (this.getZoom() < this.options.minZoom) {
  				return this.setZoom(zoom);
  			}
  		}

  		return this;
  	},

  	// @method setMaxZoom(zoom: Number): this
  	// Sets the upper limit for the available zoom levels (see the [maxZoom](#map-maxzoom) option).
  	setMaxZoom: function (zoom) {
  		var oldZoom = this.options.maxZoom;
  		this.options.maxZoom = zoom;

  		if (this._loaded && oldZoom !== zoom) {
  			this.fire('zoomlevelschange');

  			if (this.getZoom() > this.options.maxZoom) {
  				return this.setZoom(zoom);
  			}
  		}

  		return this;
  	},

  	// @method panInsideBounds(bounds: LatLngBounds, options?: Pan options): this
  	// Pans the map to the closest view that would lie inside the given bounds (if it's not already), controlling the animation using the options specific, if any.
  	panInsideBounds: function (bounds, options) {
  		this._enforcingBounds = true;
  		var center = this.getCenter(),
  		    newCenter = this._limitCenter(center, this._zoom, toLatLngBounds(bounds));

  		if (!center.equals(newCenter)) {
  			this.panTo(newCenter, options);
  		}

  		this._enforcingBounds = false;
  		return this;
  	},

  	// @method panInside(latlng: LatLng, options?: options): this
  	// Pans the map the minimum amount to make the `latlng` visible. Use
  	// `padding`, `paddingTopLeft` and `paddingTopRight` options to fit
  	// the display to more restricted bounds, like [`fitBounds`](#map-fitbounds).
  	// If `latlng` is already within the (optionally padded) display bounds,
  	// the map will not be panned.
  	panInside: function (latlng, options) {
  		options = options || {};

  		var paddingTL = toPoint(options.paddingTopLeft || options.padding || [0, 0]),
  		    paddingBR = toPoint(options.paddingBottomRight || options.padding || [0, 0]),
  		    center = this.getCenter(),
  		    pixelCenter = this.project(center),
  		    pixelPoint = this.project(latlng),
  		    pixelBounds = this.getPixelBounds(),
  		    halfPixelBounds = pixelBounds.getSize().divideBy(2),
  		    paddedBounds = toBounds([pixelBounds.min.add(paddingTL), pixelBounds.max.subtract(paddingBR)]);

  		if (!paddedBounds.contains(pixelPoint)) {
  			this._enforcingBounds = true;
  			var diff = pixelCenter.subtract(pixelPoint),
  			    newCenter = toPoint(pixelPoint.x + diff.x, pixelPoint.y + diff.y);

  			if (pixelPoint.x < paddedBounds.min.x || pixelPoint.x > paddedBounds.max.x) {
  				newCenter.x = pixelCenter.x - diff.x;
  				if (diff.x > 0) {
  					newCenter.x += halfPixelBounds.x - paddingTL.x;
  				} else {
  					newCenter.x -= halfPixelBounds.x - paddingBR.x;
  				}
  			}
  			if (pixelPoint.y < paddedBounds.min.y || pixelPoint.y > paddedBounds.max.y) {
  				newCenter.y = pixelCenter.y - diff.y;
  				if (diff.y > 0) {
  					newCenter.y += halfPixelBounds.y - paddingTL.y;
  				} else {
  					newCenter.y -= halfPixelBounds.y - paddingBR.y;
  				}
  			}
  			this.panTo(this.unproject(newCenter), options);
  			this._enforcingBounds = false;
  		}
  		return this;
  	},

  	// @method invalidateSize(options: Zoom/pan options): this
  	// Checks if the map container size changed and updates the map if so —
  	// call it after you've changed the map size dynamically, also animating
  	// pan by default. If `options.pan` is `false`, panning will not occur.
  	// If `options.debounceMoveend` is `true`, it will delay `moveend` event so
  	// that it doesn't happen often even if the method is called many
  	// times in a row.

  	// @alternative
  	// @method invalidateSize(animate: Boolean): this
  	// Checks if the map container size changed and updates the map if so —
  	// call it after you've changed the map size dynamically, also animating
  	// pan by default.
  	invalidateSize: function (options) {
  		if (!this._loaded) { return this; }

  		options = extend({
  			animate: false,
  			pan: true
  		}, options === true ? {animate: true} : options);

  		var oldSize = this.getSize();
  		this._sizeChanged = true;
  		this._lastCenter = null;

  		var newSize = this.getSize(),
  		    oldCenter = oldSize.divideBy(2).round(),
  		    newCenter = newSize.divideBy(2).round(),
  		    offset = oldCenter.subtract(newCenter);

  		if (!offset.x && !offset.y) { return this; }

  		if (options.animate && options.pan) {
  			this.panBy(offset);

  		} else {
  			if (options.pan) {
  				this._rawPanBy(offset);
  			}

  			this.fire('move');

  			if (options.debounceMoveend) {
  				clearTimeout(this._sizeTimer);
  				this._sizeTimer = setTimeout(bind(this.fire, this, 'moveend'), 200);
  			} else {
  				this.fire('moveend');
  			}
  		}

  		// @section Map state change events
  		// @event resize: ResizeEvent
  		// Fired when the map is resized.
  		return this.fire('resize', {
  			oldSize: oldSize,
  			newSize: newSize
  		});
  	},

  	// @section Methods for modifying map state
  	// @method stop(): this
  	// Stops the currently running `panTo` or `flyTo` animation, if any.
  	stop: function () {
  		this.setZoom(this._limitZoom(this._zoom));
  		if (!this.options.zoomSnap) {
  			this.fire('viewreset');
  		}
  		return this._stop();
  	},

  	// @section Geolocation methods
  	// @method locate(options?: Locate options): this
  	// Tries to locate the user using the Geolocation API, firing a [`locationfound`](#map-locationfound)
  	// event with location data on success or a [`locationerror`](#map-locationerror) event on failure,
  	// and optionally sets the map view to the user's location with respect to
  	// detection accuracy (or to the world view if geolocation failed).
  	// Note that, if your page doesn't use HTTPS, this method will fail in
  	// modern browsers ([Chrome 50 and newer](https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins))
  	// See `Locate options` for more details.
  	locate: function (options) {

  		options = this._locateOptions = extend({
  			timeout: 10000,
  			watch: false
  			// setView: false
  			// maxZoom: <Number>
  			// maximumAge: 0
  			// enableHighAccuracy: false
  		}, options);

  		if (!('geolocation' in navigator)) {
  			this._handleGeolocationError({
  				code: 0,
  				message: 'Geolocation not supported.'
  			});
  			return this;
  		}

  		var onResponse = bind(this._handleGeolocationResponse, this),
  		    onError = bind(this._handleGeolocationError, this);

  		if (options.watch) {
  			this._locationWatchId =
  			        navigator.geolocation.watchPosition(onResponse, onError, options);
  		} else {
  			navigator.geolocation.getCurrentPosition(onResponse, onError, options);
  		}
  		return this;
  	},

  	// @method stopLocate(): this
  	// Stops watching location previously initiated by `map.locate({watch: true})`
  	// and aborts resetting the map view if map.locate was called with
  	// `{setView: true}`.
  	stopLocate: function () {
  		if (navigator.geolocation && navigator.geolocation.clearWatch) {
  			navigator.geolocation.clearWatch(this._locationWatchId);
  		}
  		if (this._locateOptions) {
  			this._locateOptions.setView = false;
  		}
  		return this;
  	},

  	_handleGeolocationError: function (error) {
  		var c = error.code,
  		    message = error.message ||
  		            (c === 1 ? 'permission denied' :
  		            (c === 2 ? 'position unavailable' : 'timeout'));

  		if (this._locateOptions.setView && !this._loaded) {
  			this.fitWorld();
  		}

  		// @section Location events
  		// @event locationerror: ErrorEvent
  		// Fired when geolocation (using the [`locate`](#map-locate) method) failed.
  		this.fire('locationerror', {
  			code: c,
  			message: 'Geolocation error: ' + message + '.'
  		});
  	},

  	_handleGeolocationResponse: function (pos) {
  		var lat = pos.coords.latitude,
  		    lng = pos.coords.longitude,
  		    latlng = new LatLng(lat, lng),
  		    bounds = latlng.toBounds(pos.coords.accuracy * 2),
  		    options = this._locateOptions;

  		if (options.setView) {
  			var zoom = this.getBoundsZoom(bounds);
  			this.setView(latlng, options.maxZoom ? Math.min(zoom, options.maxZoom) : zoom);
  		}

  		var data = {
  			latlng: latlng,
  			bounds: bounds,
  			timestamp: pos.timestamp
  		};

  		for (var i in pos.coords) {
  			if (typeof pos.coords[i] === 'number') {
  				data[i] = pos.coords[i];
  			}
  		}

  		// @event locationfound: LocationEvent
  		// Fired when geolocation (using the [`locate`](#map-locate) method)
  		// went successfully.
  		this.fire('locationfound', data);
  	},

  	// TODO Appropriate docs section?
  	// @section Other Methods
  	// @method addHandler(name: String, HandlerClass: Function): this
  	// Adds a new `Handler` to the map, given its name and constructor function.
  	addHandler: function (name, HandlerClass) {
  		if (!HandlerClass) { return this; }

  		var handler = this[name] = new HandlerClass(this);

  		this._handlers.push(handler);

  		if (this.options[name]) {
  			handler.enable();
  		}

  		return this;
  	},

  	// @method remove(): this
  	// Destroys the map and clears all related event listeners.
  	remove: function () {

  		this._initEvents(true);
  		this.off('moveend', this._panInsideMaxBounds);

  		if (this._containerId !== this._container._leaflet_id) {
  			throw new Error('Map container is being reused by another instance');
  		}

  		try {
  			// throws error in IE6-8
  			delete this._container._leaflet_id;
  			delete this._containerId;
  		} catch (e) {
  			/*eslint-disable */
  			this._container._leaflet_id = undefined;
  			/* eslint-enable */
  			this._containerId = undefined;
  		}

  		if (this._locationWatchId !== undefined) {
  			this.stopLocate();
  		}

  		this._stop();

  		remove(this._mapPane);

  		if (this._clearControlPos) {
  			this._clearControlPos();
  		}
  		if (this._resizeRequest) {
  			cancelAnimFrame(this._resizeRequest);
  			this._resizeRequest = null;
  		}

  		this._clearHandlers();

  		if (this._loaded) {
  			// @section Map state change events
  			// @event unload: Event
  			// Fired when the map is destroyed with [remove](#map-remove) method.
  			this.fire('unload');
  		}

  		var i;
  		for (i in this._layers) {
  			this._layers[i].remove();
  		}
  		for (i in this._panes) {
  			remove(this._panes[i]);
  		}

  		this._layers = [];
  		this._panes = [];
  		delete this._mapPane;
  		delete this._renderer;

  		return this;
  	},

  	// @section Other Methods
  	// @method createPane(name: String, container?: HTMLElement): HTMLElement
  	// Creates a new [map pane](#map-pane) with the given name if it doesn't exist already,
  	// then returns it. The pane is created as a child of `container`, or
  	// as a child of the main map pane if not set.
  	createPane: function (name, container) {
  		var className = 'leaflet-pane' + (name ? ' leaflet-' + name.replace('Pane', '') + '-pane' : ''),
  		    pane = create$1('div', className, container || this._mapPane);

  		if (name) {
  			this._panes[name] = pane;
  		}
  		return pane;
  	},

  	// @section Methods for Getting Map State

  	// @method getCenter(): LatLng
  	// Returns the geographical center of the map view
  	getCenter: function () {
  		this._checkIfLoaded();

  		if (this._lastCenter && !this._moved()) {
  			return this._lastCenter;
  		}
  		return this.layerPointToLatLng(this._getCenterLayerPoint());
  	},

  	// @method getZoom(): Number
  	// Returns the current zoom level of the map view
  	getZoom: function () {
  		return this._zoom;
  	},

  	// @method getBounds(): LatLngBounds
  	// Returns the geographical bounds visible in the current map view
  	getBounds: function () {
  		var bounds = this.getPixelBounds(),
  		    sw = this.unproject(bounds.getBottomLeft()),
  		    ne = this.unproject(bounds.getTopRight());

  		return new LatLngBounds(sw, ne);
  	},

  	// @method getMinZoom(): Number
  	// Returns the minimum zoom level of the map (if set in the `minZoom` option of the map or of any layers), or `0` by default.
  	getMinZoom: function () {
  		return this.options.minZoom === undefined ? this._layersMinZoom || 0 : this.options.minZoom;
  	},

  	// @method getMaxZoom(): Number
  	// Returns the maximum zoom level of the map (if set in the `maxZoom` option of the map or of any layers).
  	getMaxZoom: function () {
  		return this.options.maxZoom === undefined ?
  			(this._layersMaxZoom === undefined ? Infinity : this._layersMaxZoom) :
  			this.options.maxZoom;
  	},

  	// @method getBoundsZoom(bounds: LatLngBounds, inside?: Boolean, padding?: Point): Number
  	// Returns the maximum zoom level on which the given bounds fit to the map
  	// view in its entirety. If `inside` (optional) is set to `true`, the method
  	// instead returns the minimum zoom level on which the map view fits into
  	// the given bounds in its entirety.
  	getBoundsZoom: function (bounds, inside, padding) { // (LatLngBounds[, Boolean, Point]) -> Number
  		bounds = toLatLngBounds(bounds);
  		padding = toPoint(padding || [0, 0]);

  		var zoom = this.getZoom() || 0,
  		    min = this.getMinZoom(),
  		    max = this.getMaxZoom(),
  		    nw = bounds.getNorthWest(),
  		    se = bounds.getSouthEast(),
  		    size = this.getSize().subtract(padding),
  		    boundsSize = toBounds(this.project(se, zoom), this.project(nw, zoom)).getSize(),
  		    snap = any3d ? this.options.zoomSnap : 1,
  		    scalex = size.x / boundsSize.x,
  		    scaley = size.y / boundsSize.y,
  		    scale = inside ? Math.max(scalex, scaley) : Math.min(scalex, scaley);

  		zoom = this.getScaleZoom(scale, zoom);

  		if (snap) {
  			zoom = Math.round(zoom / (snap / 100)) * (snap / 100); // don't jump if within 1% of a snap level
  			zoom = inside ? Math.ceil(zoom / snap) * snap : Math.floor(zoom / snap) * snap;
  		}

  		return Math.max(min, Math.min(max, zoom));
  	},

  	// @method getSize(): Point
  	// Returns the current size of the map container (in pixels).
  	getSize: function () {
  		if (!this._size || this._sizeChanged) {
  			this._size = new Point(
  				this._container.clientWidth || 0,
  				this._container.clientHeight || 0);

  			this._sizeChanged = false;
  		}
  		return this._size.clone();
  	},

  	// @method getPixelBounds(): Bounds
  	// Returns the bounds of the current map view in projected pixel
  	// coordinates (sometimes useful in layer and overlay implementations).
  	getPixelBounds: function (center, zoom) {
  		var topLeftPoint = this._getTopLeftPoint(center, zoom);
  		return new Bounds(topLeftPoint, topLeftPoint.add(this.getSize()));
  	},

  	// TODO: Check semantics - isn't the pixel origin the 0,0 coord relative to
  	// the map pane? "left point of the map layer" can be confusing, specially
  	// since there can be negative offsets.
  	// @method getPixelOrigin(): Point
  	// Returns the projected pixel coordinates of the top left point of
  	// the map layer (useful in custom layer and overlay implementations).
  	getPixelOrigin: function () {
  		this._checkIfLoaded();
  		return this._pixelOrigin;
  	},

  	// @method getPixelWorldBounds(zoom?: Number): Bounds
  	// Returns the world's bounds in pixel coordinates for zoom level `zoom`.
  	// If `zoom` is omitted, the map's current zoom level is used.
  	getPixelWorldBounds: function (zoom) {
  		return this.options.crs.getProjectedBounds(zoom === undefined ? this.getZoom() : zoom);
  	},

  	// @section Other Methods

  	// @method getPane(pane: String|HTMLElement): HTMLElement
  	// Returns a [map pane](#map-pane), given its name or its HTML element (its identity).
  	getPane: function (pane) {
  		return typeof pane === 'string' ? this._panes[pane] : pane;
  	},

  	// @method getPanes(): Object
  	// Returns a plain object containing the names of all [panes](#map-pane) as keys and
  	// the panes as values.
  	getPanes: function () {
  		return this._panes;
  	},

  	// @method getContainer: HTMLElement
  	// Returns the HTML element that contains the map.
  	getContainer: function () {
  		return this._container;
  	},


  	// @section Conversion Methods

  	// @method getZoomScale(toZoom: Number, fromZoom: Number): Number
  	// Returns the scale factor to be applied to a map transition from zoom level
  	// `fromZoom` to `toZoom`. Used internally to help with zoom animations.
  	getZoomScale: function (toZoom, fromZoom) {
  		// TODO replace with universal implementation after refactoring projections
  		var crs = this.options.crs;
  		fromZoom = fromZoom === undefined ? this._zoom : fromZoom;
  		return crs.scale(toZoom) / crs.scale(fromZoom);
  	},

  	// @method getScaleZoom(scale: Number, fromZoom: Number): Number
  	// Returns the zoom level that the map would end up at, if it is at `fromZoom`
  	// level and everything is scaled by a factor of `scale`. Inverse of
  	// [`getZoomScale`](#map-getZoomScale).
  	getScaleZoom: function (scale, fromZoom) {
  		var crs = this.options.crs;
  		fromZoom = fromZoom === undefined ? this._zoom : fromZoom;
  		var zoom = crs.zoom(scale * crs.scale(fromZoom));
  		return isNaN(zoom) ? Infinity : zoom;
  	},

  	// @method project(latlng: LatLng, zoom: Number): Point
  	// Projects a geographical coordinate `LatLng` according to the projection
  	// of the map's CRS, then scales it according to `zoom` and the CRS's
  	// `Transformation`. The result is pixel coordinate relative to
  	// the CRS origin.
  	project: function (latlng, zoom) {
  		zoom = zoom === undefined ? this._zoom : zoom;
  		return this.options.crs.latLngToPoint(toLatLng(latlng), zoom);
  	},

  	// @method unproject(point: Point, zoom: Number): LatLng
  	// Inverse of [`project`](#map-project).
  	unproject: function (point, zoom) {
  		zoom = zoom === undefined ? this._zoom : zoom;
  		return this.options.crs.pointToLatLng(toPoint(point), zoom);
  	},

  	// @method layerPointToLatLng(point: Point): LatLng
  	// Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
  	// returns the corresponding geographical coordinate (for the current zoom level).
  	layerPointToLatLng: function (point) {
  		var projectedPoint = toPoint(point).add(this.getPixelOrigin());
  		return this.unproject(projectedPoint);
  	},

  	// @method latLngToLayerPoint(latlng: LatLng): Point
  	// Given a geographical coordinate, returns the corresponding pixel coordinate
  	// relative to the [origin pixel](#map-getpixelorigin).
  	latLngToLayerPoint: function (latlng) {
  		var projectedPoint = this.project(toLatLng(latlng))._round();
  		return projectedPoint._subtract(this.getPixelOrigin());
  	},

  	// @method wrapLatLng(latlng: LatLng): LatLng
  	// Returns a `LatLng` where `lat` and `lng` has been wrapped according to the
  	// map's CRS's `wrapLat` and `wrapLng` properties, if they are outside the
  	// CRS's bounds.
  	// By default this means longitude is wrapped around the dateline so its
  	// value is between -180 and +180 degrees.
  	wrapLatLng: function (latlng) {
  		return this.options.crs.wrapLatLng(toLatLng(latlng));
  	},

  	// @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
  	// Returns a `LatLngBounds` with the same size as the given one, ensuring that
  	// its center is within the CRS's bounds.
  	// By default this means the center longitude is wrapped around the dateline so its
  	// value is between -180 and +180 degrees, and the majority of the bounds
  	// overlaps the CRS's bounds.
  	wrapLatLngBounds: function (latlng) {
  		return this.options.crs.wrapLatLngBounds(toLatLngBounds(latlng));
  	},

  	// @method distance(latlng1: LatLng, latlng2: LatLng): Number
  	// Returns the distance between two geographical coordinates according to
  	// the map's CRS. By default this measures distance in meters.
  	distance: function (latlng1, latlng2) {
  		return this.options.crs.distance(toLatLng(latlng1), toLatLng(latlng2));
  	},

  	// @method containerPointToLayerPoint(point: Point): Point
  	// Given a pixel coordinate relative to the map container, returns the corresponding
  	// pixel coordinate relative to the [origin pixel](#map-getpixelorigin).
  	containerPointToLayerPoint: function (point) { // (Point)
  		return toPoint(point).subtract(this._getMapPanePos());
  	},

  	// @method layerPointToContainerPoint(point: Point): Point
  	// Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
  	// returns the corresponding pixel coordinate relative to the map container.
  	layerPointToContainerPoint: function (point) { // (Point)
  		return toPoint(point).add(this._getMapPanePos());
  	},

  	// @method containerPointToLatLng(point: Point): LatLng
  	// Given a pixel coordinate relative to the map container, returns
  	// the corresponding geographical coordinate (for the current zoom level).
  	containerPointToLatLng: function (point) {
  		var layerPoint = this.containerPointToLayerPoint(toPoint(point));
  		return this.layerPointToLatLng(layerPoint);
  	},

  	// @method latLngToContainerPoint(latlng: LatLng): Point
  	// Given a geographical coordinate, returns the corresponding pixel coordinate
  	// relative to the map container.
  	latLngToContainerPoint: function (latlng) {
  		return this.layerPointToContainerPoint(this.latLngToLayerPoint(toLatLng(latlng)));
  	},

  	// @method mouseEventToContainerPoint(ev: MouseEvent): Point
  	// Given a MouseEvent object, returns the pixel coordinate relative to the
  	// map container where the event took place.
  	mouseEventToContainerPoint: function (e) {
  		return getMousePosition(e, this._container);
  	},

  	// @method mouseEventToLayerPoint(ev: MouseEvent): Point
  	// Given a MouseEvent object, returns the pixel coordinate relative to
  	// the [origin pixel](#map-getpixelorigin) where the event took place.
  	mouseEventToLayerPoint: function (e) {
  		return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(e));
  	},

  	// @method mouseEventToLatLng(ev: MouseEvent): LatLng
  	// Given a MouseEvent object, returns geographical coordinate where the
  	// event took place.
  	mouseEventToLatLng: function (e) { // (MouseEvent)
  		return this.layerPointToLatLng(this.mouseEventToLayerPoint(e));
  	},


  	// map initialization methods

  	_initContainer: function (id) {
  		var container = this._container = get(id);

  		if (!container) {
  			throw new Error('Map container not found.');
  		} else if (container._leaflet_id) {
  			throw new Error('Map container is already initialized.');
  		}

  		on(container, 'scroll', this._onScroll, this);
  		this._containerId = stamp(container);
  	},

  	_initLayout: function () {
  		var container = this._container;

  		this._fadeAnimated = this.options.fadeAnimation && any3d;

  		addClass(container, 'leaflet-container' +
  			(touch ? ' leaflet-touch' : '') +
  			(retina ? ' leaflet-retina' : '') +
  			(ielt9 ? ' leaflet-oldie' : '') +
  			(safari ? ' leaflet-safari' : '') +
  			(this._fadeAnimated ? ' leaflet-fade-anim' : ''));

  		var position = getStyle(container, 'position');

  		if (position !== 'absolute' && position !== 'relative' && position !== 'fixed') {
  			container.style.position = 'relative';
  		}

  		this._initPanes();

  		if (this._initControlPos) {
  			this._initControlPos();
  		}
  	},

  	_initPanes: function () {
  		var panes = this._panes = {};
  		this._paneRenderers = {};

  		// @section
  		//
  		// Panes are DOM elements used to control the ordering of layers on the map. You
  		// can access panes with [`map.getPane`](#map-getpane) or
  		// [`map.getPanes`](#map-getpanes) methods. New panes can be created with the
  		// [`map.createPane`](#map-createpane) method.
  		//
  		// Every map has the following default panes that differ only in zIndex.
  		//
  		// @pane mapPane: HTMLElement = 'auto'
  		// Pane that contains all other map panes

  		this._mapPane = this.createPane('mapPane', this._container);
  		setPosition(this._mapPane, new Point(0, 0));

  		// @pane tilePane: HTMLElement = 200
  		// Pane for `GridLayer`s and `TileLayer`s
  		this.createPane('tilePane');
  		// @pane overlayPane: HTMLElement = 400
  		// Pane for overlay shadows (e.g. `Marker` shadows)
  		this.createPane('shadowPane');
  		// @pane shadowPane: HTMLElement = 500
  		// Pane for vectors (`Path`s, like `Polyline`s and `Polygon`s), `ImageOverlay`s and `VideoOverlay`s
  		this.createPane('overlayPane');
  		// @pane markerPane: HTMLElement = 600
  		// Pane for `Icon`s of `Marker`s
  		this.createPane('markerPane');
  		// @pane tooltipPane: HTMLElement = 650
  		// Pane for `Tooltip`s.
  		this.createPane('tooltipPane');
  		// @pane popupPane: HTMLElement = 700
  		// Pane for `Popup`s.
  		this.createPane('popupPane');

  		if (!this.options.markerZoomAnimation) {
  			addClass(panes.markerPane, 'leaflet-zoom-hide');
  			addClass(panes.shadowPane, 'leaflet-zoom-hide');
  		}
  	},


  	// private methods that modify map state

  	// @section Map state change events
  	_resetView: function (center, zoom) {
  		setPosition(this._mapPane, new Point(0, 0));

  		var loading = !this._loaded;
  		this._loaded = true;
  		zoom = this._limitZoom(zoom);

  		this.fire('viewprereset');

  		var zoomChanged = this._zoom !== zoom;
  		this
  			._moveStart(zoomChanged, false)
  			._move(center, zoom)
  			._moveEnd(zoomChanged);

  		// @event viewreset: Event
  		// Fired when the map needs to redraw its content (this usually happens
  		// on map zoom or load). Very useful for creating custom overlays.
  		this.fire('viewreset');

  		// @event load: Event
  		// Fired when the map is initialized (when its center and zoom are set
  		// for the first time).
  		if (loading) {
  			this.fire('load');
  		}
  	},

  	_moveStart: function (zoomChanged, noMoveStart) {
  		// @event zoomstart: Event
  		// Fired when the map zoom is about to change (e.g. before zoom animation).
  		// @event movestart: Event
  		// Fired when the view of the map starts changing (e.g. user starts dragging the map).
  		if (zoomChanged) {
  			this.fire('zoomstart');
  		}
  		if (!noMoveStart) {
  			this.fire('movestart');
  		}
  		return this;
  	},

  	_move: function (center, zoom, data) {
  		if (zoom === undefined) {
  			zoom = this._zoom;
  		}
  		var zoomChanged = this._zoom !== zoom;

  		this._zoom = zoom;
  		this._lastCenter = center;
  		this._pixelOrigin = this._getNewPixelOrigin(center);

  		// @event zoom: Event
  		// Fired repeatedly during any change in zoom level, including zoom
  		// and fly animations.
  		if (zoomChanged || (data && data.pinch)) {	// Always fire 'zoom' if pinching because #3530
  			this.fire('zoom', data);
  		}

  		// @event move: Event
  		// Fired repeatedly during any movement of the map, including pan and
  		// fly animations.
  		return this.fire('move', data);
  	},

  	_moveEnd: function (zoomChanged) {
  		// @event zoomend: Event
  		// Fired when the map has changed, after any animations.
  		if (zoomChanged) {
  			this.fire('zoomend');
  		}

  		// @event moveend: Event
  		// Fired when the center of the map stops changing (e.g. user stopped
  		// dragging the map).
  		return this.fire('moveend');
  	},

  	_stop: function () {
  		cancelAnimFrame(this._flyToFrame);
  		if (this._panAnim) {
  			this._panAnim.stop();
  		}
  		return this;
  	},

  	_rawPanBy: function (offset) {
  		setPosition(this._mapPane, this._getMapPanePos().subtract(offset));
  	},

  	_getZoomSpan: function () {
  		return this.getMaxZoom() - this.getMinZoom();
  	},

  	_panInsideMaxBounds: function () {
  		if (!this._enforcingBounds) {
  			this.panInsideBounds(this.options.maxBounds);
  		}
  	},

  	_checkIfLoaded: function () {
  		if (!this._loaded) {
  			throw new Error('Set map center and zoom first.');
  		}
  	},

  	// DOM event handling

  	// @section Interaction events
  	_initEvents: function (remove$$1) {
  		this._targets = {};
  		this._targets[stamp(this._container)] = this;

  		var onOff = remove$$1 ? off : on;

  		// @event click: MouseEvent
  		// Fired when the user clicks (or taps) the map.
  		// @event dblclick: MouseEvent
  		// Fired when the user double-clicks (or double-taps) the map.
  		// @event mousedown: MouseEvent
  		// Fired when the user pushes the mouse button on the map.
  		// @event mouseup: MouseEvent
  		// Fired when the user releases the mouse button on the map.
  		// @event mouseover: MouseEvent
  		// Fired when the mouse enters the map.
  		// @event mouseout: MouseEvent
  		// Fired when the mouse leaves the map.
  		// @event mousemove: MouseEvent
  		// Fired while the mouse moves over the map.
  		// @event contextmenu: MouseEvent
  		// Fired when the user pushes the right mouse button on the map, prevents
  		// default browser context menu from showing if there are listeners on
  		// this event. Also fired on mobile when the user holds a single touch
  		// for a second (also called long press).
  		// @event keypress: KeyboardEvent
  		// Fired when the user presses a key from the keyboard that produces a character value while the map is focused.
  		// @event keydown: KeyboardEvent
  		// Fired when the user presses a key from the keyboard while the map is focused. Unlike the `keypress` event,
  		// the `keydown` event is fired for keys that produce a character value and for keys
  		// that do not produce a character value.
  		// @event keyup: KeyboardEvent
  		// Fired when the user releases a key from the keyboard while the map is focused.
  		onOff(this._container, 'click dblclick mousedown mouseup ' +
  			'mouseover mouseout mousemove contextmenu keypress keydown keyup', this._handleDOMEvent, this);

  		if (this.options.trackResize) {
  			onOff(window, 'resize', this._onResize, this);
  		}

  		if (any3d && this.options.transform3DLimit) {
  			(remove$$1 ? this.off : this.on).call(this, 'moveend', this._onMoveEnd);
  		}
  	},

  	_onResize: function () {
  		cancelAnimFrame(this._resizeRequest);
  		this._resizeRequest = requestAnimFrame(
  		        function () { this.invalidateSize({debounceMoveend: true}); }, this);
  	},

  	_onScroll: function () {
  		this._container.scrollTop  = 0;
  		this._container.scrollLeft = 0;
  	},

  	_onMoveEnd: function () {
  		var pos = this._getMapPanePos();
  		if (Math.max(Math.abs(pos.x), Math.abs(pos.y)) >= this.options.transform3DLimit) {
  			// https://bugzilla.mozilla.org/show_bug.cgi?id=1203873 but Webkit also have
  			// a pixel offset on very high values, see: http://jsfiddle.net/dg6r5hhb/
  			this._resetView(this.getCenter(), this.getZoom());
  		}
  	},

  	_findEventTargets: function (e, type) {
  		var targets = [],
  		    target,
  		    isHover = type === 'mouseout' || type === 'mouseover',
  		    src = e.target || e.srcElement,
  		    dragging = false;

  		while (src) {
  			target = this._targets[stamp(src)];
  			if (target && (type === 'click' || type === 'preclick') && !e._simulated && this._draggableMoved(target)) {
  				// Prevent firing click after you just dragged an object.
  				dragging = true;
  				break;
  			}
  			if (target && target.listens(type, true)) {
  				if (isHover && !isExternalTarget(src, e)) { break; }
  				targets.push(target);
  				if (isHover) { break; }
  			}
  			if (src === this._container) { break; }
  			src = src.parentNode;
  		}
  		if (!targets.length && !dragging && !isHover && isExternalTarget(src, e)) {
  			targets = [this];
  		}
  		return targets;
  	},

  	_handleDOMEvent: function (e) {
  		if (!this._loaded || skipped(e)) { return; }

  		var type = e.type;

  		if (type === 'mousedown' || type === 'keypress' || type === 'keyup' || type === 'keydown') {
  			// prevents outline when clicking on keyboard-focusable element
  			preventOutline(e.target || e.srcElement);
  		}

  		this._fireDOMEvent(e, type);
  	},

  	_mouseEvents: ['click', 'dblclick', 'mouseover', 'mouseout', 'contextmenu'],

  	_fireDOMEvent: function (e, type, targets) {

  		if (e.type === 'click') {
  			// Fire a synthetic 'preclick' event which propagates up (mainly for closing popups).
  			// @event preclick: MouseEvent
  			// Fired before mouse click on the map (sometimes useful when you
  			// want something to happen on click before any existing click
  			// handlers start running).
  			var synth = extend({}, e);
  			synth.type = 'preclick';
  			this._fireDOMEvent(synth, synth.type, targets);
  		}

  		if (e._stopped) { return; }

  		// Find the layer the event is propagating from and its parents.
  		targets = (targets || []).concat(this._findEventTargets(e, type));

  		if (!targets.length) { return; }

  		var target = targets[0];
  		if (type === 'contextmenu' && target.listens(type, true)) {
  			preventDefault(e);
  		}

  		var data = {
  			originalEvent: e
  		};

  		if (e.type !== 'keypress' && e.type !== 'keydown' && e.type !== 'keyup') {
  			var isMarker = target.getLatLng && (!target._radius || target._radius <= 10);
  			data.containerPoint = isMarker ?
  				this.latLngToContainerPoint(target.getLatLng()) : this.mouseEventToContainerPoint(e);
  			data.layerPoint = this.containerPointToLayerPoint(data.containerPoint);
  			data.latlng = isMarker ? target.getLatLng() : this.layerPointToLatLng(data.layerPoint);
  		}

  		for (var i = 0; i < targets.length; i++) {
  			targets[i].fire(type, data, true);
  			if (data.originalEvent._stopped ||
  				(targets[i].options.bubblingMouseEvents === false && indexOf(this._mouseEvents, type) !== -1)) { return; }
  		}
  	},

  	_draggableMoved: function (obj) {
  		obj = obj.dragging && obj.dragging.enabled() ? obj : this;
  		return (obj.dragging && obj.dragging.moved()) || (this.boxZoom && this.boxZoom.moved());
  	},

  	_clearHandlers: function () {
  		for (var i = 0, len = this._handlers.length; i < len; i++) {
  			this._handlers[i].disable();
  		}
  	},

  	// @section Other Methods

  	// @method whenReady(fn: Function, context?: Object): this
  	// Runs the given function `fn` when the map gets initialized with
  	// a view (center and zoom) and at least one layer, or immediately
  	// if it's already initialized, optionally passing a function context.
  	whenReady: function (callback, context) {
  		if (this._loaded) {
  			callback.call(context || this, {target: this});
  		} else {
  			this.on('load', callback, context);
  		}
  		return this;
  	},


  	// private methods for getting map state

  	_getMapPanePos: function () {
  		return getPosition(this._mapPane) || new Point(0, 0);
  	},

  	_moved: function () {
  		var pos = this._getMapPanePos();
  		return pos && !pos.equals([0, 0]);
  	},

  	_getTopLeftPoint: function (center, zoom) {
  		var pixelOrigin = center && zoom !== undefined ?
  			this._getNewPixelOrigin(center, zoom) :
  			this.getPixelOrigin();
  		return pixelOrigin.subtract(this._getMapPanePos());
  	},

  	_getNewPixelOrigin: function (center, zoom) {
  		var viewHalf = this.getSize()._divideBy(2);
  		return this.project(center, zoom)._subtract(viewHalf)._add(this._getMapPanePos())._round();
  	},

  	_latLngToNewLayerPoint: function (latlng, zoom, center) {
  		var topLeft = this._getNewPixelOrigin(center, zoom);
  		return this.project(latlng, zoom)._subtract(topLeft);
  	},

  	_latLngBoundsToNewLayerBounds: function (latLngBounds, zoom, center) {
  		var topLeft = this._getNewPixelOrigin(center, zoom);
  		return toBounds([
  			this.project(latLngBounds.getSouthWest(), zoom)._subtract(topLeft),
  			this.project(latLngBounds.getNorthWest(), zoom)._subtract(topLeft),
  			this.project(latLngBounds.getSouthEast(), zoom)._subtract(topLeft),
  			this.project(latLngBounds.getNorthEast(), zoom)._subtract(topLeft)
  		]);
  	},

  	// layer point of the current center
  	_getCenterLayerPoint: function () {
  		return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
  	},

  	// offset of the specified place to the current center in pixels
  	_getCenterOffset: function (latlng) {
  		return this.latLngToLayerPoint(latlng).subtract(this._getCenterLayerPoint());
  	},

  	// adjust center for view to get inside bounds
  	_limitCenter: function (center, zoom, bounds) {

  		if (!bounds) { return center; }

  		var centerPoint = this.project(center, zoom),
  		    viewHalf = this.getSize().divideBy(2),
  		    viewBounds = new Bounds(centerPoint.subtract(viewHalf), centerPoint.add(viewHalf)),
  		    offset = this._getBoundsOffset(viewBounds, bounds, zoom);

  		// If offset is less than a pixel, ignore.
  		// This prevents unstable projections from getting into
  		// an infinite loop of tiny offsets.
  		if (offset.round().equals([0, 0])) {
  			return center;
  		}

  		return this.unproject(centerPoint.add(offset), zoom);
  	},

  	// adjust offset for view to get inside bounds
  	_limitOffset: function (offset, bounds) {
  		if (!bounds) { return offset; }

  		var viewBounds = this.getPixelBounds(),
  		    newBounds = new Bounds(viewBounds.min.add(offset), viewBounds.max.add(offset));

  		return offset.add(this._getBoundsOffset(newBounds, bounds));
  	},

  	// returns offset needed for pxBounds to get inside maxBounds at a specified zoom
  	_getBoundsOffset: function (pxBounds, maxBounds, zoom) {
  		var projectedMaxBounds = toBounds(
  		        this.project(maxBounds.getNorthEast(), zoom),
  		        this.project(maxBounds.getSouthWest(), zoom)
  		    ),
  		    minOffset = projectedMaxBounds.min.subtract(pxBounds.min),
  		    maxOffset = projectedMaxBounds.max.subtract(pxBounds.max),

  		    dx = this._rebound(minOffset.x, -maxOffset.x),
  		    dy = this._rebound(minOffset.y, -maxOffset.y);

  		return new Point(dx, dy);
  	},

  	_rebound: function (left, right) {
  		return left + right > 0 ?
  			Math.round(left - right) / 2 :
  			Math.max(0, Math.ceil(left)) - Math.max(0, Math.floor(right));
  	},

  	_limitZoom: function (zoom) {
  		var min = this.getMinZoom(),
  		    max = this.getMaxZoom(),
  		    snap = any3d ? this.options.zoomSnap : 1;
  		if (snap) {
  			zoom = Math.round(zoom / snap) * snap;
  		}
  		return Math.max(min, Math.min(max, zoom));
  	},

  	_onPanTransitionStep: function () {
  		this.fire('move');
  	},

  	_onPanTransitionEnd: function () {
  		removeClass(this._mapPane, 'leaflet-pan-anim');
  		this.fire('moveend');
  	},

  	_tryAnimatedPan: function (center, options) {
  		// difference between the new and current centers in pixels
  		var offset = this._getCenterOffset(center)._trunc();

  		// don't animate too far unless animate: true specified in options
  		if ((options && options.animate) !== true && !this.getSize().contains(offset)) { return false; }

  		this.panBy(offset, options);

  		return true;
  	},

  	_createAnimProxy: function () {

  		var proxy = this._proxy = create$1('div', 'leaflet-proxy leaflet-zoom-animated');
  		this._panes.mapPane.appendChild(proxy);

  		this.on('zoomanim', function (e) {
  			var prop = TRANSFORM,
  			    transform = this._proxy.style[prop];

  			setTransform(this._proxy, this.project(e.center, e.zoom), this.getZoomScale(e.zoom, 1));

  			// workaround for case when transform is the same and so transitionend event is not fired
  			if (transform === this._proxy.style[prop] && this._animatingZoom) {
  				this._onZoomTransitionEnd();
  			}
  		}, this);

  		this.on('load moveend', this._animMoveEnd, this);

  		this._on('unload', this._destroyAnimProxy, this);
  	},

  	_destroyAnimProxy: function () {
  		remove(this._proxy);
  		this.off('load moveend', this._animMoveEnd, this);
  		delete this._proxy;
  	},

  	_animMoveEnd: function () {
  		var c = this.getCenter(),
  		    z = this.getZoom();
  		setTransform(this._proxy, this.project(c, z), this.getZoomScale(z, 1));
  	},

  	_catchTransitionEnd: function (e) {
  		if (this._animatingZoom && e.propertyName.indexOf('transform') >= 0) {
  			this._onZoomTransitionEnd();
  		}
  	},

  	_nothingToAnimate: function () {
  		return !this._container.getElementsByClassName('leaflet-zoom-animated').length;
  	},

  	_tryAnimatedZoom: function (center, zoom, options) {

  		if (this._animatingZoom) { return true; }

  		options = options || {};

  		// don't animate if disabled, not supported or zoom difference is too large
  		if (!this._zoomAnimated || options.animate === false || this._nothingToAnimate() ||
  		        Math.abs(zoom - this._zoom) > this.options.zoomAnimationThreshold) { return false; }

  		// offset is the pixel coords of the zoom origin relative to the current center
  		var scale = this.getZoomScale(zoom),
  		    offset = this._getCenterOffset(center)._divideBy(1 - 1 / scale);

  		// don't animate if the zoom origin isn't within one screen from the current center, unless forced
  		if (options.animate !== true && !this.getSize().contains(offset)) { return false; }

  		requestAnimFrame(function () {
  			this
  			    ._moveStart(true, false)
  			    ._animateZoom(center, zoom, true);
  		}, this);

  		return true;
  	},

  	_animateZoom: function (center, zoom, startAnim, noUpdate) {
  		if (!this._mapPane) { return; }

  		if (startAnim) {
  			this._animatingZoom = true;

  			// remember what center/zoom to set after animation
  			this._animateToCenter = center;
  			this._animateToZoom = zoom;

  			addClass(this._mapPane, 'leaflet-zoom-anim');
  		}

  		// @section Other Events
  		// @event zoomanim: ZoomAnimEvent
  		// Fired at least once per zoom animation. For continuous zoom, like pinch zooming, fired once per frame during zoom.
  		this.fire('zoomanim', {
  			center: center,
  			zoom: zoom,
  			noUpdate: noUpdate
  		});

  		// Work around webkit not firing 'transitionend', see https://github.com/Leaflet/Leaflet/issues/3689, 2693
  		setTimeout(bind(this._onZoomTransitionEnd, this), 250);
  	},

  	_onZoomTransitionEnd: function () {
  		if (!this._animatingZoom) { return; }

  		if (this._mapPane) {
  			removeClass(this._mapPane, 'leaflet-zoom-anim');
  		}

  		this._animatingZoom = false;

  		this._move(this._animateToCenter, this._animateToZoom);

  		// This anim frame should prevent an obscure iOS webkit tile loading race condition.
  		requestAnimFrame(function () {
  			this._moveEnd(true);
  		}, this);
  	}
  });

  // @section

  // @factory L.map(id: String, options?: Map options)
  // Instantiates a map object given the DOM ID of a `<div>` element
  // and optionally an object literal with `Map options`.
  //
  // @alternative
  // @factory L.map(el: HTMLElement, options?: Map options)
  // Instantiates a map object given an instance of a `<div>` HTML element
  // and optionally an object literal with `Map options`.
  function createMap(id, options) {
  	return new Map(id, options);
  }

  /*
   * @class Control
   * @aka L.Control
   * @inherits Class
   *
   * L.Control is a base class for implementing map controls. Handles positioning.
   * All other controls extend from this class.
   */

  var Control = Class.extend({
  	// @section
  	// @aka Control options
  	options: {
  		// @option position: String = 'topright'
  		// The position of the control (one of the map corners). Possible values are `'topleft'`,
  		// `'topright'`, `'bottomleft'` or `'bottomright'`
  		position: 'topright'
  	},

  	initialize: function (options) {
  		setOptions(this, options);
  	},

  	/* @section
  	 * Classes extending L.Control will inherit the following methods:
  	 *
  	 * @method getPosition: string
  	 * Returns the position of the control.
  	 */
  	getPosition: function () {
  		return this.options.position;
  	},

  	// @method setPosition(position: string): this
  	// Sets the position of the control.
  	setPosition: function (position) {
  		var map = this._map;

  		if (map) {
  			map.removeControl(this);
  		}

  		this.options.position = position;

  		if (map) {
  			map.addControl(this);
  		}

  		return this;
  	},

  	// @method getContainer: HTMLElement
  	// Returns the HTMLElement that contains the control.
  	getContainer: function () {
  		return this._container;
  	},

  	// @method addTo(map: Map): this
  	// Adds the control to the given map.
  	addTo: function (map) {
  		this.remove();
  		this._map = map;

  		var container = this._container = this.onAdd(map),
  		    pos = this.getPosition(),
  		    corner = map._controlCorners[pos];

  		addClass(container, 'leaflet-control');

  		if (pos.indexOf('bottom') !== -1) {
  			corner.insertBefore(container, corner.firstChild);
  		} else {
  			corner.appendChild(container);
  		}

  		this._map.on('unload', this.remove, this);

  		return this;
  	},

  	// @method remove: this
  	// Removes the control from the map it is currently active on.
  	remove: function () {
  		if (!this._map) {
  			return this;
  		}

  		remove(this._container);

  		if (this.onRemove) {
  			this.onRemove(this._map);
  		}

  		this._map.off('unload', this.remove, this);
  		this._map = null;

  		return this;
  	},

  	_refocusOnMap: function (e) {
  		// if map exists and event is not a keyboard event
  		if (this._map && e && e.screenX > 0 && e.screenY > 0) {
  			this._map.getContainer().focus();
  		}
  	}
  });

  var control = function (options) {
  	return new Control(options);
  };

  /* @section Extension methods
   * @uninheritable
   *
   * Every control should extend from `L.Control` and (re-)implement the following methods.
   *
   * @method onAdd(map: Map): HTMLElement
   * Should return the container DOM element for the control and add listeners on relevant map events. Called on [`control.addTo(map)`](#control-addTo).
   *
   * @method onRemove(map: Map)
   * Optional method. Should contain all clean up code that removes the listeners previously added in [`onAdd`](#control-onadd). Called on [`control.remove()`](#control-remove).
   */

  /* @namespace Map
   * @section Methods for Layers and Controls
   */
  Map.include({
  	// @method addControl(control: Control): this
  	// Adds the given control to the map
  	addControl: function (control) {
  		control.addTo(this);
  		return this;
  	},

  	// @method removeControl(control: Control): this
  	// Removes the given control from the map
  	removeControl: function (control) {
  		control.remove();
  		return this;
  	},

  	_initControlPos: function () {
  		var corners = this._controlCorners = {},
  		    l = 'leaflet-',
  		    container = this._controlContainer =
  		            create$1('div', l + 'control-container', this._container);

  		function createCorner(vSide, hSide) {
  			var className = l + vSide + ' ' + l + hSide;

  			corners[vSide + hSide] = create$1('div', className, container);
  		}

  		createCorner('top', 'left');
  		createCorner('top', 'right');
  		createCorner('bottom', 'left');
  		createCorner('bottom', 'right');
  	},

  	_clearControlPos: function () {
  		for (var i in this._controlCorners) {
  			remove(this._controlCorners[i]);
  		}
  		remove(this._controlContainer);
  		delete this._controlCorners;
  		delete this._controlContainer;
  	}
  });

  /*
   * @class Control.Layers
   * @aka L.Control.Layers
   * @inherits Control
   *
   * The layers control gives users the ability to switch between different base layers and switch overlays on/off (check out the [detailed example](http://leafletjs.com/examples/layers-control/)). Extends `Control`.
   *
   * @example
   *
   * ```js
   * var baseLayers = {
   * 	"Mapbox": mapbox,
   * 	"OpenStreetMap": osm
   * };
   *
   * var overlays = {
   * 	"Marker": marker,
   * 	"Roads": roadsLayer
   * };
   *
   * L.control.layers(baseLayers, overlays).addTo(map);
   * ```
   *
   * The `baseLayers` and `overlays` parameters are object literals with layer names as keys and `Layer` objects as values:
   *
   * ```js
   * {
   *     "<someName1>": layer1,
   *     "<someName2>": layer2
   * }
   * ```
   *
   * The layer names can contain HTML, which allows you to add additional styling to the items:
   *
   * ```js
   * {"<img src='my-layer-icon' /> <span class='my-layer-item'>My Layer</span>": myLayer}
   * ```
   */

  var Layers = Control.extend({
  	// @section
  	// @aka Control.Layers options
  	options: {
  		// @option collapsed: Boolean = true
  		// If `true`, the control will be collapsed into an icon and expanded on mouse hover or touch.
  		collapsed: true,
  		position: 'topright',

  		// @option autoZIndex: Boolean = true
  		// If `true`, the control will assign zIndexes in increasing order to all of its layers so that the order is preserved when switching them on/off.
  		autoZIndex: true,

  		// @option hideSingleBase: Boolean = false
  		// If `true`, the base layers in the control will be hidden when there is only one.
  		hideSingleBase: false,

  		// @option sortLayers: Boolean = false
  		// Whether to sort the layers. When `false`, layers will keep the order
  		// in which they were added to the control.
  		sortLayers: false,

  		// @option sortFunction: Function = *
  		// A [compare function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
  		// that will be used for sorting the layers, when `sortLayers` is `true`.
  		// The function receives both the `L.Layer` instances and their names, as in
  		// `sortFunction(layerA, layerB, nameA, nameB)`.
  		// By default, it sorts layers alphabetically by their name.
  		sortFunction: function (layerA, layerB, nameA, nameB) {
  			return nameA < nameB ? -1 : (nameB < nameA ? 1 : 0);
  		}
  	},

  	initialize: function (baseLayers, overlays, options) {
  		setOptions(this, options);

  		this._layerControlInputs = [];
  		this._layers = [];
  		this._lastZIndex = 0;
  		this._handlingClick = false;

  		for (var i in baseLayers) {
  			this._addLayer(baseLayers[i], i);
  		}

  		for (i in overlays) {
  			this._addLayer(overlays[i], i, true);
  		}
  	},

  	onAdd: function (map) {
  		this._initLayout();
  		this._update();

  		this._map = map;
  		map.on('zoomend', this._checkDisabledLayers, this);

  		for (var i = 0; i < this._layers.length; i++) {
  			this._layers[i].layer.on('add remove', this._onLayerChange, this);
  		}

  		return this._container;
  	},

  	addTo: function (map) {
  		Control.prototype.addTo.call(this, map);
  		// Trigger expand after Layers Control has been inserted into DOM so that is now has an actual height.
  		return this._expandIfNotCollapsed();
  	},

  	onRemove: function () {
  		this._map.off('zoomend', this._checkDisabledLayers, this);

  		for (var i = 0; i < this._layers.length; i++) {
  			this._layers[i].layer.off('add remove', this._onLayerChange, this);
  		}
  	},

  	// @method addBaseLayer(layer: Layer, name: String): this
  	// Adds a base layer (radio button entry) with the given name to the control.
  	addBaseLayer: function (layer, name) {
  		this._addLayer(layer, name);
  		return (this._map) ? this._update() : this;
  	},

  	// @method addOverlay(layer: Layer, name: String): this
  	// Adds an overlay (checkbox entry) with the given name to the control.
  	addOverlay: function (layer, name) {
  		this._addLayer(layer, name, true);
  		return (this._map) ? this._update() : this;
  	},

  	// @method removeLayer(layer: Layer): this
  	// Remove the given layer from the control.
  	removeLayer: function (layer) {
  		layer.off('add remove', this._onLayerChange, this);

  		var obj = this._getLayer(stamp(layer));
  		if (obj) {
  			this._layers.splice(this._layers.indexOf(obj), 1);
  		}
  		return (this._map) ? this._update() : this;
  	},

  	// @method expand(): this
  	// Expand the control container if collapsed.
  	expand: function () {
  		addClass(this._container, 'leaflet-control-layers-expanded');
  		this._section.style.height = null;
  		var acceptableHeight = this._map.getSize().y - (this._container.offsetTop + 50);
  		if (acceptableHeight < this._section.clientHeight) {
  			addClass(this._section, 'leaflet-control-layers-scrollbar');
  			this._section.style.height = acceptableHeight + 'px';
  		} else {
  			removeClass(this._section, 'leaflet-control-layers-scrollbar');
  		}
  		this._checkDisabledLayers();
  		return this;
  	},

  	// @method collapse(): this
  	// Collapse the control container if expanded.
  	collapse: function () {
  		removeClass(this._container, 'leaflet-control-layers-expanded');
  		return this;
  	},

  	_initLayout: function () {
  		var className = 'leaflet-control-layers',
  		    container = this._container = create$1('div', className),
  		    collapsed = this.options.collapsed;

  		// makes this work on IE touch devices by stopping it from firing a mouseout event when the touch is released
  		container.setAttribute('aria-haspopup', true);

  		disableClickPropagation(container);
  		disableScrollPropagation(container);

  		var section = this._section = create$1('section', className + '-list');

  		if (collapsed) {
  			this._map.on('click', this.collapse, this);

  			if (!android) {
  				on(container, {
  					mouseenter: this.expand,
  					mouseleave: this.collapse
  				}, this);
  			}
  		}

  		var link = this._layersLink = create$1('a', className + '-toggle', container);
  		link.href = '#';
  		link.title = 'Layers';

  		if (touch) {
  			on(link, 'click', stop);
  			on(link, 'click', this.expand, this);
  		} else {
  			on(link, 'focus', this.expand, this);
  		}

  		if (!collapsed) {
  			this.expand();
  		}

  		this._baseLayersList = create$1('div', className + '-base', section);
  		this._separator = create$1('div', className + '-separator', section);
  		this._overlaysList = create$1('div', className + '-overlays', section);

  		container.appendChild(section);
  	},

  	_getLayer: function (id) {
  		for (var i = 0; i < this._layers.length; i++) {

  			if (this._layers[i] && stamp(this._layers[i].layer) === id) {
  				return this._layers[i];
  			}
  		}
  	},

  	_addLayer: function (layer, name, overlay) {
  		if (this._map) {
  			layer.on('add remove', this._onLayerChange, this);
  		}

  		this._layers.push({
  			layer: layer,
  			name: name,
  			overlay: overlay
  		});

  		if (this.options.sortLayers) {
  			this._layers.sort(bind(function (a, b) {
  				return this.options.sortFunction(a.layer, b.layer, a.name, b.name);
  			}, this));
  		}

  		if (this.options.autoZIndex && layer.setZIndex) {
  			this._lastZIndex++;
  			layer.setZIndex(this._lastZIndex);
  		}

  		this._expandIfNotCollapsed();
  	},

  	_update: function () {
  		if (!this._container) { return this; }

  		empty(this._baseLayersList);
  		empty(this._overlaysList);

  		this._layerControlInputs = [];
  		var baseLayersPresent, overlaysPresent, i, obj, baseLayersCount = 0;

  		for (i = 0; i < this._layers.length; i++) {
  			obj = this._layers[i];
  			this._addItem(obj);
  			overlaysPresent = overlaysPresent || obj.overlay;
  			baseLayersPresent = baseLayersPresent || !obj.overlay;
  			baseLayersCount += !obj.overlay ? 1 : 0;
  		}

  		// Hide base layers section if there's only one layer.
  		if (this.options.hideSingleBase) {
  			baseLayersPresent = baseLayersPresent && baseLayersCount > 1;
  			this._baseLayersList.style.display = baseLayersPresent ? '' : 'none';
  		}

  		this._separator.style.display = overlaysPresent && baseLayersPresent ? '' : 'none';

  		return this;
  	},

  	_onLayerChange: function (e) {
  		if (!this._handlingClick) {
  			this._update();
  		}

  		var obj = this._getLayer(stamp(e.target));

  		// @namespace Map
  		// @section Layer events
  		// @event baselayerchange: LayersControlEvent
  		// Fired when the base layer is changed through the [layers control](#control-layers).
  		// @event overlayadd: LayersControlEvent
  		// Fired when an overlay is selected through the [layers control](#control-layers).
  		// @event overlayremove: LayersControlEvent
  		// Fired when an overlay is deselected through the [layers control](#control-layers).
  		// @namespace Control.Layers
  		var type = obj.overlay ?
  			(e.type === 'add' ? 'overlayadd' : 'overlayremove') :
  			(e.type === 'add' ? 'baselayerchange' : null);

  		if (type) {
  			this._map.fire(type, obj);
  		}
  	},

  	// IE7 bugs out if you create a radio dynamically, so you have to do it this hacky way (see http://bit.ly/PqYLBe)
  	_createRadioElement: function (name, checked) {

  		var radioHtml = '<input type="radio" class="leaflet-control-layers-selector" name="' +
  				name + '"' + (checked ? ' checked="checked"' : '') + '/>';

  		var radioFragment = document.createElement('div');
  		radioFragment.innerHTML = radioHtml;

  		return radioFragment.firstChild;
  	},

  	_addItem: function (obj) {
  		var label = document.createElement('label'),
  		    checked = this._map.hasLayer(obj.layer),
  		    input;

  		if (obj.overlay) {
  			input = document.createElement('input');
  			input.type = 'checkbox';
  			input.className = 'leaflet-control-layers-selector';
  			input.defaultChecked = checked;
  		} else {
  			input = this._createRadioElement('leaflet-base-layers_' + stamp(this), checked);
  		}

  		this._layerControlInputs.push(input);
  		input.layerId = stamp(obj.layer);

  		on(input, 'click', this._onInputClick, this);

  		var name = document.createElement('span');
  		name.innerHTML = ' ' + obj.name;

  		// Helps from preventing layer control flicker when checkboxes are disabled
  		// https://github.com/Leaflet/Leaflet/issues/2771
  		var holder = document.createElement('div');

  		label.appendChild(holder);
  		holder.appendChild(input);
  		holder.appendChild(name);

  		var container = obj.overlay ? this._overlaysList : this._baseLayersList;
  		container.appendChild(label);

  		this._checkDisabledLayers();
  		return label;
  	},

  	_onInputClick: function () {
  		var inputs = this._layerControlInputs,
  		    input, layer;
  		var addedLayers = [],
  		    removedLayers = [];

  		this._handlingClick = true;

  		for (var i = inputs.length - 1; i >= 0; i--) {
  			input = inputs[i];
  			layer = this._getLayer(input.layerId).layer;

  			if (input.checked) {
  				addedLayers.push(layer);
  			} else if (!input.checked) {
  				removedLayers.push(layer);
  			}
  		}

  		// Bugfix issue 2318: Should remove all old layers before readding new ones
  		for (i = 0; i < removedLayers.length; i++) {
  			if (this._map.hasLayer(removedLayers[i])) {
  				this._map.removeLayer(removedLayers[i]);
  			}
  		}
  		for (i = 0; i < addedLayers.length; i++) {
  			if (!this._map.hasLayer(addedLayers[i])) {
  				this._map.addLayer(addedLayers[i]);
  			}
  		}

  		this._handlingClick = false;

  		this._refocusOnMap();
  	},

  	_checkDisabledLayers: function () {
  		var inputs = this._layerControlInputs,
  		    input,
  		    layer,
  		    zoom = this._map.getZoom();

  		for (var i = inputs.length - 1; i >= 0; i--) {
  			input = inputs[i];
  			layer = this._getLayer(input.layerId).layer;
  			input.disabled = (layer.options.minZoom !== undefined && zoom < layer.options.minZoom) ||
  			                 (layer.options.maxZoom !== undefined && zoom > layer.options.maxZoom);

  		}
  	},

  	_expandIfNotCollapsed: function () {
  		if (this._map && !this.options.collapsed) {
  			this.expand();
  		}
  		return this;
  	},

  	_expand: function () {
  		// Backward compatibility, remove me in 1.1.
  		return this.expand();
  	},

  	_collapse: function () {
  		// Backward compatibility, remove me in 1.1.
  		return this.collapse();
  	}

  });


  // @factory L.control.layers(baselayers?: Object, overlays?: Object, options?: Control.Layers options)
  // Creates a layers control with the given layers. Base layers will be switched with radio buttons, while overlays will be switched with checkboxes. Note that all base layers should be passed in the base layers object, but only one should be added to the map during map instantiation.
  var layers = function (baseLayers, overlays, options) {
  	return new Layers(baseLayers, overlays, options);
  };

  /*
   * @class Control.Zoom
   * @aka L.Control.Zoom
   * @inherits Control
   *
   * A basic zoom control with two buttons (zoom in and zoom out). It is put on the map by default unless you set its [`zoomControl` option](#map-zoomcontrol) to `false`. Extends `Control`.
   */

  var Zoom = Control.extend({
  	// @section
  	// @aka Control.Zoom options
  	options: {
  		position: 'topleft',

  		// @option zoomInText: String = '+'
  		// The text set on the 'zoom in' button.
  		zoomInText: '+',

  		// @option zoomInTitle: String = 'Zoom in'
  		// The title set on the 'zoom in' button.
  		zoomInTitle: 'Zoom in',

  		// @option zoomOutText: String = '&#x2212;'
  		// The text set on the 'zoom out' button.
  		zoomOutText: '&#x2212;',

  		// @option zoomOutTitle: String = 'Zoom out'
  		// The title set on the 'zoom out' button.
  		zoomOutTitle: 'Zoom out'
  	},

  	onAdd: function (map) {
  		var zoomName = 'leaflet-control-zoom',
  		    container = create$1('div', zoomName + ' leaflet-bar'),
  		    options = this.options;

  		this._zoomInButton  = this._createButton(options.zoomInText, options.zoomInTitle,
  		        zoomName + '-in',  container, this._zoomIn);
  		this._zoomOutButton = this._createButton(options.zoomOutText, options.zoomOutTitle,
  		        zoomName + '-out', container, this._zoomOut);

  		this._updateDisabled();
  		map.on('zoomend zoomlevelschange', this._updateDisabled, this);

  		return container;
  	},

  	onRemove: function (map) {
  		map.off('zoomend zoomlevelschange', this._updateDisabled, this);
  	},

  	disable: function () {
  		this._disabled = true;
  		this._updateDisabled();
  		return this;
  	},

  	enable: function () {
  		this._disabled = false;
  		this._updateDisabled();
  		return this;
  	},

  	_zoomIn: function (e) {
  		if (!this._disabled && this._map._zoom < this._map.getMaxZoom()) {
  			this._map.zoomIn(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1));
  		}
  	},

  	_zoomOut: function (e) {
  		if (!this._disabled && this._map._zoom > this._map.getMinZoom()) {
  			this._map.zoomOut(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1));
  		}
  	},

  	_createButton: function (html, title, className, container, fn) {
  		var link = create$1('a', className, container);
  		link.innerHTML = html;
  		link.href = '#';
  		link.title = title;

  		/*
  		 * Will force screen readers like VoiceOver to read this as "Zoom in - button"
  		 */
  		link.setAttribute('role', 'button');
  		link.setAttribute('aria-label', title);

  		disableClickPropagation(link);
  		on(link, 'click', stop);
  		on(link, 'click', fn, this);
  		on(link, 'click', this._refocusOnMap, this);

  		return link;
  	},

  	_updateDisabled: function () {
  		var map = this._map,
  		    className = 'leaflet-disabled';

  		removeClass(this._zoomInButton, className);
  		removeClass(this._zoomOutButton, className);

  		if (this._disabled || map._zoom === map.getMinZoom()) {
  			addClass(this._zoomOutButton, className);
  		}
  		if (this._disabled || map._zoom === map.getMaxZoom()) {
  			addClass(this._zoomInButton, className);
  		}
  	}
  });

  // @namespace Map
  // @section Control options
  // @option zoomControl: Boolean = true
  // Whether a [zoom control](#control-zoom) is added to the map by default.
  Map.mergeOptions({
  	zoomControl: true
  });

  Map.addInitHook(function () {
  	if (this.options.zoomControl) {
  		// @section Controls
  		// @property zoomControl: Control.Zoom
  		// The default zoom control (only available if the
  		// [`zoomControl` option](#map-zoomcontrol) was `true` when creating the map).
  		this.zoomControl = new Zoom();
  		this.addControl(this.zoomControl);
  	}
  });

  // @namespace Control.Zoom
  // @factory L.control.zoom(options: Control.Zoom options)
  // Creates a zoom control
  var zoom = function (options) {
  	return new Zoom(options);
  };

  /*
   * @class Control.Scale
   * @aka L.Control.Scale
   * @inherits Control
   *
   * A simple scale control that shows the scale of the current center of screen in metric (m/km) and imperial (mi/ft) systems. Extends `Control`.
   *
   * @example
   *
   * ```js
   * L.control.scale().addTo(map);
   * ```
   */

  var Scale = Control.extend({
  	// @section
  	// @aka Control.Scale options
  	options: {
  		position: 'bottomleft',

  		// @option maxWidth: Number = 100
  		// Maximum width of the control in pixels. The width is set dynamically to show round values (e.g. 100, 200, 500).
  		maxWidth: 100,

  		// @option metric: Boolean = True
  		// Whether to show the metric scale line (m/km).
  		metric: true,

  		// @option imperial: Boolean = True
  		// Whether to show the imperial scale line (mi/ft).
  		imperial: true

  		// @option updateWhenIdle: Boolean = false
  		// If `true`, the control is updated on [`moveend`](#map-moveend), otherwise it's always up-to-date (updated on [`move`](#map-move)).
  	},

  	onAdd: function (map) {
  		var className = 'leaflet-control-scale',
  		    container = create$1('div', className),
  		    options = this.options;

  		this._addScales(options, className + '-line', container);

  		map.on(options.updateWhenIdle ? 'moveend' : 'move', this._update, this);
  		map.whenReady(this._update, this);

  		return container;
  	},

  	onRemove: function (map) {
  		map.off(this.options.updateWhenIdle ? 'moveend' : 'move', this._update, this);
  	},

  	_addScales: function (options, className, container) {
  		if (options.metric) {
  			this._mScale = create$1('div', className, container);
  		}
  		if (options.imperial) {
  			this._iScale = create$1('div', className, container);
  		}
  	},

  	_update: function () {
  		var map = this._map,
  		    y = map.getSize().y / 2;

  		var maxMeters = map.distance(
  			map.containerPointToLatLng([0, y]),
  			map.containerPointToLatLng([this.options.maxWidth, y]));

  		this._updateScales(maxMeters);
  	},

  	_updateScales: function (maxMeters) {
  		if (this.options.metric && maxMeters) {
  			this._updateMetric(maxMeters);
  		}
  		if (this.options.imperial && maxMeters) {
  			this._updateImperial(maxMeters);
  		}
  	},

  	_updateMetric: function (maxMeters) {
  		var meters = this._getRoundNum(maxMeters),
  		    label = meters < 1000 ? meters + ' m' : (meters / 1000) + ' km';

  		this._updateScale(this._mScale, label, meters / maxMeters);
  	},

  	_updateImperial: function (maxMeters) {
  		var maxFeet = maxMeters * 3.2808399,
  		    maxMiles, miles, feet;

  		if (maxFeet > 5280) {
  			maxMiles = maxFeet / 5280;
  			miles = this._getRoundNum(maxMiles);
  			this._updateScale(this._iScale, miles + ' mi', miles / maxMiles);

  		} else {
  			feet = this._getRoundNum(maxFeet);
  			this._updateScale(this._iScale, feet + ' ft', feet / maxFeet);
  		}
  	},

  	_updateScale: function (scale, text, ratio) {
  		scale.style.width = Math.round(this.options.maxWidth * ratio) + 'px';
  		scale.innerHTML = text;
  	},

  	_getRoundNum: function (num) {
  		var pow10 = Math.pow(10, (Math.floor(num) + '').length - 1),
  		    d = num / pow10;

  		d = d >= 10 ? 10 :
  		    d >= 5 ? 5 :
  		    d >= 3 ? 3 :
  		    d >= 2 ? 2 : 1;

  		return pow10 * d;
  	}
  });


  // @factory L.control.scale(options?: Control.Scale options)
  // Creates an scale control with the given options.
  var scale = function (options) {
  	return new Scale(options);
  };

  /*
   * @class Control.Attribution
   * @aka L.Control.Attribution
   * @inherits Control
   *
   * The attribution control allows you to display attribution data in a small text box on a map. It is put on the map by default unless you set its [`attributionControl` option](#map-attributioncontrol) to `false`, and it fetches attribution texts from layers with the [`getAttribution` method](#layer-getattribution) automatically. Extends Control.
   */

  var Attribution = Control.extend({
  	// @section
  	// @aka Control.Attribution options
  	options: {
  		position: 'bottomright',

  		// @option prefix: String = 'Leaflet'
  		// The HTML text shown before the attributions. Pass `false` to disable.
  		prefix: '<a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'
  	},

  	initialize: function (options) {
  		setOptions(this, options);

  		this._attributions = {};
  	},

  	onAdd: function (map) {
  		map.attributionControl = this;
  		this._container = create$1('div', 'leaflet-control-attribution');
  		disableClickPropagation(this._container);

  		// TODO ugly, refactor
  		for (var i in map._layers) {
  			if (map._layers[i].getAttribution) {
  				this.addAttribution(map._layers[i].getAttribution());
  			}
  		}

  		this._update();

  		return this._container;
  	},

  	// @method setPrefix(prefix: String): this
  	// Sets the text before the attributions.
  	setPrefix: function (prefix) {
  		this.options.prefix = prefix;
  		this._update();
  		return this;
  	},

  	// @method addAttribution(text: String): this
  	// Adds an attribution text (e.g. `'Vector data &copy; Mapbox'`).
  	addAttribution: function (text) {
  		if (!text) { return this; }

  		if (!this._attributions[text]) {
  			this._attributions[text] = 0;
  		}
  		this._attributions[text]++;

  		this._update();

  		return this;
  	},

  	// @method removeAttribution(text: String): this
  	// Removes an attribution text.
  	removeAttribution: function (text) {
  		if (!text) { return this; }

  		if (this._attributions[text]) {
  			this._attributions[text]--;
  			this._update();
  		}

  		return this;
  	},

  	_update: function () {
  		if (!this._map) { return; }

  		var attribs = [];

  		for (var i in this._attributions) {
  			if (this._attributions[i]) {
  				attribs.push(i);
  			}
  		}

  		var prefixAndAttribs = [];

  		if (this.options.prefix) {
  			prefixAndAttribs.push(this.options.prefix);
  		}
  		if (attribs.length) {
  			prefixAndAttribs.push(attribs.join(', '));
  		}

  		this._container.innerHTML = prefixAndAttribs.join(' | ');
  	}
  });

  // @namespace Map
  // @section Control options
  // @option attributionControl: Boolean = true
  // Whether a [attribution control](#control-attribution) is added to the map by default.
  Map.mergeOptions({
  	attributionControl: true
  });

  Map.addInitHook(function () {
  	if (this.options.attributionControl) {
  		new Attribution().addTo(this);
  	}
  });

  // @namespace Control.Attribution
  // @factory L.control.attribution(options: Control.Attribution options)
  // Creates an attribution control.
  var attribution = function (options) {
  	return new Attribution(options);
  };

  Control.Layers = Layers;
  Control.Zoom = Zoom;
  Control.Scale = Scale;
  Control.Attribution = Attribution;

  control.layers = layers;
  control.zoom = zoom;
  control.scale = scale;
  control.attribution = attribution;

  /*
  	L.Handler is a base class for handler classes that are used internally to inject
  	interaction features like dragging to classes like Map and Marker.
  */

  // @class Handler
  // @aka L.Handler
  // Abstract class for map interaction handlers

  var Handler = Class.extend({
  	initialize: function (map) {
  		this._map = map;
  	},

  	// @method enable(): this
  	// Enables the handler
  	enable: function () {
  		if (this._enabled) { return this; }

  		this._enabled = true;
  		this.addHooks();
  		return this;
  	},

  	// @method disable(): this
  	// Disables the handler
  	disable: function () {
  		if (!this._enabled) { return this; }

  		this._enabled = false;
  		this.removeHooks();
  		return this;
  	},

  	// @method enabled(): Boolean
  	// Returns `true` if the handler is enabled
  	enabled: function () {
  		return !!this._enabled;
  	}

  	// @section Extension methods
  	// Classes inheriting from `Handler` must implement the two following methods:
  	// @method addHooks()
  	// Called when the handler is enabled, should add event hooks.
  	// @method removeHooks()
  	// Called when the handler is disabled, should remove the event hooks added previously.
  });

  // @section There is static function which can be called without instantiating L.Handler:
  // @function addTo(map: Map, name: String): this
  // Adds a new Handler to the given map with the given name.
  Handler.addTo = function (map, name) {
  	map.addHandler(name, this);
  	return this;
  };

  var Mixin = {Events: Events};

  /*
   * @class Draggable
   * @aka L.Draggable
   * @inherits Evented
   *
   * A class for making DOM elements draggable (including touch support).
   * Used internally for map and marker dragging. Only works for elements
   * that were positioned with [`L.DomUtil.setPosition`](#domutil-setposition).
   *
   * @example
   * ```js
   * var draggable = new L.Draggable(elementToDrag);
   * draggable.enable();
   * ```
   */

  var START = touch ? 'touchstart mousedown' : 'mousedown';
  var END = {
  	mousedown: 'mouseup',
  	touchstart: 'touchend',
  	pointerdown: 'touchend',
  	MSPointerDown: 'touchend'
  };
  var MOVE = {
  	mousedown: 'mousemove',
  	touchstart: 'touchmove',
  	pointerdown: 'touchmove',
  	MSPointerDown: 'touchmove'
  };


  var Draggable = Evented.extend({

  	options: {
  		// @section
  		// @aka Draggable options
  		// @option clickTolerance: Number = 3
  		// The max number of pixels a user can shift the mouse pointer during a click
  		// for it to be considered a valid click (as opposed to a mouse drag).
  		clickTolerance: 3
  	},

  	// @constructor L.Draggable(el: HTMLElement, dragHandle?: HTMLElement, preventOutline?: Boolean, options?: Draggable options)
  	// Creates a `Draggable` object for moving `el` when you start dragging the `dragHandle` element (equals `el` itself by default).
  	initialize: function (element, dragStartTarget, preventOutline$$1, options) {
  		setOptions(this, options);

  		this._element = element;
  		this._dragStartTarget = dragStartTarget || element;
  		this._preventOutline = preventOutline$$1;
  	},

  	// @method enable()
  	// Enables the dragging ability
  	enable: function () {
  		if (this._enabled) { return; }

  		on(this._dragStartTarget, START, this._onDown, this);

  		this._enabled = true;
  	},

  	// @method disable()
  	// Disables the dragging ability
  	disable: function () {
  		if (!this._enabled) { return; }

  		// If we're currently dragging this draggable,
  		// disabling it counts as first ending the drag.
  		if (Draggable._dragging === this) {
  			this.finishDrag();
  		}

  		off(this._dragStartTarget, START, this._onDown, this);

  		this._enabled = false;
  		this._moved = false;
  	},

  	_onDown: function (e) {
  		// Ignore simulated events, since we handle both touch and
  		// mouse explicitly; otherwise we risk getting duplicates of
  		// touch events, see #4315.
  		// Also ignore the event if disabled; this happens in IE11
  		// under some circumstances, see #3666.
  		if (e._simulated || !this._enabled) { return; }

  		this._moved = false;

  		if (hasClass(this._element, 'leaflet-zoom-anim')) { return; }

  		if (Draggable._dragging || e.shiftKey || ((e.which !== 1) && (e.button !== 1) && !e.touches)) { return; }
  		Draggable._dragging = this;  // Prevent dragging multiple objects at once.

  		if (this._preventOutline) {
  			preventOutline(this._element);
  		}

  		disableImageDrag();
  		disableTextSelection();

  		if (this._moving) { return; }

  		// @event down: Event
  		// Fired when a drag is about to start.
  		this.fire('down');

  		var first = e.touches ? e.touches[0] : e,
  		    sizedParent = getSizedParentNode(this._element);

  		this._startPoint = new Point(first.clientX, first.clientY);

  		// Cache the scale, so that we can continuously compensate for it during drag (_onMove).
  		this._parentScale = getScale(sizedParent);

  		on(document, MOVE[e.type], this._onMove, this);
  		on(document, END[e.type], this._onUp, this);
  	},

  	_onMove: function (e) {
  		// Ignore simulated events, since we handle both touch and
  		// mouse explicitly; otherwise we risk getting duplicates of
  		// touch events, see #4315.
  		// Also ignore the event if disabled; this happens in IE11
  		// under some circumstances, see #3666.
  		if (e._simulated || !this._enabled) { return; }

  		if (e.touches && e.touches.length > 1) {
  			this._moved = true;
  			return;
  		}

  		var first = (e.touches && e.touches.length === 1 ? e.touches[0] : e),
  		    offset = new Point(first.clientX, first.clientY)._subtract(this._startPoint);

  		if (!offset.x && !offset.y) { return; }
  		if (Math.abs(offset.x) + Math.abs(offset.y) < this.options.clickTolerance) { return; }

  		// We assume that the parent container's position, border and scale do not change for the duration of the drag.
  		// Therefore there is no need to account for the position and border (they are eliminated by the subtraction)
  		// and we can use the cached value for the scale.
  		offset.x /= this._parentScale.x;
  		offset.y /= this._parentScale.y;

  		preventDefault(e);

  		if (!this._moved) {
  			// @event dragstart: Event
  			// Fired when a drag starts
  			this.fire('dragstart');

  			this._moved = true;
  			this._startPos = getPosition(this._element).subtract(offset);

  			addClass(document.body, 'leaflet-dragging');

  			this._lastTarget = e.target || e.srcElement;
  			// IE and Edge do not give the <use> element, so fetch it
  			// if necessary
  			if (window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance) {
  				this._lastTarget = this._lastTarget.correspondingUseElement;
  			}
  			addClass(this._lastTarget, 'leaflet-drag-target');
  		}

  		this._newPos = this._startPos.add(offset);
  		this._moving = true;

  		cancelAnimFrame(this._animRequest);
  		this._lastEvent = e;
  		this._animRequest = requestAnimFrame(this._updatePosition, this, true);
  	},

  	_updatePosition: function () {
  		var e = {originalEvent: this._lastEvent};

  		// @event predrag: Event
  		// Fired continuously during dragging *before* each corresponding
  		// update of the element's position.
  		this.fire('predrag', e);
  		setPosition(this._element, this._newPos);

  		// @event drag: Event
  		// Fired continuously during dragging.
  		this.fire('drag', e);
  	},

  	_onUp: function (e) {
  		// Ignore simulated events, since we handle both touch and
  		// mouse explicitly; otherwise we risk getting duplicates of
  		// touch events, see #4315.
  		// Also ignore the event if disabled; this happens in IE11
  		// under some circumstances, see #3666.
  		if (e._simulated || !this._enabled) { return; }
  		this.finishDrag();
  	},

  	finishDrag: function () {
  		removeClass(document.body, 'leaflet-dragging');

  		if (this._lastTarget) {
  			removeClass(this._lastTarget, 'leaflet-drag-target');
  			this._lastTarget = null;
  		}

  		for (var i in MOVE) {
  			off(document, MOVE[i], this._onMove, this);
  			off(document, END[i], this._onUp, this);
  		}

  		enableImageDrag();
  		enableTextSelection();

  		if (this._moved && this._moving) {
  			// ensure drag is not fired after dragend
  			cancelAnimFrame(this._animRequest);

  			// @event dragend: DragEndEvent
  			// Fired when the drag ends.
  			this.fire('dragend', {
  				distance: this._newPos.distanceTo(this._startPos)
  			});
  		}

  		this._moving = false;
  		Draggable._dragging = false;
  	}

  });

  /*
   * @namespace LineUtil
   *
   * Various utility functions for polyline points processing, used by Leaflet internally to make polylines lightning-fast.
   */

  // Simplify polyline with vertex reduction and Douglas-Peucker simplification.
  // Improves rendering performance dramatically by lessening the number of points to draw.

  // @function simplify(points: Point[], tolerance: Number): Point[]
  // Dramatically reduces the number of points in a polyline while retaining
  // its shape and returns a new array of simplified points, using the
  // [Douglas-Peucker algorithm](http://en.wikipedia.org/wiki/Douglas-Peucker_algorithm).
  // Used for a huge performance boost when processing/displaying Leaflet polylines for
  // each zoom level and also reducing visual noise. tolerance affects the amount of
  // simplification (lesser value means higher quality but slower and with more points).
  // Also released as a separated micro-library [Simplify.js](http://mourner.github.com/simplify-js/).
  function simplify(points, tolerance) {
  	if (!tolerance || !points.length) {
  		return points.slice();
  	}

  	var sqTolerance = tolerance * tolerance;

  	    // stage 1: vertex reduction
  	    points = _reducePoints(points, sqTolerance);

  	    // stage 2: Douglas-Peucker simplification
  	    points = _simplifyDP(points, sqTolerance);

  	return points;
  }

  // @function pointToSegmentDistance(p: Point, p1: Point, p2: Point): Number
  // Returns the distance between point `p` and segment `p1` to `p2`.
  function pointToSegmentDistance(p, p1, p2) {
  	return Math.sqrt(_sqClosestPointOnSegment(p, p1, p2, true));
  }

  // @function closestPointOnSegment(p: Point, p1: Point, p2: Point): Number
  // Returns the closest point from a point `p` on a segment `p1` to `p2`.
  function closestPointOnSegment(p, p1, p2) {
  	return _sqClosestPointOnSegment(p, p1, p2);
  }

  // Douglas-Peucker simplification, see http://en.wikipedia.org/wiki/Douglas-Peucker_algorithm
  function _simplifyDP(points, sqTolerance) {

  	var len = points.length,
  	    ArrayConstructor = typeof Uint8Array !== undefined + '' ? Uint8Array : Array,
  	    markers = new ArrayConstructor(len);

  	    markers[0] = markers[len - 1] = 1;

  	_simplifyDPStep(points, markers, sqTolerance, 0, len - 1);

  	var i,
  	    newPoints = [];

  	for (i = 0; i < len; i++) {
  		if (markers[i]) {
  			newPoints.push(points[i]);
  		}
  	}

  	return newPoints;
  }

  function _simplifyDPStep(points, markers, sqTolerance, first, last) {

  	var maxSqDist = 0,
  	index, i, sqDist;

  	for (i = first + 1; i <= last - 1; i++) {
  		sqDist = _sqClosestPointOnSegment(points[i], points[first], points[last], true);

  		if (sqDist > maxSqDist) {
  			index = i;
  			maxSqDist = sqDist;
  		}
  	}

  	if (maxSqDist > sqTolerance) {
  		markers[index] = 1;

  		_simplifyDPStep(points, markers, sqTolerance, first, index);
  		_simplifyDPStep(points, markers, sqTolerance, index, last);
  	}
  }

  // reduce points that are too close to each other to a single point
  function _reducePoints(points, sqTolerance) {
  	var reducedPoints = [points[0]];

  	for (var i = 1, prev = 0, len = points.length; i < len; i++) {
  		if (_sqDist(points[i], points[prev]) > sqTolerance) {
  			reducedPoints.push(points[i]);
  			prev = i;
  		}
  	}
  	if (prev < len - 1) {
  		reducedPoints.push(points[len - 1]);
  	}
  	return reducedPoints;
  }

  var _lastCode;

  // @function clipSegment(a: Point, b: Point, bounds: Bounds, useLastCode?: Boolean, round?: Boolean): Point[]|Boolean
  // Clips the segment a to b by rectangular bounds with the
  // [Cohen-Sutherland algorithm](https://en.wikipedia.org/wiki/Cohen%E2%80%93Sutherland_algorithm)
  // (modifying the segment points directly!). Used by Leaflet to only show polyline
  // points that are on the screen or near, increasing performance.
  function clipSegment(a, b, bounds, useLastCode, round) {
  	var codeA = useLastCode ? _lastCode : _getBitCode(a, bounds),
  	    codeB = _getBitCode(b, bounds),

  	    codeOut, p, newCode;

  	    // save 2nd code to avoid calculating it on the next segment
  	    _lastCode = codeB;

  	while (true) {
  		// if a,b is inside the clip window (trivial accept)
  		if (!(codeA | codeB)) {
  			return [a, b];
  		}

  		// if a,b is outside the clip window (trivial reject)
  		if (codeA & codeB) {
  			return false;
  		}

  		// other cases
  		codeOut = codeA || codeB;
  		p = _getEdgeIntersection(a, b, codeOut, bounds, round);
  		newCode = _getBitCode(p, bounds);

  		if (codeOut === codeA) {
  			a = p;
  			codeA = newCode;
  		} else {
  			b = p;
  			codeB = newCode;
  		}
  	}
  }

  function _getEdgeIntersection(a, b, code, bounds, round) {
  	var dx = b.x - a.x,
  	    dy = b.y - a.y,
  	    min = bounds.min,
  	    max = bounds.max,
  	    x, y;

  	if (code & 8) { // top
  		x = a.x + dx * (max.y - a.y) / dy;
  		y = max.y;

  	} else if (code & 4) { // bottom
  		x = a.x + dx * (min.y - a.y) / dy;
  		y = min.y;

  	} else if (code & 2) { // right
  		x = max.x;
  		y = a.y + dy * (max.x - a.x) / dx;

  	} else if (code & 1) { // left
  		x = min.x;
  		y = a.y + dy * (min.x - a.x) / dx;
  	}

  	return new Point(x, y, round);
  }

  function _getBitCode(p, bounds) {
  	var code = 0;

  	if (p.x < bounds.min.x) { // left
  		code |= 1;
  	} else if (p.x > bounds.max.x) { // right
  		code |= 2;
  	}

  	if (p.y < bounds.min.y) { // bottom
  		code |= 4;
  	} else if (p.y > bounds.max.y) { // top
  		code |= 8;
  	}

  	return code;
  }

  // square distance (to avoid unnecessary Math.sqrt calls)
  function _sqDist(p1, p2) {
  	var dx = p2.x - p1.x,
  	    dy = p2.y - p1.y;
  	return dx * dx + dy * dy;
  }

  // return closest point on segment or distance to that point
  function _sqClosestPointOnSegment(p, p1, p2, sqDist) {
  	var x = p1.x,
  	    y = p1.y,
  	    dx = p2.x - x,
  	    dy = p2.y - y,
  	    dot = dx * dx + dy * dy,
  	    t;

  	if (dot > 0) {
  		t = ((p.x - x) * dx + (p.y - y) * dy) / dot;

  		if (t > 1) {
  			x = p2.x;
  			y = p2.y;
  		} else if (t > 0) {
  			x += dx * t;
  			y += dy * t;
  		}
  	}

  	dx = p.x - x;
  	dy = p.y - y;

  	return sqDist ? dx * dx + dy * dy : new Point(x, y);
  }


  // @function isFlat(latlngs: LatLng[]): Boolean
  // Returns true if `latlngs` is a flat array, false is nested.
  function isFlat(latlngs) {
  	return !isArray(latlngs[0]) || (typeof latlngs[0][0] !== 'object' && typeof latlngs[0][0] !== 'undefined');
  }

  function _flat(latlngs) {
  	console.warn('Deprecated use of _flat, please use L.LineUtil.isFlat instead.');
  	return isFlat(latlngs);
  }

  var LineUtil = ({
    simplify: simplify,
    pointToSegmentDistance: pointToSegmentDistance,
    closestPointOnSegment: closestPointOnSegment,
    clipSegment: clipSegment,
    _getEdgeIntersection: _getEdgeIntersection,
    _getBitCode: _getBitCode,
    _sqClosestPointOnSegment: _sqClosestPointOnSegment,
    isFlat: isFlat,
    _flat: _flat
  });

  /*
   * @namespace PolyUtil
   * Various utility functions for polygon geometries.
   */

  /* @function clipPolygon(points: Point[], bounds: Bounds, round?: Boolean): Point[]
   * Clips the polygon geometry defined by the given `points` by the given bounds (using the [Sutherland-Hodgman algorithm](https://en.wikipedia.org/wiki/Sutherland%E2%80%93Hodgman_algorithm)).
   * Used by Leaflet to only show polygon points that are on the screen or near, increasing
   * performance. Note that polygon points needs different algorithm for clipping
   * than polyline, so there's a separate method for it.
   */
  function clipPolygon(points, bounds, round) {
  	var clippedPoints,
  	    edges = [1, 4, 2, 8],
  	    i, j, k,
  	    a, b,
  	    len, edge, p;

  	for (i = 0, len = points.length; i < len; i++) {
  		points[i]._code = _getBitCode(points[i], bounds);
  	}

  	// for each edge (left, bottom, right, top)
  	for (k = 0; k < 4; k++) {
  		edge = edges[k];
  		clippedPoints = [];

  		for (i = 0, len = points.length, j = len - 1; i < len; j = i++) {
  			a = points[i];
  			b = points[j];

  			// if a is inside the clip window
  			if (!(a._code & edge)) {
  				// if b is outside the clip window (a->b goes out of screen)
  				if (b._code & edge) {
  					p = _getEdgeIntersection(b, a, edge, bounds, round);
  					p._code = _getBitCode(p, bounds);
  					clippedPoints.push(p);
  				}
  				clippedPoints.push(a);

  			// else if b is inside the clip window (a->b enters the screen)
  			} else if (!(b._code & edge)) {
  				p = _getEdgeIntersection(b, a, edge, bounds, round);
  				p._code = _getBitCode(p, bounds);
  				clippedPoints.push(p);
  			}
  		}
  		points = clippedPoints;
  	}

  	return points;
  }

  var PolyUtil = ({
    clipPolygon: clipPolygon
  });

  /*
   * @namespace Projection
   * @section
   * Leaflet comes with a set of already defined Projections out of the box:
   *
   * @projection L.Projection.LonLat
   *
   * Equirectangular, or Plate Carree projection — the most simple projection,
   * mostly used by GIS enthusiasts. Directly maps `x` as longitude, and `y` as
   * latitude. Also suitable for flat worlds, e.g. game maps. Used by the
   * `EPSG:4326` and `Simple` CRS.
   */

  var LonLat = {
  	project: function (latlng) {
  		return new Point(latlng.lng, latlng.lat);
  	},

  	unproject: function (point) {
  		return new LatLng(point.y, point.x);
  	},

  	bounds: new Bounds([-180, -90], [180, 90])
  };

  /*
   * @namespace Projection
   * @projection L.Projection.Mercator
   *
   * Elliptical Mercator projection — more complex than Spherical Mercator. Assumes that Earth is an ellipsoid. Used by the EPSG:3395 CRS.
   */

  var Mercator = {
  	R: 6378137,
  	R_MINOR: 6356752.314245179,

  	bounds: new Bounds([-20037508.34279, -15496570.73972], [20037508.34279, 18764656.23138]),

  	project: function (latlng) {
  		var d = Math.PI / 180,
  		    r = this.R,
  		    y = latlng.lat * d,
  		    tmp = this.R_MINOR / r,
  		    e = Math.sqrt(1 - tmp * tmp),
  		    con = e * Math.sin(y);

  		var ts = Math.tan(Math.PI / 4 - y / 2) / Math.pow((1 - con) / (1 + con), e / 2);
  		y = -r * Math.log(Math.max(ts, 1E-10));

  		return new Point(latlng.lng * d * r, y);
  	},

  	unproject: function (point) {
  		var d = 180 / Math.PI,
  		    r = this.R,
  		    tmp = this.R_MINOR / r,
  		    e = Math.sqrt(1 - tmp * tmp),
  		    ts = Math.exp(-point.y / r),
  		    phi = Math.PI / 2 - 2 * Math.atan(ts);

  		for (var i = 0, dphi = 0.1, con; i < 15 && Math.abs(dphi) > 1e-7; i++) {
  			con = e * Math.sin(phi);
  			con = Math.pow((1 - con) / (1 + con), e / 2);
  			dphi = Math.PI / 2 - 2 * Math.atan(ts * con) - phi;
  			phi += dphi;
  		}

  		return new LatLng(phi * d, point.x * d / r);
  	}
  };

  /*
   * @class Projection

   * An object with methods for projecting geographical coordinates of the world onto
   * a flat surface (and back). See [Map projection](http://en.wikipedia.org/wiki/Map_projection).

   * @property bounds: Bounds
   * The bounds (specified in CRS units) where the projection is valid

   * @method project(latlng: LatLng): Point
   * Projects geographical coordinates into a 2D point.
   * Only accepts actual `L.LatLng` instances, not arrays.

   * @method unproject(point: Point): LatLng
   * The inverse of `project`. Projects a 2D point into a geographical location.
   * Only accepts actual `L.Point` instances, not arrays.

   * Note that the projection instances do not inherit from Leaflet's `Class` object,
   * and can't be instantiated. Also, new classes can't inherit from them,
   * and methods can't be added to them with the `include` function.

   */

  var index = ({
    LonLat: LonLat,
    Mercator: Mercator,
    SphericalMercator: SphericalMercator
  });

  /*
   * @namespace CRS
   * @crs L.CRS.EPSG3395
   *
   * Rarely used by some commercial tile providers. Uses Elliptical Mercator projection.
   */
  var EPSG3395 = extend({}, Earth, {
  	code: 'EPSG:3395',
  	projection: Mercator,

  	transformation: (function () {
  		var scale = 0.5 / (Math.PI * Mercator.R);
  		return toTransformation(scale, 0.5, -scale, 0.5);
  	}())
  });

  /*
   * @namespace CRS
   * @crs L.CRS.EPSG4326
   *
   * A common CRS among GIS enthusiasts. Uses simple Equirectangular projection.
   *
   * Leaflet 1.0.x complies with the [TMS coordinate scheme for EPSG:4326](https://wiki.osgeo.org/wiki/Tile_Map_Service_Specification#global-geodetic),
   * which is a breaking change from 0.7.x behaviour.  If you are using a `TileLayer`
   * with this CRS, ensure that there are two 256x256 pixel tiles covering the
   * whole earth at zoom level zero, and that the tile coordinate origin is (-180,+90),
   * or (-180,-90) for `TileLayer`s with [the `tms` option](#tilelayer-tms) set.
   */

  var EPSG4326 = extend({}, Earth, {
  	code: 'EPSG:4326',
  	projection: LonLat,
  	transformation: toTransformation(1 / 180, 1, -1 / 180, 0.5)
  });

  /*
   * @namespace CRS
   * @crs L.CRS.Simple
   *
   * A simple CRS that maps longitude and latitude into `x` and `y` directly.
   * May be used for maps of flat surfaces (e.g. game maps). Note that the `y`
   * axis should still be inverted (going from bottom to top). `distance()` returns
   * simple euclidean distance.
   */

  var Simple = extend({}, CRS, {
  	projection: LonLat,
  	transformation: toTransformation(1, 0, -1, 0),

  	scale: function (zoom) {
  		return Math.pow(2, zoom);
  	},

  	zoom: function (scale) {
  		return Math.log(scale) / Math.LN2;
  	},

  	distance: function (latlng1, latlng2) {
  		var dx = latlng2.lng - latlng1.lng,
  		    dy = latlng2.lat - latlng1.lat;

  		return Math.sqrt(dx * dx + dy * dy);
  	},

  	infinite: true
  });

  CRS.Earth = Earth;
  CRS.EPSG3395 = EPSG3395;
  CRS.EPSG3857 = EPSG3857;
  CRS.EPSG900913 = EPSG900913;
  CRS.EPSG4326 = EPSG4326;
  CRS.Simple = Simple;

  /*
   * @class Layer
   * @inherits Evented
   * @aka L.Layer
   * @aka ILayer
   *
   * A set of methods from the Layer base class that all Leaflet layers use.
   * Inherits all methods, options and events from `L.Evented`.
   *
   * @example
   *
   * ```js
   * var layer = L.marker(latlng).addTo(map);
   * layer.addTo(map);
   * layer.remove();
   * ```
   *
   * @event add: Event
   * Fired after the layer is added to a map
   *
   * @event remove: Event
   * Fired after the layer is removed from a map
   */


  var Layer = Evented.extend({

  	// Classes extending `L.Layer` will inherit the following options:
  	options: {
  		// @option pane: String = 'overlayPane'
  		// By default the layer will be added to the map's [overlay pane](#map-overlaypane). Overriding this option will cause the layer to be placed on another pane by default.
  		pane: 'overlayPane',

  		// @option attribution: String = null
  		// String to be shown in the attribution control, e.g. "© OpenStreetMap contributors". It describes the layer data and is often a legal obligation towards copyright holders and tile providers.
  		attribution: null,

  		bubblingMouseEvents: true
  	},

  	/* @section
  	 * Classes extending `L.Layer` will inherit the following methods:
  	 *
  	 * @method addTo(map: Map|LayerGroup): this
  	 * Adds the layer to the given map or layer group.
  	 */
  	addTo: function (map) {
  		map.addLayer(this);
  		return this;
  	},

  	// @method remove: this
  	// Removes the layer from the map it is currently active on.
  	remove: function () {
  		return this.removeFrom(this._map || this._mapToAdd);
  	},

  	// @method removeFrom(map: Map): this
  	// Removes the layer from the given map
  	//
  	// @alternative
  	// @method removeFrom(group: LayerGroup): this
  	// Removes the layer from the given `LayerGroup`
  	removeFrom: function (obj) {
  		if (obj) {
  			obj.removeLayer(this);
  		}
  		return this;
  	},

  	// @method getPane(name? : String): HTMLElement
  	// Returns the `HTMLElement` representing the named pane on the map. If `name` is omitted, returns the pane for this layer.
  	getPane: function (name) {
  		return this._map.getPane(name ? (this.options[name] || name) : this.options.pane);
  	},

  	addInteractiveTarget: function (targetEl) {
  		this._map._targets[stamp(targetEl)] = this;
  		return this;
  	},

  	removeInteractiveTarget: function (targetEl) {
  		delete this._map._targets[stamp(targetEl)];
  		return this;
  	},

  	// @method getAttribution: String
  	// Used by the `attribution control`, returns the [attribution option](#gridlayer-attribution).
  	getAttribution: function () {
  		return this.options.attribution;
  	},

  	_layerAdd: function (e) {
  		var map = e.target;

  		// check in case layer gets added and then removed before the map is ready
  		if (!map.hasLayer(this)) { return; }

  		this._map = map;
  		this._zoomAnimated = map._zoomAnimated;

  		if (this.getEvents) {
  			var events = this.getEvents();
  			map.on(events, this);
  			this.once('remove', function () {
  				map.off(events, this);
  			}, this);
  		}

  		this.onAdd(map);

  		if (this.getAttribution && map.attributionControl) {
  			map.attributionControl.addAttribution(this.getAttribution());
  		}

  		this.fire('add');
  		map.fire('layeradd', {layer: this});
  	}
  });

  /* @section Extension methods
   * @uninheritable
   *
   * Every layer should extend from `L.Layer` and (re-)implement the following methods.
   *
   * @method onAdd(map: Map): this
   * Should contain code that creates DOM elements for the layer, adds them to `map panes` where they should belong and puts listeners on relevant map events. Called on [`map.addLayer(layer)`](#map-addlayer).
   *
   * @method onRemove(map: Map): this
   * Should contain all clean up code that removes the layer's elements from the DOM and removes listeners previously added in [`onAdd`](#layer-onadd). Called on [`map.removeLayer(layer)`](#map-removelayer).
   *
   * @method getEvents(): Object
   * This optional method should return an object like `{ viewreset: this._reset }` for [`addEventListener`](#evented-addeventlistener). The event handlers in this object will be automatically added and removed from the map with your layer.
   *
   * @method getAttribution(): String
   * This optional method should return a string containing HTML to be shown on the `Attribution control` whenever the layer is visible.
   *
   * @method beforeAdd(map: Map): this
   * Optional method. Called on [`map.addLayer(layer)`](#map-addlayer), before the layer is added to the map, before events are initialized, without waiting until the map is in a usable state. Use for early initialization only.
   */


  /* @namespace Map
   * @section Layer events
   *
   * @event layeradd: LayerEvent
   * Fired when a new layer is added to the map.
   *
   * @event layerremove: LayerEvent
   * Fired when some layer is removed from the map
   *
   * @section Methods for Layers and Controls
   */
  Map.include({
  	// @method addLayer(layer: Layer): this
  	// Adds the given layer to the map
  	addLayer: function (layer) {
  		if (!layer._layerAdd) {
  			throw new Error('The provided object is not a Layer.');
  		}

  		var id = stamp(layer);
  		if (this._layers[id]) { return this; }
  		this._layers[id] = layer;

  		layer._mapToAdd = this;

  		if (layer.beforeAdd) {
  			layer.beforeAdd(this);
  		}

  		this.whenReady(layer._layerAdd, layer);

  		return this;
  	},

  	// @method removeLayer(layer: Layer): this
  	// Removes the given layer from the map.
  	removeLayer: function (layer) {
  		var id = stamp(layer);

  		if (!this._layers[id]) { return this; }

  		if (this._loaded) {
  			layer.onRemove(this);
  		}

  		if (layer.getAttribution && this.attributionControl) {
  			this.attributionControl.removeAttribution(layer.getAttribution());
  		}

  		delete this._layers[id];

  		if (this._loaded) {
  			this.fire('layerremove', {layer: layer});
  			layer.fire('remove');
  		}

  		layer._map = layer._mapToAdd = null;

  		return this;
  	},

  	// @method hasLayer(layer: Layer): Boolean
  	// Returns `true` if the given layer is currently added to the map
  	hasLayer: function (layer) {
  		return !!layer && (stamp(layer) in this._layers);
  	},

  	/* @method eachLayer(fn: Function, context?: Object): this
  	 * Iterates over the layers of the map, optionally specifying context of the iterator function.
  	 * ```
  	 * map.eachLayer(function(layer){
  	 *     layer.bindPopup('Hello');
  	 * });
  	 * ```
  	 */
  	eachLayer: function (method, context) {
  		for (var i in this._layers) {
  			method.call(context, this._layers[i]);
  		}
  		return this;
  	},

  	_addLayers: function (layers) {
  		layers = layers ? (isArray(layers) ? layers : [layers]) : [];

  		for (var i = 0, len = layers.length; i < len; i++) {
  			this.addLayer(layers[i]);
  		}
  	},

  	_addZoomLimit: function (layer) {
  		if (isNaN(layer.options.maxZoom) || !isNaN(layer.options.minZoom)) {
  			this._zoomBoundLayers[stamp(layer)] = layer;
  			this._updateZoomLevels();
  		}
  	},

  	_removeZoomLimit: function (layer) {
  		var id = stamp(layer);

  		if (this._zoomBoundLayers[id]) {
  			delete this._zoomBoundLayers[id];
  			this._updateZoomLevels();
  		}
  	},

  	_updateZoomLevels: function () {
  		var minZoom = Infinity,
  		    maxZoom = -Infinity,
  		    oldZoomSpan = this._getZoomSpan();

  		for (var i in this._zoomBoundLayers) {
  			var options = this._zoomBoundLayers[i].options;

  			minZoom = options.minZoom === undefined ? minZoom : Math.min(minZoom, options.minZoom);
  			maxZoom = options.maxZoom === undefined ? maxZoom : Math.max(maxZoom, options.maxZoom);
  		}

  		this._layersMaxZoom = maxZoom === -Infinity ? undefined : maxZoom;
  		this._layersMinZoom = minZoom === Infinity ? undefined : minZoom;

  		// @section Map state change events
  		// @event zoomlevelschange: Event
  		// Fired when the number of zoomlevels on the map is changed due
  		// to adding or removing a layer.
  		if (oldZoomSpan !== this._getZoomSpan()) {
  			this.fire('zoomlevelschange');
  		}

  		if (this.options.maxZoom === undefined && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom) {
  			this.setZoom(this._layersMaxZoom);
  		}
  		if (this.options.minZoom === undefined && this._layersMinZoom && this.getZoom() < this._layersMinZoom) {
  			this.setZoom(this._layersMinZoom);
  		}
  	}
  });

  /*
   * @class LayerGroup
   * @aka L.LayerGroup
   * @inherits Layer
   *
   * Used to group several layers and handle them as one. If you add it to the map,
   * any layers added or removed from the group will be added/removed on the map as
   * well. Extends `Layer`.
   *
   * @example
   *
   * ```js
   * L.layerGroup([marker1, marker2])
   * 	.addLayer(polyline)
   * 	.addTo(map);
   * ```
   */

  var LayerGroup = Layer.extend({

  	initialize: function (layers, options) {
  		setOptions(this, options);

  		this._layers = {};

  		var i, len;

  		if (layers) {
  			for (i = 0, len = layers.length; i < len; i++) {
  				this.addLayer(layers[i]);
  			}
  		}
  	},

  	// @method addLayer(layer: Layer): this
  	// Adds the given layer to the group.
  	addLayer: function (layer) {
  		var id = this.getLayerId(layer);

  		this._layers[id] = layer;

  		if (this._map) {
  			this._map.addLayer(layer);
  		}

  		return this;
  	},

  	// @method removeLayer(layer: Layer): this
  	// Removes the given layer from the group.
  	// @alternative
  	// @method removeLayer(id: Number): this
  	// Removes the layer with the given internal ID from the group.
  	removeLayer: function (layer) {
  		var id = layer in this._layers ? layer : this.getLayerId(layer);

  		if (this._map && this._layers[id]) {
  			this._map.removeLayer(this._layers[id]);
  		}

  		delete this._layers[id];

  		return this;
  	},

  	// @method hasLayer(layer: Layer): Boolean
  	// Returns `true` if the given layer is currently added to the group.
  	// @alternative
  	// @method hasLayer(id: Number): Boolean
  	// Returns `true` if the given internal ID is currently added to the group.
  	hasLayer: function (layer) {
  		if (!layer) { return false; }
  		var layerId = typeof layer === 'number' ? layer : this.getLayerId(layer);
  		return layerId in this._layers;
  	},

  	// @method clearLayers(): this
  	// Removes all the layers from the group.
  	clearLayers: function () {
  		return this.eachLayer(this.removeLayer, this);
  	},

  	// @method invoke(methodName: String, …): this
  	// Calls `methodName` on every layer contained in this group, passing any
  	// additional parameters. Has no effect if the layers contained do not
  	// implement `methodName`.
  	invoke: function (methodName) {
  		var args = Array.prototype.slice.call(arguments, 1),
  		    i, layer;

  		for (i in this._layers) {
  			layer = this._layers[i];

  			if (layer[methodName]) {
  				layer[methodName].apply(layer, args);
  			}
  		}

  		return this;
  	},

  	onAdd: function (map) {
  		this.eachLayer(map.addLayer, map);
  	},

  	onRemove: function (map) {
  		this.eachLayer(map.removeLayer, map);
  	},

  	// @method eachLayer(fn: Function, context?: Object): this
  	// Iterates over the layers of the group, optionally specifying context of the iterator function.
  	// ```js
  	// group.eachLayer(function (layer) {
  	// 	layer.bindPopup('Hello');
  	// });
  	// ```
  	eachLayer: function (method, context) {
  		for (var i in this._layers) {
  			method.call(context, this._layers[i]);
  		}
  		return this;
  	},

  	// @method getLayer(id: Number): Layer
  	// Returns the layer with the given internal ID.
  	getLayer: function (id) {
  		return this._layers[id];
  	},

  	// @method getLayers(): Layer[]
  	// Returns an array of all the layers added to the group.
  	getLayers: function () {
  		var layers = [];
  		this.eachLayer(layers.push, layers);
  		return layers;
  	},

  	// @method setZIndex(zIndex: Number): this
  	// Calls `setZIndex` on every layer contained in this group, passing the z-index.
  	setZIndex: function (zIndex) {
  		return this.invoke('setZIndex', zIndex);
  	},

  	// @method getLayerId(layer: Layer): Number
  	// Returns the internal ID for a layer
  	getLayerId: function (layer) {
  		return stamp(layer);
  	}
  });


  // @factory L.layerGroup(layers?: Layer[], options?: Object)
  // Create a layer group, optionally given an initial set of layers and an `options` object.
  var layerGroup = function (layers, options) {
  	return new LayerGroup(layers, options);
  };

  /*
   * @class FeatureGroup
   * @aka L.FeatureGroup
   * @inherits LayerGroup
   *
   * Extended `LayerGroup` that makes it easier to do the same thing to all its member layers:
   *  * [`bindPopup`](#layer-bindpopup) binds a popup to all of the layers at once (likewise with [`bindTooltip`](#layer-bindtooltip))
   *  * Events are propagated to the `FeatureGroup`, so if the group has an event
   * handler, it will handle events from any of the layers. This includes mouse events
   * and custom events.
   *  * Has `layeradd` and `layerremove` events
   *
   * @example
   *
   * ```js
   * L.featureGroup([marker1, marker2, polyline])
   * 	.bindPopup('Hello world!')
   * 	.on('click', function() { alert('Clicked on a member of the group!'); })
   * 	.addTo(map);
   * ```
   */

  var FeatureGroup = LayerGroup.extend({

  	addLayer: function (layer) {
  		if (this.hasLayer(layer)) {
  			return this;
  		}

  		layer.addEventParent(this);

  		LayerGroup.prototype.addLayer.call(this, layer);

  		// @event layeradd: LayerEvent
  		// Fired when a layer is added to this `FeatureGroup`
  		return this.fire('layeradd', {layer: layer});
  	},

  	removeLayer: function (layer) {
  		if (!this.hasLayer(layer)) {
  			return this;
  		}
  		if (layer in this._layers) {
  			layer = this._layers[layer];
  		}

  		layer.removeEventParent(this);

  		LayerGroup.prototype.removeLayer.call(this, layer);

  		// @event layerremove: LayerEvent
  		// Fired when a layer is removed from this `FeatureGroup`
  		return this.fire('layerremove', {layer: layer});
  	},

  	// @method setStyle(style: Path options): this
  	// Sets the given path options to each layer of the group that has a `setStyle` method.
  	setStyle: function (style) {
  		return this.invoke('setStyle', style);
  	},

  	// @method bringToFront(): this
  	// Brings the layer group to the top of all other layers
  	bringToFront: function () {
  		return this.invoke('bringToFront');
  	},

  	// @method bringToBack(): this
  	// Brings the layer group to the back of all other layers
  	bringToBack: function () {
  		return this.invoke('bringToBack');
  	},

  	// @method getBounds(): LatLngBounds
  	// Returns the LatLngBounds of the Feature Group (created from bounds and coordinates of its children).
  	getBounds: function () {
  		var bounds = new LatLngBounds();

  		for (var id in this._layers) {
  			var layer = this._layers[id];
  			bounds.extend(layer.getBounds ? layer.getBounds() : layer.getLatLng());
  		}
  		return bounds;
  	}
  });

  // @factory L.featureGroup(layers?: Layer[], options?: Object)
  // Create a feature group, optionally given an initial set of layers and an `options` object.
  var featureGroup = function (layers, options) {
  	return new FeatureGroup(layers, options);
  };

  /*
   * @class Icon
   * @aka L.Icon
   *
   * Represents an icon to provide when creating a marker.
   *
   * @example
   *
   * ```js
   * var myIcon = L.icon({
   *     iconUrl: 'my-icon.png',
   *     iconRetinaUrl: 'my-icon@2x.png',
   *     iconSize: [38, 95],
   *     iconAnchor: [22, 94],
   *     popupAnchor: [-3, -76],
   *     shadowUrl: 'my-icon-shadow.png',
   *     shadowRetinaUrl: 'my-icon-shadow@2x.png',
   *     shadowSize: [68, 95],
   *     shadowAnchor: [22, 94]
   * });
   *
   * L.marker([50.505, 30.57], {icon: myIcon}).addTo(map);
   * ```
   *
   * `L.Icon.Default` extends `L.Icon` and is the blue icon Leaflet uses for markers by default.
   *
   */

  var Icon = Class.extend({

  	/* @section
  	 * @aka Icon options
  	 *
  	 * @option iconUrl: String = null
  	 * **(required)** The URL to the icon image (absolute or relative to your script path).
  	 *
  	 * @option iconRetinaUrl: String = null
  	 * The URL to a retina sized version of the icon image (absolute or relative to your
  	 * script path). Used for Retina screen devices.
  	 *
  	 * @option iconSize: Point = null
  	 * Size of the icon image in pixels.
  	 *
  	 * @option iconAnchor: Point = null
  	 * The coordinates of the "tip" of the icon (relative to its top left corner). The icon
  	 * will be aligned so that this point is at the marker's geographical location. Centered
  	 * by default if size is specified, also can be set in CSS with negative margins.
  	 *
  	 * @option popupAnchor: Point = [0, 0]
  	 * The coordinates of the point from which popups will "open", relative to the icon anchor.
  	 *
  	 * @option tooltipAnchor: Point = [0, 0]
  	 * The coordinates of the point from which tooltips will "open", relative to the icon anchor.
  	 *
  	 * @option shadowUrl: String = null
  	 * The URL to the icon shadow image. If not specified, no shadow image will be created.
  	 *
  	 * @option shadowRetinaUrl: String = null
  	 *
  	 * @option shadowSize: Point = null
  	 * Size of the shadow image in pixels.
  	 *
  	 * @option shadowAnchor: Point = null
  	 * The coordinates of the "tip" of the shadow (relative to its top left corner) (the same
  	 * as iconAnchor if not specified).
  	 *
  	 * @option className: String = ''
  	 * A custom class name to assign to both icon and shadow images. Empty by default.
  	 */

  	options: {
  		popupAnchor: [0, 0],
  		tooltipAnchor: [0, 0]
  	},

  	initialize: function (options) {
  		setOptions(this, options);
  	},

  	// @method createIcon(oldIcon?: HTMLElement): HTMLElement
  	// Called internally when the icon has to be shown, returns a `<img>` HTML element
  	// styled according to the options.
  	createIcon: function (oldIcon) {
  		return this._createIcon('icon', oldIcon);
  	},

  	// @method createShadow(oldIcon?: HTMLElement): HTMLElement
  	// As `createIcon`, but for the shadow beneath it.
  	createShadow: function (oldIcon) {
  		return this._createIcon('shadow', oldIcon);
  	},

  	_createIcon: function (name, oldIcon) {
  		var src = this._getIconUrl(name);

  		if (!src) {
  			if (name === 'icon') {
  				throw new Error('iconUrl not set in Icon options (see the docs).');
  			}
  			return null;
  		}

  		var img = this._createImg(src, oldIcon && oldIcon.tagName === 'IMG' ? oldIcon : null);
  		this._setIconStyles(img, name);

  		return img;
  	},

  	_setIconStyles: function (img, name) {
  		var options = this.options;
  		var sizeOption = options[name + 'Size'];

  		if (typeof sizeOption === 'number') {
  			sizeOption = [sizeOption, sizeOption];
  		}

  		var size = toPoint(sizeOption),
  		    anchor = toPoint(name === 'shadow' && options.shadowAnchor || options.iconAnchor ||
  		            size && size.divideBy(2, true));

  		img.className = 'leaflet-marker-' + name + ' ' + (options.className || '');

  		if (anchor) {
  			img.style.marginLeft = (-anchor.x) + 'px';
  			img.style.marginTop  = (-anchor.y) + 'px';
  		}

  		if (size) {
  			img.style.width  = size.x + 'px';
  			img.style.height = size.y + 'px';
  		}
  	},

  	_createImg: function (src, el) {
  		el = el || document.createElement('img');
  		el.src = src;
  		return el;
  	},

  	_getIconUrl: function (name) {
  		return retina && this.options[name + 'RetinaUrl'] || this.options[name + 'Url'];
  	}
  });


  // @factory L.icon(options: Icon options)
  // Creates an icon instance with the given options.
  function icon(options) {
  	return new Icon(options);
  }

  /*
   * @miniclass Icon.Default (Icon)
   * @aka L.Icon.Default
   * @section
   *
   * A trivial subclass of `Icon`, represents the icon to use in `Marker`s when
   * no icon is specified. Points to the blue marker image distributed with Leaflet
   * releases.
   *
   * In order to customize the default icon, just change the properties of `L.Icon.Default.prototype.options`
   * (which is a set of `Icon options`).
   *
   * If you want to _completely_ replace the default icon, override the
   * `L.Marker.prototype.options.icon` with your own icon instead.
   */

  var IconDefault = Icon.extend({

  	options: {
  		iconUrl:       'marker-icon.png',
  		iconRetinaUrl: 'marker-icon-2x.png',
  		shadowUrl:     'marker-shadow.png',
  		iconSize:    [25, 41],
  		iconAnchor:  [12, 41],
  		popupAnchor: [1, -34],
  		tooltipAnchor: [16, -28],
  		shadowSize:  [41, 41]
  	},

  	_getIconUrl: function (name) {
  		if (!IconDefault.imagePath) {	// Deprecated, backwards-compatibility only
  			IconDefault.imagePath = this._detectIconPath();
  		}

  		// @option imagePath: String
  		// `Icon.Default` will try to auto-detect the location of the
  		// blue icon images. If you are placing these images in a non-standard
  		// way, set this option to point to the right path.
  		return (this.options.imagePath || IconDefault.imagePath) + Icon.prototype._getIconUrl.call(this, name);
  	},

  	_detectIconPath: function () {
  		var el = create$1('div',  'leaflet-default-icon-path', document.body);
  		var path = getStyle(el, 'background-image') ||
  		           getStyle(el, 'backgroundImage');	// IE8

  		document.body.removeChild(el);

  		if (path === null || path.indexOf('url') !== 0) {
  			path = '';
  		} else {
  			path = path.replace(/^url\(["']?/, '').replace(/marker-icon\.png["']?\)$/, '');
  		}

  		return path;
  	}
  });

  /*
   * L.Handler.MarkerDrag is used internally by L.Marker to make the markers draggable.
   */


  /* @namespace Marker
   * @section Interaction handlers
   *
   * Interaction handlers are properties of a marker instance that allow you to control interaction behavior in runtime, enabling or disabling certain features such as dragging (see `Handler` methods). Example:
   *
   * ```js
   * marker.dragging.disable();
   * ```
   *
   * @property dragging: Handler
   * Marker dragging handler (by both mouse and touch). Only valid when the marker is on the map (Otherwise set [`marker.options.draggable`](#marker-draggable)).
   */

  var MarkerDrag = Handler.extend({
  	initialize: function (marker) {
  		this._marker = marker;
  	},

  	addHooks: function () {
  		var icon = this._marker._icon;

  		if (!this._draggable) {
  			this._draggable = new Draggable(icon, icon, true);
  		}

  		this._draggable.on({
  			dragstart: this._onDragStart,
  			predrag: this._onPreDrag,
  			drag: this._onDrag,
  			dragend: this._onDragEnd
  		}, this).enable();

  		addClass(icon, 'leaflet-marker-draggable');
  	},

  	removeHooks: function () {
  		this._draggable.off({
  			dragstart: this._onDragStart,
  			predrag: this._onPreDrag,
  			drag: this._onDrag,
  			dragend: this._onDragEnd
  		}, this).disable();

  		if (this._marker._icon) {
  			removeClass(this._marker._icon, 'leaflet-marker-draggable');
  		}
  	},

  	moved: function () {
  		return this._draggable && this._draggable._moved;
  	},

  	_adjustPan: function (e) {
  		var marker = this._marker,
  		    map = marker._map,
  		    speed = this._marker.options.autoPanSpeed,
  		    padding = this._marker.options.autoPanPadding,
  		    iconPos = getPosition(marker._icon),
  		    bounds = map.getPixelBounds(),
  		    origin = map.getPixelOrigin();

  		var panBounds = toBounds(
  			bounds.min._subtract(origin).add(padding),
  			bounds.max._subtract(origin).subtract(padding)
  		);

  		if (!panBounds.contains(iconPos)) {
  			// Compute incremental movement
  			var movement = toPoint(
  				(Math.max(panBounds.max.x, iconPos.x) - panBounds.max.x) / (bounds.max.x - panBounds.max.x) -
  				(Math.min(panBounds.min.x, iconPos.x) - panBounds.min.x) / (bounds.min.x - panBounds.min.x),

  				(Math.max(panBounds.max.y, iconPos.y) - panBounds.max.y) / (bounds.max.y - panBounds.max.y) -
  				(Math.min(panBounds.min.y, iconPos.y) - panBounds.min.y) / (bounds.min.y - panBounds.min.y)
  			).multiplyBy(speed);

  			map.panBy(movement, {animate: false});

  			this._draggable._newPos._add(movement);
  			this._draggable._startPos._add(movement);

  			setPosition(marker._icon, this._draggable._newPos);
  			this._onDrag(e);

  			this._panRequest = requestAnimFrame(this._adjustPan.bind(this, e));
  		}
  	},

  	_onDragStart: function () {
  		// @section Dragging events
  		// @event dragstart: Event
  		// Fired when the user starts dragging the marker.

  		// @event movestart: Event
  		// Fired when the marker starts moving (because of dragging).

  		this._oldLatLng = this._marker.getLatLng();

  		// When using ES6 imports it could not be set when `Popup` was not imported as well
  		this._marker.closePopup && this._marker.closePopup();

  		this._marker
  			.fire('movestart')
  			.fire('dragstart');
  	},

  	_onPreDrag: function (e) {
  		if (this._marker.options.autoPan) {
  			cancelAnimFrame(this._panRequest);
  			this._panRequest = requestAnimFrame(this._adjustPan.bind(this, e));
  		}
  	},

  	_onDrag: function (e) {
  		var marker = this._marker,
  		    shadow = marker._shadow,
  		    iconPos = getPosition(marker._icon),
  		    latlng = marker._map.layerPointToLatLng(iconPos);

  		// update shadow position
  		if (shadow) {
  			setPosition(shadow, iconPos);
  		}

  		marker._latlng = latlng;
  		e.latlng = latlng;
  		e.oldLatLng = this._oldLatLng;

  		// @event drag: Event
  		// Fired repeatedly while the user drags the marker.
  		marker
  		    .fire('move', e)
  		    .fire('drag', e);
  	},

  	_onDragEnd: function (e) {
  		// @event dragend: DragEndEvent
  		// Fired when the user stops dragging the marker.

  		 cancelAnimFrame(this._panRequest);

  		// @event moveend: Event
  		// Fired when the marker stops moving (because of dragging).
  		delete this._oldLatLng;
  		this._marker
  		    .fire('moveend')
  		    .fire('dragend', e);
  	}
  });

  /*
   * @class Marker
   * @inherits Interactive layer
   * @aka L.Marker
   * L.Marker is used to display clickable/draggable icons on the map. Extends `Layer`.
   *
   * @example
   *
   * ```js
   * L.marker([50.5, 30.5]).addTo(map);
   * ```
   */

  var Marker = Layer.extend({

  	// @section
  	// @aka Marker options
  	options: {
  		// @option icon: Icon = *
  		// Icon instance to use for rendering the marker.
  		// See [Icon documentation](#L.Icon) for details on how to customize the marker icon.
  		// If not specified, a common instance of `L.Icon.Default` is used.
  		icon: new IconDefault(),

  		// Option inherited from "Interactive layer" abstract class
  		interactive: true,

  		// @option keyboard: Boolean = true
  		// Whether the marker can be tabbed to with a keyboard and clicked by pressing enter.
  		keyboard: true,

  		// @option title: String = ''
  		// Text for the browser tooltip that appear on marker hover (no tooltip by default).
  		title: '',

  		// @option alt: String = ''
  		// Text for the `alt` attribute of the icon image (useful for accessibility).
  		alt: '',

  		// @option zIndexOffset: Number = 0
  		// By default, marker images zIndex is set automatically based on its latitude. Use this option if you want to put the marker on top of all others (or below), specifying a high value like `1000` (or high negative value, respectively).
  		zIndexOffset: 0,

  		// @option opacity: Number = 1.0
  		// The opacity of the marker.
  		opacity: 1,

  		// @option riseOnHover: Boolean = false
  		// If `true`, the marker will get on top of others when you hover the mouse over it.
  		riseOnHover: false,

  		// @option riseOffset: Number = 250
  		// The z-index offset used for the `riseOnHover` feature.
  		riseOffset: 250,

  		// @option pane: String = 'markerPane'
  		// `Map pane` where the markers icon will be added.
  		pane: 'markerPane',

  		// @option shadowPane: String = 'shadowPane'
  		// `Map pane` where the markers shadow will be added.
  		shadowPane: 'shadowPane',

  		// @option bubblingMouseEvents: Boolean = false
  		// When `true`, a mouse event on this marker will trigger the same event on the map
  		// (unless [`L.DomEvent.stopPropagation`](#domevent-stoppropagation) is used).
  		bubblingMouseEvents: false,

  		// @section Draggable marker options
  		// @option draggable: Boolean = false
  		// Whether the marker is draggable with mouse/touch or not.
  		draggable: false,

  		// @option autoPan: Boolean = false
  		// Whether to pan the map when dragging this marker near its edge or not.
  		autoPan: false,

  		// @option autoPanPadding: Point = Point(50, 50)
  		// Distance (in pixels to the left/right and to the top/bottom) of the
  		// map edge to start panning the map.
  		autoPanPadding: [50, 50],

  		// @option autoPanSpeed: Number = 10
  		// Number of pixels the map should pan by.
  		autoPanSpeed: 10
  	},

  	/* @section
  	 *
  	 * In addition to [shared layer methods](#Layer) like `addTo()` and `remove()` and [popup methods](#Popup) like bindPopup() you can also use the following methods:
  	 */

  	initialize: function (latlng, options) {
  		setOptions(this, options);
  		this._latlng = toLatLng(latlng);
  	},

  	onAdd: function (map) {
  		this._zoomAnimated = this._zoomAnimated && map.options.markerZoomAnimation;

  		if (this._zoomAnimated) {
  			map.on('zoomanim', this._animateZoom, this);
  		}

  		this._initIcon();
  		this.update();
  	},

  	onRemove: function (map) {
  		if (this.dragging && this.dragging.enabled()) {
  			this.options.draggable = true;
  			this.dragging.removeHooks();
  		}
  		delete this.dragging;

  		if (this._zoomAnimated) {
  			map.off('zoomanim', this._animateZoom, this);
  		}

  		this._removeIcon();
  		this._removeShadow();
  	},

  	getEvents: function () {
  		return {
  			zoom: this.update,
  			viewreset: this.update
  		};
  	},

  	// @method getLatLng: LatLng
  	// Returns the current geographical position of the marker.
  	getLatLng: function () {
  		return this._latlng;
  	},

  	// @method setLatLng(latlng: LatLng): this
  	// Changes the marker position to the given point.
  	setLatLng: function (latlng) {
  		var oldLatLng = this._latlng;
  		this._latlng = toLatLng(latlng);
  		this.update();

  		// @event move: Event
  		// Fired when the marker is moved via [`setLatLng`](#marker-setlatlng) or by [dragging](#marker-dragging). Old and new coordinates are included in event arguments as `oldLatLng`, `latlng`.
  		return this.fire('move', {oldLatLng: oldLatLng, latlng: this._latlng});
  	},

  	// @method setZIndexOffset(offset: Number): this
  	// Changes the [zIndex offset](#marker-zindexoffset) of the marker.
  	setZIndexOffset: function (offset) {
  		this.options.zIndexOffset = offset;
  		return this.update();
  	},

  	// @method getIcon: Icon
  	// Returns the current icon used by the marker
  	getIcon: function () {
  		return this.options.icon;
  	},

  	// @method setIcon(icon: Icon): this
  	// Changes the marker icon.
  	setIcon: function (icon) {

  		this.options.icon = icon;

  		if (this._map) {
  			this._initIcon();
  			this.update();
  		}

  		if (this._popup) {
  			this.bindPopup(this._popup, this._popup.options);
  		}

  		return this;
  	},

  	getElement: function () {
  		return this._icon;
  	},

  	update: function () {

  		if (this._icon && this._map) {
  			var pos = this._map.latLngToLayerPoint(this._latlng).round();
  			this._setPos(pos);
  		}

  		return this;
  	},

  	_initIcon: function () {
  		var options = this.options,
  		    classToAdd = 'leaflet-zoom-' + (this._zoomAnimated ? 'animated' : 'hide');

  		var icon = options.icon.createIcon(this._icon),
  		    addIcon = false;

  		// if we're not reusing the icon, remove the old one and init new one
  		if (icon !== this._icon) {
  			if (this._icon) {
  				this._removeIcon();
  			}
  			addIcon = true;

  			if (options.title) {
  				icon.title = options.title;
  			}

  			if (icon.tagName === 'IMG') {
  				icon.alt = options.alt || '';
  			}
  		}

  		addClass(icon, classToAdd);

  		if (options.keyboard) {
  			icon.tabIndex = '0';
  		}

  		this._icon = icon;

  		if (options.riseOnHover) {
  			this.on({
  				mouseover: this._bringToFront,
  				mouseout: this._resetZIndex
  			});
  		}

  		var newShadow = options.icon.createShadow(this._shadow),
  		    addShadow = false;

  		if (newShadow !== this._shadow) {
  			this._removeShadow();
  			addShadow = true;
  		}

  		if (newShadow) {
  			addClass(newShadow, classToAdd);
  			newShadow.alt = '';
  		}
  		this._shadow = newShadow;


  		if (options.opacity < 1) {
  			this._updateOpacity();
  		}


  		if (addIcon) {
  			this.getPane().appendChild(this._icon);
  		}
  		this._initInteraction();
  		if (newShadow && addShadow) {
  			this.getPane(options.shadowPane).appendChild(this._shadow);
  		}
  	},

  	_removeIcon: function () {
  		if (this.options.riseOnHover) {
  			this.off({
  				mouseover: this._bringToFront,
  				mouseout: this._resetZIndex
  			});
  		}

  		remove(this._icon);
  		this.removeInteractiveTarget(this._icon);

  		this._icon = null;
  	},

  	_removeShadow: function () {
  		if (this._shadow) {
  			remove(this._shadow);
  		}
  		this._shadow = null;
  	},

  	_setPos: function (pos) {

  		if (this._icon) {
  			setPosition(this._icon, pos);
  		}

  		if (this._shadow) {
  			setPosition(this._shadow, pos);
  		}

  		this._zIndex = pos.y + this.options.zIndexOffset;

  		this._resetZIndex();
  	},

  	_updateZIndex: function (offset) {
  		if (this._icon) {
  			this._icon.style.zIndex = this._zIndex + offset;
  		}
  	},

  	_animateZoom: function (opt) {
  		var pos = this._map._latLngToNewLayerPoint(this._latlng, opt.zoom, opt.center).round();

  		this._setPos(pos);
  	},

  	_initInteraction: function () {

  		if (!this.options.interactive) { return; }

  		addClass(this._icon, 'leaflet-interactive');

  		this.addInteractiveTarget(this._icon);

  		if (MarkerDrag) {
  			var draggable = this.options.draggable;
  			if (this.dragging) {
  				draggable = this.dragging.enabled();
  				this.dragging.disable();
  			}

  			this.dragging = new MarkerDrag(this);

  			if (draggable) {
  				this.dragging.enable();
  			}
  		}
  	},

  	// @method setOpacity(opacity: Number): this
  	// Changes the opacity of the marker.
  	setOpacity: function (opacity) {
  		this.options.opacity = opacity;
  		if (this._map) {
  			this._updateOpacity();
  		}

  		return this;
  	},

  	_updateOpacity: function () {
  		var opacity = this.options.opacity;

  		if (this._icon) {
  			setOpacity(this._icon, opacity);
  		}

  		if (this._shadow) {
  			setOpacity(this._shadow, opacity);
  		}
  	},

  	_bringToFront: function () {
  		this._updateZIndex(this.options.riseOffset);
  	},

  	_resetZIndex: function () {
  		this._updateZIndex(0);
  	},

  	_getPopupAnchor: function () {
  		return this.options.icon.options.popupAnchor;
  	},

  	_getTooltipAnchor: function () {
  		return this.options.icon.options.tooltipAnchor;
  	}
  });


  // factory L.marker(latlng: LatLng, options? : Marker options)

  // @factory L.marker(latlng: LatLng, options? : Marker options)
  // Instantiates a Marker object given a geographical point and optionally an options object.
  function marker(latlng, options) {
  	return new Marker(latlng, options);
  }

  /*
   * @class Path
   * @aka L.Path
   * @inherits Interactive layer
   *
   * An abstract class that contains options and constants shared between vector
   * overlays (Polygon, Polyline, Circle). Do not use it directly. Extends `Layer`.
   */

  var Path = Layer.extend({

  	// @section
  	// @aka Path options
  	options: {
  		// @option stroke: Boolean = true
  		// Whether to draw stroke along the path. Set it to `false` to disable borders on polygons or circles.
  		stroke: true,

  		// @option color: String = '#3388ff'
  		// Stroke color
  		color: '#3388ff',

  		// @option weight: Number = 3
  		// Stroke width in pixels
  		weight: 3,

  		// @option opacity: Number = 1.0
  		// Stroke opacity
  		opacity: 1,

  		// @option lineCap: String= 'round'
  		// A string that defines [shape to be used at the end](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linecap) of the stroke.
  		lineCap: 'round',

  		// @option lineJoin: String = 'round'
  		// A string that defines [shape to be used at the corners](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linejoin) of the stroke.
  		lineJoin: 'round',

  		// @option dashArray: String = null
  		// A string that defines the stroke [dash pattern](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dasharray). Doesn't work on `Canvas`-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
  		dashArray: null,

  		// @option dashOffset: String = null
  		// A string that defines the [distance into the dash pattern to start the dash](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dashoffset). Doesn't work on `Canvas`-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
  		dashOffset: null,

  		// @option fill: Boolean = depends
  		// Whether to fill the path with color. Set it to `false` to disable filling on polygons or circles.
  		fill: false,

  		// @option fillColor: String = *
  		// Fill color. Defaults to the value of the [`color`](#path-color) option
  		fillColor: null,

  		// @option fillOpacity: Number = 0.2
  		// Fill opacity.
  		fillOpacity: 0.2,

  		// @option fillRule: String = 'evenodd'
  		// A string that defines [how the inside of a shape](https://developer.mozilla.org/docs/Web/SVG/Attribute/fill-rule) is determined.
  		fillRule: 'evenodd',

  		// className: '',

  		// Option inherited from "Interactive layer" abstract class
  		interactive: true,

  		// @option bubblingMouseEvents: Boolean = true
  		// When `true`, a mouse event on this path will trigger the same event on the map
  		// (unless [`L.DomEvent.stopPropagation`](#domevent-stoppropagation) is used).
  		bubblingMouseEvents: true
  	},

  	beforeAdd: function (map) {
  		// Renderer is set here because we need to call renderer.getEvents
  		// before this.getEvents.
  		this._renderer = map.getRenderer(this);
  	},

  	onAdd: function () {
  		this._renderer._initPath(this);
  		this._reset();
  		this._renderer._addPath(this);
  	},

  	onRemove: function () {
  		this._renderer._removePath(this);
  	},

  	// @method redraw(): this
  	// Redraws the layer. Sometimes useful after you changed the coordinates that the path uses.
  	redraw: function () {
  		if (this._map) {
  			this._renderer._updatePath(this);
  		}
  		return this;
  	},

  	// @method setStyle(style: Path options): this
  	// Changes the appearance of a Path based on the options in the `Path options` object.
  	setStyle: function (style) {
  		setOptions(this, style);
  		if (this._renderer) {
  			this._renderer._updateStyle(this);
  			if (this.options.stroke && style && Object.prototype.hasOwnProperty.call(style, 'weight')) {
  				this._updateBounds();
  			}
  		}
  		return this;
  	},

  	// @method bringToFront(): this
  	// Brings the layer to the top of all path layers.
  	bringToFront: function () {
  		if (this._renderer) {
  			this._renderer._bringToFront(this);
  		}
  		return this;
  	},

  	// @method bringToBack(): this
  	// Brings the layer to the bottom of all path layers.
  	bringToBack: function () {
  		if (this._renderer) {
  			this._renderer._bringToBack(this);
  		}
  		return this;
  	},

  	getElement: function () {
  		return this._path;
  	},

  	_reset: function () {
  		// defined in child classes
  		this._project();
  		this._update();
  	},

  	_clickTolerance: function () {
  		// used when doing hit detection for Canvas layers
  		return (this.options.stroke ? this.options.weight / 2 : 0) + this._renderer.options.tolerance;
  	}
  });

  /*
   * @class CircleMarker
   * @aka L.CircleMarker
   * @inherits Path
   *
   * A circle of a fixed size with radius specified in pixels. Extends `Path`.
   */

  var CircleMarker = Path.extend({

  	// @section
  	// @aka CircleMarker options
  	options: {
  		fill: true,

  		// @option radius: Number = 10
  		// Radius of the circle marker, in pixels
  		radius: 10
  	},

  	initialize: function (latlng, options) {
  		setOptions(this, options);
  		this._latlng = toLatLng(latlng);
  		this._radius = this.options.radius;
  	},

  	// @method setLatLng(latLng: LatLng): this
  	// Sets the position of a circle marker to a new location.
  	setLatLng: function (latlng) {
  		var oldLatLng = this._latlng;
  		this._latlng = toLatLng(latlng);
  		this.redraw();

  		// @event move: Event
  		// Fired when the marker is moved via [`setLatLng`](#circlemarker-setlatlng). Old and new coordinates are included in event arguments as `oldLatLng`, `latlng`.
  		return this.fire('move', {oldLatLng: oldLatLng, latlng: this._latlng});
  	},

  	// @method getLatLng(): LatLng
  	// Returns the current geographical position of the circle marker
  	getLatLng: function () {
  		return this._latlng;
  	},

  	// @method setRadius(radius: Number): this
  	// Sets the radius of a circle marker. Units are in pixels.
  	setRadius: function (radius) {
  		this.options.radius = this._radius = radius;
  		return this.redraw();
  	},

  	// @method getRadius(): Number
  	// Returns the current radius of the circle
  	getRadius: function () {
  		return this._radius;
  	},

  	setStyle : function (options) {
  		var radius = options && options.radius || this._radius;
  		Path.prototype.setStyle.call(this, options);
  		this.setRadius(radius);
  		return this;
  	},

  	_project: function () {
  		this._point = this._map.latLngToLayerPoint(this._latlng);
  		this._updateBounds();
  	},

  	_updateBounds: function () {
  		var r = this._radius,
  		    r2 = this._radiusY || r,
  		    w = this._clickTolerance(),
  		    p = [r + w, r2 + w];
  		this._pxBounds = new Bounds(this._point.subtract(p), this._point.add(p));
  	},

  	_update: function () {
  		if (this._map) {
  			this._updatePath();
  		}
  	},

  	_updatePath: function () {
  		this._renderer._updateCircle(this);
  	},

  	_empty: function () {
  		return this._radius && !this._renderer._bounds.intersects(this._pxBounds);
  	},

  	// Needed by the `Canvas` renderer for interactivity
  	_containsPoint: function (p) {
  		return p.distanceTo(this._point) <= this._radius + this._clickTolerance();
  	}
  });


  // @factory L.circleMarker(latlng: LatLng, options?: CircleMarker options)
  // Instantiates a circle marker object given a geographical point, and an optional options object.
  function circleMarker(latlng, options) {
  	return new CircleMarker(latlng, options);
  }

  /*
   * @class Circle
   * @aka L.Circle
   * @inherits CircleMarker
   *
   * A class for drawing circle overlays on a map. Extends `CircleMarker`.
   *
   * It's an approximation and starts to diverge from a real circle closer to poles (due to projection distortion).
   *
   * @example
   *
   * ```js
   * L.circle([50.5, 30.5], {radius: 200}).addTo(map);
   * ```
   */

  var Circle = CircleMarker.extend({

  	initialize: function (latlng, options, legacyOptions) {
  		if (typeof options === 'number') {
  			// Backwards compatibility with 0.7.x factory (latlng, radius, options?)
  			options = extend({}, legacyOptions, {radius: options});
  		}
  		setOptions(this, options);
  		this._latlng = toLatLng(latlng);

  		if (isNaN(this.options.radius)) { throw new Error('Circle radius cannot be NaN'); }

  		// @section
  		// @aka Circle options
  		// @option radius: Number; Radius of the circle, in meters.
  		this._mRadius = this.options.radius;
  	},

  	// @method setRadius(radius: Number): this
  	// Sets the radius of a circle. Units are in meters.
  	setRadius: function (radius) {
  		this._mRadius = radius;
  		return this.redraw();
  	},

  	// @method getRadius(): Number
  	// Returns the current radius of a circle. Units are in meters.
  	getRadius: function () {
  		return this._mRadius;
  	},

  	// @method getBounds(): LatLngBounds
  	// Returns the `LatLngBounds` of the path.
  	getBounds: function () {
  		var half = [this._radius, this._radiusY || this._radius];

  		return new LatLngBounds(
  			this._map.layerPointToLatLng(this._point.subtract(half)),
  			this._map.layerPointToLatLng(this._point.add(half)));
  	},

  	setStyle: Path.prototype.setStyle,

  	_project: function () {

  		var lng = this._latlng.lng,
  		    lat = this._latlng.lat,
  		    map = this._map,
  		    crs = map.options.crs;

  		if (crs.distance === Earth.distance) {
  			var d = Math.PI / 180,
  			    latR = (this._mRadius / Earth.R) / d,
  			    top = map.project([lat + latR, lng]),
  			    bottom = map.project([lat - latR, lng]),
  			    p = top.add(bottom).divideBy(2),
  			    lat2 = map.unproject(p).lat,
  			    lngR = Math.acos((Math.cos(latR * d) - Math.sin(lat * d) * Math.sin(lat2 * d)) /
  			            (Math.cos(lat * d) * Math.cos(lat2 * d))) / d;

  			if (isNaN(lngR) || lngR === 0) {
  				lngR = latR / Math.cos(Math.PI / 180 * lat); // Fallback for edge case, #2425
  			}

  			this._point = p.subtract(map.getPixelOrigin());
  			this._radius = isNaN(lngR) ? 0 : p.x - map.project([lat2, lng - lngR]).x;
  			this._radiusY = p.y - top.y;

  		} else {
  			var latlng2 = crs.unproject(crs.project(this._latlng).subtract([this._mRadius, 0]));

  			this._point = map.latLngToLayerPoint(this._latlng);
  			this._radius = this._point.x - map.latLngToLayerPoint(latlng2).x;
  		}

  		this._updateBounds();
  	}
  });

  // @factory L.circle(latlng: LatLng, options?: Circle options)
  // Instantiates a circle object given a geographical point, and an options object
  // which contains the circle radius.
  // @alternative
  // @factory L.circle(latlng: LatLng, radius: Number, options?: Circle options)
  // Obsolete way of instantiating a circle, for compatibility with 0.7.x code.
  // Do not use in new applications or plugins.
  function circle(latlng, options, legacyOptions) {
  	return new Circle(latlng, options, legacyOptions);
  }

  /*
   * @class Polyline
   * @aka L.Polyline
   * @inherits Path
   *
   * A class for drawing polyline overlays on a map. Extends `Path`.
   *
   * @example
   *
   * ```js
   * // create a red polyline from an array of LatLng points
   * var latlngs = [
   * 	[45.51, -122.68],
   * 	[37.77, -122.43],
   * 	[34.04, -118.2]
   * ];
   *
   * var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);
   *
   * // zoom the map to the polyline
   * map.fitBounds(polyline.getBounds());
   * ```
   *
   * You can also pass a multi-dimensional array to represent a `MultiPolyline` shape:
   *
   * ```js
   * // create a red polyline from an array of arrays of LatLng points
   * var latlngs = [
   * 	[[45.51, -122.68],
   * 	 [37.77, -122.43],
   * 	 [34.04, -118.2]],
   * 	[[40.78, -73.91],
   * 	 [41.83, -87.62],
   * 	 [32.76, -96.72]]
   * ];
   * ```
   */


  var Polyline = Path.extend({

  	// @section
  	// @aka Polyline options
  	options: {
  		// @option smoothFactor: Number = 1.0
  		// How much to simplify the polyline on each zoom level. More means
  		// better performance and smoother look, and less means more accurate representation.
  		smoothFactor: 1.0,

  		// @option noClip: Boolean = false
  		// Disable polyline clipping.
  		noClip: false
  	},

  	initialize: function (latlngs, options) {
  		setOptions(this, options);
  		this._setLatLngs(latlngs);
  	},

  	// @method getLatLngs(): LatLng[]
  	// Returns an array of the points in the path, or nested arrays of points in case of multi-polyline.
  	getLatLngs: function () {
  		return this._latlngs;
  	},

  	// @method setLatLngs(latlngs: LatLng[]): this
  	// Replaces all the points in the polyline with the given array of geographical points.
  	setLatLngs: function (latlngs) {
  		this._setLatLngs(latlngs);
  		return this.redraw();
  	},

  	// @method isEmpty(): Boolean
  	// Returns `true` if the Polyline has no LatLngs.
  	isEmpty: function () {
  		return !this._latlngs.length;
  	},

  	// @method closestLayerPoint(p: Point): Point
  	// Returns the point closest to `p` on the Polyline.
  	closestLayerPoint: function (p) {
  		var minDistance = Infinity,
  		    minPoint = null,
  		    closest = _sqClosestPointOnSegment,
  		    p1, p2;

  		for (var j = 0, jLen = this._parts.length; j < jLen; j++) {
  			var points = this._parts[j];

  			for (var i = 1, len = points.length; i < len; i++) {
  				p1 = points[i - 1];
  				p2 = points[i];

  				var sqDist = closest(p, p1, p2, true);

  				if (sqDist < minDistance) {
  					minDistance = sqDist;
  					minPoint = closest(p, p1, p2);
  				}
  			}
  		}
  		if (minPoint) {
  			minPoint.distance = Math.sqrt(minDistance);
  		}
  		return minPoint;
  	},

  	// @method getCenter(): LatLng
  	// Returns the center ([centroid](http://en.wikipedia.org/wiki/Centroid)) of the polyline.
  	getCenter: function () {
  		// throws error when not yet added to map as this center calculation requires projected coordinates
  		if (!this._map) {
  			throw new Error('Must add layer to map before using getCenter()');
  		}

  		var i, halfDist, segDist, dist, p1, p2, ratio,
  		    points = this._rings[0],
  		    len = points.length;

  		if (!len) { return null; }

  		// polyline centroid algorithm; only uses the first ring if there are multiple

  		for (i = 0, halfDist = 0; i < len - 1; i++) {
  			halfDist += points[i].distanceTo(points[i + 1]) / 2;
  		}

  		// The line is so small in the current view that all points are on the same pixel.
  		if (halfDist === 0) {
  			return this._map.layerPointToLatLng(points[0]);
  		}

  		for (i = 0, dist = 0; i < len - 1; i++) {
  			p1 = points[i];
  			p2 = points[i + 1];
  			segDist = p1.distanceTo(p2);
  			dist += segDist;

  			if (dist > halfDist) {
  				ratio = (dist - halfDist) / segDist;
  				return this._map.layerPointToLatLng([
  					p2.x - ratio * (p2.x - p1.x),
  					p2.y - ratio * (p2.y - p1.y)
  				]);
  			}
  		}
  	},

  	// @method getBounds(): LatLngBounds
  	// Returns the `LatLngBounds` of the path.
  	getBounds: function () {
  		return this._bounds;
  	},

  	// @method addLatLng(latlng: LatLng, latlngs?: LatLng[]): this
  	// Adds a given point to the polyline. By default, adds to the first ring of
  	// the polyline in case of a multi-polyline, but can be overridden by passing
  	// a specific ring as a LatLng array (that you can earlier access with [`getLatLngs`](#polyline-getlatlngs)).
  	addLatLng: function (latlng, latlngs) {
  		latlngs = latlngs || this._defaultShape();
  		latlng = toLatLng(latlng);
  		latlngs.push(latlng);
  		this._bounds.extend(latlng);
  		return this.redraw();
  	},

  	_setLatLngs: function (latlngs) {
  		this._bounds = new LatLngBounds();
  		this._latlngs = this._convertLatLngs(latlngs);
  	},

  	_defaultShape: function () {
  		return isFlat(this._latlngs) ? this._latlngs : this._latlngs[0];
  	},

  	// recursively convert latlngs input into actual LatLng instances; calculate bounds along the way
  	_convertLatLngs: function (latlngs) {
  		var result = [],
  		    flat = isFlat(latlngs);

  		for (var i = 0, len = latlngs.length; i < len; i++) {
  			if (flat) {
  				result[i] = toLatLng(latlngs[i]);
  				this._bounds.extend(result[i]);
  			} else {
  				result[i] = this._convertLatLngs(latlngs[i]);
  			}
  		}

  		return result;
  	},

  	_project: function () {
  		var pxBounds = new Bounds();
  		this._rings = [];
  		this._projectLatlngs(this._latlngs, this._rings, pxBounds);

  		if (this._bounds.isValid() && pxBounds.isValid()) {
  			this._rawPxBounds = pxBounds;
  			this._updateBounds();
  		}
  	},

  	_updateBounds: function () {
  		var w = this._clickTolerance(),
  		    p = new Point(w, w);
  		this._pxBounds = new Bounds([
  			this._rawPxBounds.min.subtract(p),
  			this._rawPxBounds.max.add(p)
  		]);
  	},

  	// recursively turns latlngs into a set of rings with projected coordinates
  	_projectLatlngs: function (latlngs, result, projectedBounds) {
  		var flat = latlngs[0] instanceof LatLng,
  		    len = latlngs.length,
  		    i, ring;

  		if (flat) {
  			ring = [];
  			for (i = 0; i < len; i++) {
  				ring[i] = this._map.latLngToLayerPoint(latlngs[i]);
  				projectedBounds.extend(ring[i]);
  			}
  			result.push(ring);
  		} else {
  			for (i = 0; i < len; i++) {
  				this._projectLatlngs(latlngs[i], result, projectedBounds);
  			}
  		}
  	},

  	// clip polyline by renderer bounds so that we have less to render for performance
  	_clipPoints: function () {
  		var bounds = this._renderer._bounds;

  		this._parts = [];
  		if (!this._pxBounds || !this._pxBounds.intersects(bounds)) {
  			return;
  		}

  		if (this.options.noClip) {
  			this._parts = this._rings;
  			return;
  		}

  		var parts = this._parts,
  		    i, j, k, len, len2, segment, points;

  		for (i = 0, k = 0, len = this._rings.length; i < len; i++) {
  			points = this._rings[i];

  			for (j = 0, len2 = points.length; j < len2 - 1; j++) {
  				segment = clipSegment(points[j], points[j + 1], bounds, j, true);

  				if (!segment) { continue; }

  				parts[k] = parts[k] || [];
  				parts[k].push(segment[0]);

  				// if segment goes out of screen, or it's the last one, it's the end of the line part
  				if ((segment[1] !== points[j + 1]) || (j === len2 - 2)) {
  					parts[k].push(segment[1]);
  					k++;
  				}
  			}
  		}
  	},

  	// simplify each clipped part of the polyline for performance
  	_simplifyPoints: function () {
  		var parts = this._parts,
  		    tolerance = this.options.smoothFactor;

  		for (var i = 0, len = parts.length; i < len; i++) {
  			parts[i] = simplify(parts[i], tolerance);
  		}
  	},

  	_update: function () {
  		if (!this._map) { return; }

  		this._clipPoints();
  		this._simplifyPoints();
  		this._updatePath();
  	},

  	_updatePath: function () {
  		this._renderer._updatePoly(this);
  	},

  	// Needed by the `Canvas` renderer for interactivity
  	_containsPoint: function (p, closed) {
  		var i, j, k, len, len2, part,
  		    w = this._clickTolerance();

  		if (!this._pxBounds || !this._pxBounds.contains(p)) { return false; }

  		// hit detection for polylines
  		for (i = 0, len = this._parts.length; i < len; i++) {
  			part = this._parts[i];

  			for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
  				if (!closed && (j === 0)) { continue; }

  				if (pointToSegmentDistance(p, part[k], part[j]) <= w) {
  					return true;
  				}
  			}
  		}
  		return false;
  	}
  });

  // @factory L.polyline(latlngs: LatLng[], options?: Polyline options)
  // Instantiates a polyline object given an array of geographical points and
  // optionally an options object. You can create a `Polyline` object with
  // multiple separate lines (`MultiPolyline`) by passing an array of arrays
  // of geographic points.
  function polyline(latlngs, options) {
  	return new Polyline(latlngs, options);
  }

  // Retrocompat. Allow plugins to support Leaflet versions before and after 1.1.
  Polyline._flat = _flat;

  /*
   * @class Polygon
   * @aka L.Polygon
   * @inherits Polyline
   *
   * A class for drawing polygon overlays on a map. Extends `Polyline`.
   *
   * Note that points you pass when creating a polygon shouldn't have an additional last point equal to the first one — it's better to filter out such points.
   *
   *
   * @example
   *
   * ```js
   * // create a red polygon from an array of LatLng points
   * var latlngs = [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]];
   *
   * var polygon = L.polygon(latlngs, {color: 'red'}).addTo(map);
   *
   * // zoom the map to the polygon
   * map.fitBounds(polygon.getBounds());
   * ```
   *
   * You can also pass an array of arrays of latlngs, with the first array representing the outer shape and the other arrays representing holes in the outer shape:
   *
   * ```js
   * var latlngs = [
   *   [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]], // outer ring
   *   [[37.29, -108.58],[40.71, -108.58],[40.71, -102.50],[37.29, -102.50]] // hole
   * ];
   * ```
   *
   * Additionally, you can pass a multi-dimensional array to represent a MultiPolygon shape.
   *
   * ```js
   * var latlngs = [
   *   [ // first polygon
   *     [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]], // outer ring
   *     [[37.29, -108.58],[40.71, -108.58],[40.71, -102.50],[37.29, -102.50]] // hole
   *   ],
   *   [ // second polygon
   *     [[41, -111.03],[45, -111.04],[45, -104.05],[41, -104.05]]
   *   ]
   * ];
   * ```
   */

  var Polygon = Polyline.extend({

  	options: {
  		fill: true
  	},

  	isEmpty: function () {
  		return !this._latlngs.length || !this._latlngs[0].length;
  	},

  	getCenter: function () {
  		// throws error when not yet added to map as this center calculation requires projected coordinates
  		if (!this._map) {
  			throw new Error('Must add layer to map before using getCenter()');
  		}

  		var i, j, p1, p2, f, area, x, y, center,
  		    points = this._rings[0],
  		    len = points.length;

  		if (!len) { return null; }

  		// polygon centroid algorithm; only uses the first ring if there are multiple

  		area = x = y = 0;

  		for (i = 0, j = len - 1; i < len; j = i++) {
  			p1 = points[i];
  			p2 = points[j];

  			f = p1.y * p2.x - p2.y * p1.x;
  			x += (p1.x + p2.x) * f;
  			y += (p1.y + p2.y) * f;
  			area += f * 3;
  		}

  		if (area === 0) {
  			// Polygon is so small that all points are on same pixel.
  			center = points[0];
  		} else {
  			center = [x / area, y / area];
  		}
  		return this._map.layerPointToLatLng(center);
  	},

  	_convertLatLngs: function (latlngs) {
  		var result = Polyline.prototype._convertLatLngs.call(this, latlngs),
  		    len = result.length;

  		// remove last point if it equals first one
  		if (len >= 2 && result[0] instanceof LatLng && result[0].equals(result[len - 1])) {
  			result.pop();
  		}
  		return result;
  	},

  	_setLatLngs: function (latlngs) {
  		Polyline.prototype._setLatLngs.call(this, latlngs);
  		if (isFlat(this._latlngs)) {
  			this._latlngs = [this._latlngs];
  		}
  	},

  	_defaultShape: function () {
  		return isFlat(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
  	},

  	_clipPoints: function () {
  		// polygons need a different clipping algorithm so we redefine that

  		var bounds = this._renderer._bounds,
  		    w = this.options.weight,
  		    p = new Point(w, w);

  		// increase clip padding by stroke width to avoid stroke on clip edges
  		bounds = new Bounds(bounds.min.subtract(p), bounds.max.add(p));

  		this._parts = [];
  		if (!this._pxBounds || !this._pxBounds.intersects(bounds)) {
  			return;
  		}

  		if (this.options.noClip) {
  			this._parts = this._rings;
  			return;
  		}

  		for (var i = 0, len = this._rings.length, clipped; i < len; i++) {
  			clipped = clipPolygon(this._rings[i], bounds, true);
  			if (clipped.length) {
  				this._parts.push(clipped);
  			}
  		}
  	},

  	_updatePath: function () {
  		this._renderer._updatePoly(this, true);
  	},

  	// Needed by the `Canvas` renderer for interactivity
  	_containsPoint: function (p) {
  		var inside = false,
  		    part, p1, p2, i, j, k, len, len2;

  		if (!this._pxBounds || !this._pxBounds.contains(p)) { return false; }

  		// ray casting algorithm for detecting if point is in polygon
  		for (i = 0, len = this._parts.length; i < len; i++) {
  			part = this._parts[i];

  			for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
  				p1 = part[j];
  				p2 = part[k];

  				if (((p1.y > p.y) !== (p2.y > p.y)) && (p.x < (p2.x - p1.x) * (p.y - p1.y) / (p2.y - p1.y) + p1.x)) {
  					inside = !inside;
  				}
  			}
  		}

  		// also check if it's on polygon stroke
  		return inside || Polyline.prototype._containsPoint.call(this, p, true);
  	}

  });


  // @factory L.polygon(latlngs: LatLng[], options?: Polyline options)
  function polygon(latlngs, options) {
  	return new Polygon(latlngs, options);
  }

  /*
   * @class GeoJSON
   * @aka L.GeoJSON
   * @inherits FeatureGroup
   *
   * Represents a GeoJSON object or an array of GeoJSON objects. Allows you to parse
   * GeoJSON data and display it on the map. Extends `FeatureGroup`.
   *
   * @example
   *
   * ```js
   * L.geoJSON(data, {
   * 	style: function (feature) {
   * 		return {color: feature.properties.color};
   * 	}
   * }).bindPopup(function (layer) {
   * 	return layer.feature.properties.description;
   * }).addTo(map);
   * ```
   */

  var GeoJSON = FeatureGroup.extend({

  	/* @section
  	 * @aka GeoJSON options
  	 *
  	 * @option pointToLayer: Function = *
  	 * A `Function` defining how GeoJSON points spawn Leaflet layers. It is internally
  	 * called when data is added, passing the GeoJSON point feature and its `LatLng`.
  	 * The default is to spawn a default `Marker`:
  	 * ```js
  	 * function(geoJsonPoint, latlng) {
  	 * 	return L.marker(latlng);
  	 * }
  	 * ```
  	 *
  	 * @option style: Function = *
  	 * A `Function` defining the `Path options` for styling GeoJSON lines and polygons,
  	 * called internally when data is added.
  	 * The default value is to not override any defaults:
  	 * ```js
  	 * function (geoJsonFeature) {
  	 * 	return {}
  	 * }
  	 * ```
  	 *
  	 * @option onEachFeature: Function = *
  	 * A `Function` that will be called once for each created `Feature`, after it has
  	 * been created and styled. Useful for attaching events and popups to features.
  	 * The default is to do nothing with the newly created layers:
  	 * ```js
  	 * function (feature, layer) {}
  	 * ```
  	 *
  	 * @option filter: Function = *
  	 * A `Function` that will be used to decide whether to include a feature or not.
  	 * The default is to include all features:
  	 * ```js
  	 * function (geoJsonFeature) {
  	 * 	return true;
  	 * }
  	 * ```
  	 * Note: dynamically changing the `filter` option will have effect only on newly
  	 * added data. It will _not_ re-evaluate already included features.
  	 *
  	 * @option coordsToLatLng: Function = *
  	 * A `Function` that will be used for converting GeoJSON coordinates to `LatLng`s.
  	 * The default is the `coordsToLatLng` static method.
  	 *
  	 * @option markersInheritOptions: Boolean = false
  	 * Whether default Markers for "Point" type Features inherit from group options.
  	 */

  	initialize: function (geojson, options) {
  		setOptions(this, options);

  		this._layers = {};

  		if (geojson) {
  			this.addData(geojson);
  		}
  	},

  	// @method addData( <GeoJSON> data ): this
  	// Adds a GeoJSON object to the layer.
  	addData: function (geojson) {
  		var features = isArray(geojson) ? geojson : geojson.features,
  		    i, len, feature;

  		if (features) {
  			for (i = 0, len = features.length; i < len; i++) {
  				// only add this if geometry or geometries are set and not null
  				feature = features[i];
  				if (feature.geometries || feature.geometry || feature.features || feature.coordinates) {
  					this.addData(feature);
  				}
  			}
  			return this;
  		}

  		var options = this.options;

  		if (options.filter && !options.filter(geojson)) { return this; }

  		var layer = geometryToLayer(geojson, options);
  		if (!layer) {
  			return this;
  		}
  		layer.feature = asFeature(geojson);

  		layer.defaultOptions = layer.options;
  		this.resetStyle(layer);

  		if (options.onEachFeature) {
  			options.onEachFeature(geojson, layer);
  		}

  		return this.addLayer(layer);
  	},

  	// @method resetStyle( <Path> layer? ): this
  	// Resets the given vector layer's style to the original GeoJSON style, useful for resetting style after hover events.
  	// If `layer` is omitted, the style of all features in the current layer is reset.
  	resetStyle: function (layer) {
  		if (layer === undefined) {
  			return this.eachLayer(this.resetStyle, this);
  		}
  		// reset any custom styles
  		layer.options = extend({}, layer.defaultOptions);
  		this._setLayerStyle(layer, this.options.style);
  		return this;
  	},

  	// @method setStyle( <Function> style ): this
  	// Changes styles of GeoJSON vector layers with the given style function.
  	setStyle: function (style) {
  		return this.eachLayer(function (layer) {
  			this._setLayerStyle(layer, style);
  		}, this);
  	},

  	_setLayerStyle: function (layer, style) {
  		if (layer.setStyle) {
  			if (typeof style === 'function') {
  				style = style(layer.feature);
  			}
  			layer.setStyle(style);
  		}
  	}
  });

  // @section
  // There are several static functions which can be called without instantiating L.GeoJSON:

  // @function geometryToLayer(featureData: Object, options?: GeoJSON options): Layer
  // Creates a `Layer` from a given GeoJSON feature. Can use a custom
  // [`pointToLayer`](#geojson-pointtolayer) and/or [`coordsToLatLng`](#geojson-coordstolatlng)
  // functions if provided as options.
  function geometryToLayer(geojson, options) {

  	var geometry = geojson.type === 'Feature' ? geojson.geometry : geojson,
  	    coords = geometry ? geometry.coordinates : null,
  	    layers = [],
  	    pointToLayer = options && options.pointToLayer,
  	    _coordsToLatLng = options && options.coordsToLatLng || coordsToLatLng,
  	    latlng, latlngs, i, len;

  	if (!coords && !geometry) {
  		return null;
  	}

  	switch (geometry.type) {
  	case 'Point':
  		latlng = _coordsToLatLng(coords);
  		return _pointToLayer(pointToLayer, geojson, latlng, options);

  	case 'MultiPoint':
  		for (i = 0, len = coords.length; i < len; i++) {
  			latlng = _coordsToLatLng(coords[i]);
  			layers.push(_pointToLayer(pointToLayer, geojson, latlng, options));
  		}
  		return new FeatureGroup(layers);

  	case 'LineString':
  	case 'MultiLineString':
  		latlngs = coordsToLatLngs(coords, geometry.type === 'LineString' ? 0 : 1, _coordsToLatLng);
  		return new Polyline(latlngs, options);

  	case 'Polygon':
  	case 'MultiPolygon':
  		latlngs = coordsToLatLngs(coords, geometry.type === 'Polygon' ? 1 : 2, _coordsToLatLng);
  		return new Polygon(latlngs, options);

  	case 'GeometryCollection':
  		for (i = 0, len = geometry.geometries.length; i < len; i++) {
  			var layer = geometryToLayer({
  				geometry: geometry.geometries[i],
  				type: 'Feature',
  				properties: geojson.properties
  			}, options);

  			if (layer) {
  				layers.push(layer);
  			}
  		}
  		return new FeatureGroup(layers);

  	default:
  		throw new Error('Invalid GeoJSON object.');
  	}
  }

  function _pointToLayer(pointToLayerFn, geojson, latlng, options) {
  	return pointToLayerFn ?
  		pointToLayerFn(geojson, latlng) :
  		new Marker(latlng, options && options.markersInheritOptions && options);
  }

  // @function coordsToLatLng(coords: Array): LatLng
  // Creates a `LatLng` object from an array of 2 numbers (longitude, latitude)
  // or 3 numbers (longitude, latitude, altitude) used in GeoJSON for points.
  function coordsToLatLng(coords) {
  	return new LatLng(coords[1], coords[0], coords[2]);
  }

  // @function coordsToLatLngs(coords: Array, levelsDeep?: Number, coordsToLatLng?: Function): Array
  // Creates a multidimensional array of `LatLng`s from a GeoJSON coordinates array.
  // `levelsDeep` specifies the nesting level (0 is for an array of points, 1 for an array of arrays of points, etc., 0 by default).
  // Can use a custom [`coordsToLatLng`](#geojson-coordstolatlng) function.
  function coordsToLatLngs(coords, levelsDeep, _coordsToLatLng) {
  	var latlngs = [];

  	for (var i = 0, len = coords.length, latlng; i < len; i++) {
  		latlng = levelsDeep ?
  			coordsToLatLngs(coords[i], levelsDeep - 1, _coordsToLatLng) :
  			(_coordsToLatLng || coordsToLatLng)(coords[i]);

  		latlngs.push(latlng);
  	}

  	return latlngs;
  }

  // @function latLngToCoords(latlng: LatLng, precision?: Number): Array
  // Reverse of [`coordsToLatLng`](#geojson-coordstolatlng)
  function latLngToCoords(latlng, precision) {
  	precision = typeof precision === 'number' ? precision : 6;
  	return latlng.alt !== undefined ?
  		[formatNum(latlng.lng, precision), formatNum(latlng.lat, precision), formatNum(latlng.alt, precision)] :
  		[formatNum(latlng.lng, precision), formatNum(latlng.lat, precision)];
  }

  // @function latLngsToCoords(latlngs: Array, levelsDeep?: Number, closed?: Boolean): Array
  // Reverse of [`coordsToLatLngs`](#geojson-coordstolatlngs)
  // `closed` determines whether the first point should be appended to the end of the array to close the feature, only used when `levelsDeep` is 0. False by default.
  function latLngsToCoords(latlngs, levelsDeep, closed, precision) {
  	var coords = [];

  	for (var i = 0, len = latlngs.length; i < len; i++) {
  		coords.push(levelsDeep ?
  			latLngsToCoords(latlngs[i], levelsDeep - 1, closed, precision) :
  			latLngToCoords(latlngs[i], precision));
  	}

  	if (!levelsDeep && closed) {
  		coords.push(coords[0]);
  	}

  	return coords;
  }

  function getFeature(layer, newGeometry) {
  	return layer.feature ?
  		extend({}, layer.feature, {geometry: newGeometry}) :
  		asFeature(newGeometry);
  }

  // @function asFeature(geojson: Object): Object
  // Normalize GeoJSON geometries/features into GeoJSON features.
  function asFeature(geojson) {
  	if (geojson.type === 'Feature' || geojson.type === 'FeatureCollection') {
  		return geojson;
  	}

  	return {
  		type: 'Feature',
  		properties: {},
  		geometry: geojson
  	};
  }

  var PointToGeoJSON = {
  	toGeoJSON: function (precision) {
  		return getFeature(this, {
  			type: 'Point',
  			coordinates: latLngToCoords(this.getLatLng(), precision)
  		});
  	}
  };

  // @namespace Marker
  // @section Other methods
  // @method toGeoJSON(precision?: Number): Object
  // `precision` is the number of decimal places for coordinates.
  // The default value is 6 places.
  // Returns a [`GeoJSON`](http://en.wikipedia.org/wiki/GeoJSON) representation of the marker (as a GeoJSON `Point` Feature).
  Marker.include(PointToGeoJSON);

  // @namespace CircleMarker
  // @method toGeoJSON(precision?: Number): Object
  // `precision` is the number of decimal places for coordinates.
  // The default value is 6 places.
  // Returns a [`GeoJSON`](http://en.wikipedia.org/wiki/GeoJSON) representation of the circle marker (as a GeoJSON `Point` Feature).
  Circle.include(PointToGeoJSON);
  CircleMarker.include(PointToGeoJSON);


  // @namespace Polyline
  // @method toGeoJSON(precision?: Number): Object
  // `precision` is the number of decimal places for coordinates.
  // The default value is 6 places.
  // Returns a [`GeoJSON`](http://en.wikipedia.org/wiki/GeoJSON) representation of the polyline (as a GeoJSON `LineString` or `MultiLineString` Feature).
  Polyline.include({
  	toGeoJSON: function (precision) {
  		var multi = !isFlat(this._latlngs);

  		var coords = latLngsToCoords(this._latlngs, multi ? 1 : 0, false, precision);

  		return getFeature(this, {
  			type: (multi ? 'Multi' : '') + 'LineString',
  			coordinates: coords
  		});
  	}
  });

  // @namespace Polygon
  // @method toGeoJSON(precision?: Number): Object
  // `precision` is the number of decimal places for coordinates.
  // The default value is 6 places.
  // Returns a [`GeoJSON`](http://en.wikipedia.org/wiki/GeoJSON) representation of the polygon (as a GeoJSON `Polygon` or `MultiPolygon` Feature).
  Polygon.include({
  	toGeoJSON: function (precision) {
  		var holes = !isFlat(this._latlngs),
  		    multi = holes && !isFlat(this._latlngs[0]);

  		var coords = latLngsToCoords(this._latlngs, multi ? 2 : holes ? 1 : 0, true, precision);

  		if (!holes) {
  			coords = [coords];
  		}

  		return getFeature(this, {
  			type: (multi ? 'Multi' : '') + 'Polygon',
  			coordinates: coords
  		});
  	}
  });


  // @namespace LayerGroup
  LayerGroup.include({
  	toMultiPoint: function (precision) {
  		var coords = [];

  		this.eachLayer(function (layer) {
  			coords.push(layer.toGeoJSON(precision).geometry.coordinates);
  		});

  		return getFeature(this, {
  			type: 'MultiPoint',
  			coordinates: coords
  		});
  	},

  	// @method toGeoJSON(precision?: Number): Object
  	// `precision` is the number of decimal places for coordinates.
  	// The default value is 6 places.
  	// Returns a [`GeoJSON`](http://en.wikipedia.org/wiki/GeoJSON) representation of the layer group (as a GeoJSON `FeatureCollection`, `GeometryCollection`, or `MultiPoint`).
  	toGeoJSON: function (precision) {

  		var type = this.feature && this.feature.geometry && this.feature.geometry.type;

  		if (type === 'MultiPoint') {
  			return this.toMultiPoint(precision);
  		}

  		var isGeometryCollection = type === 'GeometryCollection',
  		    jsons = [];

  		this.eachLayer(function (layer) {
  			if (layer.toGeoJSON) {
  				var json = layer.toGeoJSON(precision);
  				if (isGeometryCollection) {
  					jsons.push(json.geometry);
  				} else {
  					var feature = asFeature(json);
  					// Squash nested feature collections
  					if (feature.type === 'FeatureCollection') {
  						jsons.push.apply(jsons, feature.features);
  					} else {
  						jsons.push(feature);
  					}
  				}
  			}
  		});

  		if (isGeometryCollection) {
  			return getFeature(this, {
  				geometries: jsons,
  				type: 'GeometryCollection'
  			});
  		}

  		return {
  			type: 'FeatureCollection',
  			features: jsons
  		};
  	}
  });

  // @namespace GeoJSON
  // @factory L.geoJSON(geojson?: Object, options?: GeoJSON options)
  // Creates a GeoJSON layer. Optionally accepts an object in
  // [GeoJSON format](https://tools.ietf.org/html/rfc7946) to display on the map
  // (you can alternatively add it later with `addData` method) and an `options` object.
  function geoJSON(geojson, options) {
  	return new GeoJSON(geojson, options);
  }

  // Backward compatibility.
  var geoJson = geoJSON;

  /*
   * @class ImageOverlay
   * @aka L.ImageOverlay
   * @inherits Interactive layer
   *
   * Used to load and display a single image over specific bounds of the map. Extends `Layer`.
   *
   * @example
   *
   * ```js
   * var imageUrl = 'http://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg',
   * 	imageBounds = [[40.712216, -74.22655], [40.773941, -74.12544]];
   * L.imageOverlay(imageUrl, imageBounds).addTo(map);
   * ```
   */

  var ImageOverlay = Layer.extend({

  	// @section
  	// @aka ImageOverlay options
  	options: {
  		// @option opacity: Number = 1.0
  		// The opacity of the image overlay.
  		opacity: 1,

  		// @option alt: String = ''
  		// Text for the `alt` attribute of the image (useful for accessibility).
  		alt: '',

  		// @option interactive: Boolean = false
  		// If `true`, the image overlay will emit [mouse events](#interactive-layer) when clicked or hovered.
  		interactive: false,

  		// @option crossOrigin: Boolean|String = false
  		// Whether the crossOrigin attribute will be added to the image.
  		// If a String is provided, the image will have its crossOrigin attribute set to the String provided. This is needed if you want to access image pixel data.
  		// Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
  		crossOrigin: false,

  		// @option errorOverlayUrl: String = ''
  		// URL to the overlay image to show in place of the overlay that failed to load.
  		errorOverlayUrl: '',

  		// @option zIndex: Number = 1
  		// The explicit [zIndex](https://developer.mozilla.org/docs/Web/CSS/CSS_Positioning/Understanding_z_index) of the overlay layer.
  		zIndex: 1,

  		// @option className: String = ''
  		// A custom class name to assign to the image. Empty by default.
  		className: ''
  	},

  	initialize: function (url, bounds, options) { // (String, LatLngBounds, Object)
  		this._url = url;
  		this._bounds = toLatLngBounds(bounds);

  		setOptions(this, options);
  	},

  	onAdd: function () {
  		if (!this._image) {
  			this._initImage();

  			if (this.options.opacity < 1) {
  				this._updateOpacity();
  			}
  		}

  		if (this.options.interactive) {
  			addClass(this._image, 'leaflet-interactive');
  			this.addInteractiveTarget(this._image);
  		}

  		this.getPane().appendChild(this._image);
  		this._reset();
  	},

  	onRemove: function () {
  		remove(this._image);
  		if (this.options.interactive) {
  			this.removeInteractiveTarget(this._image);
  		}
  	},

  	// @method setOpacity(opacity: Number): this
  	// Sets the opacity of the overlay.
  	setOpacity: function (opacity) {
  		this.options.opacity = opacity;

  		if (this._image) {
  			this._updateOpacity();
  		}
  		return this;
  	},

  	setStyle: function (styleOpts) {
  		if (styleOpts.opacity) {
  			this.setOpacity(styleOpts.opacity);
  		}
  		return this;
  	},

  	// @method bringToFront(): this
  	// Brings the layer to the top of all overlays.
  	bringToFront: function () {
  		if (this._map) {
  			toFront(this._image);
  		}
  		return this;
  	},

  	// @method bringToBack(): this
  	// Brings the layer to the bottom of all overlays.
  	bringToBack: function () {
  		if (this._map) {
  			toBack(this._image);
  		}
  		return this;
  	},

  	// @method setUrl(url: String): this
  	// Changes the URL of the image.
  	setUrl: function (url) {
  		this._url = url;

  		if (this._image) {
  			this._image.src = url;
  		}
  		return this;
  	},

  	// @method setBounds(bounds: LatLngBounds): this
  	// Update the bounds that this ImageOverlay covers
  	setBounds: function (bounds) {
  		this._bounds = toLatLngBounds(bounds);

  		if (this._map) {
  			this._reset();
  		}
  		return this;
  	},

  	getEvents: function () {
  		var events = {
  			zoom: this._reset,
  			viewreset: this._reset
  		};

  		if (this._zoomAnimated) {
  			events.zoomanim = this._animateZoom;
  		}

  		return events;
  	},

  	// @method setZIndex(value: Number): this
  	// Changes the [zIndex](#imageoverlay-zindex) of the image overlay.
  	setZIndex: function (value) {
  		this.options.zIndex = value;
  		this._updateZIndex();
  		return this;
  	},

  	// @method getBounds(): LatLngBounds
  	// Get the bounds that this ImageOverlay covers
  	getBounds: function () {
  		return this._bounds;
  	},

  	// @method getElement(): HTMLElement
  	// Returns the instance of [`HTMLImageElement`](https://developer.mozilla.org/docs/Web/API/HTMLImageElement)
  	// used by this overlay.
  	getElement: function () {
  		return this._image;
  	},

  	_initImage: function () {
  		var wasElementSupplied = this._url.tagName === 'IMG';
  		var img = this._image = wasElementSupplied ? this._url : create$1('img');

  		addClass(img, 'leaflet-image-layer');
  		if (this._zoomAnimated) { addClass(img, 'leaflet-zoom-animated'); }
  		if (this.options.className) { addClass(img, this.options.className); }

  		img.onselectstart = falseFn;
  		img.onmousemove = falseFn;

  		// @event load: Event
  		// Fired when the ImageOverlay layer has loaded its image
  		img.onload = bind(this.fire, this, 'load');
  		img.onerror = bind(this._overlayOnError, this, 'error');

  		if (this.options.crossOrigin || this.options.crossOrigin === '') {
  			img.crossOrigin = this.options.crossOrigin === true ? '' : this.options.crossOrigin;
  		}

  		if (this.options.zIndex) {
  			this._updateZIndex();
  		}

  		if (wasElementSupplied) {
  			this._url = img.src;
  			return;
  		}

  		img.src = this._url;
  		img.alt = this.options.alt;
  	},

  	_animateZoom: function (e) {
  		var scale = this._map.getZoomScale(e.zoom),
  		    offset = this._map._latLngBoundsToNewLayerBounds(this._bounds, e.zoom, e.center).min;

  		setTransform(this._image, offset, scale);
  	},

  	_reset: function () {
  		var image = this._image,
  		    bounds = new Bounds(
  		        this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
  		        this._map.latLngToLayerPoint(this._bounds.getSouthEast())),
  		    size = bounds.getSize();

  		setPosition(image, bounds.min);

  		image.style.width  = size.x + 'px';
  		image.style.height = size.y + 'px';
  	},

  	_updateOpacity: function () {
  		setOpacity(this._image, this.options.opacity);
  	},

  	_updateZIndex: function () {
  		if (this._image && this.options.zIndex !== undefined && this.options.zIndex !== null) {
  			this._image.style.zIndex = this.options.zIndex;
  		}
  	},

  	_overlayOnError: function () {
  		// @event error: Event
  		// Fired when the ImageOverlay layer fails to load its image
  		this.fire('error');

  		var errorUrl = this.options.errorOverlayUrl;
  		if (errorUrl && this._url !== errorUrl) {
  			this._url = errorUrl;
  			this._image.src = errorUrl;
  		}
  	}
  });

  // @factory L.imageOverlay(imageUrl: String, bounds: LatLngBounds, options?: ImageOverlay options)
  // Instantiates an image overlay object given the URL of the image and the
  // geographical bounds it is tied to.
  var imageOverlay = function (url, bounds, options) {
  	return new ImageOverlay(url, bounds, options);
  };

  /*
   * @class VideoOverlay
   * @aka L.VideoOverlay
   * @inherits ImageOverlay
   *
   * Used to load and display a video player over specific bounds of the map. Extends `ImageOverlay`.
   *
   * A video overlay uses the [`<video>`](https://developer.mozilla.org/docs/Web/HTML/Element/video)
   * HTML5 element.
   *
   * @example
   *
   * ```js
   * var videoUrl = 'https://www.mapbox.com/bites/00188/patricia_nasa.webm',
   * 	videoBounds = [[ 32, -130], [ 13, -100]];
   * L.videoOverlay(videoUrl, videoBounds ).addTo(map);
   * ```
   */

  var VideoOverlay = ImageOverlay.extend({

  	// @section
  	// @aka VideoOverlay options
  	options: {
  		// @option autoplay: Boolean = true
  		// Whether the video starts playing automatically when loaded.
  		autoplay: true,

  		// @option loop: Boolean = true
  		// Whether the video will loop back to the beginning when played.
  		loop: true,

  		// @option keepAspectRatio: Boolean = true
  		// Whether the video will save aspect ratio after the projection.
  		// Relevant for supported browsers. Browser compatibility- https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
  		keepAspectRatio: true,

  		// @option muted: Boolean = false
  		// Whether the video starts on mute when loaded.
  		muted: false
  	},

  	_initImage: function () {
  		var wasElementSupplied = this._url.tagName === 'VIDEO';
  		var vid = this._image = wasElementSupplied ? this._url : create$1('video');

  		addClass(vid, 'leaflet-image-layer');
  		if (this._zoomAnimated) { addClass(vid, 'leaflet-zoom-animated'); }
  		if (this.options.className) { addClass(vid, this.options.className); }

  		vid.onselectstart = falseFn;
  		vid.onmousemove = falseFn;

  		// @event load: Event
  		// Fired when the video has finished loading the first frame
  		vid.onloadeddata = bind(this.fire, this, 'load');

  		if (wasElementSupplied) {
  			var sourceElements = vid.getElementsByTagName('source');
  			var sources = [];
  			for (var j = 0; j < sourceElements.length; j++) {
  				sources.push(sourceElements[j].src);
  			}

  			this._url = (sourceElements.length > 0) ? sources : [vid.src];
  			return;
  		}

  		if (!isArray(this._url)) { this._url = [this._url]; }

  		if (!this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(vid.style, 'objectFit')) {
  			vid.style['objectFit'] = 'fill';
  		}
  		vid.autoplay = !!this.options.autoplay;
  		vid.loop = !!this.options.loop;
  		vid.muted = !!this.options.muted;
  		for (var i = 0; i < this._url.length; i++) {
  			var source = create$1('source');
  			source.src = this._url[i];
  			vid.appendChild(source);
  		}
  	}

  	// @method getElement(): HTMLVideoElement
  	// Returns the instance of [`HTMLVideoElement`](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement)
  	// used by this overlay.
  });


  // @factory L.videoOverlay(video: String|Array|HTMLVideoElement, bounds: LatLngBounds, options?: VideoOverlay options)
  // Instantiates an image overlay object given the URL of the video (or array of URLs, or even a video element) and the
  // geographical bounds it is tied to.

  function videoOverlay(video, bounds, options) {
  	return new VideoOverlay(video, bounds, options);
  }

  /*
   * @class SVGOverlay
   * @aka L.SVGOverlay
   * @inherits ImageOverlay
   *
   * Used to load, display and provide DOM access to an SVG file over specific bounds of the map. Extends `ImageOverlay`.
   *
   * An SVG overlay uses the [`<svg>`](https://developer.mozilla.org/docs/Web/SVG/Element/svg) element.
   *
   * @example
   *
   * ```js
   * var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
   * svgElement.setAttribute('xmlns', "http://www.w3.org/2000/svg");
   * svgElement.setAttribute('viewBox', "0 0 200 200");
   * svgElement.innerHTML = '<rect width="200" height="200"/><rect x="75" y="23" width="50" height="50" style="fill:red"/><rect x="75" y="123" width="50" height="50" style="fill:#0013ff"/>';
   * var svgElementBounds = [ [ 32, -130 ], [ 13, -100 ] ];
   * L.svgOverlay(svgElement, svgElementBounds).addTo(map);
   * ```
   */

  var SVGOverlay = ImageOverlay.extend({
  	_initImage: function () {
  		var el = this._image = this._url;

  		addClass(el, 'leaflet-image-layer');
  		if (this._zoomAnimated) { addClass(el, 'leaflet-zoom-animated'); }
  		if (this.options.className) { addClass(el, this.options.className); }

  		el.onselectstart = falseFn;
  		el.onmousemove = falseFn;
  	}

  	// @method getElement(): SVGElement
  	// Returns the instance of [`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)
  	// used by this overlay.
  });


  // @factory L.svgOverlay(svg: String|SVGElement, bounds: LatLngBounds, options?: SVGOverlay options)
  // Instantiates an image overlay object given an SVG element and the geographical bounds it is tied to.
  // A viewBox attribute is required on the SVG element to zoom in and out properly.

  function svgOverlay(el, bounds, options) {
  	return new SVGOverlay(el, bounds, options);
  }

  /*
   * @class DivOverlay
   * @inherits Layer
   * @aka L.DivOverlay
   * Base model for L.Popup and L.Tooltip. Inherit from it for custom popup like plugins.
   */

  // @namespace DivOverlay
  var DivOverlay = Layer.extend({

  	// @section
  	// @aka DivOverlay options
  	options: {
  		// @option offset: Point = Point(0, 7)
  		// The offset of the popup position. Useful to control the anchor
  		// of the popup when opening it on some overlays.
  		offset: [0, 7],

  		// @option className: String = ''
  		// A custom CSS class name to assign to the popup.
  		className: '',

  		// @option pane: String = 'popupPane'
  		// `Map pane` where the popup will be added.
  		pane: 'popupPane'
  	},

  	initialize: function (options, source) {
  		setOptions(this, options);

  		this._source = source;
  	},

  	onAdd: function (map) {
  		this._zoomAnimated = map._zoomAnimated;

  		if (!this._container) {
  			this._initLayout();
  		}

  		if (map._fadeAnimated) {
  			setOpacity(this._container, 0);
  		}

  		clearTimeout(this._removeTimeout);
  		this.getPane().appendChild(this._container);
  		this.update();

  		if (map._fadeAnimated) {
  			setOpacity(this._container, 1);
  		}

  		this.bringToFront();
  	},

  	onRemove: function (map) {
  		if (map._fadeAnimated) {
  			setOpacity(this._container, 0);
  			this._removeTimeout = setTimeout(bind(remove, undefined, this._container), 200);
  		} else {
  			remove(this._container);
  		}
  	},

  	// @namespace Popup
  	// @method getLatLng: LatLng
  	// Returns the geographical point of popup.
  	getLatLng: function () {
  		return this._latlng;
  	},

  	// @method setLatLng(latlng: LatLng): this
  	// Sets the geographical point where the popup will open.
  	setLatLng: function (latlng) {
  		this._latlng = toLatLng(latlng);
  		if (this._map) {
  			this._updatePosition();
  			this._adjustPan();
  		}
  		return this;
  	},

  	// @method getContent: String|HTMLElement
  	// Returns the content of the popup.
  	getContent: function () {
  		return this._content;
  	},

  	// @method setContent(htmlContent: String|HTMLElement|Function): this
  	// Sets the HTML content of the popup. If a function is passed the source layer will be passed to the function. The function should return a `String` or `HTMLElement` to be used in the popup.
  	setContent: function (content) {
  		this._content = content;
  		this.update();
  		return this;
  	},

  	// @method getElement: String|HTMLElement
  	// Returns the HTML container of the popup.
  	getElement: function () {
  		return this._container;
  	},

  	// @method update: null
  	// Updates the popup content, layout and position. Useful for updating the popup after something inside changed, e.g. image loaded.
  	update: function () {
  		if (!this._map) { return; }

  		this._container.style.visibility = 'hidden';

  		this._updateContent();
  		this._updateLayout();
  		this._updatePosition();

  		this._container.style.visibility = '';

  		this._adjustPan();
  	},

  	getEvents: function () {
  		var events = {
  			zoom: this._updatePosition,
  			viewreset: this._updatePosition
  		};

  		if (this._zoomAnimated) {
  			events.zoomanim = this._animateZoom;
  		}
  		return events;
  	},

  	// @method isOpen: Boolean
  	// Returns `true` when the popup is visible on the map.
  	isOpen: function () {
  		return !!this._map && this._map.hasLayer(this);
  	},

  	// @method bringToFront: this
  	// Brings this popup in front of other popups (in the same map pane).
  	bringToFront: function () {
  		if (this._map) {
  			toFront(this._container);
  		}
  		return this;
  	},

  	// @method bringToBack: this
  	// Brings this popup to the back of other popups (in the same map pane).
  	bringToBack: function () {
  		if (this._map) {
  			toBack(this._container);
  		}
  		return this;
  	},

  	_prepareOpen: function (parent, layer, latlng) {
  		if (!(layer instanceof Layer)) {
  			latlng = layer;
  			layer = parent;
  		}

  		if (layer instanceof FeatureGroup) {
  			for (var id in parent._layers) {
  				layer = parent._layers[id];
  				break;
  			}
  		}

  		if (!latlng) {
  			if (layer.getCenter) {
  				latlng = layer.getCenter();
  			} else if (layer.getLatLng) {
  				latlng = layer.getLatLng();
  			} else {
  				throw new Error('Unable to get source layer LatLng.');
  			}
  		}

  		// set overlay source to this layer
  		this._source = layer;

  		// update the overlay (content, layout, ect...)
  		this.update();

  		return latlng;
  	},

  	_updateContent: function () {
  		if (!this._content) { return; }

  		var node = this._contentNode;
  		var content = (typeof this._content === 'function') ? this._content(this._source || this) : this._content;

  		if (typeof content === 'string') {
  			node.innerHTML = content;
  		} else {
  			while (node.hasChildNodes()) {
  				node.removeChild(node.firstChild);
  			}
  			node.appendChild(content);
  		}
  		this.fire('contentupdate');
  	},

  	_updatePosition: function () {
  		if (!this._map) { return; }

  		var pos = this._map.latLngToLayerPoint(this._latlng),
  		    offset = toPoint(this.options.offset),
  		    anchor = this._getAnchor();

  		if (this._zoomAnimated) {
  			setPosition(this._container, pos.add(anchor));
  		} else {
  			offset = offset.add(pos).add(anchor);
  		}

  		var bottom = this._containerBottom = -offset.y,
  		    left = this._containerLeft = -Math.round(this._containerWidth / 2) + offset.x;

  		// bottom position the popup in case the height of the popup changes (images loading etc)
  		this._container.style.bottom = bottom + 'px';
  		this._container.style.left = left + 'px';
  	},

  	_getAnchor: function () {
  		return [0, 0];
  	}

  });

  /*
   * @class Popup
   * @inherits DivOverlay
   * @aka L.Popup
   * Used to open popups in certain places of the map. Use [Map.openPopup](#map-openpopup) to
   * open popups while making sure that only one popup is open at one time
   * (recommended for usability), or use [Map.addLayer](#map-addlayer) to open as many as you want.
   *
   * @example
   *
   * If you want to just bind a popup to marker click and then open it, it's really easy:
   *
   * ```js
   * marker.bindPopup(popupContent).openPopup();
   * ```
   * Path overlays like polylines also have a `bindPopup` method.
   * Here's a more complicated way to open a popup on a map:
   *
   * ```js
   * var popup = L.popup()
   * 	.setLatLng(latlng)
   * 	.setContent('<p>Hello world!<br />This is a nice popup.</p>')
   * 	.openOn(map);
   * ```
   */


  // @namespace Popup
  var Popup = DivOverlay.extend({

  	// @section
  	// @aka Popup options
  	options: {
  		// @option maxWidth: Number = 300
  		// Max width of the popup, in pixels.
  		maxWidth: 300,

  		// @option minWidth: Number = 50
  		// Min width of the popup, in pixels.
  		minWidth: 50,

  		// @option maxHeight: Number = null
  		// If set, creates a scrollable container of the given height
  		// inside a popup if its content exceeds it.
  		maxHeight: null,

  		// @option autoPan: Boolean = true
  		// Set it to `false` if you don't want the map to do panning animation
  		// to fit the opened popup.
  		autoPan: true,

  		// @option autoPanPaddingTopLeft: Point = null
  		// The margin between the popup and the top left corner of the map
  		// view after autopanning was performed.
  		autoPanPaddingTopLeft: null,

  		// @option autoPanPaddingBottomRight: Point = null
  		// The margin between the popup and the bottom right corner of the map
  		// view after autopanning was performed.
  		autoPanPaddingBottomRight: null,

  		// @option autoPanPadding: Point = Point(5, 5)
  		// Equivalent of setting both top left and bottom right autopan padding to the same value.
  		autoPanPadding: [5, 5],

  		// @option keepInView: Boolean = false
  		// Set it to `true` if you want to prevent users from panning the popup
  		// off of the screen while it is open.
  		keepInView: false,

  		// @option closeButton: Boolean = true
  		// Controls the presence of a close button in the popup.
  		closeButton: true,

  		// @option autoClose: Boolean = true
  		// Set it to `false` if you want to override the default behavior of
  		// the popup closing when another popup is opened.
  		autoClose: true,

  		// @option closeOnEscapeKey: Boolean = true
  		// Set it to `false` if you want to override the default behavior of
  		// the ESC key for closing of the popup.
  		closeOnEscapeKey: true,

  		// @option closeOnClick: Boolean = *
  		// Set it if you want to override the default behavior of the popup closing when user clicks
  		// on the map. Defaults to the map's [`closePopupOnClick`](#map-closepopuponclick) option.

  		// @option className: String = ''
  		// A custom CSS class name to assign to the popup.
  		className: ''
  	},

  	// @namespace Popup
  	// @method openOn(map: Map): this
  	// Adds the popup to the map and closes the previous one. The same as `map.openPopup(popup)`.
  	openOn: function (map) {
  		map.openPopup(this);
  		return this;
  	},

  	onAdd: function (map) {
  		DivOverlay.prototype.onAdd.call(this, map);

  		// @namespace Map
  		// @section Popup events
  		// @event popupopen: PopupEvent
  		// Fired when a popup is opened in the map
  		map.fire('popupopen', {popup: this});

  		if (this._source) {
  			// @namespace Layer
  			// @section Popup events
  			// @event popupopen: PopupEvent
  			// Fired when a popup bound to this layer is opened
  			this._source.fire('popupopen', {popup: this}, true);
  			// For non-path layers, we toggle the popup when clicking
  			// again the layer, so prevent the map to reopen it.
  			if (!(this._source instanceof Path)) {
  				this._source.on('preclick', stopPropagation);
  			}
  		}
  	},

  	onRemove: function (map) {
  		DivOverlay.prototype.onRemove.call(this, map);

  		// @namespace Map
  		// @section Popup events
  		// @event popupclose: PopupEvent
  		// Fired when a popup in the map is closed
  		map.fire('popupclose', {popup: this});

  		if (this._source) {
  			// @namespace Layer
  			// @section Popup events
  			// @event popupclose: PopupEvent
  			// Fired when a popup bound to this layer is closed
  			this._source.fire('popupclose', {popup: this}, true);
  			if (!(this._source instanceof Path)) {
  				this._source.off('preclick', stopPropagation);
  			}
  		}
  	},

  	getEvents: function () {
  		var events = DivOverlay.prototype.getEvents.call(this);

  		if (this.options.closeOnClick !== undefined ? this.options.closeOnClick : this._map.options.closePopupOnClick) {
  			events.preclick = this._close;
  		}

  		if (this.options.keepInView) {
  			events.moveend = this._adjustPan;
  		}

  		return events;
  	},

  	_close: function () {
  		if (this._map) {
  			this._map.closePopup(this);
  		}
  	},

  	_initLayout: function () {
  		var prefix = 'leaflet-popup',
  		    container = this._container = create$1('div',
  			prefix + ' ' + (this.options.className || '') +
  			' leaflet-zoom-animated');

  		var wrapper = this._wrapper = create$1('div', prefix + '-content-wrapper', container);
  		this._contentNode = create$1('div', prefix + '-content', wrapper);

  		disableClickPropagation(container);
  		disableScrollPropagation(this._contentNode);
  		on(container, 'contextmenu', stopPropagation);

  		this._tipContainer = create$1('div', prefix + '-tip-container', container);
  		this._tip = create$1('div', prefix + '-tip', this._tipContainer);

  		if (this.options.closeButton) {
  			var closeButton = this._closeButton = create$1('a', prefix + '-close-button', container);
  			closeButton.href = '#close';
  			closeButton.innerHTML = '&#215;';

  			on(closeButton, 'click', this._onCloseButtonClick, this);
  		}
  	},

  	_updateLayout: function () {
  		var container = this._contentNode,
  		    style = container.style;

  		style.width = '';
  		style.whiteSpace = 'nowrap';

  		var width = container.offsetWidth;
  		width = Math.min(width, this.options.maxWidth);
  		width = Math.max(width, this.options.minWidth);

  		style.width = (width + 1) + 'px';
  		style.whiteSpace = '';

  		style.height = '';

  		var height = container.offsetHeight,
  		    maxHeight = this.options.maxHeight,
  		    scrolledClass = 'leaflet-popup-scrolled';

  		if (maxHeight && height > maxHeight) {
  			style.height = maxHeight + 'px';
  			addClass(container, scrolledClass);
  		} else {
  			removeClass(container, scrolledClass);
  		}

  		this._containerWidth = this._container.offsetWidth;
  	},

  	_animateZoom: function (e) {
  		var pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center),
  		    anchor = this._getAnchor();
  		setPosition(this._container, pos.add(anchor));
  	},

  	_adjustPan: function () {
  		if (!this.options.autoPan) { return; }
  		if (this._map._panAnim) { this._map._panAnim.stop(); }

  		var map = this._map,
  		    marginBottom = parseInt(getStyle(this._container, 'marginBottom'), 10) || 0,
  		    containerHeight = this._container.offsetHeight + marginBottom,
  		    containerWidth = this._containerWidth,
  		    layerPos = new Point(this._containerLeft, -containerHeight - this._containerBottom);

  		layerPos._add(getPosition(this._container));

  		var containerPos = map.layerPointToContainerPoint(layerPos),
  		    padding = toPoint(this.options.autoPanPadding),
  		    paddingTL = toPoint(this.options.autoPanPaddingTopLeft || padding),
  		    paddingBR = toPoint(this.options.autoPanPaddingBottomRight || padding),
  		    size = map.getSize(),
  		    dx = 0,
  		    dy = 0;

  		if (containerPos.x + containerWidth + paddingBR.x > size.x) { // right
  			dx = containerPos.x + containerWidth - size.x + paddingBR.x;
  		}
  		if (containerPos.x - dx - paddingTL.x < 0) { // left
  			dx = containerPos.x - paddingTL.x;
  		}
  		if (containerPos.y + containerHeight + paddingBR.y > size.y) { // bottom
  			dy = containerPos.y + containerHeight - size.y + paddingBR.y;
  		}
  		if (containerPos.y - dy - paddingTL.y < 0) { // top
  			dy = containerPos.y - paddingTL.y;
  		}

  		// @namespace Map
  		// @section Popup events
  		// @event autopanstart: Event
  		// Fired when the map starts autopanning when opening a popup.
  		if (dx || dy) {
  			map
  			    .fire('autopanstart')
  			    .panBy([dx, dy]);
  		}
  	},

  	_onCloseButtonClick: function (e) {
  		this._close();
  		stop(e);
  	},

  	_getAnchor: function () {
  		// Where should we anchor the popup on the source layer?
  		return toPoint(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
  	}

  });

  // @namespace Popup
  // @factory L.popup(options?: Popup options, source?: Layer)
  // Instantiates a `Popup` object given an optional `options` object that describes its appearance and location and an optional `source` object that is used to tag the popup with a reference to the Layer to which it refers.
  var popup = function (options, source) {
  	return new Popup(options, source);
  };


  /* @namespace Map
   * @section Interaction Options
   * @option closePopupOnClick: Boolean = true
   * Set it to `false` if you don't want popups to close when user clicks the map.
   */
  Map.mergeOptions({
  	closePopupOnClick: true
  });


  // @namespace Map
  // @section Methods for Layers and Controls
  Map.include({
  	// @method openPopup(popup: Popup): this
  	// Opens the specified popup while closing the previously opened (to make sure only one is opened at one time for usability).
  	// @alternative
  	// @method openPopup(content: String|HTMLElement, latlng: LatLng, options?: Popup options): this
  	// Creates a popup with the specified content and options and opens it in the given point on a map.
  	openPopup: function (popup, latlng, options) {
  		if (!(popup instanceof Popup)) {
  			popup = new Popup(options).setContent(popup);
  		}

  		if (latlng) {
  			popup.setLatLng(latlng);
  		}

  		if (this.hasLayer(popup)) {
  			return this;
  		}

  		if (this._popup && this._popup.options.autoClose) {
  			this.closePopup();
  		}

  		this._popup = popup;
  		return this.addLayer(popup);
  	},

  	// @method closePopup(popup?: Popup): this
  	// Closes the popup previously opened with [openPopup](#map-openpopup) (or the given one).
  	closePopup: function (popup) {
  		if (!popup || popup === this._popup) {
  			popup = this._popup;
  			this._popup = null;
  		}
  		if (popup) {
  			this.removeLayer(popup);
  		}
  		return this;
  	}
  });

  /*
   * @namespace Layer
   * @section Popup methods example
   *
   * All layers share a set of methods convenient for binding popups to it.
   *
   * ```js
   * var layer = L.Polygon(latlngs).bindPopup('Hi There!').addTo(map);
   * layer.openPopup();
   * layer.closePopup();
   * ```
   *
   * Popups will also be automatically opened when the layer is clicked on and closed when the layer is removed from the map or another popup is opened.
   */

  // @section Popup methods
  Layer.include({

  	// @method bindPopup(content: String|HTMLElement|Function|Popup, options?: Popup options): this
  	// Binds a popup to the layer with the passed `content` and sets up the
  	// necessary event listeners. If a `Function` is passed it will receive
  	// the layer as the first argument and should return a `String` or `HTMLElement`.
  	bindPopup: function (content, options) {

  		if (content instanceof Popup) {
  			setOptions(content, options);
  			this._popup = content;
  			content._source = this;
  		} else {
  			if (!this._popup || options) {
  				this._popup = new Popup(options, this);
  			}
  			this._popup.setContent(content);
  		}

  		if (!this._popupHandlersAdded) {
  			this.on({
  				click: this._openPopup,
  				keypress: this._onKeyPress,
  				remove: this.closePopup,
  				move: this._movePopup
  			});
  			this._popupHandlersAdded = true;
  		}

  		return this;
  	},

  	// @method unbindPopup(): this
  	// Removes the popup previously bound with `bindPopup`.
  	unbindPopup: function () {
  		if (this._popup) {
  			this.off({
  				click: this._openPopup,
  				keypress: this._onKeyPress,
  				remove: this.closePopup,
  				move: this._movePopup
  			});
  			this._popupHandlersAdded = false;
  			this._popup = null;
  		}
  		return this;
  	},

  	// @method openPopup(latlng?: LatLng): this
  	// Opens the bound popup at the specified `latlng` or at the default popup anchor if no `latlng` is passed.
  	openPopup: function (layer, latlng) {
  		if (this._popup && this._map) {
  			latlng = this._popup._prepareOpen(this, layer, latlng);

  			// open the popup on the map
  			this._map.openPopup(this._popup, latlng);
  		}

  		return this;
  	},

  	// @method closePopup(): this
  	// Closes the popup bound to this layer if it is open.
  	closePopup: function () {
  		if (this._popup) {
  			this._popup._close();
  		}
  		return this;
  	},

  	// @method togglePopup(): this
  	// Opens or closes the popup bound to this layer depending on its current state.
  	togglePopup: function (target) {
  		if (this._popup) {
  			if (this._popup._map) {
  				this.closePopup();
  			} else {
  				this.openPopup(target);
  			}
  		}
  		return this;
  	},

  	// @method isPopupOpen(): boolean
  	// Returns `true` if the popup bound to this layer is currently open.
  	isPopupOpen: function () {
  		return (this._popup ? this._popup.isOpen() : false);
  	},

  	// @method setPopupContent(content: String|HTMLElement|Popup): this
  	// Sets the content of the popup bound to this layer.
  	setPopupContent: function (content) {
  		if (this._popup) {
  			this._popup.setContent(content);
  		}
  		return this;
  	},

  	// @method getPopup(): Popup
  	// Returns the popup bound to this layer.
  	getPopup: function () {
  		return this._popup;
  	},

  	_openPopup: function (e) {
  		var layer = e.layer || e.target;

  		if (!this._popup) {
  			return;
  		}

  		if (!this._map) {
  			return;
  		}

  		// prevent map click
  		stop(e);

  		// if this inherits from Path its a vector and we can just
  		// open the popup at the new location
  		if (layer instanceof Path) {
  			this.openPopup(e.layer || e.target, e.latlng);
  			return;
  		}

  		// otherwise treat it like a marker and figure out
  		// if we should toggle it open/closed
  		if (this._map.hasLayer(this._popup) && this._popup._source === layer) {
  			this.closePopup();
  		} else {
  			this.openPopup(layer, e.latlng);
  		}
  	},

  	_movePopup: function (e) {
  		this._popup.setLatLng(e.latlng);
  	},

  	_onKeyPress: function (e) {
  		if (e.originalEvent.keyCode === 13) {
  			this._openPopup(e);
  		}
  	}
  });

  /*
   * @class Tooltip
   * @inherits DivOverlay
   * @aka L.Tooltip
   * Used to display small texts on top of map layers.
   *
   * @example
   *
   * ```js
   * marker.bindTooltip("my tooltip text").openTooltip();
   * ```
   * Note about tooltip offset. Leaflet takes two options in consideration
   * for computing tooltip offsetting:
   * - the `offset` Tooltip option: it defaults to [0, 0], and it's specific to one tooltip.
   *   Add a positive x offset to move the tooltip to the right, and a positive y offset to
   *   move it to the bottom. Negatives will move to the left and top.
   * - the `tooltipAnchor` Icon option: this will only be considered for Marker. You
   *   should adapt this value if you use a custom icon.
   */


  // @namespace Tooltip
  var Tooltip = DivOverlay.extend({

  	// @section
  	// @aka Tooltip options
  	options: {
  		// @option pane: String = 'tooltipPane'
  		// `Map pane` where the tooltip will be added.
  		pane: 'tooltipPane',

  		// @option offset: Point = Point(0, 0)
  		// Optional offset of the tooltip position.
  		offset: [0, 0],

  		// @option direction: String = 'auto'
  		// Direction where to open the tooltip. Possible values are: `right`, `left`,
  		// `top`, `bottom`, `center`, `auto`.
  		// `auto` will dynamically switch between `right` and `left` according to the tooltip
  		// position on the map.
  		direction: 'auto',

  		// @option permanent: Boolean = false
  		// Whether to open the tooltip permanently or only on mouseover.
  		permanent: false,

  		// @option sticky: Boolean = false
  		// If true, the tooltip will follow the mouse instead of being fixed at the feature center.
  		sticky: false,

  		// @option interactive: Boolean = false
  		// If true, the tooltip will listen to the feature events.
  		interactive: false,

  		// @option opacity: Number = 0.9
  		// Tooltip container opacity.
  		opacity: 0.9
  	},

  	onAdd: function (map) {
  		DivOverlay.prototype.onAdd.call(this, map);
  		this.setOpacity(this.options.opacity);

  		// @namespace Map
  		// @section Tooltip events
  		// @event tooltipopen: TooltipEvent
  		// Fired when a tooltip is opened in the map.
  		map.fire('tooltipopen', {tooltip: this});

  		if (this._source) {
  			// @namespace Layer
  			// @section Tooltip events
  			// @event tooltipopen: TooltipEvent
  			// Fired when a tooltip bound to this layer is opened.
  			this._source.fire('tooltipopen', {tooltip: this}, true);
  		}
  	},

  	onRemove: function (map) {
  		DivOverlay.prototype.onRemove.call(this, map);

  		// @namespace Map
  		// @section Tooltip events
  		// @event tooltipclose: TooltipEvent
  		// Fired when a tooltip in the map is closed.
  		map.fire('tooltipclose', {tooltip: this});

  		if (this._source) {
  			// @namespace Layer
  			// @section Tooltip events
  			// @event tooltipclose: TooltipEvent
  			// Fired when a tooltip bound to this layer is closed.
  			this._source.fire('tooltipclose', {tooltip: this}, true);
  		}
  	},

  	getEvents: function () {
  		var events = DivOverlay.prototype.getEvents.call(this);

  		if (touch && !this.options.permanent) {
  			events.preclick = this._close;
  		}

  		return events;
  	},

  	_close: function () {
  		if (this._map) {
  			this._map.closeTooltip(this);
  		}
  	},

  	_initLayout: function () {
  		var prefix = 'leaflet-tooltip',
  		    className = prefix + ' ' + (this.options.className || '') + ' leaflet-zoom-' + (this._zoomAnimated ? 'animated' : 'hide');

  		this._contentNode = this._container = create$1('div', className);
  	},

  	_updateLayout: function () {},

  	_adjustPan: function () {},

  	_setPosition: function (pos) {
  		var subX, subY,
  		    map = this._map,
  		    container = this._container,
  		    centerPoint = map.latLngToContainerPoint(map.getCenter()),
  		    tooltipPoint = map.layerPointToContainerPoint(pos),
  		    direction = this.options.direction,
  		    tooltipWidth = container.offsetWidth,
  		    tooltipHeight = container.offsetHeight,
  		    offset = toPoint(this.options.offset),
  		    anchor = this._getAnchor();

  		if (direction === 'top') {
  			subX = tooltipWidth / 2;
  			subY = tooltipHeight;
  		} else if (direction === 'bottom') {
  			subX = tooltipWidth / 2;
  			subY = 0;
  		} else if (direction === 'center') {
  			subX = tooltipWidth / 2;
  			subY = tooltipHeight / 2;
  		} else if (direction === 'right') {
  			subX = 0;
  			subY = tooltipHeight / 2;
  		} else if (direction === 'left') {
  			subX = tooltipWidth;
  			subY = tooltipHeight / 2;
  		} else if (tooltipPoint.x < centerPoint.x) {
  			direction = 'right';
  			subX = 0;
  			subY = tooltipHeight / 2;
  		} else {
  			direction = 'left';
  			subX = tooltipWidth + (offset.x + anchor.x) * 2;
  			subY = tooltipHeight / 2;
  		}

  		pos = pos.subtract(toPoint(subX, subY, true)).add(offset).add(anchor);

  		removeClass(container, 'leaflet-tooltip-right');
  		removeClass(container, 'leaflet-tooltip-left');
  		removeClass(container, 'leaflet-tooltip-top');
  		removeClass(container, 'leaflet-tooltip-bottom');
  		addClass(container, 'leaflet-tooltip-' + direction);
  		setPosition(container, pos);
  	},

  	_updatePosition: function () {
  		var pos = this._map.latLngToLayerPoint(this._latlng);
  		this._setPosition(pos);
  	},

  	setOpacity: function (opacity) {
  		this.options.opacity = opacity;

  		if (this._container) {
  			setOpacity(this._container, opacity);
  		}
  	},

  	_animateZoom: function (e) {
  		var pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center);
  		this._setPosition(pos);
  	},

  	_getAnchor: function () {
  		// Where should we anchor the tooltip on the source layer?
  		return toPoint(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
  	}

  });

  // @namespace Tooltip
  // @factory L.tooltip(options?: Tooltip options, source?: Layer)
  // Instantiates a Tooltip object given an optional `options` object that describes its appearance and location and an optional `source` object that is used to tag the tooltip with a reference to the Layer to which it refers.
  var tooltip = function (options, source) {
  	return new Tooltip(options, source);
  };

  // @namespace Map
  // @section Methods for Layers and Controls
  Map.include({

  	// @method openTooltip(tooltip: Tooltip): this
  	// Opens the specified tooltip.
  	// @alternative
  	// @method openTooltip(content: String|HTMLElement, latlng: LatLng, options?: Tooltip options): this
  	// Creates a tooltip with the specified content and options and open it.
  	openTooltip: function (tooltip, latlng, options) {
  		if (!(tooltip instanceof Tooltip)) {
  			tooltip = new Tooltip(options).setContent(tooltip);
  		}

  		if (latlng) {
  			tooltip.setLatLng(latlng);
  		}

  		if (this.hasLayer(tooltip)) {
  			return this;
  		}

  		return this.addLayer(tooltip);
  	},

  	// @method closeTooltip(tooltip?: Tooltip): this
  	// Closes the tooltip given as parameter.
  	closeTooltip: function (tooltip) {
  		if (tooltip) {
  			this.removeLayer(tooltip);
  		}
  		return this;
  	}

  });

  /*
   * @namespace Layer
   * @section Tooltip methods example
   *
   * All layers share a set of methods convenient for binding tooltips to it.
   *
   * ```js
   * var layer = L.Polygon(latlngs).bindTooltip('Hi There!').addTo(map);
   * layer.openTooltip();
   * layer.closeTooltip();
   * ```
   */

  // @section Tooltip methods
  Layer.include({

  	// @method bindTooltip(content: String|HTMLElement|Function|Tooltip, options?: Tooltip options): this
  	// Binds a tooltip to the layer with the passed `content` and sets up the
  	// necessary event listeners. If a `Function` is passed it will receive
  	// the layer as the first argument and should return a `String` or `HTMLElement`.
  	bindTooltip: function (content, options) {

  		if (content instanceof Tooltip) {
  			setOptions(content, options);
  			this._tooltip = content;
  			content._source = this;
  		} else {
  			if (!this._tooltip || options) {
  				this._tooltip = new Tooltip(options, this);
  			}
  			this._tooltip.setContent(content);

  		}

  		this._initTooltipInteractions();

  		if (this._tooltip.options.permanent && this._map && this._map.hasLayer(this)) {
  			this.openTooltip();
  		}

  		return this;
  	},

  	// @method unbindTooltip(): this
  	// Removes the tooltip previously bound with `bindTooltip`.
  	unbindTooltip: function () {
  		if (this._tooltip) {
  			this._initTooltipInteractions(true);
  			this.closeTooltip();
  			this._tooltip = null;
  		}
  		return this;
  	},

  	_initTooltipInteractions: function (remove$$1) {
  		if (!remove$$1 && this._tooltipHandlersAdded) { return; }
  		var onOff = remove$$1 ? 'off' : 'on',
  		    events = {
  			remove: this.closeTooltip,
  			move: this._moveTooltip
  		    };
  		if (!this._tooltip.options.permanent) {
  			events.mouseover = this._openTooltip;
  			events.mouseout = this.closeTooltip;
  			if (this._tooltip.options.sticky) {
  				events.mousemove = this._moveTooltip;
  			}
  			if (touch) {
  				events.click = this._openTooltip;
  			}
  		} else {
  			events.add = this._openTooltip;
  		}
  		this[onOff](events);
  		this._tooltipHandlersAdded = !remove$$1;
  	},

  	// @method openTooltip(latlng?: LatLng): this
  	// Opens the bound tooltip at the specified `latlng` or at the default tooltip anchor if no `latlng` is passed.
  	openTooltip: function (layer, latlng) {
  		if (this._tooltip && this._map) {
  			latlng = this._tooltip._prepareOpen(this, layer, latlng);

  			// open the tooltip on the map
  			this._map.openTooltip(this._tooltip, latlng);

  			// Tooltip container may not be defined if not permanent and never
  			// opened.
  			if (this._tooltip.options.interactive && this._tooltip._container) {
  				addClass(this._tooltip._container, 'leaflet-clickable');
  				this.addInteractiveTarget(this._tooltip._container);
  			}
  		}

  		return this;
  	},

  	// @method closeTooltip(): this
  	// Closes the tooltip bound to this layer if it is open.
  	closeTooltip: function () {
  		if (this._tooltip) {
  			this._tooltip._close();
  			if (this._tooltip.options.interactive && this._tooltip._container) {
  				removeClass(this._tooltip._container, 'leaflet-clickable');
  				this.removeInteractiveTarget(this._tooltip._container);
  			}
  		}
  		return this;
  	},

  	// @method toggleTooltip(): this
  	// Opens or closes the tooltip bound to this layer depending on its current state.
  	toggleTooltip: function (target) {
  		if (this._tooltip) {
  			if (this._tooltip._map) {
  				this.closeTooltip();
  			} else {
  				this.openTooltip(target);
  			}
  		}
  		return this;
  	},

  	// @method isTooltipOpen(): boolean
  	// Returns `true` if the tooltip bound to this layer is currently open.
  	isTooltipOpen: function () {
  		return this._tooltip.isOpen();
  	},

  	// @method setTooltipContent(content: String|HTMLElement|Tooltip): this
  	// Sets the content of the tooltip bound to this layer.
  	setTooltipContent: function (content) {
  		if (this._tooltip) {
  			this._tooltip.setContent(content);
  		}
  		return this;
  	},

  	// @method getTooltip(): Tooltip
  	// Returns the tooltip bound to this layer.
  	getTooltip: function () {
  		return this._tooltip;
  	},

  	_openTooltip: function (e) {
  		var layer = e.layer || e.target;

  		if (!this._tooltip || !this._map) {
  			return;
  		}
  		this.openTooltip(layer, this._tooltip.options.sticky ? e.latlng : undefined);
  	},

  	_moveTooltip: function (e) {
  		var latlng = e.latlng, containerPoint, layerPoint;
  		if (this._tooltip.options.sticky && e.originalEvent) {
  			containerPoint = this._map.mouseEventToContainerPoint(e.originalEvent);
  			layerPoint = this._map.containerPointToLayerPoint(containerPoint);
  			latlng = this._map.layerPointToLatLng(layerPoint);
  		}
  		this._tooltip.setLatLng(latlng);
  	}
  });

  /*
   * @class DivIcon
   * @aka L.DivIcon
   * @inherits Icon
   *
   * Represents a lightweight icon for markers that uses a simple `<div>`
   * element instead of an image. Inherits from `Icon` but ignores the `iconUrl` and shadow options.
   *
   * @example
   * ```js
   * var myIcon = L.divIcon({className: 'my-div-icon'});
   * // you can set .my-div-icon styles in CSS
   *
   * L.marker([50.505, 30.57], {icon: myIcon}).addTo(map);
   * ```
   *
   * By default, it has a 'leaflet-div-icon' CSS class and is styled as a little white square with a shadow.
   */

  var DivIcon = Icon.extend({
  	options: {
  		// @section
  		// @aka DivIcon options
  		iconSize: [12, 12], // also can be set through CSS

  		// iconAnchor: (Point),
  		// popupAnchor: (Point),

  		// @option html: String|HTMLElement = ''
  		// Custom HTML code to put inside the div element, empty by default. Alternatively,
  		// an instance of `HTMLElement`.
  		html: false,

  		// @option bgPos: Point = [0, 0]
  		// Optional relative position of the background, in pixels
  		bgPos: null,

  		className: 'leaflet-div-icon'
  	},

  	createIcon: function (oldIcon) {
  		var div = (oldIcon && oldIcon.tagName === 'DIV') ? oldIcon : document.createElement('div'),
  		    options = this.options;

  		if (options.html instanceof Element) {
  			empty(div);
  			div.appendChild(options.html);
  		} else {
  			div.innerHTML = options.html !== false ? options.html : '';
  		}

  		if (options.bgPos) {
  			var bgPos = toPoint(options.bgPos);
  			div.style.backgroundPosition = (-bgPos.x) + 'px ' + (-bgPos.y) + 'px';
  		}
  		this._setIconStyles(div, 'icon');

  		return div;
  	},

  	createShadow: function () {
  		return null;
  	}
  });

  // @factory L.divIcon(options: DivIcon options)
  // Creates a `DivIcon` instance with the given options.
  function divIcon(options) {
  	return new DivIcon(options);
  }

  Icon.Default = IconDefault;

  /*
   * @class GridLayer
   * @inherits Layer
   * @aka L.GridLayer
   *
   * Generic class for handling a tiled grid of HTML elements. This is the base class for all tile layers and replaces `TileLayer.Canvas`.
   * GridLayer can be extended to create a tiled grid of HTML elements like `<canvas>`, `<img>` or `<div>`. GridLayer will handle creating and animating these DOM elements for you.
   *
   *
   * @section Synchronous usage
   * @example
   *
   * To create a custom layer, extend GridLayer and implement the `createTile()` method, which will be passed a `Point` object with the `x`, `y`, and `z` (zoom level) coordinates to draw your tile.
   *
   * ```js
   * var CanvasLayer = L.GridLayer.extend({
   *     createTile: function(coords){
   *         // create a <canvas> element for drawing
   *         var tile = L.DomUtil.create('canvas', 'leaflet-tile');
   *
   *         // setup tile width and height according to the options
   *         var size = this.getTileSize();
   *         tile.width = size.x;
   *         tile.height = size.y;
   *
   *         // get a canvas context and draw something on it using coords.x, coords.y and coords.z
   *         var ctx = tile.getContext('2d');
   *
   *         // return the tile so it can be rendered on screen
   *         return tile;
   *     }
   * });
   * ```
   *
   * @section Asynchronous usage
   * @example
   *
   * Tile creation can also be asynchronous, this is useful when using a third-party drawing library. Once the tile is finished drawing it can be passed to the `done()` callback.
   *
   * ```js
   * var CanvasLayer = L.GridLayer.extend({
   *     createTile: function(coords, done){
   *         var error;
   *
   *         // create a <canvas> element for drawing
   *         var tile = L.DomUtil.create('canvas', 'leaflet-tile');
   *
   *         // setup tile width and height according to the options
   *         var size = this.getTileSize();
   *         tile.width = size.x;
   *         tile.height = size.y;
   *
   *         // draw something asynchronously and pass the tile to the done() callback
   *         setTimeout(function() {
   *             done(error, tile);
   *         }, 1000);
   *
   *         return tile;
   *     }
   * });
   * ```
   *
   * @section
   */


  var GridLayer = Layer.extend({

  	// @section
  	// @aka GridLayer options
  	options: {
  		// @option tileSize: Number|Point = 256
  		// Width and height of tiles in the grid. Use a number if width and height are equal, or `L.point(width, height)` otherwise.
  		tileSize: 256,

  		// @option opacity: Number = 1.0
  		// Opacity of the tiles. Can be used in the `createTile()` function.
  		opacity: 1,

  		// @option updateWhenIdle: Boolean = (depends)
  		// Load new tiles only when panning ends.
  		// `true` by default on mobile browsers, in order to avoid too many requests and keep smooth navigation.
  		// `false` otherwise in order to display new tiles _during_ panning, since it is easy to pan outside the
  		// [`keepBuffer`](#gridlayer-keepbuffer) option in desktop browsers.
  		updateWhenIdle: mobile,

  		// @option updateWhenZooming: Boolean = true
  		// By default, a smooth zoom animation (during a [touch zoom](#map-touchzoom) or a [`flyTo()`](#map-flyto)) will update grid layers every integer zoom level. Setting this option to `false` will update the grid layer only when the smooth animation ends.
  		updateWhenZooming: true,

  		// @option updateInterval: Number = 200
  		// Tiles will not update more than once every `updateInterval` milliseconds when panning.
  		updateInterval: 200,

  		// @option zIndex: Number = 1
  		// The explicit zIndex of the tile layer.
  		zIndex: 1,

  		// @option bounds: LatLngBounds = undefined
  		// If set, tiles will only be loaded inside the set `LatLngBounds`.
  		bounds: null,

  		// @option minZoom: Number = 0
  		// The minimum zoom level down to which this layer will be displayed (inclusive).
  		minZoom: 0,

  		// @option maxZoom: Number = undefined
  		// The maximum zoom level up to which this layer will be displayed (inclusive).
  		maxZoom: undefined,

  		// @option maxNativeZoom: Number = undefined
  		// Maximum zoom number the tile source has available. If it is specified,
  		// the tiles on all zoom levels higher than `maxNativeZoom` will be loaded
  		// from `maxNativeZoom` level and auto-scaled.
  		maxNativeZoom: undefined,

  		// @option minNativeZoom: Number = undefined
  		// Minimum zoom number the tile source has available. If it is specified,
  		// the tiles on all zoom levels lower than `minNativeZoom` will be loaded
  		// from `minNativeZoom` level and auto-scaled.
  		minNativeZoom: undefined,

  		// @option noWrap: Boolean = false
  		// Whether the layer is wrapped around the antimeridian. If `true`, the
  		// GridLayer will only be displayed once at low zoom levels. Has no
  		// effect when the [map CRS](#map-crs) doesn't wrap around. Can be used
  		// in combination with [`bounds`](#gridlayer-bounds) to prevent requesting
  		// tiles outside the CRS limits.
  		noWrap: false,

  		// @option pane: String = 'tilePane'
  		// `Map pane` where the grid layer will be added.
  		pane: 'tilePane',

  		// @option className: String = ''
  		// A custom class name to assign to the tile layer. Empty by default.
  		className: '',

  		// @option keepBuffer: Number = 2
  		// When panning the map, keep this many rows and columns of tiles before unloading them.
  		keepBuffer: 2
  	},

  	initialize: function (options) {
  		setOptions(this, options);
  	},

  	onAdd: function () {
  		this._initContainer();

  		this._levels = {};
  		this._tiles = {};

  		this._resetView();
  		this._update();
  	},

  	beforeAdd: function (map) {
  		map._addZoomLimit(this);
  	},

  	onRemove: function (map) {
  		this._removeAllTiles();
  		remove(this._container);
  		map._removeZoomLimit(this);
  		this._container = null;
  		this._tileZoom = undefined;
  	},

  	// @method bringToFront: this
  	// Brings the tile layer to the top of all tile layers.
  	bringToFront: function () {
  		if (this._map) {
  			toFront(this._container);
  			this._setAutoZIndex(Math.max);
  		}
  		return this;
  	},

  	// @method bringToBack: this
  	// Brings the tile layer to the bottom of all tile layers.
  	bringToBack: function () {
  		if (this._map) {
  			toBack(this._container);
  			this._setAutoZIndex(Math.min);
  		}
  		return this;
  	},

  	// @method getContainer: HTMLElement
  	// Returns the HTML element that contains the tiles for this layer.
  	getContainer: function () {
  		return this._container;
  	},

  	// @method setOpacity(opacity: Number): this
  	// Changes the [opacity](#gridlayer-opacity) of the grid layer.
  	setOpacity: function (opacity) {
  		this.options.opacity = opacity;
  		this._updateOpacity();
  		return this;
  	},

  	// @method setZIndex(zIndex: Number): this
  	// Changes the [zIndex](#gridlayer-zindex) of the grid layer.
  	setZIndex: function (zIndex) {
  		this.options.zIndex = zIndex;
  		this._updateZIndex();

  		return this;
  	},

  	// @method isLoading: Boolean
  	// Returns `true` if any tile in the grid layer has not finished loading.
  	isLoading: function () {
  		return this._loading;
  	},

  	// @method redraw: this
  	// Causes the layer to clear all the tiles and request them again.
  	redraw: function () {
  		if (this._map) {
  			this._removeAllTiles();
  			this._update();
  		}
  		return this;
  	},

  	getEvents: function () {
  		var events = {
  			viewprereset: this._invalidateAll,
  			viewreset: this._resetView,
  			zoom: this._resetView,
  			moveend: this._onMoveEnd
  		};

  		if (!this.options.updateWhenIdle) {
  			// update tiles on move, but not more often than once per given interval
  			if (!this._onMove) {
  				this._onMove = throttle(this._onMoveEnd, this.options.updateInterval, this);
  			}

  			events.move = this._onMove;
  		}

  		if (this._zoomAnimated) {
  			events.zoomanim = this._animateZoom;
  		}

  		return events;
  	},

  	// @section Extension methods
  	// Layers extending `GridLayer` shall reimplement the following method.
  	// @method createTile(coords: Object, done?: Function): HTMLElement
  	// Called only internally, must be overridden by classes extending `GridLayer`.
  	// Returns the `HTMLElement` corresponding to the given `coords`. If the `done` callback
  	// is specified, it must be called when the tile has finished loading and drawing.
  	createTile: function () {
  		return document.createElement('div');
  	},

  	// @section
  	// @method getTileSize: Point
  	// Normalizes the [tileSize option](#gridlayer-tilesize) into a point. Used by the `createTile()` method.
  	getTileSize: function () {
  		var s = this.options.tileSize;
  		return s instanceof Point ? s : new Point(s, s);
  	},

  	_updateZIndex: function () {
  		if (this._container && this.options.zIndex !== undefined && this.options.zIndex !== null) {
  			this._container.style.zIndex = this.options.zIndex;
  		}
  	},

  	_setAutoZIndex: function (compare) {
  		// go through all other layers of the same pane, set zIndex to max + 1 (front) or min - 1 (back)

  		var layers = this.getPane().children,
  		    edgeZIndex = -compare(-Infinity, Infinity); // -Infinity for max, Infinity for min

  		for (var i = 0, len = layers.length, zIndex; i < len; i++) {

  			zIndex = layers[i].style.zIndex;

  			if (layers[i] !== this._container && zIndex) {
  				edgeZIndex = compare(edgeZIndex, +zIndex);
  			}
  		}

  		if (isFinite(edgeZIndex)) {
  			this.options.zIndex = edgeZIndex + compare(-1, 1);
  			this._updateZIndex();
  		}
  	},

  	_updateOpacity: function () {
  		if (!this._map) { return; }

  		// IE doesn't inherit filter opacity properly, so we're forced to set it on tiles
  		if (ielt9) { return; }

  		setOpacity(this._container, this.options.opacity);

  		var now = +new Date(),
  		    nextFrame = false,
  		    willPrune = false;

  		for (var key in this._tiles) {
  			var tile = this._tiles[key];
  			if (!tile.current || !tile.loaded) { continue; }

  			var fade = Math.min(1, (now - tile.loaded) / 200);

  			setOpacity(tile.el, fade);
  			if (fade < 1) {
  				nextFrame = true;
  			} else {
  				if (tile.active) {
  					willPrune = true;
  				} else {
  					this._onOpaqueTile(tile);
  				}
  				tile.active = true;
  			}
  		}

  		if (willPrune && !this._noPrune) { this._pruneTiles(); }

  		if (nextFrame) {
  			cancelAnimFrame(this._fadeFrame);
  			this._fadeFrame = requestAnimFrame(this._updateOpacity, this);
  		}
  	},

  	_onOpaqueTile: falseFn,

  	_initContainer: function () {
  		if (this._container) { return; }

  		this._container = create$1('div', 'leaflet-layer ' + (this.options.className || ''));
  		this._updateZIndex();

  		if (this.options.opacity < 1) {
  			this._updateOpacity();
  		}

  		this.getPane().appendChild(this._container);
  	},

  	_updateLevels: function () {

  		var zoom = this._tileZoom,
  		    maxZoom = this.options.maxZoom;

  		if (zoom === undefined) { return undefined; }

  		for (var z in this._levels) {
  			z = Number(z);
  			if (this._levels[z].el.children.length || z === zoom) {
  				this._levels[z].el.style.zIndex = maxZoom - Math.abs(zoom - z);
  				this._onUpdateLevel(z);
  			} else {
  				remove(this._levels[z].el);
  				this._removeTilesAtZoom(z);
  				this._onRemoveLevel(z);
  				delete this._levels[z];
  			}
  		}

  		var level = this._levels[zoom],
  		    map = this._map;

  		if (!level) {
  			level = this._levels[zoom] = {};

  			level.el = create$1('div', 'leaflet-tile-container leaflet-zoom-animated', this._container);
  			level.el.style.zIndex = maxZoom;

  			level.origin = map.project(map.unproject(map.getPixelOrigin()), zoom).round();
  			level.zoom = zoom;

  			this._setZoomTransform(level, map.getCenter(), map.getZoom());

  			// force the browser to consider the newly added element for transition
  			falseFn(level.el.offsetWidth);

  			this._onCreateLevel(level);
  		}

  		this._level = level;

  		return level;
  	},

  	_onUpdateLevel: falseFn,

  	_onRemoveLevel: falseFn,

  	_onCreateLevel: falseFn,

  	_pruneTiles: function () {
  		if (!this._map) {
  			return;
  		}

  		var key, tile;

  		var zoom = this._map.getZoom();
  		if (zoom > this.options.maxZoom ||
  			zoom < this.options.minZoom) {
  			this._removeAllTiles();
  			return;
  		}

  		for (key in this._tiles) {
  			tile = this._tiles[key];
  			tile.retain = tile.current;
  		}

  		for (key in this._tiles) {
  			tile = this._tiles[key];
  			if (tile.current && !tile.active) {
  				var coords = tile.coords;
  				if (!this._retainParent(coords.x, coords.y, coords.z, coords.z - 5)) {
  					this._retainChildren(coords.x, coords.y, coords.z, coords.z + 2);
  				}
  			}
  		}

  		for (key in this._tiles) {
  			if (!this._tiles[key].retain) {
  				this._removeTile(key);
  			}
  		}
  	},

  	_removeTilesAtZoom: function (zoom) {
  		for (var key in this._tiles) {
  			if (this._tiles[key].coords.z !== zoom) {
  				continue;
  			}
  			this._removeTile(key);
  		}
  	},

  	_removeAllTiles: function () {
  		for (var key in this._tiles) {
  			this._removeTile(key);
  		}
  	},

  	_invalidateAll: function () {
  		for (var z in this._levels) {
  			remove(this._levels[z].el);
  			this._onRemoveLevel(Number(z));
  			delete this._levels[z];
  		}
  		this._removeAllTiles();

  		this._tileZoom = undefined;
  	},

  	_retainParent: function (x, y, z, minZoom) {
  		var x2 = Math.floor(x / 2),
  		    y2 = Math.floor(y / 2),
  		    z2 = z - 1,
  		    coords2 = new Point(+x2, +y2);
  		coords2.z = +z2;

  		var key = this._tileCoordsToKey(coords2),
  		    tile = this._tiles[key];

  		if (tile && tile.active) {
  			tile.retain = true;
  			return true;

  		} else if (tile && tile.loaded) {
  			tile.retain = true;
  		}

  		if (z2 > minZoom) {
  			return this._retainParent(x2, y2, z2, minZoom);
  		}

  		return false;
  	},

  	_retainChildren: function (x, y, z, maxZoom) {

  		for (var i = 2 * x; i < 2 * x + 2; i++) {
  			for (var j = 2 * y; j < 2 * y + 2; j++) {

  				var coords = new Point(i, j);
  				coords.z = z + 1;

  				var key = this._tileCoordsToKey(coords),
  				    tile = this._tiles[key];

  				if (tile && tile.active) {
  					tile.retain = true;
  					continue;

  				} else if (tile && tile.loaded) {
  					tile.retain = true;
  				}

  				if (z + 1 < maxZoom) {
  					this._retainChildren(i, j, z + 1, maxZoom);
  				}
  			}
  		}
  	},

  	_resetView: function (e) {
  		var animating = e && (e.pinch || e.flyTo);
  		this._setView(this._map.getCenter(), this._map.getZoom(), animating, animating);
  	},

  	_animateZoom: function (e) {
  		this._setView(e.center, e.zoom, true, e.noUpdate);
  	},

  	_clampZoom: function (zoom) {
  		var options = this.options;

  		if (undefined !== options.minNativeZoom && zoom < options.minNativeZoom) {
  			return options.minNativeZoom;
  		}

  		if (undefined !== options.maxNativeZoom && options.maxNativeZoom < zoom) {
  			return options.maxNativeZoom;
  		}

  		return zoom;
  	},

  	_setView: function (center, zoom, noPrune, noUpdate) {
  		var tileZoom = Math.round(zoom);
  		if ((this.options.maxZoom !== undefined && tileZoom > this.options.maxZoom) ||
  		    (this.options.minZoom !== undefined && tileZoom < this.options.minZoom)) {
  			tileZoom = undefined;
  		} else {
  			tileZoom = this._clampZoom(tileZoom);
  		}

  		var tileZoomChanged = this.options.updateWhenZooming && (tileZoom !== this._tileZoom);

  		if (!noUpdate || tileZoomChanged) {

  			this._tileZoom = tileZoom;

  			if (this._abortLoading) {
  				this._abortLoading();
  			}

  			this._updateLevels();
  			this._resetGrid();

  			if (tileZoom !== undefined) {
  				this._update(center);
  			}

  			if (!noPrune) {
  				this._pruneTiles();
  			}

  			// Flag to prevent _updateOpacity from pruning tiles during
  			// a zoom anim or a pinch gesture
  			this._noPrune = !!noPrune;
  		}

  		this._setZoomTransforms(center, zoom);
  	},

  	_setZoomTransforms: function (center, zoom) {
  		for (var i in this._levels) {
  			this._setZoomTransform(this._levels[i], center, zoom);
  		}
  	},

  	_setZoomTransform: function (level, center, zoom) {
  		var scale = this._map.getZoomScale(zoom, level.zoom),
  		    translate = level.origin.multiplyBy(scale)
  		        .subtract(this._map._getNewPixelOrigin(center, zoom)).round();

  		if (any3d) {
  			setTransform(level.el, translate, scale);
  		} else {
  			setPosition(level.el, translate);
  		}
  	},

  	_resetGrid: function () {
  		var map = this._map,
  		    crs = map.options.crs,
  		    tileSize = this._tileSize = this.getTileSize(),
  		    tileZoom = this._tileZoom;

  		var bounds = this._map.getPixelWorldBounds(this._tileZoom);
  		if (bounds) {
  			this._globalTileRange = this._pxBoundsToTileRange(bounds);
  		}

  		this._wrapX = crs.wrapLng && !this.options.noWrap && [
  			Math.floor(map.project([0, crs.wrapLng[0]], tileZoom).x / tileSize.x),
  			Math.ceil(map.project([0, crs.wrapLng[1]], tileZoom).x / tileSize.y)
  		];
  		this._wrapY = crs.wrapLat && !this.options.noWrap && [
  			Math.floor(map.project([crs.wrapLat[0], 0], tileZoom).y / tileSize.x),
  			Math.ceil(map.project([crs.wrapLat[1], 0], tileZoom).y / tileSize.y)
  		];
  	},

  	_onMoveEnd: function () {
  		if (!this._map || this._map._animatingZoom) { return; }

  		this._update();
  	},

  	_getTiledPixelBounds: function (center) {
  		var map = this._map,
  		    mapZoom = map._animatingZoom ? Math.max(map._animateToZoom, map.getZoom()) : map.getZoom(),
  		    scale = map.getZoomScale(mapZoom, this._tileZoom),
  		    pixelCenter = map.project(center, this._tileZoom).floor(),
  		    halfSize = map.getSize().divideBy(scale * 2);

  		return new Bounds(pixelCenter.subtract(halfSize), pixelCenter.add(halfSize));
  	},

  	// Private method to load tiles in the grid's active zoom level according to map bounds
  	_update: function (center) {
  		var map = this._map;
  		if (!map) { return; }
  		var zoom = this._clampZoom(map.getZoom());

  		if (center === undefined) { center = map.getCenter(); }
  		if (this._tileZoom === undefined) { return; }	// if out of minzoom/maxzoom

  		var pixelBounds = this._getTiledPixelBounds(center),
  		    tileRange = this._pxBoundsToTileRange(pixelBounds),
  		    tileCenter = tileRange.getCenter(),
  		    queue = [],
  		    margin = this.options.keepBuffer,
  		    noPruneRange = new Bounds(tileRange.getBottomLeft().subtract([margin, -margin]),
  		                              tileRange.getTopRight().add([margin, -margin]));

  		// Sanity check: panic if the tile range contains Infinity somewhere.
  		if (!(isFinite(tileRange.min.x) &&
  		      isFinite(tileRange.min.y) &&
  		      isFinite(tileRange.max.x) &&
  		      isFinite(tileRange.max.y))) { throw new Error('Attempted to load an infinite number of tiles'); }

  		for (var key in this._tiles) {
  			var c = this._tiles[key].coords;
  			if (c.z !== this._tileZoom || !noPruneRange.contains(new Point(c.x, c.y))) {
  				this._tiles[key].current = false;
  			}
  		}

  		// _update just loads more tiles. If the tile zoom level differs too much
  		// from the map's, let _setView reset levels and prune old tiles.
  		if (Math.abs(zoom - this._tileZoom) > 1) { this._setView(center, zoom); return; }

  		// create a queue of coordinates to load tiles from
  		for (var j = tileRange.min.y; j <= tileRange.max.y; j++) {
  			for (var i = tileRange.min.x; i <= tileRange.max.x; i++) {
  				var coords = new Point(i, j);
  				coords.z = this._tileZoom;

  				if (!this._isValidTile(coords)) { continue; }

  				var tile = this._tiles[this._tileCoordsToKey(coords)];
  				if (tile) {
  					tile.current = true;
  				} else {
  					queue.push(coords);
  				}
  			}
  		}

  		// sort tile queue to load tiles in order of their distance to center
  		queue.sort(function (a, b) {
  			return a.distanceTo(tileCenter) - b.distanceTo(tileCenter);
  		});

  		if (queue.length !== 0) {
  			// if it's the first batch of tiles to load
  			if (!this._loading) {
  				this._loading = true;
  				// @event loading: Event
  				// Fired when the grid layer starts loading tiles.
  				this.fire('loading');
  			}

  			// create DOM fragment to append tiles in one batch
  			var fragment = document.createDocumentFragment();

  			for (i = 0; i < queue.length; i++) {
  				this._addTile(queue[i], fragment);
  			}

  			this._level.el.appendChild(fragment);
  		}
  	},

  	_isValidTile: function (coords) {
  		var crs = this._map.options.crs;

  		if (!crs.infinite) {
  			// don't load tile if it's out of bounds and not wrapped
  			var bounds = this._globalTileRange;
  			if ((!crs.wrapLng && (coords.x < bounds.min.x || coords.x > bounds.max.x)) ||
  			    (!crs.wrapLat && (coords.y < bounds.min.y || coords.y > bounds.max.y))) { return false; }
  		}

  		if (!this.options.bounds) { return true; }

  		// don't load tile if it doesn't intersect the bounds in options
  		var tileBounds = this._tileCoordsToBounds(coords);
  		return toLatLngBounds(this.options.bounds).overlaps(tileBounds);
  	},

  	_keyToBounds: function (key) {
  		return this._tileCoordsToBounds(this._keyToTileCoords(key));
  	},

  	_tileCoordsToNwSe: function (coords) {
  		var map = this._map,
  		    tileSize = this.getTileSize(),
  		    nwPoint = coords.scaleBy(tileSize),
  		    sePoint = nwPoint.add(tileSize),
  		    nw = map.unproject(nwPoint, coords.z),
  		    se = map.unproject(sePoint, coords.z);
  		return [nw, se];
  	},

  	// converts tile coordinates to its geographical bounds
  	_tileCoordsToBounds: function (coords) {
  		var bp = this._tileCoordsToNwSe(coords),
  		    bounds = new LatLngBounds(bp[0], bp[1]);

  		if (!this.options.noWrap) {
  			bounds = this._map.wrapLatLngBounds(bounds);
  		}
  		return bounds;
  	},
  	// converts tile coordinates to key for the tile cache
  	_tileCoordsToKey: function (coords) {
  		return coords.x + ':' + coords.y + ':' + coords.z;
  	},

  	// converts tile cache key to coordinates
  	_keyToTileCoords: function (key) {
  		var k = key.split(':'),
  		    coords = new Point(+k[0], +k[1]);
  		coords.z = +k[2];
  		return coords;
  	},

  	_removeTile: function (key) {
  		var tile = this._tiles[key];
  		if (!tile) { return; }

  		remove(tile.el);

  		delete this._tiles[key];

  		// @event tileunload: TileEvent
  		// Fired when a tile is removed (e.g. when a tile goes off the screen).
  		this.fire('tileunload', {
  			tile: tile.el,
  			coords: this._keyToTileCoords(key)
  		});
  	},

  	_initTile: function (tile) {
  		addClass(tile, 'leaflet-tile');

  		var tileSize = this.getTileSize();
  		tile.style.width = tileSize.x + 'px';
  		tile.style.height = tileSize.y + 'px';

  		tile.onselectstart = falseFn;
  		tile.onmousemove = falseFn;

  		// update opacity on tiles in IE7-8 because of filter inheritance problems
  		if (ielt9 && this.options.opacity < 1) {
  			setOpacity(tile, this.options.opacity);
  		}

  		// without this hack, tiles disappear after zoom on Chrome for Android
  		// https://github.com/Leaflet/Leaflet/issues/2078
  		if (android && !android23) {
  			tile.style.WebkitBackfaceVisibility = 'hidden';
  		}
  	},

  	_addTile: function (coords, container) {
  		var tilePos = this._getTilePos(coords),
  		    key = this._tileCoordsToKey(coords);

  		var tile = this.createTile(this._wrapCoords(coords), bind(this._tileReady, this, coords));

  		this._initTile(tile);

  		// if createTile is defined with a second argument ("done" callback),
  		// we know that tile is async and will be ready later; otherwise
  		if (this.createTile.length < 2) {
  			// mark tile as ready, but delay one frame for opacity animation to happen
  			requestAnimFrame(bind(this._tileReady, this, coords, null, tile));
  		}

  		setPosition(tile, tilePos);

  		// save tile in cache
  		this._tiles[key] = {
  			el: tile,
  			coords: coords,
  			current: true
  		};

  		container.appendChild(tile);
  		// @event tileloadstart: TileEvent
  		// Fired when a tile is requested and starts loading.
  		this.fire('tileloadstart', {
  			tile: tile,
  			coords: coords
  		});
  	},

  	_tileReady: function (coords, err, tile) {
  		if (err) {
  			// @event tileerror: TileErrorEvent
  			// Fired when there is an error loading a tile.
  			this.fire('tileerror', {
  				error: err,
  				tile: tile,
  				coords: coords
  			});
  		}

  		var key = this._tileCoordsToKey(coords);

  		tile = this._tiles[key];
  		if (!tile) { return; }

  		tile.loaded = +new Date();
  		if (this._map._fadeAnimated) {
  			setOpacity(tile.el, 0);
  			cancelAnimFrame(this._fadeFrame);
  			this._fadeFrame = requestAnimFrame(this._updateOpacity, this);
  		} else {
  			tile.active = true;
  			this._pruneTiles();
  		}

  		if (!err) {
  			addClass(tile.el, 'leaflet-tile-loaded');

  			// @event tileload: TileEvent
  			// Fired when a tile loads.
  			this.fire('tileload', {
  				tile: tile.el,
  				coords: coords
  			});
  		}

  		if (this._noTilesToLoad()) {
  			this._loading = false;
  			// @event load: Event
  			// Fired when the grid layer loaded all visible tiles.
  			this.fire('load');

  			if (ielt9 || !this._map._fadeAnimated) {
  				requestAnimFrame(this._pruneTiles, this);
  			} else {
  				// Wait a bit more than 0.2 secs (the duration of the tile fade-in)
  				// to trigger a pruning.
  				setTimeout(bind(this._pruneTiles, this), 250);
  			}
  		}
  	},

  	_getTilePos: function (coords) {
  		return coords.scaleBy(this.getTileSize()).subtract(this._level.origin);
  	},

  	_wrapCoords: function (coords) {
  		var newCoords = new Point(
  			this._wrapX ? wrapNum(coords.x, this._wrapX) : coords.x,
  			this._wrapY ? wrapNum(coords.y, this._wrapY) : coords.y);
  		newCoords.z = coords.z;
  		return newCoords;
  	},

  	_pxBoundsToTileRange: function (bounds) {
  		var tileSize = this.getTileSize();
  		return new Bounds(
  			bounds.min.unscaleBy(tileSize).floor(),
  			bounds.max.unscaleBy(tileSize).ceil().subtract([1, 1]));
  	},

  	_noTilesToLoad: function () {
  		for (var key in this._tiles) {
  			if (!this._tiles[key].loaded) { return false; }
  		}
  		return true;
  	}
  });

  // @factory L.gridLayer(options?: GridLayer options)
  // Creates a new instance of GridLayer with the supplied options.
  function gridLayer(options) {
  	return new GridLayer(options);
  }

  /*
   * @class TileLayer
   * @inherits GridLayer
   * @aka L.TileLayer
   * Used to load and display tile layers on the map. Note that most tile servers require attribution, which you can set under `Layer`. Extends `GridLayer`.
   *
   * @example
   *
   * ```js
   * L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'}).addTo(map);
   * ```
   *
   * @section URL template
   * @example
   *
   * A string of the following form:
   *
   * ```
   * 'http://{s}.somedomain.com/blabla/{z}/{x}/{y}{r}.png'
   * ```
   *
   * `{s}` means one of the available subdomains (used sequentially to help with browser parallel requests per domain limitation; subdomain values are specified in options; `a`, `b` or `c` by default, can be omitted), `{z}` — zoom level, `{x}` and `{y}` — tile coordinates. `{r}` can be used to add "&commat;2x" to the URL to load retina tiles.
   *
   * You can use custom keys in the template, which will be [evaluated](#util-template) from TileLayer options, like this:
   *
   * ```
   * L.tileLayer('http://{s}.somedomain.com/{foo}/{z}/{x}/{y}.png', {foo: 'bar'});
   * ```
   */


  var TileLayer = GridLayer.extend({

  	// @section
  	// @aka TileLayer options
  	options: {
  		// @option minZoom: Number = 0
  		// The minimum zoom level down to which this layer will be displayed (inclusive).
  		minZoom: 0,

  		// @option maxZoom: Number = 18
  		// The maximum zoom level up to which this layer will be displayed (inclusive).
  		maxZoom: 18,

  		// @option subdomains: String|String[] = 'abc'
  		// Subdomains of the tile service. Can be passed in the form of one string (where each letter is a subdomain name) or an array of strings.
  		subdomains: 'abc',

  		// @option errorTileUrl: String = ''
  		// URL to the tile image to show in place of the tile that failed to load.
  		errorTileUrl: '',

  		// @option zoomOffset: Number = 0
  		// The zoom number used in tile URLs will be offset with this value.
  		zoomOffset: 0,

  		// @option tms: Boolean = false
  		// If `true`, inverses Y axis numbering for tiles (turn this on for [TMS](https://en.wikipedia.org/wiki/Tile_Map_Service) services).
  		tms: false,

  		// @option zoomReverse: Boolean = false
  		// If set to true, the zoom number used in tile URLs will be reversed (`maxZoom - zoom` instead of `zoom`)
  		zoomReverse: false,

  		// @option detectRetina: Boolean = false
  		// If `true` and user is on a retina display, it will request four tiles of half the specified size and a bigger zoom level in place of one to utilize the high resolution.
  		detectRetina: false,

  		// @option crossOrigin: Boolean|String = false
  		// Whether the crossOrigin attribute will be added to the tiles.
  		// If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data.
  		// Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
  		crossOrigin: false
  	},

  	initialize: function (url, options) {

  		this._url = url;

  		options = setOptions(this, options);

  		// detecting retina displays, adjusting tileSize and zoom levels
  		if (options.detectRetina && retina && options.maxZoom > 0) {

  			options.tileSize = Math.floor(options.tileSize / 2);

  			if (!options.zoomReverse) {
  				options.zoomOffset++;
  				options.maxZoom--;
  			} else {
  				options.zoomOffset--;
  				options.minZoom++;
  			}

  			options.minZoom = Math.max(0, options.minZoom);
  		}

  		if (typeof options.subdomains === 'string') {
  			options.subdomains = options.subdomains.split('');
  		}

  		// for https://github.com/Leaflet/Leaflet/issues/137
  		if (!android) {
  			this.on('tileunload', this._onTileRemove);
  		}
  	},

  	// @method setUrl(url: String, noRedraw?: Boolean): this
  	// Updates the layer's URL template and redraws it (unless `noRedraw` is set to `true`).
  	// If the URL does not change, the layer will not be redrawn unless
  	// the noRedraw parameter is set to false.
  	setUrl: function (url, noRedraw) {
  		if (this._url === url && noRedraw === undefined) {
  			noRedraw = true;
  		}

  		this._url = url;

  		if (!noRedraw) {
  			this.redraw();
  		}
  		return this;
  	},

  	// @method createTile(coords: Object, done?: Function): HTMLElement
  	// Called only internally, overrides GridLayer's [`createTile()`](#gridlayer-createtile)
  	// to return an `<img>` HTML element with the appropriate image URL given `coords`. The `done`
  	// callback is called when the tile has been loaded.
  	createTile: function (coords, done) {
  		var tile = document.createElement('img');

  		on(tile, 'load', bind(this._tileOnLoad, this, done, tile));
  		on(tile, 'error', bind(this._tileOnError, this, done, tile));

  		if (this.options.crossOrigin || this.options.crossOrigin === '') {
  			tile.crossOrigin = this.options.crossOrigin === true ? '' : this.options.crossOrigin;
  		}

  		/*
  		 Alt tag is set to empty string to keep screen readers from reading URL and for compliance reasons
  		 http://www.w3.org/TR/WCAG20-TECHS/H67
  		*/
  		tile.alt = '';

  		/*
  		 Set role="presentation" to force screen readers to ignore this
  		 https://www.w3.org/TR/wai-aria/roles#textalternativecomputation
  		*/
  		tile.setAttribute('role', 'presentation');

  		tile.src = this.getTileUrl(coords);

  		return tile;
  	},

  	// @section Extension methods
  	// @uninheritable
  	// Layers extending `TileLayer` might reimplement the following method.
  	// @method getTileUrl(coords: Object): String
  	// Called only internally, returns the URL for a tile given its coordinates.
  	// Classes extending `TileLayer` can override this function to provide custom tile URL naming schemes.
  	getTileUrl: function (coords) {
  		var data = {
  			r: retina ? '@2x' : '',
  			s: this._getSubdomain(coords),
  			x: coords.x,
  			y: coords.y,
  			z: this._getZoomForUrl()
  		};
  		if (this._map && !this._map.options.crs.infinite) {
  			var invertedY = this._globalTileRange.max.y - coords.y;
  			if (this.options.tms) {
  				data['y'] = invertedY;
  			}
  			data['-y'] = invertedY;
  		}

  		return template(this._url, extend(data, this.options));
  	},

  	_tileOnLoad: function (done, tile) {
  		// For https://github.com/Leaflet/Leaflet/issues/3332
  		if (ielt9) {
  			setTimeout(bind(done, this, null, tile), 0);
  		} else {
  			done(null, tile);
  		}
  	},

  	_tileOnError: function (done, tile, e) {
  		var errorUrl = this.options.errorTileUrl;
  		if (errorUrl && tile.getAttribute('src') !== errorUrl) {
  			tile.src = errorUrl;
  		}
  		done(e, tile);
  	},

  	_onTileRemove: function (e) {
  		e.tile.onload = null;
  	},

  	_getZoomForUrl: function () {
  		var zoom = this._tileZoom,
  		maxZoom = this.options.maxZoom,
  		zoomReverse = this.options.zoomReverse,
  		zoomOffset = this.options.zoomOffset;

  		if (zoomReverse) {
  			zoom = maxZoom - zoom;
  		}

  		return zoom + zoomOffset;
  	},

  	_getSubdomain: function (tilePoint) {
  		var index = Math.abs(tilePoint.x + tilePoint.y) % this.options.subdomains.length;
  		return this.options.subdomains[index];
  	},

  	// stops loading all tiles in the background layer
  	_abortLoading: function () {
  		var i, tile;
  		for (i in this._tiles) {
  			if (this._tiles[i].coords.z !== this._tileZoom) {
  				tile = this._tiles[i].el;

  				tile.onload = falseFn;
  				tile.onerror = falseFn;

  				if (!tile.complete) {
  					tile.src = emptyImageUrl;
  					remove(tile);
  					delete this._tiles[i];
  				}
  			}
  		}
  	},

  	_removeTile: function (key) {
  		var tile = this._tiles[key];
  		if (!tile) { return; }

  		// Cancels any pending http requests associated with the tile
  		// unless we're on Android's stock browser,
  		// see https://github.com/Leaflet/Leaflet/issues/137
  		if (!androidStock) {
  			tile.el.setAttribute('src', emptyImageUrl);
  		}

  		return GridLayer.prototype._removeTile.call(this, key);
  	},

  	_tileReady: function (coords, err, tile) {
  		if (!this._map || (tile && tile.getAttribute('src') === emptyImageUrl)) {
  			return;
  		}

  		return GridLayer.prototype._tileReady.call(this, coords, err, tile);
  	}
  });


  // @factory L.tilelayer(urlTemplate: String, options?: TileLayer options)
  // Instantiates a tile layer object given a `URL template` and optionally an options object.

  function tileLayer(url, options) {
  	return new TileLayer(url, options);
  }

  /*
   * @class TileLayer.WMS
   * @inherits TileLayer
   * @aka L.TileLayer.WMS
   * Used to display [WMS](https://en.wikipedia.org/wiki/Web_Map_Service) services as tile layers on the map. Extends `TileLayer`.
   *
   * @example
   *
   * ```js
   * var nexrad = L.tileLayer.wms("http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi", {
   * 	layers: 'nexrad-n0r-900913',
   * 	format: 'image/png',
   * 	transparent: true,
   * 	attribution: "Weather data © 2012 IEM Nexrad"
   * });
   * ```
   */

  var TileLayerWMS = TileLayer.extend({

  	// @section
  	// @aka TileLayer.WMS options
  	// If any custom options not documented here are used, they will be sent to the
  	// WMS server as extra parameters in each request URL. This can be useful for
  	// [non-standard vendor WMS parameters](http://docs.geoserver.org/stable/en/user/services/wms/vendor.html).
  	defaultWmsParams: {
  		service: 'WMS',
  		request: 'GetMap',

  		// @option layers: String = ''
  		// **(required)** Comma-separated list of WMS layers to show.
  		layers: '',

  		// @option styles: String = ''
  		// Comma-separated list of WMS styles.
  		styles: '',

  		// @option format: String = 'image/jpeg'
  		// WMS image format (use `'image/png'` for layers with transparency).
  		format: 'image/jpeg',

  		// @option transparent: Boolean = false
  		// If `true`, the WMS service will return images with transparency.
  		transparent: false,

  		// @option version: String = '1.1.1'
  		// Version of the WMS service to use
  		version: '1.1.1'
  	},

  	options: {
  		// @option crs: CRS = null
  		// Coordinate Reference System to use for the WMS requests, defaults to
  		// map CRS. Don't change this if you're not sure what it means.
  		crs: null,

  		// @option uppercase: Boolean = false
  		// If `true`, WMS request parameter keys will be uppercase.
  		uppercase: false
  	},

  	initialize: function (url, options) {

  		this._url = url;

  		var wmsParams = extend({}, this.defaultWmsParams);

  		// all keys that are not TileLayer options go to WMS params
  		for (var i in options) {
  			if (!(i in this.options)) {
  				wmsParams[i] = options[i];
  			}
  		}

  		options = setOptions(this, options);

  		var realRetina = options.detectRetina && retina ? 2 : 1;
  		var tileSize = this.getTileSize();
  		wmsParams.width = tileSize.x * realRetina;
  		wmsParams.height = tileSize.y * realRetina;

  		this.wmsParams = wmsParams;
  	},

  	onAdd: function (map) {

  		this._crs = this.options.crs || map.options.crs;
  		this._wmsVersion = parseFloat(this.wmsParams.version);

  		var projectionKey = this._wmsVersion >= 1.3 ? 'crs' : 'srs';
  		this.wmsParams[projectionKey] = this._crs.code;

  		TileLayer.prototype.onAdd.call(this, map);
  	},

  	getTileUrl: function (coords) {

  		var tileBounds = this._tileCoordsToNwSe(coords),
  		    crs = this._crs,
  		    bounds = toBounds(crs.project(tileBounds[0]), crs.project(tileBounds[1])),
  		    min = bounds.min,
  		    max = bounds.max,
  		    bbox = (this._wmsVersion >= 1.3 && this._crs === EPSG4326 ?
  		    [min.y, min.x, max.y, max.x] :
  		    [min.x, min.y, max.x, max.y]).join(','),
  		    url = TileLayer.prototype.getTileUrl.call(this, coords);
  		return url +
  			getParamString(this.wmsParams, url, this.options.uppercase) +
  			(this.options.uppercase ? '&BBOX=' : '&bbox=') + bbox;
  	},

  	// @method setParams(params: Object, noRedraw?: Boolean): this
  	// Merges an object with the new parameters and re-requests tiles on the current screen (unless `noRedraw` was set to true).
  	setParams: function (params, noRedraw) {

  		extend(this.wmsParams, params);

  		if (!noRedraw) {
  			this.redraw();
  		}

  		return this;
  	}
  });


  // @factory L.tileLayer.wms(baseUrl: String, options: TileLayer.WMS options)
  // Instantiates a WMS tile layer object given a base URL of the WMS service and a WMS parameters/options object.
  function tileLayerWMS(url, options) {
  	return new TileLayerWMS(url, options);
  }

  TileLayer.WMS = TileLayerWMS;
  tileLayer.wms = tileLayerWMS;

  /*
   * @class Renderer
   * @inherits Layer
   * @aka L.Renderer
   *
   * Base class for vector renderer implementations (`SVG`, `Canvas`). Handles the
   * DOM container of the renderer, its bounds, and its zoom animation.
   *
   * A `Renderer` works as an implicit layer group for all `Path`s - the renderer
   * itself can be added or removed to the map. All paths use a renderer, which can
   * be implicit (the map will decide the type of renderer and use it automatically)
   * or explicit (using the [`renderer`](#path-renderer) option of the path).
   *
   * Do not use this class directly, use `SVG` and `Canvas` instead.
   *
   * @event update: Event
   * Fired when the renderer updates its bounds, center and zoom, for example when
   * its map has moved
   */

  var Renderer = Layer.extend({

  	// @section
  	// @aka Renderer options
  	options: {
  		// @option padding: Number = 0.1
  		// How much to extend the clip area around the map view (relative to its size)
  		// e.g. 0.1 would be 10% of map view in each direction
  		padding: 0.1,

  		// @option tolerance: Number = 0
  		// How much to extend click tolerance round a path/object on the map
  		tolerance : 0
  	},

  	initialize: function (options) {
  		setOptions(this, options);
  		stamp(this);
  		this._layers = this._layers || {};
  	},

  	onAdd: function () {
  		if (!this._container) {
  			this._initContainer(); // defined by renderer implementations

  			if (this._zoomAnimated) {
  				addClass(this._container, 'leaflet-zoom-animated');
  			}
  		}

  		this.getPane().appendChild(this._container);
  		this._update();
  		this.on('update', this._updatePaths, this);
  	},

  	onRemove: function () {
  		this.off('update', this._updatePaths, this);
  		this._destroyContainer();
  	},

  	getEvents: function () {
  		var events = {
  			viewreset: this._reset,
  			zoom: this._onZoom,
  			moveend: this._update,
  			zoomend: this._onZoomEnd
  		};
  		if (this._zoomAnimated) {
  			events.zoomanim = this._onAnimZoom;
  		}
  		return events;
  	},

  	_onAnimZoom: function (ev) {
  		this._updateTransform(ev.center, ev.zoom);
  	},

  	_onZoom: function () {
  		this._updateTransform(this._map.getCenter(), this._map.getZoom());
  	},

  	_updateTransform: function (center, zoom) {
  		var scale = this._map.getZoomScale(zoom, this._zoom),
  		    position = getPosition(this._container),
  		    viewHalf = this._map.getSize().multiplyBy(0.5 + this.options.padding),
  		    currentCenterPoint = this._map.project(this._center, zoom),
  		    destCenterPoint = this._map.project(center, zoom),
  		    centerOffset = destCenterPoint.subtract(currentCenterPoint),

  		    topLeftOffset = viewHalf.multiplyBy(-scale).add(position).add(viewHalf).subtract(centerOffset);

  		if (any3d) {
  			setTransform(this._container, topLeftOffset, scale);
  		} else {
  			setPosition(this._container, topLeftOffset);
  		}
  	},

  	_reset: function () {
  		this._update();
  		this._updateTransform(this._center, this._zoom);

  		for (var id in this._layers) {
  			this._layers[id]._reset();
  		}
  	},

  	_onZoomEnd: function () {
  		for (var id in this._layers) {
  			this._layers[id]._project();
  		}
  	},

  	_updatePaths: function () {
  		for (var id in this._layers) {
  			this._layers[id]._update();
  		}
  	},

  	_update: function () {
  		// Update pixel bounds of renderer container (for positioning/sizing/clipping later)
  		// Subclasses are responsible of firing the 'update' event.
  		var p = this.options.padding,
  		    size = this._map.getSize(),
  		    min = this._map.containerPointToLayerPoint(size.multiplyBy(-p)).round();

  		this._bounds = new Bounds(min, min.add(size.multiplyBy(1 + p * 2)).round());

  		this._center = this._map.getCenter();
  		this._zoom = this._map.getZoom();
  	}
  });

  /*
   * @class Canvas
   * @inherits Renderer
   * @aka L.Canvas
   *
   * Allows vector layers to be displayed with [`<canvas>`](https://developer.mozilla.org/docs/Web/API/Canvas_API).
   * Inherits `Renderer`.
   *
   * Due to [technical limitations](http://caniuse.com/#search=canvas), Canvas is not
   * available in all web browsers, notably IE8, and overlapping geometries might
   * not display properly in some edge cases.
   *
   * @example
   *
   * Use Canvas by default for all paths in the map:
   *
   * ```js
   * var map = L.map('map', {
   * 	renderer: L.canvas()
   * });
   * ```
   *
   * Use a Canvas renderer with extra padding for specific vector geometries:
   *
   * ```js
   * var map = L.map('map');
   * var myRenderer = L.canvas({ padding: 0.5 });
   * var line = L.polyline( coordinates, { renderer: myRenderer } );
   * var circle = L.circle( center, { renderer: myRenderer } );
   * ```
   */

  var Canvas = Renderer.extend({
  	getEvents: function () {
  		var events = Renderer.prototype.getEvents.call(this);
  		events.viewprereset = this._onViewPreReset;
  		return events;
  	},

  	_onViewPreReset: function () {
  		// Set a flag so that a viewprereset+moveend+viewreset only updates&redraws once
  		this._postponeUpdatePaths = true;
  	},

  	onAdd: function () {
  		Renderer.prototype.onAdd.call(this);

  		// Redraw vectors since canvas is cleared upon removal,
  		// in case of removing the renderer itself from the map.
  		this._draw();
  	},

  	_initContainer: function () {
  		var container = this._container = document.createElement('canvas');

  		on(container, 'mousemove', this._onMouseMove, this);
  		on(container, 'click dblclick mousedown mouseup contextmenu', this._onClick, this);
  		on(container, 'mouseout', this._handleMouseOut, this);

  		this._ctx = container.getContext('2d');
  	},

  	_destroyContainer: function () {
  		cancelAnimFrame(this._redrawRequest);
  		delete this._ctx;
  		remove(this._container);
  		off(this._container);
  		delete this._container;
  	},

  	_updatePaths: function () {
  		if (this._postponeUpdatePaths) { return; }

  		var layer;
  		this._redrawBounds = null;
  		for (var id in this._layers) {
  			layer = this._layers[id];
  			layer._update();
  		}
  		this._redraw();
  	},

  	_update: function () {
  		if (this._map._animatingZoom && this._bounds) { return; }

  		Renderer.prototype._update.call(this);

  		var b = this._bounds,
  		    container = this._container,
  		    size = b.getSize(),
  		    m = retina ? 2 : 1;

  		setPosition(container, b.min);

  		// set canvas size (also clearing it); use double size on retina
  		container.width = m * size.x;
  		container.height = m * size.y;
  		container.style.width = size.x + 'px';
  		container.style.height = size.y + 'px';

  		if (retina) {
  			this._ctx.scale(2, 2);
  		}

  		// translate so we use the same path coordinates after canvas element moves
  		this._ctx.translate(-b.min.x, -b.min.y);

  		// Tell paths to redraw themselves
  		this.fire('update');
  	},

  	_reset: function () {
  		Renderer.prototype._reset.call(this);

  		if (this._postponeUpdatePaths) {
  			this._postponeUpdatePaths = false;
  			this._updatePaths();
  		}
  	},

  	_initPath: function (layer) {
  		this._updateDashArray(layer);
  		this._layers[stamp(layer)] = layer;

  		var order = layer._order = {
  			layer: layer,
  			prev: this._drawLast,
  			next: null
  		};
  		if (this._drawLast) { this._drawLast.next = order; }
  		this._drawLast = order;
  		this._drawFirst = this._drawFirst || this._drawLast;
  	},

  	_addPath: function (layer) {
  		this._requestRedraw(layer);
  	},

  	_removePath: function (layer) {
  		var order = layer._order;
  		var next = order.next;
  		var prev = order.prev;

  		if (next) {
  			next.prev = prev;
  		} else {
  			this._drawLast = prev;
  		}
  		if (prev) {
  			prev.next = next;
  		} else {
  			this._drawFirst = next;
  		}

  		delete layer._order;

  		delete this._layers[stamp(layer)];

  		this._requestRedraw(layer);
  	},

  	_updatePath: function (layer) {
  		// Redraw the union of the layer's old pixel
  		// bounds and the new pixel bounds.
  		this._extendRedrawBounds(layer);
  		layer._project();
  		layer._update();
  		// The redraw will extend the redraw bounds
  		// with the new pixel bounds.
  		this._requestRedraw(layer);
  	},

  	_updateStyle: function (layer) {
  		this._updateDashArray(layer);
  		this._requestRedraw(layer);
  	},

  	_updateDashArray: function (layer) {
  		if (typeof layer.options.dashArray === 'string') {
  			var parts = layer.options.dashArray.split(/[, ]+/),
  			    dashArray = [],
  			    dashValue,
  			    i;
  			for (i = 0; i < parts.length; i++) {
  				dashValue = Number(parts[i]);
  				// Ignore dash array containing invalid lengths
  				if (isNaN(dashValue)) { return; }
  				dashArray.push(dashValue);
  			}
  			layer.options._dashArray = dashArray;
  		} else {
  			layer.options._dashArray = layer.options.dashArray;
  		}
  	},

  	_requestRedraw: function (layer) {
  		if (!this._map) { return; }

  		this._extendRedrawBounds(layer);
  		this._redrawRequest = this._redrawRequest || requestAnimFrame(this._redraw, this);
  	},

  	_extendRedrawBounds: function (layer) {
  		if (layer._pxBounds) {
  			var padding = (layer.options.weight || 0) + 1;
  			this._redrawBounds = this._redrawBounds || new Bounds();
  			this._redrawBounds.extend(layer._pxBounds.min.subtract([padding, padding]));
  			this._redrawBounds.extend(layer._pxBounds.max.add([padding, padding]));
  		}
  	},

  	_redraw: function () {
  		this._redrawRequest = null;

  		if (this._redrawBounds) {
  			this._redrawBounds.min._floor();
  			this._redrawBounds.max._ceil();
  		}

  		this._clear(); // clear layers in redraw bounds
  		this._draw(); // draw layers

  		this._redrawBounds = null;
  	},

  	_clear: function () {
  		var bounds = this._redrawBounds;
  		if (bounds) {
  			var size = bounds.getSize();
  			this._ctx.clearRect(bounds.min.x, bounds.min.y, size.x, size.y);
  		} else {
  			this._ctx.save();
  			this._ctx.setTransform(1, 0, 0, 1, 0, 0);
  			this._ctx.clearRect(0, 0, this._container.width, this._container.height);
  			this._ctx.restore();
  		}
  	},

  	_draw: function () {
  		var layer, bounds = this._redrawBounds;
  		this._ctx.save();
  		if (bounds) {
  			var size = bounds.getSize();
  			this._ctx.beginPath();
  			this._ctx.rect(bounds.min.x, bounds.min.y, size.x, size.y);
  			this._ctx.clip();
  		}

  		this._drawing = true;

  		for (var order = this._drawFirst; order; order = order.next) {
  			layer = order.layer;
  			if (!bounds || (layer._pxBounds && layer._pxBounds.intersects(bounds))) {
  				layer._updatePath();
  			}
  		}

  		this._drawing = false;

  		this._ctx.restore();  // Restore state before clipping.
  	},

  	_updatePoly: function (layer, closed) {
  		if (!this._drawing) { return; }

  		var i, j, len2, p,
  		    parts = layer._parts,
  		    len = parts.length,
  		    ctx = this._ctx;

  		if (!len) { return; }

  		ctx.beginPath();

  		for (i = 0; i < len; i++) {
  			for (j = 0, len2 = parts[i].length; j < len2; j++) {
  				p = parts[i][j];
  				ctx[j ? 'lineTo' : 'moveTo'](p.x, p.y);
  			}
  			if (closed) {
  				ctx.closePath();
  			}
  		}

  		this._fillStroke(ctx, layer);

  		// TODO optimization: 1 fill/stroke for all features with equal style instead of 1 for each feature
  	},

  	_updateCircle: function (layer) {

  		if (!this._drawing || layer._empty()) { return; }

  		var p = layer._point,
  		    ctx = this._ctx,
  		    r = Math.max(Math.round(layer._radius), 1),
  		    s = (Math.max(Math.round(layer._radiusY), 1) || r) / r;

  		if (s !== 1) {
  			ctx.save();
  			ctx.scale(1, s);
  		}

  		ctx.beginPath();
  		ctx.arc(p.x, p.y / s, r, 0, Math.PI * 2, false);

  		if (s !== 1) {
  			ctx.restore();
  		}

  		this._fillStroke(ctx, layer);
  	},

  	_fillStroke: function (ctx, layer) {
  		var options = layer.options;

  		if (options.fill) {
  			ctx.globalAlpha = options.fillOpacity;
  			ctx.fillStyle = options.fillColor || options.color;
  			ctx.fill(options.fillRule || 'evenodd');
  		}

  		if (options.stroke && options.weight !== 0) {
  			if (ctx.setLineDash) {
  				ctx.setLineDash(layer.options && layer.options._dashArray || []);
  			}
  			ctx.globalAlpha = options.opacity;
  			ctx.lineWidth = options.weight;
  			ctx.strokeStyle = options.color;
  			ctx.lineCap = options.lineCap;
  			ctx.lineJoin = options.lineJoin;
  			ctx.stroke();
  		}
  	},

  	// Canvas obviously doesn't have mouse events for individual drawn objects,
  	// so we emulate that by calculating what's under the mouse on mousemove/click manually

  	_onClick: function (e) {
  		var point = this._map.mouseEventToLayerPoint(e), layer, clickedLayer;

  		for (var order = this._drawFirst; order; order = order.next) {
  			layer = order.layer;
  			if (layer.options.interactive && layer._containsPoint(point)) {
  				if (!(e.type === 'click' || e.type !== 'preclick') || !this._map._draggableMoved(layer)) {
  					clickedLayer = layer;
  				}
  			}
  		}
  		if (clickedLayer)  {
  			fakeStop(e);
  			this._fireEvent([clickedLayer], e);
  		}
  	},

  	_onMouseMove: function (e) {
  		if (!this._map || this._map.dragging.moving() || this._map._animatingZoom) { return; }

  		var point = this._map.mouseEventToLayerPoint(e);
  		this._handleMouseHover(e, point);
  	},


  	_handleMouseOut: function (e) {
  		var layer = this._hoveredLayer;
  		if (layer) {
  			// if we're leaving the layer, fire mouseout
  			removeClass(this._container, 'leaflet-interactive');
  			this._fireEvent([layer], e, 'mouseout');
  			this._hoveredLayer = null;
  			this._mouseHoverThrottled = false;
  		}
  	},

  	_handleMouseHover: function (e, point) {
  		if (this._mouseHoverThrottled) {
  			return;
  		}

  		var layer, candidateHoveredLayer;

  		for (var order = this._drawFirst; order; order = order.next) {
  			layer = order.layer;
  			if (layer.options.interactive && layer._containsPoint(point)) {
  				candidateHoveredLayer = layer;
  			}
  		}

  		if (candidateHoveredLayer !== this._hoveredLayer) {
  			this._handleMouseOut(e);

  			if (candidateHoveredLayer) {
  				addClass(this._container, 'leaflet-interactive'); // change cursor
  				this._fireEvent([candidateHoveredLayer], e, 'mouseover');
  				this._hoveredLayer = candidateHoveredLayer;
  			}
  		}

  		if (this._hoveredLayer) {
  			this._fireEvent([this._hoveredLayer], e);
  		}

  		this._mouseHoverThrottled = true;
  		setTimeout(bind(function () {
  			this._mouseHoverThrottled = false;
  		}, this), 32);
  	},

  	_fireEvent: function (layers, e, type) {
  		this._map._fireDOMEvent(e, type || e.type, layers);
  	},

  	_bringToFront: function (layer) {
  		var order = layer._order;

  		if (!order) { return; }

  		var next = order.next;
  		var prev = order.prev;

  		if (next) {
  			next.prev = prev;
  		} else {
  			// Already last
  			return;
  		}
  		if (prev) {
  			prev.next = next;
  		} else if (next) {
  			// Update first entry unless this is the
  			// single entry
  			this._drawFirst = next;
  		}

  		order.prev = this._drawLast;
  		this._drawLast.next = order;

  		order.next = null;
  		this._drawLast = order;

  		this._requestRedraw(layer);
  	},

  	_bringToBack: function (layer) {
  		var order = layer._order;

  		if (!order) { return; }

  		var next = order.next;
  		var prev = order.prev;

  		if (prev) {
  			prev.next = next;
  		} else {
  			// Already first
  			return;
  		}
  		if (next) {
  			next.prev = prev;
  		} else if (prev) {
  			// Update last entry unless this is the
  			// single entry
  			this._drawLast = prev;
  		}

  		order.prev = null;

  		order.next = this._drawFirst;
  		this._drawFirst.prev = order;
  		this._drawFirst = order;

  		this._requestRedraw(layer);
  	}
  });

  // @factory L.canvas(options?: Renderer options)
  // Creates a Canvas renderer with the given options.
  function canvas$1(options) {
  	return canvas ? new Canvas(options) : null;
  }

  /*
   * Thanks to Dmitry Baranovsky and his Raphael library for inspiration!
   */


  var vmlCreate = (function () {
  	try {
  		document.namespaces.add('lvml', 'urn:schemas-microsoft-com:vml');
  		return function (name) {
  			return document.createElement('<lvml:' + name + ' class="lvml">');
  		};
  	} catch (e) {
  		return function (name) {
  			return document.createElement('<' + name + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
  		};
  	}
  })();


  /*
   * @class SVG
   *
   *
   * VML was deprecated in 2012, which means VML functionality exists only for backwards compatibility
   * with old versions of Internet Explorer.
   */

  // mixin to redefine some SVG methods to handle VML syntax which is similar but with some differences
  var vmlMixin = {

  	_initContainer: function () {
  		this._container = create$1('div', 'leaflet-vml-container');
  	},

  	_update: function () {
  		if (this._map._animatingZoom) { return; }
  		Renderer.prototype._update.call(this);
  		this.fire('update');
  	},

  	_initPath: function (layer) {
  		var container = layer._container = vmlCreate('shape');

  		addClass(container, 'leaflet-vml-shape ' + (this.options.className || ''));

  		container.coordsize = '1 1';

  		layer._path = vmlCreate('path');
  		container.appendChild(layer._path);

  		this._updateStyle(layer);
  		this._layers[stamp(layer)] = layer;
  	},

  	_addPath: function (layer) {
  		var container = layer._container;
  		this._container.appendChild(container);

  		if (layer.options.interactive) {
  			layer.addInteractiveTarget(container);
  		}
  	},

  	_removePath: function (layer) {
  		var container = layer._container;
  		remove(container);
  		layer.removeInteractiveTarget(container);
  		delete this._layers[stamp(layer)];
  	},

  	_updateStyle: function (layer) {
  		var stroke = layer._stroke,
  		    fill = layer._fill,
  		    options = layer.options,
  		    container = layer._container;

  		container.stroked = !!options.stroke;
  		container.filled = !!options.fill;

  		if (options.stroke) {
  			if (!stroke) {
  				stroke = layer._stroke = vmlCreate('stroke');
  			}
  			container.appendChild(stroke);
  			stroke.weight = options.weight + 'px';
  			stroke.color = options.color;
  			stroke.opacity = options.opacity;

  			if (options.dashArray) {
  				stroke.dashStyle = isArray(options.dashArray) ?
  				    options.dashArray.join(' ') :
  				    options.dashArray.replace(/( *, *)/g, ' ');
  			} else {
  				stroke.dashStyle = '';
  			}
  			stroke.endcap = options.lineCap.replace('butt', 'flat');
  			stroke.joinstyle = options.lineJoin;

  		} else if (stroke) {
  			container.removeChild(stroke);
  			layer._stroke = null;
  		}

  		if (options.fill) {
  			if (!fill) {
  				fill = layer._fill = vmlCreate('fill');
  			}
  			container.appendChild(fill);
  			fill.color = options.fillColor || options.color;
  			fill.opacity = options.fillOpacity;

  		} else if (fill) {
  			container.removeChild(fill);
  			layer._fill = null;
  		}
  	},

  	_updateCircle: function (layer) {
  		var p = layer._point.round(),
  		    r = Math.round(layer._radius),
  		    r2 = Math.round(layer._radiusY || r);

  		this._setPath(layer, layer._empty() ? 'M0 0' :
  			'AL ' + p.x + ',' + p.y + ' ' + r + ',' + r2 + ' 0,' + (65535 * 360));
  	},

  	_setPath: function (layer, path) {
  		layer._path.v = path;
  	},

  	_bringToFront: function (layer) {
  		toFront(layer._container);
  	},

  	_bringToBack: function (layer) {
  		toBack(layer._container);
  	}
  };

  var create$2 = vml ? vmlCreate : svgCreate;

  /*
   * @class SVG
   * @inherits Renderer
   * @aka L.SVG
   *
   * Allows vector layers to be displayed with [SVG](https://developer.mozilla.org/docs/Web/SVG).
   * Inherits `Renderer`.
   *
   * Due to [technical limitations](http://caniuse.com/#search=svg), SVG is not
   * available in all web browsers, notably Android 2.x and 3.x.
   *
   * Although SVG is not available on IE7 and IE8, these browsers support
   * [VML](https://en.wikipedia.org/wiki/Vector_Markup_Language)
   * (a now deprecated technology), and the SVG renderer will fall back to VML in
   * this case.
   *
   * @example
   *
   * Use SVG by default for all paths in the map:
   *
   * ```js
   * var map = L.map('map', {
   * 	renderer: L.svg()
   * });
   * ```
   *
   * Use a SVG renderer with extra padding for specific vector geometries:
   *
   * ```js
   * var map = L.map('map');
   * var myRenderer = L.svg({ padding: 0.5 });
   * var line = L.polyline( coordinates, { renderer: myRenderer } );
   * var circle = L.circle( center, { renderer: myRenderer } );
   * ```
   */

  var SVG = Renderer.extend({

  	getEvents: function () {
  		var events = Renderer.prototype.getEvents.call(this);
  		events.zoomstart = this._onZoomStart;
  		return events;
  	},

  	_initContainer: function () {
  		this._container = create$2('svg');

  		// makes it possible to click through svg root; we'll reset it back in individual paths
  		this._container.setAttribute('pointer-events', 'none');

  		this._rootGroup = create$2('g');
  		this._container.appendChild(this._rootGroup);
  	},

  	_destroyContainer: function () {
  		remove(this._container);
  		off(this._container);
  		delete this._container;
  		delete this._rootGroup;
  		delete this._svgSize;
  	},

  	_onZoomStart: function () {
  		// Drag-then-pinch interactions might mess up the center and zoom.
  		// In this case, the easiest way to prevent this is re-do the renderer
  		//   bounds and padding when the zooming starts.
  		this._update();
  	},

  	_update: function () {
  		if (this._map._animatingZoom && this._bounds) { return; }

  		Renderer.prototype._update.call(this);

  		var b = this._bounds,
  		    size = b.getSize(),
  		    container = this._container;

  		// set size of svg-container if changed
  		if (!this._svgSize || !this._svgSize.equals(size)) {
  			this._svgSize = size;
  			container.setAttribute('width', size.x);
  			container.setAttribute('height', size.y);
  		}

  		// movement: update container viewBox so that we don't have to change coordinates of individual layers
  		setPosition(container, b.min);
  		container.setAttribute('viewBox', [b.min.x, b.min.y, size.x, size.y].join(' '));

  		this.fire('update');
  	},

  	// methods below are called by vector layers implementations

  	_initPath: function (layer) {
  		var path = layer._path = create$2('path');

  		// @namespace Path
  		// @option className: String = null
  		// Custom class name set on an element. Only for SVG renderer.
  		if (layer.options.className) {
  			addClass(path, layer.options.className);
  		}

  		if (layer.options.interactive) {
  			addClass(path, 'leaflet-interactive');
  		}

  		this._updateStyle(layer);
  		this._layers[stamp(layer)] = layer;
  	},

  	_addPath: function (layer) {
  		if (!this._rootGroup) { this._initContainer(); }
  		this._rootGroup.appendChild(layer._path);
  		layer.addInteractiveTarget(layer._path);
  	},

  	_removePath: function (layer) {
  		remove(layer._path);
  		layer.removeInteractiveTarget(layer._path);
  		delete this._layers[stamp(layer)];
  	},

  	_updatePath: function (layer) {
  		layer._project();
  		layer._update();
  	},

  	_updateStyle: function (layer) {
  		var path = layer._path,
  		    options = layer.options;

  		if (!path) { return; }

  		if (options.stroke) {
  			path.setAttribute('stroke', options.color);
  			path.setAttribute('stroke-opacity', options.opacity);
  			path.setAttribute('stroke-width', options.weight);
  			path.setAttribute('stroke-linecap', options.lineCap);
  			path.setAttribute('stroke-linejoin', options.lineJoin);

  			if (options.dashArray) {
  				path.setAttribute('stroke-dasharray', options.dashArray);
  			} else {
  				path.removeAttribute('stroke-dasharray');
  			}

  			if (options.dashOffset) {
  				path.setAttribute('stroke-dashoffset', options.dashOffset);
  			} else {
  				path.removeAttribute('stroke-dashoffset');
  			}
  		} else {
  			path.setAttribute('stroke', 'none');
  		}

  		if (options.fill) {
  			path.setAttribute('fill', options.fillColor || options.color);
  			path.setAttribute('fill-opacity', options.fillOpacity);
  			path.setAttribute('fill-rule', options.fillRule || 'evenodd');
  		} else {
  			path.setAttribute('fill', 'none');
  		}
  	},

  	_updatePoly: function (layer, closed) {
  		this._setPath(layer, pointsToPath(layer._parts, closed));
  	},

  	_updateCircle: function (layer) {
  		var p = layer._point,
  		    r = Math.max(Math.round(layer._radius), 1),
  		    r2 = Math.max(Math.round(layer._radiusY), 1) || r,
  		    arc = 'a' + r + ',' + r2 + ' 0 1,0 ';

  		// drawing a circle with two half-arcs
  		var d = layer._empty() ? 'M0 0' :
  			'M' + (p.x - r) + ',' + p.y +
  			arc + (r * 2) + ',0 ' +
  			arc + (-r * 2) + ',0 ';

  		this._setPath(layer, d);
  	},

  	_setPath: function (layer, path) {
  		layer._path.setAttribute('d', path);
  	},

  	// SVG does not have the concept of zIndex so we resort to changing the DOM order of elements
  	_bringToFront: function (layer) {
  		toFront(layer._path);
  	},

  	_bringToBack: function (layer) {
  		toBack(layer._path);
  	}
  });

  if (vml) {
  	SVG.include(vmlMixin);
  }

  // @namespace SVG
  // @factory L.svg(options?: Renderer options)
  // Creates a SVG renderer with the given options.
  function svg$1(options) {
  	return svg || vml ? new SVG(options) : null;
  }

  Map.include({
  	// @namespace Map; @method getRenderer(layer: Path): Renderer
  	// Returns the instance of `Renderer` that should be used to render the given
  	// `Path`. It will ensure that the `renderer` options of the map and paths
  	// are respected, and that the renderers do exist on the map.
  	getRenderer: function (layer) {
  		// @namespace Path; @option renderer: Renderer
  		// Use this specific instance of `Renderer` for this path. Takes
  		// precedence over the map's [default renderer](#map-renderer).
  		var renderer = layer.options.renderer || this._getPaneRenderer(layer.options.pane) || this.options.renderer || this._renderer;

  		if (!renderer) {
  			renderer = this._renderer = this._createRenderer();
  		}

  		if (!this.hasLayer(renderer)) {
  			this.addLayer(renderer);
  		}
  		return renderer;
  	},

  	_getPaneRenderer: function (name) {
  		if (name === 'overlayPane' || name === undefined) {
  			return false;
  		}

  		var renderer = this._paneRenderers[name];
  		if (renderer === undefined) {
  			renderer = this._createRenderer({pane: name});
  			this._paneRenderers[name] = renderer;
  		}
  		return renderer;
  	},

  	_createRenderer: function (options) {
  		// @namespace Map; @option preferCanvas: Boolean = false
  		// Whether `Path`s should be rendered on a `Canvas` renderer.
  		// By default, all `Path`s are rendered in a `SVG` renderer.
  		return (this.options.preferCanvas && canvas$1(options)) || svg$1(options);
  	}
  });

  /*
   * L.Rectangle extends Polygon and creates a rectangle when passed a LatLngBounds object.
   */

  /*
   * @class Rectangle
   * @aka L.Rectangle
   * @inherits Polygon
   *
   * A class for drawing rectangle overlays on a map. Extends `Polygon`.
   *
   * @example
   *
   * ```js
   * // define rectangle geographical bounds
   * var bounds = [[54.559322, -5.767822], [56.1210604, -3.021240]];
   *
   * // create an orange rectangle
   * L.rectangle(bounds, {color: "#ff7800", weight: 1}).addTo(map);
   *
   * // zoom the map to the rectangle bounds
   * map.fitBounds(bounds);
   * ```
   *
   */


  var Rectangle = Polygon.extend({
  	initialize: function (latLngBounds, options) {
  		Polygon.prototype.initialize.call(this, this._boundsToLatLngs(latLngBounds), options);
  	},

  	// @method setBounds(latLngBounds: LatLngBounds): this
  	// Redraws the rectangle with the passed bounds.
  	setBounds: function (latLngBounds) {
  		return this.setLatLngs(this._boundsToLatLngs(latLngBounds));
  	},

  	_boundsToLatLngs: function (latLngBounds) {
  		latLngBounds = toLatLngBounds(latLngBounds);
  		return [
  			latLngBounds.getSouthWest(),
  			latLngBounds.getNorthWest(),
  			latLngBounds.getNorthEast(),
  			latLngBounds.getSouthEast()
  		];
  	}
  });


  // @factory L.rectangle(latLngBounds: LatLngBounds, options?: Polyline options)
  function rectangle(latLngBounds, options) {
  	return new Rectangle(latLngBounds, options);
  }

  SVG.create = create$2;
  SVG.pointsToPath = pointsToPath;

  GeoJSON.geometryToLayer = geometryToLayer;
  GeoJSON.coordsToLatLng = coordsToLatLng;
  GeoJSON.coordsToLatLngs = coordsToLatLngs;
  GeoJSON.latLngToCoords = latLngToCoords;
  GeoJSON.latLngsToCoords = latLngsToCoords;
  GeoJSON.getFeature = getFeature;
  GeoJSON.asFeature = asFeature;

  /*
   * L.Handler.BoxZoom is used to add shift-drag zoom interaction to the map
   * (zoom to a selected bounding box), enabled by default.
   */

  // @namespace Map
  // @section Interaction Options
  Map.mergeOptions({
  	// @option boxZoom: Boolean = true
  	// Whether the map can be zoomed to a rectangular area specified by
  	// dragging the mouse while pressing the shift key.
  	boxZoom: true
  });

  var BoxZoom = Handler.extend({
  	initialize: function (map) {
  		this._map = map;
  		this._container = map._container;
  		this._pane = map._panes.overlayPane;
  		this._resetStateTimeout = 0;
  		map.on('unload', this._destroy, this);
  	},

  	addHooks: function () {
  		on(this._container, 'mousedown', this._onMouseDown, this);
  	},

  	removeHooks: function () {
  		off(this._container, 'mousedown', this._onMouseDown, this);
  	},

  	moved: function () {
  		return this._moved;
  	},

  	_destroy: function () {
  		remove(this._pane);
  		delete this._pane;
  	},

  	_resetState: function () {
  		this._resetStateTimeout = 0;
  		this._moved = false;
  	},

  	_clearDeferredResetState: function () {
  		if (this._resetStateTimeout !== 0) {
  			clearTimeout(this._resetStateTimeout);
  			this._resetStateTimeout = 0;
  		}
  	},

  	_onMouseDown: function (e) {
  		if (!e.shiftKey || ((e.which !== 1) && (e.button !== 1))) { return false; }

  		// Clear the deferred resetState if it hasn't executed yet, otherwise it
  		// will interrupt the interaction and orphan a box element in the container.
  		this._clearDeferredResetState();
  		this._resetState();

  		disableTextSelection();
  		disableImageDrag();

  		this._startPoint = this._map.mouseEventToContainerPoint(e);

  		on(document, {
  			contextmenu: stop,
  			mousemove: this._onMouseMove,
  			mouseup: this._onMouseUp,
  			keydown: this._onKeyDown
  		}, this);
  	},

  	_onMouseMove: function (e) {
  		if (!this._moved) {
  			this._moved = true;

  			this._box = create$1('div', 'leaflet-zoom-box', this._container);
  			addClass(this._container, 'leaflet-crosshair');

  			this._map.fire('boxzoomstart');
  		}

  		this._point = this._map.mouseEventToContainerPoint(e);

  		var bounds = new Bounds(this._point, this._startPoint),
  		    size = bounds.getSize();

  		setPosition(this._box, bounds.min);

  		this._box.style.width  = size.x + 'px';
  		this._box.style.height = size.y + 'px';
  	},

  	_finish: function () {
  		if (this._moved) {
  			remove(this._box);
  			removeClass(this._container, 'leaflet-crosshair');
  		}

  		enableTextSelection();
  		enableImageDrag();

  		off(document, {
  			contextmenu: stop,
  			mousemove: this._onMouseMove,
  			mouseup: this._onMouseUp,
  			keydown: this._onKeyDown
  		}, this);
  	},

  	_onMouseUp: function (e) {
  		if ((e.which !== 1) && (e.button !== 1)) { return; }

  		this._finish();

  		if (!this._moved) { return; }
  		// Postpone to next JS tick so internal click event handling
  		// still see it as "moved".
  		this._clearDeferredResetState();
  		this._resetStateTimeout = setTimeout(bind(this._resetState, this), 0);

  		var bounds = new LatLngBounds(
  		        this._map.containerPointToLatLng(this._startPoint),
  		        this._map.containerPointToLatLng(this._point));

  		this._map
  			.fitBounds(bounds)
  			.fire('boxzoomend', {boxZoomBounds: bounds});
  	},

  	_onKeyDown: function (e) {
  		if (e.keyCode === 27) {
  			this._finish();
  		}
  	}
  });

  // @section Handlers
  // @property boxZoom: Handler
  // Box (shift-drag with mouse) zoom handler.
  Map.addInitHook('addHandler', 'boxZoom', BoxZoom);

  /*
   * L.Handler.DoubleClickZoom is used to handle double-click zoom on the map, enabled by default.
   */

  // @namespace Map
  // @section Interaction Options

  Map.mergeOptions({
  	// @option doubleClickZoom: Boolean|String = true
  	// Whether the map can be zoomed in by double clicking on it and
  	// zoomed out by double clicking while holding shift. If passed
  	// `'center'`, double-click zoom will zoom to the center of the
  	//  view regardless of where the mouse was.
  	doubleClickZoom: true
  });

  var DoubleClickZoom = Handler.extend({
  	addHooks: function () {
  		this._map.on('dblclick', this._onDoubleClick, this);
  	},

  	removeHooks: function () {
  		this._map.off('dblclick', this._onDoubleClick, this);
  	},

  	_onDoubleClick: function (e) {
  		var map = this._map,
  		    oldZoom = map.getZoom(),
  		    delta = map.options.zoomDelta,
  		    zoom = e.originalEvent.shiftKey ? oldZoom - delta : oldZoom + delta;

  		if (map.options.doubleClickZoom === 'center') {
  			map.setZoom(zoom);
  		} else {
  			map.setZoomAround(e.containerPoint, zoom);
  		}
  	}
  });

  // @section Handlers
  //
  // Map properties include interaction handlers that allow you to control
  // interaction behavior in runtime, enabling or disabling certain features such
  // as dragging or touch zoom (see `Handler` methods). For example:
  //
  // ```js
  // map.doubleClickZoom.disable();
  // ```
  //
  // @property doubleClickZoom: Handler
  // Double click zoom handler.
  Map.addInitHook('addHandler', 'doubleClickZoom', DoubleClickZoom);

  /*
   * L.Handler.MapDrag is used to make the map draggable (with panning inertia), enabled by default.
   */

  // @namespace Map
  // @section Interaction Options
  Map.mergeOptions({
  	// @option dragging: Boolean = true
  	// Whether the map be draggable with mouse/touch or not.
  	dragging: true,

  	// @section Panning Inertia Options
  	// @option inertia: Boolean = *
  	// If enabled, panning of the map will have an inertia effect where
  	// the map builds momentum while dragging and continues moving in
  	// the same direction for some time. Feels especially nice on touch
  	// devices. Enabled by default unless running on old Android devices.
  	inertia: !android23,

  	// @option inertiaDeceleration: Number = 3000
  	// The rate with which the inertial movement slows down, in pixels/second².
  	inertiaDeceleration: 3400, // px/s^2

  	// @option inertiaMaxSpeed: Number = Infinity
  	// Max speed of the inertial movement, in pixels/second.
  	inertiaMaxSpeed: Infinity, // px/s

  	// @option easeLinearity: Number = 0.2
  	easeLinearity: 0.2,

  	// TODO refactor, move to CRS
  	// @option worldCopyJump: Boolean = false
  	// With this option enabled, the map tracks when you pan to another "copy"
  	// of the world and seamlessly jumps to the original one so that all overlays
  	// like markers and vector layers are still visible.
  	worldCopyJump: false,

  	// @option maxBoundsViscosity: Number = 0.0
  	// If `maxBounds` is set, this option will control how solid the bounds
  	// are when dragging the map around. The default value of `0.0` allows the
  	// user to drag outside the bounds at normal speed, higher values will
  	// slow down map dragging outside bounds, and `1.0` makes the bounds fully
  	// solid, preventing the user from dragging outside the bounds.
  	maxBoundsViscosity: 0.0
  });

  var Drag = Handler.extend({
  	addHooks: function () {
  		if (!this._draggable) {
  			var map = this._map;

  			this._draggable = new Draggable(map._mapPane, map._container);

  			this._draggable.on({
  				dragstart: this._onDragStart,
  				drag: this._onDrag,
  				dragend: this._onDragEnd
  			}, this);

  			this._draggable.on('predrag', this._onPreDragLimit, this);
  			if (map.options.worldCopyJump) {
  				this._draggable.on('predrag', this._onPreDragWrap, this);
  				map.on('zoomend', this._onZoomEnd, this);

  				map.whenReady(this._onZoomEnd, this);
  			}
  		}
  		addClass(this._map._container, 'leaflet-grab leaflet-touch-drag');
  		this._draggable.enable();
  		this._positions = [];
  		this._times = [];
  	},

  	removeHooks: function () {
  		removeClass(this._map._container, 'leaflet-grab');
  		removeClass(this._map._container, 'leaflet-touch-drag');
  		this._draggable.disable();
  	},

  	moved: function () {
  		return this._draggable && this._draggable._moved;
  	},

  	moving: function () {
  		return this._draggable && this._draggable._moving;
  	},

  	_onDragStart: function () {
  		var map = this._map;

  		map._stop();
  		if (this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
  			var bounds = toLatLngBounds(this._map.options.maxBounds);

  			this._offsetLimit = toBounds(
  				this._map.latLngToContainerPoint(bounds.getNorthWest()).multiplyBy(-1),
  				this._map.latLngToContainerPoint(bounds.getSouthEast()).multiplyBy(-1)
  					.add(this._map.getSize()));

  			this._viscosity = Math.min(1.0, Math.max(0.0, this._map.options.maxBoundsViscosity));
  		} else {
  			this._offsetLimit = null;
  		}

  		map
  		    .fire('movestart')
  		    .fire('dragstart');

  		if (map.options.inertia) {
  			this._positions = [];
  			this._times = [];
  		}
  	},

  	_onDrag: function (e) {
  		if (this._map.options.inertia) {
  			var time = this._lastTime = +new Date(),
  			    pos = this._lastPos = this._draggable._absPos || this._draggable._newPos;

  			this._positions.push(pos);
  			this._times.push(time);

  			this._prunePositions(time);
  		}

  		this._map
  		    .fire('move', e)
  		    .fire('drag', e);
  	},

  	_prunePositions: function (time) {
  		while (this._positions.length > 1 && time - this._times[0] > 50) {
  			this._positions.shift();
  			this._times.shift();
  		}
  	},

  	_onZoomEnd: function () {
  		var pxCenter = this._map.getSize().divideBy(2),
  		    pxWorldCenter = this._map.latLngToLayerPoint([0, 0]);

  		this._initialWorldOffset = pxWorldCenter.subtract(pxCenter).x;
  		this._worldWidth = this._map.getPixelWorldBounds().getSize().x;
  	},

  	_viscousLimit: function (value, threshold) {
  		return value - (value - threshold) * this._viscosity;
  	},

  	_onPreDragLimit: function () {
  		if (!this._viscosity || !this._offsetLimit) { return; }

  		var offset = this._draggable._newPos.subtract(this._draggable._startPos);

  		var limit = this._offsetLimit;
  		if (offset.x < limit.min.x) { offset.x = this._viscousLimit(offset.x, limit.min.x); }
  		if (offset.y < limit.min.y) { offset.y = this._viscousLimit(offset.y, limit.min.y); }
  		if (offset.x > limit.max.x) { offset.x = this._viscousLimit(offset.x, limit.max.x); }
  		if (offset.y > limit.max.y) { offset.y = this._viscousLimit(offset.y, limit.max.y); }

  		this._draggable._newPos = this._draggable._startPos.add(offset);
  	},

  	_onPreDragWrap: function () {
  		// TODO refactor to be able to adjust map pane position after zoom
  		var worldWidth = this._worldWidth,
  		    halfWidth = Math.round(worldWidth / 2),
  		    dx = this._initialWorldOffset,
  		    x = this._draggable._newPos.x,
  		    newX1 = (x - halfWidth + dx) % worldWidth + halfWidth - dx,
  		    newX2 = (x + halfWidth + dx) % worldWidth - halfWidth - dx,
  		    newX = Math.abs(newX1 + dx) < Math.abs(newX2 + dx) ? newX1 : newX2;

  		this._draggable._absPos = this._draggable._newPos.clone();
  		this._draggable._newPos.x = newX;
  	},

  	_onDragEnd: function (e) {
  		var map = this._map,
  		    options = map.options,

  		    noInertia = !options.inertia || this._times.length < 2;

  		map.fire('dragend', e);

  		if (noInertia) {
  			map.fire('moveend');

  		} else {
  			this._prunePositions(+new Date());

  			var direction = this._lastPos.subtract(this._positions[0]),
  			    duration = (this._lastTime - this._times[0]) / 1000,
  			    ease = options.easeLinearity,

  			    speedVector = direction.multiplyBy(ease / duration),
  			    speed = speedVector.distanceTo([0, 0]),

  			    limitedSpeed = Math.min(options.inertiaMaxSpeed, speed),
  			    limitedSpeedVector = speedVector.multiplyBy(limitedSpeed / speed),

  			    decelerationDuration = limitedSpeed / (options.inertiaDeceleration * ease),
  			    offset = limitedSpeedVector.multiplyBy(-decelerationDuration / 2).round();

  			if (!offset.x && !offset.y) {
  				map.fire('moveend');

  			} else {
  				offset = map._limitOffset(offset, map.options.maxBounds);

  				requestAnimFrame(function () {
  					map.panBy(offset, {
  						duration: decelerationDuration,
  						easeLinearity: ease,
  						noMoveStart: true,
  						animate: true
  					});
  				});
  			}
  		}
  	}
  });

  // @section Handlers
  // @property dragging: Handler
  // Map dragging handler (by both mouse and touch).
  Map.addInitHook('addHandler', 'dragging', Drag);

  /*
   * L.Map.Keyboard is handling keyboard interaction with the map, enabled by default.
   */

  // @namespace Map
  // @section Keyboard Navigation Options
  Map.mergeOptions({
  	// @option keyboard: Boolean = true
  	// Makes the map focusable and allows users to navigate the map with keyboard
  	// arrows and `+`/`-` keys.
  	keyboard: true,

  	// @option keyboardPanDelta: Number = 80
  	// Amount of pixels to pan when pressing an arrow key.
  	keyboardPanDelta: 80
  });

  var Keyboard = Handler.extend({

  	keyCodes: {
  		left:    [37],
  		right:   [39],
  		down:    [40],
  		up:      [38],
  		zoomIn:  [187, 107, 61, 171],
  		zoomOut: [189, 109, 54, 173]
  	},

  	initialize: function (map) {
  		this._map = map;

  		this._setPanDelta(map.options.keyboardPanDelta);
  		this._setZoomDelta(map.options.zoomDelta);
  	},

  	addHooks: function () {
  		var container = this._map._container;

  		// make the container focusable by tabbing
  		if (container.tabIndex <= 0) {
  			container.tabIndex = '0';
  		}

  		on(container, {
  			focus: this._onFocus,
  			blur: this._onBlur,
  			mousedown: this._onMouseDown
  		}, this);

  		this._map.on({
  			focus: this._addHooks,
  			blur: this._removeHooks
  		}, this);
  	},

  	removeHooks: function () {
  		this._removeHooks();

  		off(this._map._container, {
  			focus: this._onFocus,
  			blur: this._onBlur,
  			mousedown: this._onMouseDown
  		}, this);

  		this._map.off({
  			focus: this._addHooks,
  			blur: this._removeHooks
  		}, this);
  	},

  	_onMouseDown: function () {
  		if (this._focused) { return; }

  		var body = document.body,
  		    docEl = document.documentElement,
  		    top = body.scrollTop || docEl.scrollTop,
  		    left = body.scrollLeft || docEl.scrollLeft;

  		this._map._container.focus();

  		window.scrollTo(left, top);
  	},

  	_onFocus: function () {
  		this._focused = true;
  		this._map.fire('focus');
  	},

  	_onBlur: function () {
  		this._focused = false;
  		this._map.fire('blur');
  	},

  	_setPanDelta: function (panDelta) {
  		var keys = this._panKeys = {},
  		    codes = this.keyCodes,
  		    i, len;

  		for (i = 0, len = codes.left.length; i < len; i++) {
  			keys[codes.left[i]] = [-1 * panDelta, 0];
  		}
  		for (i = 0, len = codes.right.length; i < len; i++) {
  			keys[codes.right[i]] = [panDelta, 0];
  		}
  		for (i = 0, len = codes.down.length; i < len; i++) {
  			keys[codes.down[i]] = [0, panDelta];
  		}
  		for (i = 0, len = codes.up.length; i < len; i++) {
  			keys[codes.up[i]] = [0, -1 * panDelta];
  		}
  	},

  	_setZoomDelta: function (zoomDelta) {
  		var keys = this._zoomKeys = {},
  		    codes = this.keyCodes,
  		    i, len;

  		for (i = 0, len = codes.zoomIn.length; i < len; i++) {
  			keys[codes.zoomIn[i]] = zoomDelta;
  		}
  		for (i = 0, len = codes.zoomOut.length; i < len; i++) {
  			keys[codes.zoomOut[i]] = -zoomDelta;
  		}
  	},

  	_addHooks: function () {
  		on(document, 'keydown', this._onKeyDown, this);
  	},

  	_removeHooks: function () {
  		off(document, 'keydown', this._onKeyDown, this);
  	},

  	_onKeyDown: function (e) {
  		if (e.altKey || e.ctrlKey || e.metaKey) { return; }

  		var key = e.keyCode,
  		    map = this._map,
  		    offset;

  		if (key in this._panKeys) {
  			if (!map._panAnim || !map._panAnim._inProgress) {
  				offset = this._panKeys[key];
  				if (e.shiftKey) {
  					offset = toPoint(offset).multiplyBy(3);
  				}

  				map.panBy(offset);

  				if (map.options.maxBounds) {
  					map.panInsideBounds(map.options.maxBounds);
  				}
  			}
  		} else if (key in this._zoomKeys) {
  			map.setZoom(map.getZoom() + (e.shiftKey ? 3 : 1) * this._zoomKeys[key]);

  		} else if (key === 27 && map._popup && map._popup.options.closeOnEscapeKey) {
  			map.closePopup();

  		} else {
  			return;
  		}

  		stop(e);
  	}
  });

  // @section Handlers
  // @section Handlers
  // @property keyboard: Handler
  // Keyboard navigation handler.
  Map.addInitHook('addHandler', 'keyboard', Keyboard);

  /*
   * L.Handler.ScrollWheelZoom is used by L.Map to enable mouse scroll wheel zoom on the map.
   */

  // @namespace Map
  // @section Interaction Options
  Map.mergeOptions({
  	// @section Mouse wheel options
  	// @option scrollWheelZoom: Boolean|String = true
  	// Whether the map can be zoomed by using the mouse wheel. If passed `'center'`,
  	// it will zoom to the center of the view regardless of where the mouse was.
  	scrollWheelZoom: true,

  	// @option wheelDebounceTime: Number = 40
  	// Limits the rate at which a wheel can fire (in milliseconds). By default
  	// user can't zoom via wheel more often than once per 40 ms.
  	wheelDebounceTime: 40,

  	// @option wheelPxPerZoomLevel: Number = 60
  	// How many scroll pixels (as reported by [L.DomEvent.getWheelDelta](#domevent-getwheeldelta))
  	// mean a change of one full zoom level. Smaller values will make wheel-zooming
  	// faster (and vice versa).
  	wheelPxPerZoomLevel: 60
  });

  var ScrollWheelZoom = Handler.extend({
  	addHooks: function () {
  		on(this._map._container, 'wheel', this._onWheelScroll, this);

  		this._delta = 0;
  	},

  	removeHooks: function () {
  		off(this._map._container, 'wheel', this._onWheelScroll, this);
  	},

  	_onWheelScroll: function (e) {
  		var delta = getWheelDelta(e);

  		var debounce = this._map.options.wheelDebounceTime;

  		this._delta += delta;
  		this._lastMousePos = this._map.mouseEventToContainerPoint(e);

  		if (!this._startTime) {
  			this._startTime = +new Date();
  		}

  		var left = Math.max(debounce - (+new Date() - this._startTime), 0);

  		clearTimeout(this._timer);
  		this._timer = setTimeout(bind(this._performZoom, this), left);

  		stop(e);
  	},

  	_performZoom: function () {
  		var map = this._map,
  		    zoom = map.getZoom(),
  		    snap = this._map.options.zoomSnap || 0;

  		map._stop(); // stop panning and fly animations if any

  		// map the delta with a sigmoid function to -4..4 range leaning on -1..1
  		var d2 = this._delta / (this._map.options.wheelPxPerZoomLevel * 4),
  		    d3 = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(d2)))) / Math.LN2,
  		    d4 = snap ? Math.ceil(d3 / snap) * snap : d3,
  		    delta = map._limitZoom(zoom + (this._delta > 0 ? d4 : -d4)) - zoom;

  		this._delta = 0;
  		this._startTime = null;

  		if (!delta) { return; }

  		if (map.options.scrollWheelZoom === 'center') {
  			map.setZoom(zoom + delta);
  		} else {
  			map.setZoomAround(this._lastMousePos, zoom + delta);
  		}
  	}
  });

  // @section Handlers
  // @property scrollWheelZoom: Handler
  // Scroll wheel zoom handler.
  Map.addInitHook('addHandler', 'scrollWheelZoom', ScrollWheelZoom);

  /*
   * L.Map.Tap is used to enable mobile hacks like quick taps and long hold.
   */

  // @namespace Map
  // @section Interaction Options
  Map.mergeOptions({
  	// @section Touch interaction options
  	// @option tap: Boolean = true
  	// Enables mobile hacks for supporting instant taps (fixing 200ms click
  	// delay on iOS/Android) and touch holds (fired as `contextmenu` events).
  	tap: true,

  	// @option tapTolerance: Number = 15
  	// The max number of pixels a user can shift his finger during touch
  	// for it to be considered a valid tap.
  	tapTolerance: 15
  });

  var Tap = Handler.extend({
  	addHooks: function () {
  		on(this._map._container, 'touchstart', this._onDown, this);
  	},

  	removeHooks: function () {
  		off(this._map._container, 'touchstart', this._onDown, this);
  	},

  	_onDown: function (e) {
  		if (!e.touches) { return; }

  		preventDefault(e);

  		this._fireClick = true;

  		// don't simulate click or track longpress if more than 1 touch
  		if (e.touches.length > 1) {
  			this._fireClick = false;
  			clearTimeout(this._holdTimeout);
  			return;
  		}

  		var first = e.touches[0],
  		    el = first.target;

  		this._startPos = this._newPos = new Point(first.clientX, first.clientY);

  		// if touching a link, highlight it
  		if (el.tagName && el.tagName.toLowerCase() === 'a') {
  			addClass(el, 'leaflet-active');
  		}

  		// simulate long hold but setting a timeout
  		this._holdTimeout = setTimeout(bind(function () {
  			if (this._isTapValid()) {
  				this._fireClick = false;
  				this._onUp();
  				this._simulateEvent('contextmenu', first);
  			}
  		}, this), 1000);

  		this._simulateEvent('mousedown', first);

  		on(document, {
  			touchmove: this._onMove,
  			touchend: this._onUp
  		}, this);
  	},

  	_onUp: function (e) {
  		clearTimeout(this._holdTimeout);

  		off(document, {
  			touchmove: this._onMove,
  			touchend: this._onUp
  		}, this);

  		if (this._fireClick && e && e.changedTouches) {

  			var first = e.changedTouches[0],
  			    el = first.target;

  			if (el && el.tagName && el.tagName.toLowerCase() === 'a') {
  				removeClass(el, 'leaflet-active');
  			}

  			this._simulateEvent('mouseup', first);

  			// simulate click if the touch didn't move too much
  			if (this._isTapValid()) {
  				this._simulateEvent('click', first);
  			}
  		}
  	},

  	_isTapValid: function () {
  		return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance;
  	},

  	_onMove: function (e) {
  		var first = e.touches[0];
  		this._newPos = new Point(first.clientX, first.clientY);
  		this._simulateEvent('mousemove', first);
  	},

  	_simulateEvent: function (type, e) {
  		var simulatedEvent = document.createEvent('MouseEvents');

  		simulatedEvent._simulated = true;
  		e.target._simulatedClick = true;

  		simulatedEvent.initMouseEvent(
  		        type, true, true, window, 1,
  		        e.screenX, e.screenY,
  		        e.clientX, e.clientY,
  		        false, false, false, false, 0, null);

  		e.target.dispatchEvent(simulatedEvent);
  	}
  });

  // @section Handlers
  // @property tap: Handler
  // Mobile touch hacks (quick tap and touch hold) handler.
  if (touch && (!pointer || safari)) {
  	Map.addInitHook('addHandler', 'tap', Tap);
  }

  /*
   * L.Handler.TouchZoom is used by L.Map to add pinch zoom on supported mobile browsers.
   */

  // @namespace Map
  // @section Interaction Options
  Map.mergeOptions({
  	// @section Touch interaction options
  	// @option touchZoom: Boolean|String = *
  	// Whether the map can be zoomed by touch-dragging with two fingers. If
  	// passed `'center'`, it will zoom to the center of the view regardless of
  	// where the touch events (fingers) were. Enabled for touch-capable web
  	// browsers except for old Androids.
  	touchZoom: touch && !android23,

  	// @option bounceAtZoomLimits: Boolean = true
  	// Set it to false if you don't want the map to zoom beyond min/max zoom
  	// and then bounce back when pinch-zooming.
  	bounceAtZoomLimits: true
  });

  var TouchZoom = Handler.extend({
  	addHooks: function () {
  		addClass(this._map._container, 'leaflet-touch-zoom');
  		on(this._map._container, 'touchstart', this._onTouchStart, this);
  	},

  	removeHooks: function () {
  		removeClass(this._map._container, 'leaflet-touch-zoom');
  		off(this._map._container, 'touchstart', this._onTouchStart, this);
  	},

  	_onTouchStart: function (e) {
  		var map = this._map;
  		if (!e.touches || e.touches.length !== 2 || map._animatingZoom || this._zooming) { return; }

  		var p1 = map.mouseEventToContainerPoint(e.touches[0]),
  		    p2 = map.mouseEventToContainerPoint(e.touches[1]);

  		this._centerPoint = map.getSize()._divideBy(2);
  		this._startLatLng = map.containerPointToLatLng(this._centerPoint);
  		if (map.options.touchZoom !== 'center') {
  			this._pinchStartLatLng = map.containerPointToLatLng(p1.add(p2)._divideBy(2));
  		}

  		this._startDist = p1.distanceTo(p2);
  		this._startZoom = map.getZoom();

  		this._moved = false;
  		this._zooming = true;

  		map._stop();

  		on(document, 'touchmove', this._onTouchMove, this);
  		on(document, 'touchend', this._onTouchEnd, this);

  		preventDefault(e);
  	},

  	_onTouchMove: function (e) {
  		if (!e.touches || e.touches.length !== 2 || !this._zooming) { return; }

  		var map = this._map,
  		    p1 = map.mouseEventToContainerPoint(e.touches[0]),
  		    p2 = map.mouseEventToContainerPoint(e.touches[1]),
  		    scale = p1.distanceTo(p2) / this._startDist;

  		this._zoom = map.getScaleZoom(scale, this._startZoom);

  		if (!map.options.bounceAtZoomLimits && (
  			(this._zoom < map.getMinZoom() && scale < 1) ||
  			(this._zoom > map.getMaxZoom() && scale > 1))) {
  			this._zoom = map._limitZoom(this._zoom);
  		}

  		if (map.options.touchZoom === 'center') {
  			this._center = this._startLatLng;
  			if (scale === 1) { return; }
  		} else {
  			// Get delta from pinch to center, so centerLatLng is delta applied to initial pinchLatLng
  			var delta = p1._add(p2)._divideBy(2)._subtract(this._centerPoint);
  			if (scale === 1 && delta.x === 0 && delta.y === 0) { return; }
  			this._center = map.unproject(map.project(this._pinchStartLatLng, this._zoom).subtract(delta), this._zoom);
  		}

  		if (!this._moved) {
  			map._moveStart(true, false);
  			this._moved = true;
  		}

  		cancelAnimFrame(this._animRequest);

  		var moveFn = bind(map._move, map, this._center, this._zoom, {pinch: true, round: false});
  		this._animRequest = requestAnimFrame(moveFn, this, true);

  		preventDefault(e);
  	},

  	_onTouchEnd: function () {
  		if (!this._moved || !this._zooming) {
  			this._zooming = false;
  			return;
  		}

  		this._zooming = false;
  		cancelAnimFrame(this._animRequest);

  		off(document, 'touchmove', this._onTouchMove, this);
  		off(document, 'touchend', this._onTouchEnd, this);

  		// Pinch updates GridLayers' levels only when zoomSnap is off, so zoomSnap becomes noUpdate.
  		if (this._map.options.zoomAnimation) {
  			this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), true, this._map.options.zoomSnap);
  		} else {
  			this._map._resetView(this._center, this._map._limitZoom(this._zoom));
  		}
  	}
  });

  // @section Handlers
  // @property touchZoom: Handler
  // Touch zoom handler.
  Map.addInitHook('addHandler', 'touchZoom', TouchZoom);

  Map.BoxZoom = BoxZoom;
  Map.DoubleClickZoom = DoubleClickZoom;
  Map.Drag = Drag;
  Map.Keyboard = Keyboard;
  Map.ScrollWheelZoom = ScrollWheelZoom;
  Map.Tap = Tap;
  Map.TouchZoom = TouchZoom;

  exports.version = version;
  exports.Control = Control;
  exports.control = control;
  exports.Browser = Browser;
  exports.Evented = Evented;
  exports.Mixin = Mixin;
  exports.Util = Util;
  exports.Class = Class;
  exports.Handler = Handler;
  exports.extend = extend;
  exports.bind = bind;
  exports.stamp = stamp;
  exports.setOptions = setOptions;
  exports.DomEvent = DomEvent;
  exports.DomUtil = DomUtil;
  exports.PosAnimation = PosAnimation;
  exports.Draggable = Draggable;
  exports.LineUtil = LineUtil;
  exports.PolyUtil = PolyUtil;
  exports.Point = Point;
  exports.point = toPoint;
  exports.Bounds = Bounds;
  exports.bounds = toBounds;
  exports.Transformation = Transformation;
  exports.transformation = toTransformation;
  exports.Projection = index;
  exports.LatLng = LatLng;
  exports.latLng = toLatLng;
  exports.LatLngBounds = LatLngBounds;
  exports.latLngBounds = toLatLngBounds;
  exports.CRS = CRS;
  exports.GeoJSON = GeoJSON;
  exports.geoJSON = geoJSON;
  exports.geoJson = geoJson;
  exports.Layer = Layer;
  exports.LayerGroup = LayerGroup;
  exports.layerGroup = layerGroup;
  exports.FeatureGroup = FeatureGroup;
  exports.featureGroup = featureGroup;
  exports.ImageOverlay = ImageOverlay;
  exports.imageOverlay = imageOverlay;
  exports.VideoOverlay = VideoOverlay;
  exports.videoOverlay = videoOverlay;
  exports.SVGOverlay = SVGOverlay;
  exports.svgOverlay = svgOverlay;
  exports.DivOverlay = DivOverlay;
  exports.Popup = Popup;
  exports.popup = popup;
  exports.Tooltip = Tooltip;
  exports.tooltip = tooltip;
  exports.Icon = Icon;
  exports.icon = icon;
  exports.DivIcon = DivIcon;
  exports.divIcon = divIcon;
  exports.Marker = Marker;
  exports.marker = marker;
  exports.TileLayer = TileLayer;
  exports.tileLayer = tileLayer;
  exports.GridLayer = GridLayer;
  exports.gridLayer = gridLayer;
  exports.SVG = SVG;
  exports.svg = svg$1;
  exports.Renderer = Renderer;
  exports.Canvas = Canvas;
  exports.canvas = canvas$1;
  exports.Path = Path;
  exports.CircleMarker = CircleMarker;
  exports.circleMarker = circleMarker;
  exports.Circle = Circle;
  exports.circle = circle;
  exports.Polyline = Polyline;
  exports.polyline = polyline;
  exports.Polygon = Polygon;
  exports.polygon = polygon;
  exports.Rectangle = Rectangle;
  exports.rectangle = rectangle;
  exports.Map = Map;
  exports.map = createMap;

  var oldL = window.L;
  exports.noConflict = function() {
  	window.L = oldL;
  	return this;
  }

  // Always export us to window global (see #2364)
  window.L = exports;

})));


},{}],"variables-configuracion.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MAPA = exports.GEOJSON = void 0;
const leaflet_1 = require("leaflet");
exports.GEOJSON = {
  ANTAEROPUERTO: {
    type: "FeatureCollection",
    features: [{
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: [[-70.199528, 11.717374], [-70.196579, 11.717557], [-70.192726, 11.717776], [-70.189611, 11.717963], [-70.184961, 11.718252], [-70.184541, 11.718278], [-70.18445, 11.718286], [-70.184383, 11.718276], [-70.184327, 11.71831], [-70.1843, 11.718394], [-70.184321, 11.718499], [-70.184658, 11.71944], [-70.184935, 11.720257], [-70.185664, 11.721855], [-70.185833, 11.722203], [-70.186004, 11.722649], [-70.186741, 11.724483], [-70.188286, 11.72432], [-70.190356, 11.723795], [-70.193118, 11.723086], [-70.193241, 11.722818], [-70.194336, 11.722734], [-70.196745, 11.722155], [-70.196696, 11.721908], [-70.197656, 11.721651], [-70.197693, 11.721127], [-70.197817, 11.720502], [-70.197902, 11.719536], [-70.199477, 11.719365], [-70.199531, 11.717375]]
      },
      bbox: [-70.199531, 11.717374, -70.1843, 11.724483]
    }]
  },
  PUNTOFIJO: {},
  CAJADEAGUA: {}
};
exports.MAPA = {
  MAPAPUNTOFIJO: new leaflet_1.Map("mapa", Object.assign({
    center: [11.6988, -70.1977],
    crs: leaflet_1.CRS.EPSG3857
  }, {
    zoom: 14,
    zoomControl: true,
    preferCanvas: false
  })),
  CAPA: (0, leaflet_1.tileLayer)("http://localhost:2000/tiles_local/{z}/{x}/{y}.png", {
    minZoom: 13,
    maxZoom: 16,
    maxNativeZoom: 16,
    noWrap: false,
    attribution: "OpenStreetMap",
    subdomains: "abc",
    detectRetina: false,
    tms: false,
    opacity: 1
  })
};
},{"leaflet":"node_modules/leaflet/dist/leaflet-src.js"}],"estilo-mapa.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EstilosMapa = void 0;
const variables_configuracion_1 = require("./variables-configuracion");
const leaflet_1 = require("leaflet");
class EstilosMapa {
  constructor() {
    this.mascara = null;
    this.mapaInicial = variables_configuracion_1.MAPA.MAPAPUNTOFIJO;
  }
  limpiarColorFueraLimite() {
    if (this.mascara == null) {
      return 0;
    }
    this.mascara.remove();
  }
  colorearFueraLimite(geoJsonMapa) {
    let coordenadasCajaGigante = [[-90, -180], [-90, 180], [90, 180], [90, -180], [-90, -180]];
    let coordenadasGeoJson = geoJsonMapa.features[0].geometry;
    let espacioDentroGeojson = coordenadasGeoJson.coordinates.map(coord => [coord[1], coord[0]]);
    this.mascara = (0, leaflet_1.polygon)([coordenadasCajaGigante, espacioDentroGeojson], {
      color: "#1a1a4e",
      fillColor: "#1a1a4e",
      fillOpacity: 0.5,
      stroke: false
    }).addTo(this.mapaInicial);
  }
}
exports.EstilosMapa = EstilosMapa;
},{"./variables-configuracion":"variables-configuracion.ts","leaflet":"node_modules/leaflet/dist/leaflet-src.js"}],"node_modules/@turf/turf/turf.min.js":[function(require,module,exports) {
var define;
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).turf={})}(this,(function(t){"use strict";function e(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=Array(e);n<e;n++)r[n]=t[n];return r}function n(t){if(Array.isArray(t))return t}function r(t,e,n){return e=l(e),function(t,e){if(e&&("object"==typeof e||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(t,c()?Reflect.construct(e,n||[],l(t).constructor):e.apply(t,n))}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,y(r.key),r)}}function s(t,e,n){return e&&o(t.prototype,e),n&&o(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}function a(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=_(t))||e){n&&(t=n);var r=0,i=function(){};return{s:i,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,s=!0,a=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return s=t.done,t},e:function(t){a=!0,o=t},f:function(){try{s||null==n.return||n.return()}finally{if(a)throw o}}}}function u(t,e,n){return(e=y(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function l(t){return l=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},l(t)}function h(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&g(t,e)}function c(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(t){}return(c=function(){return!!t})()}function f(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}function v(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function g(t,e){return g=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},g(t,e)}function d(t,e){return n(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,i,o,s,a=[],u=!0,l=!1;try{if(o=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=o.call(n)).done)&&(a.push(r.value),a.length!==e);u=!0);}catch(t){l=!0,i=t}finally{try{if(!u&&null!=n.return&&(s=n.return(),Object(s)!==s))return}finally{if(l)throw i}}return a}}(t,e)||_(t,e)||v()}function p(t){return function(t){if(Array.isArray(t))return e(t)}(t)||f(t)||_(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function y(t){var e=function(t,e){if("object"!=typeof t||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,e);if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"==typeof e?e:e+""}function m(t){return m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},m(t)}function _(t,n){if(t){if("string"==typeof t)return e(t,n);var r={}.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?e(t,n):void 0}}var x=6371008.8,E={centimeters:100*x,centimetres:100*x,degrees:360/(2*Math.PI),feet:3.28084*x,inches:39.37*x,kilometers:x/1e3,kilometres:x/1e3,meters:x,metres:x,miles:x/1609.344,millimeters:1e3*x,millimetres:1e3*x,nauticalmiles:x/1852,radians:1,yards:1.0936*x},k={acres:247105e-9,centimeters:1e4,centimetres:1e4,feet:10.763910417,hectares:1e-4,inches:1550.003100006,kilometers:1e-6,kilometres:1e-6,meters:1,metres:1,miles:386e-9,nauticalmiles:2.9155334959812285e-7,millimeters:1e6,millimetres:1e6,yards:1.195990046};function w(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r={type:"Feature"};return(0===n.id||n.id)&&(r.id=n.id),n.bbox&&(r.bbox=n.bbox),r.properties=e||{},r.geometry=t,r}function b(t,e){switch(t){case"Point":return I(e).geometry;case"LineString":return L(e).geometry;case"Polygon":return S(e).geometry;case"MultiPoint":return O(e).geometry;case"MultiLineString":return T(e).geometry;case"MultiPolygon":return R(e).geometry;default:throw new Error(t+" is invalid")}}function I(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!t)throw new Error("coordinates is required");if(!Array.isArray(t))throw new Error("coordinates must be an Array");if(t.length<2)throw new Error("coordinates must be at least 2 numbers long");if(!V(t[0])||!V(t[1]))throw new Error("coordinates must contain numbers");return w({type:"Point",coordinates:t},e,n)}function N(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return C(t.map((function(t){return I(t,e)})),n)}function S(t,e){var n,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=a(t);try{for(i.s();!(n=i.n()).done;){var o=n.value;if(o.length<4)throw new Error("Each LinearRing of a Polygon must have 4 or more Positions.");if(o[o.length-1].length!==o[0].length)throw new Error("First and last Position are not equivalent.");for(var s=0;s<o[o.length-1].length;s++)if(o[o.length-1][s]!==o[0][s])throw new Error("First and last Position are not equivalent.")}}catch(t){i.e(t)}finally{i.f()}return w({type:"Polygon",coordinates:t},e,r)}function M(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return C(t.map((function(t){return S(t,e)})),n)}function L(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(t.length<2)throw new Error("coordinates must be an array of two or more positions");return w({type:"LineString",coordinates:t},e,n)}function P(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return C(t.map((function(t){return L(t,e)})),n)}function C(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n={type:"FeatureCollection"};return e.id&&(n.id=e.id),e.bbox&&(n.bbox=e.bbox),n.features=t,n}function T(t,e){return w({type:"MultiLineString",coordinates:t},e,arguments.length>2&&void 0!==arguments[2]?arguments[2]:{})}function O(t,e){return w({type:"MultiPoint",coordinates:t},e,arguments.length>2&&void 0!==arguments[2]?arguments[2]:{})}function R(t,e){return w({type:"MultiPolygon",coordinates:t},e,arguments.length>2&&void 0!==arguments[2]?arguments[2]:{})}function A(t,e){return w({type:"GeometryCollection",geometries:t},e,arguments.length>2&&void 0!==arguments[2]?arguments[2]:{})}function D(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;if(e&&!(e>=0))throw new Error("precision must be a positive number");var n=Math.pow(10,e||0);return Math.round(t*n)/n}function F(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"kilometers",n=E[e];if(!n)throw new Error(e+" units is invalid");return t*n}function q(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"kilometers",n=E[e];if(!n)throw new Error(e+" units is invalid");return t/n}function G(t,e){return z(q(t,e))}function Y(t){var e=t%360;return e<0&&(e+=360),e}function B(t){return(t%=360)>180?t-360:t<-180?t+360:t}function z(t){return 180*(t%(2*Math.PI))/Math.PI}function j(t){return t%360*Math.PI/180}function X(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"kilometers",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"kilometers";if(!(t>=0))throw new Error("length must be a positive number");return F(q(t,e),n)}function U(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"meters",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"kilometers";if(!(t>=0))throw new Error("area must be a positive number");var r=k[e];if(!r)throw new Error("invalid original units");var i=k[n];if(!i)throw new Error("invalid final units");return t/r*i}function V(t){return!isNaN(t)&&null!==t&&!Array.isArray(t)}function Z(t){return null!==t&&"object"===m(t)&&!Array.isArray(t)}function H(t){if(!t)throw new Error("bbox is required");if(!Array.isArray(t))throw new Error("bbox must be an Array");if(4!==t.length&&6!==t.length)throw new Error("bbox must be an Array of 4 or 6 numbers");t.forEach((function(t){if(!V(t))throw new Error("bbox must only contain numbers")}))}function W(t){if(!t)throw new Error("id is required");if(-1===["string","number"].indexOf(m(t)))throw new Error("id must be a number or a string")}var J=Object.freeze({__proto__:null,areaFactors:k,azimuthToBearing:B,bearingToAzimuth:Y,convertArea:U,convertLength:X,degreesToRadians:j,earthRadius:x,factors:E,feature:w,featureCollection:C,geometry:b,geometryCollection:A,isNumber:V,isObject:Z,lengthToDegrees:G,lengthToRadians:q,lineString:L,lineStrings:P,multiLineString:T,multiPoint:O,multiPolygon:R,point:I,points:N,polygon:S,polygons:M,radiansToDegrees:z,radiansToLength:F,round:D,validateBBox:H,validateId:W});function K(t){if(!t)throw new Error("coord is required");if(!Array.isArray(t)){if("Feature"===t.type&&null!==t.geometry&&"Point"===t.geometry.type)return p(t.geometry.coordinates);if("Point"===t.type)return p(t.coordinates)}if(Array.isArray(t)&&t.length>=2&&!Array.isArray(t[0])&&!Array.isArray(t[1]))return p(t);throw new Error("coord must be GeoJSON Point or an Array of numbers")}function Q(t){if(Array.isArray(t))return t;if("Feature"===t.type){if(null!==t.geometry)return t.geometry.coordinates}else if(t.coordinates)return t.coordinates;throw new Error("coords must be GeoJSON Feature, Geometry Object or an Array")}function $(t){if(t.length>1&&V(t[0])&&V(t[1]))return!0;if(Array.isArray(t[0])&&t[0].length)return $(t[0]);throw new Error("coordinates must only contain numbers")}function tt(t,e,n){if(!e||!n)throw new Error("type and name required");if(!t||t.type!==e)throw new Error("Invalid input to "+n+": must be a "+e+", given "+t.type)}function et(t,e,n){if(!t)throw new Error("No feature passed");if(!n)throw new Error(".featureOf() requires a name");if(!t||"Feature"!==t.type||!t.geometry)throw new Error("Invalid input to "+n+", Feature with geometry required");if(!t.geometry||t.geometry.type!==e)throw new Error("Invalid input to "+n+": must be a "+e+", given "+t.geometry.type)}function nt(t,e,n){if(!t)throw new Error("No featureCollection passed");if(!n)throw new Error(".collectionOf() requires a name");if(!t||"FeatureCollection"!==t.type)throw new Error("Invalid input to "+n+", FeatureCollection required");var r,i=a(t.features);try{for(i.s();!(r=i.n()).done;){var o=r.value;if(!o||"Feature"!==o.type||!o.geometry)throw new Error("Invalid input to "+n+", Feature with geometry required");if(!o.geometry||o.geometry.type!==e)throw new Error("Invalid input to "+n+": must be a "+e+", given "+o.geometry.type)}}catch(t){i.e(t)}finally{i.f()}}function rt(t){return"Feature"===t.type?t.geometry:t}function it(t,e){return"FeatureCollection"===t.type?"FeatureCollection":"GeometryCollection"===t.type?"GeometryCollection":"Feature"===t.type&&null!==t.geometry?t.geometry.type:t.type}var ot=Object.freeze({__proto__:null,collectionOf:nt,containsNumber:$,featureOf:et,geojsonType:tt,getCoord:K,getCoords:Q,getGeom:rt,getType:it});function st(t,e){if(!0===(arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}).final)return function(t,e){var n=st(e,t);return n=(n+180)%360}(t,e);var n=K(t),r=K(e),i=j(n[0]),o=j(r[0]),s=j(n[1]),a=j(r[1]),u=Math.sin(o-i)*Math.cos(a),l=Math.cos(s)*Math.sin(a)-Math.sin(s)*Math.cos(a)*Math.cos(o-i);return z(Math.atan2(u,l))}function at(t,e,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},i=K(t),o=j(i[0]),s=j(i[1]),a=j(n),u=q(e,r.units),l=Math.asin(Math.sin(s)*Math.cos(u)+Math.cos(s)*Math.sin(u)*Math.cos(a)),h=z(o+Math.atan2(Math.sin(a)*Math.sin(u)*Math.cos(s),Math.cos(u)-Math.sin(s)*Math.sin(l))),c=z(l);return void 0!==i[2]?I([h,c,i[2]],r.properties):I([h,c],r.properties)}function ut(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=K(t),i=K(e),o=j(i[1]-r[1]),s=j(i[0]-r[0]),a=j(r[1]),u=j(i[1]),l=Math.pow(Math.sin(o/2),2)+Math.pow(Math.sin(s/2),2)*Math.cos(a)*Math.cos(u);return F(2*Math.atan2(Math.sqrt(l),Math.sqrt(1-l)),n.units)}function lt(t,e){var n;return(n=(arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}).final?ht(K(e),K(t)):ht(K(t),K(e)))>180?-(360-n):n}function ht(t,e){var n=j(t[1]),r=j(e[1]),i=j(e[0]-t[0]);i>Math.PI&&(i-=2*Math.PI),i<-Math.PI&&(i+=2*Math.PI);var o=Math.log(Math.tan(r/2+Math.PI/4)/Math.tan(n/2+Math.PI/4));return(z(Math.atan2(i,o))+360)%360}function ct(t,e,n){if(null!==t)for(var r,i,o,s,a,u,l,h,c=0,f=0,v=t.type,g="FeatureCollection"===v,d="Feature"===v,p=g?t.features.length:1,y=0;y<p;y++){a=(h=!!(l=g?t.features[y].geometry:d?t.geometry:t)&&"GeometryCollection"===l.type)?l.geometries.length:1;for(var m=0;m<a;m++){var _=0,x=0;if(null!==(s=h?l.geometries[m]:l)){u=s.coordinates;var E=s.type;switch(c=!n||"Polygon"!==E&&"MultiPolygon"!==E?0:1,E){case null:break;case"Point":if(!1===e(u,f,y,_,x))return!1;f++,_++;break;case"LineString":case"MultiPoint":for(r=0;r<u.length;r++){if(!1===e(u[r],f,y,_,x))return!1;f++,"MultiPoint"===E&&_++}"LineString"===E&&_++;break;case"Polygon":case"MultiLineString":for(r=0;r<u.length;r++){for(i=0;i<u[r].length-c;i++){if(!1===e(u[r][i],f,y,_,x))return!1;f++}"MultiLineString"===E&&_++,"Polygon"===E&&x++}"Polygon"===E&&_++;break;case"MultiPolygon":for(r=0;r<u.length;r++){for(x=0,i=0;i<u[r].length;i++){for(o=0;o<u[r][i].length-c;o++){if(!1===e(u[r][i][o],f,y,_,x))return!1;f++}x++}_++}break;case"GeometryCollection":for(r=0;r<s.geometries.length;r++)if(!1===ct(s.geometries[r],e,n))return!1;break;default:throw new Error("Unknown Geometry Type")}}}}}function ft(t,e,n,r){var i=n;return ct(t,(function(t,r,o,s,a){i=0===r&&void 0===n?t:e(i,t,r,o,s,a)}),r),i}function vt(t,e){var n;switch(t.type){case"FeatureCollection":for(n=0;n<t.features.length&&!1!==e(t.features[n].properties,n);n++);break;case"Feature":e(t.properties,0)}}function gt(t,e,n){var r=n;return vt(t,(function(t,i){r=0===i&&void 0===n?t:e(r,t,i)})),r}function dt(t,e){if("Feature"===t.type)e(t,0);else if("FeatureCollection"===t.type)for(var n=0;n<t.features.length&&!1!==e(t.features[n],n);n++);}function pt(t,e,n){var r=n;return dt(t,(function(t,i){r=0===i&&void 0===n?t:e(r,t,i)})),r}function yt(t){var e=[];return ct(t,(function(t){e.push(t)})),e}function mt(t,e){var n,r,i,o,s,a,u,l,h,c,f=0,v="FeatureCollection"===t.type,g="Feature"===t.type,d=v?t.features.length:1;for(n=0;n<d;n++){for(a=v?t.features[n].geometry:g?t.geometry:t,l=v?t.features[n].properties:g?t.properties:{},h=v?t.features[n].bbox:g?t.bbox:void 0,c=v?t.features[n].id:g?t.id:void 0,s=(u=!!a&&"GeometryCollection"===a.type)?a.geometries.length:1,i=0;i<s;i++)if(null!==(o=u?a.geometries[i]:a))switch(o.type){case"Point":case"LineString":case"MultiPoint":case"Polygon":case"MultiLineString":case"MultiPolygon":if(!1===e(o,f,l,h,c))return!1;break;case"GeometryCollection":for(r=0;r<o.geometries.length;r++)if(!1===e(o.geometries[r],f,l,h,c))return!1;break;default:throw new Error("Unknown Geometry Type")}else if(!1===e(null,f,l,h,c))return!1;f++}}function _t(t,e,n){var r=n;return mt(t,(function(t,i,o,s,a){r=0===i&&void 0===n?t:e(r,t,i,o,s,a)})),r}function xt(t,e){mt(t,(function(t,n,r,i,o){var s,a=null===t?null:t.type;switch(a){case null:case"Point":case"LineString":case"Polygon":return!1!==e(w(t,r,{bbox:i,id:o}),n,0)&&void 0}switch(a){case"MultiPoint":s="Point";break;case"MultiLineString":s="LineString";break;case"MultiPolygon":s="Polygon"}for(var u=0;u<t.coordinates.length;u++){var l=t.coordinates[u];if(!1===e(w({type:s,coordinates:l},r),n,u))return!1}}))}function Et(t,e,n){var r=n;return xt(t,(function(t,i,o){r=0===i&&0===o&&void 0===n?t:e(r,t,i,o)})),r}function kt(t,e){xt(t,(function(t,n,r){var i=0;if(t.geometry){var o=t.geometry.type;if("Point"!==o&&"MultiPoint"!==o){var s,a=0,u=0,l=0;return!1!==ct(t,(function(o,h,c,f,v){if(void 0===s||n>a||f>u||v>l)return s=o,a=n,u=f,l=v,void(i=0);var g=L([s,o],t.properties);if(!1===e(g,n,r,v,i))return!1;i++,s=o}))&&void 0}}}))}function wt(t,e,n){var r=n,i=!1;return kt(t,(function(t,o,s,a,u){r=!1===i&&void 0===n?t:e(r,t,o,s,a,u),i=!0})),r}function bt(t,e){if(!t)throw new Error("geojson is required");xt(t,(function(t,n,r){if(null!==t.geometry){var i=t.geometry.type,o=t.geometry.coordinates;switch(i){case"LineString":if(!1===e(t,n,r,0,0))return!1;break;case"Polygon":for(var s=0;s<o.length;s++)if(!1===e(L(o[s],t.properties),n,r,s))return!1}}}))}function It(t,e,n){var r=n;return bt(t,(function(t,i,o,s){r=0===i&&void 0===n?t:e(r,t,i,o,s)})),r}function Nt(t,e){if(!Z(e=e||{}))throw new Error("options is invalid");var n,r=e.featureIndex||0,i=e.multiFeatureIndex||0,o=e.geometryIndex||0,s=e.segmentIndex||0,a=e.properties;switch(t.type){case"FeatureCollection":r<0&&(r=t.features.length+r),a=a||t.features[r].properties,n=t.features[r].geometry;break;case"Feature":a=a||t.properties,n=t.geometry;break;case"Point":case"MultiPoint":return null;case"LineString":case"Polygon":case"MultiLineString":case"MultiPolygon":n=t;break;default:throw new Error("geojson is invalid")}if(null===n)return null;var u=n.coordinates;switch(n.type){case"Point":case"MultiPoint":return null;case"LineString":return s<0&&(s=u.length+s-1),L([u[s],u[s+1]],a,e);case"Polygon":return o<0&&(o=u.length+o),s<0&&(s=u[o].length+s-1),L([u[o][s],u[o][s+1]],a,e);case"MultiLineString":return i<0&&(i=u.length+i),s<0&&(s=u[i].length+s-1),L([u[i][s],u[i][s+1]],a,e);case"MultiPolygon":return i<0&&(i=u.length+i),o<0&&(o=u[i].length+o),s<0&&(s=u[i][o].length-s-1),L([u[i][o][s],u[i][o][s+1]],a,e)}throw new Error("geojson is invalid")}function St(t,e){if(!Z(e=e||{}))throw new Error("options is invalid");var n,r=e.featureIndex||0,i=e.multiFeatureIndex||0,o=e.geometryIndex||0,s=e.coordIndex||0,a=e.properties;switch(t.type){case"FeatureCollection":r<0&&(r=t.features.length+r),a=a||t.features[r].properties,n=t.features[r].geometry;break;case"Feature":a=a||t.properties,n=t.geometry;break;case"Point":case"MultiPoint":return null;case"LineString":case"Polygon":case"MultiLineString":case"MultiPolygon":n=t;break;default:throw new Error("geojson is invalid")}if(null===n)return null;var u=n.coordinates;switch(n.type){case"Point":return I(u,a,e);case"MultiPoint":return i<0&&(i=u.length+i),I(u[i],a,e);case"LineString":return s<0&&(s=u.length+s),I(u[s],a,e);case"Polygon":return o<0&&(o=u.length+o),s<0&&(s=u[o].length+s),I(u[o][s],a,e);case"MultiLineString":return i<0&&(i=u.length+i),s<0&&(s=u[i].length+s),I(u[i][s],a,e);case"MultiPolygon":return i<0&&(i=u.length+i),o<0&&(o=u[i].length+o),s<0&&(s=u[i][o].length-s),I(u[i][o][s],a,e)}throw new Error("geojson is invalid")}var Mt=Object.freeze({__proto__:null,coordAll:yt,coordEach:ct,coordReduce:ft,featureEach:dt,featureReduce:pt,findPoint:St,findSegment:Nt,flattenEach:xt,flattenReduce:Et,geomEach:mt,geomReduce:_t,lineEach:bt,lineReduce:It,propEach:vt,propReduce:gt,segmentEach:kt,segmentReduce:wt});function Lt(t){return _t(t,(function(t,e){return t+function(t){var e,n=0;switch(t.type){case"Polygon":return Pt(t.coordinates);case"MultiPolygon":for(e=0;e<t.coordinates.length;e++)n+=Pt(t.coordinates[e]);return n;case"Point":case"MultiPoint":case"LineString":case"MultiLineString":return 0}return 0}(e)}),0)}function Pt(t){var e=0;if(t&&t.length>0){e+=Math.abs(Ot(t[0]));for(var n=1;n<t.length;n++)e-=Math.abs(Ot(t[n]))}return e}var Ct=x*x/2,Tt=Math.PI/180;function Ot(t){var e=t.length-1;if(e<=2)return 0;for(var n=0,r=0;r<e;){var i=t[r],o=t[r+1===e?0:r+1],s=t[r+2>=e?(r+2)%e:r+2],a=i[0]*Tt,u=o[1]*Tt;n+=(s[0]*Tt-a)*Math.sin(u),r++}return n*Ct}function Rt(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(null!=t.bbox&&!0!==e.recompute)return t.bbox;var n=[1/0,1/0,-1/0,-1/0];return ct(t,(function(t){n[0]>t[0]&&(n[0]=t[0]),n[1]>t[1]&&(n[1]=t[1]),n[2]<t[0]&&(n[2]=t[0]),n[3]<t[1]&&(n[3]=t[1])})),n}function At(t,e){var n,r,i,o,s,a,u;for(r=1;r<=8;r*=2){for(n=[],o=!(Ft(i=t[t.length-1],e)&r),s=0;s<t.length;s++)(u=!(Ft(a=t[s],e)&r))!==o&&n.push(Dt(i,a,r,e)),u&&n.push(a),i=a,o=u;if(!(t=n).length)break}return n}function Dt(t,e,n,r){return 8&n?[t[0]+(e[0]-t[0])*(r[3]-t[1])/(e[1]-t[1]),r[3]]:4&n?[t[0]+(e[0]-t[0])*(r[1]-t[1])/(e[1]-t[1]),r[1]]:2&n?[r[2],t[1]+(e[1]-t[1])*(r[2]-t[0])/(e[0]-t[0])]:1&n?[r[0],t[1]+(e[1]-t[1])*(r[0]-t[0])/(e[0]-t[0])]:null}function Ft(t,e){var n=0;return t[0]<e[0]?n|=1:t[0]>e[2]&&(n|=2),t[1]<e[1]?n|=4:t[1]>e[3]&&(n|=8),n}function qt(t,e){var n,r=[],i=a(t);try{for(i.s();!(n=i.n()).done;){var o=At(n.value,e);o.length>0&&(o[0][0]===o[o.length-1][0]&&o[0][1]===o[o.length-1][1]||o.push(o[0]),o.length>=4&&r.push(o))}}catch(t){i.e(t)}finally{i.f()}return r}function Gt(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=Number(t[0]),r=Number(t[1]),i=Number(t[2]),o=Number(t[3]);if(6===t.length)throw new Error("@turf/bbox-polygon does not support BBox with 6 positions");var s=[n,r];return S([[s,[i,r],[i,o],[n,o],s]],e.properties,{bbox:t,id:e.id})}var Yt=function(){return s((function t(e){i(this,t),this.points=e.points||[],this.duration=e.duration||1e4,this.sharpness=e.sharpness||.85,this.centers=[],this.controls=[],this.stepLength=e.stepLength||60,this.length=this.points.length,this.delay=0;for(var n=0;n<this.length;n++)this.points[n].z=this.points[n].z||0;for(var r=0;r<this.length-1;r++){var o=this.points[r],s=this.points[r+1];this.centers.push({x:(o.x+s.x)/2,y:(o.y+s.y)/2,z:(o.z+s.z)/2})}this.controls.push([this.points[0],this.points[0]]);for(var a=0;a<this.centers.length-1;a++){var u=this.points[a+1].x-(this.centers[a].x+this.centers[a+1].x)/2,l=this.points[a+1].y-(this.centers[a].y+this.centers[a+1].y)/2,h=this.points[a+1].z-(this.centers[a].y+this.centers[a+1].z)/2;this.controls.push([{x:(1-this.sharpness)*this.points[a+1].x+this.sharpness*(this.centers[a].x+u),y:(1-this.sharpness)*this.points[a+1].y+this.sharpness*(this.centers[a].y+l),z:(1-this.sharpness)*this.points[a+1].z+this.sharpness*(this.centers[a].z+h)},{x:(1-this.sharpness)*this.points[a+1].x+this.sharpness*(this.centers[a+1].x+u),y:(1-this.sharpness)*this.points[a+1].y+this.sharpness*(this.centers[a+1].y+l),z:(1-this.sharpness)*this.points[a+1].z+this.sharpness*(this.centers[a+1].z+h)}])}return this.controls.push([this.points[this.length-1],this.points[this.length-1]]),this.steps=this.cacheSteps(this.stepLength),this}),[{key:"cacheSteps",value:function(t){var e=[],n=this.pos(0);e.push(0);for(var r=0;r<this.duration;r+=10){var i=this.pos(r);Math.sqrt((i.x-n.x)*(i.x-n.x)+(i.y-n.y)*(i.y-n.y)+(i.z-n.z)*(i.z-n.z))>t&&(e.push(r),n=i)}return e}},{key:"vector",value:function(t){var e=this.pos(t+10),n=this.pos(t-10);return{angle:180*Math.atan2(e.y-n.y,e.x-n.x)/3.14,speed:Math.sqrt((n.x-e.x)*(n.x-e.x)+(n.y-e.y)*(n.y-e.y)+(n.z-e.z)*(n.z-e.z))}}},{key:"pos",value:function(t){var e=t-this.delay;e<0&&(e=0),e>this.duration&&(e=this.duration-1);var n=e/this.duration;if(n>=1)return this.points[this.length-1];var r=Math.floor((this.points.length-1)*n);return function(t,e,n,r,i){var o=function(t){var e=t*t,n=e*t;return[n,3*e*(1-t),3*t*(1-t)*(1-t),(1-t)*(1-t)*(1-t)]}(t),s={x:i.x*o[0]+r.x*o[1]+n.x*o[2]+e.x*o[3],y:i.y*o[0]+r.y*o[1]+n.y*o[2]+e.y*o[3],z:i.z*o[0]+r.z*o[1]+n.z*o[2]+e.z*o[3]};return s}((this.length-1)*n-r,this.points[r],this.controls[r][1],this.controls[r+1][0],this.points[r+1])}}])}();function Bt(t){for(var e,n,r=Q(t),i=0,o=1;o<r.length;)e=n||r[0],i+=((n=r[o])[0]-e[0])*(n[1]+e[1]),o++;return i>0}function zt(t,e){for(var n=0,r=0,i=0,o=0,s=0,a=0,u=0,l=0,h=null,c=null,f=t[0],v=t[1],g=e.length;n<g;n++){r=0;var d=e[n].length-1,p=e[n];if((h=p[0])[0]!==p[d][0]&&h[1]!==p[d][1])throw new Error("First and last coordinates in a ring must be the same");for(s=h[0]-f,a=h[1]-v;r<d;r++)if(l=(c=p[r+1])[1]-v,a<0&&l<0||a>0&&l>0)a=l,s=(h=c)[0]-f;else{if(u=c[0]-t[0],l>0&&a<=0){if((o=s*l-u*a)>0)i+=1;else if(0===o)return 0}else if(a>0&&l<=0){if((o=s*l-u*a)<0)i+=1;else if(0===o)return 0}else if(0===l&&a<0){if(0===(o=s*l-u*a))return 0}else if(0===a&&l<0){if(0===(o=s*l-u*a))return 0}else if(0===a&&0===l){if(u<=0&&s>=0)return 0;if(s<=0&&u>=0)return 0}h=c,a=l,s=u}}return i%2!=0}function jt(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!t)throw new Error("point is required");if(!e)throw new Error("polygon is required");var r=K(t),i=rt(e),o=i.type,s=e.bbox,a=i.coordinates;if(s&&!1===function(t,e){return e[0]<=t[0]&&e[1]<=t[1]&&e[2]>=t[0]&&e[3]>=t[1]}(r,s))return!1;"Polygon"===o&&(a=[a]);for(var u=!1,l=0;l<a.length;++l){var h=zt(r,a[l]);if(0===h)return!n.ignoreBoundary;h&&(u=!0)}return u}function Xt(t,e){for(var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=K(t),i=Q(e),o=0;o<i.length-1;o++){var s=!1;if(n.ignoreEndVertices&&(0===o&&(s="start"),o===i.length-2&&(s="end"),0===o&&o+1===i.length-1&&(s="both")),Ut(i[o],i[o+1],r,s,void 0===n.epsilon?null:n.epsilon))return!0}return!1}function Ut(t,e,n,r,i){var o=n[0],s=n[1],a=t[0],u=t[1],l=e[0],h=e[1],c=l-a,f=h-u,v=(n[0]-a)*f-(n[1]-u)*c;if(null!==i){if(Math.abs(v)>i)return!1}else if(0!==v)return!1;return Math.abs(c)===Math.abs(f)&&0===Math.abs(c)?!r&&(n[0]===t[0]&&n[1]===t[1]):r?"start"===r?Math.abs(c)>=Math.abs(f)?c>0?a<o&&o<=l:l<=o&&o<a:f>0?u<s&&s<=h:h<=s&&s<u:"end"===r?Math.abs(c)>=Math.abs(f)?c>0?a<=o&&o<l:l<o&&o<=a:f>0?u<=s&&s<h:h<s&&s<=u:"both"===r&&(Math.abs(c)>=Math.abs(f)?c>0?a<o&&o<l:l<o&&o<a:f>0?u<s&&s<h:h<s&&s<u):Math.abs(c)>=Math.abs(f)?c>0?a<=o&&o<=l:l<=o&&o<=a:f>0?u<=s&&s<=h:h<=s&&s<=u}function Vt(t,e,n,r,i){Zt(t,e,n||0,r||t.length-1,i||Wt)}function Zt(t,e,n,r,i){for(;r>n;){if(r-n>600){var o=r-n+1,s=e-n+1,a=Math.log(o),u=.5*Math.exp(2*a/3),l=.5*Math.sqrt(a*u*(o-u)/o)*(s-o/2<0?-1:1);Zt(t,e,Math.max(n,Math.floor(e-s*u/o+l)),Math.min(r,Math.floor(e+(o-s)*u/o+l)),i)}var h=t[e],c=n,f=r;for(Ht(t,n,e),i(t[r],h)>0&&Ht(t,n,r);c<f;){for(Ht(t,c,f),c++,f--;i(t[c],h)<0;)c++;for(;i(t[f],h)>0;)f--}0===i(t[n],h)?Ht(t,n,f):Ht(t,++f,r),f<=e&&(n=f+1),e<=f&&(r=f-1)}}function Ht(t,e,n){var r=t[e];t[e]=t[n],t[n]=r}function Wt(t,e){return t<e?-1:t>e?1:0}var Jt=function(){return s((function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:9;i(this,t),this._maxEntries=Math.max(4,e),this._minEntries=Math.max(2,Math.ceil(.4*this._maxEntries)),this.clear()}),[{key:"all",value:function(){return this._all(this.data,[])}},{key:"search",value:function(t){var e=this.data,n=[];if(!se(t,e))return n;for(var r=this.toBBox,i=[];e;){for(var o=0;o<e.children.length;o++){var s=e.children[o],a=e.leaf?r(s):s;se(t,a)&&(e.leaf?n.push(s):oe(t,a)?this._all(s,n):i.push(s))}e=i.pop()}return n}},{key:"collides",value:function(t){var e=this.data;if(!se(t,e))return!1;for(var n=[];e;){for(var r=0;r<e.children.length;r++){var i=e.children[r],o=e.leaf?this.toBBox(i):i;if(se(t,o)){if(e.leaf||oe(t,o))return!0;n.push(i)}}e=n.pop()}return!1}},{key:"load",value:function(t){if(!t||!t.length)return this;if(t.length<this._minEntries){for(var e=0;e<t.length;e++)this.insert(t[e]);return this}var n=this._build(t.slice(),0,t.length-1,0);if(this.data.children.length)if(this.data.height===n.height)this._splitRoot(this.data,n);else{if(this.data.height<n.height){var r=this.data;this.data=n,n=r}this._insert(n,this.data.height-n.height-1,!0)}else this.data=n;return this}},{key:"insert",value:function(t){return t&&this._insert(t,this.data.height-1),this}},{key:"clear",value:function(){return this.data=ae([]),this}},{key:"remove",value:function(t,e){if(!t)return this;for(var n,r,i,o=this.data,s=this.toBBox(t),a=[],u=[];o||a.length;){if(o||(o=a.pop(),r=a[a.length-1],n=u.pop(),i=!0),o.leaf){var l=Kt(t,o.children,e);if(-1!==l)return o.children.splice(l,1),a.push(o),this._condense(a),this}i||o.leaf||!oe(o,s)?r?(n++,o=r.children[n],i=!1):o=null:(a.push(o),u.push(n),n=0,r=o,o=o.children[0])}return this}},{key:"toBBox",value:function(t){return t}},{key:"compareMinX",value:function(t,e){return t.minX-e.minX}},{key:"compareMinY",value:function(t,e){return t.minY-e.minY}},{key:"toJSON",value:function(){return this.data}},{key:"fromJSON",value:function(t){return this.data=t,this}},{key:"_all",value:function(t,e){for(var n=[];t;)t.leaf?e.push.apply(e,p(t.children)):n.push.apply(n,p(t.children)),t=n.pop();return e}},{key:"_build",value:function(t,e,n,r){var i,o=n-e+1,s=this._maxEntries;if(o<=s)return Qt(i=ae(t.slice(e,n+1)),this.toBBox),i;r||(r=Math.ceil(Math.log(o)/Math.log(s)),s=Math.ceil(o/Math.pow(s,r-1))),(i=ae([])).leaf=!1,i.height=r;var a=Math.ceil(o/s),u=a*Math.ceil(Math.sqrt(s));ue(t,e,n,u,this.compareMinX);for(var l=e;l<=n;l+=u){var h=Math.min(l+u-1,n);ue(t,l,h,a,this.compareMinY);for(var c=l;c<=h;c+=a){var f=Math.min(c+a-1,h);i.children.push(this._build(t,c,f,r-1))}}return Qt(i,this.toBBox),i}},{key:"_chooseSubtree",value:function(t,e,n,r){for(;r.push(e),!e.leaf&&r.length-1!==n;){for(var i=1/0,o=1/0,s=void 0,a=0;a<e.children.length;a++){var u=e.children[a],l=re(u),h=(c=t,f=u,(Math.max(f.maxX,c.maxX)-Math.min(f.minX,c.minX))*(Math.max(f.maxY,c.maxY)-Math.min(f.minY,c.minY))-l);h<o?(o=h,i=l<i?l:i,s=u):h===o&&l<i&&(i=l,s=u)}e=s||e.children[0]}var c,f;return e}},{key:"_insert",value:function(t,e,n){var r=n?t:this.toBBox(t),i=[],o=this._chooseSubtree(r,this.data,e,i);for(o.children.push(t),te(o,r);e>=0&&i[e].children.length>this._maxEntries;)this._split(i,e),e--;this._adjustParentBBoxes(r,i,e)}},{key:"_split",value:function(t,e){var n=t[e],r=n.children.length,i=this._minEntries;this._chooseSplitAxis(n,i,r);var o=this._chooseSplitIndex(n,i,r),s=ae(n.children.splice(o,n.children.length-o));s.height=n.height,s.leaf=n.leaf,Qt(n,this.toBBox),Qt(s,this.toBBox),e?t[e-1].children.push(s):this._splitRoot(n,s)}},{key:"_splitRoot",value:function(t,e){this.data=ae([t,e]),this.data.height=t.height+1,this.data.leaf=!1,Qt(this.data,this.toBBox)}},{key:"_chooseSplitIndex",value:function(t,e,n){for(var r,i,o,s,a,u,l,h=1/0,c=1/0,f=e;f<=n-e;f++){var v=$t(t,0,f,this.toBBox),g=$t(t,f,n,this.toBBox),d=(i=v,o=g,s=void 0,a=void 0,u=void 0,l=void 0,s=Math.max(i.minX,o.minX),a=Math.max(i.minY,o.minY),u=Math.min(i.maxX,o.maxX),l=Math.min(i.maxY,o.maxY),Math.max(0,u-s)*Math.max(0,l-a)),p=re(v)+re(g);d<h?(h=d,r=f,c=p<c?p:c):d===h&&p<c&&(c=p,r=f)}return r||n-e}},{key:"_chooseSplitAxis",value:function(t,e,n){var r=t.leaf?this.compareMinX:ee,i=t.leaf?this.compareMinY:ne;this._allDistMargin(t,e,n,r)<this._allDistMargin(t,e,n,i)&&t.children.sort(r)}},{key:"_allDistMargin",value:function(t,e,n,r){t.children.sort(r);for(var i=this.toBBox,o=$t(t,0,e,i),s=$t(t,n-e,n,i),a=ie(o)+ie(s),u=e;u<n-e;u++){var l=t.children[u];te(o,t.leaf?i(l):l),a+=ie(o)}for(var h=n-e-1;h>=e;h--){var c=t.children[h];te(s,t.leaf?i(c):c),a+=ie(s)}return a}},{key:"_adjustParentBBoxes",value:function(t,e,n){for(var r=n;r>=0;r--)te(e[r],t)}},{key:"_condense",value:function(t){for(var e,n=t.length-1;n>=0;n--)0===t[n].children.length?n>0?(e=t[n-1].children).splice(e.indexOf(t[n]),1):this.clear():Qt(t[n],this.toBBox)}}])}();function Kt(t,e,n){if(!n)return e.indexOf(t);for(var r=0;r<e.length;r++)if(n(t,e[r]))return r;return-1}function Qt(t,e){$t(t,0,t.children.length,e,t)}function $t(t,e,n,r,i){i||(i=ae(null)),i.minX=1/0,i.minY=1/0,i.maxX=-1/0,i.maxY=-1/0;for(var o=e;o<n;o++){var s=t.children[o];te(i,t.leaf?r(s):s)}return i}function te(t,e){return t.minX=Math.min(t.minX,e.minX),t.minY=Math.min(t.minY,e.minY),t.maxX=Math.max(t.maxX,e.maxX),t.maxY=Math.max(t.maxY,e.maxY),t}function ee(t,e){return t.minX-e.minX}function ne(t,e){return t.minY-e.minY}function re(t){return(t.maxX-t.minX)*(t.maxY-t.minY)}function ie(t){return t.maxX-t.minX+(t.maxY-t.minY)}function oe(t,e){return t.minX<=e.minX&&t.minY<=e.minY&&e.maxX<=t.maxX&&e.maxY<=t.maxY}function se(t,e){return e.minX<=t.maxX&&e.minY<=t.maxY&&e.maxX>=t.minX&&e.maxY>=t.minY}function ae(t){return{children:t,height:1,leaf:!0,minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0}}function ue(t,e,n,r,i){for(var o=[e,n];o.length;)if(!((n=o.pop())-(e=o.pop())<=r)){var s=e+Math.ceil((n-e)/r/2)*r;Vt(t,s,e,n,i),o.push(e,s,s,n)}}var le=Object.freeze({__proto__:null,default:Jt});function he(t){var e;if(t.bbox)e=t.bbox;else if(Array.isArray(t)&&4===t.length)e=t;else if(Array.isArray(t)&&6===t.length)e=[t[0],t[1],t[3],t[4]];else if("Feature"===t.type)e=Rt(t);else{if("FeatureCollection"!==t.type)throw new Error("invalid geojson");e=Rt(t)}return{minX:e[0],minY:e[1],maxX:e[2],maxY:e[3]}}var ce=function(){return s((function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:9;i(this,t),this.tree=new Jt(e),this.tree.toBBox=he}),[{key:"insert",value:function(t){if("Feature"!==t.type)throw new Error("invalid feature");return t.bbox=t.bbox?t.bbox:Rt(t),this.tree.insert(t),this}},{key:"load",value:function(t){var e=[];return Array.isArray(t)?t.forEach((function(t){if("Feature"!==t.type)throw new Error("invalid features");t.bbox=t.bbox?t.bbox:Rt(t),e.push(t)})):dt(t,(function(t){if("Feature"!==t.type)throw new Error("invalid features");t.bbox=t.bbox?t.bbox:Rt(t),e.push(t)})),this.tree.load(e),this}},{key:"remove",value:function(t,e){if("Feature"!==t.type)throw new Error("invalid feature");return t.bbox=t.bbox?t.bbox:Rt(t),this.tree.remove(t,e),this}},{key:"clear",value:function(){return this.tree.clear(),this}},{key:"search",value:function(t){return C(this.tree.search(he(t)))}},{key:"collides",value:function(t){return this.tree.collides(he(t))}},{key:"all",value:function(){return C(this.tree.all())}},{key:"toJSON",value:function(){return this.tree.toJSON()}},{key:"fromJSON",value:function(t){return this.tree.fromJSON(t),this}}])}();function fe(t){return new ce(t)}function ve(t,e){if(!Z(e=null!=e?e:{}))throw new Error("options is invalid");var n=e.precision,r=e.coordinates,i=e.mutate;if(n=null==n||isNaN(n)?6:n,r=null==r||isNaN(r)?3:r,!t)throw new Error("<geojson> is required");if("number"!=typeof n)throw new Error("<precision> must be a number");if("number"!=typeof r)throw new Error("<coordinates> must be a number");!1!==i&&void 0!==i||(t=JSON.parse(JSON.stringify(t)));var o=Math.pow(10,n);return ct(t,(function(t){!function(t,e,n){t.length>n&&t.splice(n,t.length);for(var r=0;r<t.length;r++)t[r]=Math.round(t[r]*e)/e}(t,o,r)})),t}function ge(t){if(!t)throw new Error("geojson is required");var e=[];return xt(t,(function(t){!function(t,e){var n=[],r=t.geometry;if(null!==r){switch(r.type){case"Polygon":n=Q(r);break;case"LineString":n=[Q(r)]}n.forEach((function(n){var r=function(t,e){var n=[];return t.reduce((function(t,r){var i=L([t,r],e);return i.bbox=function(t,e){var n=t[0],r=t[1],i=e[0],o=e[1],s=n<i?n:i,a=r<o?r:o,u=n>i?n:i,l=r>o?r:o;return[s,a,u,l]}(t,r),n.push(i),r})),n}(n,t.properties);r.forEach((function(t){t.id=e.length,e.push(t)}))}))}}(t,e)})),C(e)}var de=function(){return s((function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:pe;if(i(this,t),this.data=e,this.length=this.data.length,this.compare=n,this.length>0)for(var r=(this.length>>1)-1;r>=0;r--)this._down(r)}),[{key:"push",value:function(t){this.data.push(t),this.length++,this._up(this.length-1)}},{key:"pop",value:function(){if(0!==this.length){var t=this.data[0],e=this.data.pop();return this.length--,this.length>0&&(this.data[0]=e,this._down(0)),t}}},{key:"peek",value:function(){return this.data[0]}},{key:"_up",value:function(t){for(var e=this.data,n=this.compare,r=e[t];t>0;){var i=t-1>>1,o=e[i];if(n(r,o)>=0)break;e[t]=o,t=i}e[t]=r}},{key:"_down",value:function(t){for(var e=this.data,n=this.compare,r=this.length>>1,i=e[t];t<r;){var o=1+(t<<1),s=e[o],a=o+1;if(a<this.length&&n(e[a],s)<0&&(o=a,s=e[a]),n(s,i)>=0)break;e[t]=s,t=o}e[t]=i}}])}();function pe(t,e){return t<e?-1:t>e?1:0}function ye(t,e){return t.p.x>e.p.x?1:t.p.x<e.p.x?-1:t.p.y!==e.p.y?t.p.y>e.p.y?1:-1:1}function me(t,e){return t.rightSweepEvent.p.x>e.rightSweepEvent.p.x?1:t.rightSweepEvent.p.x<e.rightSweepEvent.p.x?-1:t.rightSweepEvent.p.y!==e.rightSweepEvent.p.y?t.rightSweepEvent.p.y<e.rightSweepEvent.p.y?1:-1:1}var _e=function(){return s((function t(e,n,r,o){i(this,t),this.p={x:e[0],y:e[1]},this.featureId=n,this.ringId=r,this.eventId=o,this.otherEvent=null,this.isLeftEndpoint=null}),[{key:"isSamePoint",value:function(t){return this.p.x===t.p.x&&this.p.y===t.p.y}}])}();var xe=0,Ee=0,ke=0;function we(t,e){var n="Feature"===t.type?t.geometry:t,r=n.coordinates;"Polygon"!==n.type&&"MultiLineString"!==n.type||(r=[r]),"LineString"===n.type&&(r=[[r]]);for(var i=0;i<r.length;i++)for(var o=0;o<r[i].length;o++){var s=r[i][o][0],a=null;Ee+=1;for(var u=0;u<r[i][o].length-1;u++){a=r[i][o][u+1];var l=new _e(s,xe,Ee,ke),h=new _e(a,xe,Ee,ke+1);l.otherEvent=h,h.otherEvent=l,ye(l,h)>0?(h.isLeftEndpoint=!0,l.isLeftEndpoint=!1):(l.isLeftEndpoint=!0,h.isLeftEndpoint=!1),e.push(l),e.push(h),s=a,ke+=1}}xe+=1}var be=s((function t(e){i(this,t),this.leftSweepEvent=e,this.rightSweepEvent=e.otherEvent}));function Ie(t,e){if(null===t||null===e)return!1;if(t.leftSweepEvent.ringId===e.leftSweepEvent.ringId&&(t.rightSweepEvent.isSamePoint(e.leftSweepEvent)||t.rightSweepEvent.isSamePoint(e.leftSweepEvent)||t.rightSweepEvent.isSamePoint(e.rightSweepEvent)||t.leftSweepEvent.isSamePoint(e.leftSweepEvent)||t.leftSweepEvent.isSamePoint(e.rightSweepEvent)))return!1;var n=t.leftSweepEvent.p.x,r=t.leftSweepEvent.p.y,i=t.rightSweepEvent.p.x,o=t.rightSweepEvent.p.y,s=e.leftSweepEvent.p.x,a=e.leftSweepEvent.p.y,u=e.rightSweepEvent.p.x,l=e.rightSweepEvent.p.y,h=(l-a)*(i-n)-(u-s)*(o-r),c=(u-s)*(r-a)-(l-a)*(n-s),f=(i-n)*(r-a)-(o-r)*(n-s);if(0===h)return!1;var v=c/h,g=f/h;return v>=0&&v<=1&&g>=0&&g<=1&&[n+v*(i-n),r+v*(o-r)]}var Ne=function(t,e){var n=new de([],ye);return function(t,e){if("FeatureCollection"===t.type)for(var n=t.features,r=0;r<n.length;r++)we(n[r],e);else we(t,e)}(t,n),function(t,e){e=e||!1;for(var n=[],r=new de([],me);t.length;){var i=t.pop();if(i.isLeftEndpoint){for(var o=new be(i),s=0;s<r.data.length;s++){var a=r.data[s];if(!e||a.leftSweepEvent.featureId!==i.featureId){var u=Ie(o,a);!1!==u&&n.push(u)}}r.push(o)}else!1===i.isLeftEndpoint&&r.pop()}return n}(n,e)};function Se(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=n.removeDuplicates,i=void 0===r||r,o=n.ignoreSelfIntersections,s=void 0===o||o,a=[];"FeatureCollection"===t.type?a=a.concat(t.features):"Feature"===t.type?a.push(t):"LineString"!==t.type&&"Polygon"!==t.type&&"MultiLineString"!==t.type&&"MultiPolygon"!==t.type||a.push(w(t)),"FeatureCollection"===e.type?a=a.concat(e.features):"Feature"===e.type?a.push(e):"LineString"!==e.type&&"Polygon"!==e.type&&"MultiLineString"!==e.type&&"MultiPolygon"!==e.type||a.push(w(e));var u=Ne(C(a),s),l=[];if(i){var h={};u.forEach((function(t){var e=t.join(",");h[e]||(h[e]=!0,l.push(t))}))}else l=u;return C(l.map((function(t){return I(t)})))}var Me=Object.defineProperty,Le=Object.defineProperties,Pe=Object.getOwnPropertyDescriptors,Ce=Object.getOwnPropertySymbols,Te=Object.prototype.hasOwnProperty,Oe=Object.prototype.propertyIsEnumerable,Re=function(t,e,n){return e in t?Me(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n},Ae=function(t,e){for(var n in e||(e={}))Te.call(e,n)&&Re(t,n,e[n]);if(Ce){var r,i=a(Ce(e));try{for(i.s();!(r=i.n()).done;){n=r.value;Oe.call(e,n)&&Re(t,n,e[n])}}catch(t){i.e(t)}finally{i.f()}}return t},De=function(t,e){return Le(t,Pe(e))};function Fe(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!t||!e)throw new Error("lines and inputPoint are required arguments");var r=K(e),i=I([1/0,1/0],{lineStringIndex:-1,segmentIndex:-1,totalDistance:-1,lineDistance:-1,segmentDistance:-1,pointDistance:1/0,multiFeatureIndex:-1,index:-1,location:-1,dist:1/0}),o=0,s=0,a=-1;return xt(t,(function(t,u,l){a!==l&&(a=l,s=0);for(var h=Q(t),c=0;c<h.length-1;c++){var f=I(h[c]),v=K(f),g=I(h[c+1]),p=K(g),y=ut(f,g,n),m=void 0,_=void 0;if(p[0]===r[0]&&p[1]===r[1])m=p,_=!0;else if(v[0]===r[0]&&v[1]===r[1])m=v,_=!1;else{var x=d(je(v,p,r),2);m=x[0],_=x[1]}var E=ut(e,m,n);if(E<i.properties.pointDistance){var k=ut(f,m,n);(i=I(m,{lineStringIndex:l,segmentIndex:_?c+1:c,totalDistance:o+k,lineDistance:s+k,segmentDistance:k,pointDistance:E,multiFeatureIndex:-1,index:-1,location:-1,dist:1/0})).properties=De(Ae({},i.properties),{multiFeatureIndex:i.properties.lineStringIndex,index:i.properties.segmentIndex,location:i.properties.totalDistance,dist:i.properties.pointDistance})}o+=y,s+=y}})),i}function qe(t,e){var n=d(t,3),r=n[0],i=n[1],o=n[2],s=d(e,3);return r*s[0]+i*s[1]+o*s[2]}function Ge(t,e){var n=d(t,3),r=n[0],i=n[1],o=n[2],s=d(e,3),a=s[0],u=s[1],l=s[2];return[i*l-o*u,o*a-r*l,r*u-i*a]}function Ye(t){var e=function(t){return Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2)+Math.pow(t[2],2))}(t);return[t[0]/e,t[1]/e,t[2]/e]}function Be(t){var e=j(t[1]),n=j(t[0]);return[Math.cos(e)*Math.cos(n),Math.cos(e)*Math.sin(n),Math.sin(e)]}function ze(t){var e=d(t,3),n=e[0],r=e[1],i=e[2],o=Math.min(Math.max(i,-1),1),s=z(Math.asin(o));return[z(Math.atan2(r,n)),s]}function je(t,e,n){var r=Be(t),i=Be(e),o=Be(n),s=Ge(r,i);if(0===s[0]&&0===s[1]&&0===s[2])return qe(r,i)>0?[p(e),!0]:[p(n),!1];var a=Ge(s,o);if(0===a[0]&&0===a[1]&&0===a[2])return[p(e),!0];var u=Ye(Ge(a,s)),l=[-u[0],-u[1],-u[2]],h=qe(o,u)>qe(o,l)?u:l,c=Ye(s),f=qe(Ge(r,h),c),v=qe(Ge(h,i),c);return f>=0&&v>=0?[ze(h),!1]:qe(r,o)>qe(i,o)?[p(t),!1]:[p(e),!0]}function Xe(t,e){if(!t)throw new Error("line is required");if(!e)throw new Error("splitter is required");var n=it(t),r=it(e);if("LineString"!==n)throw new Error("line must be LineString");if("FeatureCollection"===r)throw new Error("splitter cannot be a FeatureCollection");if("GeometryCollection"===r)throw new Error("splitter cannot be a GeometryCollection");var i=ve(e,{precision:7});switch("Feature"!==t.type&&(t=w(t)),r){case"Point":return Ve(t,i);case"MultiPoint":return Ue(t,i);case"LineString":case"MultiLineString":case"Polygon":case"MultiPolygon":return Ue(t,Se(t,i,{ignoreSelfIntersections:!0}))}}function Ue(t,e){var n=[],r=fe();return xt(e,(function(e){if(n.forEach((function(t,e){t.id=e})),n.length){var i=r.search(e);if(i.features.length){var o=Ze(e,i);n=n.filter((function(t){return t.id!==o.id})),r.remove(o),dt(Ve(o,e),(function(t){n.push(t),r.insert(t)}))}}else n=Ve(t,e).features,r.load(C(n))})),C(n)}function Ve(t,e){var n=[],r=Q(t)[0],i=Q(t)[t.geometry.coordinates.length-1];if(He(r,K(e))||He(i,K(e)))return C([t]);var o=fe(),s=ge(t);o.load(s);var a=o.search(e);if(!a.features.length)return C([t]);var u=Ze(e,a),l=pt(s,(function(t,r,i){var o=Q(r)[1],s=K(e);return i===u.id?(t.push(s),n.push(L(t)),He(s,o)?[s]:[s,o]):(t.push(o),t)}),[r]);return l.length>1&&n.push(L(l)),C(n)}function Ze(t,e){if(!e.features.length)throw new Error("lines must contain features");if(1===e.features.length)return e.features[0];var n,r=1/0;return dt(e,(function(e){var i=Fe(e,t).properties.pointDistance;i<r&&(n=e,r=i)})),n}function He(t,e){return t[0]===e[0]&&t[1]===e[1]}function We(t,e){if("Feature"===t.type&&null===t.geometry)return!1;if("Feature"===e.type&&null===e.geometry)return!1;if(!Je(Rt(t),Rt(e)))return!1;var n,r=a(rt(e).coordinates);try{for(r.s();!(n=r.n()).done;){var i,o=a(n.value);try{for(o.s();!(i=o.n()).done;){if(!jt(i.value,t))return!1}}catch(t){o.e(t)}finally{o.f()}}}catch(t){r.e(t)}finally{r.f()}return!0}function Je(t,e){return!(t[0]>e[0])&&(!(t[2]<e[2])&&(!(t[1]>e[1])&&!(t[3]<e[3])))}function Ke(t,e){return t[0]===e[0]&&t[1]===e[1]}function Qe(t,e){return[(t[0]+e[0])/2,(t[1]+e[1])/2]}function $e(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=rt(t);switch(e.properties||"Feature"!==t.type||(e.properties=t.properties),n.type){case"Polygon":return function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=rt(t),r=n.coordinates,i=e.properties?e.properties:"Feature"===t.type?t.properties:{};return tn(r,i)}(n,e);case"MultiPolygon":return function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=rt(t),r=n.coordinates,i=e.properties?e.properties:"Feature"===t.type?t.properties:{},o=[];return r.forEach((function(t){o.push(tn(t,i))})),C(o)}(n,e);default:throw new Error("invalid poly")}}function tn(t,e){return t.length>1?T(t,e):L(t[0],e)}var en=Object.defineProperty,nn=function(t,e){return en(t,"name",{value:e,configurable:!0})},rn=function(){return s((function t(e){var n,r,o;i(this,t),this.direction=!1,this.compareProperties=!0,this.precision=Math.pow(10,-(null!=(n=null==e?void 0:e.precision)?n:17)),this.direction=null!=(r=null==e?void 0:e.direction)&&r,this.compareProperties=null==(o=null==e?void 0:e.compareProperties)||o}),[{key:"compare",value:function(t,e){var n=this;if(t.type!==e.type)return!1;if(!sn(t,e))return!1;switch(t.type){case"Point":return this.compareCoord(t.coordinates,e.coordinates);case"LineString":return this.compareLine(t.coordinates,e.coordinates);case"Polygon":return this.comparePolygon(t,e);case"GeometryCollection":return this.compareGeometryCollection(t,e);case"Feature":return this.compareFeature(t,e);case"FeatureCollection":return this.compareFeatureCollection(t,e);default:if(t.type.startsWith("Multi")){var r=an(t),i=an(e);return r.every((function(t){return i.some((function(e){return n.compare(t,e)}))}))}}return!1}},{key:"compareCoord",value:function(t,e){var n=this;return t.length===e.length&&t.every((function(t,r){return Math.abs(t-e[r])<n.precision}))}},{key:"compareLine",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];if(!sn(t,e))return!1;var i=t,o=e;if(r&&!this.compareCoord(i[0],o[0])){var s=this.fixStartIndex(o,i);if(!s)return!1;o=s}var a=this.compareCoord(i[n],o[n]);return this.direction||a?this.comparePath(i,o):!!this.compareCoord(i[n],o[o.length-(1+n)])&&this.comparePath(i.slice().reverse(),o)}},{key:"fixStartIndex",value:function(t,e){for(var n,r=-1,i=0;i<t.length;i++)if(this.compareCoord(t[i],e[0])){r=i;break}return r>=0&&(n=[].concat(t.slice(r,t.length),t.slice(1,r+1))),n}},{key:"comparePath",value:function(t,e){var n=this;return t.every((function(t,r){return n.compareCoord(t,e[r])}))}},{key:"comparePolygon",value:function(t,e){var n=this;if(this.compareLine(t.coordinates[0],e.coordinates[0],1,!0)){var r=t.coordinates.slice(1,t.coordinates.length),i=e.coordinates.slice(1,e.coordinates.length);return r.every((function(t){return i.some((function(e){return n.compareLine(t,e,1,!0)}))}))}return!1}},{key:"compareGeometryCollection",value:function(t,e){var n=this;return sn(t.geometries,e.geometries)&&this.compareBBox(t,e)&&t.geometries.every((function(t,r){return n.compare(t,e.geometries[r])}))}},{key:"compareFeature",value:function(t,e){return t.id===e.id&&(!this.compareProperties||ln(t.properties,e.properties))&&this.compareBBox(t,e)&&this.compare(t.geometry,e.geometry)}},{key:"compareFeatureCollection",value:function(t,e){var n=this;return sn(t.features,e.features)&&this.compareBBox(t,e)&&t.features.every((function(t,r){return n.compare(t,e.features[r])}))}},{key:"compareBBox",value:function(t,e){return Boolean(!t.bbox&&!e.bbox)||!(!t.bbox||!e.bbox)&&this.compareCoord(t.bbox,e.bbox)}}])}();nn(rn,"GeojsonEquality");var on=rn;function sn(t,e){return t.coordinates?t.coordinates.length===e.coordinates.length:t.length===e.length}function an(t){return t.coordinates.map((function(e){return{type:t.type.replace("Multi",""),coordinates:e}}))}function un(t,e,n){return new on(n).compare(t,e)}function ln(t,e){if(null===t&&null===e)return!0;if(null===t||null===e)return!1;var n=Object.keys(t),r=Object.keys(e);if(n.length!==r.length)return!1;for(var i=0,o=n;i<o.length;i++){var s=o[i],a=t[s],u=e[s],l=fn(a)&&fn(u);if(l&&!ln(a,u)||!l&&a!==u)return!1}return!0}nn(sn,"sameLength"),nn(an,"explode"),nn(un,"geojsonEquality"),nn(ln,"equal");var hn,cn,fn=nn((function(t){return null!=t&&"object"===m(t)}),"isObject");function vn(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n="object"===m(e)?e.mutate:e;if(!t)throw new Error("geojson is required");var r=it(t),i=[];switch(r){case"LineString":i=gn(t,r);break;case"MultiLineString":case"Polygon":Q(t).forEach((function(t){i.push(gn(t,r))}));break;case"MultiPolygon":Q(t).forEach((function(t){var e=[];t.forEach((function(t){e.push(gn(t,r))})),i.push(e)}));break;case"Point":return t;case"MultiPoint":var o={};Q(t).forEach((function(t){var e=t.join("-");Object.prototype.hasOwnProperty.call(o,e)||(i.push(t),o[e]=!0)}));break;default:throw new Error(r+" geometry not supported")}return t.coordinates?!0===n?(t.coordinates=i,t):{type:r,coordinates:i}:!0===n?(t.geometry.coordinates=i,t):w({type:r,coordinates:i},t.properties,{bbox:t.bbox,id:t.id})}function gn(t,e){var n=Q(t);if(2===n.length&&!dn(n[0],n[1]))return n;var r=[],i=0,o=1,s=2;for(r.push(n[i]);s<n.length;)Xt(n[o],L([n[i],n[s]]))?o=s:(r.push(n[o]),i=o,s=++o),s++;if(r.push(n[o]),"Polygon"===e||"MultiPolygon"===e){if(Xt(r[0],L([r[1],r[r.length-2]]))&&(r.shift(),r.pop(),r.push(r[0])),r.length<4)throw new Error("invalid polygon, fewer than 4 points");if(!dn(r[0],r[r.length-1]))throw new Error("invalid polygon, first and last points not equal")}return r}function dn(t,e){return t[0]===e[0]&&t[1]===e[1]}function pn(t,e){var n=(arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}).precision;if("number"!=typeof(n=null==n||isNaN(n)?6:n)||!(n>=0))throw new Error("precision must be a positive number");return rt(t).type===rt(e).type&&un(vn(t),vn(e),{precision:n})}function yn(t,e){var n=rt(t),r=rt(e),i=n.type,o=r.type;switch(i){case"MultiPoint":switch(o){case"LineString":return mn(n,r);case"Polygon":return xn(n,r);default:throw new Error("feature2 "+o+" geometry not supported")}case"LineString":switch(o){case"MultiPoint":return mn(r,n);case"LineString":return function(t,e){var n=Se(t,e);if(0===n.features.length)return!1;var r,i=a(n.features);try{for(i.s();!(r=i.n()).done;){var o=r.value;if(!(pn(o.geometry,I(t.coordinates[0]))||pn(o.geometry,I(t.coordinates[t.coordinates.length-1]))||pn(o.geometry,I(e.coordinates[0]))||pn(o.geometry,I(e.coordinates[e.coordinates.length-1]))))return!0}}catch(t){i.e(t)}finally{i.f()}return!1}(n,r);case"Polygon":return _n(n,r);default:throw new Error("feature2 "+o+" geometry not supported")}case"Polygon":switch(o){case"MultiPoint":return xn(r,n);case"LineString":return _n(r,n);default:throw new Error("feature2 "+o+" geometry not supported")}default:throw new Error("feature1 "+i+" geometry not supported")}}function mn(t,e){for(var n=!1,r=!1,i=t.coordinates.length,o=0;o<i&&!n&&!r;){for(var s=0;s<e.coordinates.length-1;s++){var a=!0;0!==s&&s!==e.coordinates.length-2||(a=!1),En(e.coordinates[s],e.coordinates[s+1],t.coordinates[o],a)?n=!0:r=!0}o++}return n&&r}function _n(t,e){return Se(t,$e(e)).features.length>0}function xn(t,e){for(var n=!1,r=!1,i=t.coordinates.length,o=0;o<i&&(!n||!r);o++)jt(I(t.coordinates[o]),e)?n=!0:r=!0;return r&&n}function En(t,e,n,r){var i=n[0]-t[0],o=n[1]-t[1],s=e[0]-t[0],a=e[1]-t[1];return 0==i*a-o*s&&(r?Math.abs(s)>=Math.abs(a)?s>0?t[0]<=n[0]&&n[0]<=e[0]:e[0]<=n[0]&&n[0]<=t[0]:a>0?t[1]<=n[1]&&n[1]<=e[1]:e[1]<=n[1]&&n[1]<=t[1]:Math.abs(s)>=Math.abs(a)?s>0?t[0]<n[0]&&n[0]<e[0]:e[0]<n[0]&&n[0]<t[0]:a>0?t[1]<n[1]&&n[1]<e[1]:e[1]<n[1]&&n[1]<t[1])}function kn(t,e){var n=(arguments.length>2&&void 0!==arguments[2]?arguments[2]:{ignoreSelfIntersections:!0}).ignoreSelfIntersections,r=void 0===n||n,i=!0;return xt(t,(function(t){xt(e,(function(e){if(!1===i)return!1;i=function(t,e,n){switch(t.type){case"Point":switch(e.type){case"Point":return r=t.coordinates,i=e.coordinates,!(r[0]===i[0]&&r[1]===i[1]);case"LineString":return!wn(e,t);case"Polygon":return!jt(t,e)}break;case"LineString":switch(e.type){case"Point":return!wn(t,e);case"LineString":return!function(t,e,n){var r=Se(t,e,{ignoreSelfIntersections:n});if(r.features.length>0)return!0;return!1}(t,e,n);case"Polygon":return!bn(e,t,n)}break;case"Polygon":switch(e.type){case"Point":return!jt(e,t);case"LineString":return!bn(t,e,n);case"Polygon":return!function(t,e,n){var r,i=a(t.coordinates[0]);try{for(i.s();!(r=i.n()).done;){if(jt(r.value,e))return!0}}catch(t){i.e(t)}finally{i.f()}var o,s=a(e.coordinates[0]);try{for(s.s();!(o=s.n()).done;){if(jt(o.value,t))return!0}}catch(t){s.e(t)}finally{s.f()}var u=Se($e(t),$e(e),{ignoreSelfIntersections:n});if(u.features.length>0)return!0;return!1}(e,t,n)}}var r,i;return!1}(t.geometry,e.geometry,r)}))})),i}function wn(t,e){for(var n=0;n<t.coordinates.length-1;n++)if(In(t.coordinates[n],t.coordinates[n+1],e.coordinates))return!0;return!1}function bn(t,e,n){var r,i=a(e.coordinates);try{for(i.s();!(r=i.n()).done;){if(jt(r.value,t))return!0}}catch(t){i.e(t)}finally{i.f()}return Se(e,$e(t),{ignoreSelfIntersections:n}).features.length>0}function In(t,e,n){var r=n[0]-t[0],i=n[1]-t[1],o=e[0]-t[0],s=e[1]-t[1];return 0==r*s-i*o&&(Math.abs(o)>=Math.abs(s)?o>0?t[0]<=n[0]&&n[0]<=e[0]:e[0]<=n[0]&&n[0]<=t[0]:s>0?t[1]<=n[1]&&n[1]<=e[1]:e[1]<=n[1]&&n[1]<=t[1])}function Nn(t,e){var n=(arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}).ignoreSelfIntersections,r=void 0===n||n,i=!1;return xt(t,(function(t){xt(e,(function(e){if(!0===i)return!0;i=!kn(t.geometry,e.geometry,{ignoreSelfIntersections:r})}))})),i}function Sn(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function Mn(t){if(Object.prototype.hasOwnProperty.call(t,"__esModule"))return t;var e=t.default;if("function"==typeof e){var n=function t(){return this instanceof t?Reflect.construct(e,arguments,this.constructor):e.apply(this,arguments)};n.prototype=e.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(t).forEach((function(e){var r=Object.getOwnPropertyDescriptor(t,e);Object.defineProperty(n,e,r.get?r:{enumerable:!0,get:function(){return t[e]}})})),n}var Ln=(cn||(cn=1,hn=function t(e,n){if(e===n)return!0;if(e&&n&&"object"==m(e)&&"object"==m(n)){if(e.constructor!==n.constructor)return!1;var r,i,o;if(Array.isArray(e)){if((r=e.length)!=n.length)return!1;for(i=r;0!=i--;)if(!t(e[i],n[i]))return!1;return!0}if(e.constructor===RegExp)return e.source===n.source&&e.flags===n.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===n.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===n.toString();if((r=(o=Object.keys(e)).length)!==Object.keys(n).length)return!1;for(i=r;0!=i--;)if(!Object.prototype.hasOwnProperty.call(n,o[i]))return!1;for(i=r;0!=i--;){var s=o[i];if(!t(e[s],n[s]))return!1}return!0}return e!=e&&n!=n}),hn),Pn=Sn(Ln);function Cn(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!Z(n=n||{}))throw new Error("options is invalid");var r,i=n.tolerance||0,o=[],s=fe(),a=ge(t);s.load(a);var u=[];return kt(e,(function(t){var e=!1;t&&(dt(s.search(t),(function(n){if(!1===e){var o=Q(t).sort(),s=Q(n).sort();if(Pn(o,s))e=!0,r=r?Tn(r,t)||r:t;else if(0===i?Xt(o[0],n)&&Xt(o[1],n):Fe(n,o[0]).properties.pointDistance<=i&&Fe(n,o[1]).properties.pointDistance<=i)e=!0,r=r?Tn(r,t)||r:t;else if(0===i?Xt(s[0],t)&&Xt(s[1],t):Fe(t,s[0]).properties.pointDistance<=i&&Fe(t,s[1]).properties.pointDistance<=i)if(r){var a=Tn(r,n);a?r=a:u.push(n)}else r=n}})),!1===e&&r&&(o.push(r),u.length&&(o=o.concat(u),u=[]),r=void 0))})),r&&o.push(r),C(o)}function Tn(t,e){var n=Q(e),r=Q(t),i=r[0],o=r[r.length-1],s=t.geometry.coordinates;if(Pn(n[0],i))s.unshift(n[1]);else if(Pn(n[0],o))s.push(n[1]);else if(Pn(n[1],i))s.unshift(n[0]);else{if(!Pn(n[1],o))return;s.push(n[0])}return t}function On(t,e){var n=Y(lt(t[0],t[1])),r=Y(lt(e[0],e[1]));return n===r||(r-n)%180==0}function Rn(t,e){if(t.geometry&&t.geometry.type)return t.geometry.type;if(t.type)return t.type;throw new Error("Invalid GeoJSON object for "+e)}function An(t,e){return!!Dn(e.coordinates[0],t.coordinates)||!!Dn(e.coordinates[e.coordinates.length-1],t.coordinates)}function Dn(t,e){return t[0]===e[0]&&t[1]===e[1]}function Fn(t){return t[0][0]===t[t.length-1][0]&&t[0][1]===t[t.length-1][1]}function qn(t){for(var e=0;e<t.length-1;e++)for(var n=t[e],r=e+1;r<t.length-2;r++){if(Xt(n,L([t[r],t[r+1]])))return!0}return!1}function Gn(t,e,n){for(var r=S(t),i=n+1;i<e.length;i++)if(!kn(r,S(e[i]))&&yn(r,L(e[i][0])))return!1;return!0}function Yn(t,e){var n=rt(t),r=rt(e),i=n.type,o=r.type;switch(i){case"Point":switch(o){case"MultiPoint":return function(t,e){var n,r=!1;for(n=0;n<e.coordinates.length;n++)if(zn(e.coordinates[n],t.coordinates)){r=!0;break}return r}(n,r);case"LineString":return Xt(n,r,{ignoreEndVertices:!0});case"Polygon":case"MultiPolygon":return jt(n,r,{ignoreBoundary:!0});default:throw new Error("feature2 "+o+" geometry not supported")}case"MultiPoint":switch(o){case"MultiPoint":return function(t,e){for(var n=0;n<t.coordinates.length;n++){for(var r=!1,i=0;i<e.coordinates.length;i++)zn(t.coordinates[n],e.coordinates[i])&&(r=!0);if(!r)return!1}return!0}(n,r);case"LineString":return function(t,e){for(var n=!1,r=0;r<t.coordinates.length;r++){if(!Xt(t.coordinates[r],e))return!1;n||(n=Xt(t.coordinates[r],e,{ignoreEndVertices:!0}))}return n}(n,r);case"Polygon":case"MultiPolygon":return function(t,e){for(var n=!0,r=!1,i=0;i<t.coordinates.length;i++){if(!(r=jt(t.coordinates[i],e))){n=!1;break}r=jt(t.coordinates[i],e,{ignoreBoundary:!0})}return n&&r}(n,r);default:throw new Error("feature2 "+o+" geometry not supported")}case"LineString":switch(o){case"LineString":return function(t,e){for(var n=0;n<t.coordinates.length;n++)if(!Xt(t.coordinates[n],e))return!1;return!0}(n,r);case"Polygon":case"MultiPolygon":return function(t,e){var n=Rt(e),r=Rt(t);if(!Bn(n,r))return!1;var i,o=a(t.coordinates);try{for(o.s();!(i=o.n()).done;){if(!jt(i.value,e))return!1}}catch(t){o.e(t)}finally{o.f()}var s,u=!1,l=function(t,e){for(var n=t.coordinates,r=[],i=0;i<n.length-1;i++){var o=L([n[i],n[i+1]]),s=Xe(o,w(e));0===s.features.length?r.push(o):r.push.apply(r,p(s.features))}return C(r)}(t,e),h=a(l.features);try{for(h.s();!(s=h.n()).done;){var c=s.value,f=jn(c.geometry.coordinates[0],c.geometry.coordinates[1]);if(!jt(f,e))return!1;!u&&jt(f,e,{ignoreBoundary:!0})&&(u=!0)}}catch(t){h.e(t)}finally{h.f()}return u}(n,r);default:throw new Error("feature2 "+o+" geometry not supported")}case"Polygon":switch(o){case"Polygon":case"MultiPolygon":return function(t,e){var n=Rt(t);if(!Bn(Rt(e),n))return!1;for(var r=0;r<t.coordinates[0].length;r++)if(!jt(t.coordinates[0][r],e))return!1;return!0}(n,r);default:throw new Error("feature2 "+o+" geometry not supported")}default:throw new Error("feature1 "+i+" geometry not supported")}}function Bn(t,e){return!(t[0]>e[0])&&(!(t[2]<e[2])&&(!(t[1]>e[1])&&!(t[3]<e[3])))}function zn(t,e){return t[0]===e[0]&&t[1]===e[1]}function jn(t,e){return[(t[0]+e[0])/2,(t[1]+e[1])/2]}function Xn(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=Rt(t);return I([(n[0]+n[2])/2,(n[1]+n[3])/2],e.properties,e)}var Un,Vn={exports:{}};var Zn=(Un||(Un=1,function(t,e){t.exports=function(){function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function n(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}function r(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&o(t,e)}function i(t){return i=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},i(t)}function o(t,e){return o=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},o(t,e)}function s(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}function a(t,e,n){return a=s()?Reflect.construct:function(t,e,n){var r=[null];r.push.apply(r,e);var i=new(Function.bind.apply(t,r));return n&&o(i,n.prototype),i},a.apply(null,arguments)}function u(t){var e="function"==typeof Map?new Map:void 0;return u=function(t){if(null===t||(n=t,-1===Function.toString.call(n).indexOf("[native code]")))return t;var n;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,r)}function r(){return a(t,arguments,i(this).constructor)}return r.prototype=Object.create(t.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),o(r,t)},u(t)}function l(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function h(t,e){if(e&&("object"==m(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return l(t)}function c(t){var e=s();return function(){var n,r=i(t);if(e){var o=i(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return h(this,n)}}function f(t,e,n){return f="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=i(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(n):o.value}},f(t,e,n||t)}function v(t){return function(t){if(Array.isArray(t))return d(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||g(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function g(t,e){if(t){if("string"==typeof t)return d(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(t,e):void 0}}function d(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function p(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=g(t))||e){n&&(t=n);var r=0,i=function(){};return{s:i,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,s=!0,a=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return s=t.done,t},e:function(t){a=!0,o=t},f:function(){try{s||null==n.return||n.return()}finally{if(a)throw o}}}}var y=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"getEndCapStyle",value:function(){return this._endCapStyle}},{key:"isSingleSided",value:function(){return this._isSingleSided}},{key:"setQuadrantSegments",value:function(t){this._quadrantSegments=t,0===this._quadrantSegments&&(this._joinStyle=e.JOIN_BEVEL),this._quadrantSegments<0&&(this._joinStyle=e.JOIN_MITRE,this._mitreLimit=Math.abs(this._quadrantSegments)),t<=0&&(this._quadrantSegments=1),this._joinStyle!==e.JOIN_ROUND&&(this._quadrantSegments=e.DEFAULT_QUADRANT_SEGMENTS)}},{key:"getJoinStyle",value:function(){return this._joinStyle}},{key:"setJoinStyle",value:function(t){this._joinStyle=t}},{key:"setSimplifyFactor",value:function(t){this._simplifyFactor=t<0?0:t}},{key:"getSimplifyFactor",value:function(){return this._simplifyFactor}},{key:"getQuadrantSegments",value:function(){return this._quadrantSegments}},{key:"setEndCapStyle",value:function(t){this._endCapStyle=t}},{key:"getMitreLimit",value:function(){return this._mitreLimit}},{key:"setMitreLimit",value:function(t){this._mitreLimit=t}},{key:"setSingleSided",value:function(t){this._isSingleSided=t}}],[{key:"constructor_",value:function(){if(this._quadrantSegments=e.DEFAULT_QUADRANT_SEGMENTS,this._endCapStyle=e.CAP_ROUND,this._joinStyle=e.JOIN_ROUND,this._mitreLimit=e.DEFAULT_MITRE_LIMIT,this._isSingleSided=!1,this._simplifyFactor=e.DEFAULT_SIMPLIFY_FACTOR,0===arguments.length);else if(1===arguments.length){var t=arguments[0];this.setQuadrantSegments(t)}else if(2===arguments.length){var n=arguments[0],r=arguments[1];this.setQuadrantSegments(n),this.setEndCapStyle(r)}else if(4===arguments.length){var i=arguments[0],o=arguments[1],s=arguments[2],a=arguments[3];this.setQuadrantSegments(i),this.setEndCapStyle(o),this.setJoinStyle(s),this.setMitreLimit(a)}}},{key:"bufferDistanceError",value:function(t){var e=Math.PI/2/t;return 1-Math.cos(e/2)}}]),e}();y.CAP_ROUND=1,y.CAP_FLAT=2,y.CAP_SQUARE=3,y.JOIN_ROUND=1,y.JOIN_MITRE=2,y.JOIN_BEVEL=3,y.DEFAULT_QUADRANT_SEGMENTS=8,y.DEFAULT_MITRE_LIMIT=5,y.DEFAULT_SIMPLIFY_FACTOR=.01;var _=function(e){r(o,e);var i=c(o);function o(e){var n;return t(this,o),(n=i.call(this,e)).name=Object.keys({Exception:o})[0],n}return n(o,[{key:"toString",value:function(){return this.message}}]),o}(u(Error)),x=function(e){r(i,e);var n=c(i);function i(e){var r;return t(this,i),(r=n.call(this,e)).name=Object.keys({IllegalArgumentException:i})[0],r}return i}(_),E=function(){function e(){t(this,e)}return n(e,[{key:"filter",value:function(t){}}]),e}();function k(){}function w(){}function b(){}var I,N,S,M,L,P,C,T,O=function(){function e(){t(this,e)}return n(e,null,[{key:"equalsWithTolerance",value:function(t,e,n){return Math.abs(t-e)<=n}}]),e}(),R=function(){function e(n,r){t(this,e),this.low=r||0,this.high=n||0}return n(e,null,[{key:"toBinaryString",value:function(t){var e,n="";for(e=2147483648;e>0;e>>>=1)n+=(t.high&e)===e?"1":"0";for(e=2147483648;e>0;e>>>=1)n+=(t.low&e)===e?"1":"0";return n}}]),e}();function A(){}function D(){}A.NaN=NaN,A.isNaN=function(t){return Number.isNaN(t)},A.isInfinite=function(t){return!Number.isFinite(t)},A.MAX_VALUE=Number.MAX_VALUE,A.POSITIVE_INFINITY=Number.POSITIVE_INFINITY,A.NEGATIVE_INFINITY=Number.NEGATIVE_INFINITY,"function"==typeof Float64Array&&"function"==typeof Int32Array?(P=2146435072,C=new Float64Array(1),T=new Int32Array(C.buffer),A.doubleToLongBits=function(t){C[0]=t;var e=0|T[0],n=0|T[1];return(n&P)===P&&0!=(1048575&n)&&0!==e&&(e=0,n=2146959360),new R(n,e)},A.longBitsToDouble=function(t){return T[0]=t.low,T[1]=t.high,C[0]}):(I=1023,N=Math.log2,S=Math.floor,M=Math.pow,L=function(){for(var t=53;t>0;t--){var e=M(2,t)-1;if(S(N(e))+1===t)return e}return 0}(),A.doubleToLongBits=function(t){var e,n,r,i,o,s,a,u,l;if(t<0||1/t===Number.NEGATIVE_INFINITY?(s=1<<31,t=-t):s=0,0===t)return new R(u=s,l=0);if(t===1/0)return new R(u=2146435072|s,l=0);if(t!=t)return new R(u=2146959360,l=0);if(i=0,l=0,(e=S(t))>1)if(e<=L)(i=S(N(e)))<=20?(l=0,u=e<<20-i&1048575):(l=e%(n=M(2,r=i-20))<<32-r,u=e/n&1048575);else for(r=e,l=0;0!==(r=S(n=r/2));)i++,l>>>=1,l|=(1&u)<<31,u>>>=1,n!==r&&(u|=524288);if(a=i+I,o=0===e,e=t-e,i<52&&0!==e)for(r=0;;){if((n=2*e)>=1?(e=n-1,o?(a--,o=!1):(r<<=1,r|=1,i++)):(e=n,o?0==--a&&(i++,o=!1):(r<<=1,i++)),20===i)u|=r,r=0;else if(52===i){l|=r;break}if(1===n){i<20?u|=r<<20-i:i<52&&(l|=r<<52-i);break}}return u|=a<<20,new R(u|=s,l)},A.longBitsToDouble=function(t){var e,n,r,i,o=t.high,s=t.low,a=o&1<<31?-1:1;for(r=((2146435072&o)>>20)-I,i=0,n=1<<19,e=1;e<=20;e++)o&n&&(i+=M(2,-e)),n>>>=1;for(n=1<<31,e=21;e<=52;e++)s&n&&(i+=M(2,-e)),n>>>=1;if(-1023===r){if(0===i)return 0*a;r=-1022}else{if(1024===r)return 0===i?a/0:NaN;i+=1}return a*i*M(2,r)});var F=function(e){r(i,e);var n=c(i);function i(e){var r;return t(this,i),(r=n.call(this,e)).name=Object.keys({RuntimeException:i})[0],r}return i}(_),q=function(e){r(o,e);var i=c(o);function o(){var e;return t(this,o),e=i.call(this),o.constructor_.apply(l(e),arguments),e}return n(o,null,[{key:"constructor_",value:function(){if(0===arguments.length)F.constructor_.call(this);else if(1===arguments.length){var t=arguments[0];F.constructor_.call(this,t)}}}]),o}(F),G=function(){function e(){t(this,e)}return n(e,null,[{key:"shouldNeverReachHere",value:function(){if(0===arguments.length)e.shouldNeverReachHere(null);else if(1===arguments.length){var t=arguments[0];throw new q("Should never reach here"+(null!==t?": "+t:""))}}},{key:"isTrue",value:function(){if(1===arguments.length){var t=arguments[0];e.isTrue(t,null)}else if(2===arguments.length){var n=arguments[1];if(!arguments[0])throw null===n?new q:new q(n)}}},{key:"equals",value:function(){if(2===arguments.length){var t=arguments[0],n=arguments[1];e.equals(t,n,null)}else if(3===arguments.length){var r=arguments[0],i=arguments[1],o=arguments[2];if(!i.equals(r))throw new q("Expected "+r+" but encountered "+i+(null!==o?": "+o:""))}}}]),e}(),Y=new ArrayBuffer(8),B=new Float64Array(Y),z=new Int32Array(Y),j=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"getM",value:function(){return A.NaN}},{key:"setOrdinate",value:function(t,n){switch(t){case e.X:this.x=n;break;case e.Y:this.y=n;break;case e.Z:this.setZ(n);break;default:throw new x("Invalid ordinate index: "+t)}}},{key:"equals2D",value:function(){if(1===arguments.length){var t=arguments[0];return this.x===t.x&&this.y===t.y}if(2===arguments.length){var e=arguments[0],n=arguments[1];return!!O.equalsWithTolerance(this.x,e.x,n)&&!!O.equalsWithTolerance(this.y,e.y,n)}}},{key:"setM",value:function(t){throw new x("Invalid ordinate index: "+e.M)}},{key:"getZ",value:function(){return this.z}},{key:"getOrdinate",value:function(t){switch(t){case e.X:return this.x;case e.Y:return this.y;case e.Z:return this.getZ()}throw new x("Invalid ordinate index: "+t)}},{key:"equals3D",value:function(t){return this.x===t.x&&this.y===t.y&&(this.getZ()===t.getZ()||A.isNaN(this.getZ())&&A.isNaN(t.getZ()))}},{key:"equals",value:function(t){return t instanceof e&&this.equals2D(t)}},{key:"equalInZ",value:function(t,e){return O.equalsWithTolerance(this.getZ(),t.getZ(),e)}},{key:"setX",value:function(t){this.x=t}},{key:"compareTo",value:function(t){var e=t;return this.x<e.x?-1:this.x>e.x?1:this.y<e.y?-1:this.y>e.y?1:0}},{key:"getX",value:function(){return this.x}},{key:"setZ",value:function(t){this.z=t}},{key:"clone",value:function(){try{return null}catch(t){if(t instanceof CloneNotSupportedException)return G.shouldNeverReachHere("this shouldn't happen because this class is Cloneable"),null;throw t}}},{key:"copy",value:function(){return new e(this)}},{key:"toString",value:function(){return"("+this.x+", "+this.y+", "+this.getZ()+")"}},{key:"distance3D",value:function(t){var e=this.x-t.x,n=this.y-t.y,r=this.getZ()-t.getZ();return Math.sqrt(e*e+n*n+r*r)}},{key:"getY",value:function(){return this.y}},{key:"setY",value:function(t){this.y=t}},{key:"distance",value:function(t){var e=this.x-t.x,n=this.y-t.y;return Math.sqrt(e*e+n*n)}},{key:"hashCode",value:function(){var t=17;return 37*(t=37*t+e.hashCode(this.x))+e.hashCode(this.y)}},{key:"setCoordinate",value:function(t){this.x=t.x,this.y=t.y,this.z=t.getZ()}},{key:"interfaces_",get:function(){return[k,w,b]}}],[{key:"constructor_",value:function(){if(this.x=null,this.y=null,this.z=null,0===arguments.length)e.constructor_.call(this,0,0);else if(1===arguments.length){var t=arguments[0];e.constructor_.call(this,t.x,t.y,t.getZ())}else if(2===arguments.length){var n=arguments[0],r=arguments[1];e.constructor_.call(this,n,r,e.NULL_ORDINATE)}else if(3===arguments.length){var i=arguments[0],o=arguments[1],s=arguments[2];this.x=i,this.y=o,this.z=s}}},{key:"hashCode",value:function(t){return B[0]=t,z[0]^z[1]}}]),e}(),X=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"compare",value:function(t,n){var r=e.compare(t.x,n.x);if(0!==r)return r;var i=e.compare(t.y,n.y);return 0!==i?i:this._dimensionsToTest<=2?0:e.compare(t.getZ(),n.getZ())}},{key:"interfaces_",get:function(){return[D]}}],[{key:"constructor_",value:function(){if(this._dimensionsToTest=2,0===arguments.length)e.constructor_.call(this,2);else if(1===arguments.length){var t=arguments[0];if(2!==t&&3!==t)throw new x("only 2 or 3 dimensions may be specified");this._dimensionsToTest=t}}},{key:"compare",value:function(t,e){return t<e?-1:t>e?1:A.isNaN(t)?A.isNaN(e)?0:-1:A.isNaN(e)?1:0}}]),e}();j.DimensionalComparator=X,j.NULL_ORDINATE=A.NaN,j.X=0,j.Y=1,j.Z=2,j.M=3;var U=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"getArea",value:function(){return this.getWidth()*this.getHeight()}},{key:"equals",value:function(t){if(!(t instanceof e))return!1;var n=t;return this.isNull()?n.isNull():this._maxx===n.getMaxX()&&this._maxy===n.getMaxY()&&this._minx===n.getMinX()&&this._miny===n.getMinY()}},{key:"intersection",value:function(t){if(this.isNull()||t.isNull()||!this.intersects(t))return new e;var n=this._minx>t._minx?this._minx:t._minx,r=this._miny>t._miny?this._miny:t._miny;return new e(n,this._maxx<t._maxx?this._maxx:t._maxx,r,this._maxy<t._maxy?this._maxy:t._maxy)}},{key:"isNull",value:function(){return this._maxx<this._minx}},{key:"getMaxX",value:function(){return this._maxx}},{key:"covers",value:function(){if(1===arguments.length){if(arguments[0]instanceof j){var t=arguments[0];return this.covers(t.x,t.y)}if(arguments[0]instanceof e){var n=arguments[0];return!this.isNull()&&!n.isNull()&&n.getMinX()>=this._minx&&n.getMaxX()<=this._maxx&&n.getMinY()>=this._miny&&n.getMaxY()<=this._maxy}}else if(2===arguments.length){var r=arguments[0],i=arguments[1];return!this.isNull()&&r>=this._minx&&r<=this._maxx&&i>=this._miny&&i<=this._maxy}}},{key:"intersects",value:function(){if(1===arguments.length){if(arguments[0]instanceof e){var t=arguments[0];return!this.isNull()&&!t.isNull()&&!(t._minx>this._maxx||t._maxx<this._minx||t._miny>this._maxy||t._maxy<this._miny)}if(arguments[0]instanceof j){var n=arguments[0];return this.intersects(n.x,n.y)}}else if(2===arguments.length){if(arguments[0]instanceof j&&arguments[1]instanceof j){var r=arguments[0],i=arguments[1];return!(this.isNull()||(r.x<i.x?r.x:i.x)>this._maxx||(r.x>i.x?r.x:i.x)<this._minx||(r.y<i.y?r.y:i.y)>this._maxy||(r.y>i.y?r.y:i.y)<this._miny)}if("number"==typeof arguments[0]&&"number"==typeof arguments[1]){var o=arguments[0],s=arguments[1];return!this.isNull()&&!(o>this._maxx||o<this._minx||s>this._maxy||s<this._miny)}}}},{key:"getMinY",value:function(){return this._miny}},{key:"getDiameter",value:function(){if(this.isNull())return 0;var t=this.getWidth(),e=this.getHeight();return Math.sqrt(t*t+e*e)}},{key:"getMinX",value:function(){return this._minx}},{key:"expandToInclude",value:function(){if(1===arguments.length){if(arguments[0]instanceof j){var t=arguments[0];this.expandToInclude(t.x,t.y)}else if(arguments[0]instanceof e){var n=arguments[0];if(n.isNull())return null;this.isNull()?(this._minx=n.getMinX(),this._maxx=n.getMaxX(),this._miny=n.getMinY(),this._maxy=n.getMaxY()):(n._minx<this._minx&&(this._minx=n._minx),n._maxx>this._maxx&&(this._maxx=n._maxx),n._miny<this._miny&&(this._miny=n._miny),n._maxy>this._maxy&&(this._maxy=n._maxy))}}else if(2===arguments.length){var r=arguments[0],i=arguments[1];this.isNull()?(this._minx=r,this._maxx=r,this._miny=i,this._maxy=i):(r<this._minx&&(this._minx=r),r>this._maxx&&(this._maxx=r),i<this._miny&&(this._miny=i),i>this._maxy&&(this._maxy=i))}}},{key:"minExtent",value:function(){if(this.isNull())return 0;var t=this.getWidth(),e=this.getHeight();return t<e?t:e}},{key:"getWidth",value:function(){return this.isNull()?0:this._maxx-this._minx}},{key:"compareTo",value:function(t){var e=t;return this.isNull()?e.isNull()?0:-1:e.isNull()?1:this._minx<e._minx?-1:this._minx>e._minx?1:this._miny<e._miny?-1:this._miny>e._miny?1:this._maxx<e._maxx?-1:this._maxx>e._maxx?1:this._maxy<e._maxy?-1:this._maxy>e._maxy?1:0}},{key:"translate",value:function(t,e){if(this.isNull())return null;this.init(this.getMinX()+t,this.getMaxX()+t,this.getMinY()+e,this.getMaxY()+e)}},{key:"copy",value:function(){return new e(this)}},{key:"toString",value:function(){return"Env["+this._minx+" : "+this._maxx+", "+this._miny+" : "+this._maxy+"]"}},{key:"setToNull",value:function(){this._minx=0,this._maxx=-1,this._miny=0,this._maxy=-1}},{key:"disjoint",value:function(t){return!(!this.isNull()&&!t.isNull())||t._minx>this._maxx||t._maxx<this._minx||t._miny>this._maxy||t._maxy<this._miny}},{key:"getHeight",value:function(){return this.isNull()?0:this._maxy-this._miny}},{key:"maxExtent",value:function(){if(this.isNull())return 0;var t=this.getWidth(),e=this.getHeight();return t>e?t:e}},{key:"expandBy",value:function(){if(1===arguments.length){var t=arguments[0];this.expandBy(t,t)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];if(this.isNull())return null;this._minx-=e,this._maxx+=e,this._miny-=n,this._maxy+=n,(this._minx>this._maxx||this._miny>this._maxy)&&this.setToNull()}}},{key:"contains",value:function(){if(1===arguments.length){if(arguments[0]instanceof e){var t=arguments[0];return this.covers(t)}if(arguments[0]instanceof j){var n=arguments[0];return this.covers(n)}}else if(2===arguments.length){var r=arguments[0],i=arguments[1];return this.covers(r,i)}}},{key:"centre",value:function(){return this.isNull()?null:new j((this.getMinX()+this.getMaxX())/2,(this.getMinY()+this.getMaxY())/2)}},{key:"init",value:function(){if(0===arguments.length)this.setToNull();else if(1===arguments.length){if(arguments[0]instanceof j){var t=arguments[0];this.init(t.x,t.x,t.y,t.y)}else if(arguments[0]instanceof e){var n=arguments[0];this._minx=n._minx,this._maxx=n._maxx,this._miny=n._miny,this._maxy=n._maxy}}else if(2===arguments.length){var r=arguments[0],i=arguments[1];this.init(r.x,i.x,r.y,i.y)}else if(4===arguments.length){var o=arguments[0],s=arguments[1],a=arguments[2],u=arguments[3];o<s?(this._minx=o,this._maxx=s):(this._minx=s,this._maxx=o),a<u?(this._miny=a,this._maxy=u):(this._miny=u,this._maxy=a)}}},{key:"getMaxY",value:function(){return this._maxy}},{key:"distance",value:function(t){if(this.intersects(t))return 0;var e=0;this._maxx<t._minx?e=t._minx-this._maxx:this._minx>t._maxx&&(e=this._minx-t._maxx);var n=0;return this._maxy<t._miny?n=t._miny-this._maxy:this._miny>t._maxy&&(n=this._miny-t._maxy),0===e?n:0===n?e:Math.sqrt(e*e+n*n)}},{key:"hashCode",value:function(){var t=17;return 37*(t=37*(t=37*(t=37*t+j.hashCode(this._minx))+j.hashCode(this._maxx))+j.hashCode(this._miny))+j.hashCode(this._maxy)}},{key:"interfaces_",get:function(){return[k,b]}}],[{key:"constructor_",value:function(){if(this._minx=null,this._maxx=null,this._miny=null,this._maxy=null,0===arguments.length)this.init();else if(1===arguments.length){if(arguments[0]instanceof j){var t=arguments[0];this.init(t.x,t.x,t.y,t.y)}else if(arguments[0]instanceof e){var n=arguments[0];this.init(n)}}else if(2===arguments.length){var r=arguments[0],i=arguments[1];this.init(r.x,i.x,r.y,i.y)}else if(4===arguments.length){var o=arguments[0],s=arguments[1],a=arguments[2],u=arguments[3];this.init(o,s,a,u)}}},{key:"intersects",value:function(){if(3===arguments.length){var t=arguments[0],e=arguments[1],n=arguments[2];return n.x>=(t.x<e.x?t.x:e.x)&&n.x<=(t.x>e.x?t.x:e.x)&&n.y>=(t.y<e.y?t.y:e.y)&&n.y<=(t.y>e.y?t.y:e.y)}if(4===arguments.length){var r=arguments[0],i=arguments[1],o=arguments[2],s=arguments[3],a=Math.min(o.x,s.x),u=Math.max(o.x,s.x),l=Math.min(r.x,i.x),h=Math.max(r.x,i.x);return!(l>u||h<a||(a=Math.min(o.y,s.y),u=Math.max(o.y,s.y),l=Math.min(r.y,i.y),h=Math.max(r.y,i.y),l>u||h<a))}}}]),e}(),V=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"isGeometryCollection",value:function(){return this.getTypeCode()===e.TYPECODE_GEOMETRYCOLLECTION}},{key:"getFactory",value:function(){return this._factory}},{key:"getGeometryN",value:function(t){return this}},{key:"getArea",value:function(){return 0}},{key:"isRectangle",value:function(){return!1}},{key:"equalsExact",value:function(t){return this===t||this.equalsExact(t,0)}},{key:"geometryChanged",value:function(){this.apply(e.geometryChangedFilter)}},{key:"geometryChangedAction",value:function(){this._envelope=null}},{key:"equalsNorm",value:function(t){return null!==t&&this.norm().equalsExact(t.norm())}},{key:"getLength",value:function(){return 0}},{key:"getNumGeometries",value:function(){return 1}},{key:"compareTo",value:function(){var t;if(1===arguments.length){var e=arguments[0];return t=e,this.getTypeCode()!==t.getTypeCode()?this.getTypeCode()-t.getTypeCode():this.isEmpty()&&t.isEmpty()?0:this.isEmpty()?-1:t.isEmpty()?1:this.compareToSameClass(e)}if(2===arguments.length){var n=arguments[0],r=arguments[1];return t=n,this.getTypeCode()!==t.getTypeCode()?this.getTypeCode()-t.getTypeCode():this.isEmpty()&&t.isEmpty()?0:this.isEmpty()?-1:t.isEmpty()?1:this.compareToSameClass(n,r)}}},{key:"getUserData",value:function(){return this._userData}},{key:"getSRID",value:function(){return this._SRID}},{key:"getEnvelope",value:function(){return this.getFactory().toGeometry(this.getEnvelopeInternal())}},{key:"checkNotGeometryCollection",value:function(t){if(t.getTypeCode()===e.TYPECODE_GEOMETRYCOLLECTION)throw new x("This method does not support GeometryCollection arguments")}},{key:"equal",value:function(t,e,n){return 0===n?t.equals(e):t.distance(e)<=n}},{key:"norm",value:function(){var t=this.copy();return t.normalize(),t}},{key:"reverse",value:function(){var t=this.reverseInternal();return null!=this.envelope&&(t.envelope=this.envelope.copy()),t.setSRID(this.getSRID()),t}},{key:"copy",value:function(){var t=this.copyInternal();return t.envelope=null==this._envelope?null:this._envelope.copy(),t._SRID=this._SRID,t._userData=this._userData,t}},{key:"getPrecisionModel",value:function(){return this._factory.getPrecisionModel()}},{key:"getEnvelopeInternal",value:function(){return null===this._envelope&&(this._envelope=this.computeEnvelopeInternal()),new U(this._envelope)}},{key:"setSRID",value:function(t){this._SRID=t}},{key:"setUserData",value:function(t){this._userData=t}},{key:"compare",value:function(t,e){for(var n=t.iterator(),r=e.iterator();n.hasNext()&&r.hasNext();){var i=n.next(),o=r.next(),s=i.compareTo(o);if(0!==s)return s}return n.hasNext()?1:r.hasNext()?-1:0}},{key:"hashCode",value:function(){return this.getEnvelopeInternal().hashCode()}},{key:"isEquivalentClass",value:function(t){return this.getClass()===t.getClass()}},{key:"isGeometryCollectionOrDerived",value:function(){return this.getTypeCode()===e.TYPECODE_GEOMETRYCOLLECTION||this.getTypeCode()===e.TYPECODE_MULTIPOINT||this.getTypeCode()===e.TYPECODE_MULTILINESTRING||this.getTypeCode()===e.TYPECODE_MULTIPOLYGON}},{key:"interfaces_",get:function(){return[w,k,b]}},{key:"getClass",value:function(){return e}}],[{key:"hasNonEmptyElements",value:function(t){for(var e=0;e<t.length;e++)if(!t[e].isEmpty())return!0;return!1}},{key:"hasNullElements",value:function(t){for(var e=0;e<t.length;e++)if(null===t[e])return!0;return!1}}]),e}();V.constructor_=function(t){t&&(this._envelope=null,this._userData=null,this._factory=t,this._SRID=t.getSRID())},V.TYPECODE_POINT=0,V.TYPECODE_MULTIPOINT=1,V.TYPECODE_LINESTRING=2,V.TYPECODE_LINEARRING=3,V.TYPECODE_MULTILINESTRING=4,V.TYPECODE_POLYGON=5,V.TYPECODE_MULTIPOLYGON=6,V.TYPECODE_GEOMETRYCOLLECTION=7,V.TYPENAME_POINT="Point",V.TYPENAME_MULTIPOINT="MultiPoint",V.TYPENAME_LINESTRING="LineString",V.TYPENAME_LINEARRING="LinearRing",V.TYPENAME_MULTILINESTRING="MultiLineString",V.TYPENAME_POLYGON="Polygon",V.TYPENAME_MULTIPOLYGON="MultiPolygon",V.TYPENAME_GEOMETRYCOLLECTION="GeometryCollection",V.geometryChangedFilter={get interfaces_(){return[E]},filter:function(t){t.geometryChangedAction()}};var Z=function(){function e(){t(this,e)}return n(e,null,[{key:"toLocationSymbol",value:function(t){switch(t){case e.EXTERIOR:return"e";case e.BOUNDARY:return"b";case e.INTERIOR:return"i";case e.NONE:return"-"}throw new x("Unknown location value: "+t)}}]),e}();Z.INTERIOR=0,Z.BOUNDARY=1,Z.EXTERIOR=2,Z.NONE=-1;var H=function(){function e(){t(this,e)}return n(e,[{key:"add",value:function(){}},{key:"addAll",value:function(){}},{key:"isEmpty",value:function(){}},{key:"iterator",value:function(){}},{key:"size",value:function(){}},{key:"toArray",value:function(){}},{key:"remove",value:function(){}}]),e}(),W=function(e){r(i,e);var n=c(i);function i(e){var r;return t(this,i),(r=n.call(this,e)).name=Object.keys({NoSuchElementException:i})[0],r}return i}(_),J=function(e){r(i,e);var n=c(i);function i(e){var r;return t(this,i),(r=n.call(this,e)).name=Object.keys({UnsupportedOperationException:i})[0],r}return i}(_),K=function(e){r(o,e);var i=c(o);function o(){return t(this,o),i.apply(this,arguments)}return n(o,[{key:"contains",value:function(){}}]),o}(H),Q=function(e,i){r(s,e);var o=c(s);function s(e){var n;return t(this,s),(n=o.call(this)).map=new Map,e instanceof H&&n.addAll(e),n}return n(s,[{key:"contains",value:function(t){var e=t.hashCode?t.hashCode():t;return!!this.map.has(e)}},{key:"add",value:function(t){var e=t.hashCode?t.hashCode():t;return!this.map.has(e)&&!!this.map.set(e,t)}},{key:"addAll",value:function(t){var e,n=p(t);try{for(n.s();!(e=n.n()).done;){var r=e.value;this.add(r)}}catch(t){n.e(t)}finally{n.f()}return!0}},{key:"remove",value:function(){throw new J}},{key:"size",value:function(){return this.map.size}},{key:"isEmpty",value:function(){return 0===this.map.size}},{key:"toArray",value:function(){return Array.from(this.map.values())}},{key:"iterator",value:function(){return new $(this.map)}},{key:i,value:function(){return this.map}}]),s}(K,Symbol.iterator),$=function(){function e(n){t(this,e),this.iterator=n.values();var r=this.iterator.next(),i=r.done,o=r.value;this.done=i,this.value=o}return n(e,[{key:"next",value:function(){if(this.done)throw new W;var t=this.value,e=this.iterator.next(),n=e.done,r=e.value;return this.done=n,this.value=r,t}},{key:"hasNext",value:function(){return!this.done}},{key:"remove",value:function(){throw new J}}]),e}(),tt=function(){function e(){t(this,e)}return n(e,null,[{key:"opposite",value:function(t){return t===e.LEFT?e.RIGHT:t===e.RIGHT?e.LEFT:t}}]),e}();tt.ON=0,tt.LEFT=1,tt.RIGHT=2;var et=function(e){r(i,e);var n=c(i);function i(e){var r;return t(this,i),(r=n.call(this,e)).name=Object.keys({EmptyStackException:i})[0],r}return i}(_),nt=function(e){r(i,e);var n=c(i);function i(e){var r;return t(this,i),(r=n.call(this,e)).name=Object.keys({IndexOutOfBoundsException:i})[0],r}return i}(_),rt=function(e){r(o,e);var i=c(o);function o(){return t(this,o),i.apply(this,arguments)}return n(o,[{key:"get",value:function(){}},{key:"set",value:function(){}},{key:"isEmpty",value:function(){}}]),o}(H),it=function(e){r(o,e);var i=c(o);function o(){var e;return t(this,o),(e=i.call(this)).array=[],e}return n(o,[{key:"add",value:function(t){return this.array.push(t),!0}},{key:"get",value:function(t){if(t<0||t>=this.size())throw new nt;return this.array[t]}},{key:"push",value:function(t){return this.array.push(t),t}},{key:"pop",value:function(){if(0===this.array.length)throw new et;return this.array.pop()}},{key:"peek",value:function(){if(0===this.array.length)throw new et;return this.array[this.array.length-1]}},{key:"empty",value:function(){return 0===this.array.length}},{key:"isEmpty",value:function(){return this.empty()}},{key:"search",value:function(t){return this.array.indexOf(t)}},{key:"size",value:function(){return this.array.length}},{key:"toArray",value:function(){return this.array.slice()}}]),o}(rt);function ot(t,e){return t.interfaces_&&t.interfaces_.indexOf(e)>-1}var st=function(){function e(n){t(this,e),this.str=n}return n(e,[{key:"append",value:function(t){this.str+=t}},{key:"setCharAt",value:function(t,e){this.str=this.str.substr(0,t)+e+this.str.substr(t+1)}},{key:"toString",value:function(){return this.str}}]),e}(),at=function(){function e(n){t(this,e),this.value=n}return n(e,[{key:"intValue",value:function(){return this.value}},{key:"compareTo",value:function(t){return this.value<t?-1:this.value>t?1:0}}],[{key:"compare",value:function(t,e){return t<e?-1:t>e?1:0}},{key:"isNan",value:function(t){return Number.isNaN(t)}},{key:"valueOf",value:function(t){return new e(t)}}]),e}(),ut=function(){function e(){t(this,e)}return n(e,null,[{key:"isWhitespace",value:function(t){return t<=32&&t>=0||127===t}},{key:"toUpperCase",value:function(t){return t.toUpperCase()}}]),e}(),lt=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"le",value:function(t){return this._hi<t._hi||this._hi===t._hi&&this._lo<=t._lo}},{key:"extractSignificantDigits",value:function(t,n){var r=this.abs(),i=e.magnitude(r._hi),o=e.TEN.pow(i);(r=r.divide(o)).gt(e.TEN)?(r=r.divide(e.TEN),i+=1):r.lt(e.ONE)&&(r=r.multiply(e.TEN),i-=1);for(var s=i+1,a=new st,u=e.MAX_PRINT_DIGITS-1,l=0;l<=u;l++){t&&l===s&&a.append(".");var h=Math.trunc(r._hi);if(h<0)break;var c=!1,f=0;h>9?(c=!0,f="9"):f="0"+h,a.append(f),r=r.subtract(e.valueOf(h)).multiply(e.TEN),c&&r.selfAdd(e.TEN);var v=!0,g=e.magnitude(r._hi);if(g<0&&Math.abs(g)>=u-l&&(v=!1),!v)break}return n[0]=i,a.toString()}},{key:"sqr",value:function(){return this.multiply(this)}},{key:"doubleValue",value:function(){return this._hi+this._lo}},{key:"subtract",value:function(){if(arguments[0]instanceof e){var t=arguments[0];return this.add(t.negate())}if("number"==typeof arguments[0]){var n=arguments[0];return this.add(-n)}}},{key:"equals",value:function(){if(1===arguments.length&&arguments[0]instanceof e){var t=arguments[0];return this._hi===t._hi&&this._lo===t._lo}}},{key:"isZero",value:function(){return 0===this._hi&&0===this._lo}},{key:"selfSubtract",value:function(){if(arguments[0]instanceof e){var t=arguments[0];return this.isNaN()?this:this.selfAdd(-t._hi,-t._lo)}if("number"==typeof arguments[0]){var n=arguments[0];return this.isNaN()?this:this.selfAdd(-n,0)}}},{key:"getSpecialNumberString",value:function(){return this.isZero()?"0.0":this.isNaN()?"NaN ":null}},{key:"min",value:function(t){return this.le(t)?this:t}},{key:"selfDivide",value:function(){if(1===arguments.length){if(arguments[0]instanceof e){var t=arguments[0];return this.selfDivide(t._hi,t._lo)}if("number"==typeof arguments[0]){var n=arguments[0];return this.selfDivide(n,0)}}else if(2===arguments.length){var r=arguments[0],i=arguments[1],o=null,s=null,a=null,u=null,l=null,h=null,c=null,f=null;return l=this._hi/r,f=(o=(h=e.SPLIT*l)-(o=h-l))*(a=(f=e.SPLIT*r)-(a=f-r))-(c=l*r)+o*(u=r-a)+(s=l-o)*a+s*u,f=l+(h=(this._hi-c-f+this._lo-l*i)/r),this._hi=f,this._lo=l-f+h,this}}},{key:"dump",value:function(){return"DD<"+this._hi+", "+this._lo+">"}},{key:"divide",value:function(){if(arguments[0]instanceof e){var t=arguments[0],n=null,r=null,i=null,o=null,s=null,a=null,u=null,l=null;return r=(s=this._hi/t._hi)-(n=(a=e.SPLIT*s)-(n=a-s)),l=n*(i=(l=e.SPLIT*t._hi)-(i=l-t._hi))-(u=s*t._hi)+n*(o=t._hi-i)+r*i+r*o,new e(l=s+(a=(this._hi-u-l+this._lo-s*t._lo)/t._hi),s-l+a)}if("number"==typeof arguments[0]){var h=arguments[0];return A.isNaN(h)?e.createNaN():e.copy(this).selfDivide(h,0)}}},{key:"ge",value:function(t){return this._hi>t._hi||this._hi===t._hi&&this._lo>=t._lo}},{key:"pow",value:function(t){if(0===t)return e.valueOf(1);var n=new e(this),r=e.valueOf(1),i=Math.abs(t);if(i>1)for(;i>0;)i%2==1&&r.selfMultiply(n),(i/=2)>0&&(n=n.sqr());else r=n;return t<0?r.reciprocal():r}},{key:"ceil",value:function(){if(this.isNaN())return e.NaN;var t=Math.ceil(this._hi),n=0;return t===this._hi&&(n=Math.ceil(this._lo)),new e(t,n)}},{key:"compareTo",value:function(t){var e=t;return this._hi<e._hi?-1:this._hi>e._hi?1:this._lo<e._lo?-1:this._lo>e._lo?1:0}},{key:"rint",value:function(){return this.isNaN()?this:this.add(.5).floor()}},{key:"setValue",value:function(){if(arguments[0]instanceof e){var t=arguments[0];return this.init(t),this}if("number"==typeof arguments[0]){var n=arguments[0];return this.init(n),this}}},{key:"max",value:function(t){return this.ge(t)?this:t}},{key:"sqrt",value:function(){if(this.isZero())return e.valueOf(0);if(this.isNegative())return e.NaN;var t=1/Math.sqrt(this._hi),n=this._hi*t,r=e.valueOf(n),i=this.subtract(r.sqr())._hi*(.5*t);return r.add(i)}},{key:"selfAdd",value:function(){if(1===arguments.length){if(arguments[0]instanceof e){var t=arguments[0];return this.selfAdd(t._hi,t._lo)}if("number"==typeof arguments[0]){var n=arguments[0],r=null,i=null,o=null,s=null,a=null,u=null;return s=(o=this._hi+n)-(a=o-this._hi),i=(u=(s=n-a+(this._hi-s))+this._lo)+(o-(r=o+u)),this._hi=r+i,this._lo=i+(r-this._hi),this}}else if(2===arguments.length){var l=arguments[0],h=arguments[1],c=null,f=null,v=null,g=null,d=null,p=null,y=null;g=this._hi+l,f=this._lo+h,d=g-(p=g-this._hi),v=f-(y=f-this._lo);var m=(c=g+(p=(d=l-p+(this._hi-d))+f))+(p=(v=h-y+(this._lo-v))+(p+(g-c))),_=p+(c-m);return this._hi=m,this._lo=_,this}}},{key:"selfMultiply",value:function(){if(1===arguments.length){if(arguments[0]instanceof e){var t=arguments[0];return this.selfMultiply(t._hi,t._lo)}if("number"==typeof arguments[0]){var n=arguments[0];return this.selfMultiply(n,0)}}else if(2===arguments.length){var r=arguments[0],i=arguments[1],o=null,s=null,a=null,u=null,l=null,h=null;o=(l=e.SPLIT*this._hi)-this._hi,h=e.SPLIT*r,o=l-o,s=this._hi-o,a=h-r;var c=(l=this._hi*r)+(h=o*(a=h-a)-l+o*(u=r-a)+s*a+s*u+(this._hi*i+this._lo*r)),f=h+(o=l-c);return this._hi=c,this._lo=f,this}}},{key:"selfSqr",value:function(){return this.selfMultiply(this)}},{key:"floor",value:function(){if(this.isNaN())return e.NaN;var t=Math.floor(this._hi),n=0;return t===this._hi&&(n=Math.floor(this._lo)),new e(t,n)}},{key:"negate",value:function(){return this.isNaN()?this:new e(-this._hi,-this._lo)}},{key:"clone",value:function(){try{return null}catch(t){if(t instanceof CloneNotSupportedException)return null;throw t}}},{key:"multiply",value:function(){if(arguments[0]instanceof e){var t=arguments[0];return t.isNaN()?e.createNaN():e.copy(this).selfMultiply(t)}if("number"==typeof arguments[0]){var n=arguments[0];return A.isNaN(n)?e.createNaN():e.copy(this).selfMultiply(n,0)}}},{key:"isNaN",value:function(){return A.isNaN(this._hi)}},{key:"intValue",value:function(){return Math.trunc(this._hi)}},{key:"toString",value:function(){var t=e.magnitude(this._hi);return t>=-3&&t<=20?this.toStandardNotation():this.toSciNotation()}},{key:"toStandardNotation",value:function(){var t=this.getSpecialNumberString();if(null!==t)return t;var n=new Array(1).fill(null),r=this.extractSignificantDigits(!0,n),i=n[0]+1,o=r;if("."===r.charAt(0))o="0"+r;else if(i<0)o="0."+e.stringOfChar("0",-i)+r;else if(-1===r.indexOf(".")){var s=i-r.length;o=r+e.stringOfChar("0",s)+".0"}return this.isNegative()?"-"+o:o}},{key:"reciprocal",value:function(){var t,n,r,i,o=null,s=null,a=null,u=null;t=(r=1/this._hi)-(o=(a=e.SPLIT*r)-(o=a-r)),s=(u=e.SPLIT*this._hi)-this._hi;var l=r+(a=(1-(i=r*this._hi)-(u=o*(s=u-s)-i+o*(n=this._hi-s)+t*s+t*n)-r*this._lo)/this._hi);return new e(l,r-l+a)}},{key:"toSciNotation",value:function(){if(this.isZero())return e.SCI_NOT_ZERO;var t=this.getSpecialNumberString();if(null!==t)return t;var n=new Array(1).fill(null),r=this.extractSignificantDigits(!1,n),i=e.SCI_NOT_EXPONENT_CHAR+n[0];if("0"===r.charAt(0))throw new IllegalStateException("Found leading zero: "+r);var o="";r.length>1&&(o=r.substring(1));var s=r.charAt(0)+"."+o;return this.isNegative()?"-"+s+i:s+i}},{key:"abs",value:function(){return this.isNaN()?e.NaN:this.isNegative()?this.negate():new e(this)}},{key:"isPositive",value:function(){return this._hi>0||0===this._hi&&this._lo>0}},{key:"lt",value:function(t){return this._hi<t._hi||this._hi===t._hi&&this._lo<t._lo}},{key:"add",value:function(){if(arguments[0]instanceof e){var t=arguments[0];return e.copy(this).selfAdd(t)}if("number"==typeof arguments[0]){var n=arguments[0];return e.copy(this).selfAdd(n)}}},{key:"init",value:function(){if(1===arguments.length){if("number"==typeof arguments[0]){var t=arguments[0];this._hi=t,this._lo=0}else if(arguments[0]instanceof e){var n=arguments[0];this._hi=n._hi,this._lo=n._lo}}else if(2===arguments.length){var r=arguments[0],i=arguments[1];this._hi=r,this._lo=i}}},{key:"gt",value:function(t){return this._hi>t._hi||this._hi===t._hi&&this._lo>t._lo}},{key:"isNegative",value:function(){return this._hi<0||0===this._hi&&this._lo<0}},{key:"trunc",value:function(){return this.isNaN()?e.NaN:this.isPositive()?this.floor():this.ceil()}},{key:"signum",value:function(){return this._hi>0?1:this._hi<0?-1:this._lo>0?1:this._lo<0?-1:0}},{key:"interfaces_",get:function(){return[b,k,w]}}],[{key:"constructor_",value:function(){if(this._hi=0,this._lo=0,0===arguments.length)this.init(0);else if(1===arguments.length){if("number"==typeof arguments[0]){var t=arguments[0];this.init(t)}else if(arguments[0]instanceof e){var n=arguments[0];this.init(n)}else if("string"==typeof arguments[0]){var r=arguments[0];e.constructor_.call(this,e.parse(r))}}else if(2===arguments.length){var i=arguments[0],o=arguments[1];this.init(i,o)}}},{key:"determinant",value:function(){if("number"==typeof arguments[3]&&"number"==typeof arguments[2]&&"number"==typeof arguments[0]&&"number"==typeof arguments[1]){var t=arguments[0],n=arguments[1],r=arguments[2],i=arguments[3];return e.determinant(e.valueOf(t),e.valueOf(n),e.valueOf(r),e.valueOf(i))}if(arguments[3]instanceof e&&arguments[2]instanceof e&&arguments[0]instanceof e&&arguments[1]instanceof e){var o=arguments[1],s=arguments[2],a=arguments[3];return arguments[0].multiply(a).selfSubtract(o.multiply(s))}}},{key:"sqr",value:function(t){return e.valueOf(t).selfMultiply(t)}},{key:"valueOf",value:function(){if("string"==typeof arguments[0]){var t=arguments[0];return e.parse(t)}if("number"==typeof arguments[0])return new e(arguments[0])}},{key:"sqrt",value:function(t){return e.valueOf(t).sqrt()}},{key:"parse",value:function(t){for(var n=0,r=t.length;ut.isWhitespace(t.charAt(n));)n++;var i=!1;if(n<r){var o=t.charAt(n);"-"!==o&&"+"!==o||(n++,"-"===o&&(i=!0))}for(var s=new e,a=0,u=0,l=0,h=!1;!(n>=r);){var c=t.charAt(n);if(n++,ut.isDigit(c)){var f=c-"0";s.selfMultiply(e.TEN),s.selfAdd(f),a++}else{if("."!==c){if("e"===c||"E"===c){var v=t.substring(n);try{l=at.parseInt(v)}catch(e){throw e instanceof NumberFormatException?new NumberFormatException("Invalid exponent "+v+" in string "+t):e}break}throw new NumberFormatException("Unexpected character '"+c+"' at position "+n+" in string "+t)}u=a,h=!0}}var g=s;h||(u=a);var d=a-u-l;if(0===d)g=s;else if(d>0){var p=e.TEN.pow(d);g=s.divide(p)}else if(d<0){var y=e.TEN.pow(-d);g=s.multiply(y)}return i?g.negate():g}},{key:"createNaN",value:function(){return new e(A.NaN,A.NaN)}},{key:"copy",value:function(t){return new e(t)}},{key:"magnitude",value:function(t){var e=Math.abs(t),n=Math.log(e)/Math.log(10),r=Math.trunc(Math.floor(n));return 10*Math.pow(10,r)<=e&&(r+=1),r}},{key:"stringOfChar",value:function(t,e){for(var n=new st,r=0;r<e;r++)n.append(t);return n.toString()}}]),e}();lt.PI=new lt(3.141592653589793,12246467991473532e-32),lt.TWO_PI=new lt(6.283185307179586,24492935982947064e-32),lt.PI_2=new lt(1.5707963267948966,6123233995736766e-32),lt.E=new lt(2.718281828459045,14456468917292502e-32),lt.NaN=new lt(A.NaN,A.NaN),lt.EPS=123259516440783e-46,lt.SPLIT=134217729,lt.MAX_PRINT_DIGITS=32,lt.TEN=lt.valueOf(10),lt.ONE=lt.valueOf(1),lt.SCI_NOT_EXPONENT_CHAR="E",lt.SCI_NOT_ZERO="0.0E0";var ht=function(){function e(){t(this,e)}return n(e,null,[{key:"orientationIndex",value:function(t,n,r){var i=e.orientationIndexFilter(t,n,r);if(i<=1)return i;var o=lt.valueOf(n.x).selfAdd(-t.x),s=lt.valueOf(n.y).selfAdd(-t.y),a=lt.valueOf(r.x).selfAdd(-n.x),u=lt.valueOf(r.y).selfAdd(-n.y);return o.selfMultiply(u).selfSubtract(s.selfMultiply(a)).signum()}},{key:"signOfDet2x2",value:function(){if(arguments[3]instanceof lt&&arguments[2]instanceof lt&&arguments[0]instanceof lt&&arguments[1]instanceof lt){var t=arguments[1],e=arguments[2],n=arguments[3];return arguments[0].multiply(n).selfSubtract(t.multiply(e)).signum()}if("number"==typeof arguments[3]&&"number"==typeof arguments[2]&&"number"==typeof arguments[0]&&"number"==typeof arguments[1]){var r=arguments[0],i=arguments[1],o=arguments[2],s=arguments[3],a=lt.valueOf(r),u=lt.valueOf(i),l=lt.valueOf(o),h=lt.valueOf(s);return a.multiply(h).selfSubtract(u.multiply(l)).signum()}}},{key:"intersection",value:function(t,e,n,r){var i=new lt(t.y).selfSubtract(e.y),o=new lt(e.x).selfSubtract(t.x),s=new lt(t.x).selfMultiply(e.y).selfSubtract(new lt(e.x).selfMultiply(t.y)),a=new lt(n.y).selfSubtract(r.y),u=new lt(r.x).selfSubtract(n.x),l=new lt(n.x).selfMultiply(r.y).selfSubtract(new lt(r.x).selfMultiply(n.y)),h=o.multiply(l).selfSubtract(u.multiply(s)),c=a.multiply(s).selfSubtract(i.multiply(l)),f=i.multiply(u).selfSubtract(a.multiply(o)),v=h.selfDivide(f).doubleValue(),g=c.selfDivide(f).doubleValue();return A.isNaN(v)||A.isInfinite(v)||A.isNaN(g)||A.isInfinite(g)?null:new j(v,g)}},{key:"orientationIndexFilter",value:function(t,n,r){var i=null,o=(t.x-r.x)*(n.y-r.y),s=(t.y-r.y)*(n.x-r.x),a=o-s;if(o>0){if(s<=0)return e.signum(a);i=o+s}else{if(!(o<0))return e.signum(a);if(s>=0)return e.signum(a);i=-o-s}var u=e.DP_SAFE_EPSILON*i;return a>=u||-a>=u?e.signum(a):2}},{key:"signum",value:function(t){return t>0?1:t<0?-1:0}}]),e}();ht.DP_SAFE_EPSILON=1e-15;var ct=function(){function e(){t(this,e)}return n(e,[{key:"getM",value:function(t){if(this.hasM()){var e=this.getDimension()-this.getMeasures();return this.getOrdinate(t,e)}return A.NaN}},{key:"setOrdinate",value:function(t,e,n){}},{key:"getZ",value:function(t){return this.hasZ()?this.getOrdinate(t,2):A.NaN}},{key:"size",value:function(){}},{key:"getOrdinate",value:function(t,e){}},{key:"getCoordinate",value:function(){}},{key:"getCoordinateCopy",value:function(t){}},{key:"createCoordinate",value:function(){}},{key:"getDimension",value:function(){}},{key:"hasM",value:function(){return this.getMeasures()>0}},{key:"getX",value:function(t){}},{key:"hasZ",value:function(){return this.getDimension()-this.getMeasures()>2}},{key:"getMeasures",value:function(){return 0}},{key:"expandEnvelope",value:function(t){}},{key:"copy",value:function(){}},{key:"getY",value:function(t){}},{key:"toCoordinateArray",value:function(){}},{key:"interfaces_",get:function(){return[w]}}]),e}();ct.X=0,ct.Y=1,ct.Z=2,ct.M=3;var ft=function(){function e(){t(this,e)}return n(e,null,[{key:"index",value:function(t,e,n){return ht.orientationIndex(t,e,n)}},{key:"isCCW",value:function(){if(arguments[0]instanceof Array){var t=arguments[0],n=t.length-1;if(n<3)throw new x("Ring has fewer than 4 points, so orientation cannot be determined");for(var r=t[0],i=0,o=1;o<=n;o++){var s=t[o];s.y>r.y&&(r=s,i=o)}var a=i;do{(a-=1)<0&&(a=n)}while(t[a].equals2D(r)&&a!==i);var u=i;do{u=(u+1)%n}while(t[u].equals2D(r)&&u!==i);var l=t[a],h=t[u];if(l.equals2D(r)||h.equals2D(r)||l.equals2D(h))return!1;var c=e.index(l,r,h);return 0===c?l.x>h.x:c>0}if(ot(arguments[0],ct)){var f=arguments[0],v=f.size()-1;if(v<3)throw new x("Ring has fewer than 4 points, so orientation cannot be determined");for(var g=f.getCoordinate(0),d=0,p=1;p<=v;p++){var y=f.getCoordinate(p);y.y>g.y&&(g=y,d=p)}var m=null,_=d;do{(_-=1)<0&&(_=v),m=f.getCoordinate(_)}while(m.equals2D(g)&&_!==d);var E=null,k=d;do{k=(k+1)%v,E=f.getCoordinate(k)}while(E.equals2D(g)&&k!==d);if(m.equals2D(g)||E.equals2D(g)||m.equals2D(E))return!1;var w=e.index(m,g,E);return 0===w?m.x>E.x:w>0}}}]),e}();ft.CLOCKWISE=-1,ft.RIGHT=ft.CLOCKWISE,ft.COUNTERCLOCKWISE=1,ft.LEFT=ft.COUNTERCLOCKWISE,ft.COLLINEAR=0,ft.STRAIGHT=ft.COLLINEAR;var vt=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"getCoordinate",value:function(){return this._minCoord}},{key:"getRightmostSide",value:function(t,e){var n=this.getRightmostSideOfSegment(t,e);return n<0&&(n=this.getRightmostSideOfSegment(t,e-1)),n<0&&(this._minCoord=null,this.checkForRightmostCoordinate(t)),n}},{key:"findRightmostEdgeAtVertex",value:function(){var t=this._minDe.getEdge().getCoordinates();G.isTrue(this._minIndex>0&&this._minIndex<t.length,"rightmost point expected to be interior vertex of edge");var e=t[this._minIndex-1],n=t[this._minIndex+1],r=ft.index(this._minCoord,n,e),i=!1;(e.y<this._minCoord.y&&n.y<this._minCoord.y&&r===ft.COUNTERCLOCKWISE||e.y>this._minCoord.y&&n.y>this._minCoord.y&&r===ft.CLOCKWISE)&&(i=!0),i&&(this._minIndex=this._minIndex-1)}},{key:"getRightmostSideOfSegment",value:function(t,e){var n=t.getEdge().getCoordinates();if(e<0||e+1>=n.length)return-1;if(n[e].y===n[e+1].y)return-1;var r=tt.LEFT;return n[e].y<n[e+1].y&&(r=tt.RIGHT),r}},{key:"getEdge",value:function(){return this._orientedDe}},{key:"checkForRightmostCoordinate",value:function(t){for(var e=t.getEdge().getCoordinates(),n=0;n<e.length-1;n++)(null===this._minCoord||e[n].x>this._minCoord.x)&&(this._minDe=t,this._minIndex=n,this._minCoord=e[n])}},{key:"findRightmostEdgeAtNode",value:function(){var t=this._minDe.getNode().getEdges();this._minDe=t.getRightmostEdge(),this._minDe.isForward()||(this._minDe=this._minDe.getSym(),this._minIndex=this._minDe.getEdge().getCoordinates().length-1)}},{key:"findEdge",value:function(t){for(var e=t.iterator();e.hasNext();){var n=e.next();n.isForward()&&this.checkForRightmostCoordinate(n)}G.isTrue(0!==this._minIndex||this._minCoord.equals(this._minDe.getCoordinate()),"inconsistency in rightmost processing"),0===this._minIndex?this.findRightmostEdgeAtNode():this.findRightmostEdgeAtVertex(),this._orientedDe=this._minDe,this.getRightmostSide(this._minDe,this._minIndex)===tt.LEFT&&(this._orientedDe=this._minDe.getSym())}}],[{key:"constructor_",value:function(){this._minIndex=-1,this._minCoord=null,this._minDe=null,this._orientedDe=null}}]),e}(),gt=function(e){r(o,e);var i=c(o);function o(e,n){var r;return t(this,o),(r=i.call(this,n?e+" [ "+n+" ]":e)).pt=n?new j(n):void 0,r.name=Object.keys({TopologyException:o})[0],r}return n(o,[{key:"getCoordinate",value:function(){return this.pt}}]),o}(F),dt=function(){function e(){t(this,e),this.array=[]}return n(e,[{key:"addLast",value:function(t){this.array.push(t)}},{key:"removeFirst",value:function(){return this.array.shift()}},{key:"isEmpty",value:function(){return 0===this.array.length}}]),e}(),pt=function(e,i){r(s,e);var o=c(s);function s(e){var n;return t(this,s),(n=o.call(this)).array=[],e instanceof H&&n.addAll(e),n}return n(s,[{key:"interfaces_",get:function(){return[rt,H]}},{key:"ensureCapacity",value:function(){}},{key:"add",value:function(t){return 1===arguments.length?this.array.push(t):this.array.splice(arguments[0],0,arguments[1]),!0}},{key:"clear",value:function(){this.array=[]}},{key:"addAll",value:function(t){var e,n=p(t);try{for(n.s();!(e=n.n()).done;){var r=e.value;this.array.push(r)}}catch(t){n.e(t)}finally{n.f()}}},{key:"set",value:function(t,e){var n=this.array[t];return this.array[t]=e,n}},{key:"iterator",value:function(){return new yt(this)}},{key:"get",value:function(t){if(t<0||t>=this.size())throw new nt;return this.array[t]}},{key:"isEmpty",value:function(){return 0===this.array.length}},{key:"sort",value:function(t){t?this.array.sort((function(e,n){return t.compare(e,n)})):this.array.sort()}},{key:"size",value:function(){return this.array.length}},{key:"toArray",value:function(){return this.array.slice()}},{key:"remove",value:function(t){for(var e=0,n=this.array.length;e<n;e++)if(this.array[e]===t)return!!this.array.splice(e,1);return!1}},{key:i,value:function(){return this.array.values()}}]),s}(rt,Symbol.iterator),yt=function(){function e(n){t(this,e),this.arrayList=n,this.position=0}return n(e,[{key:"next",value:function(){if(this.position===this.arrayList.size())throw new W;return this.arrayList.get(this.position++)}},{key:"hasNext",value:function(){return this.position<this.arrayList.size()}},{key:"set",value:function(t){return this.arrayList.set(this.position-1,t)}},{key:"remove",value:function(){this.arrayList.remove(this.arrayList.get(this.position))}}]),e}(),mt=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"clearVisitedEdges",value:function(){for(var t=this._dirEdgeList.iterator();t.hasNext();)t.next().setVisited(!1)}},{key:"getRightmostCoordinate",value:function(){return this._rightMostCoord}},{key:"computeNodeDepth",value:function(t){for(var e=null,n=t.getEdges().iterator();n.hasNext();){var r=n.next();if(r.isVisited()||r.getSym().isVisited()){e=r;break}}if(null===e)throw new gt("unable to find edge to compute depths at "+t.getCoordinate());t.getEdges().computeDepths(e);for(var i=t.getEdges().iterator();i.hasNext();){var o=i.next();o.setVisited(!0),this.copySymDepths(o)}}},{key:"computeDepth",value:function(t){this.clearVisitedEdges();var e=this._finder.getEdge();e.getNode(),e.getLabel(),e.setEdgeDepths(tt.RIGHT,t),this.copySymDepths(e),this.computeDepths(e)}},{key:"create",value:function(t){this.addReachable(t),this._finder.findEdge(this._dirEdgeList),this._rightMostCoord=this._finder.getCoordinate()}},{key:"findResultEdges",value:function(){for(var t=this._dirEdgeList.iterator();t.hasNext();){var e=t.next();e.getDepth(tt.RIGHT)>=1&&e.getDepth(tt.LEFT)<=0&&!e.isInteriorAreaEdge()&&e.setInResult(!0)}}},{key:"computeDepths",value:function(t){var e=new Q,n=new dt,r=t.getNode();for(n.addLast(r),e.add(r),t.setVisited(!0);!n.isEmpty();){var i=n.removeFirst();e.add(i),this.computeNodeDepth(i);for(var o=i.getEdges().iterator();o.hasNext();){var s=o.next().getSym();if(!s.isVisited()){var a=s.getNode();e.contains(a)||(n.addLast(a),e.add(a))}}}}},{key:"compareTo",value:function(t){var e=t;return this._rightMostCoord.x<e._rightMostCoord.x?-1:this._rightMostCoord.x>e._rightMostCoord.x?1:0}},{key:"getEnvelope",value:function(){if(null===this._env){for(var t=new U,e=this._dirEdgeList.iterator();e.hasNext();)for(var n=e.next().getEdge().getCoordinates(),r=0;r<n.length-1;r++)t.expandToInclude(n[r]);this._env=t}return this._env}},{key:"addReachable",value:function(t){var e=new it;for(e.add(t);!e.empty();){var n=e.pop();this.add(n,e)}}},{key:"copySymDepths",value:function(t){var e=t.getSym();e.setDepth(tt.LEFT,t.getDepth(tt.RIGHT)),e.setDepth(tt.RIGHT,t.getDepth(tt.LEFT))}},{key:"add",value:function(t,e){t.setVisited(!0),this._nodes.add(t);for(var n=t.getEdges().iterator();n.hasNext();){var r=n.next();this._dirEdgeList.add(r);var i=r.getSym().getNode();i.isVisited()||e.push(i)}}},{key:"getNodes",value:function(){return this._nodes}},{key:"getDirectedEdges",value:function(){return this._dirEdgeList}},{key:"interfaces_",get:function(){return[k]}}],[{key:"constructor_",value:function(){this._finder=null,this._dirEdgeList=new pt,this._nodes=new pt,this._rightMostCoord=null,this._env=null,this._finder=new vt}}]),e}(),_t=function(){function e(){t(this,e)}return n(e,null,[{key:"intersection",value:function(t,e,n,r){var i=t.x<e.x?t.x:e.x,o=t.y<e.y?t.y:e.y,s=t.x>e.x?t.x:e.x,a=t.y>e.y?t.y:e.y,u=n.x<r.x?n.x:r.x,l=n.y<r.y?n.y:r.y,h=n.x>r.x?n.x:r.x,c=n.y>r.y?n.y:r.y,f=((i>u?i:u)+(s<h?s:h))/2,v=((o>l?o:l)+(a<c?a:c))/2,g=t.x-f,d=t.y-v,p=e.x-f,y=e.y-v,m=n.x-f,_=n.y-v,x=r.x-f,E=r.y-v,k=d-y,w=p-g,b=g*y-p*d,I=_-E,N=x-m,S=m*E-x*_,M=k*N-I*w,L=(w*S-N*b)/M,P=(I*b-k*S)/M;return A.isNaN(L)||A.isInfinite(L)||A.isNaN(P)||A.isInfinite(P)?null:new j(L+f,P+v)}}]),e}(),xt=function(){function e(){t(this,e)}return n(e,null,[{key:"arraycopy",value:function(t,e,n,r,i){for(var o=0,s=e;s<e+i;s++)n[r+o]=t[s],o++}},{key:"getProperty",value:function(t){return{"line.separator":"\n"}[t]}}]),e}(),Et=function(){function e(){t(this,e)}return n(e,null,[{key:"log10",value:function(t){var n=Math.log(t);return A.isInfinite(n)||A.isNaN(n)?n:n/e.LOG_10}},{key:"min",value:function(t,e,n,r){var i=t;return e<i&&(i=e),n<i&&(i=n),r<i&&(i=r),i}},{key:"clamp",value:function(){if("number"==typeof arguments[2]&&"number"==typeof arguments[0]&&"number"==typeof arguments[1]){var t=arguments[0],e=arguments[1],n=arguments[2];return t<e?e:t>n?n:t}if(Number.isInteger(arguments[2])&&Number.isInteger(arguments[0])&&Number.isInteger(arguments[1])){var r=arguments[0],i=arguments[1],o=arguments[2];return r<i?i:r>o?o:r}}},{key:"wrap",value:function(t,e){return t<0?e- -t%e:t%e}},{key:"max",value:function(){if(3===arguments.length){var t=arguments[1],e=arguments[2],n=arguments[0];return t>n&&(n=t),e>n&&(n=e),n}if(4===arguments.length){var r=arguments[1],i=arguments[2],o=arguments[3],s=arguments[0];return r>s&&(s=r),i>s&&(s=i),o>s&&(s=o),s}}},{key:"average",value:function(t,e){return(t+e)/2}}]),e}();Et.LOG_10=Math.log(10);var kt=function(){function e(){t(this,e)}return n(e,null,[{key:"segmentToSegment",value:function(t,n,r,i){if(t.equals(n))return e.pointToSegment(t,r,i);if(r.equals(i))return e.pointToSegment(i,t,n);var o=!1;if(U.intersects(t,n,r,i)){var s=(n.x-t.x)*(i.y-r.y)-(n.y-t.y)*(i.x-r.x);if(0===s)o=!0;else{var a=(t.y-r.y)*(i.x-r.x)-(t.x-r.x)*(i.y-r.y),u=((t.y-r.y)*(n.x-t.x)-(t.x-r.x)*(n.y-t.y))/s,l=a/s;(l<0||l>1||u<0||u>1)&&(o=!0)}}else o=!0;return o?Et.min(e.pointToSegment(t,r,i),e.pointToSegment(n,r,i),e.pointToSegment(r,t,n),e.pointToSegment(i,t,n)):0}},{key:"pointToSegment",value:function(t,e,n){if(e.x===n.x&&e.y===n.y)return t.distance(e);var r=(n.x-e.x)*(n.x-e.x)+(n.y-e.y)*(n.y-e.y),i=((t.x-e.x)*(n.x-e.x)+(t.y-e.y)*(n.y-e.y))/r;if(i<=0)return t.distance(e);if(i>=1)return t.distance(n);var o=((e.y-t.y)*(n.x-e.x)-(e.x-t.x)*(n.y-e.y))/r;return Math.abs(o)*Math.sqrt(r)}},{key:"pointToLinePerpendicular",value:function(t,e,n){var r=(n.x-e.x)*(n.x-e.x)+(n.y-e.y)*(n.y-e.y),i=((e.y-t.y)*(n.x-e.x)-(e.x-t.x)*(n.y-e.y))/r;return Math.abs(i)*Math.sqrt(r)}},{key:"pointToSegmentString",value:function(t,n){if(0===n.length)throw new x("Line array must contain at least one vertex");for(var r=t.distance(n[0]),i=0;i<n.length-1;i++){var o=e.pointToSegment(t,n[i],n[i+1]);o<r&&(r=o)}return r}}]),e}(),wt=function(){function e(){t(this,e)}return n(e,[{key:"create",value:function(){if(1===arguments.length)arguments[0]instanceof Array||ot(arguments[0],ct);else if(2===arguments.length);else if(3===arguments.length){var t=arguments[0],e=arguments[1];return this.create(t,e)}}}]),e}(),bt=function(){function e(){t(this,e)}return n(e,[{key:"filter",value:function(t){}}]),e}(),It=function(){function e(){t(this,e)}return n(e,null,[{key:"ofLine",value:function(t){var e=t.size();if(e<=1)return 0;var n=0,r=new j;t.getCoordinate(0,r);for(var i=r.x,o=r.y,s=1;s<e;s++){t.getCoordinate(s,r);var a=r.x,u=r.y,l=a-i,h=u-o;n+=Math.sqrt(l*l+h*h),i=a,o=u}return n}}]),e}(),Nt=function e(){t(this,e)},St=function(){function e(){t(this,e)}return n(e,null,[{key:"copyCoord",value:function(t,e,n,r){for(var i=Math.min(t.getDimension(),n.getDimension()),o=0;o<i;o++)n.setOrdinate(r,o,t.getOrdinate(e,o))}},{key:"isRing",value:function(t){var e=t.size();return 0===e||!(e<=3)&&t.getOrdinate(0,ct.X)===t.getOrdinate(e-1,ct.X)&&t.getOrdinate(0,ct.Y)===t.getOrdinate(e-1,ct.Y)}},{key:"scroll",value:function(){if(2===arguments.length){if(ot(arguments[0],ct)&&Number.isInteger(arguments[1])){var t=arguments[0],n=arguments[1];e.scroll(t,n,e.isRing(t))}else if(ot(arguments[0],ct)&&arguments[1]instanceof j){var r=arguments[0],i=arguments[1],o=e.indexOf(i,r);if(o<=0)return null;e.scroll(r,o)}}else if(3===arguments.length){var s=arguments[0],a=arguments[1],u=arguments[2];if(a<=0)return null;for(var l=s.copy(),h=u?s.size()-1:s.size(),c=0;c<h;c++)for(var f=0;f<s.getDimension();f++)s.setOrdinate(c,f,l.getOrdinate((a+c)%h,f));if(u)for(var v=0;v<s.getDimension();v++)s.setOrdinate(h,v,s.getOrdinate(0,v))}}},{key:"isEqual",value:function(t,e){var n=t.size();if(n!==e.size())return!1;for(var r=Math.min(t.getDimension(),e.getDimension()),i=0;i<n;i++)for(var o=0;o<r;o++){var s=t.getOrdinate(i,o),a=e.getOrdinate(i,o);if(!(t.getOrdinate(i,o)===e.getOrdinate(i,o)||A.isNaN(s)&&A.isNaN(a)))return!1}return!0}},{key:"minCoordinateIndex",value:function(){if(1===arguments.length){var t=arguments[0];return e.minCoordinateIndex(t,0,t.size()-1)}if(3===arguments.length){for(var n=arguments[0],r=arguments[2],i=-1,o=null,s=arguments[1];s<=r;s++){var a=n.getCoordinate(s);(null===o||o.compareTo(a)>0)&&(o=a,i=s)}return i}}},{key:"extend",value:function(t,n,r){var i=t.create(r,n.getDimension()),o=n.size();if(e.copy(n,0,i,0,o),o>0)for(var s=o;s<r;s++)e.copy(n,o-1,i,s,1);return i}},{key:"reverse",value:function(t){for(var n=t.size()-1,r=Math.trunc(n/2),i=0;i<=r;i++)e.swap(t,i,n-i)}},{key:"swap",value:function(t,e,n){if(e===n)return null;for(var r=0;r<t.getDimension();r++){var i=t.getOrdinate(e,r);t.setOrdinate(e,r,t.getOrdinate(n,r)),t.setOrdinate(n,r,i)}}},{key:"copy",value:function(t,n,r,i,o){for(var s=0;s<o;s++)e.copyCoord(t,n+s,r,i+s)}},{key:"ensureValidRing",value:function(t,n){var r=n.size();return 0===r?n:r<=3?e.createClosedRing(t,n,4):n.getOrdinate(0,ct.X)===n.getOrdinate(r-1,ct.X)&&n.getOrdinate(0,ct.Y)===n.getOrdinate(r-1,ct.Y)?n:e.createClosedRing(t,n,r+1)}},{key:"indexOf",value:function(t,e){for(var n=0;n<e.size();n++)if(t.x===e.getOrdinate(n,ct.X)&&t.y===e.getOrdinate(n,ct.Y))return n;return-1}},{key:"createClosedRing",value:function(t,n,r){var i=t.create(r,n.getDimension()),o=n.size();e.copy(n,0,i,0,o);for(var s=o;s<r;s++)e.copy(n,0,i,s,1);return i}},{key:"minCoordinate",value:function(t){for(var e=null,n=0;n<t.size();n++){var r=t.getCoordinate(n);(null===e||e.compareTo(r)>0)&&(e=r)}return e}}]),e}(),Mt=function(){function e(){t(this,e)}return n(e,null,[{key:"toDimensionSymbol",value:function(t){switch(t){case e.FALSE:return e.SYM_FALSE;case e.TRUE:return e.SYM_TRUE;case e.DONTCARE:return e.SYM_DONTCARE;case e.P:return e.SYM_P;case e.L:return e.SYM_L;case e.A:return e.SYM_A}throw new x("Unknown dimension value: "+t)}},{key:"toDimensionValue",value:function(t){switch(ut.toUpperCase(t)){case e.SYM_FALSE:return e.FALSE;case e.SYM_TRUE:return e.TRUE;case e.SYM_DONTCARE:return e.DONTCARE;case e.SYM_P:return e.P;case e.SYM_L:return e.L;case e.SYM_A:return e.A}throw new x("Unknown dimension symbol: "+t)}}]),e}();Mt.P=0,Mt.L=1,Mt.A=2,Mt.FALSE=-1,Mt.TRUE=-2,Mt.DONTCARE=-3,Mt.SYM_FALSE="F",Mt.SYM_TRUE="T",Mt.SYM_DONTCARE="*",Mt.SYM_P="0",Mt.SYM_L="1",Mt.SYM_A="2";var Lt=function(){function e(){t(this,e)}return n(e,[{key:"filter",value:function(t){}}]),e}(),Pt=function(){function e(){t(this,e)}return n(e,[{key:"filter",value:function(t,e){}},{key:"isDone",value:function(){}},{key:"isGeometryChanged",value:function(){}}]),e}(),Ct=function(e){r(s,e);var o=c(s);function s(){var e;return t(this,s),e=o.call(this),s.constructor_.apply(l(e),arguments),e}return n(s,[{key:"computeEnvelopeInternal",value:function(){return this.isEmpty()?new U:this._points.expandEnvelope(new U)}},{key:"isRing",value:function(){return this.isClosed()&&this.isSimple()}},{key:"getCoordinates",value:function(){return this._points.toCoordinateArray()}},{key:"copyInternal",value:function(){return new s(this._points.copy(),this._factory)}},{key:"equalsExact",value:function(){if(2===arguments.length&&"number"==typeof arguments[1]&&arguments[0]instanceof V){var t=arguments[0],e=arguments[1];if(!this.isEquivalentClass(t))return!1;var n=t;if(this._points.size()!==n._points.size())return!1;for(var r=0;r<this._points.size();r++)if(!this.equal(this._points.getCoordinate(r),n._points.getCoordinate(r),e))return!1;return!0}return f(i(s.prototype),"equalsExact",this).apply(this,arguments)}},{key:"normalize",value:function(){for(var t=0;t<Math.trunc(this._points.size()/2);t++){var e=this._points.size()-1-t;if(!this._points.getCoordinate(t).equals(this._points.getCoordinate(e))){if(this._points.getCoordinate(t).compareTo(this._points.getCoordinate(e))>0){var n=this._points.copy();St.reverse(n),this._points=n}return null}}}},{key:"getCoordinate",value:function(){return this.isEmpty()?null:this._points.getCoordinate(0)}},{key:"getBoundaryDimension",value:function(){return this.isClosed()?Mt.FALSE:0}},{key:"isClosed",value:function(){return!this.isEmpty()&&this.getCoordinateN(0).equals2D(this.getCoordinateN(this.getNumPoints()-1))}},{key:"reverseInternal",value:function(){var t=this._points.copy();return St.reverse(t),this.getFactory().createLineString(t)}},{key:"getEndPoint",value:function(){return this.isEmpty()?null:this.getPointN(this.getNumPoints()-1)}},{key:"getTypeCode",value:function(){return V.TYPECODE_LINESTRING}},{key:"getDimension",value:function(){return 1}},{key:"getLength",value:function(){return It.ofLine(this._points)}},{key:"getNumPoints",value:function(){return this._points.size()}},{key:"compareToSameClass",value:function(){if(1===arguments.length){for(var t=arguments[0],e=0,n=0;e<this._points.size()&&n<t._points.size();){var r=this._points.getCoordinate(e).compareTo(t._points.getCoordinate(n));if(0!==r)return r;e++,n++}return e<this._points.size()?1:n<t._points.size()?-1:0}if(2===arguments.length){var i=arguments[0];return arguments[1].compare(this._points,i._points)}}},{key:"apply",value:function(){if(ot(arguments[0],bt))for(var t=arguments[0],e=0;e<this._points.size();e++)t.filter(this._points.getCoordinate(e));else if(ot(arguments[0],Pt)){var n=arguments[0];if(0===this._points.size())return null;for(var r=0;r<this._points.size()&&(n.filter(this._points,r),!n.isDone());r++);n.isGeometryChanged()&&this.geometryChanged()}else(ot(arguments[0],Lt)||ot(arguments[0],E))&&arguments[0].filter(this)}},{key:"getBoundary",value:function(){throw new J}},{key:"isEquivalentClass",value:function(t){return t instanceof s}},{key:"getCoordinateN",value:function(t){return this._points.getCoordinate(t)}},{key:"getGeometryType",value:function(){return V.TYPENAME_LINESTRING}},{key:"getCoordinateSequence",value:function(){return this._points}},{key:"isEmpty",value:function(){return 0===this._points.size()}},{key:"init",value:function(t){if(null===t&&(t=this.getFactory().getCoordinateSequenceFactory().create([])),1===t.size())throw new x("Invalid number of points in LineString (found "+t.size()+" - must be 0 or >= 2)");this._points=t}},{key:"isCoordinate",value:function(t){for(var e=0;e<this._points.size();e++)if(this._points.getCoordinate(e).equals(t))return!0;return!1}},{key:"getStartPoint",value:function(){return this.isEmpty()?null:this.getPointN(0)}},{key:"getPointN",value:function(t){return this.getFactory().createPoint(this._points.getCoordinate(t))}},{key:"interfaces_",get:function(){return[Nt]}}],[{key:"constructor_",value:function(){if(this._points=null,0===arguments.length);else if(2===arguments.length){var t=arguments[0],e=arguments[1];V.constructor_.call(this,e),this.init(t)}}}]),s}(V),Tt=function e(){t(this,e)},Ot=function(e){r(s,e);var o=c(s);function s(){var e;return t(this,s),e=o.call(this),s.constructor_.apply(l(e),arguments),e}return n(s,[{key:"computeEnvelopeInternal",value:function(){if(this.isEmpty())return new U;var t=new U;return t.expandToInclude(this._coordinates.getX(0),this._coordinates.getY(0)),t}},{key:"getCoordinates",value:function(){return this.isEmpty()?[]:[this.getCoordinate()]}},{key:"copyInternal",value:function(){return new s(this._coordinates.copy(),this._factory)}},{key:"equalsExact",value:function(){if(2===arguments.length&&"number"==typeof arguments[1]&&arguments[0]instanceof V){var t=arguments[0],e=arguments[1];return!!this.isEquivalentClass(t)&&(!(!this.isEmpty()||!t.isEmpty())||this.isEmpty()===t.isEmpty()&&this.equal(t.getCoordinate(),this.getCoordinate(),e))}return f(i(s.prototype),"equalsExact",this).apply(this,arguments)}},{key:"normalize",value:function(){}},{key:"getCoordinate",value:function(){return 0!==this._coordinates.size()?this._coordinates.getCoordinate(0):null}},{key:"getBoundaryDimension",value:function(){return Mt.FALSE}},{key:"reverseInternal",value:function(){return this.getFactory().createPoint(this._coordinates.copy())}},{key:"getTypeCode",value:function(){return V.TYPECODE_POINT}},{key:"getDimension",value:function(){return 0}},{key:"getNumPoints",value:function(){return this.isEmpty()?0:1}},{key:"getX",value:function(){if(null===this.getCoordinate())throw new IllegalStateException("getX called on empty Point");return this.getCoordinate().x}},{key:"compareToSameClass",value:function(){if(1===arguments.length){var t=arguments[0];return this.getCoordinate().compareTo(t.getCoordinate())}if(2===arguments.length){var e=arguments[0];return arguments[1].compare(this._coordinates,e._coordinates)}}},{key:"apply",value:function(){if(ot(arguments[0],bt)){var t=arguments[0];if(this.isEmpty())return null;t.filter(this.getCoordinate())}else if(ot(arguments[0],Pt)){var e=arguments[0];if(this.isEmpty())return null;e.filter(this._coordinates,0),e.isGeometryChanged()&&this.geometryChanged()}else(ot(arguments[0],Lt)||ot(arguments[0],E))&&arguments[0].filter(this)}},{key:"getBoundary",value:function(){return this.getFactory().createGeometryCollection()}},{key:"getGeometryType",value:function(){return V.TYPENAME_POINT}},{key:"getCoordinateSequence",value:function(){return this._coordinates}},{key:"getY",value:function(){if(null===this.getCoordinate())throw new IllegalStateException("getY called on empty Point");return this.getCoordinate().y}},{key:"isEmpty",value:function(){return 0===this._coordinates.size()}},{key:"init",value:function(t){null===t&&(t=this.getFactory().getCoordinateSequenceFactory().create([])),G.isTrue(t.size()<=1),this._coordinates=t}},{key:"isSimple",value:function(){return!0}},{key:"interfaces_",get:function(){return[Tt]}}],[{key:"constructor_",value:function(){this._coordinates=null;var t=arguments[0],e=arguments[1];V.constructor_.call(this,e),this.init(t)}}]),s}(V),Rt=function(){function e(){t(this,e)}return n(e,null,[{key:"ofRing",value:function(){if(arguments[0]instanceof Array){var t=arguments[0];return Math.abs(e.ofRingSigned(t))}if(ot(arguments[0],ct)){var n=arguments[0];return Math.abs(e.ofRingSigned(n))}}},{key:"ofRingSigned",value:function(){if(arguments[0]instanceof Array){var t=arguments[0];if(t.length<3)return 0;for(var e=0,n=t[0].x,r=1;r<t.length-1;r++){var i=t[r].x-n,o=t[r+1].y;e+=i*(t[r-1].y-o)}return e/2}if(ot(arguments[0],ct)){var s=arguments[0],a=s.size();if(a<3)return 0;var u=new j,l=new j,h=new j;s.getCoordinate(0,l),s.getCoordinate(1,h);var c=l.x;h.x-=c;for(var f=0,v=1;v<a-1;v++)u.y=l.y,l.x=h.x,l.y=h.y,s.getCoordinate(v+1,h),h.x-=c,f+=l.x*(u.y-h.y);return f/2}}}]),e}(),At=function(){function e(){t(this,e)}return n(e,null,[{key:"sort",value:function(){var t=arguments,e=arguments[0];if(1===arguments.length)e.sort((function(t,e){return t.compareTo(e)}));else if(2===arguments.length)e.sort((function(e,n){return t[1].compare(e,n)}));else if(3===arguments.length){var n=e.slice(arguments[1],arguments[2]);n.sort();var r=e.slice(0,arguments[1]).concat(n,e.slice(arguments[2],e.length));e.splice(0,e.length);var i,o=p(r);try{for(o.s();!(i=o.n()).done;){var s=i.value;e.push(s)}}catch(t){o.e(t)}finally{o.f()}}else if(4===arguments.length){var a=e.slice(arguments[1],arguments[2]);a.sort((function(e,n){return t[3].compare(e,n)}));var u=e.slice(0,arguments[1]).concat(a,e.slice(arguments[2],e.length));e.splice(0,e.length);var l,h=p(u);try{for(h.s();!(l=h.n()).done;){var c=l.value;e.push(c)}}catch(t){h.e(t)}finally{h.f()}}}},{key:"asList",value:function(t){var e,n=new pt,r=p(t);try{for(r.s();!(e=r.n()).done;){var i=e.value;n.add(i)}}catch(t){r.e(t)}finally{r.f()}return n}},{key:"copyOf",value:function(t,e){return t.slice(0,e)}}]),e}(),Dt=function e(){t(this,e)},Ft=function(e){r(s,e);var o=c(s);function s(){var e;return t(this,s),e=o.call(this),s.constructor_.apply(l(e),arguments),e}return n(s,[{key:"computeEnvelopeInternal",value:function(){return this._shell.getEnvelopeInternal()}},{key:"getCoordinates",value:function(){if(this.isEmpty())return[];for(var t=new Array(this.getNumPoints()).fill(null),e=-1,n=this._shell.getCoordinates(),r=0;r<n.length;r++)t[++e]=n[r];for(var i=0;i<this._holes.length;i++)for(var o=this._holes[i].getCoordinates(),s=0;s<o.length;s++)t[++e]=o[s];return t}},{key:"getArea",value:function(){var t=0;t+=Rt.ofRing(this._shell.getCoordinateSequence());for(var e=0;e<this._holes.length;e++)t-=Rt.ofRing(this._holes[e].getCoordinateSequence());return t}},{key:"copyInternal",value:function(){for(var t=this._shell.copy(),e=new Array(this._holes.length).fill(null),n=0;n<this._holes.length;n++)e[n]=this._holes[n].copy();return new s(t,e,this._factory)}},{key:"isRectangle",value:function(){if(0!==this.getNumInteriorRing())return!1;if(null===this._shell)return!1;if(5!==this._shell.getNumPoints())return!1;for(var t=this._shell.getCoordinateSequence(),e=this.getEnvelopeInternal(),n=0;n<5;n++){var r=t.getX(n);if(r!==e.getMinX()&&r!==e.getMaxX())return!1;var i=t.getY(n);if(i!==e.getMinY()&&i!==e.getMaxY())return!1}for(var o=t.getX(0),s=t.getY(0),a=1;a<=4;a++){var u=t.getX(a),l=t.getY(a);if(u!==o==(l!==s))return!1;o=u,s=l}return!0}},{key:"equalsExact",value:function(){if(2===arguments.length&&"number"==typeof arguments[1]&&arguments[0]instanceof V){var t=arguments[0],e=arguments[1];if(!this.isEquivalentClass(t))return!1;var n=t,r=this._shell,o=n._shell;if(!r.equalsExact(o,e))return!1;if(this._holes.length!==n._holes.length)return!1;for(var a=0;a<this._holes.length;a++)if(!this._holes[a].equalsExact(n._holes[a],e))return!1;return!0}return f(i(s.prototype),"equalsExact",this).apply(this,arguments)}},{key:"normalize",value:function(){if(0===arguments.length){this._shell=this.normalized(this._shell,!0);for(var t=0;t<this._holes.length;t++)this._holes[t]=this.normalized(this._holes[t],!1);At.sort(this._holes)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];if(e.isEmpty())return null;var r=e.getCoordinateSequence(),i=St.minCoordinateIndex(r,0,r.size()-2);St.scroll(r,i,!0),ft.isCCW(r)===n&&St.reverse(r)}}},{key:"getCoordinate",value:function(){return this._shell.getCoordinate()}},{key:"getNumInteriorRing",value:function(){return this._holes.length}},{key:"getBoundaryDimension",value:function(){return 1}},{key:"reverseInternal",value:function(){for(var t=this.getExteriorRing().reverse(),e=new Array(this.getNumInteriorRing()).fill(null),n=0;n<e.length;n++)e[n]=this.getInteriorRingN(n).reverse();return this.getFactory().createPolygon(t,e)}},{key:"getTypeCode",value:function(){return V.TYPECODE_POLYGON}},{key:"getDimension",value:function(){return 2}},{key:"getLength",value:function(){var t=0;t+=this._shell.getLength();for(var e=0;e<this._holes.length;e++)t+=this._holes[e].getLength();return t}},{key:"getNumPoints",value:function(){for(var t=this._shell.getNumPoints(),e=0;e<this._holes.length;e++)t+=this._holes[e].getNumPoints();return t}},{key:"convexHull",value:function(){return this.getExteriorRing().convexHull()}},{key:"normalized",value:function(t,e){var n=t.copy();return this.normalize(n,e),n}},{key:"compareToSameClass",value:function(){if(1===arguments.length){var t=arguments[0],e=this._shell,n=t._shell;return e.compareToSameClass(n)}if(2===arguments.length){var r=arguments[1],i=arguments[0],o=this._shell,s=i._shell,a=o.compareToSameClass(s,r);if(0!==a)return a;for(var u=this.getNumInteriorRing(),l=i.getNumInteriorRing(),h=0;h<u&&h<l;){var c=this.getInteriorRingN(h),f=i.getInteriorRingN(h),v=c.compareToSameClass(f,r);if(0!==v)return v;h++}return h<u?1:h<l?-1:0}}},{key:"apply",value:function(){if(ot(arguments[0],bt)){var t=arguments[0];this._shell.apply(t);for(var e=0;e<this._holes.length;e++)this._holes[e].apply(t)}else if(ot(arguments[0],Pt)){var n=arguments[0];if(this._shell.apply(n),!n.isDone())for(var r=0;r<this._holes.length&&(this._holes[r].apply(n),!n.isDone());r++);n.isGeometryChanged()&&this.geometryChanged()}else if(ot(arguments[0],Lt))arguments[0].filter(this);else if(ot(arguments[0],E)){var i=arguments[0];i.filter(this),this._shell.apply(i);for(var o=0;o<this._holes.length;o++)this._holes[o].apply(i)}}},{key:"getBoundary",value:function(){if(this.isEmpty())return this.getFactory().createMultiLineString();var t=new Array(this._holes.length+1).fill(null);t[0]=this._shell;for(var e=0;e<this._holes.length;e++)t[e+1]=this._holes[e];return t.length<=1?this.getFactory().createLinearRing(t[0].getCoordinateSequence()):this.getFactory().createMultiLineString(t)}},{key:"getGeometryType",value:function(){return V.TYPENAME_POLYGON}},{key:"getExteriorRing",value:function(){return this._shell}},{key:"isEmpty",value:function(){return this._shell.isEmpty()}},{key:"getInteriorRingN",value:function(t){return this._holes[t]}},{key:"interfaces_",get:function(){return[Dt]}}],[{key:"constructor_",value:function(){this._shell=null,this._holes=null;var t=arguments[0],e=arguments[1],n=arguments[2];if(V.constructor_.call(this,n),null===t&&(t=this.getFactory().createLinearRing()),null===e&&(e=[]),V.hasNullElements(e))throw new x("holes must not contain null elements");if(t.isEmpty()&&V.hasNonEmptyElements(e))throw new x("shell is empty but holes are not");this._shell=t,this._holes=e}}]),s}(V),qt=function(e){r(i,e);var n=c(i);function i(){return t(this,i),n.apply(this,arguments)}return i}(K),Gt=function(e){r(o,e);var i=c(o);function o(e){var n;return t(this,o),(n=i.call(this)).array=[],e instanceof H&&n.addAll(e),n}return n(o,[{key:"contains",value:function(t){var e,n=p(this.array);try{for(n.s();!(e=n.n()).done;)if(0===e.value.compareTo(t))return!0}catch(t){n.e(t)}finally{n.f()}return!1}},{key:"add",value:function(t){if(this.contains(t))return!1;for(var e=0,n=this.array.length;e<n;e++)if(1===this.array[e].compareTo(t))return!!this.array.splice(e,0,t);return this.array.push(t),!0}},{key:"addAll",value:function(t){var e,n=p(t);try{for(n.s();!(e=n.n()).done;){var r=e.value;this.add(r)}}catch(t){n.e(t)}finally{n.f()}return!0}},{key:"remove",value:function(){throw new J}},{key:"size",value:function(){return this.array.length}},{key:"isEmpty",value:function(){return 0===this.array.length}},{key:"toArray",value:function(){return this.array.slice()}},{key:"iterator",value:function(){return new Yt(this.array)}}]),o}(qt),Yt=function(){function e(n){t(this,e),this.array=n,this.position=0}return n(e,[{key:"next",value:function(){if(this.position===this.array.length)throw new W;return this.array[this.position++]}},{key:"hasNext",value:function(){return this.position<this.array.length}},{key:"remove",value:function(){throw new J}}]),e}(),Bt=function(e){r(s,e);var o=c(s);function s(){var e;return t(this,s),e=o.call(this),s.constructor_.apply(l(e),arguments),e}return n(s,[{key:"computeEnvelopeInternal",value:function(){for(var t=new U,e=0;e<this._geometries.length;e++)t.expandToInclude(this._geometries[e].getEnvelopeInternal());return t}},{key:"getGeometryN",value:function(t){return this._geometries[t]}},{key:"getCoordinates",value:function(){for(var t=new Array(this.getNumPoints()).fill(null),e=-1,n=0;n<this._geometries.length;n++)for(var r=this._geometries[n].getCoordinates(),i=0;i<r.length;i++)t[++e]=r[i];return t}},{key:"getArea",value:function(){for(var t=0,e=0;e<this._geometries.length;e++)t+=this._geometries[e].getArea();return t}},{key:"copyInternal",value:function(){for(var t=new Array(this._geometries.length).fill(null),e=0;e<t.length;e++)t[e]=this._geometries[e].copy();return new s(t,this._factory)}},{key:"equalsExact",value:function(){if(2===arguments.length&&"number"==typeof arguments[1]&&arguments[0]instanceof V){var t=arguments[0],e=arguments[1];if(!this.isEquivalentClass(t))return!1;var n=t;if(this._geometries.length!==n._geometries.length)return!1;for(var r=0;r<this._geometries.length;r++)if(!this._geometries[r].equalsExact(n._geometries[r],e))return!1;return!0}return f(i(s.prototype),"equalsExact",this).apply(this,arguments)}},{key:"normalize",value:function(){for(var t=0;t<this._geometries.length;t++)this._geometries[t].normalize();At.sort(this._geometries)}},{key:"getCoordinate",value:function(){return this.isEmpty()?null:this._geometries[0].getCoordinate()}},{key:"getBoundaryDimension",value:function(){for(var t=Mt.FALSE,e=0;e<this._geometries.length;e++)t=Math.max(t,this._geometries[e].getBoundaryDimension());return t}},{key:"reverseInternal",value:function(){for(var t=this._geometries.length,e=new pt(t),n=0;n<t;n++)e.add(this._geometries[n].reverse());return this.getFactory().buildGeometry(e)}},{key:"getTypeCode",value:function(){return V.TYPECODE_GEOMETRYCOLLECTION}},{key:"getDimension",value:function(){for(var t=Mt.FALSE,e=0;e<this._geometries.length;e++)t=Math.max(t,this._geometries[e].getDimension());return t}},{key:"getLength",value:function(){for(var t=0,e=0;e<this._geometries.length;e++)t+=this._geometries[e].getLength();return t}},{key:"getNumPoints",value:function(){for(var t=0,e=0;e<this._geometries.length;e++)t+=this._geometries[e].getNumPoints();return t}},{key:"getNumGeometries",value:function(){return this._geometries.length}},{key:"compareToSameClass",value:function(){if(1===arguments.length){var t=arguments[0],e=new Gt(At.asList(this._geometries)),n=new Gt(At.asList(t._geometries));return this.compare(e,n)}if(2===arguments.length){for(var r=arguments[1],i=arguments[0],o=this.getNumGeometries(),s=i.getNumGeometries(),a=0;a<o&&a<s;){var u=this.getGeometryN(a),l=i.getGeometryN(a),h=u.compareToSameClass(l,r);if(0!==h)return h;a++}return a<o?1:a<s?-1:0}}},{key:"apply",value:function(){if(ot(arguments[0],bt))for(var t=arguments[0],e=0;e<this._geometries.length;e++)this._geometries[e].apply(t);else if(ot(arguments[0],Pt)){var n=arguments[0];if(0===this._geometries.length)return null;for(var r=0;r<this._geometries.length&&(this._geometries[r].apply(n),!n.isDone());r++);n.isGeometryChanged()&&this.geometryChanged()}else if(ot(arguments[0],Lt)){var i=arguments[0];i.filter(this);for(var o=0;o<this._geometries.length;o++)this._geometries[o].apply(i)}else if(ot(arguments[0],E)){var s=arguments[0];s.filter(this);for(var a=0;a<this._geometries.length;a++)this._geometries[a].apply(s)}}},{key:"getBoundary",value:function(){return V.checkNotGeometryCollection(this),G.shouldNeverReachHere(),null}},{key:"getGeometryType",value:function(){return V.TYPENAME_GEOMETRYCOLLECTION}},{key:"isEmpty",value:function(){for(var t=0;t<this._geometries.length;t++)if(!this._geometries[t].isEmpty())return!1;return!0}}],[{key:"constructor_",value:function(){if(this._geometries=null,0===arguments.length);else if(2===arguments.length){var t=arguments[0],e=arguments[1];if(V.constructor_.call(this,e),null===t&&(t=[]),V.hasNullElements(t))throw new x("geometries must not contain null elements");this._geometries=t}}}]),s}(V),zt=function(e){r(s,e);var o=c(s);function s(){var e;return t(this,s),e=o.call(this),s.constructor_.apply(l(e),arguments),e}return n(s,[{key:"copyInternal",value:function(){for(var t=new Array(this._geometries.length).fill(null),e=0;e<t.length;e++)t[e]=this._geometries[e].copy();return new s(t,this._factory)}},{key:"isValid",value:function(){return!0}},{key:"equalsExact",value:function(){if(2===arguments.length&&"number"==typeof arguments[1]&&arguments[0]instanceof V){var t=arguments[0],e=arguments[1];return!!this.isEquivalentClass(t)&&f(i(s.prototype),"equalsExact",this).call(this,t,e)}return f(i(s.prototype),"equalsExact",this).apply(this,arguments)}},{key:"getCoordinate",value:function(){if(1===arguments.length&&Number.isInteger(arguments[0])){var t=arguments[0];return this._geometries[t].getCoordinate()}return f(i(s.prototype),"getCoordinate",this).apply(this,arguments)}},{key:"getBoundaryDimension",value:function(){return Mt.FALSE}},{key:"getTypeCode",value:function(){return V.TYPECODE_MULTIPOINT}},{key:"getDimension",value:function(){return 0}},{key:"getBoundary",value:function(){return this.getFactory().createGeometryCollection()}},{key:"getGeometryType",value:function(){return V.TYPENAME_MULTIPOINT}},{key:"interfaces_",get:function(){return[Tt]}}],[{key:"constructor_",value:function(){var t=arguments[0],e=arguments[1];Bt.constructor_.call(this,t,e)}}]),s}(Bt),jt=function(e){r(s,e);var o=c(s);function s(){var e;return t(this,s),e=o.call(this),s.constructor_.apply(l(e),arguments),e}return n(s,[{key:"copyInternal",value:function(){return new s(this._points.copy(),this._factory)}},{key:"getBoundaryDimension",value:function(){return Mt.FALSE}},{key:"isClosed",value:function(){return!!this.isEmpty()||f(i(s.prototype),"isClosed",this).call(this)}},{key:"reverseInternal",value:function(){var t=this._points.copy();return St.reverse(t),this.getFactory().createLinearRing(t)}},{key:"getTypeCode",value:function(){return V.TYPECODE_LINEARRING}},{key:"validateConstruction",value:function(){if(!this.isEmpty()&&!f(i(s.prototype),"isClosed",this).call(this))throw new x("Points of LinearRing do not form a closed linestring");if(this.getCoordinateSequence().size()>=1&&this.getCoordinateSequence().size()<s.MINIMUM_VALID_SIZE)throw new x("Invalid number of points in LinearRing (found "+this.getCoordinateSequence().size()+" - must be 0 or >= 4)")}},{key:"getGeometryType",value:function(){return V.TYPENAME_LINEARRING}}],[{key:"constructor_",value:function(){var t=arguments[0],e=arguments[1];Ct.constructor_.call(this,t,e),this.validateConstruction()}}]),s}(Ct);jt.MINIMUM_VALID_SIZE=4;var Xt=function(e){r(o,e);var i=c(o);function o(){var e;return t(this,o),e=i.call(this),o.constructor_.apply(l(e),arguments),e}return n(o,[{key:"setOrdinate",value:function(t,e){switch(t){case o.X:this.x=e;break;case o.Y:this.y=e;break;default:throw new x("Invalid ordinate index: "+t)}}},{key:"getZ",value:function(){return j.NULL_ORDINATE}},{key:"getOrdinate",value:function(t){switch(t){case o.X:return this.x;case o.Y:return this.y}throw new x("Invalid ordinate index: "+t)}},{key:"setZ",value:function(t){throw new x("CoordinateXY dimension 2 does not support z-ordinate")}},{key:"copy",value:function(){return new o(this)}},{key:"toString",value:function(){return"("+this.x+", "+this.y+")"}},{key:"setCoordinate",value:function(t){this.x=t.x,this.y=t.y,this.z=t.getZ()}}],[{key:"constructor_",value:function(){if(0===arguments.length)j.constructor_.call(this);else if(1===arguments.length){if(arguments[0]instanceof o){var t=arguments[0];j.constructor_.call(this,t.x,t.y)}else if(arguments[0]instanceof j){var e=arguments[0];j.constructor_.call(this,e.x,e.y)}}else if(2===arguments.length){var n=arguments[0],r=arguments[1];j.constructor_.call(this,n,r,j.NULL_ORDINATE)}}}]),o}(j);Xt.X=0,Xt.Y=1,Xt.Z=-1,Xt.M=-1;var Ut=function(e){r(o,e);var i=c(o);function o(){var e;return t(this,o),e=i.call(this),o.constructor_.apply(l(e),arguments),e}return n(o,[{key:"getM",value:function(){return this._m}},{key:"setOrdinate",value:function(t,e){switch(t){case o.X:this.x=e;break;case o.Y:this.y=e;break;case o.M:this._m=e;break;default:throw new x("Invalid ordinate index: "+t)}}},{key:"setM",value:function(t){this._m=t}},{key:"getZ",value:function(){return j.NULL_ORDINATE}},{key:"getOrdinate",value:function(t){switch(t){case o.X:return this.x;case o.Y:return this.y;case o.M:return this._m}throw new x("Invalid ordinate index: "+t)}},{key:"setZ",value:function(t){throw new x("CoordinateXY dimension 2 does not support z-ordinate")}},{key:"copy",value:function(){return new o(this)}},{key:"toString",value:function(){return"("+this.x+", "+this.y+" m="+this.getM()+")"}},{key:"setCoordinate",value:function(t){this.x=t.x,this.y=t.y,this.z=t.getZ(),this._m=t.getM()}}],[{key:"constructor_",value:function(){if(this._m=null,0===arguments.length)j.constructor_.call(this),this._m=0;else if(1===arguments.length){if(arguments[0]instanceof o){var t=arguments[0];j.constructor_.call(this,t.x,t.y),this._m=t._m}else if(arguments[0]instanceof j){var e=arguments[0];j.constructor_.call(this,e.x,e.y),this._m=this.getM()}}else if(3===arguments.length){var n=arguments[0],r=arguments[1],i=arguments[2];j.constructor_.call(this,n,r,j.NULL_ORDINATE),this._m=i}}}]),o}(j);Ut.X=0,Ut.Y=1,Ut.Z=-1,Ut.M=2;var Vt=function(e){r(o,e);var i=c(o);function o(){var e;return t(this,o),e=i.call(this),o.constructor_.apply(l(e),arguments),e}return n(o,[{key:"getM",value:function(){return this._m}},{key:"setOrdinate",value:function(t,e){switch(t){case j.X:this.x=e;break;case j.Y:this.y=e;break;case j.Z:this.z=e;break;case j.M:this._m=e;break;default:throw new x("Invalid ordinate index: "+t)}}},{key:"setM",value:function(t){this._m=t}},{key:"getOrdinate",value:function(t){switch(t){case j.X:return this.x;case j.Y:return this.y;case j.Z:return this.getZ();case j.M:return this.getM()}throw new x("Invalid ordinate index: "+t)}},{key:"copy",value:function(){return new o(this)}},{key:"toString",value:function(){return"("+this.x+", "+this.y+", "+this.getZ()+" m="+this.getM()+")"}},{key:"setCoordinate",value:function(t){this.x=t.x,this.y=t.y,this.z=t.getZ(),this._m=t.getM()}}],[{key:"constructor_",value:function(){if(this._m=null,0===arguments.length)j.constructor_.call(this),this._m=0;else if(1===arguments.length){if(arguments[0]instanceof o){var t=arguments[0];j.constructor_.call(this,t),this._m=t._m}else if(arguments[0]instanceof j){var e=arguments[0];j.constructor_.call(this,e),this._m=this.getM()}}else if(4===arguments.length){var n=arguments[0],r=arguments[1],i=arguments[2],s=arguments[3];j.constructor_.call(this,n,r,i),this._m=s}}}]),o}(j),Zt=function(){function e(){t(this,e)}return n(e,null,[{key:"measures",value:function(t){return t instanceof Xt?0:t instanceof Ut||t instanceof Vt?1:0}},{key:"dimension",value:function(t){return t instanceof Xt?2:t instanceof Ut?3:t instanceof Vt?4:3}},{key:"create",value:function(){if(1===arguments.length){var t=arguments[0];return e.create(t,0)}if(2===arguments.length){var n=arguments[0],r=arguments[1];return 2===n?new Xt:3===n&&0===r?new j:3===n&&1===r?new Ut:4===n&&1===r?new Vt:new j}}}]),e}(),Ht=function(e){r(s,e);var o=c(s);function s(){var e;return t(this,s),e=o.call(this),s.constructor_.apply(l(e),arguments),e}return n(s,[{key:"getCoordinate",value:function(t){return this.get(t)}},{key:"addAll",value:function(){if(2===arguments.length&&"boolean"==typeof arguments[1]&&ot(arguments[0],H)){for(var t=arguments[1],e=!1,n=arguments[0].iterator();n.hasNext();)this.add(n.next(),t),e=!0;return e}return f(i(s.prototype),"addAll",this).apply(this,arguments)}},{key:"clone",value:function(){for(var t=f(i(s.prototype),"clone",this).call(this),e=0;e<this.size();e++)t.add(e,this.get(e).clone());return t}},{key:"toCoordinateArray",value:function(){if(0===arguments.length)return this.toArray(s.coordArrayType);if(1===arguments.length){if(arguments[0])return this.toArray(s.coordArrayType);for(var t=this.size(),e=new Array(t).fill(null),n=0;n<t;n++)e[n]=this.get(t-n-1);return e}}},{key:"add",value:function(){if(1===arguments.length){var t=arguments[0];return f(i(s.prototype),"add",this).call(this,t)}if(2===arguments.length){if(arguments[0]instanceof Array&&"boolean"==typeof arguments[1]){var e=arguments[0],n=arguments[1];return this.add(e,n,!0),!0}if(arguments[0]instanceof j&&"boolean"==typeof arguments[1]){var r=arguments[0];if(!arguments[1]&&this.size()>=1&&this.get(this.size()-1).equals2D(r))return null;f(i(s.prototype),"add",this).call(this,r)}else if(arguments[0]instanceof Object&&"boolean"==typeof arguments[1]){var o=arguments[0],a=arguments[1];return this.add(o,a),!0}}else if(3===arguments.length){if("boolean"==typeof arguments[2]&&arguments[0]instanceof Array&&"boolean"==typeof arguments[1]){var u=arguments[0],l=arguments[1];if(arguments[2])for(var h=0;h<u.length;h++)this.add(u[h],l);else for(var c=u.length-1;c>=0;c--)this.add(u[c],l);return!0}if("boolean"==typeof arguments[2]&&Number.isInteger(arguments[0])&&arguments[1]instanceof j){var v=arguments[0],g=arguments[1];if(!arguments[2]){var d=this.size();if(d>0){if(v>0&&this.get(v-1).equals2D(g))return null;if(v<d&&this.get(v).equals2D(g))return null}}f(i(s.prototype),"add",this).call(this,v,g)}}else if(4===arguments.length){var p=arguments[0],y=arguments[1],m=arguments[2],_=arguments[3],x=1;m>_&&(x=-1);for(var E=m;E!==_;E+=x)this.add(p[E],y);return!0}}},{key:"closeRing",value:function(){if(this.size()>0){var t=this.get(0).copy();this.add(t,!1)}}}],[{key:"constructor_",value:function(){if(0===arguments.length);else if(1===arguments.length){var t=arguments[0];this.ensureCapacity(t.length),this.add(t,!0)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];this.ensureCapacity(e.length),this.add(e,n)}}}]),s}(pt);Ht.coordArrayType=new Array(0).fill(null);var Wt=function(){function e(){t(this,e)}return n(e,null,[{key:"isRing",value:function(t){return!(t.length<4||!t[0].equals2D(t[t.length-1]))}},{key:"ptNotInList",value:function(t,n){for(var r=0;r<t.length;r++){var i=t[r];if(e.indexOf(i,n)<0)return i}return null}},{key:"scroll",value:function(t,n){var r=e.indexOf(n,t);if(r<0)return null;var i=new Array(t.length).fill(null);xt.arraycopy(t,r,i,0,t.length-r),xt.arraycopy(t,0,i,t.length-r,r),xt.arraycopy(i,0,t,0,t.length)}},{key:"equals",value:function(){if(2===arguments.length){var t=arguments[0],e=arguments[1];if(t===e)return!0;if(null===t||null===e)return!1;if(t.length!==e.length)return!1;for(var n=0;n<t.length;n++)if(!t[n].equals(e[n]))return!1;return!0}if(3===arguments.length){var r=arguments[0],i=arguments[1],o=arguments[2];if(r===i)return!0;if(null===r||null===i)return!1;if(r.length!==i.length)return!1;for(var s=0;s<r.length;s++)if(0!==o.compare(r[s],i[s]))return!1;return!0}}},{key:"intersection",value:function(t,e){for(var n=new Ht,r=0;r<t.length;r++)e.intersects(t[r])&&n.add(t[r],!0);return n.toCoordinateArray()}},{key:"measures",value:function(t){if(null===t||0===t.length)return 0;var e,n=0,r=p(t);try{for(r.s();!(e=r.n()).done;){var i=e.value;n=Math.max(n,Zt.measures(i))}}catch(t){r.e(t)}finally{r.f()}return n}},{key:"hasRepeatedPoints",value:function(t){for(var e=1;e<t.length;e++)if(t[e-1].equals(t[e]))return!0;return!1}},{key:"removeRepeatedPoints",value:function(t){return e.hasRepeatedPoints(t)?new Ht(t,!1).toCoordinateArray():t}},{key:"reverse",value:function(t){for(var e=t.length-1,n=Math.trunc(e/2),r=0;r<=n;r++){var i=t[r];t[r]=t[e-r],t[e-r]=i}}},{key:"removeNull",value:function(t){for(var e=0,n=0;n<t.length;n++)null!==t[n]&&e++;var r=new Array(e).fill(null);if(0===e)return r;for(var i=0,o=0;o<t.length;o++)null!==t[o]&&(r[i++]=t[o]);return r}},{key:"copyDeep",value:function(){if(1===arguments.length){for(var t=arguments[0],e=new Array(t.length).fill(null),n=0;n<t.length;n++)e[n]=t[n].copy();return e}if(5===arguments.length)for(var r=arguments[0],i=arguments[1],o=arguments[2],s=arguments[3],a=arguments[4],u=0;u<a;u++)o[s+u]=r[i+u].copy()}},{key:"isEqualReversed",value:function(t,e){for(var n=0;n<t.length;n++){var r=t[n],i=e[t.length-n-1];if(0!==r.compareTo(i))return!1}return!0}},{key:"envelope",value:function(t){for(var e=new U,n=0;n<t.length;n++)e.expandToInclude(t[n]);return e}},{key:"toCoordinateArray",value:function(t){return t.toArray(e.coordArrayType)}},{key:"dimension",value:function(t){if(null===t||0===t.length)return 3;var e,n=0,r=p(t);try{for(r.s();!(e=r.n()).done;){var i=e.value;n=Math.max(n,Zt.dimension(i))}}catch(t){r.e(t)}finally{r.f()}return n}},{key:"atLeastNCoordinatesOrNothing",value:function(t,e){return e.length>=t?e:[]}},{key:"indexOf",value:function(t,e){for(var n=0;n<e.length;n++)if(t.equals(e[n]))return n;return-1}},{key:"increasingDirection",value:function(t){for(var e=0;e<Math.trunc(t.length/2);e++){var n=t.length-1-e,r=t[e].compareTo(t[n]);if(0!==r)return r}return 1}},{key:"compare",value:function(t,e){for(var n=0;n<t.length&&n<e.length;){var r=t[n].compareTo(e[n]);if(0!==r)return r;n++}return n<e.length?-1:n<t.length?1:0}},{key:"minCoordinate",value:function(t){for(var e=null,n=0;n<t.length;n++)(null===e||e.compareTo(t[n])>0)&&(e=t[n]);return e}},{key:"extract",value:function(t,e,n){e=Et.clamp(e,0,t.length);var r=(n=Et.clamp(n,-1,t.length))-e+1;n<0&&(r=0),e>=t.length&&(r=0),n<e&&(r=0);var i=new Array(r).fill(null);if(0===r)return i;for(var o=0,s=e;s<=n;s++)i[o++]=t[s];return i}}]),e}(),Jt=function(){function e(){t(this,e)}return n(e,[{key:"compare",value:function(t,e){var n=t,r=e;return Wt.compare(n,r)}},{key:"interfaces_",get:function(){return[D]}}]),e}(),Kt=function(){function e(){t(this,e)}return n(e,[{key:"compare",value:function(t,e){var n=t,r=e;if(n.length<r.length)return-1;if(n.length>r.length)return 1;if(0===n.length)return 0;var i=Wt.compare(n,r);return Wt.isEqualReversed(n,r)?0:i}},{key:"OLDcompare",value:function(t,e){var n=t,r=e;if(n.length<r.length)return-1;if(n.length>r.length)return 1;if(0===n.length)return 0;for(var i=Wt.increasingDirection(n),o=Wt.increasingDirection(r),s=i>0?0:n.length-1,a=o>0?0:n.length-1,u=0;u<n.length;u++){var l=n[s].compareTo(r[a]);if(0!==l)return l;s+=i,a+=o}return 0}},{key:"interfaces_",get:function(){return[D]}}]),e}();Wt.ForwardComparator=Jt,Wt.BidirectionalComparator=Kt,Wt.coordArrayType=new Array(0).fill(null);var Qt=function(){function e(n){t(this,e),this.str=n}return n(e,[{key:"append",value:function(t){this.str+=t}},{key:"setCharAt",value:function(t,e){this.str=this.str.substr(0,t)+e+this.str.substr(t+1)}},{key:"toString",value:function(){return this.str}}]),e}(),$t=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"getM",value:function(t){return this.hasM()?this._coordinates[t].getM():A.NaN}},{key:"setOrdinate",value:function(t,e,n){switch(e){case ct.X:this._coordinates[t].x=n;break;case ct.Y:this._coordinates[t].y=n;break;default:this._coordinates[t].setOrdinate(e,n)}}},{key:"getZ",value:function(t){return this.hasZ()?this._coordinates[t].getZ():A.NaN}},{key:"size",value:function(){return this._coordinates.length}},{key:"getOrdinate",value:function(t,e){switch(e){case ct.X:return this._coordinates[t].x;case ct.Y:return this._coordinates[t].y;default:return this._coordinates[t].getOrdinate(e)}}},{key:"getCoordinate",value:function(){if(1===arguments.length){var t=arguments[0];return this._coordinates[t]}if(2===arguments.length){var e=arguments[0];arguments[1].setCoordinate(this._coordinates[e])}}},{key:"getCoordinateCopy",value:function(t){var e=this.createCoordinate();return e.setCoordinate(this._coordinates[t]),e}},{key:"createCoordinate",value:function(){return Zt.create(this.getDimension(),this.getMeasures())}},{key:"getDimension",value:function(){return this._dimension}},{key:"getX",value:function(t){return this._coordinates[t].x}},{key:"getMeasures",value:function(){return this._measures}},{key:"expandEnvelope",value:function(t){for(var e=0;e<this._coordinates.length;e++)t.expandToInclude(this._coordinates[e]);return t}},{key:"copy",value:function(){for(var t=new Array(this.size()).fill(null),n=0;n<this._coordinates.length;n++){var r=this.createCoordinate();r.setCoordinate(this._coordinates[n]),t[n]=r}return new e(t,this._dimension,this._measures)}},{key:"toString",value:function(){if(this._coordinates.length>0){var t=new Qt(17*this._coordinates.length);t.append("("),t.append(this._coordinates[0]);for(var e=1;e<this._coordinates.length;e++)t.append(", "),t.append(this._coordinates[e]);return t.append(")"),t.toString()}return"()"}},{key:"getY",value:function(t){return this._coordinates[t].y}},{key:"toCoordinateArray",value:function(){return this._coordinates}},{key:"interfaces_",get:function(){return[ct,b]}}],[{key:"constructor_",value:function(){if(this._dimension=3,this._measures=0,this._coordinates=null,1===arguments.length){if(arguments[0]instanceof Array){var t=arguments[0];e.constructor_.call(this,t,Wt.dimension(t),Wt.measures(t))}else if(Number.isInteger(arguments[0])){var n=arguments[0];this._coordinates=new Array(n).fill(null);for(var r=0;r<n;r++)this._coordinates[r]=new j}else if(ot(arguments[0],ct)){var i=arguments[0];if(null===i)return this._coordinates=new Array(0).fill(null),null;this._dimension=i.getDimension(),this._measures=i.getMeasures(),this._coordinates=new Array(i.size()).fill(null);for(var o=0;o<this._coordinates.length;o++)this._coordinates[o]=i.getCoordinateCopy(o)}}else if(2===arguments.length){if(arguments[0]instanceof Array&&Number.isInteger(arguments[1])){var s=arguments[0],a=arguments[1];e.constructor_.call(this,s,a,Wt.measures(s))}else if(Number.isInteger(arguments[0])&&Number.isInteger(arguments[1])){var u=arguments[0],l=arguments[1];this._coordinates=new Array(u).fill(null),this._dimension=l;for(var h=0;h<u;h++)this._coordinates[h]=Zt.create(l)}}else if(3===arguments.length)if(Number.isInteger(arguments[2])&&arguments[0]instanceof Array&&Number.isInteger(arguments[1])){var c=arguments[0],f=arguments[1],v=arguments[2];this._dimension=f,this._measures=v,this._coordinates=null===c?new Array(0).fill(null):c}else if(Number.isInteger(arguments[2])&&Number.isInteger(arguments[0])&&Number.isInteger(arguments[1])){var g=arguments[0],d=arguments[1],p=arguments[2];this._coordinates=new Array(g).fill(null),this._dimension=d,this._measures=p;for(var y=0;y<g;y++)this._coordinates[y]=this.createCoordinate()}}}]),e}(),te=function(){function e(){t(this,e)}return n(e,[{key:"readResolve",value:function(){return e.instance()}},{key:"create",value:function(){if(1===arguments.length){if(arguments[0]instanceof Array)return new $t(arguments[0]);if(ot(arguments[0],ct))return new $t(arguments[0])}else{if(2===arguments.length){var t=arguments[1];return t>3&&(t=3),t<2&&(t=2),new $t(arguments[0],t)}if(3===arguments.length){var e=arguments[2],n=arguments[1]-e;return e>1&&(e=1),n>3&&(n=3),n<2&&(n=2),new $t(arguments[0],n+e,e)}}}},{key:"interfaces_",get:function(){return[wt,b]}}],[{key:"instance",value:function(){return e.instanceObject}}]),e}();te.instanceObject=new te;var ee=function(e){r(s,e);var o=c(s);function s(){var e;return t(this,s),e=o.call(this),s.constructor_.apply(l(e),arguments),e}return n(s,[{key:"copyInternal",value:function(){for(var t=new Array(this._geometries.length).fill(null),e=0;e<t.length;e++)t[e]=this._geometries[e].copy();return new s(t,this._factory)}},{key:"equalsExact",value:function(){if(2===arguments.length&&"number"==typeof arguments[1]&&arguments[0]instanceof V){var t=arguments[0],e=arguments[1];return!!this.isEquivalentClass(t)&&f(i(s.prototype),"equalsExact",this).call(this,t,e)}return f(i(s.prototype),"equalsExact",this).apply(this,arguments)}},{key:"getBoundaryDimension",value:function(){return 1}},{key:"getTypeCode",value:function(){return V.TYPECODE_MULTIPOLYGON}},{key:"getDimension",value:function(){return 2}},{key:"getBoundary",value:function(){if(this.isEmpty())return this.getFactory().createMultiLineString();for(var t=new pt,e=0;e<this._geometries.length;e++)for(var n=this._geometries[e].getBoundary(),r=0;r<n.getNumGeometries();r++)t.add(n.getGeometryN(r));var i=new Array(t.size()).fill(null);return this.getFactory().createMultiLineString(t.toArray(i))}},{key:"getGeometryType",value:function(){return V.TYPENAME_MULTIPOLYGON}},{key:"interfaces_",get:function(){return[Dt]}}],[{key:"constructor_",value:function(){var t=arguments[0],e=arguments[1];Bt.constructor_.call(this,t,e)}}]),s}(Bt),ne=function(){function e(){t(this,e)}return n(e,[{key:"get",value:function(){}},{key:"put",value:function(){}},{key:"size",value:function(){}},{key:"values",value:function(){}},{key:"entrySet",value:function(){}}]),e}(),re=function(e){r(o,e);var i=c(o);function o(){var e;return t(this,o),(e=i.call(this)).map=new Map,e}return n(o,[{key:"get",value:function(t){return this.map.get(t)||null}},{key:"put",value:function(t,e){return this.map.set(t,e),e}},{key:"values",value:function(){for(var t=new pt,e=this.map.values(),n=e.next();!n.done;)t.add(n.value),n=e.next();return t}},{key:"entrySet",value:function(){var t=new Q;return this.map.entries().forEach((function(e){return t.add(e)})),t}},{key:"size",value:function(){return this.map.size()}}]),o}(ne),ie=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"equals",value:function(t){if(!(t instanceof e))return!1;var n=t;return this._modelType===n._modelType&&this._scale===n._scale}},{key:"compareTo",value:function(t){var e=t,n=this.getMaximumSignificantDigits(),r=e.getMaximumSignificantDigits();return at.compare(n,r)}},{key:"getScale",value:function(){return this._scale}},{key:"isFloating",value:function(){return this._modelType===e.FLOATING||this._modelType===e.FLOATING_SINGLE}},{key:"getType",value:function(){return this._modelType}},{key:"toString",value:function(){var t="UNKNOWN";return this._modelType===e.FLOATING?t="Floating":this._modelType===e.FLOATING_SINGLE?t="Floating-Single":this._modelType===e.FIXED&&(t="Fixed (Scale="+this.getScale()+")"),t}},{key:"makePrecise",value:function(){if("number"==typeof arguments[0]){var t=arguments[0];return A.isNaN(t)||this._modelType===e.FLOATING_SINGLE?t:this._modelType===e.FIXED?Math.round(t*this._scale)/this._scale:t}if(arguments[0]instanceof j){var n=arguments[0];if(this._modelType===e.FLOATING)return null;n.x=this.makePrecise(n.x),n.y=this.makePrecise(n.y)}}},{key:"getMaximumSignificantDigits",value:function(){var t=16;return this._modelType===e.FLOATING?t=16:this._modelType===e.FLOATING_SINGLE?t=6:this._modelType===e.FIXED&&(t=1+Math.trunc(Math.ceil(Math.log(this.getScale())/Math.log(10)))),t}},{key:"setScale",value:function(t){this._scale=Math.abs(t)}},{key:"interfaces_",get:function(){return[b,k]}}],[{key:"constructor_",value:function(){if(this._modelType=null,this._scale=null,0===arguments.length)this._modelType=e.FLOATING;else if(1===arguments.length)if(arguments[0]instanceof oe){var t=arguments[0];this._modelType=t,t===e.FIXED&&this.setScale(1)}else if("number"==typeof arguments[0]){var n=arguments[0];this._modelType=e.FIXED,this.setScale(n)}else if(arguments[0]instanceof e){var r=arguments[0];this._modelType=r._modelType,this._scale=r._scale}}},{key:"mostPrecise",value:function(t,e){return t.compareTo(e)>=0?t:e}}]),e}(),oe=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"readResolve",value:function(){return e.nameToTypeMap.get(this._name)}},{key:"toString",value:function(){return this._name}},{key:"interfaces_",get:function(){return[b]}}],[{key:"constructor_",value:function(){this._name=null;var t=arguments[0];this._name=t,e.nameToTypeMap.put(t,this)}}]),e}();oe.nameToTypeMap=new re,ie.Type=oe,ie.FIXED=new oe("FIXED"),ie.FLOATING=new oe("FLOATING"),ie.FLOATING_SINGLE=new oe("FLOATING SINGLE"),ie.maximumPreciseValue=9007199254740992;var se=function(e){r(s,e);var o=c(s);function s(){var e;return t(this,s),e=o.call(this),s.constructor_.apply(l(e),arguments),e}return n(s,[{key:"copyInternal",value:function(){for(var t=new Array(this._geometries.length).fill(null),e=0;e<t.length;e++)t[e]=this._geometries[e].copy();return new s(t,this._factory)}},{key:"equalsExact",value:function(){if(2===arguments.length&&"number"==typeof arguments[1]&&arguments[0]instanceof V){var t=arguments[0],e=arguments[1];return!!this.isEquivalentClass(t)&&f(i(s.prototype),"equalsExact",this).call(this,t,e)}return f(i(s.prototype),"equalsExact",this).apply(this,arguments)}},{key:"getBoundaryDimension",value:function(){return this.isClosed()?Mt.FALSE:0}},{key:"isClosed",value:function(){if(this.isEmpty())return!1;for(var t=0;t<this._geometries.length;t++)if(!this._geometries[t].isClosed())return!1;return!0}},{key:"getTypeCode",value:function(){return V.TYPECODE_MULTILINESTRING}},{key:"getDimension",value:function(){return 1}},{key:"getBoundary",value:function(){throw new J}},{key:"getGeometryType",value:function(){return V.TYPENAME_MULTILINESTRING}},{key:"interfaces_",get:function(){return[Nt]}}],[{key:"constructor_",value:function(){var t=arguments[0],e=arguments[1];Bt.constructor_.call(this,t,e)}}]),s}(Bt),ae=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"createEmpty",value:function(t){switch(t){case-1:return this.createGeometryCollection();case 0:return this.createPoint();case 1:return this.createLineString();case 2:return this.createPolygon();default:throw new x("Invalid dimension: "+t)}}},{key:"toGeometry",value:function(t){return t.isNull()?this.createPoint():t.getMinX()===t.getMaxX()&&t.getMinY()===t.getMaxY()?this.createPoint(new j(t.getMinX(),t.getMinY())):t.getMinX()===t.getMaxX()||t.getMinY()===t.getMaxY()?this.createLineString([new j(t.getMinX(),t.getMinY()),new j(t.getMaxX(),t.getMaxY())]):this.createPolygon(this.createLinearRing([new j(t.getMinX(),t.getMinY()),new j(t.getMinX(),t.getMaxY()),new j(t.getMaxX(),t.getMaxY()),new j(t.getMaxX(),t.getMinY()),new j(t.getMinX(),t.getMinY())]),null)}},{key:"createLineString",value:function(){if(0===arguments.length)return this.createLineString(this.getCoordinateSequenceFactory().create([]));if(1===arguments.length){if(arguments[0]instanceof Array){var t=arguments[0];return this.createLineString(null!==t?this.getCoordinateSequenceFactory().create(t):null)}if(ot(arguments[0],ct))return new Ct(arguments[0],this)}}},{key:"createMultiLineString",value:function(){return 0===arguments.length?new se(null,this):1===arguments.length?new se(arguments[0],this):void 0}},{key:"buildGeometry",value:function(t){for(var n=null,r=!1,i=!1,o=t.iterator();o.hasNext();){var s=o.next(),a=s.getTypeCode();null===n&&(n=a),a!==n&&(r=!0),s instanceof Bt&&(i=!0)}if(null===n)return this.createGeometryCollection();if(r||i)return this.createGeometryCollection(e.toGeometryArray(t));var u=t.iterator().next();if(t.size()>1){if(u instanceof Ft)return this.createMultiPolygon(e.toPolygonArray(t));if(u instanceof Ct)return this.createMultiLineString(e.toLineStringArray(t));if(u instanceof Ot)return this.createMultiPoint(e.toPointArray(t));G.shouldNeverReachHere("Unhandled geometry type: "+u.getGeometryType())}return u}},{key:"createMultiPointFromCoords",value:function(t){return this.createMultiPoint(null!==t?this.getCoordinateSequenceFactory().create(t):null)}},{key:"createPoint",value:function(){if(0===arguments.length)return this.createPoint(this.getCoordinateSequenceFactory().create([]));if(1===arguments.length){if(arguments[0]instanceof j){var t=arguments[0];return this.createPoint(null!==t?this.getCoordinateSequenceFactory().create([t]):null)}if(ot(arguments[0],ct))return new Ot(arguments[0],this)}}},{key:"getCoordinateSequenceFactory",value:function(){return this._coordinateSequenceFactory}},{key:"createPolygon",value:function(){if(0===arguments.length)return this.createPolygon(null,null);if(1===arguments.length){if(ot(arguments[0],ct)){var t=arguments[0];return this.createPolygon(this.createLinearRing(t))}if(arguments[0]instanceof Array){var e=arguments[0];return this.createPolygon(this.createLinearRing(e))}if(arguments[0]instanceof jt){var n=arguments[0];return this.createPolygon(n,null)}}else if(2===arguments.length)return new Ft(arguments[0],arguments[1],this)}},{key:"getSRID",value:function(){return this._SRID}},{key:"createGeometryCollection",value:function(){return 0===arguments.length?new Bt(null,this):1===arguments.length?new Bt(arguments[0],this):void 0}},{key:"getPrecisionModel",value:function(){return this._precisionModel}},{key:"createLinearRing",value:function(){if(0===arguments.length)return this.createLinearRing(this.getCoordinateSequenceFactory().create([]));if(1===arguments.length){if(arguments[0]instanceof Array){var t=arguments[0];return this.createLinearRing(null!==t?this.getCoordinateSequenceFactory().create(t):null)}if(ot(arguments[0],ct))return new jt(arguments[0],this)}}},{key:"createMultiPolygon",value:function(){return 0===arguments.length?new ee(null,this):1===arguments.length?new ee(arguments[0],this):void 0}},{key:"createMultiPoint",value:function(){if(0===arguments.length)return new zt(null,this);if(1===arguments.length){if(arguments[0]instanceof Array)return new zt(arguments[0],this);if(ot(arguments[0],ct)){var t=arguments[0];if(null===t)return this.createMultiPoint(new Array(0).fill(null));for(var e=new Array(t.size()).fill(null),n=0;n<t.size();n++){var r=this.getCoordinateSequenceFactory().create(1,t.getDimension(),t.getMeasures());St.copy(t,n,r,0,1),e[n]=this.createPoint(r)}return this.createMultiPoint(e)}}}},{key:"interfaces_",get:function(){return[b]}}],[{key:"constructor_",value:function(){if(this._precisionModel=null,this._coordinateSequenceFactory=null,this._SRID=null,0===arguments.length)e.constructor_.call(this,new ie,0);else if(1===arguments.length){if(ot(arguments[0],wt)){var t=arguments[0];e.constructor_.call(this,new ie,0,t)}else if(arguments[0]instanceof ie){var n=arguments[0];e.constructor_.call(this,n,0,e.getDefaultCoordinateSequenceFactory())}}else if(2===arguments.length){var r=arguments[0],i=arguments[1];e.constructor_.call(this,r,i,e.getDefaultCoordinateSequenceFactory())}else if(3===arguments.length){var o=arguments[0],s=arguments[1],a=arguments[2];this._precisionModel=o,this._coordinateSequenceFactory=a,this._SRID=s}}},{key:"toMultiPolygonArray",value:function(t){var e=new Array(t.size()).fill(null);return t.toArray(e)}},{key:"toGeometryArray",value:function(t){if(null===t)return null;var e=new Array(t.size()).fill(null);return t.toArray(e)}},{key:"getDefaultCoordinateSequenceFactory",value:function(){return te.instance()}},{key:"toMultiLineStringArray",value:function(t){var e=new Array(t.size()).fill(null);return t.toArray(e)}},{key:"toLineStringArray",value:function(t){var e=new Array(t.size()).fill(null);return t.toArray(e)}},{key:"toMultiPointArray",value:function(t){var e=new Array(t.size()).fill(null);return t.toArray(e)}},{key:"toLinearRingArray",value:function(t){var e=new Array(t.size()).fill(null);return t.toArray(e)}},{key:"toPointArray",value:function(t){var e=new Array(t.size()).fill(null);return t.toArray(e)}},{key:"toPolygonArray",value:function(t){var e=new Array(t.size()).fill(null);return t.toArray(e)}},{key:"createPointFromInternalCoord",value:function(t,e){return e.getPrecisionModel().makePrecise(t),e.getFactory().createPoint(t)}}]),e}(),ue="XY",le="XYZ",he="XYM",ce="XYZM",fe={POINT:"Point",LINE_STRING:"LineString",LINEAR_RING:"LinearRing",POLYGON:"Polygon",MULTI_POINT:"MultiPoint",MULTI_LINE_STRING:"MultiLineString",MULTI_POLYGON:"MultiPolygon",GEOMETRY_COLLECTION:"GeometryCollection",CIRCLE:"Circle"},ve="EMPTY",ge=1,de=2,pe=3,ye=4,me=5,_e=6;for(var xe in fe)fe[xe].toUpperCase();var Ee=function(){function e(n){t(this,e),this.wkt=n,this.index_=-1}return n(e,[{key:"isAlpha_",value:function(t){return t>="a"&&t<="z"||t>="A"&&t<="Z"}},{key:"isNumeric_",value:function(t,e){return t>="0"&&t<="9"||"."==t&&!(void 0!==e&&e)}},{key:"isWhiteSpace_",value:function(t){return" "==t||"\t"==t||"\r"==t||"\n"==t}},{key:"nextChar_",value:function(){return this.wkt.charAt(++this.index_)}},{key:"nextToken",value:function(){var t,e=this.nextChar_(),n=this.index_,r=e;if("("==e)t=de;else if(","==e)t=me;else if(")"==e)t=pe;else if(this.isNumeric_(e)||"-"==e)t=ye,r=this.readNumber_();else if(this.isAlpha_(e))t=ge,r=this.readText_();else{if(this.isWhiteSpace_(e))return this.nextToken();if(""!==e)throw new Error("Unexpected character: "+e);t=_e}return{position:n,value:r,type:t}}},{key:"readNumber_",value:function(){var t,e=this.index_,n=!1,r=!1;do{"."==t?n=!0:"e"!=t&&"E"!=t||(r=!0),t=this.nextChar_()}while(this.isNumeric_(t,n)||!r&&("e"==t||"E"==t)||r&&("-"==t||"+"==t));return parseFloat(this.wkt.substring(e,this.index_--))}},{key:"readText_",value:function(){var t,e=this.index_;do{t=this.nextChar_()}while(this.isAlpha_(t));return this.wkt.substring(e,this.index_--).toUpperCase()}}]),e}(),ke=function(){function e(n,r){t(this,e),this.lexer_=n,this.token_,this.layout_=ue,this.factory=r}return n(e,[{key:"consume_",value:function(){this.token_=this.lexer_.nextToken()}},{key:"isTokenType",value:function(t){return this.token_.type==t}},{key:"match",value:function(t){var e=this.isTokenType(t);return e&&this.consume_(),e}},{key:"parse",value:function(){return this.consume_(),this.parseGeometry_()}},{key:"parseGeometryLayout_",value:function(){var t=ue,e=this.token_;if(this.isTokenType(ge)){var n=e.value;"Z"===n?t=le:"M"===n?t=he:"ZM"===n&&(t=ce),t!==ue&&this.consume_()}return t}},{key:"parseGeometryCollectionText_",value:function(){if(this.match(de)){var t=[];do{t.push(this.parseGeometry_())}while(this.match(me));if(this.match(pe))return t}else if(this.isEmptyGeometry_())return[];throw new Error(this.formatErrorMessage_())}},{key:"parsePointText_",value:function(){if(this.match(de)){var t=this.parsePoint_();if(this.match(pe))return t}else if(this.isEmptyGeometry_())return null;throw new Error(this.formatErrorMessage_())}},{key:"parseLineStringText_",value:function(){if(this.match(de)){var t=this.parsePointList_();if(this.match(pe))return t}else if(this.isEmptyGeometry_())return[];throw new Error(this.formatErrorMessage_())}},{key:"parsePolygonText_",value:function(){if(this.match(de)){var t=this.parseLineStringTextList_();if(this.match(pe))return t}else if(this.isEmptyGeometry_())return[];throw new Error(this.formatErrorMessage_())}},{key:"parseMultiPointText_",value:function(){var t;if(this.match(de)){if(t=this.token_.type==de?this.parsePointTextList_():this.parsePointList_(),this.match(pe))return t}else if(this.isEmptyGeometry_())return[];throw new Error(this.formatErrorMessage_())}},{key:"parseMultiLineStringText_",value:function(){if(this.match(de)){var t=this.parseLineStringTextList_();if(this.match(pe))return t}else if(this.isEmptyGeometry_())return[];throw new Error(this.formatErrorMessage_())}},{key:"parseMultiPolygonText_",value:function(){if(this.match(de)){var t=this.parsePolygonTextList_();if(this.match(pe))return t}else if(this.isEmptyGeometry_())return[];throw new Error(this.formatErrorMessage_())}},{key:"parsePoint_",value:function(){for(var t=[],e=this.layout_.length,n=0;n<e;++n){var r=this.token_;if(!this.match(ye))break;t.push(r.value)}if(t.length==e)return t;throw new Error(this.formatErrorMessage_())}},{key:"parsePointList_",value:function(){for(var t=[this.parsePoint_()];this.match(me);)t.push(this.parsePoint_());return t}},{key:"parsePointTextList_",value:function(){for(var t=[this.parsePointText_()];this.match(me);)t.push(this.parsePointText_());return t}},{key:"parseLineStringTextList_",value:function(){for(var t=[this.parseLineStringText_()];this.match(me);)t.push(this.parseLineStringText_());return t}},{key:"parsePolygonTextList_",value:function(){for(var t=[this.parsePolygonText_()];this.match(me);)t.push(this.parsePolygonText_());return t}},{key:"isEmptyGeometry_",value:function(){var t=this.isTokenType(ge)&&this.token_.value==ve;return t&&this.consume_(),t}},{key:"formatErrorMessage_",value:function(){return"Unexpected `"+this.token_.value+"` at position "+this.token_.position+" in `"+this.lexer_.wkt+"`"}},{key:"parseGeometry_",value:function(){var t=this.factory,e=function(t){return a(j,v(t))},n=function(n){var r=n.map((function(n){return t.createLinearRing(n.map(e))}));return r.length>1?t.createPolygon(r[0],r.slice(1)):t.createPolygon(r[0])},r=this.token_;if(this.match(ge)){var i=r.value;if(this.layout_=this.parseGeometryLayout_(),"GEOMETRYCOLLECTION"==i){var o=this.parseGeometryCollectionText_();return t.createGeometryCollection(o)}switch(i){case"POINT":var s=this.parsePointText_();return s?t.createPoint(a(j,v(s))):t.createPoint();case"LINESTRING":var u=this.parseLineStringText_().map(e);return t.createLineString(u);case"LINEARRING":var l=this.parseLineStringText_().map(e);return t.createLinearRing(l);case"POLYGON":var h=this.parsePolygonText_();return h&&0!==h.length?n(h):t.createPolygon();case"MULTIPOINT":var c=this.parseMultiPointText_();if(!c||0===c.length)return t.createMultiPoint();var f=c.map(e).map((function(e){return t.createPoint(e)}));return t.createMultiPoint(f);case"MULTILINESTRING":var g=this.parseMultiLineStringText_().map((function(n){return t.createLineString(n.map(e))}));return t.createMultiLineString(g);case"MULTIPOLYGON":var d=this.parseMultiPolygonText_();if(!d||0===d.length)return t.createMultiPolygon();var p=d.map(n);return t.createMultiPolygon(p);default:throw new Error("Invalid geometry type: "+i)}}throw new Error(this.formatErrorMessage_())}}]),e}();function we(t){if(t.isEmpty())return"";var e=t.getCoordinate(),n=[e.x,e.y];return void 0===e.z||Number.isNaN(e.z)||n.push(e.z),void 0===e.m||Number.isNaN(e.m)||n.push(e.m),n.join(" ")}function be(t){for(var e=t.getCoordinates().map((function(t){var e=[t.x,t.y];return void 0===t.z||Number.isNaN(t.z)||e.push(t.z),void 0===t.m||Number.isNaN(t.m)||e.push(t.m),e})),n=[],r=0,i=e.length;r<i;++r)n.push(e[r].join(" "));return n.join(", ")}function Ie(t){var e=[];e.push("("+be(t.getExteriorRing())+")");for(var n=0,r=t.getNumInteriorRing();n<r;++n)e.push("("+be(t.getInteriorRingN(n))+")");return e.join(", ")}var Ne={Point:we,LineString:be,LinearRing:be,Polygon:Ie,MultiPoint:function(t){for(var e=[],n=0,r=t.getNumGeometries();n<r;++n)e.push("("+we(t.getGeometryN(n))+")");return e.join(", ")},MultiLineString:function(t){for(var e=[],n=0,r=t.getNumGeometries();n<r;++n)e.push("("+be(t.getGeometryN(n))+")");return e.join(", ")},MultiPolygon:function(t){for(var e=[],n=0,r=t.getNumGeometries();n<r;++n)e.push("("+Ie(t.getGeometryN(n))+")");return e.join(", ")},GeometryCollection:function(t){for(var e=[],n=0,r=t.getNumGeometries();n<r;++n)e.push(Se(t.getGeometryN(n)));return e.join(", ")}};function Se(t){var e=t.getGeometryType(),n=Ne[e];e=e.toUpperCase();var r=function(t){var e="";if(t.isEmpty())return e;var n=t.getCoordinate();return void 0===n.z||Number.isNaN(n.z)||(e+="Z"),void 0===n.m||Number.isNaN(n.m)||(e+="M"),e}(t);return r.length>0&&(e+=" "+r),t.isEmpty()?e+" "+ve:e+" ("+n(t)+")"}var Me=function(){function e(n){t(this,e),this.geometryFactory=n||new ae,this.precisionModel=this.geometryFactory.getPrecisionModel()}return n(e,[{key:"read",value:function(t){var e=new Ee(t);return new ke(e,this.geometryFactory).parse()}},{key:"write",value:function(t){return Se(t)}}]),e}(),Le=function(){function e(n){t(this,e),this.parser=new Me(n)}return n(e,[{key:"write",value:function(t){return this.parser.write(t)}}],[{key:"toLineString",value:function(t,e){if(2!==arguments.length)throw new Error("Not implemented");return"LINESTRING ( "+t.x+" "+t.y+", "+e.x+" "+e.y+" )"}}]),e}(),Pe=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"getIndexAlongSegment",value:function(t,e){return this.computeIntLineIndex(),this._intLineIndex[t][e]}},{key:"getTopologySummary",value:function(){var t=new Qt;return this.isEndPoint()&&t.append(" endpoint"),this._isProper&&t.append(" proper"),this.isCollinear()&&t.append(" collinear"),t.toString()}},{key:"computeIntersection",value:function(t,e,n,r){this._inputLines[0][0]=t,this._inputLines[0][1]=e,this._inputLines[1][0]=n,this._inputLines[1][1]=r,this._result=this.computeIntersect(t,e,n,r)}},{key:"getIntersectionNum",value:function(){return this._result}},{key:"computeIntLineIndex",value:function(){if(0===arguments.length)null===this._intLineIndex&&(this._intLineIndex=Array(2).fill().map((function(){return Array(2)})),this.computeIntLineIndex(0),this.computeIntLineIndex(1));else if(1===arguments.length){var t=arguments[0];this.getEdgeDistance(t,0)>this.getEdgeDistance(t,1)?(this._intLineIndex[t][0]=0,this._intLineIndex[t][1]=1):(this._intLineIndex[t][0]=1,this._intLineIndex[t][1]=0)}}},{key:"isProper",value:function(){return this.hasIntersection()&&this._isProper}},{key:"setPrecisionModel",value:function(t){this._precisionModel=t}},{key:"isInteriorIntersection",value:function(){if(0===arguments.length)return!!this.isInteriorIntersection(0)||!!this.isInteriorIntersection(1);if(1===arguments.length){for(var t=arguments[0],e=0;e<this._result;e++)if(!this._intPt[e].equals2D(this._inputLines[t][0])&&!this._intPt[e].equals2D(this._inputLines[t][1]))return!0;return!1}}},{key:"getIntersection",value:function(t){return this._intPt[t]}},{key:"isEndPoint",value:function(){return this.hasIntersection()&&!this._isProper}},{key:"hasIntersection",value:function(){return this._result!==e.NO_INTERSECTION}},{key:"getEdgeDistance",value:function(t,n){return e.computeEdgeDistance(this._intPt[n],this._inputLines[t][0],this._inputLines[t][1])}},{key:"isCollinear",value:function(){return this._result===e.COLLINEAR_INTERSECTION}},{key:"toString",value:function(){return Le.toLineString(this._inputLines[0][0],this._inputLines[0][1])+" - "+Le.toLineString(this._inputLines[1][0],this._inputLines[1][1])+this.getTopologySummary()}},{key:"getEndpoint",value:function(t,e){return this._inputLines[t][e]}},{key:"isIntersection",value:function(t){for(var e=0;e<this._result;e++)if(this._intPt[e].equals2D(t))return!0;return!1}},{key:"getIntersectionAlongSegment",value:function(t,e){return this.computeIntLineIndex(),this._intPt[this._intLineIndex[t][e]]}}],[{key:"constructor_",value:function(){this._result=null,this._inputLines=Array(2).fill().map((function(){return Array(2)})),this._intPt=new Array(2).fill(null),this._intLineIndex=null,this._isProper=null,this._pa=null,this._pb=null,this._precisionModel=null,this._intPt[0]=new j,this._intPt[1]=new j,this._pa=this._intPt[0],this._pb=this._intPt[1],this._result=0}},{key:"computeEdgeDistance",value:function(t,e,n){var r=Math.abs(n.x-e.x),i=Math.abs(n.y-e.y),o=-1;if(t.equals(e))o=0;else if(t.equals(n))o=r>i?r:i;else{var s=Math.abs(t.x-e.x),a=Math.abs(t.y-e.y);0!==(o=r>i?s:a)||t.equals(e)||(o=Math.max(s,a))}return G.isTrue(!(0===o&&!t.equals(e)),"Bad distance calculation"),o}},{key:"nonRobustComputeEdgeDistance",value:function(t,e,n){var r=t.x-e.x,i=t.y-e.y,o=Math.sqrt(r*r+i*i);return G.isTrue(!(0===o&&!t.equals(e)),"Invalid distance calculation"),o}}]),e}();Pe.DONT_INTERSECT=0,Pe.DO_INTERSECT=1,Pe.COLLINEAR=2,Pe.NO_INTERSECTION=0,Pe.POINT_INTERSECTION=1,Pe.COLLINEAR_INTERSECTION=2;var Ce=function(e){r(s,e);var o=c(s);function s(){return t(this,s),o.call(this)}return n(s,[{key:"isInSegmentEnvelopes",value:function(t){var e=new U(this._inputLines[0][0],this._inputLines[0][1]),n=new U(this._inputLines[1][0],this._inputLines[1][1]);return e.contains(t)&&n.contains(t)}},{key:"computeIntersection",value:function(){if(3!==arguments.length)return f(i(s.prototype),"computeIntersection",this).apply(this,arguments);var t=arguments[0],e=arguments[1],n=arguments[2];if(this._isProper=!1,U.intersects(e,n,t)&&0===ft.index(e,n,t)&&0===ft.index(n,e,t))return this._isProper=!0,(t.equals(e)||t.equals(n))&&(this._isProper=!1),this._result=Pe.POINT_INTERSECTION,null;this._result=Pe.NO_INTERSECTION}},{key:"intersection",value:function(t,e,n,r){var i=this.intersectionSafe(t,e,n,r);return this.isInSegmentEnvelopes(i)||(i=new j(s.nearestEndpoint(t,e,n,r))),null!==this._precisionModel&&this._precisionModel.makePrecise(i),i}},{key:"checkDD",value:function(t,e,n,r,i){var o=ht.intersection(t,e,n,r),s=this.isInSegmentEnvelopes(o);xt.out.println("DD in env = "+s+"  --------------------- "+o),i.distance(o)>1e-4&&xt.out.println("Distance = "+i.distance(o))}},{key:"intersectionSafe",value:function(t,e,n,r){var i=_t.intersection(t,e,n,r);return null===i&&(i=s.nearestEndpoint(t,e,n,r)),i}},{key:"computeCollinearIntersection",value:function(t,e,n,r){var i=U.intersects(t,e,n),o=U.intersects(t,e,r),s=U.intersects(n,r,t),a=U.intersects(n,r,e);return i&&o?(this._intPt[0]=n,this._intPt[1]=r,Pe.COLLINEAR_INTERSECTION):s&&a?(this._intPt[0]=t,this._intPt[1]=e,Pe.COLLINEAR_INTERSECTION):i&&s?(this._intPt[0]=n,this._intPt[1]=t,!n.equals(t)||o||a?Pe.COLLINEAR_INTERSECTION:Pe.POINT_INTERSECTION):i&&a?(this._intPt[0]=n,this._intPt[1]=e,!n.equals(e)||o||s?Pe.COLLINEAR_INTERSECTION:Pe.POINT_INTERSECTION):o&&s?(this._intPt[0]=r,this._intPt[1]=t,!r.equals(t)||i||a?Pe.COLLINEAR_INTERSECTION:Pe.POINT_INTERSECTION):o&&a?(this._intPt[0]=r,this._intPt[1]=e,!r.equals(e)||i||s?Pe.COLLINEAR_INTERSECTION:Pe.POINT_INTERSECTION):Pe.NO_INTERSECTION}},{key:"computeIntersect",value:function(t,e,n,r){if(this._isProper=!1,!U.intersects(t,e,n,r))return Pe.NO_INTERSECTION;var i=ft.index(t,e,n),o=ft.index(t,e,r);if(i>0&&o>0||i<0&&o<0)return Pe.NO_INTERSECTION;var s=ft.index(n,r,t),a=ft.index(n,r,e);return s>0&&a>0||s<0&&a<0?Pe.NO_INTERSECTION:0===i&&0===o&&0===s&&0===a?this.computeCollinearIntersection(t,e,n,r):(0===i||0===o||0===s||0===a?(this._isProper=!1,t.equals2D(n)||t.equals2D(r)?this._intPt[0]=t:e.equals2D(n)||e.equals2D(r)?this._intPt[0]=e:0===i?this._intPt[0]=new j(n):0===o?this._intPt[0]=new j(r):0===s?this._intPt[0]=new j(t):0===a&&(this._intPt[0]=new j(e))):(this._isProper=!0,this._intPt[0]=this.intersection(t,e,n,r)),Pe.POINT_INTERSECTION)}}],[{key:"nearestEndpoint",value:function(t,e,n,r){var i=t,o=kt.pointToSegment(t,n,r),s=kt.pointToSegment(e,n,r);return s<o&&(o=s,i=e),(s=kt.pointToSegment(n,t,e))<o&&(o=s,i=n),(s=kt.pointToSegment(r,t,e))<o&&(o=s,i=r),i}}]),s}(Pe),Te=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"countSegment",value:function(t,e){if(t.x<this._p.x&&e.x<this._p.x)return null;if(this._p.x===e.x&&this._p.y===e.y)return this._isPointOnSegment=!0,null;if(t.y===this._p.y&&e.y===this._p.y){var n=t.x,r=e.x;return n>r&&(n=e.x,r=t.x),this._p.x>=n&&this._p.x<=r&&(this._isPointOnSegment=!0),null}if(t.y>this._p.y&&e.y<=this._p.y||e.y>this._p.y&&t.y<=this._p.y){var i=ft.index(t,e,this._p);if(i===ft.COLLINEAR)return this._isPointOnSegment=!0,null;e.y<t.y&&(i=-i),i===ft.LEFT&&this._crossingCount++}}},{key:"isPointInPolygon",value:function(){return this.getLocation()!==Z.EXTERIOR}},{key:"getLocation",value:function(){return this._isPointOnSegment?Z.BOUNDARY:this._crossingCount%2==1?Z.INTERIOR:Z.EXTERIOR}},{key:"isOnSegment",value:function(){return this._isPointOnSegment}}],[{key:"constructor_",value:function(){this._p=null,this._crossingCount=0,this._isPointOnSegment=!1;var t=arguments[0];this._p=t}},{key:"locatePointInRing",value:function(){if(arguments[0]instanceof j&&ot(arguments[1],ct)){for(var t=arguments[1],n=new e(arguments[0]),r=new j,i=new j,o=1;o<t.size();o++)if(t.getCoordinate(o,r),t.getCoordinate(o-1,i),n.countSegment(r,i),n.isOnSegment())return n.getLocation();return n.getLocation()}if(arguments[0]instanceof j&&arguments[1]instanceof Array){for(var s=arguments[1],a=new e(arguments[0]),u=1;u<s.length;u++){var l=s[u],h=s[u-1];if(a.countSegment(l,h),a.isOnSegment())return a.getLocation()}return a.getLocation()}}}]),e}(),Oe=function(){function e(){t(this,e)}return n(e,null,[{key:"isOnLine",value:function(){if(arguments[0]instanceof j&&ot(arguments[1],ct)){for(var t=arguments[0],e=arguments[1],n=new Ce,r=new j,i=new j,o=e.size(),s=1;s<o;s++)if(e.getCoordinate(s-1,r),e.getCoordinate(s,i),n.computeIntersection(t,r,i),n.hasIntersection())return!0;return!1}if(arguments[0]instanceof j&&arguments[1]instanceof Array){for(var a=arguments[0],u=arguments[1],l=new Ce,h=1;h<u.length;h++){var c=u[h-1],f=u[h];if(l.computeIntersection(a,c,f),l.hasIntersection())return!0}return!1}}},{key:"locateInRing",value:function(t,e){return Te.locatePointInRing(t,e)}},{key:"isInRing",value:function(t,n){return e.locateInRing(t,n)!==Z.EXTERIOR}}]),e}(),Re=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"setAllLocations",value:function(t){for(var e=0;e<this.location.length;e++)this.location[e]=t}},{key:"isNull",value:function(){for(var t=0;t<this.location.length;t++)if(this.location[t]!==Z.NONE)return!1;return!0}},{key:"setAllLocationsIfNull",value:function(t){for(var e=0;e<this.location.length;e++)this.location[e]===Z.NONE&&(this.location[e]=t)}},{key:"isLine",value:function(){return 1===this.location.length}},{key:"merge",value:function(t){if(t.location.length>this.location.length){var e=new Array(3).fill(null);e[tt.ON]=this.location[tt.ON],e[tt.LEFT]=Z.NONE,e[tt.RIGHT]=Z.NONE,this.location=e}for(var n=0;n<this.location.length;n++)this.location[n]===Z.NONE&&n<t.location.length&&(this.location[n]=t.location[n])}},{key:"getLocations",value:function(){return this.location}},{key:"flip",value:function(){if(this.location.length<=1)return null;var t=this.location[tt.LEFT];this.location[tt.LEFT]=this.location[tt.RIGHT],this.location[tt.RIGHT]=t}},{key:"toString",value:function(){var t=new st;return this.location.length>1&&t.append(Z.toLocationSymbol(this.location[tt.LEFT])),t.append(Z.toLocationSymbol(this.location[tt.ON])),this.location.length>1&&t.append(Z.toLocationSymbol(this.location[tt.RIGHT])),t.toString()}},{key:"setLocations",value:function(t,e,n){this.location[tt.ON]=t,this.location[tt.LEFT]=e,this.location[tt.RIGHT]=n}},{key:"get",value:function(t){return t<this.location.length?this.location[t]:Z.NONE}},{key:"isArea",value:function(){return this.location.length>1}},{key:"isAnyNull",value:function(){for(var t=0;t<this.location.length;t++)if(this.location[t]===Z.NONE)return!0;return!1}},{key:"setLocation",value:function(){if(1===arguments.length){var t=arguments[0];this.setLocation(tt.ON,t)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];this.location[e]=n}}},{key:"init",value:function(t){this.location=new Array(t).fill(null),this.setAllLocations(Z.NONE)}},{key:"isEqualOnSide",value:function(t,e){return this.location[e]===t.location[e]}},{key:"allPositionsEqual",value:function(t){for(var e=0;e<this.location.length;e++)if(this.location[e]!==t)return!1;return!0}}],[{key:"constructor_",value:function(){if(this.location=null,1===arguments.length){if(arguments[0]instanceof Array){var t=arguments[0];this.init(t.length)}else if(Number.isInteger(arguments[0])){var n=arguments[0];this.init(1),this.location[tt.ON]=n}else if(arguments[0]instanceof e){var r=arguments[0];if(this.init(r.location.length),null!==r)for(var i=0;i<this.location.length;i++)this.location[i]=r.location[i]}}else if(3===arguments.length){var o=arguments[0],s=arguments[1],a=arguments[2];this.init(3),this.location[tt.ON]=o,this.location[tt.LEFT]=s,this.location[tt.RIGHT]=a}}}]),e}(),Ae=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"getGeometryCount",value:function(){var t=0;return this.elt[0].isNull()||t++,this.elt[1].isNull()||t++,t}},{key:"setAllLocations",value:function(t,e){this.elt[t].setAllLocations(e)}},{key:"isNull",value:function(t){return this.elt[t].isNull()}},{key:"setAllLocationsIfNull",value:function(){if(1===arguments.length){var t=arguments[0];this.setAllLocationsIfNull(0,t),this.setAllLocationsIfNull(1,t)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];this.elt[e].setAllLocationsIfNull(n)}}},{key:"isLine",value:function(t){return this.elt[t].isLine()}},{key:"merge",value:function(t){for(var e=0;e<2;e++)null===this.elt[e]&&null!==t.elt[e]?this.elt[e]=new Re(t.elt[e]):this.elt[e].merge(t.elt[e])}},{key:"flip",value:function(){this.elt[0].flip(),this.elt[1].flip()}},{key:"getLocation",value:function(){if(1===arguments.length){var t=arguments[0];return this.elt[t].get(tt.ON)}if(2===arguments.length){var e=arguments[0],n=arguments[1];return this.elt[e].get(n)}}},{key:"toString",value:function(){var t=new st;return null!==this.elt[0]&&(t.append("A:"),t.append(this.elt[0].toString())),null!==this.elt[1]&&(t.append(" B:"),t.append(this.elt[1].toString())),t.toString()}},{key:"isArea",value:function(){if(0===arguments.length)return this.elt[0].isArea()||this.elt[1].isArea();if(1===arguments.length){var t=arguments[0];return this.elt[t].isArea()}}},{key:"isAnyNull",value:function(t){return this.elt[t].isAnyNull()}},{key:"setLocation",value:function(){if(2===arguments.length){var t=arguments[0],e=arguments[1];this.elt[t].setLocation(tt.ON,e)}else if(3===arguments.length){var n=arguments[0],r=arguments[1],i=arguments[2];this.elt[n].setLocation(r,i)}}},{key:"isEqualOnSide",value:function(t,e){return this.elt[0].isEqualOnSide(t.elt[0],e)&&this.elt[1].isEqualOnSide(t.elt[1],e)}},{key:"allPositionsEqual",value:function(t,e){return this.elt[t].allPositionsEqual(e)}},{key:"toLine",value:function(t){this.elt[t].isArea()&&(this.elt[t]=new Re(this.elt[t].location[0]))}}],[{key:"constructor_",value:function(){if(this.elt=new Array(2).fill(null),1===arguments.length){if(Number.isInteger(arguments[0])){var t=arguments[0];this.elt[0]=new Re(t),this.elt[1]=new Re(t)}else if(arguments[0]instanceof e){var n=arguments[0];this.elt[0]=new Re(n.elt[0]),this.elt[1]=new Re(n.elt[1])}}else if(2===arguments.length){var r=arguments[0],i=arguments[1];this.elt[0]=new Re(Z.NONE),this.elt[1]=new Re(Z.NONE),this.elt[r].setLocation(i)}else if(3===arguments.length){var o=arguments[0],s=arguments[1],a=arguments[2];this.elt[0]=new Re(o,s,a),this.elt[1]=new Re(o,s,a)}else if(4===arguments.length){var u=arguments[0],l=arguments[1],h=arguments[2],c=arguments[3];this.elt[0]=new Re(Z.NONE,Z.NONE,Z.NONE),this.elt[1]=new Re(Z.NONE,Z.NONE,Z.NONE),this.elt[u].setLocations(l,h,c)}}},{key:"toLineLabel",value:function(t){for(var n=new e(Z.NONE),r=0;r<2;r++)n.setLocation(r,t.getLocation(r));return n}}]),e}(),De=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"computeRing",value:function(){if(null!==this._ring)return null;for(var t=new Array(this._pts.size()).fill(null),e=0;e<this._pts.size();e++)t[e]=this._pts.get(e);this._ring=this._geometryFactory.createLinearRing(t),this._isHole=ft.isCCW(this._ring.getCoordinates())}},{key:"isIsolated",value:function(){return 1===this._label.getGeometryCount()}},{key:"computePoints",value:function(t){this._startDe=t;var e=t,n=!0;do{if(null===e)throw new gt("Found null DirectedEdge");if(e.getEdgeRing()===this)throw new gt("Directed Edge visited twice during ring-building at "+e.getCoordinate());this._edges.add(e);var r=e.getLabel();G.isTrue(r.isArea()),this.mergeLabel(r),this.addPoints(e.getEdge(),e.isForward(),n),n=!1,this.setEdgeRing(e,this),e=this.getNext(e)}while(e!==this._startDe)}},{key:"getLinearRing",value:function(){return this._ring}},{key:"getCoordinate",value:function(t){return this._pts.get(t)}},{key:"computeMaxNodeDegree",value:function(){this._maxNodeDegree=0;var t=this._startDe;do{var e=t.getNode().getEdges().getOutgoingDegree(this);e>this._maxNodeDegree&&(this._maxNodeDegree=e),t=this.getNext(t)}while(t!==this._startDe);this._maxNodeDegree*=2}},{key:"addPoints",value:function(t,e,n){var r=t.getCoordinates();if(e){var i=1;n&&(i=0);for(var o=i;o<r.length;o++)this._pts.add(r[o])}else{var s=r.length-2;n&&(s=r.length-1);for(var a=s;a>=0;a--)this._pts.add(r[a])}}},{key:"isHole",value:function(){return this._isHole}},{key:"setInResult",value:function(){var t=this._startDe;do{t.getEdge().setInResult(!0),t=t.getNext()}while(t!==this._startDe)}},{key:"containsPoint",value:function(t){var e=this.getLinearRing();if(!e.getEnvelopeInternal().contains(t))return!1;if(!Oe.isInRing(t,e.getCoordinates()))return!1;for(var n=this._holes.iterator();n.hasNext();)if(n.next().containsPoint(t))return!1;return!0}},{key:"addHole",value:function(t){this._holes.add(t)}},{key:"isShell",value:function(){return null===this._shell}},{key:"getLabel",value:function(){return this._label}},{key:"getEdges",value:function(){return this._edges}},{key:"getMaxNodeDegree",value:function(){return this._maxNodeDegree<0&&this.computeMaxNodeDegree(),this._maxNodeDegree}},{key:"getShell",value:function(){return this._shell}},{key:"mergeLabel",value:function(){if(1===arguments.length){var t=arguments[0];this.mergeLabel(t,0),this.mergeLabel(t,1)}else if(2===arguments.length){var e=arguments[1],n=arguments[0].getLocation(e,tt.RIGHT);if(n===Z.NONE)return null;if(this._label.getLocation(e)===Z.NONE)return this._label.setLocation(e,n),null}}},{key:"setShell",value:function(t){this._shell=t,null!==t&&t.addHole(this)}},{key:"toPolygon",value:function(t){for(var e=new Array(this._holes.size()).fill(null),n=0;n<this._holes.size();n++)e[n]=this._holes.get(n).getLinearRing();return t.createPolygon(this.getLinearRing(),e)}}],[{key:"constructor_",value:function(){if(this._startDe=null,this._maxNodeDegree=-1,this._edges=new pt,this._pts=new pt,this._label=new Ae(Z.NONE),this._ring=null,this._isHole=null,this._shell=null,this._holes=new pt,this._geometryFactory=null,0===arguments.length);else if(2===arguments.length){var t=arguments[0],e=arguments[1];this._geometryFactory=e,this.computePoints(t),this.computeRing()}}}]),e}(),Fe=function(e){r(o,e);var i=c(o);function o(){var e;return t(this,o),e=i.call(this),o.constructor_.apply(l(e),arguments),e}return n(o,[{key:"setEdgeRing",value:function(t,e){t.setMinEdgeRing(e)}},{key:"getNext",value:function(t){return t.getNextMin()}}],[{key:"constructor_",value:function(){var t=arguments[0],e=arguments[1];De.constructor_.call(this,t,e)}}]),o}(De),qe=function(e){r(o,e);var i=c(o);function o(){var e;return t(this,o),e=i.call(this),o.constructor_.apply(l(e),arguments),e}return n(o,[{key:"buildMinimalRings",value:function(){var t=new pt,e=this._startDe;do{if(null===e.getMinEdgeRing()){var n=new Fe(e,this._geometryFactory);t.add(n)}e=e.getNext()}while(e!==this._startDe);return t}},{key:"setEdgeRing",value:function(t,e){t.setEdgeRing(e)}},{key:"linkDirectedEdgesForMinimalEdgeRings",value:function(){var t=this._startDe;do{t.getNode().getEdges().linkMinimalDirectedEdges(this),t=t.getNext()}while(t!==this._startDe)}},{key:"getNext",value:function(t){return t.getNext()}}],[{key:"constructor_",value:function(){var t=arguments[0],e=arguments[1];De.constructor_.call(this,t,e)}}]),o}(De),Ge=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"setVisited",value:function(t){this._isVisited=t}},{key:"setInResult",value:function(t){this._isInResult=t}},{key:"isCovered",value:function(){return this._isCovered}},{key:"isCoveredSet",value:function(){return this._isCoveredSet}},{key:"setLabel",value:function(t){this._label=t}},{key:"getLabel",value:function(){return this._label}},{key:"setCovered",value:function(t){this._isCovered=t,this._isCoveredSet=!0}},{key:"updateIM",value:function(t){G.isTrue(this._label.getGeometryCount()>=2,"found partial label"),this.computeIM(t)}},{key:"isInResult",value:function(){return this._isInResult}},{key:"isVisited",value:function(){return this._isVisited}}],[{key:"constructor_",value:function(){if(this._label=null,this._isInResult=!1,this._isCovered=!1,this._isCoveredSet=!1,this._isVisited=!1,0===arguments.length);else if(1===arguments.length){var t=arguments[0];this._label=t}}}]),e}(),Ye=function(e){r(s,e);var o=c(s);function s(){var e;return t(this,s),e=o.call(this),s.constructor_.apply(l(e),arguments),e}return n(s,[{key:"isIncidentEdgeInResult",value:function(){for(var t=this.getEdges().getEdges().iterator();t.hasNext();)if(t.next().getEdge().isInResult())return!0;return!1}},{key:"isIsolated",value:function(){return 1===this._label.getGeometryCount()}},{key:"getCoordinate",value:function(){return this._coord}},{key:"print",value:function(t){t.println("node "+this._coord+" lbl: "+this._label)}},{key:"computeIM",value:function(t){}},{key:"computeMergedLocation",value:function(t,e){var n=Z.NONE;if(n=this._label.getLocation(e),!t.isNull(e)){var r=t.getLocation(e);n!==Z.BOUNDARY&&(n=r)}return n}},{key:"setLabel",value:function(){if(2!==arguments.length||!Number.isInteger(arguments[1])||!Number.isInteger(arguments[0]))return f(i(s.prototype),"setLabel",this).apply(this,arguments);var t=arguments[0],e=arguments[1];null===this._label?this._label=new Ae(t,e):this._label.setLocation(t,e)}},{key:"getEdges",value:function(){return this._edges}},{key:"mergeLabel",value:function(){if(arguments[0]instanceof s){var t=arguments[0];this.mergeLabel(t._label)}else if(arguments[0]instanceof Ae)for(var e=arguments[0],n=0;n<2;n++){var r=this.computeMergedLocation(e,n);this._label.getLocation(n)===Z.NONE&&this._label.setLocation(n,r)}}},{key:"add",value:function(t){this._edges.insert(t),t.setNode(this)}},{key:"setLabelBoundary",value:function(t){if(null===this._label)return null;var e=Z.NONE;null!==this._label&&(e=this._label.getLocation(t));var n=null;switch(e){case Z.BOUNDARY:n=Z.INTERIOR;break;case Z.INTERIOR:default:n=Z.BOUNDARY}this._label.setLocation(t,n)}}],[{key:"constructor_",value:function(){this._coord=null,this._edges=null;var t=arguments[0],e=arguments[1];this._coord=t,this._edges=e,this._label=new Ae(0,Z.NONE)}}]),s}(Ge),Be=function(e){r(i,e);var n=c(i);function i(){return t(this,i),n.apply(this,arguments)}return i}(ne);function ze(t){return null==t?0:t.color}function je(t){return null==t?null:t.parent}function Xe(t,e){null!==t&&(t.color=e)}function Ue(t){return null==t?null:t.left}function Ve(t){return null==t?null:t.right}var Ze=function(e){r(o,e);var i=c(o);function o(){var e;return t(this,o),(e=i.call(this)).root_=null,e.size_=0,e}return n(o,[{key:"get",value:function(t){for(var e=this.root_;null!==e;){var n=t.compareTo(e.key);if(n<0)e=e.left;else{if(!(n>0))return e.value;e=e.right}}return null}},{key:"put",value:function(t,e){if(null===this.root_)return this.root_={key:t,value:e,left:null,right:null,parent:null,color:0,getValue:function(){return this.value},getKey:function(){return this.key}},this.size_=1,null;var n,r,i=this.root_;do{if(n=i,(r=t.compareTo(i.key))<0)i=i.left;else{if(!(r>0)){var o=i.value;return i.value=e,o}i=i.right}}while(null!==i);var s={key:t,left:null,right:null,value:e,parent:n,color:0,getValue:function(){return this.value},getKey:function(){return this.key}};return r<0?n.left=s:n.right=s,this.fixAfterInsertion(s),this.size_++,null}},{key:"fixAfterInsertion",value:function(t){var e;for(t.color=1;null!=t&&t!==this.root_&&1===t.parent.color;)je(t)===Ue(je(je(t)))?1===ze(e=Ve(je(je(t))))?(Xe(je(t),0),Xe(e,0),Xe(je(je(t)),1),t=je(je(t))):(t===Ve(je(t))&&(t=je(t),this.rotateLeft(t)),Xe(je(t),0),Xe(je(je(t)),1),this.rotateRight(je(je(t)))):1===ze(e=Ue(je(je(t))))?(Xe(je(t),0),Xe(e,0),Xe(je(je(t)),1),t=je(je(t))):(t===Ue(je(t))&&(t=je(t),this.rotateRight(t)),Xe(je(t),0),Xe(je(je(t)),1),this.rotateLeft(je(je(t))));this.root_.color=0}},{key:"values",value:function(){var t=new pt,e=this.getFirstEntry();if(null!==e)for(t.add(e.value);null!==(e=o.successor(e));)t.add(e.value);return t}},{key:"entrySet",value:function(){var t=new Q,e=this.getFirstEntry();if(null!==e)for(t.add(e);null!==(e=o.successor(e));)t.add(e);return t}},{key:"rotateLeft",value:function(t){if(null!=t){var e=t.right;t.right=e.left,null!=e.left&&(e.left.parent=t),e.parent=t.parent,null==t.parent?this.root_=e:t.parent.left===t?t.parent.left=e:t.parent.right=e,e.left=t,t.parent=e}}},{key:"rotateRight",value:function(t){if(null!=t){var e=t.left;t.left=e.right,null!=e.right&&(e.right.parent=t),e.parent=t.parent,null==t.parent?this.root_=e:t.parent.right===t?t.parent.right=e:t.parent.left=e,e.right=t,t.parent=e}}},{key:"getFirstEntry",value:function(){var t=this.root_;if(null!=t)for(;null!=t.left;)t=t.left;return t}},{key:"size",value:function(){return this.size_}},{key:"containsKey",value:function(t){for(var e=this.root_;null!==e;){var n=t.compareTo(e.key);if(n<0)e=e.left;else{if(!(n>0))return!0;e=e.right}}return!1}}],[{key:"successor",value:function(t){var e;if(null===t)return null;if(null!==t.right){for(e=t.right;null!==e.left;)e=e.left;return e}e=t.parent;for(var n=t;null!==e&&n===e.right;)n=e,e=e.parent;return e}}]),o}(Be),He=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"find",value:function(t){return this.nodeMap.get(t)}},{key:"addNode",value:function(){if(arguments[0]instanceof j){var t=arguments[0],e=this.nodeMap.get(t);return null===e&&(e=this.nodeFact.createNode(t),this.nodeMap.put(t,e)),e}if(arguments[0]instanceof Ye){var n=arguments[0],r=this.nodeMap.get(n.getCoordinate());return null===r?(this.nodeMap.put(n.getCoordinate(),n),n):(r.mergeLabel(n),r)}}},{key:"print",value:function(t){for(var e=this.iterator();e.hasNext();)e.next().print(t)}},{key:"iterator",value:function(){return this.nodeMap.values().iterator()}},{key:"values",value:function(){return this.nodeMap.values()}},{key:"getBoundaryNodes",value:function(t){for(var e=new pt,n=this.iterator();n.hasNext();){var r=n.next();r.getLabel().getLocation(t)===Z.BOUNDARY&&e.add(r)}return e}},{key:"add",value:function(t){var e=t.getCoordinate();this.addNode(e).add(t)}}],[{key:"constructor_",value:function(){this.nodeMap=new Ze,this.nodeFact=null;var t=arguments[0];this.nodeFact=t}}]),e}(),We=function(){function e(){t(this,e)}return n(e,null,[{key:"isNorthern",value:function(t){return t===e.NE||t===e.NW}},{key:"isOpposite",value:function(t,e){return t!==e&&2==(t-e+4)%4}},{key:"commonHalfPlane",value:function(t,e){if(t===e)return t;if(2==(t-e+4)%4)return-1;var n=t<e?t:e;return 0===n&&3===(t>e?t:e)?3:n}},{key:"isInHalfPlane",value:function(t,n){return n===e.SE?t===e.SE||t===e.SW:t===n||t===n+1}},{key:"quadrant",value:function(){if("number"==typeof arguments[0]&&"number"==typeof arguments[1]){var t=arguments[0],n=arguments[1];if(0===t&&0===n)throw new x("Cannot compute the quadrant for point ( "+t+", "+n+" )");return t>=0?n>=0?e.NE:e.SE:n>=0?e.NW:e.SW}if(arguments[0]instanceof j&&arguments[1]instanceof j){var r=arguments[0],i=arguments[1];if(i.x===r.x&&i.y===r.y)throw new x("Cannot compute the quadrant for two identical points "+r);return i.x>=r.x?i.y>=r.y?e.NE:e.SE:i.y>=r.y?e.NW:e.SW}}}]),e}();We.NE=0,We.NW=1,We.SW=2,We.SE=3;var Je=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"compareDirection",value:function(t){return this._dx===t._dx&&this._dy===t._dy?0:this._quadrant>t._quadrant?1:this._quadrant<t._quadrant?-1:ft.index(t._p0,t._p1,this._p1)}},{key:"getDy",value:function(){return this._dy}},{key:"getCoordinate",value:function(){return this._p0}},{key:"setNode",value:function(t){this._node=t}},{key:"print",value:function(t){var e=Math.atan2(this._dy,this._dx),n=this.getClass().getName(),r=n.lastIndexOf("."),i=n.substring(r+1);t.print("  "+i+": "+this._p0+" - "+this._p1+" "+this._quadrant+":"+e+"   "+this._label)}},{key:"compareTo",value:function(t){var e=t;return this.compareDirection(e)}},{key:"getDirectedCoordinate",value:function(){return this._p1}},{key:"getDx",value:function(){return this._dx}},{key:"getLabel",value:function(){return this._label}},{key:"getEdge",value:function(){return this._edge}},{key:"getQuadrant",value:function(){return this._quadrant}},{key:"getNode",value:function(){return this._node}},{key:"toString",value:function(){var t=Math.atan2(this._dy,this._dx),e=this.getClass().getName(),n=e.lastIndexOf(".");return"  "+e.substring(n+1)+": "+this._p0+" - "+this._p1+" "+this._quadrant+":"+t+"   "+this._label}},{key:"computeLabel",value:function(t){}},{key:"init",value:function(t,e){this._p0=t,this._p1=e,this._dx=e.x-t.x,this._dy=e.y-t.y,this._quadrant=We.quadrant(this._dx,this._dy),G.isTrue(!(0===this._dx&&0===this._dy),"EdgeEnd with identical endpoints found")}},{key:"interfaces_",get:function(){return[k]}}],[{key:"constructor_",value:function(){if(this._edge=null,this._label=null,this._node=null,this._p0=null,this._p1=null,this._dx=null,this._dy=null,this._quadrant=null,1===arguments.length){var t=arguments[0];this._edge=t}else if(3===arguments.length){var n=arguments[0],r=arguments[1],i=arguments[2];e.constructor_.call(this,n,r,i,null)}else if(4===arguments.length){var o=arguments[0],s=arguments[1],a=arguments[2],u=arguments[3];e.constructor_.call(this,o),this.init(s,a),this._label=u}}}]),e}(),Ke=function(e){r(s,e);var o=c(s);function s(){var e;return t(this,s),e=o.call(this),s.constructor_.apply(l(e),arguments),e}return n(s,[{key:"getNextMin",value:function(){return this._nextMin}},{key:"getDepth",value:function(t){return this._depth[t]}},{key:"setVisited",value:function(t){this._isVisited=t}},{key:"computeDirectedLabel",value:function(){this._label=new Ae(this._edge.getLabel()),this._isForward||this._label.flip()}},{key:"getNext",value:function(){return this._next}},{key:"setDepth",value:function(t,e){if(-999!==this._depth[t]&&this._depth[t]!==e)throw new gt("assigned depths do not match",this.getCoordinate());this._depth[t]=e}},{key:"isInteriorAreaEdge",value:function(){for(var t=!0,e=0;e<2;e++)this._label.isArea(e)&&this._label.getLocation(e,tt.LEFT)===Z.INTERIOR&&this._label.getLocation(e,tt.RIGHT)===Z.INTERIOR||(t=!1);return t}},{key:"setNextMin",value:function(t){this._nextMin=t}},{key:"print",value:function(t){f(i(s.prototype),"print",this).call(this,t),t.print(" "+this._depth[tt.LEFT]+"/"+this._depth[tt.RIGHT]),t.print(" ("+this.getDepthDelta()+")"),this._isInResult&&t.print(" inResult")}},{key:"setMinEdgeRing",value:function(t){this._minEdgeRing=t}},{key:"isLineEdge",value:function(){var t=this._label.isLine(0)||this._label.isLine(1),e=!this._label.isArea(0)||this._label.allPositionsEqual(0,Z.EXTERIOR),n=!this._label.isArea(1)||this._label.allPositionsEqual(1,Z.EXTERIOR);return t&&e&&n}},{key:"setEdgeRing",value:function(t){this._edgeRing=t}},{key:"getMinEdgeRing",value:function(){return this._minEdgeRing}},{key:"getDepthDelta",value:function(){var t=this._edge.getDepthDelta();return this._isForward||(t=-t),t}},{key:"setInResult",value:function(t){this._isInResult=t}},{key:"getSym",value:function(){return this._sym}},{key:"isForward",value:function(){return this._isForward}},{key:"getEdge",value:function(){return this._edge}},{key:"printEdge",value:function(t){this.print(t),t.print(" "),this._isForward?this._edge.print(t):this._edge.printReverse(t)}},{key:"setSym",value:function(t){this._sym=t}},{key:"setVisitedEdge",value:function(t){this.setVisited(t),this._sym.setVisited(t)}},{key:"setEdgeDepths",value:function(t,e){var n=this.getEdge().getDepthDelta();this._isForward||(n=-n);var r=1;t===tt.LEFT&&(r=-1);var i=tt.opposite(t),o=e+n*r;this.setDepth(t,e),this.setDepth(i,o)}},{key:"getEdgeRing",value:function(){return this._edgeRing}},{key:"isInResult",value:function(){return this._isInResult}},{key:"setNext",value:function(t){this._next=t}},{key:"isVisited",value:function(){return this._isVisited}}],[{key:"constructor_",value:function(){this._isForward=null,this._isInResult=!1,this._isVisited=!1,this._sym=null,this._next=null,this._nextMin=null,this._edgeRing=null,this._minEdgeRing=null,this._depth=[0,-999,-999];var t=arguments[0],e=arguments[1];if(Je.constructor_.call(this,t),this._isForward=e,e)this.init(t.getCoordinate(0),t.getCoordinate(1));else{var n=t.getNumPoints()-1;this.init(t.getCoordinate(n),t.getCoordinate(n-1))}this.computeDirectedLabel()}},{key:"depthFactor",value:function(t,e){return t===Z.EXTERIOR&&e===Z.INTERIOR?1:t===Z.INTERIOR&&e===Z.EXTERIOR?-1:0}}]),s}(Je),Qe=function(){function e(){t(this,e)}return n(e,[{key:"createNode",value:function(t){return new Ye(t,null)}}]),e}(),$e=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"printEdges",value:function(t){t.println("Edges:");for(var e=0;e<this._edges.size();e++){t.println("edge "+e+":");var n=this._edges.get(e);n.print(t),n.eiList.print(t)}}},{key:"find",value:function(t){return this._nodes.find(t)}},{key:"addNode",value:function(){if(arguments[0]instanceof Ye){var t=arguments[0];return this._nodes.addNode(t)}if(arguments[0]instanceof j){var e=arguments[0];return this._nodes.addNode(e)}}},{key:"getNodeIterator",value:function(){return this._nodes.iterator()}},{key:"linkResultDirectedEdges",value:function(){for(var t=this._nodes.iterator();t.hasNext();)t.next().getEdges().linkResultDirectedEdges()}},{key:"debugPrintln",value:function(t){xt.out.println(t)}},{key:"isBoundaryNode",value:function(t,e){var n=this._nodes.find(e);if(null===n)return!1;var r=n.getLabel();return null!==r&&r.getLocation(t)===Z.BOUNDARY}},{key:"linkAllDirectedEdges",value:function(){for(var t=this._nodes.iterator();t.hasNext();)t.next().getEdges().linkAllDirectedEdges()}},{key:"matchInSameDirection",value:function(t,e,n,r){return!!t.equals(n)&&ft.index(t,e,r)===ft.COLLINEAR&&We.quadrant(t,e)===We.quadrant(n,r)}},{key:"getEdgeEnds",value:function(){return this._edgeEndList}},{key:"debugPrint",value:function(t){xt.out.print(t)}},{key:"getEdgeIterator",value:function(){return this._edges.iterator()}},{key:"findEdgeInSameDirection",value:function(t,e){for(var n=0;n<this._edges.size();n++){var r=this._edges.get(n),i=r.getCoordinates();if(this.matchInSameDirection(t,e,i[0],i[1]))return r;if(this.matchInSameDirection(t,e,i[i.length-1],i[i.length-2]))return r}return null}},{key:"insertEdge",value:function(t){this._edges.add(t)}},{key:"findEdgeEnd",value:function(t){for(var e=this.getEdgeEnds().iterator();e.hasNext();){var n=e.next();if(n.getEdge()===t)return n}return null}},{key:"addEdges",value:function(t){for(var e=t.iterator();e.hasNext();){var n=e.next();this._edges.add(n);var r=new Ke(n,!0),i=new Ke(n,!1);r.setSym(i),i.setSym(r),this.add(r),this.add(i)}}},{key:"add",value:function(t){this._nodes.add(t),this._edgeEndList.add(t)}},{key:"getNodes",value:function(){return this._nodes.values()}},{key:"findEdge",value:function(t,e){for(var n=0;n<this._edges.size();n++){var r=this._edges.get(n),i=r.getCoordinates();if(t.equals(i[0])&&e.equals(i[1]))return r}return null}}],[{key:"constructor_",value:function(){if(this._edges=new pt,this._nodes=null,this._edgeEndList=new pt,0===arguments.length)this._nodes=new He(new Qe);else if(1===arguments.length){var t=arguments[0];this._nodes=new He(t)}}},{key:"linkResultDirectedEdges",value:function(t){for(var e=t.iterator();e.hasNext();)e.next().getEdges().linkResultDirectedEdges()}}]),e}(),tn=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"sortShellsAndHoles",value:function(t,e,n){for(var r=t.iterator();r.hasNext();){var i=r.next();i.isHole()?n.add(i):e.add(i)}}},{key:"computePolygons",value:function(t){for(var e=new pt,n=t.iterator();n.hasNext();){var r=n.next().toPolygon(this._geometryFactory);e.add(r)}return e}},{key:"placeFreeHoles",value:function(t,n){for(var r=n.iterator();r.hasNext();){var i=r.next();if(null===i.getShell()){var o=e.findEdgeRingContaining(i,t);if(null===o)throw new gt("unable to assign hole to a shell",i.getCoordinate(0));i.setShell(o)}}}},{key:"buildMinimalEdgeRings",value:function(t,e,n){for(var r=new pt,i=t.iterator();i.hasNext();){var o=i.next();if(o.getMaxNodeDegree()>2){o.linkDirectedEdgesForMinimalEdgeRings();var s=o.buildMinimalRings(),a=this.findShell(s);null!==a?(this.placePolygonHoles(a,s),e.add(a)):n.addAll(s)}else r.add(o)}return r}},{key:"buildMaximalEdgeRings",value:function(t){for(var e=new pt,n=t.iterator();n.hasNext();){var r=n.next();if(r.isInResult()&&r.getLabel().isArea()&&null===r.getEdgeRing()){var i=new qe(r,this._geometryFactory);e.add(i),i.setInResult()}}return e}},{key:"placePolygonHoles",value:function(t,e){for(var n=e.iterator();n.hasNext();){var r=n.next();r.isHole()&&r.setShell(t)}}},{key:"getPolygons",value:function(){return this.computePolygons(this._shellList)}},{key:"findShell",value:function(t){for(var e=0,n=null,r=t.iterator();r.hasNext();){var i=r.next();i.isHole()||(n=i,e++)}return G.isTrue(e<=1,"found two shells in MinimalEdgeRing list"),n}},{key:"add",value:function(){if(1===arguments.length){var t=arguments[0];this.add(t.getEdgeEnds(),t.getNodes())}else if(2===arguments.length){var e=arguments[0],n=arguments[1];$e.linkResultDirectedEdges(n);var r=this.buildMaximalEdgeRings(e),i=new pt,o=this.buildMinimalEdgeRings(r,this._shellList,i);this.sortShellsAndHoles(o,this._shellList,i),this.placeFreeHoles(this._shellList,i)}}}],[{key:"constructor_",value:function(){this._geometryFactory=null,this._shellList=new pt;var t=arguments[0];this._geometryFactory=t}},{key:"findEdgeRingContaining",value:function(t,e){for(var n=t.getLinearRing(),r=n.getEnvelopeInternal(),i=n.getCoordinateN(0),o=null,s=null,a=e.iterator();a.hasNext();){var u=a.next(),l=u.getLinearRing(),h=l.getEnvelopeInternal();if(!h.equals(r)&&h.contains(r)){i=Wt.ptNotInList(n.getCoordinates(),l.getCoordinates());var c=!1;Oe.isInRing(i,l.getCoordinates())&&(c=!0),c&&(null===o||s.contains(h))&&(s=(o=u).getLinearRing().getEnvelopeInternal())}}return o}}]),e}(),en=function(){function e(){t(this,e)}return n(e,[{key:"getBounds",value:function(){}}]),e}(),nn=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"getItem",value:function(){return this._item}},{key:"getBounds",value:function(){return this._bounds}},{key:"interfaces_",get:function(){return[en,b]}}],[{key:"constructor_",value:function(){this._bounds=null,this._item=null;var t=arguments[0],e=arguments[1];this._bounds=t,this._item=e}}]),e}(),rn=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"poll",value:function(){if(this.isEmpty())return null;var t=this._items.get(1);return this._items.set(1,this._items.get(this._size)),this._size-=1,this.reorder(1),t}},{key:"size",value:function(){return this._size}},{key:"reorder",value:function(t){for(var e=null,n=this._items.get(t);2*t<=this._size&&((e=2*t)!==this._size&&this._items.get(e+1).compareTo(this._items.get(e))<0&&e++,this._items.get(e).compareTo(n)<0);t=e)this._items.set(t,this._items.get(e));this._items.set(t,n)}},{key:"clear",value:function(){this._size=0,this._items.clear()}},{key:"peek",value:function(){return this.isEmpty()?null:this._items.get(1)}},{key:"isEmpty",value:function(){return 0===this._size}},{key:"add",value:function(t){this._items.add(null),this._size+=1;var e=this._size;for(this._items.set(0,t);t.compareTo(this._items.get(Math.trunc(e/2)))<0;e/=2)this._items.set(e,this._items.get(Math.trunc(e/2)));this._items.set(e,t)}}],[{key:"constructor_",value:function(){this._size=null,this._items=null,this._size=0,this._items=new pt,this._items.add(null)}}]),e}(),on=function(){function e(){t(this,e)}return n(e,[{key:"insert",value:function(t,e){}},{key:"remove",value:function(t,e){}},{key:"query",value:function(){}}]),e}(),sn=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"getLevel",value:function(){return this._level}},{key:"size",value:function(){return this._childBoundables.size()}},{key:"getChildBoundables",value:function(){return this._childBoundables}},{key:"addChildBoundable",value:function(t){G.isTrue(null===this._bounds),this._childBoundables.add(t)}},{key:"isEmpty",value:function(){return this._childBoundables.isEmpty()}},{key:"getBounds",value:function(){return null===this._bounds&&(this._bounds=this.computeBounds()),this._bounds}},{key:"interfaces_",get:function(){return[en,b]}}],[{key:"constructor_",value:function(){if(this._childBoundables=new pt,this._bounds=null,this._level=null,0===arguments.length);else if(1===arguments.length){var t=arguments[0];this._level=t}}}]),e}(),an={reverseOrder:function(){return{compare:function(t,e){return e.compareTo(t)}}},min:function(t){return an.sort(t),t.get(0)},sort:function(t,e){var n=t.toArray();e?At.sort(n,e):At.sort(n);for(var r=t.iterator(),i=0,o=n.length;i<o;i++)r.next(),r.set(n[i])},singletonList:function(t){var e=new pt;return e.add(t),e}},un=function(){function e(){t(this,e)}return n(e,null,[{key:"maxDistance",value:function(t,n,r,i,o,s,a,u){var l=e.distance(t,n,o,s);return l=Math.max(l,e.distance(t,n,a,u)),l=Math.max(l,e.distance(r,i,o,s)),Math.max(l,e.distance(r,i,a,u))}},{key:"distance",value:function(t,e,n,r){var i=n-t,o=r-e;return Math.sqrt(i*i+o*o)}},{key:"maximumDistance",value:function(t,n){var r=Math.min(t.getMinX(),n.getMinX()),i=Math.min(t.getMinY(),n.getMinY()),o=Math.max(t.getMaxX(),n.getMaxX()),s=Math.max(t.getMaxY(),n.getMaxY());return e.distance(r,i,o,s)}},{key:"minMaxDistance",value:function(t,n){var r=t.getMinX(),i=t.getMinY(),o=t.getMaxX(),s=t.getMaxY(),a=n.getMinX(),u=n.getMinY(),l=n.getMaxX(),h=n.getMaxY(),c=e.maxDistance(r,i,r,s,a,u,a,h);return c=Math.min(c,e.maxDistance(r,i,r,s,a,u,l,u)),c=Math.min(c,e.maxDistance(r,i,r,s,l,h,a,h)),c=Math.min(c,e.maxDistance(r,i,r,s,l,h,l,u)),c=Math.min(c,e.maxDistance(r,i,o,i,a,u,a,h)),c=Math.min(c,e.maxDistance(r,i,o,i,a,u,l,u)),c=Math.min(c,e.maxDistance(r,i,o,i,l,h,a,h)),c=Math.min(c,e.maxDistance(r,i,o,i,l,h,l,u)),c=Math.min(c,e.maxDistance(o,s,r,s,a,u,a,h)),c=Math.min(c,e.maxDistance(o,s,r,s,a,u,l,u)),c=Math.min(c,e.maxDistance(o,s,r,s,l,h,a,h)),c=Math.min(c,e.maxDistance(o,s,r,s,l,h,l,u)),c=Math.min(c,e.maxDistance(o,s,o,i,a,u,a,h)),c=Math.min(c,e.maxDistance(o,s,o,i,a,u,l,u)),c=Math.min(c,e.maxDistance(o,s,o,i,l,h,a,h)),Math.min(c,e.maxDistance(o,s,o,i,l,h,l,u))}}]),e}(),ln=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"maximumDistance",value:function(){return un.maximumDistance(this._boundable1.getBounds(),this._boundable2.getBounds())}},{key:"expandToQueue",value:function(t,n){var r=e.isComposite(this._boundable1),i=e.isComposite(this._boundable2);if(r&&i)return e.area(this._boundable1)>e.area(this._boundable2)?(this.expand(this._boundable1,this._boundable2,!1,t,n),null):(this.expand(this._boundable2,this._boundable1,!0,t,n),null);if(r)return this.expand(this._boundable1,this._boundable2,!1,t,n),null;if(i)return this.expand(this._boundable2,this._boundable1,!0,t,n),null;throw new x("neither boundable is composite")}},{key:"isLeaves",value:function(){return!(e.isComposite(this._boundable1)||e.isComposite(this._boundable2))}},{key:"compareTo",value:function(t){var e=t;return this._distance<e._distance?-1:this._distance>e._distance?1:0}},{key:"expand",value:function(t,n,r,i,o){for(var s=t.getChildBoundables().iterator();s.hasNext();){var a=s.next(),u=null;(u=r?new e(n,a,this._itemDistance):new e(a,n,this._itemDistance)).getDistance()<o&&i.add(u)}}},{key:"getBoundable",value:function(t){return 0===t?this._boundable1:this._boundable2}},{key:"getDistance",value:function(){return this._distance}},{key:"distance",value:function(){return this.isLeaves()?this._itemDistance.distance(this._boundable1,this._boundable2):this._boundable1.getBounds().distance(this._boundable2.getBounds())}},{key:"interfaces_",get:function(){return[k]}}],[{key:"constructor_",value:function(){this._boundable1=null,this._boundable2=null,this._distance=null,this._itemDistance=null;var t=arguments[0],e=arguments[1],n=arguments[2];this._boundable1=t,this._boundable2=e,this._itemDistance=n,this._distance=this.distance()}},{key:"area",value:function(t){return t.getBounds().getArea()}},{key:"isComposite",value:function(t){return t instanceof sn}}]),e}(),hn=function(){function e(){t(this,e)}return n(e,[{key:"visitItem",value:function(t){}}]),e}(),cn=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"queryInternal",value:function(){if(ot(arguments[2],hn)&&arguments[0]instanceof Object&&arguments[1]instanceof sn)for(var t=arguments[0],e=arguments[2],n=arguments[1].getChildBoundables(),r=0;r<n.size();r++){var i=n.get(r);this.getIntersectsOp().intersects(i.getBounds(),t)&&(i instanceof sn?this.queryInternal(t,i,e):i instanceof nn?e.visitItem(i.getItem()):G.shouldNeverReachHere())}else if(ot(arguments[2],rt)&&arguments[0]instanceof Object&&arguments[1]instanceof sn)for(var o=arguments[0],s=arguments[2],a=arguments[1].getChildBoundables(),u=0;u<a.size();u++){var l=a.get(u);this.getIntersectsOp().intersects(l.getBounds(),o)&&(l instanceof sn?this.queryInternal(o,l,s):l instanceof nn?s.add(l.getItem()):G.shouldNeverReachHere())}}},{key:"getNodeCapacity",value:function(){return this._nodeCapacity}},{key:"lastNode",value:function(t){return t.get(t.size()-1)}},{key:"size",value:function(){if(0===arguments.length)return this.isEmpty()?0:(this.build(),this.size(this._root));if(1===arguments.length){for(var t=0,e=arguments[0].getChildBoundables().iterator();e.hasNext();){var n=e.next();n instanceof sn?t+=this.size(n):n instanceof nn&&(t+=1)}return t}}},{key:"removeItem",value:function(t,e){for(var n=null,r=t.getChildBoundables().iterator();r.hasNext();){var i=r.next();i instanceof nn&&i.getItem()===e&&(n=i)}return null!==n&&(t.getChildBoundables().remove(n),!0)}},{key:"itemsTree",value:function(){if(0===arguments.length){this.build();var t=this.itemsTree(this._root);return null===t?new pt:t}if(1===arguments.length){for(var e=arguments[0],n=new pt,r=e.getChildBoundables().iterator();r.hasNext();){var i=r.next();if(i instanceof sn){var o=this.itemsTree(i);null!==o&&n.add(o)}else i instanceof nn?n.add(i.getItem()):G.shouldNeverReachHere()}return n.size()<=0?null:n}}},{key:"insert",value:function(t,e){G.isTrue(!this._built,"Cannot insert items into an STR packed R-tree after it has been built."),this._itemBoundables.add(new nn(t,e))}},{key:"boundablesAtLevel",value:function(){if(1===arguments.length){var t=arguments[0],e=new pt;return this.boundablesAtLevel(t,this._root,e),e}if(3===arguments.length){var n=arguments[0],r=arguments[1],i=arguments[2];if(G.isTrue(n>-2),r.getLevel()===n)return i.add(r),null;for(var o=r.getChildBoundables().iterator();o.hasNext();){var s=o.next();s instanceof sn?this.boundablesAtLevel(n,s,i):(G.isTrue(s instanceof nn),-1===n&&i.add(s))}return null}}},{key:"query",value:function(){if(1===arguments.length){var t=arguments[0];this.build();var e=new pt;return this.isEmpty()||this.getIntersectsOp().intersects(this._root.getBounds(),t)&&this.queryInternal(t,this._root,e),e}if(2===arguments.length){var n=arguments[0],r=arguments[1];if(this.build(),this.isEmpty())return null;this.getIntersectsOp().intersects(this._root.getBounds(),n)&&this.queryInternal(n,this._root,r)}}},{key:"build",value:function(){if(this._built)return null;this._root=this._itemBoundables.isEmpty()?this.createNode(0):this.createHigherLevels(this._itemBoundables,-1),this._itemBoundables=null,this._built=!0}},{key:"getRoot",value:function(){return this.build(),this._root}},{key:"remove",value:function(){if(2===arguments.length){var t=arguments[0],e=arguments[1];return this.build(),!!this.getIntersectsOp().intersects(this._root.getBounds(),t)&&this.remove(t,this._root,e)}if(3===arguments.length){var n=arguments[0],r=arguments[1],i=arguments[2],o=this.removeItem(r,i);if(o)return!0;for(var s=null,a=r.getChildBoundables().iterator();a.hasNext();){var u=a.next();if(this.getIntersectsOp().intersects(u.getBounds(),n)&&u instanceof sn&&(o=this.remove(n,u,i))){s=u;break}}return null!==s&&s.getChildBoundables().isEmpty()&&r.getChildBoundables().remove(s),o}}},{key:"createHigherLevels",value:function(t,e){G.isTrue(!t.isEmpty());var n=this.createParentBoundables(t,e+1);return 1===n.size()?n.get(0):this.createHigherLevels(n,e+1)}},{key:"depth",value:function(){if(0===arguments.length)return this.isEmpty()?0:(this.build(),this.depth(this._root));if(1===arguments.length){for(var t=0,e=arguments[0].getChildBoundables().iterator();e.hasNext();){var n=e.next();if(n instanceof sn){var r=this.depth(n);r>t&&(t=r)}}return t+1}}},{key:"createParentBoundables",value:function(t,e){G.isTrue(!t.isEmpty());var n=new pt;n.add(this.createNode(e));var r=new pt(t);an.sort(r,this.getComparator());for(var i=r.iterator();i.hasNext();){var o=i.next();this.lastNode(n).getChildBoundables().size()===this.getNodeCapacity()&&n.add(this.createNode(e)),this.lastNode(n).addChildBoundable(o)}return n}},{key:"isEmpty",value:function(){return this._built?this._root.isEmpty():this._itemBoundables.isEmpty()}},{key:"interfaces_",get:function(){return[b]}}],[{key:"constructor_",value:function(){if(this._root=null,this._built=!1,this._itemBoundables=new pt,this._nodeCapacity=null,0===arguments.length)e.constructor_.call(this,e.DEFAULT_NODE_CAPACITY);else if(1===arguments.length){var t=arguments[0];G.isTrue(t>1,"Node capacity must be greater than 1"),this._nodeCapacity=t}}},{key:"compareDoubles",value:function(t,e){return t>e?1:t<e?-1:0}}]),e}();cn.IntersectsOp=function(){},cn.DEFAULT_NODE_CAPACITY=10;var fn=function(){function e(){t(this,e)}return n(e,[{key:"distance",value:function(t,e){}}]),e}(),vn=function(e){r(s,e);var o=c(s);function s(){var e;return t(this,s),e=o.call(this),s.constructor_.apply(l(e),arguments),e}return n(s,[{key:"createParentBoundablesFromVerticalSlices",value:function(t,e){G.isTrue(t.length>0);for(var n=new pt,r=0;r<t.length;r++)n.addAll(this.createParentBoundablesFromVerticalSlice(t[r],e));return n}},{key:"nearestNeighbourK",value:function(){if(2===arguments.length){var t=arguments[0],e=arguments[1];return this.nearestNeighbourK(t,A.POSITIVE_INFINITY,e)}if(3===arguments.length){var n=arguments[0],r=arguments[2],i=arguments[1],o=new rn;o.add(n);for(var a=new rn;!o.isEmpty()&&i>=0;){var u=o.poll(),l=u.getDistance();if(l>=i)break;u.isLeaves()?a.size()<r?a.add(u):(a.peek().getDistance()>l&&(a.poll(),a.add(u)),i=a.peek().getDistance()):u.expandToQueue(o,i)}return s.getItems(a)}}},{key:"createNode",value:function(t){return new gn(t)}},{key:"size",value:function(){return 0===arguments.length?f(i(s.prototype),"size",this).call(this):f(i(s.prototype),"size",this).apply(this,arguments)}},{key:"insert",value:function(){if(!(2===arguments.length&&arguments[1]instanceof Object&&arguments[0]instanceof U))return f(i(s.prototype),"insert",this).apply(this,arguments);var t=arguments[0],e=arguments[1];if(t.isNull())return null;f(i(s.prototype),"insert",this).call(this,t,e)}},{key:"getIntersectsOp",value:function(){return s.intersectsOp}},{key:"verticalSlices",value:function(t,e){for(var n=Math.trunc(Math.ceil(t.size()/e)),r=new Array(e).fill(null),i=t.iterator(),o=0;o<e;o++){r[o]=new pt;for(var s=0;i.hasNext()&&s<n;){var a=i.next();r[o].add(a),s++}}return r}},{key:"query",value:function(){if(1===arguments.length){var t=arguments[0];return f(i(s.prototype),"query",this).call(this,t)}if(2===arguments.length){var e=arguments[0],n=arguments[1];f(i(s.prototype),"query",this).call(this,e,n)}}},{key:"getComparator",value:function(){return s.yComparator}},{key:"createParentBoundablesFromVerticalSlice",value:function(t,e){return f(i(s.prototype),"createParentBoundables",this).call(this,t,e)}},{key:"remove",value:function(){if(2===arguments.length&&arguments[1]instanceof Object&&arguments[0]instanceof U){var t=arguments[0],e=arguments[1];return f(i(s.prototype),"remove",this).call(this,t,e)}return f(i(s.prototype),"remove",this).apply(this,arguments)}},{key:"depth",value:function(){return 0===arguments.length?f(i(s.prototype),"depth",this).call(this):f(i(s.prototype),"depth",this).apply(this,arguments)}},{key:"createParentBoundables",value:function(t,e){G.isTrue(!t.isEmpty());var n=Math.trunc(Math.ceil(t.size()/this.getNodeCapacity())),r=new pt(t);an.sort(r,s.xComparator);var i=this.verticalSlices(r,Math.trunc(Math.ceil(Math.sqrt(n))));return this.createParentBoundablesFromVerticalSlices(i,e)}},{key:"nearestNeighbour",value:function(){if(1===arguments.length){if(ot(arguments[0],fn)){var t=arguments[0];if(this.isEmpty())return null;var e=new ln(this.getRoot(),this.getRoot(),t);return this.nearestNeighbour(e)}if(arguments[0]instanceof ln){var n=arguments[0],r=A.POSITIVE_INFINITY,i=null,o=new rn;for(o.add(n);!o.isEmpty()&&r>0;){var s=o.poll(),a=s.getDistance();if(a>=r)break;s.isLeaves()?(r=a,i=s):s.expandToQueue(o,r)}return null===i?null:[i.getBoundable(0).getItem(),i.getBoundable(1).getItem()]}}else{if(2===arguments.length){var u=arguments[0],l=arguments[1];if(this.isEmpty()||u.isEmpty())return null;var h=new ln(this.getRoot(),u.getRoot(),l);return this.nearestNeighbour(h)}if(3===arguments.length){var c=arguments[2],f=new nn(arguments[0],arguments[1]),v=new ln(this.getRoot(),f,c);return this.nearestNeighbour(v)[0]}if(4===arguments.length){var g=arguments[2],d=arguments[3],p=new nn(arguments[0],arguments[1]),y=new ln(this.getRoot(),p,g);return this.nearestNeighbourK(y,d)}}}},{key:"isWithinDistance",value:function(){if(2===arguments.length){var t=arguments[0],e=arguments[1],n=A.POSITIVE_INFINITY,r=new rn;for(r.add(t);!r.isEmpty();){var i=r.poll(),o=i.getDistance();if(o>e)return!1;if(i.maximumDistance()<=e)return!0;if(i.isLeaves()){if((n=o)<=e)return!0}else i.expandToQueue(r,n)}return!1}if(3===arguments.length){var s=arguments[0],a=arguments[1],u=arguments[2],l=new ln(this.getRoot(),s.getRoot(),a);return this.isWithinDistance(l,u)}}},{key:"interfaces_",get:function(){return[on,b]}}],[{key:"constructor_",value:function(){if(0===arguments.length)s.constructor_.call(this,s.DEFAULT_NODE_CAPACITY);else if(1===arguments.length){var t=arguments[0];cn.constructor_.call(this,t)}}},{key:"centreX",value:function(t){return s.avg(t.getMinX(),t.getMaxX())}},{key:"avg",value:function(t,e){return(t+e)/2}},{key:"getItems",value:function(t){for(var e=new Array(t.size()).fill(null),n=0;!t.isEmpty();){var r=t.poll();e[n]=r.getBoundable(0).getItem(),n++}return e}},{key:"centreY",value:function(t){return s.avg(t.getMinY(),t.getMaxY())}}]),s}(cn),gn=function(e){r(o,e);var i=c(o);function o(){var e;return t(this,o),e=i.call(this),o.constructor_.apply(l(e),arguments),e}return n(o,[{key:"computeBounds",value:function(){for(var t=null,e=this.getChildBoundables().iterator();e.hasNext();){var n=e.next();null===t?t=new U(n.getBounds()):t.expandToInclude(n.getBounds())}return t}}],[{key:"constructor_",value:function(){var t=arguments[0];sn.constructor_.call(this,t)}}]),o}(sn);vn.STRtreeNode=gn,vn.xComparator=new(function(){function e(){t(this,e)}return n(e,[{key:"interfaces_",get:function(){return[D]}},{key:"compare",value:function(t,e){return cn.compareDoubles(vn.centreX(t.getBounds()),vn.centreX(e.getBounds()))}}]),e}()),vn.yComparator=new(function(){function e(){t(this,e)}return n(e,[{key:"interfaces_",get:function(){return[D]}},{key:"compare",value:function(t,e){return cn.compareDoubles(vn.centreY(t.getBounds()),vn.centreY(e.getBounds()))}}]),e}()),vn.intersectsOp=new(function(){function e(){t(this,e)}return n(e,[{key:"interfaces_",get:function(){return[IntersectsOp]}},{key:"intersects",value:function(t,e){return t.intersects(e)}}]),e}()),vn.DEFAULT_NODE_CAPACITY=10;var dn=function(){function e(){t(this,e)}return n(e,null,[{key:"relativeSign",value:function(t,e){return t<e?-1:t>e?1:0}},{key:"compare",value:function(t,n,r){if(n.equals2D(r))return 0;var i=e.relativeSign(n.x,r.x),o=e.relativeSign(n.y,r.y);switch(t){case 0:return e.compareValue(i,o);case 1:return e.compareValue(o,i);case 2:return e.compareValue(o,-i);case 3:return e.compareValue(-i,o);case 4:return e.compareValue(-i,-o);case 5:return e.compareValue(-o,-i);case 6:return e.compareValue(-o,i);case 7:return e.compareValue(i,-o)}return G.shouldNeverReachHere("invalid octant value"),0}},{key:"compareValue",value:function(t,e){return t<0?-1:t>0?1:e<0?-1:e>0?1:0}}]),e}(),pn=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"getCoordinate",value:function(){return this.coord}},{key:"print",value:function(t){t.print(this.coord),t.print(" seg # = "+this.segmentIndex)}},{key:"compareTo",value:function(t){var e=t;return this.segmentIndex<e.segmentIndex?-1:this.segmentIndex>e.segmentIndex?1:this.coord.equals2D(e.coord)?0:this._isInterior?e._isInterior?dn.compare(this._segmentOctant,this.coord,e.coord):1:-1}},{key:"isEndPoint",value:function(t){return 0===this.segmentIndex&&!this._isInterior||this.segmentIndex===t}},{key:"toString",value:function(){return this.segmentIndex+":"+this.coord.toString()}},{key:"isInterior",value:function(){return this._isInterior}},{key:"interfaces_",get:function(){return[k]}}],[{key:"constructor_",value:function(){this._segString=null,this.coord=null,this.segmentIndex=null,this._segmentOctant=null,this._isInterior=null;var t=arguments[0],e=arguments[1],n=arguments[2],r=arguments[3];this._segString=t,this.coord=new j(e),this.segmentIndex=n,this._segmentOctant=r,this._isInterior=!e.equals2D(t.getCoordinate(n))}}]),e}(),yn=function(){function e(){t(this,e)}return n(e,[{key:"hasNext",value:function(){}},{key:"next",value:function(){}},{key:"remove",value:function(){}}]),e}(),mn=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"getSplitCoordinates",value:function(){var t=new Ht;this.addEndpoints();for(var e=this.iterator(),n=e.next();e.hasNext();){var r=e.next();this.addEdgeCoordinates(n,r,t),n=r}return t.toCoordinateArray()}},{key:"addCollapsedNodes",value:function(){var t=new pt;this.findCollapsesFromInsertedNodes(t),this.findCollapsesFromExistingVertices(t);for(var e=t.iterator();e.hasNext();){var n=e.next().intValue();this.add(this._edge.getCoordinate(n),n)}}},{key:"createSplitEdgePts",value:function(t,e){var n=e.segmentIndex-t.segmentIndex+2;if(2===n)return[new j(t.coord),new j(e.coord)];var r=this._edge.getCoordinate(e.segmentIndex),i=e.isInterior()||!e.coord.equals2D(r);i||n--;var o=new Array(n).fill(null),s=0;o[s++]=new j(t.coord);for(var a=t.segmentIndex+1;a<=e.segmentIndex;a++)o[s++]=this._edge.getCoordinate(a);return i&&(o[s]=new j(e.coord)),o}},{key:"print",value:function(t){t.println("Intersections:");for(var e=this.iterator();e.hasNext();)e.next().print(t)}},{key:"findCollapsesFromExistingVertices",value:function(t){for(var e=0;e<this._edge.size()-2;e++){var n=this._edge.getCoordinate(e);this._edge.getCoordinate(e+1);var r=this._edge.getCoordinate(e+2);n.equals2D(r)&&t.add(at.valueOf(e+1))}}},{key:"addEdgeCoordinates",value:function(t,e,n){var r=this.createSplitEdgePts(t,e);n.add(r,!1)}},{key:"iterator",value:function(){return this._nodeMap.values().iterator()}},{key:"addSplitEdges",value:function(t){this.addEndpoints(),this.addCollapsedNodes();for(var e=this.iterator(),n=e.next();e.hasNext();){var r=e.next(),i=this.createSplitEdge(n,r);t.add(i),n=r}}},{key:"findCollapseIndex",value:function(t,e,n){if(!t.coord.equals2D(e.coord))return!1;var r=e.segmentIndex-t.segmentIndex;return e.isInterior()||r--,1===r&&(n[0]=t.segmentIndex+1,!0)}},{key:"findCollapsesFromInsertedNodes",value:function(t){for(var e=new Array(1).fill(null),n=this.iterator(),r=n.next();n.hasNext();){var i=n.next();this.findCollapseIndex(r,i,e)&&t.add(at.valueOf(e[0])),r=i}}},{key:"getEdge",value:function(){return this._edge}},{key:"addEndpoints",value:function(){var t=this._edge.size()-1;this.add(this._edge.getCoordinate(0),0),this.add(this._edge.getCoordinate(t),t)}},{key:"createSplitEdge",value:function(t,e){var n=this.createSplitEdgePts(t,e);return new kn(n,this._edge.getData())}},{key:"add",value:function(t,e){var n=new pn(this._edge,t,e,this._edge.getSegmentOctant(e)),r=this._nodeMap.get(n);return null!==r?(G.isTrue(r.coord.equals2D(t),"Found equal nodes with different coordinates"),r):(this._nodeMap.put(n,n),n)}},{key:"checkSplitEdgesCorrectness",value:function(t){var e=this._edge.getCoordinates(),n=t.get(0).getCoordinate(0);if(!n.equals2D(e[0]))throw new F("bad split edge start point at "+n);var r=t.get(t.size()-1).getCoordinates(),i=r[r.length-1];if(!i.equals2D(e[e.length-1]))throw new F("bad split edge end point at "+i)}}],[{key:"constructor_",value:function(){this._nodeMap=new Ze,this._edge=null;var t=arguments[0];this._edge=t}}]),e}(),_n=function(){function e(){t(this,e)}return n(e,null,[{key:"octant",value:function(){if("number"==typeof arguments[0]&&"number"==typeof arguments[1]){var t=arguments[0],n=arguments[1];if(0===t&&0===n)throw new x("Cannot compute the octant for point ( "+t+", "+n+" )");var r=Math.abs(t),i=Math.abs(n);return t>=0?n>=0?r>=i?0:1:r>=i?7:6:n>=0?r>=i?3:2:r>=i?4:5}if(arguments[0]instanceof j&&arguments[1]instanceof j){var o=arguments[0],s=arguments[1],a=s.x-o.x,u=s.y-o.y;if(0===a&&0===u)throw new x("Cannot compute the octant for two identical points "+o);return e.octant(a,u)}}}]),e}(),xn=function(){function e(){t(this,e)}return n(e,[{key:"getCoordinates",value:function(){}},{key:"size",value:function(){}},{key:"getCoordinate",value:function(t){}},{key:"isClosed",value:function(){}},{key:"setData",value:function(t){}},{key:"getData",value:function(){}}]),e}(),En=function(){function e(){t(this,e)}return n(e,[{key:"addIntersection",value:function(t,e){}},{key:"interfaces_",get:function(){return[xn]}}]),e}(),kn=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"getCoordinates",value:function(){return this._pts}},{key:"size",value:function(){return this._pts.length}},{key:"getCoordinate",value:function(t){return this._pts[t]}},{key:"isClosed",value:function(){return this._pts[0].equals(this._pts[this._pts.length-1])}},{key:"getSegmentOctant",value:function(t){return t===this._pts.length-1?-1:this.safeOctant(this.getCoordinate(t),this.getCoordinate(t+1))}},{key:"setData",value:function(t){this._data=t}},{key:"safeOctant",value:function(t,e){return t.equals2D(e)?0:_n.octant(t,e)}},{key:"getData",value:function(){return this._data}},{key:"addIntersection",value:function(){if(2===arguments.length){var t=arguments[0],e=arguments[1];this.addIntersectionNode(t,e)}else if(4===arguments.length){var n=arguments[1],r=arguments[3],i=new j(arguments[0].getIntersection(r));this.addIntersection(i,n)}}},{key:"toString",value:function(){return Le.toLineString(new $t(this._pts))}},{key:"getNodeList",value:function(){return this._nodeList}},{key:"addIntersectionNode",value:function(t,e){var n=e,r=n+1;if(r<this._pts.length){var i=this._pts[r];t.equals2D(i)&&(n=r)}return this._nodeList.add(t,n)}},{key:"addIntersections",value:function(t,e,n){for(var r=0;r<t.getIntersectionNum();r++)this.addIntersection(t,e,n,r)}},{key:"interfaces_",get:function(){return[En]}}],[{key:"constructor_",value:function(){this._nodeList=new mn(this),this._pts=null,this._data=null;var t=arguments[0],e=arguments[1];this._pts=t,this._data=e}},{key:"getNodedSubstrings",value:function(){if(1===arguments.length){var t=arguments[0],n=new pt;return e.getNodedSubstrings(t,n),n}if(2===arguments.length)for(var r=arguments[1],i=arguments[0].iterator();i.hasNext();)i.next().getNodeList().addSplitEdges(r)}}]),e}(),wn=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"minX",value:function(){return Math.min(this.p0.x,this.p1.x)}},{key:"orientationIndex",value:function(){if(arguments[0]instanceof e){var t=arguments[0],n=ft.index(this.p0,this.p1,t.p0),r=ft.index(this.p0,this.p1,t.p1);return n>=0&&r>=0||n<=0&&r<=0?Math.max(n,r):0}if(arguments[0]instanceof j){var i=arguments[0];return ft.index(this.p0,this.p1,i)}}},{key:"toGeometry",value:function(t){return t.createLineString([this.p0,this.p1])}},{key:"isVertical",value:function(){return this.p0.x===this.p1.x}},{key:"equals",value:function(t){if(!(t instanceof e))return!1;var n=t;return this.p0.equals(n.p0)&&this.p1.equals(n.p1)}},{key:"intersection",value:function(t){var e=new Ce;return e.computeIntersection(this.p0,this.p1,t.p0,t.p1),e.hasIntersection()?e.getIntersection(0):null}},{key:"project",value:function(){if(arguments[0]instanceof j){var t=arguments[0];if(t.equals(this.p0)||t.equals(this.p1))return new j(t);var n=this.projectionFactor(t),r=new j;return r.x=this.p0.x+n*(this.p1.x-this.p0.x),r.y=this.p0.y+n*(this.p1.y-this.p0.y),r}if(arguments[0]instanceof e){var i=arguments[0],o=this.projectionFactor(i.p0),s=this.projectionFactor(i.p1);if(o>=1&&s>=1)return null;if(o<=0&&s<=0)return null;var a=this.project(i.p0);o<0&&(a=this.p0),o>1&&(a=this.p1);var u=this.project(i.p1);return s<0&&(u=this.p0),s>1&&(u=this.p1),new e(a,u)}}},{key:"normalize",value:function(){this.p1.compareTo(this.p0)<0&&this.reverse()}},{key:"angle",value:function(){return Math.atan2(this.p1.y-this.p0.y,this.p1.x-this.p0.x)}},{key:"getCoordinate",value:function(t){return 0===t?this.p0:this.p1}},{key:"distancePerpendicular",value:function(t){return kt.pointToLinePerpendicular(t,this.p0,this.p1)}},{key:"minY",value:function(){return Math.min(this.p0.y,this.p1.y)}},{key:"midPoint",value:function(){return e.midPoint(this.p0,this.p1)}},{key:"projectionFactor",value:function(t){if(t.equals(this.p0))return 0;if(t.equals(this.p1))return 1;var e=this.p1.x-this.p0.x,n=this.p1.y-this.p0.y,r=e*e+n*n;return r<=0?A.NaN:((t.x-this.p0.x)*e+(t.y-this.p0.y)*n)/r}},{key:"closestPoints",value:function(t){var e=this.intersection(t);if(null!==e)return[e,e];var n=new Array(2).fill(null),r=A.MAX_VALUE,i=null,o=this.closestPoint(t.p0);r=o.distance(t.p0),n[0]=o,n[1]=t.p0;var s=this.closestPoint(t.p1);(i=s.distance(t.p1))<r&&(r=i,n[0]=s,n[1]=t.p1);var a=t.closestPoint(this.p0);(i=a.distance(this.p0))<r&&(r=i,n[0]=this.p0,n[1]=a);var u=t.closestPoint(this.p1);return(i=u.distance(this.p1))<r&&(r=i,n[0]=this.p1,n[1]=u),n}},{key:"closestPoint",value:function(t){var e=this.projectionFactor(t);return e>0&&e<1?this.project(t):this.p0.distance(t)<this.p1.distance(t)?this.p0:this.p1}},{key:"maxX",value:function(){return Math.max(this.p0.x,this.p1.x)}},{key:"getLength",value:function(){return this.p0.distance(this.p1)}},{key:"compareTo",value:function(t){var e=t,n=this.p0.compareTo(e.p0);return 0!==n?n:this.p1.compareTo(e.p1)}},{key:"reverse",value:function(){var t=this.p0;this.p0=this.p1,this.p1=t}},{key:"equalsTopo",value:function(t){return this.p0.equals(t.p0)&&this.p1.equals(t.p1)||this.p0.equals(t.p1)&&this.p1.equals(t.p0)}},{key:"lineIntersection",value:function(t){return _t.intersection(this.p0,this.p1,t.p0,t.p1)}},{key:"maxY",value:function(){return Math.max(this.p0.y,this.p1.y)}},{key:"pointAlongOffset",value:function(t,e){var n=this.p0.x+t*(this.p1.x-this.p0.x),r=this.p0.y+t*(this.p1.y-this.p0.y),i=this.p1.x-this.p0.x,o=this.p1.y-this.p0.y,s=Math.sqrt(i*i+o*o),a=0,u=0;if(0!==e){if(s<=0)throw new IllegalStateException("Cannot compute offset from zero-length line segment");a=e*i/s,u=e*o/s}return new j(n-u,r+a)}},{key:"setCoordinates",value:function(){if(1===arguments.length){var t=arguments[0];this.setCoordinates(t.p0,t.p1)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];this.p0.x=e.x,this.p0.y=e.y,this.p1.x=n.x,this.p1.y=n.y}}},{key:"segmentFraction",value:function(t){var e=this.projectionFactor(t);return e<0?e=0:(e>1||A.isNaN(e))&&(e=1),e}},{key:"toString",value:function(){return"LINESTRING( "+this.p0.x+" "+this.p0.y+", "+this.p1.x+" "+this.p1.y+")"}},{key:"isHorizontal",value:function(){return this.p0.y===this.p1.y}},{key:"reflect",value:function(t){var e=this.p1.getY()-this.p0.getY(),n=this.p0.getX()-this.p1.getX(),r=this.p0.getY()*(this.p1.getX()-this.p0.getX())-this.p0.getX()*(this.p1.getY()-this.p0.getY()),i=e*e+n*n,o=e*e-n*n,s=t.getX(),a=t.getY();return new j((-o*s-2*e*n*a-2*e*r)/i,(o*a-2*e*n*s-2*n*r)/i)}},{key:"distance",value:function(){if(arguments[0]instanceof e){var t=arguments[0];return kt.segmentToSegment(this.p0,this.p1,t.p0,t.p1)}if(arguments[0]instanceof j){var n=arguments[0];return kt.pointToSegment(n,this.p0,this.p1)}}},{key:"pointAlong",value:function(t){var e=new j;return e.x=this.p0.x+t*(this.p1.x-this.p0.x),e.y=this.p0.y+t*(this.p1.y-this.p0.y),e}},{key:"hashCode",value:function(){var t=A.doubleToLongBits(this.p0.x);t^=31*A.doubleToLongBits(this.p0.y);var e=Math.trunc(t)^Math.trunc(t>>32),n=A.doubleToLongBits(this.p1.x);return n^=31*A.doubleToLongBits(this.p1.y),e^Math.trunc(n)^Math.trunc(n>>32)}},{key:"interfaces_",get:function(){return[k,b]}}],[{key:"constructor_",value:function(){if(this.p0=null,this.p1=null,0===arguments.length)e.constructor_.call(this,new j,new j);else if(1===arguments.length){var t=arguments[0];e.constructor_.call(this,t.p0,t.p1)}else if(2===arguments.length){var n=arguments[0],r=arguments[1];this.p0=n,this.p1=r}else if(4===arguments.length){var i=arguments[0],o=arguments[1],s=arguments[2],a=arguments[3];e.constructor_.call(this,new j(i,o),new j(s,a))}}},{key:"midPoint",value:function(t,e){return new j((t.x+e.x)/2,(t.y+e.y)/2)}}]),e}(),bn=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"overlap",value:function(){if(2===arguments.length);else if(4===arguments.length){var t=arguments[1],e=arguments[2],n=arguments[3];arguments[0].getLineSegment(t,this._overlapSeg1),e.getLineSegment(n,this._overlapSeg2),this.overlap(this._overlapSeg1,this._overlapSeg2)}}}],[{key:"constructor_",value:function(){this._overlapSeg1=new wn,this._overlapSeg2=new wn}}]),e}(),In=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"getLineSegment",value:function(t,e){e.p0=this._pts[t],e.p1=this._pts[t+1]}},{key:"computeSelect",value:function(t,e,n,r){var i=this._pts[e],o=this._pts[n];if(n-e==1)return r.select(this,e),null;if(!t.intersects(i,o))return null;var s=Math.trunc((e+n)/2);e<s&&this.computeSelect(t,e,s,r),s<n&&this.computeSelect(t,s,n,r)}},{key:"getCoordinates",value:function(){for(var t=new Array(this._end-this._start+1).fill(null),e=0,n=this._start;n<=this._end;n++)t[e++]=this._pts[n];return t}},{key:"computeOverlaps",value:function(){if(2===arguments.length){var t=arguments[0],e=arguments[1];this.computeOverlaps(this._start,this._end,t,t._start,t._end,e)}else if(6===arguments.length){var n=arguments[0],r=arguments[1],i=arguments[2],o=arguments[3],s=arguments[4],a=arguments[5];if(r-n==1&&s-o==1)return a.overlap(this,n,i,o),null;if(!this.overlaps(n,r,i,o,s))return null;var u=Math.trunc((n+r)/2),l=Math.trunc((o+s)/2);n<u&&(o<l&&this.computeOverlaps(n,u,i,o,l,a),l<s&&this.computeOverlaps(n,u,i,l,s,a)),u<r&&(o<l&&this.computeOverlaps(u,r,i,o,l,a),l<s&&this.computeOverlaps(u,r,i,l,s,a))}}},{key:"setId",value:function(t){this._id=t}},{key:"select",value:function(t,e){this.computeSelect(t,this._start,this._end,e)}},{key:"getEnvelope",value:function(){if(null===this._env){var t=this._pts[this._start],e=this._pts[this._end];this._env=new U(t,e)}return this._env}},{key:"overlaps",value:function(t,e,n,r,i){return U.intersects(this._pts[t],this._pts[e],n._pts[r],n._pts[i])}},{key:"getEndIndex",value:function(){return this._end}},{key:"getStartIndex",value:function(){return this._start}},{key:"getContext",value:function(){return this._context}},{key:"getId",value:function(){return this._id}}],[{key:"constructor_",value:function(){this._pts=null,this._start=null,this._end=null,this._env=null,this._context=null,this._id=null;var t=arguments[0],e=arguments[1],n=arguments[2],r=arguments[3];this._pts=t,this._start=e,this._end=n,this._context=r}}]),e}(),Nn=function(){function e(){t(this,e)}return n(e,null,[{key:"findChainEnd",value:function(t,e){for(var n=e;n<t.length-1&&t[n].equals2D(t[n+1]);)n++;if(n>=t.length-1)return t.length-1;for(var r=We.quadrant(t[n],t[n+1]),i=e+1;i<t.length&&(t[i-1].equals2D(t[i])||We.quadrant(t[i-1],t[i])===r);)i++;return i-1}},{key:"getChains",value:function(){if(1===arguments.length){var t=arguments[0];return e.getChains(t,null)}if(2===arguments.length){var n=arguments[0],r=arguments[1],i=new pt,o=0;do{var s=e.findChainEnd(n,o),a=new In(n,o,s,r);i.add(a),o=s}while(o<n.length-1);return i}}}]),e}(),Sn=function(){function e(){t(this,e)}return n(e,[{key:"computeNodes",value:function(t){}},{key:"getNodedSubstrings",value:function(){}}]),e}(),Mn=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"setSegmentIntersector",value:function(t){this._segInt=t}},{key:"interfaces_",get:function(){return[Sn]}}],[{key:"constructor_",value:function(){if(this._segInt=null,0===arguments.length);else if(1===arguments.length){var t=arguments[0];this.setSegmentIntersector(t)}}}]),e}(),Ln=function(e){r(o,e);var i=c(o);function o(){var e;return t(this,o),e=i.call(this),o.constructor_.apply(l(e),arguments),e}return n(o,[{key:"getMonotoneChains",value:function(){return this._monoChains}},{key:"getNodedSubstrings",value:function(){return kn.getNodedSubstrings(this._nodedSegStrings)}},{key:"getIndex",value:function(){return this._index}},{key:"add",value:function(t){for(var e=Nn.getChains(t.getCoordinates(),t).iterator();e.hasNext();){var n=e.next();n.setId(this._idCounter++),this._index.insert(n.getEnvelope(),n),this._monoChains.add(n)}}},{key:"computeNodes",value:function(t){this._nodedSegStrings=t;for(var e=t.iterator();e.hasNext();)this.add(e.next());this.intersectChains()}},{key:"intersectChains",value:function(){for(var t=new Pn(this._segInt),e=this._monoChains.iterator();e.hasNext();)for(var n=e.next(),r=this._index.query(n.getEnvelope()).iterator();r.hasNext();){var i=r.next();if(i.getId()>n.getId()&&(n.computeOverlaps(i,t),this._nOverlaps++),this._segInt.isDone())return null}}}],[{key:"constructor_",value:function(){if(this._monoChains=new pt,this._index=new vn,this._idCounter=0,this._nodedSegStrings=null,this._nOverlaps=0,0===arguments.length);else if(1===arguments.length){var t=arguments[0];Mn.constructor_.call(this,t)}}}]),o}(Mn),Pn=function(e){r(s,e);var o=c(s);function s(){var e;return t(this,s),e=o.call(this),s.constructor_.apply(l(e),arguments),e}return n(s,[{key:"overlap",value:function(){if(4!==arguments.length)return f(i(s.prototype),"overlap",this).apply(this,arguments);var t=arguments[1],e=arguments[2],n=arguments[3],r=arguments[0].getContext(),o=e.getContext();this._si.processIntersections(r,t,o,n)}}],[{key:"constructor_",value:function(){this._si=null;var t=arguments[0];this._si=t}}]),s}(bn);Ln.SegmentOverlapAction=Pn;var Cn=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"isDeletable",value:function(t,e,n,r){var i=this._inputLine[t],o=this._inputLine[e],s=this._inputLine[n];return!!this.isConcave(i,o,s)&&!!this.isShallow(i,o,s,r)&&this.isShallowSampled(i,o,t,n,r)}},{key:"deleteShallowConcavities",value:function(){for(var t=1,n=this.findNextNonDeletedIndex(t),r=this.findNextNonDeletedIndex(n),i=!1;r<this._inputLine.length;){var o=!1;this.isDeletable(t,n,r,this._distanceTol)&&(this._isDeleted[n]=e.DELETE,o=!0,i=!0),t=o?r:n,n=this.findNextNonDeletedIndex(t),r=this.findNextNonDeletedIndex(n)}return i}},{key:"isShallowConcavity",value:function(t,e,n,r){return ft.index(t,e,n)===this._angleOrientation&&kt.pointToSegment(e,t,n)<r}},{key:"isShallowSampled",value:function(t,n,r,i,o){var s=Math.trunc((i-r)/e.NUM_PTS_TO_CHECK);s<=0&&(s=1);for(var a=r;a<i;a+=s)if(!this.isShallow(t,n,this._inputLine[a],o))return!1;return!0}},{key:"isConcave",value:function(t,e,n){return ft.index(t,e,n)===this._angleOrientation}},{key:"simplify",value:function(t){this._distanceTol=Math.abs(t),t<0&&(this._angleOrientation=ft.CLOCKWISE),this._isDeleted=new Array(this._inputLine.length).fill(null);var e=!1;do{e=this.deleteShallowConcavities()}while(e);return this.collapseLine()}},{key:"findNextNonDeletedIndex",value:function(t){for(var n=t+1;n<this._inputLine.length&&this._isDeleted[n]===e.DELETE;)n++;return n}},{key:"isShallow",value:function(t,e,n,r){return kt.pointToSegment(e,t,n)<r}},{key:"collapseLine",value:function(){for(var t=new Ht,n=0;n<this._inputLine.length;n++)this._isDeleted[n]!==e.DELETE&&t.add(this._inputLine[n]);return t.toCoordinateArray()}}],[{key:"constructor_",value:function(){this._inputLine=null,this._distanceTol=null,this._isDeleted=null,this._angleOrientation=ft.COUNTERCLOCKWISE;var t=arguments[0];this._inputLine=t}},{key:"simplify",value:function(t,n){return new e(t).simplify(n)}}]),e}();Cn.INIT=0,Cn.DELETE=1,Cn.KEEP=1,Cn.NUM_PTS_TO_CHECK=10;var Tn=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"getCoordinates",value:function(){return this._ptList.toArray(e.COORDINATE_ARRAY_TYPE)}},{key:"setPrecisionModel",value:function(t){this._precisionModel=t}},{key:"addPt",value:function(t){var e=new j(t);if(this._precisionModel.makePrecise(e),this.isRedundant(e))return null;this._ptList.add(e)}},{key:"reverse",value:function(){}},{key:"addPts",value:function(t,e){if(e)for(var n=0;n<t.length;n++)this.addPt(t[n]);else for(var r=t.length-1;r>=0;r--)this.addPt(t[r])}},{key:"isRedundant",value:function(t){if(this._ptList.size()<1)return!1;var e=this._ptList.get(this._ptList.size()-1);return t.distance(e)<this._minimimVertexDistance}},{key:"toString",value:function(){return(new ae).createLineString(this.getCoordinates()).toString()}},{key:"closeRing",value:function(){if(this._ptList.size()<1)return null;var t=new j(this._ptList.get(0)),e=this._ptList.get(this._ptList.size()-1);if(t.equals(e))return null;this._ptList.add(t)}},{key:"setMinimumVertexDistance",value:function(t){this._minimimVertexDistance=t}}],[{key:"constructor_",value:function(){this._ptList=null,this._precisionModel=null,this._minimimVertexDistance=0,this._ptList=new pt}}]),e}();Tn.COORDINATE_ARRAY_TYPE=new Array(0).fill(null);var On=function(){function e(){t(this,e)}return n(e,null,[{key:"toDegrees",value:function(t){return 180*t/Math.PI}},{key:"normalize",value:function(t){for(;t>Math.PI;)t-=e.PI_TIMES_2;for(;t<=-Math.PI;)t+=e.PI_TIMES_2;return t}},{key:"angle",value:function(){if(1===arguments.length){var t=arguments[0];return Math.atan2(t.y,t.x)}if(2===arguments.length){var e=arguments[0],n=arguments[1],r=n.x-e.x,i=n.y-e.y;return Math.atan2(i,r)}}},{key:"isAcute",value:function(t,e,n){var r=t.x-e.x,i=t.y-e.y;return r*(n.x-e.x)+i*(n.y-e.y)>0}},{key:"isObtuse",value:function(t,e,n){var r=t.x-e.x,i=t.y-e.y;return r*(n.x-e.x)+i*(n.y-e.y)<0}},{key:"interiorAngle",value:function(t,n,r){var i=e.angle(n,t),o=e.angle(n,r);return Math.abs(o-i)}},{key:"normalizePositive",value:function(t){if(t<0){for(;t<0;)t+=e.PI_TIMES_2;t>=e.PI_TIMES_2&&(t=0)}else{for(;t>=e.PI_TIMES_2;)t-=e.PI_TIMES_2;t<0&&(t=0)}return t}},{key:"angleBetween",value:function(t,n,r){var i=e.angle(n,t),o=e.angle(n,r);return e.diff(i,o)}},{key:"diff",value:function(t,e){var n=null;return(n=t<e?e-t:t-e)>Math.PI&&(n=2*Math.PI-n),n}},{key:"toRadians",value:function(t){return t*Math.PI/180}},{key:"getTurn",value:function(t,n){var r=Math.sin(n-t);return r>0?e.COUNTERCLOCKWISE:r<0?e.CLOCKWISE:e.NONE}},{key:"angleBetweenOriented",value:function(t,n,r){var i=e.angle(n,t),o=e.angle(n,r)-i;return o<=-Math.PI?o+e.PI_TIMES_2:o>Math.PI?o-e.PI_TIMES_2:o}}]),e}();On.PI_TIMES_2=2*Math.PI,On.PI_OVER_2=Math.PI/2,On.PI_OVER_4=Math.PI/4,On.COUNTERCLOCKWISE=ft.COUNTERCLOCKWISE,On.CLOCKWISE=ft.CLOCKWISE,On.NONE=ft.COLLINEAR;var Rn=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"addNextSegment",value:function(t,e){if(this._s0=this._s1,this._s1=this._s2,this._s2=t,this._seg0.setCoordinates(this._s0,this._s1),this.computeOffsetSegment(this._seg0,this._side,this._distance,this._offset0),this._seg1.setCoordinates(this._s1,this._s2),this.computeOffsetSegment(this._seg1,this._side,this._distance,this._offset1),this._s1.equals(this._s2))return null;var n=ft.index(this._s0,this._s1,this._s2),r=n===ft.CLOCKWISE&&this._side===tt.LEFT||n===ft.COUNTERCLOCKWISE&&this._side===tt.RIGHT;0===n?this.addCollinear(e):r?this.addOutsideTurn(n,e):this.addInsideTurn(n,e)}},{key:"addLineEndCap",value:function(t,e){var n=new wn(t,e),r=new wn;this.computeOffsetSegment(n,tt.LEFT,this._distance,r);var i=new wn;this.computeOffsetSegment(n,tt.RIGHT,this._distance,i);var o=e.x-t.x,s=e.y-t.y,a=Math.atan2(s,o);switch(this._bufParams.getEndCapStyle()){case y.CAP_ROUND:this._segList.addPt(r.p1),this.addDirectedFillet(e,a+Math.PI/2,a-Math.PI/2,ft.CLOCKWISE,this._distance),this._segList.addPt(i.p1);break;case y.CAP_FLAT:this._segList.addPt(r.p1),this._segList.addPt(i.p1);break;case y.CAP_SQUARE:var u=new j;u.x=Math.abs(this._distance)*Math.cos(a),u.y=Math.abs(this._distance)*Math.sin(a);var l=new j(r.p1.x+u.x,r.p1.y+u.y),h=new j(i.p1.x+u.x,i.p1.y+u.y);this._segList.addPt(l),this._segList.addPt(h)}}},{key:"getCoordinates",value:function(){return this._segList.getCoordinates()}},{key:"addMitreJoin",value:function(t,e,n,r){var i=_t.intersection(e.p0,e.p1,n.p0,n.p1);if(null!==i&&(r<=0?1:i.distance(t)/Math.abs(r))<=this._bufParams.getMitreLimit())return this._segList.addPt(i),null;this.addLimitedMitreJoin(e,n,r,this._bufParams.getMitreLimit())}},{key:"addOutsideTurn",value:function(t,n){if(this._offset0.p1.distance(this._offset1.p0)<this._distance*e.OFFSET_SEGMENT_SEPARATION_FACTOR)return this._segList.addPt(this._offset0.p1),null;this._bufParams.getJoinStyle()===y.JOIN_MITRE?this.addMitreJoin(this._s1,this._offset0,this._offset1,this._distance):this._bufParams.getJoinStyle()===y.JOIN_BEVEL?this.addBevelJoin(this._offset0,this._offset1):(n&&this._segList.addPt(this._offset0.p1),this.addCornerFillet(this._s1,this._offset0.p1,this._offset1.p0,t,this._distance),this._segList.addPt(this._offset1.p0))}},{key:"createSquare",value:function(t){this._segList.addPt(new j(t.x+this._distance,t.y+this._distance)),this._segList.addPt(new j(t.x+this._distance,t.y-this._distance)),this._segList.addPt(new j(t.x-this._distance,t.y-this._distance)),this._segList.addPt(new j(t.x-this._distance,t.y+this._distance)),this._segList.closeRing()}},{key:"addSegments",value:function(t,e){this._segList.addPts(t,e)}},{key:"addFirstSegment",value:function(){this._segList.addPt(this._offset1.p0)}},{key:"addCornerFillet",value:function(t,e,n,r,i){var o=e.x-t.x,s=e.y-t.y,a=Math.atan2(s,o),u=n.x-t.x,l=n.y-t.y,h=Math.atan2(l,u);r===ft.CLOCKWISE?a<=h&&(a+=2*Math.PI):a>=h&&(a-=2*Math.PI),this._segList.addPt(e),this.addDirectedFillet(t,a,h,r,i),this._segList.addPt(n)}},{key:"addLastSegment",value:function(){this._segList.addPt(this._offset1.p1)}},{key:"initSideSegments",value:function(t,e,n){this._s1=t,this._s2=e,this._side=n,this._seg1.setCoordinates(t,e),this.computeOffsetSegment(this._seg1,n,this._distance,this._offset1)}},{key:"addLimitedMitreJoin",value:function(t,e,n,r){var i=this._seg0.p1,o=On.angle(i,this._seg0.p0),s=On.angleBetweenOriented(this._seg0.p0,i,this._seg1.p1)/2,a=On.normalize(o+s),u=On.normalize(a+Math.PI),l=r*n,h=n-l*Math.abs(Math.sin(s)),c=i.x+l*Math.cos(u),f=i.y+l*Math.sin(u),v=new j(c,f),g=new wn(i,v),d=g.pointAlongOffset(1,h),p=g.pointAlongOffset(1,-h);this._side===tt.LEFT?(this._segList.addPt(d),this._segList.addPt(p)):(this._segList.addPt(p),this._segList.addPt(d))}},{key:"addDirectedFillet",value:function(t,e,n,r,i){var o=r===ft.CLOCKWISE?-1:1,s=Math.abs(e-n),a=Math.trunc(s/this._filletAngleQuantum+.5);if(a<1)return null;for(var u=s/a,l=new j,h=0;h<a;h++){var c=e+o*h*u;l.x=t.x+i*Math.cos(c),l.y=t.y+i*Math.sin(c),this._segList.addPt(l)}}},{key:"computeOffsetSegment",value:function(t,e,n,r){var i=e===tt.LEFT?1:-1,o=t.p1.x-t.p0.x,s=t.p1.y-t.p0.y,a=Math.sqrt(o*o+s*s),u=i*n*o/a,l=i*n*s/a;r.p0.x=t.p0.x-l,r.p0.y=t.p0.y+u,r.p1.x=t.p1.x-l,r.p1.y=t.p1.y+u}},{key:"addInsideTurn",value:function(t,n){if(this._li.computeIntersection(this._offset0.p0,this._offset0.p1,this._offset1.p0,this._offset1.p1),this._li.hasIntersection())this._segList.addPt(this._li.getIntersection(0));else if(this._hasNarrowConcaveAngle=!0,this._offset0.p1.distance(this._offset1.p0)<this._distance*e.INSIDE_TURN_VERTEX_SNAP_DISTANCE_FACTOR)this._segList.addPt(this._offset0.p1);else{if(this._segList.addPt(this._offset0.p1),this._closingSegLengthFactor>0){var r=new j((this._closingSegLengthFactor*this._offset0.p1.x+this._s1.x)/(this._closingSegLengthFactor+1),(this._closingSegLengthFactor*this._offset0.p1.y+this._s1.y)/(this._closingSegLengthFactor+1));this._segList.addPt(r);var i=new j((this._closingSegLengthFactor*this._offset1.p0.x+this._s1.x)/(this._closingSegLengthFactor+1),(this._closingSegLengthFactor*this._offset1.p0.y+this._s1.y)/(this._closingSegLengthFactor+1));this._segList.addPt(i)}else this._segList.addPt(this._s1);this._segList.addPt(this._offset1.p0)}}},{key:"createCircle",value:function(t){var e=new j(t.x+this._distance,t.y);this._segList.addPt(e),this.addDirectedFillet(t,0,2*Math.PI,-1,this._distance),this._segList.closeRing()}},{key:"addBevelJoin",value:function(t,e){this._segList.addPt(t.p1),this._segList.addPt(e.p0)}},{key:"init",value:function(t){this._distance=t,this._maxCurveSegmentError=t*(1-Math.cos(this._filletAngleQuantum/2)),this._segList=new Tn,this._segList.setPrecisionModel(this._precisionModel),this._segList.setMinimumVertexDistance(t*e.CURVE_VERTEX_SNAP_DISTANCE_FACTOR)}},{key:"addCollinear",value:function(t){this._li.computeIntersection(this._s0,this._s1,this._s1,this._s2),this._li.getIntersectionNum()>=2&&(this._bufParams.getJoinStyle()===y.JOIN_BEVEL||this._bufParams.getJoinStyle()===y.JOIN_MITRE?(t&&this._segList.addPt(this._offset0.p1),this._segList.addPt(this._offset1.p0)):this.addCornerFillet(this._s1,this._offset0.p1,this._offset1.p0,ft.CLOCKWISE,this._distance))}},{key:"closeRing",value:function(){this._segList.closeRing()}},{key:"hasNarrowConcaveAngle",value:function(){return this._hasNarrowConcaveAngle}}],[{key:"constructor_",value:function(){this._maxCurveSegmentError=0,this._filletAngleQuantum=null,this._closingSegLengthFactor=1,this._segList=null,this._distance=0,this._precisionModel=null,this._bufParams=null,this._li=null,this._s0=null,this._s1=null,this._s2=null,this._seg0=new wn,this._seg1=new wn,this._offset0=new wn,this._offset1=new wn,this._side=0,this._hasNarrowConcaveAngle=!1;var t=arguments[0],n=arguments[1],r=arguments[2];this._precisionModel=t,this._bufParams=n,this._li=new Ce,this._filletAngleQuantum=Math.PI/2/n.getQuadrantSegments(),n.getQuadrantSegments()>=8&&n.getJoinStyle()===y.JOIN_ROUND&&(this._closingSegLengthFactor=e.MAX_CLOSING_SEG_LEN_FACTOR),this.init(r)}}]),e}();Rn.OFFSET_SEGMENT_SEPARATION_FACTOR=.001,Rn.INSIDE_TURN_VERTEX_SNAP_DISTANCE_FACTOR=.001,Rn.CURVE_VERTEX_SNAP_DISTANCE_FACTOR=1e-6,Rn.MAX_CLOSING_SEG_LEN_FACTOR=80;var An=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"getOffsetCurve",value:function(t,e){if(this._distance=e,0===e)return null;var n=e<0,r=Math.abs(e),i=this.getSegGen(r);t.length<=1?this.computePointCurve(t[0],i):this.computeOffsetCurve(t,n,i);var o=i.getCoordinates();return n&&Wt.reverse(o),o}},{key:"computeSingleSidedBufferCurve",value:function(t,e,n){var r=this.simplifyTolerance(this._distance);if(e){n.addSegments(t,!0);var i=Cn.simplify(t,-r),o=i.length-1;n.initSideSegments(i[o],i[o-1],tt.LEFT),n.addFirstSegment();for(var s=o-2;s>=0;s--)n.addNextSegment(i[s],!0)}else{n.addSegments(t,!1);var a=Cn.simplify(t,r),u=a.length-1;n.initSideSegments(a[0],a[1],tt.LEFT),n.addFirstSegment();for(var l=2;l<=u;l++)n.addNextSegment(a[l],!0)}n.addLastSegment(),n.closeRing()}},{key:"computeRingBufferCurve",value:function(t,e,n){var r=this.simplifyTolerance(this._distance);e===tt.RIGHT&&(r=-r);var i=Cn.simplify(t,r),o=i.length-1;n.initSideSegments(i[o-1],i[0],e);for(var s=1;s<=o;s++){var a=1!==s;n.addNextSegment(i[s],a)}n.closeRing()}},{key:"computeLineBufferCurve",value:function(t,e){var n=this.simplifyTolerance(this._distance),r=Cn.simplify(t,n),i=r.length-1;e.initSideSegments(r[0],r[1],tt.LEFT);for(var o=2;o<=i;o++)e.addNextSegment(r[o],!0);e.addLastSegment(),e.addLineEndCap(r[i-1],r[i]);var s=Cn.simplify(t,-n),a=s.length-1;e.initSideSegments(s[a],s[a-1],tt.LEFT);for(var u=a-2;u>=0;u--)e.addNextSegment(s[u],!0);e.addLastSegment(),e.addLineEndCap(s[1],s[0]),e.closeRing()}},{key:"computePointCurve",value:function(t,e){switch(this._bufParams.getEndCapStyle()){case y.CAP_ROUND:e.createCircle(t);break;case y.CAP_SQUARE:e.createSquare(t)}}},{key:"getLineCurve",value:function(t,e){if(this._distance=e,this.isLineOffsetEmpty(e))return null;var n=Math.abs(e),r=this.getSegGen(n);if(t.length<=1)this.computePointCurve(t[0],r);else if(this._bufParams.isSingleSided()){var i=e<0;this.computeSingleSidedBufferCurve(t,i,r)}else this.computeLineBufferCurve(t,r);return r.getCoordinates()}},{key:"getBufferParameters",value:function(){return this._bufParams}},{key:"simplifyTolerance",value:function(t){return t*this._bufParams.getSimplifyFactor()}},{key:"getRingCurve",value:function(t,n,r){if(this._distance=r,t.length<=2)return this.getLineCurve(t,r);if(0===r)return e.copyCoordinates(t);var i=this.getSegGen(r);return this.computeRingBufferCurve(t,n,i),i.getCoordinates()}},{key:"computeOffsetCurve",value:function(t,e,n){var r=this.simplifyTolerance(this._distance);if(e){var i=Cn.simplify(t,-r),o=i.length-1;n.initSideSegments(i[o],i[o-1],tt.LEFT),n.addFirstSegment();for(var s=o-2;s>=0;s--)n.addNextSegment(i[s],!0)}else{var a=Cn.simplify(t,r),u=a.length-1;n.initSideSegments(a[0],a[1],tt.LEFT),n.addFirstSegment();for(var l=2;l<=u;l++)n.addNextSegment(a[l],!0)}n.addLastSegment()}},{key:"isLineOffsetEmpty",value:function(t){return 0===t||t<0&&!this._bufParams.isSingleSided()}},{key:"getSegGen",value:function(t){return new Rn(this._precisionModel,this._bufParams,t)}}],[{key:"constructor_",value:function(){this._distance=0,this._precisionModel=null,this._bufParams=null;var t=arguments[0],e=arguments[1];this._precisionModel=t,this._bufParams=e}},{key:"copyCoordinates",value:function(t){for(var e=new Array(t.length).fill(null),n=0;n<e.length;n++)e[n]=new j(t[n]);return e}}]),e}(),Dn=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"findStabbedSegments",value:function(){if(1===arguments.length){for(var t=arguments[0],e=new pt,n=this._subgraphs.iterator();n.hasNext();){var r=n.next(),i=r.getEnvelope();t.y<i.getMinY()||t.y>i.getMaxY()||this.findStabbedSegments(t,r.getDirectedEdges(),e)}return e}if(3===arguments.length)if(ot(arguments[2],rt)&&arguments[0]instanceof j&&arguments[1]instanceof Ke){for(var o=arguments[0],s=arguments[1],a=arguments[2],u=s.getEdge().getCoordinates(),l=0;l<u.length-1;l++)if(this._seg.p0=u[l],this._seg.p1=u[l+1],this._seg.p0.y>this._seg.p1.y&&this._seg.reverse(),!(Math.max(this._seg.p0.x,this._seg.p1.x)<o.x||this._seg.isHorizontal()||o.y<this._seg.p0.y||o.y>this._seg.p1.y||ft.index(this._seg.p0,this._seg.p1,o)===ft.RIGHT)){var h=s.getDepth(tt.LEFT);this._seg.p0.equals(u[l])||(h=s.getDepth(tt.RIGHT));var c=new Fn(this._seg,h);a.add(c)}}else if(ot(arguments[2],rt)&&arguments[0]instanceof j&&ot(arguments[1],rt))for(var f=arguments[0],v=arguments[2],g=arguments[1].iterator();g.hasNext();){var d=g.next();d.isForward()&&this.findStabbedSegments(f,d,v)}}},{key:"getDepth",value:function(t){var e=this.findStabbedSegments(t);return 0===e.size()?0:an.min(e)._leftDepth}}],[{key:"constructor_",value:function(){this._subgraphs=null,this._seg=new wn;var t=arguments[0];this._subgraphs=t}}]),e}(),Fn=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"compareTo",value:function(t){var e=t;if(this._upwardSeg.minX()>=e._upwardSeg.maxX())return 1;if(this._upwardSeg.maxX()<=e._upwardSeg.minX())return-1;var n=this._upwardSeg.orientationIndex(e._upwardSeg);return 0!==n||0!=(n=-1*e._upwardSeg.orientationIndex(this._upwardSeg))?n:this._upwardSeg.compareTo(e._upwardSeg)}},{key:"compareX",value:function(t,e){var n=t.p0.compareTo(e.p0);return 0!==n?n:t.p1.compareTo(e.p1)}},{key:"toString",value:function(){return this._upwardSeg.toString()}},{key:"interfaces_",get:function(){return[k]}}],[{key:"constructor_",value:function(){this._upwardSeg=null,this._leftDepth=null;var t=arguments[0],e=arguments[1];this._upwardSeg=new wn(t),this._leftDepth=e}}]),e}();Dn.DepthSegment=Fn;var qn=function(e){r(o,e);var i=c(o);function o(){var e;return t(this,o),e=i.call(this),o.constructor_.apply(l(e),arguments),e}return n(o,null,[{key:"constructor_",value:function(){_.constructor_.call(this,"Projective point not representable on the Cartesian plane.")}}]),o}(_),Gn=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"getY",value:function(){var t=this.y/this.w;if(A.isNaN(t)||A.isInfinite(t))throw new qn;return t}},{key:"getX",value:function(){var t=this.x/this.w;if(A.isNaN(t)||A.isInfinite(t))throw new qn;return t}},{key:"getCoordinate",value:function(){var t=new j;return t.x=this.getX(),t.y=this.getY(),t}}],[{key:"constructor_",value:function(){if(this.x=null,this.y=null,this.w=null,0===arguments.length)this.x=0,this.y=0,this.w=1;else if(1===arguments.length){var t=arguments[0];this.x=t.x,this.y=t.y,this.w=1}else if(2===arguments.length){if("number"==typeof arguments[0]&&"number"==typeof arguments[1]){var n=arguments[0],r=arguments[1];this.x=n,this.y=r,this.w=1}else if(arguments[0]instanceof e&&arguments[1]instanceof e){var i=arguments[0],o=arguments[1];this.x=i.y*o.w-o.y*i.w,this.y=o.x*i.w-i.x*o.w,this.w=i.x*o.y-o.x*i.y}else if(arguments[0]instanceof j&&arguments[1]instanceof j){var s=arguments[0],a=arguments[1];this.x=s.y-a.y,this.y=a.x-s.x,this.w=s.x*a.y-a.x*s.y}}else if(3===arguments.length){var u=arguments[0],l=arguments[1],h=arguments[2];this.x=u,this.y=l,this.w=h}else if(4===arguments.length){var c=arguments[0],f=arguments[1],v=arguments[2],g=arguments[3],d=c.y-f.y,p=f.x-c.x,y=c.x*f.y-f.x*c.y,m=v.y-g.y,_=g.x-v.x,x=v.x*g.y-g.x*v.y;this.x=p*x-_*y,this.y=m*y-d*x,this.w=d*_-m*p}}}]),e}(),Yn=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"area",value:function(){return e.area(this.p0,this.p1,this.p2)}},{key:"signedArea",value:function(){return e.signedArea(this.p0,this.p1,this.p2)}},{key:"interpolateZ",value:function(t){if(null===t)throw new x("Supplied point is null.");return e.interpolateZ(t,this.p0,this.p1,this.p2)}},{key:"longestSideLength",value:function(){return e.longestSideLength(this.p0,this.p1,this.p2)}},{key:"isAcute",value:function(){return e.isAcute(this.p0,this.p1,this.p2)}},{key:"circumcentre",value:function(){return e.circumcentre(this.p0,this.p1,this.p2)}},{key:"area3D",value:function(){return e.area3D(this.p0,this.p1,this.p2)}},{key:"centroid",value:function(){return e.centroid(this.p0,this.p1,this.p2)}},{key:"inCentre",value:function(){return e.inCentre(this.p0,this.p1,this.p2)}}],[{key:"constructor_",value:function(){this.p0=null,this.p1=null,this.p2=null;var t=arguments[0],e=arguments[1],n=arguments[2];this.p0=t,this.p1=e,this.p2=n}},{key:"area",value:function(t,e,n){return Math.abs(((n.x-t.x)*(e.y-t.y)-(e.x-t.x)*(n.y-t.y))/2)}},{key:"signedArea",value:function(t,e,n){return((n.x-t.x)*(e.y-t.y)-(e.x-t.x)*(n.y-t.y))/2}},{key:"det",value:function(t,e,n,r){return t*r-e*n}},{key:"interpolateZ",value:function(t,e,n,r){var i=e.x,o=e.y,s=n.x-i,a=r.x-i,u=n.y-o,l=r.y-o,h=s*l-a*u,c=t.x-i,f=t.y-o,v=(l*c-a*f)/h,g=(-u*c+s*f)/h;return e.getZ()+v*(n.getZ()-e.getZ())+g*(r.getZ()-e.getZ())}},{key:"longestSideLength",value:function(t,e,n){var r=t.distance(e),i=e.distance(n),o=n.distance(t),s=r;return i>s&&(s=i),o>s&&(s=o),s}},{key:"circumcentreDD",value:function(t,e,n){var r=lt.valueOf(t.x).subtract(n.x),i=lt.valueOf(t.y).subtract(n.y),o=lt.valueOf(e.x).subtract(n.x),s=lt.valueOf(e.y).subtract(n.y),a=lt.determinant(r,i,o,s).multiply(2),u=r.sqr().add(i.sqr()),l=o.sqr().add(s.sqr()),h=lt.determinant(i,u,s,l),c=lt.determinant(r,u,o,l),f=lt.valueOf(n.x).subtract(h.divide(a)).doubleValue(),v=lt.valueOf(n.y).add(c.divide(a)).doubleValue();return new j(f,v)}},{key:"isAcute",value:function(t,e,n){return!!On.isAcute(t,e,n)&&!!On.isAcute(e,n,t)&&!!On.isAcute(n,t,e)}},{key:"circumcentre",value:function(t,n,r){var i=r.x,o=r.y,s=t.x-i,a=t.y-o,u=n.x-i,l=n.y-o,h=2*e.det(s,a,u,l),c=e.det(a,s*s+a*a,l,u*u+l*l),f=e.det(s,s*s+a*a,u,u*u+l*l);return new j(i-c/h,o+f/h)}},{key:"perpendicularBisector",value:function(t,e){var n=e.x-t.x,r=e.y-t.y,i=new Gn(t.x+n/2,t.y+r/2,1),o=new Gn(t.x-r+n/2,t.y+n+r/2,1);return new Gn(i,o)}},{key:"angleBisector",value:function(t,e,n){var r=e.distance(t),i=r/(r+e.distance(n)),o=n.x-t.x,s=n.y-t.y;return new j(t.x+i*o,t.y+i*s)}},{key:"area3D",value:function(t,e,n){var r=e.x-t.x,i=e.y-t.y,o=e.getZ()-t.getZ(),s=n.x-t.x,a=n.y-t.y,u=n.getZ()-t.getZ(),l=i*u-o*a,h=o*s-r*u,c=r*a-i*s,f=l*l+h*h+c*c;return Math.sqrt(f)/2}},{key:"centroid",value:function(t,e,n){var r=(t.x+e.x+n.x)/3,i=(t.y+e.y+n.y)/3;return new j(r,i)}},{key:"inCentre",value:function(t,e,n){var r=e.distance(n),i=t.distance(n),o=t.distance(e),s=r+i+o,a=(r*t.x+i*e.x+o*n.x)/s,u=(r*t.y+i*e.y+o*n.y)/s;return new j(a,u)}}]),e}(),Bn=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"addRingSide",value:function(t,e,n,r,i){if(0===e&&t.length<jt.MINIMUM_VALID_SIZE)return null;var o=r,s=i;t.length>=jt.MINIMUM_VALID_SIZE&&ft.isCCW(t)&&(o=i,s=r,n=tt.opposite(n));var a=this._curveBuilder.getRingCurve(t,n,e);this.addCurve(a,o,s)}},{key:"addRingBothSides",value:function(t,e){this.addRingSide(t,e,tt.LEFT,Z.EXTERIOR,Z.INTERIOR),this.addRingSide(t,e,tt.RIGHT,Z.INTERIOR,Z.EXTERIOR)}},{key:"addPoint",value:function(t){if(this._distance<=0)return null;var e=t.getCoordinates(),n=this._curveBuilder.getLineCurve(e,this._distance);this.addCurve(n,Z.EXTERIOR,Z.INTERIOR)}},{key:"addPolygon",value:function(t){var e=this._distance,n=tt.LEFT;this._distance<0&&(e=-this._distance,n=tt.RIGHT);var r=t.getExteriorRing(),i=Wt.removeRepeatedPoints(r.getCoordinates());if(this._distance<0&&this.isErodedCompletely(r,this._distance))return null;if(this._distance<=0&&i.length<3)return null;this.addRingSide(i,e,n,Z.EXTERIOR,Z.INTERIOR);for(var o=0;o<t.getNumInteriorRing();o++){var s=t.getInteriorRingN(o),a=Wt.removeRepeatedPoints(s.getCoordinates());this._distance>0&&this.isErodedCompletely(s,-this._distance)||this.addRingSide(a,e,tt.opposite(n),Z.INTERIOR,Z.EXTERIOR)}}},{key:"isTriangleErodedCompletely",value:function(t,e){var n=new Yn(t[0],t[1],t[2]),r=n.inCentre();return kt.pointToSegment(r,n.p0,n.p1)<Math.abs(e)}},{key:"addLineString",value:function(t){if(this._curveBuilder.isLineOffsetEmpty(this._distance))return null;var e=Wt.removeRepeatedPoints(t.getCoordinates());if(Wt.isRing(e)&&!this._curveBuilder.getBufferParameters().isSingleSided())this.addRingBothSides(e,this._distance);else{var n=this._curveBuilder.getLineCurve(e,this._distance);this.addCurve(n,Z.EXTERIOR,Z.INTERIOR)}}},{key:"addCurve",value:function(t,e,n){if(null===t||t.length<2)return null;var r=new kn(t,new Ae(0,Z.BOUNDARY,e,n));this._curveList.add(r)}},{key:"getCurves",value:function(){return this.add(this._inputGeom),this._curveList}},{key:"add",value:function(t){if(t.isEmpty())return null;if(t instanceof Ft)this.addPolygon(t);else if(t instanceof Ct)this.addLineString(t);else if(t instanceof Ot)this.addPoint(t);else if(t instanceof zt)this.addCollection(t);else if(t instanceof se)this.addCollection(t);else if(t instanceof ee)this.addCollection(t);else{if(!(t instanceof Bt))throw new J(t.getGeometryType());this.addCollection(t)}}},{key:"isErodedCompletely",value:function(t,e){var n=t.getCoordinates();if(n.length<4)return e<0;if(4===n.length)return this.isTriangleErodedCompletely(n,e);var r=t.getEnvelopeInternal(),i=Math.min(r.getHeight(),r.getWidth());return e<0&&2*Math.abs(e)>i}},{key:"addCollection",value:function(t){for(var e=0;e<t.getNumGeometries();e++){var n=t.getGeometryN(e);this.add(n)}}}],[{key:"constructor_",value:function(){this._inputGeom=null,this._distance=null,this._curveBuilder=null,this._curveList=new pt;var t=arguments[0],e=arguments[1],n=arguments[2];this._inputGeom=t,this._distance=e,this._curveBuilder=n}}]),e}(),zn=function(){function e(){t(this,e)}return n(e,[{key:"locate",value:function(t){}}]),e}(),jn=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"next",value:function(){if(this._atStart)return this._atStart=!1,e.isAtomic(this._parent)&&this._index++,this._parent;if(null!==this._subcollectionIterator){if(this._subcollectionIterator.hasNext())return this._subcollectionIterator.next();this._subcollectionIterator=null}if(this._index>=this._max)throw new W;var t=this._parent.getGeometryN(this._index++);return t instanceof Bt?(this._subcollectionIterator=new e(t),this._subcollectionIterator.next()):t}},{key:"remove",value:function(){throw new J(this.getClass().getName())}},{key:"hasNext",value:function(){if(this._atStart)return!0;if(null!==this._subcollectionIterator){if(this._subcollectionIterator.hasNext())return!0;this._subcollectionIterator=null}return!(this._index>=this._max)}},{key:"interfaces_",get:function(){return[yn]}}],[{key:"constructor_",value:function(){this._parent=null,this._atStart=null,this._max=null,this._index=null,this._subcollectionIterator=null;var t=arguments[0];this._parent=t,this._atStart=!0,this._index=0,this._max=t.getNumGeometries()}},{key:"isAtomic",value:function(t){return!(t instanceof Bt)}}]),e}(),Xn=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"locate",value:function(t){return e.locate(t,this._geom)}},{key:"interfaces_",get:function(){return[zn]}}],[{key:"constructor_",value:function(){this._geom=null;var t=arguments[0];this._geom=t}},{key:"locatePointInPolygon",value:function(t,n){if(n.isEmpty())return Z.EXTERIOR;var r=n.getExteriorRing(),i=e.locatePointInRing(t,r);if(i!==Z.INTERIOR)return i;for(var o=0;o<n.getNumInteriorRing();o++){var s=n.getInteriorRingN(o),a=e.locatePointInRing(t,s);if(a===Z.BOUNDARY)return Z.BOUNDARY;if(a===Z.INTERIOR)return Z.EXTERIOR}return Z.INTERIOR}},{key:"locatePointInRing",value:function(t,e){return e.getEnvelopeInternal().intersects(t)?Oe.locateInRing(t,e.getCoordinates()):Z.EXTERIOR}},{key:"containsPointInPolygon",value:function(t,n){return Z.EXTERIOR!==e.locatePointInPolygon(t,n)}},{key:"locateInGeometry",value:function(t,n){if(n instanceof Ft)return e.locatePointInPolygon(t,n);if(n instanceof Bt)for(var r=new jn(n);r.hasNext();){var i=r.next();if(i!==n){var o=e.locateInGeometry(t,i);if(o!==Z.EXTERIOR)return o}}return Z.EXTERIOR}},{key:"isContained",value:function(t,n){return Z.EXTERIOR!==e.locate(t,n)}},{key:"locate",value:function(t,n){return n.isEmpty()?Z.EXTERIOR:n.getEnvelopeInternal().intersects(t)?e.locateInGeometry(t,n):Z.EXTERIOR}}]),e}(),Un=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"getNextCW",value:function(t){this.getEdges();var e=this._edgeList.indexOf(t),n=e-1;return 0===e&&(n=this._edgeList.size()-1),this._edgeList.get(n)}},{key:"propagateSideLabels",value:function(t){for(var e=Z.NONE,n=this.iterator();n.hasNext();){var r=n.next().getLabel();r.isArea(t)&&r.getLocation(t,tt.LEFT)!==Z.NONE&&(e=r.getLocation(t,tt.LEFT))}if(e===Z.NONE)return null;for(var i=e,o=this.iterator();o.hasNext();){var s=o.next(),a=s.getLabel();if(a.getLocation(t,tt.ON)===Z.NONE&&a.setLocation(t,tt.ON,i),a.isArea(t)){var u=a.getLocation(t,tt.LEFT),l=a.getLocation(t,tt.RIGHT);if(l!==Z.NONE){if(l!==i)throw new gt("side location conflict",s.getCoordinate());u===Z.NONE&&G.shouldNeverReachHere("found single null side (at "+s.getCoordinate()+")"),i=u}else G.isTrue(a.getLocation(t,tt.LEFT)===Z.NONE,"found single null side"),a.setLocation(t,tt.RIGHT,i),a.setLocation(t,tt.LEFT,i)}}}},{key:"getCoordinate",value:function(){var t=this.iterator();return t.hasNext()?t.next().getCoordinate():null}},{key:"print",value:function(t){xt.out.println("EdgeEndStar:   "+this.getCoordinate());for(var e=this.iterator();e.hasNext();)e.next().print(t)}},{key:"isAreaLabelsConsistent",value:function(t){return this.computeEdgeEndLabels(t.getBoundaryNodeRule()),this.checkAreaLabelsConsistent(0)}},{key:"checkAreaLabelsConsistent",value:function(t){var e=this.getEdges();if(e.size()<=0)return!0;var n=e.size()-1,r=e.get(n).getLabel().getLocation(t,tt.LEFT);G.isTrue(r!==Z.NONE,"Found unlabelled area edge");for(var i=r,o=this.iterator();o.hasNext();){var s=o.next().getLabel();G.isTrue(s.isArea(t),"Found non-area edge");var a=s.getLocation(t,tt.LEFT),u=s.getLocation(t,tt.RIGHT);if(a===u)return!1;if(u!==i)return!1;i=a}return!0}},{key:"findIndex",value:function(t){this.iterator();for(var e=0;e<this._edgeList.size();e++)if(this._edgeList.get(e)===t)return e;return-1}},{key:"iterator",value:function(){return this.getEdges().iterator()}},{key:"getEdges",value:function(){return null===this._edgeList&&(this._edgeList=new pt(this._edgeMap.values())),this._edgeList}},{key:"getLocation",value:function(t,e,n){return this._ptInAreaLocation[t]===Z.NONE&&(this._ptInAreaLocation[t]=Xn.locate(e,n[t].getGeometry())),this._ptInAreaLocation[t]}},{key:"toString",value:function(){var t=new st;t.append("EdgeEndStar:   "+this.getCoordinate()),t.append("\n");for(var e=this.iterator();e.hasNext();){var n=e.next();t.append(n),t.append("\n")}return t.toString()}},{key:"computeEdgeEndLabels",value:function(t){for(var e=this.iterator();e.hasNext();)e.next().computeLabel(t)}},{key:"computeLabelling",value:function(t){this.computeEdgeEndLabels(t[0].getBoundaryNodeRule()),this.propagateSideLabels(0),this.propagateSideLabels(1);for(var e=[!1,!1],n=this.iterator();n.hasNext();)for(var r=n.next().getLabel(),i=0;i<2;i++)r.isLine(i)&&r.getLocation(i)===Z.BOUNDARY&&(e[i]=!0);for(var o=this.iterator();o.hasNext();)for(var s=o.next(),a=s.getLabel(),u=0;u<2;u++)if(a.isAnyNull(u)){var l=Z.NONE;if(e[u])l=Z.EXTERIOR;else{var h=s.getCoordinate();l=this.getLocation(u,h,t)}a.setAllLocationsIfNull(u,l)}}},{key:"getDegree",value:function(){return this._edgeMap.size()}},{key:"insertEdgeEnd",value:function(t,e){this._edgeMap.put(t,e),this._edgeList=null}}],[{key:"constructor_",value:function(){this._edgeMap=new Ze,this._edgeList=null,this._ptInAreaLocation=[Z.NONE,Z.NONE]}}]),e}(),Vn=function(e){r(s,e);var o=c(s);function s(){var e;return t(this,s),e=o.call(this),s.constructor_.apply(l(e),arguments),e}return n(s,[{key:"linkResultDirectedEdges",value:function(){this.getResultAreaEdges();for(var t=null,e=null,n=this._SCANNING_FOR_INCOMING,r=0;r<this._resultAreaEdgeList.size();r++){var i=this._resultAreaEdgeList.get(r),o=i.getSym();if(i.getLabel().isArea())switch(null===t&&i.isInResult()&&(t=i),n){case this._SCANNING_FOR_INCOMING:if(!o.isInResult())continue;e=o,n=this._LINKING_TO_OUTGOING;break;case this._LINKING_TO_OUTGOING:if(!i.isInResult())continue;e.setNext(i),n=this._SCANNING_FOR_INCOMING}}if(n===this._LINKING_TO_OUTGOING){if(null===t)throw new gt("no outgoing dirEdge found",this.getCoordinate());G.isTrue(t.isInResult(),"unable to link last incoming dirEdge"),e.setNext(t)}}},{key:"insert",value:function(t){var e=t;this.insertEdgeEnd(e,e)}},{key:"getRightmostEdge",value:function(){var t=this.getEdges(),e=t.size();if(e<1)return null;var n=t.get(0);if(1===e)return n;var r=t.get(e-1),i=n.getQuadrant(),o=r.getQuadrant();return We.isNorthern(i)&&We.isNorthern(o)?n:We.isNorthern(i)||We.isNorthern(o)?0!==n.getDy()?n:0!==r.getDy()?r:(G.shouldNeverReachHere("found two horizontal edges incident on node"),null):r}},{key:"print",value:function(t){xt.out.println("DirectedEdgeStar: "+this.getCoordinate());for(var e=this.iterator();e.hasNext();){var n=e.next();t.print("out "),n.print(t),t.println(),t.print("in "),n.getSym().print(t),t.println()}}},{key:"getResultAreaEdges",value:function(){if(null!==this._resultAreaEdgeList)return this._resultAreaEdgeList;this._resultAreaEdgeList=new pt;for(var t=this.iterator();t.hasNext();){var e=t.next();(e.isInResult()||e.getSym().isInResult())&&this._resultAreaEdgeList.add(e)}return this._resultAreaEdgeList}},{key:"updateLabelling",value:function(t){for(var e=this.iterator();e.hasNext();){var n=e.next().getLabel();n.setAllLocationsIfNull(0,t.getLocation(0)),n.setAllLocationsIfNull(1,t.getLocation(1))}}},{key:"linkAllDirectedEdges",value:function(){this.getEdges();for(var t=null,e=null,n=this._edgeList.size()-1;n>=0;n--){var r=this._edgeList.get(n),i=r.getSym();null===e&&(e=i),null!==t&&i.setNext(t),t=r}e.setNext(t)}},{key:"computeDepths",value:function(){if(1===arguments.length){var t=arguments[0],e=this.findIndex(t),n=t.getDepth(tt.LEFT),r=t.getDepth(tt.RIGHT),i=this.computeDepths(e+1,this._edgeList.size(),n);if(this.computeDepths(0,e,i)!==r)throw new gt("depth mismatch at "+t.getCoordinate())}else if(3===arguments.length){for(var o=arguments[1],s=arguments[2],a=arguments[0];a<o;a++){var u=this._edgeList.get(a);u.setEdgeDepths(tt.RIGHT,s),s=u.getDepth(tt.LEFT)}return s}}},{key:"mergeSymLabels",value:function(){for(var t=this.iterator();t.hasNext();){var e=t.next();e.getLabel().merge(e.getSym().getLabel())}}},{key:"linkMinimalDirectedEdges",value:function(t){for(var e=null,n=null,r=this._SCANNING_FOR_INCOMING,i=this._resultAreaEdgeList.size()-1;i>=0;i--){var o=this._resultAreaEdgeList.get(i),s=o.getSym();switch(null===e&&o.getEdgeRing()===t&&(e=o),r){case this._SCANNING_FOR_INCOMING:if(s.getEdgeRing()!==t)continue;n=s,r=this._LINKING_TO_OUTGOING;break;case this._LINKING_TO_OUTGOING:if(o.getEdgeRing()!==t)continue;n.setNextMin(o),r=this._SCANNING_FOR_INCOMING}}r===this._LINKING_TO_OUTGOING&&(G.isTrue(null!==e,"found null for first outgoing dirEdge"),G.isTrue(e.getEdgeRing()===t,"unable to link last incoming dirEdge"),n.setNextMin(e))}},{key:"getOutgoingDegree",value:function(){if(0===arguments.length){for(var t=0,e=this.iterator();e.hasNext();)e.next().isInResult()&&t++;return t}if(1===arguments.length){for(var n=arguments[0],r=0,i=this.iterator();i.hasNext();)i.next().getEdgeRing()===n&&r++;return r}}},{key:"getLabel",value:function(){return this._label}},{key:"findCoveredLineEdges",value:function(){for(var t=Z.NONE,e=this.iterator();e.hasNext();){var n=e.next(),r=n.getSym();if(!n.isLineEdge()){if(n.isInResult()){t=Z.INTERIOR;break}if(r.isInResult()){t=Z.EXTERIOR;break}}}if(t===Z.NONE)return null;for(var i=t,o=this.iterator();o.hasNext();){var s=o.next(),a=s.getSym();s.isLineEdge()?s.getEdge().setCovered(i===Z.INTERIOR):(s.isInResult()&&(i=Z.EXTERIOR),a.isInResult()&&(i=Z.INTERIOR))}}},{key:"computeLabelling",value:function(t){f(i(s.prototype),"computeLabelling",this).call(this,t),this._label=new Ae(Z.NONE);for(var e=this.iterator();e.hasNext();)for(var n=e.next().getEdge().getLabel(),r=0;r<2;r++){var o=n.getLocation(r);o!==Z.INTERIOR&&o!==Z.BOUNDARY||this._label.setLocation(r,Z.INTERIOR)}}}],[{key:"constructor_",value:function(){this._resultAreaEdgeList=null,this._label=null,this._SCANNING_FOR_INCOMING=1,this._LINKING_TO_OUTGOING=2}}]),s}(Un),Zn=function(e){r(o,e);var i=c(o);function o(){return t(this,o),i.call(this)}return n(o,[{key:"createNode",value:function(t){return new Ye(t,new Vn)}}]),o}(Qe),Hn=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"compareTo",value:function(t){var n=t;return e.compareOriented(this._pts,this._orientation,n._pts,n._orientation)}},{key:"interfaces_",get:function(){return[k]}}],[{key:"constructor_",value:function(){this._pts=null,this._orientation=null;var t=arguments[0];this._pts=t,this._orientation=e.orientation(t)}},{key:"orientation",value:function(t){return 1===Wt.increasingDirection(t)}},{key:"compareOriented",value:function(t,e,n,r){for(var i=e?1:-1,o=r?1:-1,s=e?t.length:-1,a=r?n.length:-1,u=e?0:t.length-1,l=r?0:n.length-1;;){var h=t[u].compareTo(n[l]);if(0!==h)return h;var c=(u+=i)===s,f=(l+=o)===a;if(c&&!f)return-1;if(!c&&f)return 1;if(c&&f)return 0}}}]),e}(),Wn=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"print",value:function(t){t.print("MULTILINESTRING ( ");for(var e=0;e<this._edges.size();e++){var n=this._edges.get(e);e>0&&t.print(","),t.print("(");for(var r=n.getCoordinates(),i=0;i<r.length;i++)i>0&&t.print(","),t.print(r[i].x+" "+r[i].y);t.println(")")}t.print(")  ")}},{key:"addAll",value:function(t){for(var e=t.iterator();e.hasNext();)this.add(e.next())}},{key:"findEdgeIndex",value:function(t){for(var e=0;e<this._edges.size();e++)if(this._edges.get(e).equals(t))return e;return-1}},{key:"iterator",value:function(){return this._edges.iterator()}},{key:"getEdges",value:function(){return this._edges}},{key:"get",value:function(t){return this._edges.get(t)}},{key:"findEqualEdge",value:function(t){var e=new Hn(t.getCoordinates());return this._ocaMap.get(e)}},{key:"add",value:function(t){this._edges.add(t);var e=new Hn(t.getCoordinates());this._ocaMap.put(e,t)}}],[{key:"constructor_",value:function(){this._edges=new pt,this._ocaMap=new Ze}}]),e}(),Jn=function(){function e(){t(this,e)}return n(e,[{key:"processIntersections",value:function(t,e,n,r){}},{key:"isDone",value:function(){}}]),e}(),Kn=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"isTrivialIntersection",value:function(t,n,r,i){if(t===r&&1===this._li.getIntersectionNum()){if(e.isAdjacentSegments(n,i))return!0;if(t.isClosed()){var o=t.size()-1;if(0===n&&i===o||0===i&&n===o)return!0}}return!1}},{key:"getProperIntersectionPoint",value:function(){return this._properIntersectionPoint}},{key:"hasProperInteriorIntersection",value:function(){return this._hasProperInterior}},{key:"getLineIntersector",value:function(){return this._li}},{key:"hasProperIntersection",value:function(){return this._hasProper}},{key:"processIntersections",value:function(t,e,n,r){if(t===n&&e===r)return null;this.numTests++;var i=t.getCoordinates()[e],o=t.getCoordinates()[e+1],s=n.getCoordinates()[r],a=n.getCoordinates()[r+1];this._li.computeIntersection(i,o,s,a),this._li.hasIntersection()&&(this.numIntersections++,this._li.isInteriorIntersection()&&(this.numInteriorIntersections++,this._hasInterior=!0),this.isTrivialIntersection(t,e,n,r)||(this._hasIntersection=!0,t.addIntersections(this._li,e,0),n.addIntersections(this._li,r,1),this._li.isProper()&&(this.numProperIntersections++,this._hasProper=!0,this._hasProperInterior=!0)))}},{key:"hasIntersection",value:function(){return this._hasIntersection}},{key:"isDone",value:function(){return!1}},{key:"hasInteriorIntersection",value:function(){return this._hasInterior}},{key:"interfaces_",get:function(){return[Jn]}}],[{key:"constructor_",value:function(){this._hasIntersection=!1,this._hasProper=!1,this._hasProperInterior=!1,this._hasInterior=!1,this._properIntersectionPoint=null,this._li=null,this._isSelfIntersection=null,this.numIntersections=0,this.numInteriorIntersections=0,this.numProperIntersections=0,this.numTests=0;var t=arguments[0];this._li=t}},{key:"isAdjacentSegments",value:function(t,e){return 1===Math.abs(t-e)}}]),e}(),Qn=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"getSegmentIndex",value:function(){return this.segmentIndex}},{key:"getCoordinate",value:function(){return this.coord}},{key:"print",value:function(t){t.print(this.coord),t.print(" seg # = "+this.segmentIndex),t.println(" dist = "+this.dist)}},{key:"compareTo",value:function(t){var e=t;return this.compare(e.segmentIndex,e.dist)}},{key:"isEndPoint",value:function(t){return 0===this.segmentIndex&&0===this.dist||this.segmentIndex===t}},{key:"toString",value:function(){return this.coord+" seg # = "+this.segmentIndex+" dist = "+this.dist}},{key:"getDistance",value:function(){return this.dist}},{key:"compare",value:function(t,e){return this.segmentIndex<t?-1:this.segmentIndex>t?1:this.dist<e?-1:this.dist>e?1:0}},{key:"interfaces_",get:function(){return[k]}}],[{key:"constructor_",value:function(){this.coord=null,this.segmentIndex=null,this.dist=null;var t=arguments[0],e=arguments[1],n=arguments[2];this.coord=new j(t),this.segmentIndex=e,this.dist=n}}]),e}(),$n=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"print",value:function(t){t.println("Intersections:");for(var e=this.iterator();e.hasNext();)e.next().print(t)}},{key:"iterator",value:function(){return this._nodeMap.values().iterator()}},{key:"addSplitEdges",value:function(t){this.addEndpoints();for(var e=this.iterator(),n=e.next();e.hasNext();){var r=e.next(),i=this.createSplitEdge(n,r);t.add(i),n=r}}},{key:"addEndpoints",value:function(){var t=this.edge.pts.length-1;this.add(this.edge.pts[0],0,0),this.add(this.edge.pts[t],t,0)}},{key:"createSplitEdge",value:function(t,e){var n=e.segmentIndex-t.segmentIndex+2,r=this.edge.pts[e.segmentIndex],i=e.dist>0||!e.coord.equals2D(r);i||n--;var o=new Array(n).fill(null),s=0;o[s++]=new j(t.coord);for(var a=t.segmentIndex+1;a<=e.segmentIndex;a++)o[s++]=this.edge.pts[a];return i&&(o[s]=e.coord),new or(o,new Ae(this.edge._label))}},{key:"add",value:function(t,e,n){var r=new Qn(t,e,n),i=this._nodeMap.get(r);return null!==i?i:(this._nodeMap.put(r,r),r)}},{key:"isIntersection",value:function(t){for(var e=this.iterator();e.hasNext();)if(e.next().coord.equals(t))return!0;return!1}}],[{key:"constructor_",value:function(){this._nodeMap=new Ze,this.edge=null;var t=arguments[0];this.edge=t}}]),e}(),tr=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"isIntersects",value:function(){return!this.isDisjoint()}},{key:"isCovers",value:function(){return(e.isTrue(this._matrix[Z.INTERIOR][Z.INTERIOR])||e.isTrue(this._matrix[Z.INTERIOR][Z.BOUNDARY])||e.isTrue(this._matrix[Z.BOUNDARY][Z.INTERIOR])||e.isTrue(this._matrix[Z.BOUNDARY][Z.BOUNDARY]))&&this._matrix[Z.EXTERIOR][Z.INTERIOR]===Mt.FALSE&&this._matrix[Z.EXTERIOR][Z.BOUNDARY]===Mt.FALSE}},{key:"isCoveredBy",value:function(){return(e.isTrue(this._matrix[Z.INTERIOR][Z.INTERIOR])||e.isTrue(this._matrix[Z.INTERIOR][Z.BOUNDARY])||e.isTrue(this._matrix[Z.BOUNDARY][Z.INTERIOR])||e.isTrue(this._matrix[Z.BOUNDARY][Z.BOUNDARY]))&&this._matrix[Z.INTERIOR][Z.EXTERIOR]===Mt.FALSE&&this._matrix[Z.BOUNDARY][Z.EXTERIOR]===Mt.FALSE}},{key:"set",value:function(){if(1===arguments.length)for(var t=arguments[0],e=0;e<t.length;e++){var n=Math.trunc(e/3),r=e%3;this._matrix[n][r]=Mt.toDimensionValue(t.charAt(e))}else if(3===arguments.length){var i=arguments[0],o=arguments[1],s=arguments[2];this._matrix[i][o]=s}}},{key:"isContains",value:function(){return e.isTrue(this._matrix[Z.INTERIOR][Z.INTERIOR])&&this._matrix[Z.EXTERIOR][Z.INTERIOR]===Mt.FALSE&&this._matrix[Z.EXTERIOR][Z.BOUNDARY]===Mt.FALSE}},{key:"setAtLeast",value:function(){if(1===arguments.length)for(var t=arguments[0],e=0;e<t.length;e++){var n=Math.trunc(e/3),r=e%3;this.setAtLeast(n,r,Mt.toDimensionValue(t.charAt(e)))}else if(3===arguments.length){var i=arguments[0],o=arguments[1],s=arguments[2];this._matrix[i][o]<s&&(this._matrix[i][o]=s)}}},{key:"setAtLeastIfValid",value:function(t,e,n){t>=0&&e>=0&&this.setAtLeast(t,e,n)}},{key:"isWithin",value:function(){return e.isTrue(this._matrix[Z.INTERIOR][Z.INTERIOR])&&this._matrix[Z.INTERIOR][Z.EXTERIOR]===Mt.FALSE&&this._matrix[Z.BOUNDARY][Z.EXTERIOR]===Mt.FALSE}},{key:"isTouches",value:function(t,n){return t>n?this.isTouches(n,t):(t===Mt.A&&n===Mt.A||t===Mt.L&&n===Mt.L||t===Mt.L&&n===Mt.A||t===Mt.P&&n===Mt.A||t===Mt.P&&n===Mt.L)&&this._matrix[Z.INTERIOR][Z.INTERIOR]===Mt.FALSE&&(e.isTrue(this._matrix[Z.INTERIOR][Z.BOUNDARY])||e.isTrue(this._matrix[Z.BOUNDARY][Z.INTERIOR])||e.isTrue(this._matrix[Z.BOUNDARY][Z.BOUNDARY]))}},{key:"isOverlaps",value:function(t,n){return t===Mt.P&&n===Mt.P||t===Mt.A&&n===Mt.A?e.isTrue(this._matrix[Z.INTERIOR][Z.INTERIOR])&&e.isTrue(this._matrix[Z.INTERIOR][Z.EXTERIOR])&&e.isTrue(this._matrix[Z.EXTERIOR][Z.INTERIOR]):t===Mt.L&&n===Mt.L&&1===this._matrix[Z.INTERIOR][Z.INTERIOR]&&e.isTrue(this._matrix[Z.INTERIOR][Z.EXTERIOR])&&e.isTrue(this._matrix[Z.EXTERIOR][Z.INTERIOR])}},{key:"isEquals",value:function(t,n){return t===n&&e.isTrue(this._matrix[Z.INTERIOR][Z.INTERIOR])&&this._matrix[Z.INTERIOR][Z.EXTERIOR]===Mt.FALSE&&this._matrix[Z.BOUNDARY][Z.EXTERIOR]===Mt.FALSE&&this._matrix[Z.EXTERIOR][Z.INTERIOR]===Mt.FALSE&&this._matrix[Z.EXTERIOR][Z.BOUNDARY]===Mt.FALSE}},{key:"toString",value:function(){for(var t=new Qt("123456789"),e=0;e<3;e++)for(var n=0;n<3;n++)t.setCharAt(3*e+n,Mt.toDimensionSymbol(this._matrix[e][n]));return t.toString()}},{key:"setAll",value:function(t){for(var e=0;e<3;e++)for(var n=0;n<3;n++)this._matrix[e][n]=t}},{key:"get",value:function(t,e){return this._matrix[t][e]}},{key:"transpose",value:function(){var t=this._matrix[1][0];return this._matrix[1][0]=this._matrix[0][1],this._matrix[0][1]=t,t=this._matrix[2][0],this._matrix[2][0]=this._matrix[0][2],this._matrix[0][2]=t,t=this._matrix[2][1],this._matrix[2][1]=this._matrix[1][2],this._matrix[1][2]=t,this}},{key:"matches",value:function(t){if(9!==t.length)throw new x("Should be length 9: "+t);for(var n=0;n<3;n++)for(var r=0;r<3;r++)if(!e.matches(this._matrix[n][r],t.charAt(3*n+r)))return!1;return!0}},{key:"add",value:function(t){for(var e=0;e<3;e++)for(var n=0;n<3;n++)this.setAtLeast(e,n,t.get(e,n))}},{key:"isDisjoint",value:function(){return this._matrix[Z.INTERIOR][Z.INTERIOR]===Mt.FALSE&&this._matrix[Z.INTERIOR][Z.BOUNDARY]===Mt.FALSE&&this._matrix[Z.BOUNDARY][Z.INTERIOR]===Mt.FALSE&&this._matrix[Z.BOUNDARY][Z.BOUNDARY]===Mt.FALSE}},{key:"isCrosses",value:function(t,n){return t===Mt.P&&n===Mt.L||t===Mt.P&&n===Mt.A||t===Mt.L&&n===Mt.A?e.isTrue(this._matrix[Z.INTERIOR][Z.INTERIOR])&&e.isTrue(this._matrix[Z.INTERIOR][Z.EXTERIOR]):t===Mt.L&&n===Mt.P||t===Mt.A&&n===Mt.P||t===Mt.A&&n===Mt.L?e.isTrue(this._matrix[Z.INTERIOR][Z.INTERIOR])&&e.isTrue(this._matrix[Z.EXTERIOR][Z.INTERIOR]):t===Mt.L&&n===Mt.L&&0===this._matrix[Z.INTERIOR][Z.INTERIOR]}},{key:"interfaces_",get:function(){return[w]}}],[{key:"constructor_",value:function(){if(this._matrix=null,0===arguments.length)this._matrix=Array(3).fill().map((function(){return Array(3)})),this.setAll(Mt.FALSE);else if(1===arguments.length)if("string"==typeof arguments[0]){var t=arguments[0];e.constructor_.call(this),this.set(t)}else if(arguments[0]instanceof e){var n=arguments[0];e.constructor_.call(this),this._matrix[Z.INTERIOR][Z.INTERIOR]=n._matrix[Z.INTERIOR][Z.INTERIOR],this._matrix[Z.INTERIOR][Z.BOUNDARY]=n._matrix[Z.INTERIOR][Z.BOUNDARY],this._matrix[Z.INTERIOR][Z.EXTERIOR]=n._matrix[Z.INTERIOR][Z.EXTERIOR],this._matrix[Z.BOUNDARY][Z.INTERIOR]=n._matrix[Z.BOUNDARY][Z.INTERIOR],this._matrix[Z.BOUNDARY][Z.BOUNDARY]=n._matrix[Z.BOUNDARY][Z.BOUNDARY],this._matrix[Z.BOUNDARY][Z.EXTERIOR]=n._matrix[Z.BOUNDARY][Z.EXTERIOR],this._matrix[Z.EXTERIOR][Z.INTERIOR]=n._matrix[Z.EXTERIOR][Z.INTERIOR],this._matrix[Z.EXTERIOR][Z.BOUNDARY]=n._matrix[Z.EXTERIOR][Z.BOUNDARY],this._matrix[Z.EXTERIOR][Z.EXTERIOR]=n._matrix[Z.EXTERIOR][Z.EXTERIOR]}}},{key:"matches",value:function(){if(Number.isInteger(arguments[0])&&"string"==typeof arguments[1]){var t=arguments[0],n=arguments[1];return n===Mt.SYM_DONTCARE||n===Mt.SYM_TRUE&&(t>=0||t===Mt.TRUE)||n===Mt.SYM_FALSE&&t===Mt.FALSE||n===Mt.SYM_P&&t===Mt.P||n===Mt.SYM_L&&t===Mt.L||n===Mt.SYM_A&&t===Mt.A}if("string"==typeof arguments[0]&&"string"==typeof arguments[1]){var r=arguments[1];return new e(arguments[0]).matches(r)}}},{key:"isTrue",value:function(t){return t>=0||t===Mt.TRUE}}]),e}(),er=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"size",value:function(){return this._size}},{key:"addAll",value:function(t){return null===t||0===t.length?null:(this.ensureCapacity(this._size+t.length),xt.arraycopy(t,0,this._data,this._size,t.length),void(this._size+=t.length))}},{key:"ensureCapacity",value:function(t){if(t<=this._data.length)return null;var e=Math.max(t,2*this._data.length);this._data=At.copyOf(this._data,e)}},{key:"toArray",value:function(){var t=new Array(this._size).fill(null);return xt.arraycopy(this._data,0,t,0,this._size),t}},{key:"add",value:function(t){this.ensureCapacity(this._size+1),this._data[this._size]=t,++this._size}}],[{key:"constructor_",value:function(){if(this._data=null,this._size=0,0===arguments.length)e.constructor_.call(this,10);else if(1===arguments.length){var t=arguments[0];this._data=new Array(t).fill(null)}}}]),e}(),nr=function(){function e(){t(this,e)}return n(e,[{key:"getChainStartIndices",value:function(t){var e=0,n=new er(Math.trunc(t.length/2));n.add(e);do{var r=this.findChainEnd(t,e);n.add(r),e=r}while(e<t.length-1);return n.toArray()}},{key:"findChainEnd",value:function(t,e){for(var n=We.quadrant(t[e],t[e+1]),r=e+1;r<t.length&&We.quadrant(t[r-1],t[r])===n;)r++;return r-1}},{key:"OLDgetChainStartIndices",value:function(t){var n=0,r=new pt;r.add(n);do{var i=this.findChainEnd(t,n);r.add(i),n=i}while(n<t.length-1);return e.toIntArray(r)}}],[{key:"toIntArray",value:function(t){for(var e=new Array(t.size()).fill(null),n=0;n<e.length;n++)e[n]=t.get(n).intValue();return e}}]),e}(),rr=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"getCoordinates",value:function(){return this.pts}},{key:"getMaxX",value:function(t){var e=this.pts[this.startIndex[t]].x,n=this.pts[this.startIndex[t+1]].x;return e>n?e:n}},{key:"getMinX",value:function(t){var e=this.pts[this.startIndex[t]].x,n=this.pts[this.startIndex[t+1]].x;return e<n?e:n}},{key:"computeIntersectsForChain",value:function(){if(4===arguments.length){var t=arguments[0],e=arguments[1],n=arguments[2],r=arguments[3];this.computeIntersectsForChain(this.startIndex[t],this.startIndex[t+1],e,e.startIndex[n],e.startIndex[n+1],r)}else if(6===arguments.length){var i=arguments[0],o=arguments[1],s=arguments[2],a=arguments[3],u=arguments[4],l=arguments[5];if(o-i==1&&u-a==1)return l.addIntersections(this.e,i,s.e,a),null;if(!this.overlaps(i,o,s,a,u))return null;var h=Math.trunc((i+o)/2),c=Math.trunc((a+u)/2);i<h&&(a<c&&this.computeIntersectsForChain(i,h,s,a,c,l),c<u&&this.computeIntersectsForChain(i,h,s,c,u,l)),h<o&&(a<c&&this.computeIntersectsForChain(h,o,s,a,c,l),c<u&&this.computeIntersectsForChain(h,o,s,c,u,l))}}},{key:"overlaps",value:function(t,e,n,r,i){return U.intersects(this.pts[t],this.pts[e],n.pts[r],n.pts[i])}},{key:"getStartIndexes",value:function(){return this.startIndex}},{key:"computeIntersects",value:function(t,e){for(var n=0;n<this.startIndex.length-1;n++)for(var r=0;r<t.startIndex.length-1;r++)this.computeIntersectsForChain(n,t,r,e)}}],[{key:"constructor_",value:function(){this.e=null,this.pts=null,this.startIndex=null;var t=arguments[0];this.e=t,this.pts=t.getCoordinates();var e=new nr;this.startIndex=e.getChainStartIndices(this.pts)}}]),e}(),ir=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"getDepth",value:function(t,e){return this._depth[t][e]}},{key:"setDepth",value:function(t,e,n){this._depth[t][e]=n}},{key:"isNull",value:function(){if(0===arguments.length){for(var t=0;t<2;t++)for(var n=0;n<3;n++)if(this._depth[t][n]!==e.NULL_VALUE)return!1;return!0}if(1===arguments.length){var r=arguments[0];return this._depth[r][1]===e.NULL_VALUE}if(2===arguments.length){var i=arguments[0],o=arguments[1];return this._depth[i][o]===e.NULL_VALUE}}},{key:"normalize",value:function(){for(var t=0;t<2;t++)if(!this.isNull(t)){var e=this._depth[t][1];this._depth[t][2]<e&&(e=this._depth[t][2]),e<0&&(e=0);for(var n=1;n<3;n++){var r=0;this._depth[t][n]>e&&(r=1),this._depth[t][n]=r}}}},{key:"getDelta",value:function(t){return this._depth[t][tt.RIGHT]-this._depth[t][tt.LEFT]}},{key:"getLocation",value:function(t,e){return this._depth[t][e]<=0?Z.EXTERIOR:Z.INTERIOR}},{key:"toString",value:function(){return"A: "+this._depth[0][1]+","+this._depth[0][2]+" B: "+this._depth[1][1]+","+this._depth[1][2]}},{key:"add",value:function(){if(1===arguments.length)for(var t=arguments[0],n=0;n<2;n++)for(var r=1;r<3;r++){var i=t.getLocation(n,r);i!==Z.EXTERIOR&&i!==Z.INTERIOR||(this.isNull(n,r)?this._depth[n][r]=e.depthAtLocation(i):this._depth[n][r]+=e.depthAtLocation(i))}else if(3===arguments.length){var o=arguments[0],s=arguments[1];arguments[2]===Z.INTERIOR&&this._depth[o][s]++}}}],[{key:"constructor_",value:function(){this._depth=Array(2).fill().map((function(){return Array(3)}));for(var t=0;t<2;t++)for(var n=0;n<3;n++)this._depth[t][n]=e.NULL_VALUE}},{key:"depthAtLocation",value:function(t){return t===Z.EXTERIOR?0:t===Z.INTERIOR?1:e.NULL_VALUE}}]),e}();ir.NULL_VALUE=-1;var or=function(e){r(s,e);var o=c(s);function s(){var e;return t(this,s),e=o.call(this),s.constructor_.apply(l(e),arguments),e}return n(s,[{key:"getDepth",value:function(){return this._depth}},{key:"getCollapsedEdge",value:function(){var t=new Array(2).fill(null);return t[0]=this.pts[0],t[1]=this.pts[1],new s(t,Ae.toLineLabel(this._label))}},{key:"isIsolated",value:function(){return this._isIsolated}},{key:"getCoordinates",value:function(){return this.pts}},{key:"setIsolated",value:function(t){this._isIsolated=t}},{key:"setName",value:function(t){this._name=t}},{key:"equals",value:function(t){if(!(t instanceof s))return!1;var e=t;if(this.pts.length!==e.pts.length)return!1;for(var n=!0,r=!0,i=this.pts.length,o=0;o<this.pts.length;o++)if(this.pts[o].equals2D(e.pts[o])||(n=!1),this.pts[o].equals2D(e.pts[--i])||(r=!1),!n&&!r)return!1;return!0}},{key:"getCoordinate",value:function(){if(0===arguments.length)return this.pts.length>0?this.pts[0]:null;if(1===arguments.length){var t=arguments[0];return this.pts[t]}}},{key:"print",value:function(t){t.print("edge "+this._name+": "),t.print("LINESTRING (");for(var e=0;e<this.pts.length;e++)e>0&&t.print(","),t.print(this.pts[e].x+" "+this.pts[e].y);t.print(")  "+this._label+" "+this._depthDelta)}},{key:"computeIM",value:function(t){s.updateIM(this._label,t)}},{key:"isCollapsed",value:function(){return!!this._label.isArea()&&3===this.pts.length&&!!this.pts[0].equals(this.pts[2])}},{key:"isClosed",value:function(){return this.pts[0].equals(this.pts[this.pts.length-1])}},{key:"getMaximumSegmentIndex",value:function(){return this.pts.length-1}},{key:"getDepthDelta",value:function(){return this._depthDelta}},{key:"getNumPoints",value:function(){return this.pts.length}},{key:"printReverse",value:function(t){t.print("edge "+this._name+": ");for(var e=this.pts.length-1;e>=0;e--)t.print(this.pts[e]+" ");t.println("")}},{key:"getMonotoneChainEdge",value:function(){return null===this._mce&&(this._mce=new rr(this)),this._mce}},{key:"getEnvelope",value:function(){if(null===this._env){this._env=new U;for(var t=0;t<this.pts.length;t++)this._env.expandToInclude(this.pts[t])}return this._env}},{key:"addIntersection",value:function(t,e,n,r){var i=new j(t.getIntersection(r)),o=e,s=t.getEdgeDistance(n,r),a=o+1;if(a<this.pts.length){var u=this.pts[a];i.equals2D(u)&&(o=a,s=0)}this.eiList.add(i,o,s)}},{key:"toString",value:function(){var t=new Qt;t.append("edge "+this._name+": "),t.append("LINESTRING (");for(var e=0;e<this.pts.length;e++)e>0&&t.append(","),t.append(this.pts[e].x+" "+this.pts[e].y);return t.append(")  "+this._label+" "+this._depthDelta),t.toString()}},{key:"isPointwiseEqual",value:function(t){if(this.pts.length!==t.pts.length)return!1;for(var e=0;e<this.pts.length;e++)if(!this.pts[e].equals2D(t.pts[e]))return!1;return!0}},{key:"setDepthDelta",value:function(t){this._depthDelta=t}},{key:"getEdgeIntersectionList",value:function(){return this.eiList}},{key:"addIntersections",value:function(t,e,n){for(var r=0;r<t.getIntersectionNum();r++)this.addIntersection(t,e,n,r)}}],[{key:"constructor_",value:function(){if(this.pts=null,this._env=null,this.eiList=new $n(this),this._name=null,this._mce=null,this._isIsolated=!0,this._depth=new ir,this._depthDelta=0,1===arguments.length){var t=arguments[0];s.constructor_.call(this,t,null)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];this.pts=e,this._label=n}}},{key:"updateIM",value:function(){if(!(2===arguments.length&&arguments[1]instanceof tr&&arguments[0]instanceof Ae))return f(i(s),"updateIM",this).apply(this,arguments);var t=arguments[0],e=arguments[1];e.setAtLeastIfValid(t.getLocation(0,tt.ON),t.getLocation(1,tt.ON),1),t.isArea()&&(e.setAtLeastIfValid(t.getLocation(0,tt.LEFT),t.getLocation(1,tt.LEFT),2),e.setAtLeastIfValid(t.getLocation(0,tt.RIGHT),t.getLocation(1,tt.RIGHT),2))}}]),s}(Ge),sr=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"setWorkingPrecisionModel",value:function(t){this._workingPrecisionModel=t}},{key:"insertUniqueEdge",value:function(t){var n=this._edgeList.findEqualEdge(t);if(null!==n){var r=n.getLabel(),i=t.getLabel();n.isPointwiseEqual(t)||(i=new Ae(t.getLabel())).flip(),r.merge(i);var o=e.depthDelta(i),s=n.getDepthDelta()+o;n.setDepthDelta(s)}else this._edgeList.add(t),t.setDepthDelta(e.depthDelta(t.getLabel()))}},{key:"buildSubgraphs",value:function(t,e){for(var n=new pt,r=t.iterator();r.hasNext();){var i=r.next(),o=i.getRightmostCoordinate(),s=new Dn(n).getDepth(o);i.computeDepth(s),i.findResultEdges(),n.add(i),e.add(i.getDirectedEdges(),i.getNodes())}}},{key:"createSubgraphs",value:function(t){for(var e=new pt,n=t.getNodes().iterator();n.hasNext();){var r=n.next();if(!r.isVisited()){var i=new mt;i.create(r),e.add(i)}}return an.sort(e,an.reverseOrder()),e}},{key:"createEmptyResultGeometry",value:function(){return this._geomFact.createPolygon()}},{key:"getNoder",value:function(t){if(null!==this._workingNoder)return this._workingNoder;var e=new Ln,n=new Ce;return n.setPrecisionModel(t),e.setSegmentIntersector(new Kn(n)),e}},{key:"buffer",value:function(t,e){var n=this._workingPrecisionModel;null===n&&(n=t.getPrecisionModel()),this._geomFact=t.getFactory();var r=new An(n,this._bufParams),i=new Bn(t,e,r).getCurves();if(i.size()<=0)return this.createEmptyResultGeometry();this.computeNodedEdges(i,n),this._graph=new $e(new Zn),this._graph.addEdges(this._edgeList.getEdges());var o=this.createSubgraphs(this._graph),s=new tn(this._geomFact);this.buildSubgraphs(o,s);var a=s.getPolygons();return a.size()<=0?this.createEmptyResultGeometry():this._geomFact.buildGeometry(a)}},{key:"computeNodedEdges",value:function(t,e){var n=this.getNoder(e);n.computeNodes(t);for(var r=n.getNodedSubstrings().iterator();r.hasNext();){var i=r.next(),o=i.getCoordinates();if(2!==o.length||!o[0].equals2D(o[1])){var s=i.getData(),a=new or(i.getCoordinates(),new Ae(s));this.insertUniqueEdge(a)}}}},{key:"setNoder",value:function(t){this._workingNoder=t}}],[{key:"constructor_",value:function(){this._bufParams=null,this._workingPrecisionModel=null,this._workingNoder=null,this._geomFact=null,this._graph=null,this._edgeList=new Wn;var t=arguments[0];this._bufParams=t}},{key:"depthDelta",value:function(t){var e=t.getLocation(0,tt.LEFT),n=t.getLocation(0,tt.RIGHT);return e===Z.INTERIOR&&n===Z.EXTERIOR?1:e===Z.EXTERIOR&&n===Z.INTERIOR?-1:0}},{key:"convertSegStrings",value:function(t){for(var e=new ae,n=new pt;t.hasNext();){var r=t.next(),i=e.createLineString(r.getCoordinates());n.add(i)}return e.buildGeometry(n)}}]),e}(),ar=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"rescale",value:function(){if(ot(arguments[0],H))for(var t=arguments[0].iterator();t.hasNext();){var e=t.next();this.rescale(e.getCoordinates())}else if(arguments[0]instanceof Array){for(var n=arguments[0],r=0;r<n.length;r++)n[r].x=n[r].x/this._scaleFactor+this._offsetX,n[r].y=n[r].y/this._scaleFactor+this._offsetY;2===n.length&&n[0].equals2D(n[1])&&xt.out.println(n)}}},{key:"scale",value:function(){if(ot(arguments[0],H)){for(var t=arguments[0],e=new pt(t.size()),n=t.iterator();n.hasNext();){var r=n.next();e.add(new kn(this.scale(r.getCoordinates()),r.getData()))}return e}if(arguments[0]instanceof Array){for(var i=arguments[0],o=new Array(i.length).fill(null),s=0;s<i.length;s++)o[s]=new j(Math.round((i[s].x-this._offsetX)*this._scaleFactor),Math.round((i[s].y-this._offsetY)*this._scaleFactor),i[s].getZ());return Wt.removeRepeatedPoints(o)}}},{key:"isIntegerPrecision",value:function(){return 1===this._scaleFactor}},{key:"getNodedSubstrings",value:function(){var t=this._noder.getNodedSubstrings();return this._isScaled&&this.rescale(t),t}},{key:"computeNodes",value:function(t){var e=t;this._isScaled&&(e=this.scale(t)),this._noder.computeNodes(e)}},{key:"interfaces_",get:function(){return[Sn]}}],[{key:"constructor_",value:function(){if(this._noder=null,this._scaleFactor=null,this._offsetX=null,this._offsetY=null,this._isScaled=!1,2===arguments.length){var t=arguments[0],n=arguments[1];e.constructor_.call(this,t,n,0,0)}else if(4===arguments.length){var r=arguments[0],i=arguments[1];this._noder=r,this._scaleFactor=i,this._isScaled=!this.isIntegerPrecision()}}}]),e}(),ur=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"checkEndPtVertexIntersections",value:function(){if(0===arguments.length)for(var t=this._segStrings.iterator();t.hasNext();){var e=t.next().getCoordinates();this.checkEndPtVertexIntersections(e[0],this._segStrings),this.checkEndPtVertexIntersections(e[e.length-1],this._segStrings)}else if(2===arguments.length)for(var n=arguments[0],r=arguments[1].iterator();r.hasNext();)for(var i=r.next().getCoordinates(),o=1;o<i.length-1;o++)if(i[o].equals(n))throw new F("found endpt/interior pt intersection at index "+o+" :pt "+n)}},{key:"checkInteriorIntersections",value:function(){if(0===arguments.length)for(var t=this._segStrings.iterator();t.hasNext();)for(var e=t.next(),n=this._segStrings.iterator();n.hasNext();){var r=n.next();this.checkInteriorIntersections(e,r)}else if(2===arguments.length)for(var i=arguments[0],o=arguments[1],s=i.getCoordinates(),a=o.getCoordinates(),u=0;u<s.length-1;u++)for(var l=0;l<a.length-1;l++)this.checkInteriorIntersections(i,u,o,l);else if(4===arguments.length){var h=arguments[0],c=arguments[1],f=arguments[2],v=arguments[3];if(h===f&&c===v)return null;var g=h.getCoordinates()[c],d=h.getCoordinates()[c+1],p=f.getCoordinates()[v],y=f.getCoordinates()[v+1];if(this._li.computeIntersection(g,d,p,y),this._li.hasIntersection()&&(this._li.isProper()||this.hasInteriorIntersection(this._li,g,d)||this.hasInteriorIntersection(this._li,p,y)))throw new F("found non-noded intersection at "+g+"-"+d+" and "+p+"-"+y)}}},{key:"checkValid",value:function(){this.checkEndPtVertexIntersections(),this.checkInteriorIntersections(),this.checkCollapses()}},{key:"checkCollapses",value:function(){if(0===arguments.length)for(var t=this._segStrings.iterator();t.hasNext();){var e=t.next();this.checkCollapses(e)}else if(1===arguments.length)for(var n=arguments[0].getCoordinates(),r=0;r<n.length-2;r++)this.checkCollapse(n[r],n[r+1],n[r+2])}},{key:"hasInteriorIntersection",value:function(t,e,n){for(var r=0;r<t.getIntersectionNum();r++){var i=t.getIntersection(r);if(!i.equals(e)&&!i.equals(n))return!0}return!1}},{key:"checkCollapse",value:function(t,n,r){if(t.equals(r))throw new F("found non-noded collapse at "+e.fact.createLineString([t,n,r]))}}],[{key:"constructor_",value:function(){this._li=new Ce,this._segStrings=null;var t=arguments[0];this._segStrings=t}}]),e}();ur.fact=new ae;var lr=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"intersectsScaled",value:function(t,e){var n=Math.min(t.x,e.x),r=Math.max(t.x,e.x),i=Math.min(t.y,e.y),o=Math.max(t.y,e.y),s=this._maxx<n||this._minx>r||this._maxy<i||this._miny>o;if(s)return!1;var a=this.intersectsToleranceSquare(t,e);return G.isTrue(!(s&&a),"Found bad envelope test"),a}},{key:"initCorners",value:function(t){var e=.5;this._minx=t.x-e,this._maxx=t.x+e,this._miny=t.y-e,this._maxy=t.y+e,this._corner[0]=new j(this._maxx,this._maxy),this._corner[1]=new j(this._minx,this._maxy),this._corner[2]=new j(this._minx,this._miny),this._corner[3]=new j(this._maxx,this._miny)}},{key:"intersects",value:function(t,e){return 1===this._scaleFactor?this.intersectsScaled(t,e):(this.copyScaled(t,this._p0Scaled),this.copyScaled(e,this._p1Scaled),this.intersectsScaled(this._p0Scaled,this._p1Scaled))}},{key:"scale",value:function(t){return Math.round(t*this._scaleFactor)}},{key:"getCoordinate",value:function(){return this._originalPt}},{key:"copyScaled",value:function(t,e){e.x=this.scale(t.x),e.y=this.scale(t.y)}},{key:"getSafeEnvelope",value:function(){if(null===this._safeEnv){var t=e.SAFE_ENV_EXPANSION_FACTOR/this._scaleFactor;this._safeEnv=new U(this._originalPt.x-t,this._originalPt.x+t,this._originalPt.y-t,this._originalPt.y+t)}return this._safeEnv}},{key:"intersectsPixelClosure",value:function(t,e){return this._li.computeIntersection(t,e,this._corner[0],this._corner[1]),!!(this._li.hasIntersection()||(this._li.computeIntersection(t,e,this._corner[1],this._corner[2]),this._li.hasIntersection()||(this._li.computeIntersection(t,e,this._corner[2],this._corner[3]),this._li.hasIntersection()||(this._li.computeIntersection(t,e,this._corner[3],this._corner[0]),this._li.hasIntersection()))))}},{key:"intersectsToleranceSquare",value:function(t,e){var n=!1,r=!1;return this._li.computeIntersection(t,e,this._corner[0],this._corner[1]),!!(this._li.isProper()||(this._li.computeIntersection(t,e,this._corner[1],this._corner[2]),this._li.isProper()||(this._li.hasIntersection()&&(n=!0),this._li.computeIntersection(t,e,this._corner[2],this._corner[3]),this._li.isProper()||(this._li.hasIntersection()&&(r=!0),this._li.computeIntersection(t,e,this._corner[3],this._corner[0]),this._li.isProper()||n&&r||t.equals(this._pt)||e.equals(this._pt)))))}},{key:"addSnappedNode",value:function(t,e){var n=t.getCoordinate(e),r=t.getCoordinate(e+1);return!!this.intersects(n,r)&&(t.addIntersection(this.getCoordinate(),e),!0)}}],[{key:"constructor_",value:function(){this._li=null,this._pt=null,this._originalPt=null,this._ptScaled=null,this._p0Scaled=null,this._p1Scaled=null,this._scaleFactor=null,this._minx=null,this._maxx=null,this._miny=null,this._maxy=null,this._corner=new Array(4).fill(null),this._safeEnv=null;var t=arguments[0],e=arguments[1],n=arguments[2];if(this._originalPt=t,this._pt=t,this._scaleFactor=e,this._li=n,e<=0)throw new x("Scale factor must be non-zero");1!==e&&(this._pt=new j(this.scale(t.x),this.scale(t.y)),this._p0Scaled=new j,this._p1Scaled=new j),this.initCorners(this._pt)}}]),e}();lr.SAFE_ENV_EXPANSION_FACTOR=.75;var hr=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"select",value:function(){if(1===arguments.length);else if(2===arguments.length){var t=arguments[1];arguments[0].getLineSegment(t,this.selectedSegment),this.select(this.selectedSegment)}}}],[{key:"constructor_",value:function(){this.selectedSegment=new wn}}]),e}(),cr=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"snap",value:function(){if(1===arguments.length){var e=arguments[0];return this.snap(e,null,-1)}if(3===arguments.length){var r=arguments[0],i=arguments[1],o=arguments[2],s=r.getSafeEnvelope(),a=new fr(r,i,o);return this._index.query(s,new(function(){function e(){t(this,e)}return n(e,[{key:"interfaces_",get:function(){return[hn]}},{key:"visitItem",value:function(t){t.select(s,a)}}]),e}())),a.isNodeAdded()}}}],[{key:"constructor_",value:function(){this._index=null;var t=arguments[0];this._index=t}}]),e}(),fr=function(e){r(s,e);var o=c(s);function s(){var e;return t(this,s),e=o.call(this),s.constructor_.apply(l(e),arguments),e}return n(s,[{key:"isNodeAdded",value:function(){return this._isNodeAdded}},{key:"select",value:function(){if(!(2===arguments.length&&Number.isInteger(arguments[1])&&arguments[0]instanceof In))return f(i(s.prototype),"select",this).apply(this,arguments);var t=arguments[1],e=arguments[0].getContext();if(this._parentEdge===e&&(t===this._hotPixelVertexIndex||t+1===this._hotPixelVertexIndex))return null;this._isNodeAdded|=this._hotPixel.addSnappedNode(e,t)}}],[{key:"constructor_",value:function(){this._hotPixel=null,this._parentEdge=null,this._hotPixelVertexIndex=null,this._isNodeAdded=!1;var t=arguments[0],e=arguments[1],n=arguments[2];this._hotPixel=t,this._parentEdge=e,this._hotPixelVertexIndex=n}}]),s}(hr);cr.HotPixelSnapAction=fr;var vr=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"processIntersections",value:function(t,e,n,r){if(t===n&&e===r)return null;var i=t.getCoordinates()[e],o=t.getCoordinates()[e+1],s=n.getCoordinates()[r],a=n.getCoordinates()[r+1];if(this._li.computeIntersection(i,o,s,a),this._li.hasIntersection()&&this._li.isInteriorIntersection()){for(var u=0;u<this._li.getIntersectionNum();u++)this._interiorIntersections.add(this._li.getIntersection(u));t.addIntersections(this._li,e,0),n.addIntersections(this._li,r,1)}}},{key:"isDone",value:function(){return!1}},{key:"getInteriorIntersections",value:function(){return this._interiorIntersections}},{key:"interfaces_",get:function(){return[Jn]}}],[{key:"constructor_",value:function(){this._li=null,this._interiorIntersections=null;var t=arguments[0];this._li=t,this._interiorIntersections=new pt}}]),e}(),gr=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"checkCorrectness",value:function(t){var e=kn.getNodedSubstrings(t),n=new ur(e);try{n.checkValid()}catch(t){if(!(t instanceof _))throw t;t.printStackTrace()}}},{key:"getNodedSubstrings",value:function(){return kn.getNodedSubstrings(this._nodedSegStrings)}},{key:"snapRound",value:function(t,e){var n=this.findInteriorIntersections(t,e);this.computeIntersectionSnaps(n),this.computeVertexSnaps(t)}},{key:"findInteriorIntersections",value:function(t,e){var n=new vr(e);return this._noder.setSegmentIntersector(n),this._noder.computeNodes(t),n.getInteriorIntersections()}},{key:"computeVertexSnaps",value:function(){if(ot(arguments[0],H))for(var t=arguments[0].iterator();t.hasNext();){var e=t.next();this.computeVertexSnaps(e)}else if(arguments[0]instanceof kn)for(var n=arguments[0],r=n.getCoordinates(),i=0;i<r.length;i++){var o=new lr(r[i],this._scaleFactor,this._li);this._pointSnapper.snap(o,n,i)&&n.addIntersection(r[i],i)}}},{key:"computeNodes",value:function(t){this._nodedSegStrings=t,this._noder=new Ln,this._pointSnapper=new cr(this._noder.getIndex()),this.snapRound(t,this._li)}},{key:"computeIntersectionSnaps",value:function(t){for(var e=t.iterator();e.hasNext();){var n=e.next(),r=new lr(n,this._scaleFactor,this._li);this._pointSnapper.snap(r)}}},{key:"interfaces_",get:function(){return[Sn]}}],[{key:"constructor_",value:function(){this._pm=null,this._li=null,this._scaleFactor=null,this._noder=null,this._pointSnapper=null,this._nodedSegStrings=null;var t=arguments[0];this._pm=t,this._li=new Ce,this._li.setPrecisionModel(t),this._scaleFactor=t.getScale()}}]),e}(),dr=function(){function e(){t(this,e),e.constructor_.apply(this,arguments)}return n(e,[{key:"bufferFixedPrecision",value:function(t){var e=new ar(new gr(new ie(1)),t.getScale()),n=new sr(this._bufParams);n.setWorkingPrecisionModel(t),n.setNoder(e),this._resultGeometry=n.buffer(this._argGeom,this._distance)}},{key:"bufferReducedPrecision",value:function(){if(0===arguments.length){for(var t=e.MAX_PRECISION_DIGITS;t>=0;t--){try{this.bufferReducedPrecision(t)}catch(t){if(!(t instanceof gt))throw t;this._saveException=t}if(null!==this._resultGeometry)return null}throw this._saveException}if(1===arguments.length){var n=arguments[0],r=e.precisionScaleFactor(this._argGeom,this._distance,n),i=new ie(r);this.bufferFixedPrecision(i)}}},{key:"computeGeometry",value:function(){if(this.bufferOriginalPrecision(),null!==this._resultGeometry)return null;var t=this._argGeom.getFactory().getPrecisionModel();t.getType()===ie.FIXED?this.bufferFixedPrecision(t):this.bufferReducedPrecision()}},{key:"setQuadrantSegments",value:function(t){this._bufParams.setQuadrantSegments(t)}},{key:"bufferOriginalPrecision",value:function(){try{var t=new sr(this._bufParams);this._resultGeometry=t.buffer(this._argGeom,this._distance)}catch(t){if(!(t instanceof F))throw t;this._saveException=t}}},{key:"getResultGeometry",value:function(t){return this._distance=t,this.computeGeometry(),this._resultGeometry}},{key:"setEndCapStyle",value:function(t){this._bufParams.setEndCapStyle(t)}}],[{key:"constructor_",value:function(){if(this._argGeom=null,this._distance=null,this._bufParams=new y,this._resultGeometry=null,this._saveException=null,1===arguments.length){var t=arguments[0];this._argGeom=t}else if(2===arguments.length){var e=arguments[0],n=arguments[1];this._argGeom=e,this._bufParams=n}}},{key:"bufferOp",value:function(){if(2===arguments.length){var t=arguments[1];return new e(arguments[0]).getResultGeometry(t)}if(3===arguments.length){if(Number.isInteger(arguments[2])&&arguments[0]instanceof V&&"number"==typeof arguments[1]){var n=arguments[1],r=arguments[2],i=new e(arguments[0]);return i.setQuadrantSegments(r),i.getResultGeometry(n)}if(arguments[2]instanceof y&&arguments[0]instanceof V&&"number"==typeof arguments[1]){var o=arguments[1];return new e(arguments[0],arguments[2]).getResultGeometry(o)}}else if(4===arguments.length){var s=arguments[1],a=arguments[2],u=arguments[3],l=new e(arguments[0]);return l.setQuadrantSegments(a),l.setEndCapStyle(u),l.getResultGeometry(s)}}},{key:"precisionScaleFactor",value:function(t,e,n){var r=t.getEnvelopeInternal(),i=Et.max(Math.abs(r.getMaxX()),Math.abs(r.getMaxY()),Math.abs(r.getMinX()),Math.abs(r.getMinY()))+2*(e>0?e:0),o=n-Math.trunc(Math.log(i)/Math.log(10)+1);return Math.pow(10,o)}}]),e}();dr.CAP_ROUND=y.CAP_ROUND,dr.CAP_BUTT=y.CAP_FLAT,dr.CAP_FLAT=y.CAP_FLAT,dr.CAP_SQUARE=y.CAP_SQUARE,dr.MAX_PRECISION_DIGITS=12;var pr=["Point","MultiPoint","LineString","MultiLineString","Polygon","MultiPolygon"],yr=function(){function e(n){t(this,e),this.geometryFactory=n||new ae}return n(e,[{key:"read",value:function(t){var e,n=(e="string"==typeof t?JSON.parse(t):t).type;if(!mr[n])throw new Error("Unknown GeoJSON type: "+e.type);return-1!==pr.indexOf(n)?mr[n].call(this,e.coordinates):"GeometryCollection"===n?mr[n].call(this,e.geometries):mr[n].call(this,e)}},{key:"write",value:function(t){var e=t.getGeometryType();if(!_r[e])throw new Error("Geometry is not supported");return _r[e].call(this,t)}}]),e}(),mr={Feature:function(t){var e={};for(var n in t)e[n]=t[n];if(t.geometry){var r=t.geometry.type;if(!mr[r])throw new Error("Unknown GeoJSON type: "+t.type);e.geometry=this.read(t.geometry)}return t.bbox&&(e.bbox=mr.bbox.call(this,t.bbox)),e},FeatureCollection:function(t){var e={};if(t.features){e.features=[];for(var n=0;n<t.features.length;++n)e.features.push(this.read(t.features[n]))}return t.bbox&&(e.bbox=this.parse.bbox.call(this,t.bbox)),e},coordinates:function(t){for(var e=[],n=0;n<t.length;++n){var r=t[n];e.push(a(j,v(r)))}return e},bbox:function(t){return this.geometryFactory.createLinearRing([new j(t[0],t[1]),new j(t[2],t[1]),new j(t[2],t[3]),new j(t[0],t[3]),new j(t[0],t[1])])},Point:function(t){var e=a(j,v(t));return this.geometryFactory.createPoint(e)},MultiPoint:function(t){for(var e=[],n=0;n<t.length;++n)e.push(mr.Point.call(this,t[n]));return this.geometryFactory.createMultiPoint(e)},LineString:function(t){var e=mr.coordinates.call(this,t);return this.geometryFactory.createLineString(e)},MultiLineString:function(t){for(var e=[],n=0;n<t.length;++n)e.push(mr.LineString.call(this,t[n]));return this.geometryFactory.createMultiLineString(e)},Polygon:function(t){for(var e=mr.coordinates.call(this,t[0]),n=this.geometryFactory.createLinearRing(e),r=[],i=1;i<t.length;++i){var o=t[i],s=mr.coordinates.call(this,o),a=this.geometryFactory.createLinearRing(s);r.push(a)}return this.geometryFactory.createPolygon(n,r)},MultiPolygon:function(t){for(var e=[],n=0;n<t.length;++n){var r=t[n];e.push(mr.Polygon.call(this,r))}return this.geometryFactory.createMultiPolygon(e)},GeometryCollection:function(t){for(var e=[],n=0;n<t.length;++n){var r=t[n];e.push(this.read(r))}return this.geometryFactory.createGeometryCollection(e)}},_r={coordinate:function(t){var e=[t.x,t.y];return t.z&&e.push(t.z),t.m&&e.push(t.m),e},Point:function(t){return{type:"Point",coordinates:_r.coordinate.call(this,t.getCoordinate())}},MultiPoint:function(t){for(var e=[],n=0;n<t._geometries.length;++n){var r=t._geometries[n],i=_r.Point.call(this,r);e.push(i.coordinates)}return{type:"MultiPoint",coordinates:e}},LineString:function(t){for(var e=[],n=t.getCoordinates(),r=0;r<n.length;++r){var i=n[r];e.push(_r.coordinate.call(this,i))}return{type:"LineString",coordinates:e}},MultiLineString:function(t){for(var e=[],n=0;n<t._geometries.length;++n){var r=t._geometries[n],i=_r.LineString.call(this,r);e.push(i.coordinates)}return{type:"MultiLineString",coordinates:e}},Polygon:function(t){var e=[],n=_r.LineString.call(this,t._shell);e.push(n.coordinates);for(var r=0;r<t._holes.length;++r){var i=t._holes[r],o=_r.LineString.call(this,i);e.push(o.coordinates)}return{type:"Polygon",coordinates:e}},MultiPolygon:function(t){for(var e=[],n=0;n<t._geometries.length;++n){var r=t._geometries[n],i=_r.Polygon.call(this,r);e.push(i.coordinates)}return{type:"MultiPolygon",coordinates:e}},GeometryCollection:function(t){for(var e=[],n=0;n<t._geometries.length;++n){var r=t._geometries[n],i=r.getGeometryType();e.push(_r[i].call(this,r))}return{type:"GeometryCollection",geometries:e}}};return{BufferOp:dr,GeoJSONReader:function(){function e(n){t(this,e),this.parser=new yr(n||new ae)}return n(e,[{key:"read",value:function(t){return this.parser.read(t)}}]),e}(),GeoJSONWriter:function(){function e(){t(this,e),this.parser=new yr(this.geometryFactory)}return n(e,[{key:"write",value:function(t){return this.parser.write(t)}}]),e}()}}()}(Vn)),Vn.exports),Hn=Sn(Zn);function Wn(){return new Jn}function Jn(){this.reset()}Jn.prototype={constructor:Jn,reset:function(){this.s=this.t=0},add:function(t){Qn(Kn,t,this.t),Qn(this,Kn.s,this.s),this.s?this.t+=Kn.t:this.s=Kn.t},valueOf:function(){return this.s}};var Kn=new Jn;function Qn(t,e,n){var r=t.s=e+n,i=r-e,o=r-i;t.t=e-o+(n-i)}var $n=1e-6,tr=Math.PI,er=tr/2,nr=tr/4,rr=2*tr,ir=180/tr,or=tr/180,sr=Math.abs,ar=Math.atan,ur=Math.atan2,lr=Math.cos,hr=Math.sin,cr=Math.sqrt;function fr(t){return t>1?0:t<-1?tr:Math.acos(t)}function vr(t){return t>1?er:t<-1?-er:Math.asin(t)}function gr(){}function dr(t,e){t&&yr.hasOwnProperty(t.type)&&yr[t.type](t,e)}var pr={Feature:function(t,e){dr(t.geometry,e)},FeatureCollection:function(t,e){for(var n=t.features,r=-1,i=n.length;++r<i;)dr(n[r].geometry,e)}},yr={Sphere:function(t,e){e.sphere()},Point:function(t,e){t=t.coordinates,e.point(t[0],t[1],t[2])},MultiPoint:function(t,e){for(var n=t.coordinates,r=-1,i=n.length;++r<i;)t=n[r],e.point(t[0],t[1],t[2])},LineString:function(t,e){mr(t.coordinates,e,0)},MultiLineString:function(t,e){for(var n=t.coordinates,r=-1,i=n.length;++r<i;)mr(n[r],e,0)},Polygon:function(t,e){_r(t.coordinates,e)},MultiPolygon:function(t,e){for(var n=t.coordinates,r=-1,i=n.length;++r<i;)_r(n[r],e)},GeometryCollection:function(t,e){for(var n=t.geometries,r=-1,i=n.length;++r<i;)dr(n[r],e)}};function mr(t,e,n){var r,i=-1,o=t.length-n;for(e.lineStart();++i<o;)r=t[i],e.point(r[0],r[1],r[2]);e.lineEnd()}function _r(t,e){var n=-1,r=t.length;for(e.polygonStart();++n<r;)mr(t[n],e,1);e.polygonEnd()}function xr(t){return[ur(t[1],t[0]),vr(t[2])]}function Er(t){var e=t[0],n=t[1],r=lr(n);return[r*lr(e),r*hr(e),hr(n)]}function kr(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2]}function wr(t,e){return[t[1]*e[2]-t[2]*e[1],t[2]*e[0]-t[0]*e[2],t[0]*e[1]-t[1]*e[0]]}function br(t,e){t[0]+=e[0],t[1]+=e[1],t[2]+=e[2]}function Ir(t,e){return[t[0]*e,t[1]*e,t[2]*e]}function Nr(t){var e=cr(t[0]*t[0]+t[1]*t[1]+t[2]*t[2]);t[0]/=e,t[1]/=e,t[2]/=e}function Sr(t,e){function n(n,r){return n=t(n,r),e(n[0],n[1])}return t.invert&&e.invert&&(n.invert=function(n,r){return(n=e.invert(n,r))&&t.invert(n[0],n[1])}),n}function Mr(t,e){return[t>tr?t-rr:t<-tr?t+rr:t,e]}function Lr(t){return function(e,n){return[(e+=t)>tr?e-rr:e<-tr?e+rr:e,n]}}function Pr(t){var e=Lr(t);return e.invert=Lr(-t),e}function Cr(t,e){var n=lr(t),r=hr(t),i=lr(e),o=hr(e);function s(t,e){var s=lr(e),a=lr(t)*s,u=hr(t)*s,l=hr(e),h=l*n+a*r;return[ur(u*i-h*o,a*n-l*r),vr(h*i+u*o)]}return s.invert=function(t,e){var s=lr(e),a=lr(t)*s,u=hr(t)*s,l=hr(e),h=l*i-u*o;return[ur(u*i+l*o,a*n+h*r),vr(h*n-a*r)]},s}function Tr(t,e){(e=Er(e))[0]-=t,Nr(e);var n=fr(-e[1]);return((-e[2]<0?-n:n)+rr-$n)%rr}function Or(){var t,e=[];return{point:function(e,n){t.push([e,n])},lineStart:function(){e.push(t=[])},lineEnd:gr,rejoin:function(){e.length>1&&e.push(e.pop().concat(e.shift()))},result:function(){var n=e;return e=[],t=null,n}}}function Rr(t,e){return sr(t[0]-e[0])<$n&&sr(t[1]-e[1])<$n}function Ar(t,e,n,r){this.x=t,this.z=e,this.o=n,this.e=r,this.v=!1,this.n=this.p=null}function Dr(t,e,n,r,i){var o,s,a=[],u=[];if(t.forEach((function(t){if(!((e=t.length-1)<=0)){var e,n,r=t[0],s=t[e];if(Rr(r,s)){for(i.lineStart(),o=0;o<e;++o)i.point((r=t[o])[0],r[1]);i.lineEnd()}else a.push(n=new Ar(r,t,null,!0)),u.push(n.o=new Ar(r,null,n,!1)),a.push(n=new Ar(s,t,null,!1)),u.push(n.o=new Ar(s,null,n,!0))}})),a.length){for(u.sort(e),Fr(a),Fr(u),o=0,s=u.length;o<s;++o)u[o].e=n=!n;for(var l,h,c=a[0];;){for(var f=c,v=!0;f.v;)if((f=f.n)===c)return;l=f.z,i.lineStart();do{if(f.v=f.o.v=!0,f.e){if(v)for(o=0,s=l.length;o<s;++o)i.point((h=l[o])[0],h[1]);else r(f.x,f.n.x,1,i);f=f.n}else{if(v)for(l=f.p.z,o=l.length-1;o>=0;--o)i.point((h=l[o])[0],h[1]);else r(f.x,f.p.x,-1,i);f=f.p}l=(f=f.o).z,v=!v}while(!f.v);i.lineEnd()}}}function Fr(t){if(e=t.length){for(var e,n,r=0,i=t[0];++r<e;)i.n=n=t[r],n.p=i,i=n;i.n=n=t[0],n.p=i}}function qr(t,e){return t<e?-1:t>e?1:t>=e?0:NaN}function Gr(t){for(var e,n,r,i=t.length,o=-1,s=0;++o<i;)s+=t[o].length;for(n=new Array(s);--i>=0;)for(e=(r=t[i]).length;--e>=0;)n[--s]=r[e];return n}Wn(),Wn(),Wn(),Mr.invert=Mr,function(t){var e;1===t.length&&(e=t,t=function(t,n){return qr(e(t),n)})}(qr);var Yr=1e9,Br=-1e9;function zr(t,e,n,r){function i(i,o){return t<=i&&i<=n&&e<=o&&o<=r}function o(i,o,a,l){var h=0,c=0;if(null==i||(h=s(i,a))!==(c=s(o,a))||u(i,o)<0^a>0)do{l.point(0===h||3===h?t:n,h>1?r:e)}while((h=(h+a+4)%4)!==c);else l.point(o[0],o[1])}function s(r,i){return sr(r[0]-t)<$n?i>0?0:3:sr(r[0]-n)<$n?i>0?2:1:sr(r[1]-e)<$n?i>0?1:0:i>0?3:2}function a(t,e){return u(t.x,e.x)}function u(t,e){var n=s(t,1),r=s(e,1);return n!==r?n-r:0===n?e[1]-t[1]:1===n?t[0]-e[0]:2===n?t[1]-e[1]:e[0]-t[0]}return function(s){var u,l,h,c,f,v,g,d,p,y,m,_=s,x=Or(),E={point:k,lineStart:function(){E.point=w,l&&l.push(h=[]);y=!0,p=!1,g=d=NaN},lineEnd:function(){u&&(w(c,f),v&&p&&x.rejoin(),u.push(x.result()));E.point=k,p&&_.lineEnd()},polygonStart:function(){_=x,u=[],l=[],m=!0},polygonEnd:function(){var e=function(){for(var e=0,n=0,i=l.length;n<i;++n)for(var o,s,a=l[n],u=1,h=a.length,c=a[0],f=c[0],v=c[1];u<h;++u)o=f,s=v,f=(c=a[u])[0],v=c[1],s<=r?v>r&&(f-o)*(r-s)>(v-s)*(t-o)&&++e:v<=r&&(f-o)*(r-s)<(v-s)*(t-o)&&--e;return e}(),n=m&&e,i=(u=Gr(u)).length;(n||i)&&(s.polygonStart(),n&&(s.lineStart(),o(null,null,1,s),s.lineEnd()),i&&Dr(u,a,e,o,s),s.polygonEnd());_=s,u=l=h=null}};function k(t,e){i(t,e)&&_.point(t,e)}function w(o,s){var a=i(o,s);if(l&&h.push([o,s]),y)c=o,f=s,v=a,y=!1,a&&(_.lineStart(),_.point(o,s));else if(a&&p)_.point(o,s);else{var u=[g=Math.max(Br,Math.min(Yr,g)),d=Math.max(Br,Math.min(Yr,d))],x=[o=Math.max(Br,Math.min(Yr,o)),s=Math.max(Br,Math.min(Yr,s))];!function(t,e,n,r,i,o){var s,a=t[0],u=t[1],l=0,h=1,c=e[0]-a,f=e[1]-u;if(s=n-a,c||!(s>0)){if(s/=c,c<0){if(s<l)return;s<h&&(h=s)}else if(c>0){if(s>h)return;s>l&&(l=s)}if(s=i-a,c||!(s<0)){if(s/=c,c<0){if(s>h)return;s>l&&(l=s)}else if(c>0){if(s<l)return;s<h&&(h=s)}if(s=r-u,f||!(s>0)){if(s/=f,f<0){if(s<l)return;s<h&&(h=s)}else if(f>0){if(s>h)return;s>l&&(l=s)}if(s=o-u,f||!(s<0)){if(s/=f,f<0){if(s>h)return;s>l&&(l=s)}else if(f>0){if(s<l)return;s<h&&(h=s)}return l>0&&(t[0]=a+l*c,t[1]=u+l*f),h<1&&(e[0]=a+h*c,e[1]=u+h*f),!0}}}}}(u,x,t,e,n,r)?a&&(_.lineStart(),_.point(o,s),m=!1):(p||(_.lineStart(),_.point(u[0],u[1])),_.point(x[0],x[1]),a||_.lineEnd(),m=!1)}g=o,d=s,p=a}return E}}var jr=Wn();function Xr(t){return t}Wn(),Wn(),Wn();var Ur=1/0,Vr=Ur,Zr=-Ur,Hr=Zr,Wr={point:function(t,e){t<Ur&&(Ur=t);t>Zr&&(Zr=t);e<Vr&&(Vr=e);e>Hr&&(Hr=e)},lineStart:gr,lineEnd:gr,polygonStart:gr,polygonEnd:gr,result:function(){var t=[[Ur,Vr],[Zr,Hr]];return Zr=Hr=-(Vr=Ur=1/0),t}};function Jr(t,e,n,r){return function(i,o){var s,a,u,l=e(o),h=i.invert(r[0],r[1]),c=Or(),f=e(c),v=!1,g={point:d,lineStart:y,lineEnd:m,polygonStart:function(){g.point=_,g.lineStart=x,g.lineEnd=E,a=[],s=[]},polygonEnd:function(){g.point=d,g.lineStart=y,g.lineEnd=m,a=Gr(a);var t=function(t,e){var n=e[0],r=e[1],i=[hr(n),-lr(n),0],o=0,s=0;jr.reset();for(var a=0,u=t.length;a<u;++a)if(h=(l=t[a]).length)for(var l,h,c=l[h-1],f=c[0],v=c[1]/2+nr,g=hr(v),d=lr(v),p=0;p<h;++p,f=m,g=x,d=E,c=y){var y=l[p],m=y[0],_=y[1]/2+nr,x=hr(_),E=lr(_),k=m-f,w=k>=0?1:-1,b=w*k,I=b>tr,N=g*x;if(jr.add(ur(N*w*hr(b),d*E+N*lr(b))),o+=I?k+w*rr:k,I^f>=n^m>=n){var S=wr(Er(c),Er(y));Nr(S);var M=wr(i,S);Nr(M);var L=(I^k>=0?-1:1)*vr(M[2]);(r>L||r===L&&(S[0]||S[1]))&&(s+=I^k>=0?1:-1)}}return(o<-1e-6||o<$n&&jr<-1e-6)^1&s}(s,h);a.length?(v||(o.polygonStart(),v=!0),Dr(a,Qr,t,n,o)):t&&(v||(o.polygonStart(),v=!0),o.lineStart(),n(null,null,1,o),o.lineEnd()),v&&(o.polygonEnd(),v=!1),a=s=null},sphere:function(){o.polygonStart(),o.lineStart(),n(null,null,1,o),o.lineEnd(),o.polygonEnd()}};function d(e,n){var r=i(e,n);t(e=r[0],n=r[1])&&o.point(e,n)}function p(t,e){var n=i(t,e);l.point(n[0],n[1])}function y(){g.point=p,l.lineStart()}function m(){g.point=d,l.lineEnd()}function _(t,e){u.push([t,e]);var n=i(t,e);f.point(n[0],n[1])}function x(){f.lineStart(),u=[]}function E(){_(u[0][0],u[0][1]),f.lineEnd();var t,e,n,r,i=f.clean(),l=c.result(),h=l.length;if(u.pop(),s.push(u),u=null,h)if(1&i){if((e=(n=l[0]).length-1)>0){for(v||(o.polygonStart(),v=!0),o.lineStart(),t=0;t<e;++t)o.point((r=n[t])[0],r[1]);o.lineEnd()}}else h>1&&2&i&&l.push(l.pop().concat(l.shift())),a.push(l.filter(Kr))}return g}}function Kr(t){return t.length>1}function Qr(t,e){return((t=t.x)[0]<0?t[1]-er-$n:er-t[1])-((e=e.x)[0]<0?e[1]-er-$n:er-e[1])}Wn();var $r=Jr((function(){return!0}),(function(t){var e,n=NaN,r=NaN,i=NaN;return{lineStart:function(){t.lineStart(),e=1},point:function(o,s){var a=o>0?tr:-tr,u=sr(o-n);sr(u-tr)<$n?(t.point(n,r=(r+s)/2>0?er:-er),t.point(i,r),t.lineEnd(),t.lineStart(),t.point(a,r),t.point(o,r),e=0):i!==a&&u>=tr&&(sr(n-i)<$n&&(n-=i*$n),sr(o-a)<$n&&(o-=a*$n),r=function(t,e,n,r){var i,o,s=hr(t-n);return sr(s)>$n?ar((hr(e)*(o=lr(r))*hr(n)-hr(r)*(i=lr(e))*hr(t))/(i*o*s)):(e+r)/2}(n,r,o,s),t.point(i,r),t.lineEnd(),t.lineStart(),t.point(a,r),e=0),t.point(n=o,r=s),i=a},lineEnd:function(){t.lineEnd(),n=r=NaN},clean:function(){return 2-e}}}),(function(t,e,n,r){var i;if(null==t)i=n*er,r.point(-tr,i),r.point(0,i),r.point(tr,i),r.point(tr,0),r.point(tr,-i),r.point(0,-i),r.point(-tr,-i),r.point(-tr,0),r.point(-tr,i);else if(sr(t[0]-e[0])>$n){var o=t[0]<e[0]?tr:-tr;i=n*o/2,r.point(-o,i),r.point(0,i),r.point(o,i)}else r.point(e[0],e[1])}),[-tr,-er]);function ti(t,e){var n=lr(t),r=n>0,i=sr(n)>$n;function o(t,e){return lr(t)*lr(e)>n}function s(t,e,r){var i=[1,0,0],o=wr(Er(t),Er(e)),s=kr(o,o),a=o[0],u=s-a*a;if(!u)return!r&&t;var l=n*s/u,h=-n*a/u,c=wr(i,o),f=Ir(i,l);br(f,Ir(o,h));var v=c,g=kr(f,v),d=kr(v,v),p=g*g-d*(kr(f,f)-1);if(!(p<0)){var y=cr(p),m=Ir(v,(-g-y)/d);if(br(m,f),m=xr(m),!r)return m;var _,x=t[0],E=e[0],k=t[1],w=e[1];E<x&&(_=x,x=E,E=_);var b=E-x,I=sr(b-tr)<$n;if(!I&&w<k&&(_=k,k=w,w=_),I||b<$n?I?k+w>0^m[1]<(sr(m[0]-x)<$n?k:w):k<=m[1]&&m[1]<=w:b>tr^(x<=m[0]&&m[0]<=E)){var N=Ir(v,(-g+y)/d);return br(N,f),[m,xr(N)]}}}function a(e,n){var i=r?t:tr-t,o=0;return e<-i?o|=1:e>i&&(o|=2),n<-i?o|=4:n>i&&(o|=8),o}return Jr(o,(function(t){var e,n,u,l,h;return{lineStart:function(){l=u=!1,h=1},point:function(c,f){var v,g=[c,f],d=o(c,f),p=r?d?0:a(c,f):d?a(c+(c<0?tr:-tr),f):0;if(!e&&(l=u=d)&&t.lineStart(),d!==u&&(!(v=s(e,g))||Rr(e,v)||Rr(g,v))&&(g[0]+=$n,g[1]+=$n,d=o(g[0],g[1])),d!==u)h=0,d?(t.lineStart(),v=s(g,e),t.point(v[0],v[1])):(v=s(e,g),t.point(v[0],v[1]),t.lineEnd()),e=v;else if(i&&e&&r^d){var y;p&n||!(y=s(g,e,!0))||(h=0,r?(t.lineStart(),t.point(y[0][0],y[0][1]),t.point(y[1][0],y[1][1]),t.lineEnd()):(t.point(y[1][0],y[1][1]),t.lineEnd(),t.lineStart(),t.point(y[0][0],y[0][1])))}!d||e&&Rr(e,g)||t.point(g[0],g[1]),e=g,u=d,n=p},lineEnd:function(){u&&t.lineEnd(),e=null},clean:function(){return h|(l&&u)<<1}}}),(function(n,r,i,o){!function(t,e,n,r,i,o){if(n){var s=lr(e),a=hr(e),u=r*n;null==i?(i=e+r*rr,o=e-u/2):(i=Tr(s,i),o=Tr(s,o),(r>0?i<o:i>o)&&(i+=r*rr));for(var l,h=i;r>0?h>o:h<o;h-=u)l=xr([s,-a*lr(h),-a*hr(h)]),t.point(l[0],l[1])}}(o,t,e,i,n,r)}),r?[0,-t]:[-tr,t-tr])}function ei(t){return function(e){var n=new ni;for(var r in t)n[r]=t[r];return n.stream=e,n}}function ni(){}function ri(t,e,n){var r=e[1][0]-e[0][0],i=e[1][1]-e[0][1],o=t.clipExtent&&t.clipExtent();t.scale(150).translate([0,0]),null!=o&&t.clipExtent(null),function(t,e){t&&pr.hasOwnProperty(t.type)?pr[t.type](t,e):dr(t,e)}(n,t.stream(Wr));var s=Wr.result(),a=Math.min(r/(s[1][0]-s[0][0]),i/(s[1][1]-s[0][1])),u=+e[0][0]+(r-a*(s[1][0]+s[0][0]))/2,l=+e[0][1]+(i-a*(s[1][1]+s[0][1]))/2;return null!=o&&t.clipExtent(o),t.scale(150*a).translate([u,l])}ni.prototype={constructor:ni,point:function(t,e){this.stream.point(t,e)},sphere:function(){this.stream.sphere()},lineStart:function(){this.stream.lineStart()},lineEnd:function(){this.stream.lineEnd()},polygonStart:function(){this.stream.polygonStart()},polygonEnd:function(){this.stream.polygonEnd()}};var ii=16,oi=lr(30*or);function si(t,e){return+e?function(t,e){function n(r,i,o,s,a,u,l,h,c,f,v,g,d,p){var y=l-r,m=h-i,_=y*y+m*m;if(_>4*e&&d--){var x=s+f,E=a+v,k=u+g,w=cr(x*x+E*E+k*k),b=vr(k/=w),I=sr(sr(k)-1)<$n||sr(o-c)<$n?(o+c)/2:ur(E,x),N=t(I,b),S=N[0],M=N[1],L=S-r,P=M-i,C=m*L-y*P;(C*C/_>e||sr((y*L+m*P)/_-.5)>.3||s*f+a*v+u*g<oi)&&(n(r,i,o,s,a,u,S,M,I,x/=w,E/=w,k,d,p),p.point(S,M),n(S,M,I,x,E,k,l,h,c,f,v,g,d,p))}}return function(e){var r,i,o,s,a,u,l,h,c,f,v,g,d={point:p,lineStart:y,lineEnd:_,polygonStart:function(){e.polygonStart(),d.lineStart=x},polygonEnd:function(){e.polygonEnd(),d.lineStart=y}};function p(n,r){n=t(n,r),e.point(n[0],n[1])}function y(){h=NaN,d.point=m,e.lineStart()}function m(r,i){var o=Er([r,i]),s=t(r,i);n(h,c,l,f,v,g,h=s[0],c=s[1],l=r,f=o[0],v=o[1],g=o[2],ii,e),e.point(h,c)}function _(){d.point=p,e.lineEnd()}function x(){y(),d.point=E,d.lineEnd=k}function E(t,e){m(r=t,e),i=h,o=c,s=f,a=v,u=g,d.point=m}function k(){n(h,c,l,f,v,g,i,o,r,s,a,u,ii,e),d.lineEnd=_,_()}return d}}(t,e):function(t){return ei({point:function(e,n){e=t(e,n),this.stream.point(e[0],e[1])}})}(t)}var ai=ei({point:function(t,e){this.stream.point(t*or,e*or)}});function ui(t){return function(t){var e,n,r,i,o,s,a,u,l,h,c=150,f=480,v=250,g=0,d=0,p=0,y=0,m=0,_=null,x=$r,E=null,k=Xr,w=.5,b=si(S,w);function I(t){return[(t=o(t[0]*or,t[1]*or))[0]*c+n,r-t[1]*c]}function N(t){return(t=o.invert((t[0]-n)/c,(r-t[1])/c))&&[t[0]*ir,t[1]*ir]}function S(t,i){return[(t=e(t,i))[0]*c+n,r-t[1]*c]}function M(){o=Sr(i=function(t,e,n){return(t%=rr)?e||n?Sr(Pr(t),Cr(e,n)):Pr(t):e||n?Cr(e,n):Mr}(p,y,m),e);var t=e(g,d);return n=f-t[0]*c,r=v+t[1]*c,L()}function L(){return l=h=null,I}return I.stream=function(t){return l&&h===t?l:l=ai(x(i,b(k(h=t))))},I.clipAngle=function(t){return arguments.length?(x=+t?ti(_=t*or,6*or):(_=null,$r),L()):_*ir},I.clipExtent=function(t){return arguments.length?(k=null==t?(E=s=a=u=null,Xr):zr(E=+t[0][0],s=+t[0][1],a=+t[1][0],u=+t[1][1]),L()):null==E?null:[[E,s],[a,u]]},I.scale=function(t){return arguments.length?(c=+t,M()):c},I.translate=function(t){return arguments.length?(f=+t[0],v=+t[1],M()):[f,v]},I.center=function(t){return arguments.length?(g=t[0]%360*or,d=t[1]%360*or,M()):[g*ir,d*ir]},I.rotate=function(t){return arguments.length?(p=t[0]%360*or,y=t[1]%360*or,m=t.length>2?t[2]%360*or:0,M()):[p*ir,y*ir,m*ir]},I.precision=function(t){return arguments.length?(b=si(S,w=t*t),L()):cr(w)},I.fitExtent=function(t,e){return ri(I,t,e)},I.fitSize=function(t,e){return function(t,e,n){return ri(t,[[0,0],e],n)}(I,t,e)},function(){return e=t.apply(this,arguments),I.invert=e.invert&&N,M()}}((function(){return t}))()}function li(t){return function(e,n){var r=lr(e),i=lr(n),o=t(r*i);return[o*i*hr(e),o*hr(n)]}}function hi(t){return function(e,n){var r=cr(e*e+n*n),i=t(r),o=hr(i),s=lr(i);return[ur(e*o,r*s),vr(r&&n*o/r)]}}li((function(t){return cr(2/(1+t))})).invert=hi((function(t){return 2*vr(t/2)}));var ci=li((function(t){return(t=fr(t))&&t/hr(t)}));function fi(){return ui(ci).scale(79.4188).clipAngle(179.999)}function vi(t,e){return[t,e]}ci.invert=hi((function(t){return t})),vi.invert=vi;var gi=Hn.BufferOp,di=Hn.GeoJSONReader,pi=Hn.GeoJSONWriter;function yi(t,e,n,r){var i=t.properties||{},o="Feature"===t.type?t.geometry:t;if("GeometryCollection"===o.type){var s=[];return mt(t,(function(t){var i=yi(t,e,n,r);i&&s.push(i)})),C(s)}var a=function(t){var e=Xn(t).geometry.coordinates,n=[-e[0],-e[1]];return fi().rotate(n).scale(x)}(o),u={type:o.type,coordinates:_i(o.coordinates,a)},l=(new di).read(u),h=F(q(e,n),"meters"),c=gi.bufferOp(l,h,r);if(!mi((c=(new pi).write(c)).coordinates))return w({type:c.type,coordinates:xi(c.coordinates,a)},i)}function mi(t){return Array.isArray(t[0])?mi(t[0]):isNaN(t[0])}function _i(t,e){return"object"!==m(t[0])?e(t):t.map((function(t){return _i(t,e)}))}function xi(t,e){return"object"!==m(t[0])?e.invert(t):t.map((function(t){return xi(t,e)}))}function Ei(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=0,r=0,i=0;return mt(t,(function(t,o,s){var a=e.weight?null==s?void 0:s[e.weight]:void 0;if(!V(a=null==a?1:a))throw new Error("weight value must be a number for feature index "+o);(a=Number(a))>0&&ct(t,(function(t){n+=t[0]*a,r+=t[1]*a,i+=a}))})),I([n/i,r/i],e.properties,e)}function ki(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=0,r=0,i=0;return ct(t,(function(t){n+=t[0],r+=t[1],i++}),!0),I([n/i,r/i],e.properties)}function wi(t,e,n,r,i){var o=r.tolerance||.001,s=0,a=0,u=0,l=0;if(dt(n,(function(e){var n,r=null==(n=e.properties)?void 0:n.weight,i=null==r?1:r;if(!V(i=Number(i)))throw new Error("weight value must be a number");if(i>0){l+=1;var o=i*ut(e,t);0===o&&(o=1);var h=i/o;s+=e.geometry.coordinates[0]*h,a+=e.geometry.coordinates[1]*h,u+=h}})),l<1)throw new Error("no features to measure");var h=s/u,c=a/u;return 1===l||0===i||Math.abs(h-e[0])<o&&Math.abs(c-e[1])<o?I([h,c],{medianCandidates:r.medianCandidates}):(r.medianCandidates.push([h,c]),wi([h,c],t,n,r,i-1))}var bi={exports:{}},Ii=Mn(le),Ni=function(){return s((function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Si;if(i(this,t),this.data=e,this.length=this.data.length,this.compare=n,this.length>0)for(var r=(this.length>>1)-1;r>=0;r--)this._down(r)}),[{key:"push",value:function(t){this.data.push(t),this.length++,this._up(this.length-1)}},{key:"pop",value:function(){if(0!==this.length){var t=this.data[0],e=this.data.pop();return this.length--,this.length>0&&(this.data[0]=e,this._down(0)),t}}},{key:"peek",value:function(){return this.data[0]}},{key:"_up",value:function(t){for(var e=this.data,n=this.compare,r=e[t];t>0;){var i=t-1>>1,o=e[i];if(n(r,o)>=0)break;e[t]=o,t=i}e[t]=r}},{key:"_down",value:function(t){for(var e=this.data,n=this.compare,r=this.length>>1,i=e[t];t<r;){var o=1+(t<<1),s=e[o],a=o+1;if(a<this.length&&n(e[a],s)<0&&(o=a,s=e[a]),n(s,i)>=0)break;e[t]=s,t=o}e[t]=i}}])}();function Si(t,e){return t<e?-1:t>e?1:0}var Mi,Li,Pi,Ci,Ti,Oi=Mn(Object.freeze({__proto__:null,default:Ni})),Ri={exports:{}};function Ai(){if(Ti)return Ri.exports;Ti=1;var t=(Li||(Li=1,Mi=function(t,e,n,r){var i=t[0],o=t[1],s=!1;void 0===n&&(n=0),void 0===r&&(r=e.length);for(var a=(r-n)/2,u=0,l=a-1;u<a;l=u++){var h=e[n+2*u+0],c=e[n+2*u+1],f=e[n+2*l+0],v=e[n+2*l+1];c>o!=v>o&&i<(f-h)*(o-c)/(v-c)+h&&(s=!s)}return s}),Mi),e=(Ci||(Ci=1,Pi=function(t,e,n,r){var i=t[0],o=t[1],s=!1;void 0===n&&(n=0),void 0===r&&(r=e.length);for(var a=r-n,u=0,l=a-1;u<a;l=u++){var h=e[u+n][0],c=e[u+n][1],f=e[l+n][0],v=e[l+n][1];c>o!=v>o&&i<(f-h)*(o-c)/(v-c)+h&&(s=!s)}return s}),Pi);return Ri.exports=function(n,r,i,o){return r.length>0&&Array.isArray(r[0])?e(n,r,i,o):t(n,r,i,o)},Ri.exports.nested=e,Ri.exports.flat=t,Ri.exports}var Di,Fi,qi={exports:{}};qi.exports;function Gi(){return Di||(Di=1,function(t,e){!function(t){var e=134217729,n=33306690738754706e-32;function r(t,e,n,r,i){var o,s,a,u,l=e[0],h=r[0],c=0,f=0;h>l==h>-l?(o=l,l=e[++c]):(o=h,h=r[++f]);var v=0;if(c<t&&f<n)for(h>l==h>-l?(a=o-((s=l+o)-l),l=e[++c]):(a=o-((s=h+o)-h),h=r[++f]),o=s,0!==a&&(i[v++]=a);c<t&&f<n;)h>l==h>-l?(a=o-((s=o+l)-(u=s-o))+(l-u),l=e[++c]):(a=o-((s=o+h)-(u=s-o))+(h-u),h=r[++f]),o=s,0!==a&&(i[v++]=a);for(;c<t;)a=o-((s=o+l)-(u=s-o))+(l-u),l=e[++c],o=s,0!==a&&(i[v++]=a);for(;f<n;)a=o-((s=o+h)-(u=s-o))+(h-u),h=r[++f],o=s,0!==a&&(i[v++]=a);return 0===o&&0!==v||(i[v++]=o),v}function i(t){return new Float64Array(t)}var o=33306690738754716e-32,s=22204460492503146e-32,a=11093356479670487e-47,u=i(4),l=i(8),h=i(12),c=i(16),f=i(4);t.orient2d=function(t,i,v,g,d,p){var y=(i-p)*(v-d),m=(t-d)*(g-p),_=y-m;if(0===y||0===m||y>0!=m>0)return _;var x=Math.abs(y+m);return Math.abs(_)>=o*x?_:-function(t,i,o,v,g,d,p){var y,m,_,x,E,k,w,b,I,N,S,M,L,P,C,T,O,R,A=t-g,D=o-g,F=i-d,q=v-d;E=(C=(b=A-(w=(k=e*A)-(k-A)))*(N=q-(I=(k=e*q)-(k-q)))-((P=A*q)-w*I-b*I-w*N))-(S=C-(O=(b=F-(w=(k=e*F)-(k-F)))*(N=D-(I=(k=e*D)-(k-D)))-((T=F*D)-w*I-b*I-w*N))),u[0]=C-(S+E)+(E-O),E=(L=P-((M=P+S)-(E=M-P))+(S-E))-(S=L-T),u[1]=L-(S+E)+(E-T),E=(R=M+S)-M,u[2]=M-(R-E)+(S-E),u[3]=R;var G=function(t,e){for(var n=e[0],r=1;r<t;r++)n+=e[r];return n}(4,u),Y=s*p;if(G>=Y||-G>=Y)return G;if(y=t-(A+(E=t-A))+(E-g),_=o-(D+(E=o-D))+(E-g),m=i-(F+(E=i-F))+(E-d),x=v-(q+(E=v-q))+(E-d),0===y&&0===m&&0===_&&0===x)return G;if(Y=a*p+n*Math.abs(G),(G+=A*x+q*y-(F*_+D*m))>=Y||-G>=Y)return G;E=(C=(b=y-(w=(k=e*y)-(k-y)))*(N=q-(I=(k=e*q)-(k-q)))-((P=y*q)-w*I-b*I-w*N))-(S=C-(O=(b=m-(w=(k=e*m)-(k-m)))*(N=D-(I=(k=e*D)-(k-D)))-((T=m*D)-w*I-b*I-w*N))),f[0]=C-(S+E)+(E-O),E=(L=P-((M=P+S)-(E=M-P))+(S-E))-(S=L-T),f[1]=L-(S+E)+(E-T),E=(R=M+S)-M,f[2]=M-(R-E)+(S-E),f[3]=R;var B=r(4,u,4,f,l);E=(C=(b=A-(w=(k=e*A)-(k-A)))*(N=x-(I=(k=e*x)-(k-x)))-((P=A*x)-w*I-b*I-w*N))-(S=C-(O=(b=F-(w=(k=e*F)-(k-F)))*(N=_-(I=(k=e*_)-(k-_)))-((T=F*_)-w*I-b*I-w*N))),f[0]=C-(S+E)+(E-O),E=(L=P-((M=P+S)-(E=M-P))+(S-E))-(S=L-T),f[1]=L-(S+E)+(E-T),E=(R=M+S)-M,f[2]=M-(R-E)+(S-E),f[3]=R;var z=r(B,l,4,f,h);E=(C=(b=y-(w=(k=e*y)-(k-y)))*(N=x-(I=(k=e*x)-(k-x)))-((P=y*x)-w*I-b*I-w*N))-(S=C-(O=(b=m-(w=(k=e*m)-(k-m)))*(N=_-(I=(k=e*_)-(k-_)))-((T=m*_)-w*I-b*I-w*N))),f[0]=C-(S+E)+(E-O),E=(L=P-((M=P+S)-(E=M-P))+(S-E))-(S=L-T),f[1]=L-(S+E)+(E-T),E=(R=M+S)-M,f[2]=M-(R-E)+(S-E),f[3]=R;var j=r(z,h,4,f,c);return c[j-1]}(t,i,v,g,d,p,x)},t.orient2dfast=function(t,e,n,r,i,o){return(e-o)*(n-i)-(t-i)*(r-o)},Object.defineProperty(t,"__esModule",{value:!0})}(e)}(0,qi.exports)),qi.exports}var Yi=function(){if(Fi)return bi.exports;Fi=1;var t=Ii,e=Oi,n=Ai(),r=Gi().orient2d;function i(e,r,i){r=Math.max(0,void 0===r?2:r),i=i||0;var s=function(t){for(var e=t[0],r=t[0],i=t[0],o=t[0],s=0;s<t.length;s++){var a=t[s];a[0]<e[0]&&(e=a),a[0]>i[0]&&(i=a),a[1]<r[1]&&(r=a),a[1]>o[1]&&(o=a)}var u=[e,r,i,o],l=u.slice();for(s=0;s<t.length;s++)n(t[s],u)||l.push(t[s]);return function(t){t.sort(p);for(var e=[],n=0;n<t.length;n++){for(;e.length>=2&&h(e[e.length-2],e[e.length-1],t[n])<=0;)e.pop();e.push(t[n])}for(var r=[],i=t.length-1;i>=0;i--){for(;r.length>=2&&h(r[r.length-2],r[r.length-1],t[i])<=0;)r.pop();r.push(t[i])}return r.pop(),e.pop(),e.concat(r)}(l)}(e),a=new t(16);a.toBBox=function(t){return{minX:t[0],minY:t[1],maxX:t[0],maxY:t[1]}},a.compareMinX=function(t,e){return t[0]-e[0]},a.compareMinY=function(t,e){return t[1]-e[1]},a.load(e);for(var u,l=[],g=0;g<s.length;g++){var d=s[g];a.remove(d),u=f(d,u),l.push(u)}var y=new t(16);for(g=0;g<l.length;g++)y.insert(c(l[g]));for(var m=r*r,_=i*i;l.length;){var x=l.shift(),E=x.p,k=x.next.p,w=v(E,k);if(!(w<_)){var b=w/m;(d=o(a,x.prev.p,E,k,x.next.next.p,b,y))&&Math.min(v(d,E),v(d,k))<=b&&(l.push(x),l.push(f(d,x)),a.remove(d),y.remove(x),y.insert(c(x)),y.insert(c(x.next)))}}x=u;var I=[];do{I.push(x.p),x=x.next}while(x!==u);return I.push(x.p),I}function o(t,n,r,i,o,u,h){for(var c=new e([],s),f=t.data;f;){for(var v=0;v<f.children.length;v++){var d=f.children[v],p=f.leaf?g(d,r,i):a(r,i,d);p>u||c.push({node:d,dist:p})}for(;c.length&&!c.peek().node.children;){var y=c.pop(),m=y.node,_=g(m,n,r),x=g(m,i,o);if(y.dist<_&&y.dist<x&&l(r,m,h)&&l(i,m,h))return m}(f=c.pop())&&(f=f.node)}return null}function s(t,e){return t.dist-e.dist}function a(t,e,n){if(u(t,n)||u(e,n))return 0;var r=d(t[0],t[1],e[0],e[1],n.minX,n.minY,n.maxX,n.minY);if(0===r)return 0;var i=d(t[0],t[1],e[0],e[1],n.minX,n.minY,n.minX,n.maxY);if(0===i)return 0;var o=d(t[0],t[1],e[0],e[1],n.maxX,n.minY,n.maxX,n.maxY);if(0===o)return 0;var s=d(t[0],t[1],e[0],e[1],n.minX,n.maxY,n.maxX,n.maxY);return 0===s?0:Math.min(r,i,o,s)}function u(t,e){return t[0]>=e.minX&&t[0]<=e.maxX&&t[1]>=e.minY&&t[1]<=e.maxY}function l(t,e,n){for(var r,i,o,s,a=Math.min(t[0],e[0]),u=Math.min(t[1],e[1]),l=Math.max(t[0],e[0]),c=Math.max(t[1],e[1]),f=n.search({minX:a,minY:u,maxX:l,maxY:c}),v=0;v<f.length;v++)if(r=f[v].p,i=f[v].next.p,o=t,r!==(s=e)&&i!==o&&h(r,i,o)>0!=h(r,i,s)>0&&h(o,s,r)>0!=h(o,s,i)>0)return!1;return!0}function h(t,e,n){return r(t[0],t[1],e[0],e[1],n[0],n[1])}function c(t){var e=t.p,n=t.next.p;return t.minX=Math.min(e[0],n[0]),t.minY=Math.min(e[1],n[1]),t.maxX=Math.max(e[0],n[0]),t.maxY=Math.max(e[1],n[1]),t}function f(t,e){var n={p:t,prev:null,next:null,minX:0,minY:0,maxX:0,maxY:0};return e?(n.next=e.next,n.prev=e,e.next.prev=n,e.next=n):(n.prev=n,n.next=n),n}function v(t,e){var n=t[0]-e[0],r=t[1]-e[1];return n*n+r*r}function g(t,e,n){var r=e[0],i=e[1],o=n[0]-r,s=n[1]-i;if(0!==o||0!==s){var a=((t[0]-r)*o+(t[1]-i)*s)/(o*o+s*s);a>1?(r=n[0],i=n[1]):a>0&&(r+=o*a,i+=s*a)}return(o=t[0]-r)*o+(s=t[1]-i)*s}function d(t,e,n,r,i,o,s,a){var u,l,h,c,f=n-t,v=r-e,g=s-i,d=a-o,p=t-i,y=e-o,m=f*f+v*v,_=f*g+v*d,x=g*g+d*d,E=f*p+v*y,k=g*p+d*y,w=m*x-_*_,b=w,I=w;0===w?(l=0,b=1,c=k,I=x):(c=m*k-_*E,(l=_*k-x*E)<0?(l=0,c=k,I=x):l>b&&(l=b,c=k+_,I=x)),c<0?(c=0,-E<0?l=0:-E>m?l=b:(l=-E,b=m)):c>I&&(c=I,-E+_<0?l=0:-E+_>m?l=b:(l=-E+_,b=m));var N=(1-(h=0===c?0:c/I))*i+h*s-((1-(u=0===l?0:l/b))*t+u*n),S=(1-h)*o+h*a-((1-u)*e+u*r);return N*N+S*S}function p(t,e){return t[0]===e[0]?t[1]-e[1]:t[0]-e[0]}return e.default&&(e=e.default),bi.exports=i,bi.exports.default=i,bi.exports}(),Bi=Sn(Yi);function zi(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};e.concavity=e.concavity||1/0;var n=[];if(ct(t,(function(t){n.push([t[0],t[1]])})),!n.length)return null;var r=Bi(n,e.concavity);return r.length>3?S([r]):null}function ji(t,e){for(var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=n.steps||64,i=n.properties?n.properties:!Array.isArray(t)&&"Feature"===t.type&&t.properties?t.properties:{},o=[],s=0;s<r;s++)o.push(at(t,e,-360*s/r,n).geometry.coordinates);return o.push(o[0]),S([o],i)}function Xi(t){if(!t)throw new Error("geojson is required");switch(t.type){case"Feature":return Ui(t);case"FeatureCollection":return function(t){var e={type:"FeatureCollection"};return Object.keys(t).forEach((function(n){switch(n){case"type":case"features":return;default:e[n]=t[n]}})),e.features=t.features.map((function(t){return Ui(t)})),e}(t);case"Point":case"LineString":case"Polygon":case"MultiPoint":case"MultiLineString":case"MultiPolygon":case"GeometryCollection":return Zi(t);default:throw new Error("unknown GeoJSON type")}}function Ui(t){var e={type:"Feature"};return Object.keys(t).forEach((function(n){switch(n){case"type":case"properties":case"geometry":return;default:e[n]=t[n]}})),e.properties=Vi(t.properties),null==t.geometry?e.geometry=null:e.geometry=Zi(t.geometry),e}function Vi(t){var e={};return t?(Object.keys(t).forEach((function(n){var r=t[n];"object"===m(r)?null===r?e[n]=null:Array.isArray(r)?e[n]=r.map((function(t){return t})):e[n]=Vi(r):e[n]=r})),e):e}function Zi(t){var e={type:t.type};return t.bbox&&(e.bbox=t.bbox),"GeometryCollection"===t.type?(e.geometries=t.geometries.map((function(t){return Zi(t)})),e):(e.coordinates=Hi(t.coordinates),e)}function Hi(t){var e=t;return"object"!==m(e[0])?e.slice():e.map((function(t){return Hi(t)}))}function Wi(t,e){if(!t)throw new Error("geojson is required");if("FeatureCollection"!==t.type)throw new Error("geojson must be a FeatureCollection");if(null==e)throw new Error("filter is required");var n=[];return dt(t,(function(t){$i(t.properties,e)&&n.push(t)})),C(n)}function Ji(t,e,n){if(!t)throw new Error("geojson is required");if("FeatureCollection"!==t.type)throw new Error("geojson must be a FeatureCollection");if(null==e)throw new Error("property is required");for(var r=Qi(t,e),i=Object.keys(r),o=0;o<i.length;o++){for(var s=i[o],a=r[s],u=[],l=0;l<a.length;l++)u.push(t.features[a[l]]);n(C(u),s,o)}}function Ki(t,e,n,r){var i=r;return Ji(t,e,(function(t,e,o){i=0===o&&void 0===r?t:n(i,t,e,o)})),i}function Qi(t,e){var n={};return dt(t,(function(t,r){var i=t.properties||{};if(Object.prototype.hasOwnProperty.call(i,String(e))){var o=i[e];Object.prototype.hasOwnProperty.call(n,o)?n[o].push(r):n[o]=[r]}})),n}function $i(t,e){if(void 0===t)return!1;var n=m(e);if("number"===n||"string"===n)return Object.prototype.hasOwnProperty.call(t,e);if(Array.isArray(e)){for(var r=0;r<e.length;r++)if(!$i(t,e[r]))return!1;return!0}return to(t,e)}function to(t,e){for(var n=Object.keys(e),r=0;r<n.length;r++){var i=n[r];if(t[i]!==e[i])return!1}return!0}function eo(t,e){if(!e)return{};if(!e.length)return{};for(var n={},r=0;r<e.length;r++){var i=e[r];Object.prototype.hasOwnProperty.call(t,i)&&(n[i]=t[i])}return n}var no,ro,io,oo,so,ao,uo=Object.freeze({__proto__:null,applyFilter:$i,clusterEach:Ji,clusterReduce:Ki,createBins:Qi,filterProperties:eo,getCluster:Wi,propertiesContainsFilter:to});function lo(){return ro||(ro=1,no={eudist:function(t,e,n){for(var r=t.length,i=0,o=0;o<r;o++){var s=(t[o]||0)-(e[o]||0);i+=s*s}return n?Math.sqrt(i):i},mandist:function(t,e,n){for(var r=t.length,i=0,o=0;o<r;o++)i+=Math.abs((t[o]||0)-(e[o]||0));return n?Math.sqrt(i):i},dist:function(t,e,n){var r=Math.abs(t-e);return n?r:r*r}}),no}var ho=function(){if(ao)return so;ao=1;var t=lo(),e=function(){if(oo)return io;oo=1;var t=lo(),e=t.eudist,n=t.dist;return io={kmrand:function(t,e){for(var n={},r=[],i=e<<2,o=t.length,s=t[0].length>0;r.length<e&&i-- >0;){var a=t[Math.floor(Math.random()*o)],u=s?a.join("_"):""+a;n[u]||(n[u]=!0,r.push(a))}if(r.length<e)throw new Error("Error initializating clusters");return r},kmpp:function(t,r){var i=t[0].length?e:n,o=[],s=t.length,a=t[0].length>0,u=t[Math.floor(Math.random()*s)];for(a&&u.join("_"),o.push(u);o.length<r;){for(var l=[],h=o.length,c=0,f=[],v=0;v<s;v++){for(var g=1/0,d=0;d<h;d++){var p=i(t[v],o[d]);p<=g&&(g=p)}l[v]=g}for(var y=0;y<s;y++)c+=l[y];for(var m=0;m<s;m++)f[m]={i:m,v:t[m],pr:l[m]/c,cs:0};f.sort((function(t,e){return t.pr-e.pr})),f[0].cs=f[0].pr;for(var _=1;_<s;_++)f[_].cs=f[_-1].cs+f[_].pr;for(var x=Math.random(),E=0;E<s-1&&f[E++].cs<x;);o.push(f[E-1].v)}return o}},io}(),n=t.eudist;t.mandist,t.dist;var r=e.kmrand,i=e.kmpp;function o(t,e,n){n=n||[];for(var r=0;r<t;r++)n[r]=e;return n}return so=function(t,e,s,a){var u=[],l=[],h=[],c=[],f=!1,v=a||1e4,g=t.length,d=t[0].length,p=d>0,y=[];if(s)u="kmrand"==s?r(t,e):"kmpp"==s?i(t,e):s;else for(var m={};u.length<e;){var _=Math.floor(Math.random()*g);m[_]||(m[_]=!0,u.push(t[_]))}do{o(e,0,y);for(var x=0;x<g;x++){for(var E=1/0,k=0,w=0;w<e;w++){(c=p?n(t[x],u[w]):Math.abs(t[x]-u[w]))<=E&&(E=c,k=w)}h[x]=k,y[k]++}for(var b=[],I=(l=[],0);I<e;I++)b[I]=p?o(d,0,b[I]):0,l[I]=u[I];if(p){for(var N=0;N<e;N++)u[N]=[];for(var S=0;S<g;S++)for(var M=b[h[S]],L=t[S],P=0;P<d;P++)M[P]+=L[P];f=!0;for(var C=0;C<e;C++){for(var T=u[C],O=b[C],R=l[C],A=y[C],D=0;D<d;D++)T[D]=O[D]/A||0;if(f)for(var F=0;F<d;F++)if(R[F]!=T[F]){f=!1;break}}}else{for(var q=0;q<g;q++){b[h[q]]+=t[q]}for(var G=0;G<e;G++)u[G]=b[G]/y[G]||0;f=!0;for(var Y=0;Y<e;Y++)if(l[Y]!=u[Y]){f=!1;break}}f=f||--v<=0}while(!f);return{it:1e4-v,k:e,idxs:h,centroids:u}},so}(),co=Sn(ho);function fo(t,e){var n=!1;return C(function(t){if(t.length<3)return[];t.sort(go);var e,n,r,i,o,s,a=t.length-1,u=t[a].x,l=t[0].x,h=t[a].y,c=h,f=1e-12;for(;a--;)t[a].y<h&&(h=t[a].y),t[a].y>c&&(c=t[a].y);var v,g=l-u,d=c-h,p=g>d?g:d,y=.5*(l+u),m=.5*(c+h),_=[new vo({__sentinel:!0,x:y-20*p,y:m-p},{__sentinel:!0,x:y,y:m+20*p},{__sentinel:!0,x:y+20*p,y:m-p})],x=[],E=[];a=t.length;for(;a--;){for(E.length=0,v=_.length;v--;)(g=t[a].x-_[v].x)>0&&g*g>_[v].r?(x.push(_[v]),_.splice(v,1)):g*g+(d=t[a].y-_[v].y)*d>_[v].r||(E.push(_[v].a,_[v].b,_[v].b,_[v].c,_[v].c,_[v].a),_.splice(v,1));for(po(E),v=E.length;v;)n=E[--v],e=E[--v],r=t[a],i=n.x-e.x,o=n.y-e.y,s=2*(i*(r.y-n.y)-o*(r.x-n.x)),Math.abs(s)>f&&_.push(new vo(e,n,r))}Array.prototype.push.apply(x,_),a=x.length;for(;a--;)(x[a].a.__sentinel||x[a].b.__sentinel||x[a].c.__sentinel)&&x.splice(a,1);return x}(t.features.map((function(t){var r={x:t.geometry.coordinates[0],y:t.geometry.coordinates[1]};return e?r.z=t.properties[e]:3===t.geometry.coordinates.length&&(n=!0,r.z=t.geometry.coordinates[2]),r}))).map((function(t){var e=[t.a.x,t.a.y],r=[t.b.x,t.b.y],i=[t.c.x,t.c.y],o={};return n?(e.push(t.a.z),r.push(t.b.z),i.push(t.c.z)):o={a:t.a.z,b:t.b.z,c:t.c.z},S([[e,r,i,e]],o)})))}var vo=s((function t(e,n,r){i(this,t),this.a=e,this.b=n,this.c=r;var o,s,a=n.x-e.x,u=n.y-e.y,l=r.x-e.x,h=r.y-e.y,c=a*(e.x+n.x)+u*(e.y+n.y),f=l*(e.x+r.x)+h*(e.y+r.y),v=2*(a*(r.y-n.y)-u*(r.x-n.x));this.x=(h*c-u*f)/v,this.y=(a*f-l*c)/v,o=this.x-e.x,s=this.y-e.y,this.r=o*o+s*s}));function go(t,e){return e.x-t.x}function po(t){var e,n,r,i,o,s=t.length;t:for(;s;)for(n=t[--s],e=t[--s],r=s;r;)if(o=t[--r],e===(i=t[--r])&&n===o||e===o&&n===i){t.splice(s,2),t.splice(r,2),s-=2;continue t}}function yo(t){return t}function mo(t,e){var n=function(t){if(null==t)return yo;var e,n,r=t.scale[0],i=t.scale[1],o=t.translate[0],s=t.translate[1];return function(t,a){a||(e=n=0);var u=2,l=t.length,h=new Array(l);for(h[0]=(e+=t[0])*r+o,h[1]=(n+=t[1])*i+s;u<l;)h[u]=t[u],++u;return h}}(t.transform),r=t.arcs;function i(t,e){e.length&&e.pop();for(var i=r[t<0?~t:t],o=0,s=i.length;o<s;++o)e.push(n(i[o],o));t<0&&function(t,e){for(var n,r=t.length,i=r-e;i<--r;)n=t[i],t[i++]=t[r],t[r]=n}(e,s)}function o(t){return n(t)}function s(t){for(var e=[],n=0,r=t.length;n<r;++n)i(t[n],e);return e.length<2&&e.push(e[0]),e}function a(t){for(var e=s(t);e.length<4;)e.push(e[0]);return e}function u(t){return t.map(a)}return function t(e){var n,r=e.type;switch(r){case"GeometryCollection":return{type:r,geometries:e.geometries.map(t)};case"Point":n=o(e.coordinates);break;case"MultiPoint":n=e.coordinates.map(o);break;case"LineString":n=s(e.arcs);break;case"MultiLineString":n=e.arcs.map(s);break;case"Polygon":n=u(e.arcs);break;case"MultiPolygon":n=e.arcs.map(u);break;default:return null}return{type:r,coordinates:n}}(e)}function _o(t,e){var n={},r={},i={},o=[],s=-1;function a(t,e){for(var r in t){var i=t[r];delete e[i.start],delete i.start,delete i.end,i.forEach((function(t){n[t<0?~t:t]=1})),o.push(i)}}return e.forEach((function(n,r){var i,o=t.arcs[n<0?~n:n];o.length<3&&!o[1][0]&&!o[1][1]&&(i=e[++s],e[s]=n,e[r]=i)})),e.forEach((function(e){var n,o,s=function(e){var n,r=t.arcs[e<0?~e:e],i=r[0];t.transform?(n=[0,0],r.forEach((function(t){n[0]+=t[0],n[1]+=t[1]}))):n=r[r.length-1];return e<0?[n,i]:[i,n]}(e),a=s[0],u=s[1];if(n=i[a])if(delete i[n.end],n.push(e),n.end=u,o=r[u]){delete r[o.start];var l=o===n?n:n.concat(o);r[l.start=n.start]=i[l.end=o.end]=l}else r[n.start]=i[n.end]=n;else if(n=r[u])if(delete r[n.start],n.unshift(e),n.start=a,o=i[a]){delete i[o.end];var h=o===n?n:o.concat(n);r[h.start=o.start]=i[h.end=n.end]=h}else r[n.start]=i[n.end]=n;else r[(n=[e]).start=a]=i[n.end=u]=n})),a(i,r),a(r,i),e.forEach((function(t){n[t<0?~t:t]||o.push([t])})),o}function xo(t){return mo(t,Eo.apply(this,arguments))}function Eo(t,e){var n={},r=[],i=[];function o(t){t.forEach((function(e){e.forEach((function(e){(n[e=e<0?~e:e]||(n[e]=[])).push(t)}))})),r.push(t)}function s(e){return function(t){for(var e,n=-1,r=t.length,i=t[r-1],o=0;++n<r;)e=i,i=t[n],o+=e[0]*i[1]-e[1]*i[0];return Math.abs(o)}(mo(t,{type:"Polygon",arcs:[e]}).coordinates[0])}return e.forEach((function t(e){switch(e.type){case"GeometryCollection":e.geometries.forEach(t);break;case"Polygon":o(e.arcs);break;case"MultiPolygon":e.arcs.forEach(o)}})),r.forEach((function(t){if(!t._){var e=[],r=[t];for(t._=1,i.push(e);t=r.pop();)e.push(t),t.forEach((function(t){t.forEach((function(t){n[t<0?~t:t].forEach((function(t){t._||(t._=1,r.push(t))}))}))}))}})),r.forEach((function(t){delete t._})),{type:"MultiPolygon",arcs:i.map((function(e){var r,i=[];if(e.forEach((function(t){t.forEach((function(t){t.forEach((function(t){n[t<0?~t:t].length<2&&i.push(t)}))}))})),(r=(i=_o(t,i)).length)>1)for(var o,a,u=1,l=s(i[0]);u<r;++u)(o=s(i[u]))>l&&(a=i[0],i[0]=i[u],i[u]=a,l=o);return i})).filter((function(t){return t.length>0}))}}var ko=Object.prototype.hasOwnProperty;function wo(t,e,n,r,i,o){3===arguments.length&&(r=o=Array,i=null);for(var s=new r(t=1<<Math.max(4,Math.ceil(Math.log(t)/Math.LN2))),a=new o(t),u=t-1,l=0;l<t;++l)s[l]=i;return{set:function(r,o){for(var l=e(r)&u,h=s[l],c=0;h!=i;){if(n(h,r))return a[l]=o;if(++c>=t)throw new Error("full hashmap");h=s[l=l+1&u]}return s[l]=r,a[l]=o,o},maybeSet:function(r,o){for(var l=e(r)&u,h=s[l],c=0;h!=i;){if(n(h,r))return a[l];if(++c>=t)throw new Error("full hashmap");h=s[l=l+1&u]}return s[l]=r,a[l]=o,o},get:function(r,o){for(var l=e(r)&u,h=s[l],c=0;h!=i;){if(n(h,r))return a[l];if(++c>=t)break;h=s[l=l+1&u]}return o},keys:function(){for(var t=[],e=0,n=s.length;e<n;++e){var r=s[e];r!=i&&t.push(r)}return t}}}function bo(t,e){return t[0]===e[0]&&t[1]===e[1]}var Io=new ArrayBuffer(16),No=new Float64Array(Io),So=new Uint32Array(Io);function Mo(t){No[0]=t[0],No[1]=t[1];var e=So[0]^So[1];return 2147483647&(e=e<<5^e>>7^So[2]^So[3])}function Lo(t){var e,n,r,i,o=t.coordinates,s=t.lines,a=t.rings,u=function(){for(var t=wo(1.4*o.length,E,k,Int32Array,-1,Int32Array),e=new Int32Array(o.length),n=0,r=o.length;n<r;++n)e[n]=t.maybeSet(n,n);return e}(),l=new Int32Array(o.length),h=new Int32Array(o.length),c=new Int32Array(o.length),f=new Int8Array(o.length),v=0;for(e=0,n=o.length;e<n;++e)l[e]=h[e]=c[e]=-1;for(e=0,n=s.length;e<n;++e){var g=s[e],d=g[0],p=g[1];for(r=u[d],i=u[++d],++v,f[r]=1;++d<=p;)x(e,r,r=i,i=u[d]);++v,f[i]=1}for(e=0,n=o.length;e<n;++e)l[e]=-1;for(e=0,n=a.length;e<n;++e){var y=a[e],m=y[0]+1,_=y[1];for(x(e,u[_-1],r=u[m-1],i=u[m]);++m<=_;)x(e,r,r=i,i=u[m])}function x(t,e,n,r){if(l[n]!==t){l[n]=t;var i=h[n];if(i>=0){var o=c[n];i===e&&o===r||i===r&&o===e||(++v,f[n]=1)}else h[n]=e,c[n]=r}}function E(t){return Mo(o[t])}function k(t,e){return bo(o[t],o[e])}l=h=c=null;var w,b=function(t,e,n,r,i){3===arguments.length&&(r=Array,i=null);for(var o=new r(t=1<<Math.max(4,Math.ceil(Math.log(t)/Math.LN2))),s=t-1,a=0;a<t;++a)o[a]=i;return{add:function(r){for(var a=e(r)&s,u=o[a],l=0;u!=i;){if(n(u,r))return!0;if(++l>=t)throw new Error("full hashset");u=o[a=a+1&s]}return o[a]=r,!0},has:function(r){for(var a=e(r)&s,u=o[a],l=0;u!=i;){if(n(u,r))return!0;if(++l>=t)break;u=o[a=a+1&s]}return!1},values:function(){for(var t=[],e=0,n=o.length;e<n;++e){var r=o[e];r!=i&&t.push(r)}return t}}}(1.4*v,Mo,bo);for(e=0,n=o.length;e<n;++e)f[w=u[e]]&&b.add(o[w]);return b}function Po(t,e,n,r){Co(t,e,n),Co(t,e,e+r),Co(t,e+r,n)}function Co(t,e,n){for(var r,i=e+(n---e>>1);e<i;++e,--n)r=t[e],t[e]=t[n],t[n]=r}function To(t){var e,n,r={};for(e in t)r[e]=null==(n=t[e])?{type:null}:("FeatureCollection"===n.type?Oo:"Feature"===n.type?Ro:Ao)(n);return r}function Oo(t){var e={type:"GeometryCollection",geometries:t.features.map(Ro)};return null!=t.bbox&&(e.bbox=t.bbox),e}function Ro(t){var e,n=Ao(t.geometry);for(e in null!=t.id&&(n.id=t.id),null!=t.bbox&&(n.bbox=t.bbox),t.properties){n.properties=t.properties;break}return n}function Ao(t){if(null==t)return{type:null};var e="GeometryCollection"===t.type?{type:"GeometryCollection",geometries:t.geometries.map(Ao)}:"Point"===t.type||"MultiPoint"===t.type?{type:t.type,coordinates:t.coordinates}:{type:t.type,arcs:t.coordinates};return null!=t.bbox&&(e.bbox=t.bbox),e}function Do(t,e){var n=function(t){var e=1/0,n=1/0,r=-1/0,i=-1/0;function o(t){null!=t&&ko.call(s,t.type)&&s[t.type](t)}var s={GeometryCollection:function(t){t.geometries.forEach(o)},Point:function(t){a(t.coordinates)},MultiPoint:function(t){t.coordinates.forEach(a)},LineString:function(t){u(t.arcs)},MultiLineString:function(t){t.arcs.forEach(u)},Polygon:function(t){t.arcs.forEach(u)},MultiPolygon:function(t){t.arcs.forEach(l)}};function a(t){var o=t[0],s=t[1];o<e&&(e=o),o>r&&(r=o),s<n&&(n=s),s>i&&(i=s)}function u(t){t.forEach(a)}function l(t){t.forEach(u)}for(var h in t)o(t[h]);return r>=e&&i>=n?[e,n,r,i]:void 0}(t=To(t)),r=function(t){var e,n,r,i,o=t.coordinates,s=t.lines,a=t.rings,u=s.length+a.length;for(delete t.lines,delete t.rings,r=0,i=s.length;r<i;++r)for(e=s[r];e=e.next;)++u;for(r=0,i=a.length;r<i;++r)for(n=a[r];n=n.next;)++u;var l=wo(2*u*1.4,Mo,bo),h=t.arcs=[];for(r=0,i=s.length;r<i;++r){e=s[r];do{c(e)}while(e=e.next)}for(r=0,i=a.length;r<i;++r)if((n=a[r]).next)do{c(n)}while(n=n.next);else f(n);function c(t){var e,n,r,i,s,a,u,c;if(r=l.get(e=o[t[0]]))for(u=0,c=r.length;u<c;++u)if(v(i=r[u],t))return t[0]=i[0],void(t[1]=i[1]);if(s=l.get(n=o[t[1]]))for(u=0,c=s.length;u<c;++u)if(g(a=s[u],t))return t[1]=a[0],void(t[0]=a[1]);r?r.push(t):l.set(e,[t]),s?s.push(t):l.set(n,[t]),h.push(t)}function f(t){var e,n,r,i,s;if(n=l.get(o[t[0]]))for(i=0,s=n.length;i<s;++i){if(d(r=n[i],t))return t[0]=r[0],void(t[1]=r[1]);if(p(r,t))return t[0]=r[1],void(t[1]=r[0])}if(n=l.get(e=o[t[0]+y(t)]))for(i=0,s=n.length;i<s;++i){if(d(r=n[i],t))return t[0]=r[0],void(t[1]=r[1]);if(p(r,t))return t[0]=r[1],void(t[1]=r[0])}n?n.push(t):l.set(e,[t]),h.push(t)}function v(t,e){var n=t[0],r=e[0],i=t[1];if(n-i!=r-e[1])return!1;for(;n<=i;++n,++r)if(!bo(o[n],o[r]))return!1;return!0}function g(t,e){var n=t[0],r=e[0],i=t[1],s=e[1];if(n-i!=r-s)return!1;for(;n<=i;++n,--s)if(!bo(o[n],o[s]))return!1;return!0}function d(t,e){var n=t[0],r=e[0],i=t[1]-n;if(i!==e[1]-r)return!1;for(var s=y(t),a=y(e),u=0;u<i;++u)if(!bo(o[n+(u+s)%i],o[r+(u+a)%i]))return!1;return!0}function p(t,e){var n=t[0],r=e[0],i=t[1],s=e[1],a=i-n;if(a!==s-r)return!1;for(var u=y(t),l=a-y(e),h=0;h<a;++h)if(!bo(o[n+(h+u)%a],o[s-(h+l)%a]))return!1;return!0}function y(t){for(var e=t[0],n=t[1],r=e,i=r,s=o[r];++r<n;){var a=o[r];(a[0]<s[0]||a[0]===s[0]&&a[1]<s[1])&&(i=r,s=a)}return i-e}return t}(function(t){var e,n,r,i=Lo(t),o=t.coordinates,s=t.lines,a=t.rings;for(n=0,r=s.length;n<r;++n)for(var u=s[n],l=u[0],h=u[1];++l<h;)i.has(o[l])&&(e={0:l,1:u[1]},u[1]=l,u=u.next=e);for(n=0,r=a.length;n<r;++n)for(var c=a[n],f=c[0],v=f,g=c[1],d=i.has(o[f]);++v<g;)i.has(o[v])&&(d?(e={0:v,1:c[1]},c[1]=v,c=c.next=e):(Po(o,f,g,g-v),o[g]=o[f],d=!0,v=f));return t}(function(t){var e=-1,n=[],r=[],i=[];function o(t){t&&ko.call(s,t.type)&&s[t.type](t)}var s={GeometryCollection:function(t){t.geometries.forEach(o)},LineString:function(t){t.arcs=a(t.arcs)},MultiLineString:function(t){t.arcs=t.arcs.map(a)},Polygon:function(t){t.arcs=t.arcs.map(u)},MultiPolygon:function(t){t.arcs=t.arcs.map(l)}};function a(t){for(var r=0,o=t.length;r<o;++r)i[++e]=t[r];var s={0:e-o+1,1:e};return n.push(s),s}function u(t){for(var n=0,o=t.length;n<o;++n)i[++e]=t[n];var s={0:e-o+1,1:e};return r.push(s),s}function l(t){return t.map(u)}for(var h in t)o(t[h]);return{type:"Topology",coordinates:i,lines:n,rings:r,objects:t}}(t))),i=r.coordinates,o=wo(1.4*r.arcs.length,Fo,qo);function s(t){t&&ko.call(a,t.type)&&a[t.type](t)}t=r.objects,r.bbox=n,r.arcs=r.arcs.map((function(t,e){return o.set(t,e),i.slice(t[0],t[1]+1)})),delete r.coordinates,i=null;var a={GeometryCollection:function(t){t.geometries.forEach(s)},LineString:function(t){t.arcs=u(t.arcs)},MultiLineString:function(t){t.arcs=t.arcs.map(u)},Polygon:function(t){t.arcs=t.arcs.map(u)},MultiPolygon:function(t){t.arcs=t.arcs.map(l)}};function u(t){var e=[];do{var n=o.get(t);e.push(t[0]<t[1]?n:~n)}while(t=t.next);return e}function l(t){return t.map(u)}for(var h in t)s(t[h]);return r}function Fo(t){var e,n=t[0],r=t[1];return r<n&&(e=n,n=r,r=e),n+31*r}function qo(t,e){var n,r=t[0],i=t[1],o=e[0],s=e[1];return i<r&&(n=r,r=i,i=n),s<o&&(n=o,o=s,s=n),r===o&&i===s}function Go(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!Z(e=e||{}))throw new Error("options is invalid");var n=e.mutate;if("FeatureCollection"!==it(t))throw new Error("geojson must be a FeatureCollection");if(!t.features.length)throw new Error("geojson is empty");!1!==n&&void 0!==n||(t=Xi(t));var r=[],i=It(t,(function(t,e){var n=function(t,e){var n,r=t.geometry.coordinates,i=e.geometry.coordinates,o=Yo(r[0]),s=Yo(r[r.length-1]),a=Yo(i[0]),u=Yo(i[i.length-1]);if(o===u)n=i.concat(r.slice(1));else if(a===s)n=r.concat(i.slice(1));else if(o===a)n=r.slice(1).reverse().concat(i);else{if(s!==u)return null;n=r.concat(i.reverse().slice(1))}return L(n)}(t,e);return n||(r.push(t),e)}));return i&&r.push(i),r.length?1===r.length?r[0]:T(r.map((function(t){return t.coordinates}))):null}function Yo(t){return t[0].toString()+","+t[1].toString()}function Bo(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!Z(e=e||{}))throw new Error("options is invalid");var n=e.mutate;if("FeatureCollection"!==it(t))throw new Error("geojson must be a FeatureCollection");if(!t.features.length)throw new Error("geojson is empty");!1!==n&&void 0!==n||(t=Xi(t));var r=function(t){var e={};xt(t,(function(t){e[t.geometry.type]=!0}));var n=Object.keys(e);if(1===n.length)return n[0];return null}(t);if(!r)throw new Error("geojson must be homogenous");var i=t;switch(r){case"LineString":return Go(i,e);case"Polygon":return function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if("FeatureCollection"!==it(t))throw new Error("geojson must be a FeatureCollection");if(!t.features.length)throw new Error("geojson is empty");!1!==e.mutate&&void 0!==e.mutate||(t=Xi(t));var n=[];xt(t,(function(t){n.push(t.geometry)}));var r=Do({geoms:A(n).geometry});return xo(r,r.objects.geoms.geometries)}(i,e);default:throw new Error(r+" is not supported")}}var zo=/^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,jo=Math.ceil,Xo=Math.floor,Uo="[BigNumber Error] ",Vo=Uo+"Number primitive has more than 15 significant digits: ",Zo=1e14,Ho=14,Wo=9007199254740991,Jo=[1,10,100,1e3,1e4,1e5,1e6,1e7,1e8,1e9,1e10,1e11,1e12,1e13],Ko=1e7,Qo=1e9;function $o(t){var e=0|t;return t>0||t===e?e:e-1}function ts(t){for(var e,n,r=1,i=t.length,o=t[0]+"";r<i;){for(e=t[r++]+"",n=Ho-e.length;n--;e="0"+e);o+=e}for(i=o.length;48===o.charCodeAt(--i););return o.slice(0,i+1||1)}function es(t,e){var n,r,i=t.c,o=e.c,s=t.s,a=e.s,u=t.e,l=e.e;if(!s||!a)return null;if(n=i&&!i[0],r=o&&!o[0],n||r)return n?r?0:-a:s;if(s!=a)return s;if(n=s<0,r=u==l,!i||!o)return r?0:!i^n?1:-1;if(!r)return u>l^n?1:-1;for(a=(u=i.length)<(l=o.length)?u:l,s=0;s<a;s++)if(i[s]!=o[s])return i[s]>o[s]^n?1:-1;return u==l?0:u>l^n?1:-1}function ns(t,e,n,r){if(t<e||t>n||t!==Xo(t))throw Error(Uo+(r||"Argument")+("number"==typeof t?t<e||t>n?" out of range: ":" not an integer: ":" not a primitive number: ")+String(t))}function rs(t){var e=t.c.length-1;return $o(t.e/Ho)==e&&t.c[e]%2!=0}function is(t,e){return(t.length>1?t.charAt(0)+"."+t.slice(1):t)+(e<0?"e":"e+")+e}function os(t,e,n){var r,i;if(e<0){for(i=n+".";++e;i+=n);t=i+t}else if(++e>(r=t.length)){for(i=n,e-=r;--e;i+=n);t+=i}else e<r&&(t=t.slice(0,e)+"."+t.slice(e));return t}var ss=function t(e){var n,r,i,o,s,a,u,l,h,c,f=S.prototype={constructor:S,toString:null,valueOf:null},v=new S(1),g=20,d=4,p=-7,y=21,_=-1e7,x=1e7,E=!1,k=1,w=0,b={prefix:"",groupSize:3,secondaryGroupSize:0,groupSeparator:",",decimalSeparator:".",fractionGroupSize:0,fractionGroupSeparator:" ",suffix:""},I="0123456789abcdefghijklmnopqrstuvwxyz",N=!0;function S(t,e){var n,o,s,a,u,l,h,c,f=this;if(!(f instanceof S))return new S(t,e);if(null==e){if(t&&!0===t._isBigNumber)return f.s=t.s,void(!t.c||t.e>x?f.c=f.e=null:t.e<_?f.c=[f.e=0]:(f.e=t.e,f.c=t.c.slice()));if((l="number"==typeof t)&&0*t==0){if(f.s=1/t<0?(t=-t,-1):1,t===~~t){for(a=0,u=t;u>=10;u/=10,a++);return void(a>x?f.c=f.e=null:(f.e=a,f.c=[t]))}c=String(t)}else{if(!zo.test(c=String(t)))return i(f,c,l);f.s=45==c.charCodeAt(0)?(c=c.slice(1),-1):1}(a=c.indexOf("."))>-1&&(c=c.replace(".","")),(u=c.search(/e/i))>0?(a<0&&(a=u),a+=+c.slice(u+1),c=c.substring(0,u)):a<0&&(a=c.length)}else{if(ns(e,2,I.length,"Base"),10==e&&N)return C(f=new S(t),g+f.e+1,d);if(c=String(t),l="number"==typeof t){if(0*t!=0)return i(f,c,l,e);if(f.s=1/t<0?(c=c.slice(1),-1):1,S.DEBUG&&c.replace(/^0\.0*|\./,"").length>15)throw Error(Vo+t)}else f.s=45===c.charCodeAt(0)?(c=c.slice(1),-1):1;for(n=I.slice(0,e),a=u=0,h=c.length;u<h;u++)if(n.indexOf(o=c.charAt(u))<0){if("."==o){if(u>a){a=h;continue}}else if(!s&&(c==c.toUpperCase()&&(c=c.toLowerCase())||c==c.toLowerCase()&&(c=c.toUpperCase()))){s=!0,u=-1,a=0;continue}return i(f,String(t),l,e)}l=!1,(a=(c=r(c,e,10,f.s)).indexOf("."))>-1?c=c.replace(".",""):a=c.length}for(u=0;48===c.charCodeAt(u);u++);for(h=c.length;48===c.charCodeAt(--h););if(c=c.slice(u,++h)){if(h-=u,l&&S.DEBUG&&h>15&&(t>Wo||t!==Xo(t)))throw Error(Vo+f.s*t);if((a=a-u-1)>x)f.c=f.e=null;else if(a<_)f.c=[f.e=0];else{if(f.e=a,f.c=[],u=(a+1)%Ho,a<0&&(u+=Ho),u<h){for(u&&f.c.push(+c.slice(0,u)),h-=Ho;u<h;)f.c.push(+c.slice(u,u+=Ho));u=Ho-(c=c.slice(u)).length}else u-=h;for(;u--;c+="0");f.c.push(+c)}}else f.c=[f.e=0]}function M(t,e,n,r){var i,o,s,a,u;if(null==n?n=d:ns(n,0,8),!t.c)return t.toString();if(i=t.c[0],s=t.e,null==e)u=ts(t.c),u=1==r||2==r&&(s<=p||s>=y)?is(u,s):os(u,s,"0");else if(o=(t=C(new S(t),e,n)).e,a=(u=ts(t.c)).length,1==r||2==r&&(e<=o||o<=p)){for(;a<e;u+="0",a++);u=is(u,o)}else if(e-=s,u=os(u,o,"0"),o+1>a){if(--e>0)for(u+=".";e--;u+="0");}else if((e+=o-a)>0)for(o+1==a&&(u+=".");e--;u+="0");return t.s<0&&i?"-"+u:u}function L(t,e){for(var n,r,i=1,o=new S(t[0]);i<t.length;i++)(!(r=new S(t[i])).s||(n=es(o,r))===e||0===n&&o.s===e)&&(o=r);return o}function P(t,e,n){for(var r=1,i=e.length;!e[--i];e.pop());for(i=e[0];i>=10;i/=10,r++);return(n=r+n*Ho-1)>x?t.c=t.e=null:n<_?t.c=[t.e=0]:(t.e=n,t.c=e),t}function C(t,e,n,r){var i,o,s,a,u,l,h,c=t.c,f=Jo;if(c){t:{for(i=1,a=c[0];a>=10;a/=10,i++);if((o=e-i)<0)o+=Ho,s=e,u=c[l=0],h=Xo(u/f[i-s-1]%10);else if((l=jo((o+1)/Ho))>=c.length){if(!r)break t;for(;c.length<=l;c.push(0));u=h=0,i=1,s=(o%=Ho)-Ho+1}else{for(u=a=c[l],i=1;a>=10;a/=10,i++);h=(s=(o%=Ho)-Ho+i)<0?0:Xo(u/f[i-s-1]%10)}if(r=r||e<0||null!=c[l+1]||(s<0?u:u%f[i-s-1]),r=n<4?(h||r)&&(0==n||n==(t.s<0?3:2)):h>5||5==h&&(4==n||r||6==n&&(o>0?s>0?u/f[i-s]:0:c[l-1])%10&1||n==(t.s<0?8:7)),e<1||!c[0])return c.length=0,r?(e-=t.e+1,c[0]=f[(Ho-e%Ho)%Ho],t.e=-e||0):c[0]=t.e=0,t;if(0==o?(c.length=l,a=1,l--):(c.length=l+1,a=f[Ho-o],c[l]=s>0?Xo(u/f[i-s]%f[s])*a:0),r)for(;;){if(0==l){for(o=1,s=c[0];s>=10;s/=10,o++);for(s=c[0]+=a,a=1;s>=10;s/=10,a++);o!=a&&(t.e++,c[0]==Zo&&(c[0]=1));break}if(c[l]+=a,c[l]!=Zo)break;c[l--]=0,a=1}for(o=c.length;0===c[--o];c.pop());}t.e>x?t.c=t.e=null:t.e<_&&(t.c=[t.e=0])}return t}function T(t){var e,n=t.e;return null===n?t.toString():(e=ts(t.c),e=n<=p||n>=y?is(e,n):os(e,n,"0"),t.s<0?"-"+e:e)}return S.clone=t,S.ROUND_UP=0,S.ROUND_DOWN=1,S.ROUND_CEIL=2,S.ROUND_FLOOR=3,S.ROUND_HALF_UP=4,S.ROUND_HALF_DOWN=5,S.ROUND_HALF_EVEN=6,S.ROUND_HALF_CEIL=7,S.ROUND_HALF_FLOOR=8,S.EUCLID=9,S.config=S.set=function(t){var e,n;if(null!=t){if("object"!=m(t))throw Error(Uo+"Object expected: "+t);if(t.hasOwnProperty(e="DECIMAL_PLACES")&&(ns(n=t[e],0,Qo,e),g=n),t.hasOwnProperty(e="ROUNDING_MODE")&&(ns(n=t[e],0,8,e),d=n),t.hasOwnProperty(e="EXPONENTIAL_AT")&&((n=t[e])&&n.pop?(ns(n[0],-1e9,0,e),ns(n[1],0,Qo,e),p=n[0],y=n[1]):(ns(n,-1e9,Qo,e),p=-(y=n<0?-n:n))),t.hasOwnProperty(e="RANGE"))if((n=t[e])&&n.pop)ns(n[0],-1e9,-1,e),ns(n[1],1,Qo,e),_=n[0],x=n[1];else{if(ns(n,-1e9,Qo,e),!n)throw Error(Uo+e+" cannot be zero: "+n);_=-(x=n<0?-n:n)}if(t.hasOwnProperty(e="CRYPTO")){if((n=t[e])!==!!n)throw Error(Uo+e+" not true or false: "+n);if(n){if("undefined"==typeof crypto||!crypto||!crypto.getRandomValues&&!crypto.randomBytes)throw E=!n,Error(Uo+"crypto unavailable");E=n}else E=n}if(t.hasOwnProperty(e="MODULO_MODE")&&(ns(n=t[e],0,9,e),k=n),t.hasOwnProperty(e="POW_PRECISION")&&(ns(n=t[e],0,Qo,e),w=n),t.hasOwnProperty(e="FORMAT")){if("object"!=m(n=t[e]))throw Error(Uo+e+" not an object: "+n);b=n}if(t.hasOwnProperty(e="ALPHABET")){if("string"!=typeof(n=t[e])||/^.?$|[+\-.\s]|(.).*\1/.test(n))throw Error(Uo+e+" invalid: "+n);N="0123456789"==n.slice(0,10),I=n}}return{DECIMAL_PLACES:g,ROUNDING_MODE:d,EXPONENTIAL_AT:[p,y],RANGE:[_,x],CRYPTO:E,MODULO_MODE:k,POW_PRECISION:w,FORMAT:b,ALPHABET:I}},S.isBigNumber=function(t){if(!t||!0!==t._isBigNumber)return!1;if(!S.DEBUG)return!0;var e,n,r=t.c,i=t.e,o=t.s;t:if("[object Array]"=={}.toString.call(r)){if((1===o||-1===o)&&i>=-1e9&&i<=Qo&&i===Xo(i)){if(0===r[0]){if(0===i&&1===r.length)return!0;break t}if((e=(i+1)%Ho)<1&&(e+=Ho),String(r[0]).length==e){for(e=0;e<r.length;e++)if((n=r[e])<0||n>=Zo||n!==Xo(n))break t;if(0!==n)return!0}}}else if(null===r&&null===i&&(null===o||1===o||-1===o))return!0;throw Error(Uo+"Invalid BigNumber: "+t)},S.maximum=S.max=function(){return L(arguments,-1)},S.minimum=S.min=function(){return L(arguments,1)},S.random=(o=9007199254740992,s=Math.random()*o&2097151?function(){return Xo(Math.random()*o)}:function(){return 8388608*(1073741824*Math.random()|0)+(8388608*Math.random()|0)},function(t){var e,n,r,i,o,a=0,u=[],l=new S(v);if(null==t?t=g:ns(t,0,Qo),i=jo(t/Ho),E)if(crypto.getRandomValues){for(e=crypto.getRandomValues(new Uint32Array(i*=2));a<i;)(o=131072*e[a]+(e[a+1]>>>11))>=9e15?(n=crypto.getRandomValues(new Uint32Array(2)),e[a]=n[0],e[a+1]=n[1]):(u.push(o%1e14),a+=2);a=i/2}else{if(!crypto.randomBytes)throw E=!1,Error(Uo+"crypto unavailable");for(e=crypto.randomBytes(i*=7);a<i;)(o=281474976710656*(31&e[a])+1099511627776*e[a+1]+4294967296*e[a+2]+16777216*e[a+3]+(e[a+4]<<16)+(e[a+5]<<8)+e[a+6])>=9e15?crypto.randomBytes(7).copy(e,a):(u.push(o%1e14),a+=7);a=i/7}if(!E)for(;a<i;)(o=s())<9e15&&(u[a++]=o%1e14);for(i=u[--a],t%=Ho,i&&t&&(o=Jo[Ho-t],u[a]=Xo(i/o)*o);0===u[a];u.pop(),a--);if(a<0)u=[r=0];else{for(r=-1;0===u[0];u.splice(0,1),r-=Ho);for(a=1,o=u[0];o>=10;o/=10,a++);a<Ho&&(r-=Ho-a)}return l.e=r,l.c=u,l}),S.sum=function(){for(var t=1,e=arguments,n=new S(e[0]);t<e.length;)n=n.plus(e[t++]);return n},r=function(){var t="0123456789";function e(t,e,n,r){for(var i,o,s=[0],a=0,u=t.length;a<u;){for(o=s.length;o--;s[o]*=e);for(s[0]+=r.indexOf(t.charAt(a++)),i=0;i<s.length;i++)s[i]>n-1&&(null==s[i+1]&&(s[i+1]=0),s[i+1]+=s[i]/n|0,s[i]%=n)}return s.reverse()}return function(r,i,o,s,a){var u,l,h,c,f,v,p,y,m=r.indexOf("."),_=g,x=d;for(m>=0&&(c=w,w=0,r=r.replace(".",""),v=(y=new S(i)).pow(r.length-m),w=c,y.c=e(os(ts(v.c),v.e,"0"),10,o,t),y.e=y.c.length),h=c=(p=e(r,i,o,a?(u=I,t):(u=t,I))).length;0==p[--c];p.pop());if(!p[0])return u.charAt(0);if(m<0?--h:(v.c=p,v.e=h,v.s=s,p=(v=n(v,y,_,x,o)).c,f=v.r,h=v.e),m=p[l=h+_+1],c=o/2,f=f||l<0||null!=p[l+1],f=x<4?(null!=m||f)&&(0==x||x==(v.s<0?3:2)):m>c||m==c&&(4==x||f||6==x&&1&p[l-1]||x==(v.s<0?8:7)),l<1||!p[0])r=f?os(u.charAt(1),-_,u.charAt(0)):u.charAt(0);else{if(p.length=l,f)for(--o;++p[--l]>o;)p[l]=0,l||(++h,p=[1].concat(p));for(c=p.length;!p[--c];);for(m=0,r="";m<=c;r+=u.charAt(p[m++]));r=os(r,h,u.charAt(0))}return r}}(),n=function(){function t(t,e,n){var r,i,o,s,a=0,u=t.length,l=e%Ko,h=e/Ko|0;for(t=t.slice();u--;)a=((i=l*(o=t[u]%Ko)+(r=h*o+(s=t[u]/Ko|0)*l)%Ko*Ko+a)/n|0)+(r/Ko|0)+h*s,t[u]=i%n;return a&&(t=[a].concat(t)),t}function e(t,e,n,r){var i,o;if(n!=r)o=n>r?1:-1;else for(i=o=0;i<n;i++)if(t[i]!=e[i]){o=t[i]>e[i]?1:-1;break}return o}function n(t,e,n,r){for(var i=0;n--;)t[n]-=i,i=t[n]<e[n]?1:0,t[n]=i*r+t[n]-e[n];for(;!t[0]&&t.length>1;t.splice(0,1));}return function(r,i,o,s,a){var u,l,h,c,f,v,g,d,p,y,m,_,x,E,k,w,b,I=r.s==i.s?1:-1,N=r.c,M=i.c;if(!(N&&N[0]&&M&&M[0]))return new S(r.s&&i.s&&(N?!M||N[0]!=M[0]:M)?N&&0==N[0]||!M?0*I:I/0:NaN);for(p=(d=new S(I)).c=[],I=o+(l=r.e-i.e)+1,a||(a=Zo,l=$o(r.e/Ho)-$o(i.e/Ho),I=I/Ho|0),h=0;M[h]==(N[h]||0);h++);if(M[h]>(N[h]||0)&&l--,I<0)p.push(1),c=!0;else{for(E=N.length,w=M.length,h=0,I+=2,(f=Xo(a/(M[0]+1)))>1&&(M=t(M,f,a),N=t(N,f,a),w=M.length,E=N.length),x=w,m=(y=N.slice(0,w)).length;m<w;y[m++]=0);b=M.slice(),b=[0].concat(b),k=M[0],M[1]>=a/2&&k++;do{if(f=0,(u=e(M,y,w,m))<0){if(_=y[0],w!=m&&(_=_*a+(y[1]||0)),(f=Xo(_/k))>1)for(f>=a&&(f=a-1),g=(v=t(M,f,a)).length,m=y.length;1==e(v,y,g,m);)f--,n(v,w<g?b:M,g,a),g=v.length,u=1;else 0==f&&(u=f=1),g=(v=M.slice()).length;if(g<m&&(v=[0].concat(v)),n(y,v,m,a),m=y.length,-1==u)for(;e(M,y,w,m)<1;)f++,n(y,w<m?b:M,m,a),m=y.length}else 0===u&&(f++,y=[0]);p[h++]=f,y[0]?y[m++]=N[x]||0:(y=[N[x]],m=1)}while((x++<E||null!=y[0])&&I--);c=null!=y[0],p[0]||p.splice(0,1)}if(a==Zo){for(h=1,I=p[0];I>=10;I/=10,h++);C(d,o+(d.e=h+l*Ho-1)+1,s,c)}else d.e=l,d.r=+c;return d}}(),a=/^(-?)0([xbo])(?=\w[\w.]*$)/i,u=/^([^.]+)\.$/,l=/^\.([^.]+)$/,h=/^-?(Infinity|NaN)$/,c=/^\s*\+(?=[\w.])|^\s+|\s+$/g,i=function(t,e,n,r){var i,o=n?e:e.replace(c,"");if(h.test(o))t.s=isNaN(o)?null:o<0?-1:1;else{if(!n&&(o=o.replace(a,(function(t,e,n){return i="x"==(n=n.toLowerCase())?16:"b"==n?2:8,r&&r!=i?t:e})),r&&(i=r,o=o.replace(u,"$1").replace(l,"0.$1")),e!=o))return new S(o,i);if(S.DEBUG)throw Error(Uo+"Not a"+(r?" base "+r:"")+" number: "+e);t.s=null}t.c=t.e=null},f.absoluteValue=f.abs=function(){var t=new S(this);return t.s<0&&(t.s=1),t},f.comparedTo=function(t,e){return es(this,new S(t,e))},f.decimalPlaces=f.dp=function(t,e){var n,r,i,o=this;if(null!=t)return ns(t,0,Qo),null==e?e=d:ns(e,0,8),C(new S(o),t+o.e+1,e);if(!(n=o.c))return null;if(r=((i=n.length-1)-$o(this.e/Ho))*Ho,i=n[i])for(;i%10==0;i/=10,r--);return r<0&&(r=0),r},f.dividedBy=f.div=function(t,e){return n(this,new S(t,e),g,d)},f.dividedToIntegerBy=f.idiv=function(t,e){return n(this,new S(t,e),0,1)},f.exponentiatedBy=f.pow=function(t,e){var n,r,i,o,s,a,u,l,h=this;if((t=new S(t)).c&&!t.isInteger())throw Error(Uo+"Exponent not an integer: "+T(t));if(null!=e&&(e=new S(e)),s=t.e>14,!h.c||!h.c[0]||1==h.c[0]&&!h.e&&1==h.c.length||!t.c||!t.c[0])return l=new S(Math.pow(+T(h),s?t.s*(2-rs(t)):+T(t))),e?l.mod(e):l;if(a=t.s<0,e){if(e.c?!e.c[0]:!e.s)return new S(NaN);(r=!a&&h.isInteger()&&e.isInteger())&&(h=h.mod(e))}else{if(t.e>9&&(h.e>0||h.e<-1||(0==h.e?h.c[0]>1||s&&h.c[1]>=24e7:h.c[0]<8e13||s&&h.c[0]<=9999975e7)))return o=h.s<0&&rs(t)?-0:0,h.e>-1&&(o=1/o),new S(a?1/o:o);w&&(o=jo(w/Ho+2))}for(s?(n=new S(.5),a&&(t.s=1),u=rs(t)):u=(i=Math.abs(+T(t)))%2,l=new S(v);;){if(u){if(!(l=l.times(h)).c)break;o?l.c.length>o&&(l.c.length=o):r&&(l=l.mod(e))}if(i){if(0===(i=Xo(i/2)))break;u=i%2}else if(C(t=t.times(n),t.e+1,1),t.e>14)u=rs(t);else{if(0===(i=+T(t)))break;u=i%2}h=h.times(h),o?h.c&&h.c.length>o&&(h.c.length=o):r&&(h=h.mod(e))}return r?l:(a&&(l=v.div(l)),e?l.mod(e):o?C(l,w,d,undefined):l)},f.integerValue=function(t){var e=new S(this);return null==t?t=d:ns(t,0,8),C(e,e.e+1,t)},f.isEqualTo=f.eq=function(t,e){return 0===es(this,new S(t,e))},f.isFinite=function(){return!!this.c},f.isGreaterThan=f.gt=function(t,e){return es(this,new S(t,e))>0},f.isGreaterThanOrEqualTo=f.gte=function(t,e){return 1===(e=es(this,new S(t,e)))||0===e},f.isInteger=function(){return!!this.c&&$o(this.e/Ho)>this.c.length-2},f.isLessThan=f.lt=function(t,e){return es(this,new S(t,e))<0},f.isLessThanOrEqualTo=f.lte=function(t,e){return-1===(e=es(this,new S(t,e)))||0===e},f.isNaN=function(){return!this.s},f.isNegative=function(){return this.s<0},f.isPositive=function(){return this.s>0},f.isZero=function(){return!!this.c&&0==this.c[0]},f.minus=function(t,e){var n,r,i,o,s=this,a=s.s;if(e=(t=new S(t,e)).s,!a||!e)return new S(NaN);if(a!=e)return t.s=-e,s.plus(t);var u=s.e/Ho,l=t.e/Ho,h=s.c,c=t.c;if(!u||!l){if(!h||!c)return h?(t.s=-e,t):new S(c?s:NaN);if(!h[0]||!c[0])return c[0]?(t.s=-e,t):new S(h[0]?s:3==d?-0:0)}if(u=$o(u),l=$o(l),h=h.slice(),a=u-l){for((o=a<0)?(a=-a,i=h):(l=u,i=c),i.reverse(),e=a;e--;i.push(0));i.reverse()}else for(r=(o=(a=h.length)<(e=c.length))?a:e,a=e=0;e<r;e++)if(h[e]!=c[e]){o=h[e]<c[e];break}if(o&&(i=h,h=c,c=i,t.s=-t.s),(e=(r=c.length)-(n=h.length))>0)for(;e--;h[n++]=0);for(e=Zo-1;r>a;){if(h[--r]<c[r]){for(n=r;n&&!h[--n];h[n]=e);--h[n],h[r]+=Zo}h[r]-=c[r]}for(;0==h[0];h.splice(0,1),--l);return h[0]?P(t,h,l):(t.s=3==d?-1:1,t.c=[t.e=0],t)},f.modulo=f.mod=function(t,e){var r,i,o=this;return t=new S(t,e),!o.c||!t.s||t.c&&!t.c[0]?new S(NaN):!t.c||o.c&&!o.c[0]?new S(o):(9==k?(i=t.s,t.s=1,r=n(o,t,0,3),t.s=i,r.s*=i):r=n(o,t,0,k),(t=o.minus(r.times(t))).c[0]||1!=k||(t.s=o.s),t)},f.multipliedBy=f.times=function(t,e){var n,r,i,o,s,a,u,l,h,c,f,v,g,d,p,y=this,m=y.c,_=(t=new S(t,e)).c;if(!(m&&_&&m[0]&&_[0]))return!y.s||!t.s||m&&!m[0]&&!_||_&&!_[0]&&!m?t.c=t.e=t.s=null:(t.s*=y.s,m&&_?(t.c=[0],t.e=0):t.c=t.e=null),t;for(r=$o(y.e/Ho)+$o(t.e/Ho),t.s*=y.s,(u=m.length)<(c=_.length)&&(g=m,m=_,_=g,i=u,u=c,c=i),i=u+c,g=[];i--;g.push(0));for(d=Zo,p=Ko,i=c;--i>=0;){for(n=0,f=_[i]%p,v=_[i]/p|0,o=i+(s=u);o>i;)n=((l=f*(l=m[--s]%p)+(a=v*l+(h=m[s]/p|0)*f)%p*p+g[o]+n)/d|0)+(a/p|0)+v*h,g[o--]=l%d;g[o]=n}return n?++r:g.splice(0,1),P(t,g,r)},f.negated=function(){var t=new S(this);return t.s=-t.s||null,t},f.plus=function(t,e){var n,r=this,i=r.s;if(e=(t=new S(t,e)).s,!i||!e)return new S(NaN);if(i!=e)return t.s=-e,r.minus(t);var o=r.e/Ho,s=t.e/Ho,a=r.c,u=t.c;if(!o||!s){if(!a||!u)return new S(i/0);if(!a[0]||!u[0])return u[0]?t:new S(a[0]?r:0*i)}if(o=$o(o),s=$o(s),a=a.slice(),i=o-s){for(i>0?(s=o,n=u):(i=-i,n=a),n.reverse();i--;n.push(0));n.reverse()}for((i=a.length)-(e=u.length)<0&&(n=u,u=a,a=n,e=i),i=0;e;)i=(a[--e]=a[e]+u[e]+i)/Zo|0,a[e]=Zo===a[e]?0:a[e]%Zo;return i&&(a=[i].concat(a),++s),P(t,a,s)},f.precision=f.sd=function(t,e){var n,r,i,o=this;if(null!=t&&t!==!!t)return ns(t,1,Qo),null==e?e=d:ns(e,0,8),C(new S(o),t,e);if(!(n=o.c))return null;if(r=(i=n.length-1)*Ho+1,i=n[i]){for(;i%10==0;i/=10,r--);for(i=n[0];i>=10;i/=10,r++);}return t&&o.e+1>r&&(r=o.e+1),r},f.shiftedBy=function(t){return ns(t,-9007199254740991,Wo),this.times("1e"+t)},f.squareRoot=f.sqrt=function(){var t,e,r,i,o,s=this,a=s.c,u=s.s,l=s.e,h=g+4,c=new S("0.5");if(1!==u||!a||!a[0])return new S(!u||u<0&&(!a||a[0])?NaN:a?s:1/0);if(0==(u=Math.sqrt(+T(s)))||u==1/0?(((e=ts(a)).length+l)%2==0&&(e+="0"),u=Math.sqrt(+e),l=$o((l+1)/2)-(l<0||l%2),r=new S(e=u==1/0?"5e"+l:(e=u.toExponential()).slice(0,e.indexOf("e")+1)+l)):r=new S(u+""),r.c[0])for((u=(l=r.e)+h)<3&&(u=0);;)if(o=r,r=c.times(o.plus(n(s,o,h,1))),ts(o.c).slice(0,u)===(e=ts(r.c)).slice(0,u)){if(r.e<l&&--u,"9999"!=(e=e.slice(u-3,u+1))&&(i||"4999"!=e)){+e&&(+e.slice(1)||"5"!=e.charAt(0))||(C(r,r.e+g+2,1),t=!r.times(r).eq(s));break}if(!i&&(C(o,o.e+g+2,0),o.times(o).eq(s))){r=o;break}h+=4,u+=4,i=1}return C(r,r.e+g+1,d,t)},f.toExponential=function(t,e){return null!=t&&(ns(t,0,Qo),t++),M(this,t,e,1)},f.toFixed=function(t,e){return null!=t&&(ns(t,0,Qo),t=t+this.e+1),M(this,t,e)},f.toFormat=function(t,e,n){var r,i=this;if(null==n)null!=t&&e&&"object"==m(e)?(n=e,e=null):t&&"object"==m(t)?(n=t,t=e=null):n=b;else if("object"!=m(n))throw Error(Uo+"Argument not an object: "+n);if(r=i.toFixed(t,e),i.c){var o,s=r.split("."),a=+n.groupSize,u=+n.secondaryGroupSize,l=n.groupSeparator||"",h=s[0],c=s[1],f=i.s<0,v=f?h.slice(1):h,g=v.length;if(u&&(o=a,a=u,u=o,g-=o),a>0&&g>0){for(o=g%a||a,h=v.substr(0,o);o<g;o+=a)h+=l+v.substr(o,a);u>0&&(h+=l+v.slice(o)),f&&(h="-"+h)}r=c?h+(n.decimalSeparator||"")+((u=+n.fractionGroupSize)?c.replace(new RegExp("\\d{"+u+"}\\B","g"),"$&"+(n.fractionGroupSeparator||"")):c):h}return(n.prefix||"")+r+(n.suffix||"")},f.toFraction=function(t){var e,r,i,o,s,a,u,l,h,c,f,g,p=this,y=p.c;if(null!=t&&(!(u=new S(t)).isInteger()&&(u.c||1!==u.s)||u.lt(v)))throw Error(Uo+"Argument "+(u.isInteger()?"out of range: ":"not an integer: ")+T(u));if(!y)return new S(p);for(e=new S(v),h=r=new S(v),i=l=new S(v),g=ts(y),s=e.e=g.length-p.e-1,e.c[0]=Jo[(a=s%Ho)<0?Ho+a:a],t=!t||u.comparedTo(e)>0?s>0?e:h:u,a=x,x=1/0,u=new S(g),l.c[0]=0;c=n(u,e,0,1),1!=(o=r.plus(c.times(i))).comparedTo(t);)r=i,i=o,h=l.plus(c.times(o=h)),l=o,e=u.minus(c.times(o=e)),u=o;return o=n(t.minus(r),i,0,1),l=l.plus(o.times(h)),r=r.plus(o.times(i)),l.s=h.s=p.s,f=n(h,i,s*=2,d).minus(p).abs().comparedTo(n(l,r,s,d).minus(p).abs())<1?[h,i]:[l,r],x=a,f},f.toNumber=function(){return+T(this)},f.toPrecision=function(t,e){return null!=t&&ns(t,1,Qo),M(this,t,e,2)},f.toString=function(t){var e,n=this,i=n.s,o=n.e;return null===o?i?(e="Infinity",i<0&&(e="-"+e)):e="NaN":(null==t?e=o<=p||o>=y?is(ts(n.c),o):os(ts(n.c),o,"0"):10===t&&N?e=os(ts((n=C(new S(n),g+o+1,d)).c),n.e,"0"):(ns(t,2,I.length,"Base"),e=r(os(ts(n.c),o,"0"),10,t,i,!0)),i<0&&n.c[0]&&(e="-"+e)),e},f.valueOf=f.toJSON=function(){return T(this)},f._isBigNumber=!0,f[Symbol.toStringTag]="BigNumber",f[Symbol.for("nodejs.util.inspect.custom")]=f.valueOf,null!=e&&S.set(e),S}(),as=function(t){function e(t){return i(this,e),r(this,e,[t])}return h(e,t),s(e)}(s((function t(e){i(this,t),u(this,"key",void 0),u(this,"left",null),u(this,"right",null),this.key=e}))),us=function(){return s((function t(){i(this,t),u(this,"size",0),u(this,"modificationCount",0),u(this,"splayCount",0)}),[{key:"splay",value:function(t){var e=this.root;if(null==e)return this.compare(t,t),-1;for(var n,r=null,i=null,o=null,s=null,a=e,u=this.compare;;)if((n=u(a.key,t))>0){var l=a.left;if(null==l)break;if((n=u(l.key,t))>0&&(a.left=l.right,l.right=a,null==(l=(a=l).left)))break;null==r?i=a:r.left=a,r=a,a=l}else{if(!(n<0))break;var h=a.right;if(null==h)break;if((n=u(h.key,t))<0&&(a.right=h.left,h.left=a,null==(h=(a=h).right)))break;null==o?s=a:o.right=a,o=a,a=h}return null!=o&&(o.right=a.left,a.left=s),null!=r&&(r.left=a.right,a.right=i),this.root!==a&&(this.root=a,this.splayCount++),n}},{key:"splayMin",value:function(t){for(var e=t,n=e.left;null!=n;){var r=n;e.left=r.right,r.right=e,n=(e=r).left}return e}},{key:"splayMax",value:function(t){for(var e=t,n=e.right;null!=n;){var r=n;e.right=r.left,r.left=e,n=(e=r).right}return e}},{key:"_delete",value:function(t){if(null==this.root)return null;if(0!=this.splay(t))return null;var e=this.root,n=e,r=e.left;if(this.size--,null==r)this.root=e.right;else{var i=e.right;(e=this.splayMax(r)).right=i,this.root=e}return this.modificationCount++,n}},{key:"addNewRoot",value:function(t,e){this.size++,this.modificationCount++;var n=this.root;null!=n?(e<0?(t.left=n,t.right=n.right,n.right=null):(t.right=n,t.left=n.left,n.left=null),this.root=t):this.root=t}},{key:"_first",value:function(){var t=this.root;return null==t?null:(this.root=this.splayMin(t),this.root)}},{key:"_last",value:function(){var t=this.root;return null==t?null:(this.root=this.splayMax(t),this.root)}},{key:"clear",value:function(){this.root=null,this.size=0,this.modificationCount++}},{key:"has",value:function(t){return this.validKey(t)&&0==this.splay(t)}},{key:"defaultCompare",value:function(){return function(t,e){return t<e?-1:t>e?1:0}}},{key:"wrap",value:function(){var t=this;return{getRoot:function(){return t.root},setRoot:function(e){t.root=e},getSize:function(){return t.size},getModificationCount:function(){return t.modificationCount},getSplayCount:function(){return t.splayCount},setSplayCount:function(e){t.splayCount=e},splay:function(e){return t.splay(e)},has:function(e){return t.has(e)}}}}])}(),ls=function(t){function e(t,n){var o;return i(this,e),u(o=r(this,e),"root",null),u(o,"compare",void 0),u(o,"validKey",void 0),u(o,Symbol.toStringTag,"[object Set]"),o.compare=null!=t?t:o.defaultCompare(),o.validKey=null!=n?n:function(t){return null!=t&&null!=t},o}return h(e,t),s(e,[{key:"delete",value:function(t){return!!this.validKey(t)&&null!=this._delete(t)}},{key:"deleteAll",value:function(t){var e,n=a(t);try{for(n.s();!(e=n.n()).done;){var r=e.value;this.delete(r)}}catch(t){n.e(t)}finally{n.f()}}},{key:"forEach",value:function(t){for(var e,n=this[Symbol.iterator]();!(e=n.next()).done;)t(e.value,e.value,this)}},{key:"add",value:function(t){var e=this.splay(t);return 0!=e&&this.addNewRoot(new as(t),e),this}},{key:"addAndReturn",value:function(t){var e=this.splay(t);return 0!=e&&this.addNewRoot(new as(t),e),this.root.key}},{key:"addAll",value:function(t){var e,n=a(t);try{for(n.s();!(e=n.n()).done;){var r=e.value;this.add(r)}}catch(t){n.e(t)}finally{n.f()}}},{key:"isEmpty",value:function(){return null==this.root}},{key:"isNotEmpty",value:function(){return null!=this.root}},{key:"single",value:function(){if(0==this.size)throw"Bad state: No element";if(this.size>1)throw"Bad state: Too many element";return this.root.key}},{key:"first",value:function(){if(0==this.size)throw"Bad state: No element";return this._first().key}},{key:"last",value:function(){if(0==this.size)throw"Bad state: No element";return this._last().key}},{key:"lastBefore",value:function(t){if(null==t)throw"Invalid arguments(s)";if(null==this.root)return null;if(this.splay(t)<0)return this.root.key;var e=this.root.left;if(null==e)return null;for(var n=e.right;null!=n;)n=(e=n).right;return e.key}},{key:"firstAfter",value:function(t){if(null==t)throw"Invalid arguments(s)";if(null==this.root)return null;if(this.splay(t)>0)return this.root.key;var e=this.root.right;if(null==e)return null;for(var n=e.left;null!=n;)n=(e=n).left;return e.key}},{key:"retainAll",value:function(t){var n,r=new e(this.compare,this.validKey),i=this.modificationCount,o=a(t);try{for(o.s();!(n=o.n()).done;){var s=n.value;if(i!=this.modificationCount)throw"Concurrent modification during iteration.";this.validKey(s)&&0==this.splay(s)&&r.add(this.root.key)}}catch(t){o.e(t)}finally{o.f()}r.size!=this.size&&(this.root=r.root,this.size=r.size,this.modificationCount++)}},{key:"lookup",value:function(t){return this.validKey(t)?0!=this.splay(t)?null:this.root.key:null}},{key:"intersection",value:function(t){var n,r=new e(this.compare,this.validKey),i=a(this);try{for(i.s();!(n=i.n()).done;){var o=n.value;t.has(o)&&r.add(o)}}catch(t){i.e(t)}finally{i.f()}return r}},{key:"difference",value:function(t){var n,r=new e(this.compare,this.validKey),i=a(this);try{for(i.s();!(n=i.n()).done;){var o=n.value;t.has(o)||r.add(o)}}catch(t){i.e(t)}finally{i.f()}return r}},{key:"union",value:function(t){var e=this.clone();return e.addAll(t),e}},{key:"clone",value:function(){var t=new e(this.compare,this.validKey);return t.size=this.size,t.root=this.copyNode(this.root),t}},{key:"copyNode",value:function(t){if(null==t)return null;var e=new as(t.key);return function t(e,n){var r,i;do{if(r=e.left,i=e.right,null!=r){var o=new as(r.key);n.left=o,t(r,o)}if(null!=i){var s=new as(i.key);n.right=s,e=i,n=s}}while(null!=i)}(t,e),e}},{key:"toSet",value:function(){return this.clone()}},{key:"entries",value:function(){return new fs(this.wrap())}},{key:"keys",value:function(){return this[Symbol.iterator]()}},{key:"values",value:function(){return this[Symbol.iterator]()}},{key:Symbol.iterator,value:function(){return new cs(this.wrap())}}])}(us),hs=function(){return s((function t(e){i(this,t),u(this,"tree",void 0),u(this,"path",new Array),u(this,"modificationCount",null),u(this,"splayCount",void 0),this.tree=e,this.splayCount=e.getSplayCount()}),[{key:Symbol.iterator,value:function(){return this}},{key:"next",value:function(){return this.moveNext()?{done:!1,value:this.current()}:{done:!0,value:null}}},{key:"current",value:function(){if(!this.path.length)return null;var t=this.path[this.path.length-1];return this.getValue(t)}},{key:"rebuildPath",value:function(t){this.path.splice(0,this.path.length),this.tree.splay(t),this.path.push(this.tree.getRoot()),this.splayCount=this.tree.getSplayCount()}},{key:"findLeftMostDescendent",value:function(t){for(;null!=t;)this.path.push(t),t=t.left}},{key:"moveNext",value:function(){if(this.modificationCount!=this.tree.getModificationCount()){if(null==this.modificationCount){this.modificationCount=this.tree.getModificationCount();for(var t=this.tree.getRoot();null!=t;)this.path.push(t),t=t.left;return this.path.length>0}throw"Concurrent modification during iteration."}if(!this.path.length)return!1;this.splayCount!=this.tree.getSplayCount()&&this.rebuildPath(this.path[this.path.length-1].key);var e=this.path[this.path.length-1],n=e.right;if(null!=n){for(;null!=n;)this.path.push(n),n=n.left;return!0}for(this.path.pop();this.path.length&&this.path[this.path.length-1].right===e;)e=this.path.pop();return this.path.length>0}}])}(),cs=function(t){function e(){return i(this,e),r(this,e,arguments)}return h(e,t),s(e,[{key:"getValue",value:function(t){return t.key}}])}(hs),fs=function(t){function e(){return i(this,e),r(this,e,arguments)}return h(e,t),s(e,[{key:"getValue",value:function(t){return[t.key,t.key]}}])}(hs),vs=function(t){return function(){return t}},gs=function(t){var e=t?function(e,n){return n.minus(e).abs().isLessThanOrEqualTo(t)}:vs(!1);return function(t,n){return e(t,n)?0:t.comparedTo(n)}};function ds(t){var e=t?function(e,n,r,i,o){return e.exponentiatedBy(2).isLessThanOrEqualTo(i.minus(n).exponentiatedBy(2).plus(o.minus(r).exponentiatedBy(2)).times(t))}:vs(!1);return function(t,n,r){var i=t.x,o=t.y,s=r.x,a=r.y,u=o.minus(a).times(n.x.minus(s)).minus(i.minus(s).times(n.y.minus(a)));return e(u,i,o,s,a)?0:u.comparedTo(0)}}var ps=function(t){return t},ys=function(t){if(t){var e=new ls(gs(t)),n=new ls(gs(t)),r=function(t,e){return e.addAndReturn(t)},i=function(t){return{x:r(t.x,e),y:r(t.y,n)}};return i({x:new ss(0),y:new ss(0)}),i}return ps},ms=function(t){return{set:function(t){_s=ms(t)},reset:function(){return ms(t)},compare:gs(t),snap:ys(t),orient:ds(t)}},_s=ms(),xs=function(t,e){return t.ll.x.isLessThanOrEqualTo(e.x)&&e.x.isLessThanOrEqualTo(t.ur.x)&&t.ll.y.isLessThanOrEqualTo(e.y)&&e.y.isLessThanOrEqualTo(t.ur.y)},Es=function(t,e){if(e.ur.x.isLessThan(t.ll.x)||t.ur.x.isLessThan(e.ll.x)||e.ur.y.isLessThan(t.ll.y)||t.ur.y.isLessThan(e.ll.y))return null;var n=t.ll.x.isLessThan(e.ll.x)?e.ll.x:t.ll.x,r=t.ur.x.isLessThan(e.ur.x)?t.ur.x:e.ur.x;return{ll:{x:n,y:t.ll.y.isLessThan(e.ll.y)?e.ll.y:t.ll.y},ur:{x:r,y:t.ur.y.isLessThan(e.ur.y)?t.ur.y:e.ur.y}}},ks=function(t,e){return t.x.times(e.y).minus(t.y.times(e.x))},ws=function(t,e){return t.x.times(e.x).plus(t.y.times(e.y))},bs=function(t){return ws(t,t).sqrt()},Is=function(t,e,n){var r={x:e.x.minus(t.x),y:e.y.minus(t.y)},i={x:n.x.minus(t.x),y:n.y.minus(t.y)};return ws(i,r).div(bs(i)).div(bs(r))},Ns=function(t,e,n){return e.y.isZero()?null:{x:t.x.plus(e.x.div(e.y).times(n.minus(t.y))),y:n}},Ss=function(t,e,n){return e.x.isZero()?null:{x:n,y:t.y.plus(e.y.div(e.x).times(n.minus(t.x)))}},Ms=function(){function t(e,n){i(this,t),u(this,"point",void 0),u(this,"isLeft",void 0),u(this,"segment",void 0),u(this,"otherSE",void 0),u(this,"consumedBy",void 0),void 0===e.events?e.events=[this]:e.events.push(this),this.point=e,this.isLeft=n}return s(t,[{key:"link",value:function(t){if(t.point===this.point)throw new Error("Tried to link already linked events");for(var e=t.point.events,n=0,r=e.length;n<r;n++){var i=e[n];this.point.events.push(i),i.point=this.point}this.checkForConsuming()}},{key:"checkForConsuming",value:function(){for(var t=this.point.events.length,e=0;e<t;e++){var n=this.point.events[e];if(void 0===n.segment.consumedBy)for(var r=e+1;r<t;r++){var i=this.point.events[r];void 0===i.consumedBy&&(n.otherSE.point.events===i.otherSE.point.events&&n.segment.consume(i.segment))}}}},{key:"getAvailableLinkedEvents",value:function(){for(var t=[],e=0,n=this.point.events.length;e<n;e++){var r=this.point.events[e];r!==this&&!r.segment.ringOut&&r.segment.isInResult()&&t.push(r)}return t}},{key:"getLeftmostComparator",value:function(t){var e=this,n=new Map,r=function(r){var i,o,s,a,u,l=r.otherSE;n.set(r,{sine:(i=e.point,o=t.point,s=l.point,a={x:o.x.minus(i.x),y:o.y.minus(i.y)},u={x:s.x.minus(i.x),y:s.y.minus(i.y)},ks(u,a).div(bs(u)).div(bs(a))),cosine:Is(e.point,t.point,l.point)})};return function(t,e){n.has(t)||r(t),n.has(e)||r(e);var i=n.get(t),o=i.sine,s=i.cosine,a=n.get(e),u=a.sine,l=a.cosine;return o.isGreaterThanOrEqualTo(0)&&u.isGreaterThanOrEqualTo(0)?s.isLessThan(l)?1:s.isGreaterThan(l)?-1:0:o.isLessThan(0)&&u.isLessThan(0)?s.isLessThan(l)?-1:s.isGreaterThan(l)?1:0:u.isLessThan(o)?-1:u.isGreaterThan(o)?1:0}}}],[{key:"compare",value:function(e,n){var r=t.comparePoints(e.point,n.point);return 0!==r?r:(e.point!==n.point&&e.link(n),e.isLeft!==n.isLeft?e.isLeft?1:-1:Ds.compare(e.segment,n.segment))}},{key:"comparePoints",value:function(t,e){return t.x.isLessThan(e.x)?-1:t.x.isGreaterThan(e.x)?1:t.y.isLessThan(e.y)?-1:t.y.isGreaterThan(e.y)?1:0}}])}(),Ls=function(){function t(e){i(this,t),u(this,"events",void 0),u(this,"poly",void 0),u(this,"_isExteriorRing",void 0),u(this,"_enclosingRing",void 0),this.events=e;for(var n=0,r=e.length;n<r;n++)e[n].segment.ringOut=this;this.poly=null}return s(t,[{key:"getGeom",value:function(){for(var t=this.events[0].point,e=[t],n=1,r=this.events.length-1;n<r;n++){var i=this.events[n].point,o=this.events[n+1].point;0!==_s.orient(i,t,o)&&(e.push(i),t=i)}if(1===e.length)return null;var s=e[0],a=e[1];0===_s.orient(s,t,a)&&e.shift(),e.push(e[0]);for(var u=this.isExteriorRing()?1:-1,l=this.isExteriorRing()?0:e.length-1,h=this.isExteriorRing()?e.length:-1,c=[],f=l;f!=h;f+=u)c.push([e[f].x.toNumber(),e[f].y.toNumber()]);return c}},{key:"isExteriorRing",value:function(){if(void 0===this._isExteriorRing){var t=this.enclosingRing();this._isExteriorRing=!t||!t.isExteriorRing()}return this._isExteriorRing}},{key:"enclosingRing",value:function(){return void 0===this._enclosingRing&&(this._enclosingRing=this._calcEnclosingRing()),this._enclosingRing}},{key:"_calcEnclosingRing",value:function(){for(var t=this.events[0],e=1,n=this.events.length;e<n;e++){var r=this.events[e];Ms.compare(t,r)>0&&(t=r)}for(var i=t.segment.prevInResult(),o=i?i.prevInResult():null;;){if(!i)return null;if(!o)return i.ringOut;var s,a;if(o.ringOut!==i.ringOut)return(null===(s=o.ringOut)||void 0===s?void 0:s.enclosingRing())!==i.ringOut?i.ringOut:null===(a=i.ringOut)||void 0===a?void 0:a.enclosingRing();i=o.prevInResult(),o=i?i.prevInResult():null}}}],[{key:"factory",value:function(e){for(var n=[],r=0,i=e.length;r<i;r++){var o=e[r];if(o.isInResult()&&!o.ringOut){for(var s=null,a=o.leftSE,u=o.rightSE,l=[a],h=a.point,c=[];s=a,a=u,l.push(a),a.point!==h;)for(;;){var f=a.getAvailableLinkedEvents();if(0===f.length){var v=l[0].point,g=l[l.length-1].point;throw new Error("Unable to complete output ring starting at [".concat(v.x,", ").concat(v.y,"]. Last matching segment found ends at [").concat(g.x,", ").concat(g.y,"]."))}if(1===f.length){u=f[0].otherSE;break}for(var d=null,p=0,y=c.length;p<y;p++)if(c[p].point===a.point){d=p;break}if(null===d){c.push({index:l.length,point:a.point});var m=a.getLeftmostComparator(s);u=f.sort(m)[0].otherSE;break}var _=c.splice(d)[0],x=l.splice(_.index);x.unshift(x[0].otherSE),n.push(new t(x.reverse()))}n.push(new t(l))}}return n}}])}(),Ps=function(){return s((function t(e){i(this,t),u(this,"exteriorRing",void 0),u(this,"interiorRings",void 0),this.exteriorRing=e,e.poly=this,this.interiorRings=[]}),[{key:"addInterior",value:function(t){this.interiorRings.push(t),t.poly=this}},{key:"getGeom",value:function(){var t=this.exteriorRing.getGeom();if(null===t)return null;for(var e=[t],n=0,r=this.interiorRings.length;n<r;n++){var i=this.interiorRings[n].getGeom();null!==i&&e.push(i)}return e}}])}(),Cs=function(){return s((function t(e){i(this,t),u(this,"rings",void 0),u(this,"polys",void 0),this.rings=e,this.polys=this._composePolys(e)}),[{key:"getGeom",value:function(){for(var t=[],e=0,n=this.polys.length;e<n;e++){var r=this.polys[e].getGeom();null!==r&&t.push(r)}return t}},{key:"_composePolys",value:function(t){for(var e=[],n=0,r=t.length;n<r;n++){var i=t[n];if(!i.poly)if(i.isExteriorRing())e.push(new Ps(i));else{var o,s=i.enclosingRing();null!=s&&s.poly||e.push(new Ps(s)),null==s||null===(o=s.poly)||void 0===o||o.addInterior(i)}}return e}}])}(),Ts=function(){return s((function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Ds.compare;i(this,t),u(this,"queue",void 0),u(this,"tree",void 0),u(this,"segments",void 0),this.queue=e,this.tree=new ls(n),this.segments=[]}),[{key:"process",value:function(t){var e=t.segment,n=[];if(t.consumedBy)return t.isLeft?this.queue.delete(t.otherSE):this.tree.delete(e),n;t.isLeft&&this.tree.add(e);var r=e,i=e;do{r=this.tree.lastBefore(r)}while(null!=r&&null!=r.consumedBy);do{i=this.tree.firstAfter(i)}while(null!=i&&null!=i.consumedBy);if(t.isLeft){var o=null;if(r){var s=r.getIntersection(e);if(null!==s&&(e.isAnEndpoint(s)||(o=s),!r.isAnEndpoint(s)))for(var a=this._splitSafely(r,s),u=0,l=a.length;u<l;u++)n.push(a[u])}var h=null;if(i){var c=i.getIntersection(e);if(null!==c&&(e.isAnEndpoint(c)||(h=c),!i.isAnEndpoint(c)))for(var f=this._splitSafely(i,c),v=0,g=f.length;v<g;v++)n.push(f[v])}if(null!==o||null!==h){var d=null;if(null===o)d=h;else if(null===h)d=o;else{d=Ms.comparePoints(o,h)<=0?o:h}this.queue.delete(e.rightSE),n.push(e.rightSE);for(var p=e.split(d),y=0,m=p.length;y<m;y++)n.push(p[y])}n.length>0?(this.tree.delete(e),n.push(t)):(this.segments.push(e),e.prev=r)}else{if(r&&i){var _=r.getIntersection(i);if(null!==_){if(!r.isAnEndpoint(_))for(var x=this._splitSafely(r,_),E=0,k=x.length;E<k;E++)n.push(x[E]);if(!i.isAnEndpoint(_))for(var w=this._splitSafely(i,_),b=0,I=w.length;b<I;b++)n.push(w[b])}}this.tree.delete(e)}return n}},{key:"_splitSafely",value:function(t,e){this.tree.delete(t);var n=t.rightSE;this.queue.delete(n);var r=t.split(e);return r.push(n),void 0===t.consumedBy&&this.tree.add(t),r}}])}(),Os=new(function(){return s((function t(){i(this,t),u(this,"type",void 0),u(this,"numMultiPolys",void 0)}),[{key:"run",value:function(t,e,n){Os.type=t;for(var r=[new Gs(e,!0)],i=0,o=n.length;i<o;i++)r.push(new Gs(n[i],!1));if(Os.numMultiPolys=r.length,"difference"===Os.type)for(var s=r[0],a=1;a<r.length;)null!==Es(r[a].bbox,s.bbox)?a++:r.splice(a,1);if("intersection"===Os.type)for(var u=0,l=r.length;u<l;u++)for(var h=r[u],c=u+1,f=r.length;c<f;c++)if(null===Es(h.bbox,r[c].bbox))return[];for(var v=new ls(Ms.compare),g=0,d=r.length;g<d;g++)for(var p=r[g].getSweepEvents(),y=0,m=p.length;y<m;y++)v.add(p[y]);var _=new Ts(v),x=null;for(0!=v.size&&(x=v.first(),v.delete(x));x;){for(var E=_.process(x),k=0,w=E.length;k<w;k++){var b=E[k];void 0===b.consumedBy&&v.add(b)}0!=v.size?(x=v.first(),v.delete(x)):x=null}_s.reset();var I=Ls.factory(_.segments);return new Cs(I).getGeom()}}])}()),Rs=Os,As=0,Ds=function(){function t(e,n,r,o){i(this,t),u(this,"id",void 0),u(this,"leftSE",void 0),u(this,"rightSE",void 0),u(this,"rings",void 0),u(this,"windings",void 0),u(this,"ringOut",void 0),u(this,"consumedBy",void 0),u(this,"prev",void 0),u(this,"_prevInResult",void 0),u(this,"_beforeState",void 0),u(this,"_afterState",void 0),u(this,"_isInResult",void 0),this.id=++As,this.leftSE=e,e.segment=this,e.otherSE=n,this.rightSE=n,n.segment=this,n.otherSE=e,this.rings=r,this.windings=o}return s(t,[{key:"replaceRightSE",value:function(t){this.rightSE=t,this.rightSE.segment=this,this.rightSE.otherSE=this.leftSE,this.leftSE.otherSE=this.rightSE}},{key:"bbox",value:function(){var t=this.leftSE.point.y,e=this.rightSE.point.y;return{ll:{x:this.leftSE.point.x,y:t.isLessThan(e)?t:e},ur:{x:this.rightSE.point.x,y:t.isGreaterThan(e)?t:e}}}},{key:"vector",value:function(){return{x:this.rightSE.point.x.minus(this.leftSE.point.x),y:this.rightSE.point.y.minus(this.leftSE.point.y)}}},{key:"isAnEndpoint",value:function(t){return t.x.eq(this.leftSE.point.x)&&t.y.eq(this.leftSE.point.y)||t.x.eq(this.rightSE.point.x)&&t.y.eq(this.rightSE.point.y)}},{key:"comparePoint",value:function(t){return _s.orient(this.leftSE.point,t,this.rightSE.point)}},{key:"getIntersection",value:function(t){var e=this.bbox(),n=t.bbox(),r=Es(e,n);if(null===r)return null;var i=this.leftSE.point,o=this.rightSE.point,s=t.leftSE.point,a=t.rightSE.point,u=xs(e,s)&&0===this.comparePoint(s),l=xs(n,i)&&0===t.comparePoint(i),h=xs(e,a)&&0===this.comparePoint(a),c=xs(n,o)&&0===t.comparePoint(o);if(l&&u)return c&&!h?o:!c&&h?a:null;if(l)return h&&i.x.eq(a.x)&&i.y.eq(a.y)?null:i;if(u)return c&&o.x.eq(s.x)&&o.y.eq(s.y)?null:s;if(c&&h)return null;if(c)return o;if(h)return a;var f=function(t,e,n,r){if(e.x.isZero())return Ss(n,r,t.x);if(r.x.isZero())return Ss(t,e,n.x);if(e.y.isZero())return Ns(n,r,t.y);if(r.y.isZero())return Ns(t,e,n.y);var i=ks(e,r);if(i.isZero())return null;var o={x:n.x.minus(t.x),y:n.y.minus(t.y)},s=ks(o,e).div(i),a=ks(o,r).div(i),u=t.x.plus(a.times(e.x)),l=n.x.plus(s.times(r.x)),h=t.y.plus(a.times(e.y)),c=n.y.plus(s.times(r.y));return{x:u.plus(l).div(2),y:h.plus(c).div(2)}}(i,this.vector(),s,t.vector());return null===f?null:xs(r,f)?_s.snap(f):null}},{key:"split",value:function(e){var n=[],r=void 0!==e.events,i=new Ms(e,!0),o=new Ms(e,!1),s=this.rightSE;this.replaceRightSE(o),n.push(o),n.push(i);var a=new t(i,s,this.rings.slice(),this.windings.slice());return Ms.comparePoints(a.leftSE.point,a.rightSE.point)>0&&a.swapEvents(),Ms.comparePoints(this.leftSE.point,this.rightSE.point)>0&&this.swapEvents(),r&&(i.checkForConsuming(),o.checkForConsuming()),n}},{key:"swapEvents",value:function(){var t=this.rightSE;this.rightSE=this.leftSE,this.leftSE=t,this.leftSE.isLeft=!0,this.rightSE.isLeft=!1;for(var e=0,n=this.windings.length;e<n;e++)this.windings[e]*=-1}},{key:"consume",value:function(e){for(var n=this,r=e;n.consumedBy;)n=n.consumedBy;for(;r.consumedBy;)r=r.consumedBy;var i=t.compare(n,r);if(0!==i){if(i>0){var o=n;n=r,r=o}if(n.prev===r){var s=n;n=r,r=s}for(var a=0,u=r.rings.length;a<u;a++){var l=r.rings[a],h=r.windings[a],c=n.rings.indexOf(l);-1===c?(n.rings.push(l),n.windings.push(h)):n.windings[c]+=h}r.rings=null,r.windings=null,r.consumedBy=n,r.leftSE.consumedBy=n.leftSE,r.rightSE.consumedBy=n.rightSE}}},{key:"prevInResult",value:function(){return void 0!==this._prevInResult||(this.prev?this.prev.isInResult()?this._prevInResult=this.prev:this._prevInResult=this.prev.prevInResult():this._prevInResult=null),this._prevInResult}},{key:"beforeState",value:function(){if(void 0!==this._beforeState)return this._beforeState;if(this.prev){var t=this.prev.consumedBy||this.prev;this._beforeState=t.afterState()}else this._beforeState={rings:[],windings:[],multiPolys:[]};return this._beforeState}},{key:"afterState",value:function(){if(void 0!==this._afterState)return this._afterState;var t=this.beforeState();this._afterState={rings:t.rings.slice(0),windings:t.windings.slice(0),multiPolys:[]};for(var e=this._afterState.rings,n=this._afterState.windings,r=this._afterState.multiPolys,i=0,o=this.rings.length;i<o;i++){var s=this.rings[i],a=this.windings[i],u=e.indexOf(s);-1===u?(e.push(s),n.push(a)):n[u]+=a}for(var l=[],h=[],c=0,f=e.length;c<f;c++)if(0!==n[c]){var v=e[c],g=v.poly;if(-1===h.indexOf(g))if(v.isExterior)l.push(g);else{-1===h.indexOf(g)&&h.push(g);var d=l.indexOf(v.poly);-1!==d&&l.splice(d,1)}}for(var p=0,y=l.length;p<y;p++){var m=l[p].multiPoly;-1===r.indexOf(m)&&r.push(m)}return this._afterState}},{key:"isInResult",value:function(){if(this.consumedBy)return!1;if(void 0!==this._isInResult)return this._isInResult;var t=this.beforeState().multiPolys,e=this.afterState().multiPolys;switch(Rs.type){case"union":var n=0===t.length,r=0===e.length;this._isInResult=n!==r;break;case"intersection":var i,o;t.length<e.length?(i=t.length,o=e.length):(i=e.length,o=t.length),this._isInResult=o===Rs.numMultiPolys&&i<o;break;case"xor":var s=Math.abs(t.length-e.length);this._isInResult=s%2==1;break;case"difference":var a=function(t){return 1===t.length&&t[0].isSubject};this._isInResult=a(t)!==a(e)}return this._isInResult}}],[{key:"compare",value:function(t,e){var n=t.leftSE.point.x,r=e.leftSE.point.x,i=t.rightSE.point.x,o=e.rightSE.point.x;if(o.isLessThan(n))return 1;if(i.isLessThan(r))return-1;var s=t.leftSE.point.y,a=e.leftSE.point.y,u=t.rightSE.point.y,l=e.rightSE.point.y;if(n.isLessThan(r)){if(a.isLessThan(s)&&a.isLessThan(u))return 1;if(a.isGreaterThan(s)&&a.isGreaterThan(u))return-1;var h=t.comparePoint(e.leftSE.point);if(h<0)return 1;if(h>0)return-1;var c=e.comparePoint(t.rightSE.point);return 0!==c?c:-1}if(n.isGreaterThan(r)){if(s.isLessThan(a)&&s.isLessThan(l))return-1;if(s.isGreaterThan(a)&&s.isGreaterThan(l))return 1;var f=e.comparePoint(t.leftSE.point);if(0!==f)return f;var v=t.comparePoint(e.rightSE.point);return v<0?1:v>0?-1:1}if(s.isLessThan(a))return-1;if(s.isGreaterThan(a))return 1;if(i.isLessThan(o)){var g=e.comparePoint(t.rightSE.point);if(0!==g)return g}if(i.isGreaterThan(o)){var d=t.comparePoint(e.rightSE.point);if(d<0)return 1;if(d>0)return-1}if(!i.eq(o)){var p=u.minus(s),y=i.minus(n),m=l.minus(a),_=o.minus(r);if(p.isGreaterThan(y)&&m.isLessThan(_))return 1;if(p.isLessThan(y)&&m.isGreaterThan(_))return-1}return i.isGreaterThan(o)?1:i.isLessThan(o)||u.isLessThan(l)?-1:u.isGreaterThan(l)?1:t.id<e.id?-1:t.id>e.id?1:0}},{key:"fromRing",value:function(e,n,r){var i,o,s,a=Ms.comparePoints(e,n);if(a<0)i=e,o=n,s=1;else{if(!(a>0))throw new Error("Tried to create degenerate segment at [".concat(e.x,", ").concat(e.y,"]"));i=n,o=e,s=-1}return new t(new Ms(i,!0),new Ms(o,!1),[r],[s])}}])}(),Fs=function(){return s((function t(e,n,r){if(i(this,t),u(this,"poly",void 0),u(this,"isExterior",void 0),u(this,"segments",void 0),u(this,"bbox",void 0),!Array.isArray(e)||0===e.length)throw new Error("Input geometry is not a valid Polygon or MultiPolygon");if(this.poly=n,this.isExterior=r,this.segments=[],"number"!=typeof e[0][0]||"number"!=typeof e[0][1])throw new Error("Input geometry is not a valid Polygon or MultiPolygon");var o=_s.snap({x:new ss(e[0][0]),y:new ss(e[0][1])});this.bbox={ll:{x:o.x,y:o.y},ur:{x:o.x,y:o.y}};for(var s=o,a=1,l=e.length;a<l;a++){if("number"!=typeof e[a][0]||"number"!=typeof e[a][1])throw new Error("Input geometry is not a valid Polygon or MultiPolygon");var h=_s.snap({x:new ss(e[a][0]),y:new ss(e[a][1])});h.x.eq(s.x)&&h.y.eq(s.y)||(this.segments.push(Ds.fromRing(s,h,this)),h.x.isLessThan(this.bbox.ll.x)&&(this.bbox.ll.x=h.x),h.y.isLessThan(this.bbox.ll.y)&&(this.bbox.ll.y=h.y),h.x.isGreaterThan(this.bbox.ur.x)&&(this.bbox.ur.x=h.x),h.y.isGreaterThan(this.bbox.ur.y)&&(this.bbox.ur.y=h.y),s=h)}o.x.eq(s.x)&&o.y.eq(s.y)||this.segments.push(Ds.fromRing(s,o,this))}),[{key:"getSweepEvents",value:function(){for(var t=[],e=0,n=this.segments.length;e<n;e++){var r=this.segments[e];t.push(r.leftSE),t.push(r.rightSE)}return t}}])}(),qs=function(){return s((function t(e,n){if(i(this,t),u(this,"multiPoly",void 0),u(this,"exteriorRing",void 0),u(this,"interiorRings",void 0),u(this,"bbox",void 0),!Array.isArray(e))throw new Error("Input geometry is not a valid Polygon or MultiPolygon");this.exteriorRing=new Fs(e[0],this,!0),this.bbox={ll:{x:this.exteriorRing.bbox.ll.x,y:this.exteriorRing.bbox.ll.y},ur:{x:this.exteriorRing.bbox.ur.x,y:this.exteriorRing.bbox.ur.y}},this.interiorRings=[];for(var r=1,o=e.length;r<o;r++){var s=new Fs(e[r],this,!1);s.bbox.ll.x.isLessThan(this.bbox.ll.x)&&(this.bbox.ll.x=s.bbox.ll.x),s.bbox.ll.y.isLessThan(this.bbox.ll.y)&&(this.bbox.ll.y=s.bbox.ll.y),s.bbox.ur.x.isGreaterThan(this.bbox.ur.x)&&(this.bbox.ur.x=s.bbox.ur.x),s.bbox.ur.y.isGreaterThan(this.bbox.ur.y)&&(this.bbox.ur.y=s.bbox.ur.y),this.interiorRings.push(s)}this.multiPoly=n}),[{key:"getSweepEvents",value:function(){for(var t=this.exteriorRing.getSweepEvents(),e=0,n=this.interiorRings.length;e<n;e++)for(var r=this.interiorRings[e].getSweepEvents(),i=0,o=r.length;i<o;i++)t.push(r[i]);return t}}])}(),Gs=function(){return s((function t(e,n){if(i(this,t),u(this,"isSubject",void 0),u(this,"polys",void 0),u(this,"bbox",void 0),!Array.isArray(e))throw new Error("Input geometry is not a valid Polygon or MultiPolygon");try{"number"==typeof e[0][0][0]&&(e=[e])}catch(t){}this.polys=[],this.bbox={ll:{x:new ss(Number.POSITIVE_INFINITY),y:new ss(Number.POSITIVE_INFINITY)},ur:{x:new ss(Number.NEGATIVE_INFINITY),y:new ss(Number.NEGATIVE_INFINITY)}};for(var r=0,o=e.length;r<o;r++){var s=new qs(e[r],this);s.bbox.ll.x.isLessThan(this.bbox.ll.x)&&(this.bbox.ll.x=s.bbox.ll.x),s.bbox.ll.y.isLessThan(this.bbox.ll.y)&&(this.bbox.ll.y=s.bbox.ll.y),s.bbox.ur.x.isGreaterThan(this.bbox.ur.x)&&(this.bbox.ur.x=s.bbox.ur.x),s.bbox.ur.y.isGreaterThan(this.bbox.ur.y)&&(this.bbox.ur.y=s.bbox.ur.y),this.polys.push(s)}this.isSubject=n}),[{key:"getSweepEvents",value:function(){for(var t=[],e=0,n=this.polys.length;e<n;e++)for(var r=this.polys[e].getSweepEvents(),i=0,o=r.length;i<o;i++)t.push(r[i]);return t}}])}(),Ys=function(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];return Rs.run("union",t,n)},Bs=function(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];return Rs.run("intersection",t,n)},zs=function(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];return Rs.run("difference",t,n)},js=_s.set,Xs=Object.freeze({__proto__:null,difference:zs,intersection:Bs,setPrecision:js,union:Ys,xor:function(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];return Rs.run("xor",t,n)}});function Us(t){if(!t)throw new Error("geojson is required");var e=[];return xt(t,(function(t){e.push(t)})),C(e)}function Vs(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:2,r=K(t),i=K(e),o=r[0]-i[0],s=r[1]-i[1];return 1===n?Math.abs(o)+Math.abs(s):Math.pow(Math.pow(o,n)+Math.pow(s,n),1/n)}function Zs(t,e){var n,r,i=(e=e||{}).threshold||1e4,o=e.p||2,s=null!=(n=e.binary)&&n,a=e.alpha||-1,u=null!=(r=e.standardization)&&r,l=[];dt(t,(function(t){l.push(ki(t))}));for(var h=[],c=0;c<l.length;c++)h[c]=[];for(var f=0;f<l.length;f++)for(var v=f;v<l.length;v++){f===v&&(h[f][v]=0);var g=Vs(l[f],l[v],o);h[f][v]=g,h[v][f]=g}for(var d=0;d<l.length;d++)for(var p=0;p<l.length;p++){var y=h[d][p];0!==y&&(h[d][p]=s?y<=i?1:0:y<=i?Math.pow(y,a):0)}if(u)for(var m=0;m<l.length;m++)for(var _=h[m].reduce((function(t,e){return t+e}),0),x=0;x<l.length;x++)h[m][x]=h[m][x]/_;return h}function Hs(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=K(t),i=K(e);i[0]+=i[0]-r[0]>180?-360:r[0]-i[0]>180?360:0;var o=function(t,e,n){var r=n=void 0===n?x:Number(n),i=t[1]*Math.PI/180,o=e[1]*Math.PI/180,s=o-i,a=Math.abs(e[0]-t[0])*Math.PI/180;a>Math.PI&&(a-=2*Math.PI);var u=Math.log(Math.tan(o/2+Math.PI/4)/Math.tan(i/2+Math.PI/4)),l=Math.abs(u)>1e-11?s/u:Math.cos(i);return Math.sqrt(s*s+l*l*a*a)*r}(r,i);return X(o,"meters",n.units)}function Ws(t,e,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},i=e<0,o=X(Math.abs(e),r.units,"meters");i&&(o=-Math.abs(o));var s=K(t),a=function(t,e,n,r){r=void 0===r?x:Number(r);var i=e/r,o=t[0]*Math.PI/180,s=j(t[1]),a=j(n),u=i*Math.cos(a),l=s+u;Math.abs(l)>Math.PI/2&&(l=l>0?Math.PI-l:-Math.PI-l);var h=Math.log(Math.tan(l/2+Math.PI/4)/Math.tan(s/2+Math.PI/4)),c=Math.abs(h)>1e-11?u/h:Math.cos(s),f=i*Math.sin(a)/c;return[(180*(o+f)/Math.PI+540)%360-180,180*l/Math.PI]}(s,o,n);return a[0]+=a[0]-s[0]>180?-360:s[0]-a[0]>180?360:0,I(a,r.properties)}function Js(t,e,n){if(!Z(n=n||{}))throw new Error("options is invalid");var r=n.pivot,i=n.mutate;if(!t)throw new Error("geojson is required");if(null==e||isNaN(e))throw new Error("angle is required");if(0===e)return t;var o=null!=r?r:ki(t);return!1!==i&&void 0!==i||(t=Xi(t)),ct(t,(function(t){var n=lt(o,t)+e,r=Hs(o,t),i=Q(Ws(o,r,n));t[0]=i[0],t[1]=i[1]})),t}function Ks(t,e,n,r){var i=(r=r||{}).steps||64,o=r.units||"kilometers",s=r.angle||0,a=r.pivot||t,u=r.properties||{};if(!t)throw new Error("center is required");if(!e)throw new Error("xSemiAxis is required");if(!n)throw new Error("ySemiAxis is required");if(!Z(r))throw new Error("options must be an object");if(!V(i))throw new Error("steps must be a number");if(!V(s))throw new Error("angle must be a number");var l=K(Js(I(K(t)),s,{pivot:a}));s=-90+s,i=Math.ceil(i/4);for(var h=[],c=[],f=e,v=n,g=v,d=(f-v)/(Math.PI/2),p=(f+v)*Math.PI/4,y=i,m=0,_=0,x=0;x<i;x++)_+=m,m=0===d?p/y/g:(-(d*_+g)+Math.sqrt(Math.pow(d*_+g,2)-.5*d*4*(-p/y)))/(.5*d*2),0!=_&&h.push(_);c.push(0);for(var E=0;E<h.length;E++)c.push(h[E]);c.push(Math.PI/2);for(var k=0;k<h.length;k++)c.push(Math.PI-h[h.length-k-1]);c.push(Math.PI);for(var w=0;w<h.length;w++)c.push(Math.PI+h[w]);c.push(3*Math.PI/2);for(var b=0;b<h.length;b++)c.push(2*Math.PI-h[h.length-b-1]);c.push(0);for(var N=[],M=0,L=c;M<L.length;M++){var P=L[M],C=Math.atan2(v*Math.sin(P),f*Math.cos(P)),T=Math.sqrt(Math.pow(f,2)*Math.pow(v,2)/(Math.pow(f*Math.sin(C),2)+Math.pow(v*Math.cos(C),2)));N.push(at(l,T,s+z(C),{units:o}).geometry.coordinates)}return S([N],u)}function Qs(t){return Gt(Rt(t))}function $s(t){var e=[];return"FeatureCollection"===t.type?dt(t,(function(t){ct(t,(function(n){e.push(I(n,t.properties))}))})):"Feature"===t.type?ct(t,(function(n){e.push(I(n,t.properties))})):ct(t,(function(t){e.push(I(t))})),C(e)}function ta(t){for(var e=Math.pow(10,6),n=[],r=0;r<t.length;r++){var i=t[r];void 0!==i&&(n[r]=Math.round((i+Number.EPSILON)*e)/e)}return n}var ea=Math.PI/180,na=180/Math.PI,ra=function(){function t(e,n){i(this,t),u(this,"lon",void 0),u(this,"lat",void 0),u(this,"x",void 0),u(this,"y",void 0),this.lon=e,this.lat=n,this.x=ea*e,this.y=ea*n}return s(t,[{key:"view",value:function(){return String(this.lon).slice(0,4)+","+String(this.lat).slice(0,4)}},{key:"antipode",value:function(){var e=-1*this.lat;return new t(this.lon<0?180+this.lon:-1*(180-this.lon),e)}}])}(),ia=function(){return s((function t(e){i(this,t),u(this,"properties",{}),u(this,"geometries",[]),e&&(this.properties=e)}),[{key:"json",value:function(){if(0===this.geometries.length)return{type:"Feature",geometry:{type:"LineString",coordinates:null},properties:this.properties};if(1===this.geometries.length){var t=this.geometries[0];return t?{type:"Feature",geometry:{type:"LineString",coordinates:t.coords},properties:this.properties}:{type:"Feature",geometry:{type:"LineString",coordinates:[]},properties:this.properties}}return{type:"Feature",geometry:{type:"MultiLineString",coordinates:this.geometries.filter((function(t){return void 0!==t})).map((function(t){return t.coords}))},properties:this.properties}}},{key:"wkt",value:function(){if(0===this.geometries.length)return"";var t,e=[],n=a(this.geometries);try{for(n.s();!(t=n.n()).done;){var r=t.value;if(r&&0!==r.coords.length){var i=r.coords.filter((function(t){return void 0!==t})).map((function(t){var e,n,r=null!==(e=t[0])&&void 0!==e?e:0,i=null!==(n=t[1])&&void 0!==n?n:0;return"".concat(r," ").concat(i)}));0===i.length?e.push("LINESTRING EMPTY"):e.push("LINESTRING(".concat(i.join(","),")"))}else e.push("LINESTRING EMPTY")}}catch(t){n.e(t)}finally{n.f()}return e.join("; ")}}])}(),oa=function(){return s((function t(){i(this,t),u(this,"coords",[]),u(this,"length",0)}),[{key:"move_to",value:function(t){this.length++,this.coords.push(t)}}])}(),sa=function(){return s((function t(e,n,r){if(i(this,t),u(this,"start",void 0),u(this,"end",void 0),u(this,"properties",void 0),u(this,"g",void 0),!e||void 0===e.x||void 0===e.y)throw new Error("GreatCircle constructor expects two args: start and end objects with x and y properties");if(!n||void 0===n.x||void 0===n.y)throw new Error("GreatCircle constructor expects two args: start and end objects with x and y properties");this.start=new ra(e.x,e.y),this.end=new ra(n.x,n.y),this.properties=r||{};var o=this.start.x-this.end.x,s=this.start.y-this.end.y,a=Math.pow(Math.sin(s/2),2)+Math.cos(this.start.y)*Math.cos(this.end.y)*Math.pow(Math.sin(o/2),2);if(this.g=2*Math.asin(Math.sqrt(a)),this.g===Math.PI)throw new Error("it appears "+this.start.view()+" and "+this.end.view()+" are 'antipodal', e.g diametrically opposite, thus there is no single route but rather infinite");if(isNaN(this.g))throw new Error("could not calculate great circle between "+e+" and "+n)}),[{key:"interpolate",value:function(t){var e=Math.sin((1-t)*this.g)/Math.sin(this.g),n=Math.sin(t*this.g)/Math.sin(this.g),r=e*Math.cos(this.start.y)*Math.cos(this.start.x)+n*Math.cos(this.end.y)*Math.cos(this.end.x),i=e*Math.cos(this.start.y)*Math.sin(this.start.x)+n*Math.cos(this.end.y)*Math.sin(this.end.x),o=e*Math.sin(this.start.y)+n*Math.sin(this.end.y),s=na*Math.atan2(o,Math.sqrt(Math.pow(r,2)+Math.pow(i,2)));return[na*Math.atan2(i,r),s]}},{key:"Arc",value:function(t,e){var n,r=[];if(!t||t<=2)r.push([this.start.lon,this.start.lat]),r.push([this.end.lon,this.end.lat]);else for(var i=1/(t-1),o=0;o<t;++o){var s=i*o,a=this.interpolate(s);r.push(a)}for(var u=!1,l=0,h=null!==(n=null==e?void 0:e.offset)&&void 0!==n?n:10,c=180-h,f=-180+h,v=360-h,g=1;g<r.length;++g){var d,p,y,m,_=null!==(d=null===(p=r[g-1])||void 0===p?void 0:p[0])&&void 0!==d?d:0,x=null!==(y=null===(m=r[g])||void 0===m?void 0:m[0])&&void 0!==y?y:0,E=Math.abs(x-_);E>v&&(x>c&&_<f||_>c&&x<f)?u=!0:E>l&&(l=E)}var k=[];if(u&&l<h){var w=[];k.push(w);for(var b=0;b<r.length;++b){var I,N,S,M,L=parseFloat((null!==(I=null===(N=r[b])||void 0===N?void 0:N[0])&&void 0!==I?I:0).toString());if(b>0&&Math.abs(L-(null!==(S=null===(M=r[b-1])||void 0===M?void 0:M[0])&&void 0!==S?S:0))>v){var P,C,T,O,R,A,D,F,q,G,Y,B,z,j,X,U,V,Z,H=parseFloat((null!==(P=null===(C=r[b-1])||void 0===C?void 0:C[0])&&void 0!==P?P:0).toString()),W=parseFloat((null!==(T=null===(O=r[b-1])||void 0===O?void 0:O[1])&&void 0!==T?T:0).toString()),J=parseFloat((null!==(R=null===(A=r[b])||void 0===A?void 0:A[0])&&void 0!==R?R:0).toString()),K=parseFloat((null!==(D=null===(F=r[b])||void 0===F?void 0:F[1])&&void 0!==D?D:0).toString());if(H>-180&&H<f&&180===J&&b+1<r.length&&(null!==(q=null===(G=r[b-1])||void 0===G?void 0:G[0])&&void 0!==q?q:0)>-180&&(null!==(Y=null===(B=r[b-1])||void 0===B?void 0:B[0])&&void 0!==Y?Y:0)<f){var Q,$,tt,et,nt,rt;w.push([-180,null!==(Q=null===($=r[b])||void 0===$?void 0:$[1])&&void 0!==Q?Q:0]),b++,w.push([null!==(tt=null===(et=r[b])||void 0===et?void 0:et[0])&&void 0!==tt?tt:0,null!==(nt=null===(rt=r[b])||void 0===rt?void 0:rt[1])&&void 0!==nt?nt:0]);continue}if(H>c&&H<180&&-180===J&&b+1<r.length&&(null!==(z=null===(j=r[b-1])||void 0===j?void 0:j[0])&&void 0!==z?z:0)>c&&(null!==(X=null===(U=r[b-1])||void 0===U?void 0:U[0])&&void 0!==X?X:0)<180){var it,ot,st,at,ut,lt;w.push([180,null!==(it=null===(ot=r[b])||void 0===ot?void 0:ot[1])&&void 0!==it?it:0]),b++,w.push([null!==(st=null===(at=r[b])||void 0===at?void 0:at[0])&&void 0!==st?st:0,null!==(ut=null===(lt=r[b])||void 0===lt?void 0:lt[1])&&void 0!==ut?ut:0]);continue}if(H<=180&&J>=180&&H<J){var ht,ct,ft,vt,gt=(180-H)/(J-H),dt=gt*K+(1-gt)*W;w.push([(null!==(ht=null===(ct=r[b-1])||void 0===ct?void 0:ct[0])&&void 0!==ht?ht:0)>c?180:-180,dt]),(w=[]).push([(null!==(ft=null===(vt=r[b-1])||void 0===vt?void 0:vt[0])&&void 0!==ft?ft:0)>c?-180:180,dt]),k.push(w)}else w=[],k.push(w);w.push([L,null!==(V=null===(Z=r[b])||void 0===Z?void 0:Z[1])&&void 0!==V?V:0])}else{var pt,yt,mt,_t;w.push([null!==(pt=null===(yt=r[b])||void 0===yt?void 0:yt[0])&&void 0!==pt?pt:0,null!==(mt=null===(_t=r[b])||void 0===_t?void 0:_t[1])&&void 0!==mt?mt:0])}}}else{var xt=[];k.push(xt);for(var Et=0;Et<r.length;++Et){var kt,wt,bt,It;xt.push([null!==(kt=null===(wt=r[Et])||void 0===wt?void 0:wt[0])&&void 0!==kt?kt:0,null!==(bt=null===(It=r[Et])||void 0===It?void 0:It[1])&&void 0!==bt?bt:0])}}for(var Nt=new ia(this.properties),St=0;St<k.length;++St){var Mt=new oa;Nt.geometries.push(Mt);var Lt=k[St];if(Lt)for(var Pt=0;Pt<Lt.length;++Pt){var Ct=Lt[Pt];Ct&&Mt.move_to(ta([Ct[0],Ct[1]]))}}return Nt}}])}();function aa(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=[];if(mt(t,(function(t){n.push(t.coordinates)})),n.length<2)throw new Error("Must specify at least 2 geometries");var r=Bs.apply(Xs,[n[0]].concat(p(n.slice(1))));return 0===r.length?null:1===r.length?S(r[0],e.properties):R(r,e.properties)}function ua(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=JSON.stringify(n.properties||{}),i=d(t,4),o=i[0],s=i[1],a=i[2],u=i[3],l=(s+u)/2,h=(o+a)/2,c=2*e/ut([o,l],[a,l],n)*(a-o),f=2*e/ut([h,s],[h,u],n)*(u-s),v=c/2,g=2*v,p=Math.sqrt(3)/2*f,y=a-o,m=u-s,_=3/4*g,x=p,E=(y-g)/(g-v/2),k=Math.floor(E),w=(k*_-v/2-y)/2-v/2+_/2,b=Math.floor((m-p)/p),I=(m-b*p)/2,N=b*p-m>p/2;N&&(I-=p/4);for(var S=[],M=[],L=0;L<6;L++){var P=2*Math.PI/6*L;S.push(Math.cos(P)),M.push(Math.sin(P))}for(var T=[],O=0;O<=k;O++)for(var R=0;R<=b;R++){var A=O%2==1;if((0!==R||!A)&&(0!==R||!N)){var D=O*_+o-w,F=R*x+s+I;if(A&&(F-=p/2),!0===n.triangles)ha([D,F],c/2,f/2,JSON.parse(r),S,M).forEach((function(t){n.mask?aa(C([n.mask,t]))&&T.push(t):T.push(t)}));else{var q=la([D,F],c/2,f/2,JSON.parse(r),S,M);n.mask?aa(C([n.mask,q]))&&T.push(q):T.push(q)}}}return C(T)}function la(t,e,n,r,i,o){for(var s=[],a=0;a<6;a++){var u=t[0]+e*i[a],l=t[1]+n*o[a];s.push([u,l])}return s.push(s[0].slice()),S([s],r)}function ha(t,e,n,r,i,o){for(var s=[],a=0;a<6;a++){var u=[];u.push(t),u.push([t[0]+e*i[a],t[1]+n*o[a]]),u.push([t[0]+e*i[(a+1)%6],t[1]+n*o[(a+1)%6]]),u.push(t),s.push(S([u],r))}return s}function ca(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};n.mask&&!n.units&&(n.units="kilometers");for(var r=[],i=t[0],o=t[1],s=t[2],a=t[3],u=e/ut([i,o],[s,o],n)*(s-i),l=e/ut([i,o],[i,a],n)*(a-o),h=s-i,c=a-o,f=Math.floor(h/u),v=(c-Math.floor(c/l)*l)/2,g=i+(h-f*u)/2;g<=s;){for(var d=o+v;d<=a;){var p=I([g,d],n.properties);n.mask?Yn(p,n.mask)&&r.push(p):r.push(p),d+=l}g+=u}return C(r)}function fa(t,e,n){for(var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},i=[],o=t[0],s=t[1],a=t[2],u=t[3],l=a-o,h=X(e,r.units,"degrees"),c=u-s,f=X(n,r.units,"degrees"),v=Math.floor(Math.abs(l)/h),g=Math.floor(Math.abs(c)/f),d=(c-g*f)/2,p=o+(l-v*h)/2,y=0;y<v;y++){for(var m=s+d,_=0;_<g;_++){var x=S([[[p,m],[p,m+f],[p+h,m+f],[p+h,m],[p,m]]],r.properties);r.mask?Nn(r.mask,x)&&i.push(x):i.push(x),m+=f}p+=h}return C(i)}function va(t,e){return fa(t,e,e,arguments.length>2&&void 0!==arguments[2]?arguments[2]:{})}function ga(t,e){for(var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=[],i=e/ut([t[0],t[1]],[t[2],t[1]],n)*(t[2]-t[0]),o=e/ut([t[0],t[1]],[t[0],t[3]],n)*(t[3]-t[1]),s=0,a=t[0];a<=t[2];){for(var u=0,l=t[1];l<=t[3];){var h=null,c=null;s%2==0&&u%2==0?(h=S([[[a,l],[a,l+o],[a+i,l],[a,l]]],n.properties),c=S([[[a,l+o],[a+i,l+o],[a+i,l],[a,l+o]]],n.properties)):s%2==0&&u%2==1?(h=S([[[a,l],[a+i,l+o],[a+i,l],[a,l]]],n.properties),c=S([[[a,l],[a,l+o],[a+i,l+o],[a,l]]],n.properties)):u%2==0&&s%2==1?(h=S([[[a,l],[a,l+o],[a+i,l+o],[a,l]]],n.properties),c=S([[[a,l],[a+i,l+o],[a+i,l],[a,l]]],n.properties)):u%2==1&&s%2==1&&(h=S([[[a,l],[a,l+o],[a+i,l],[a,l]]],n.properties),c=S([[[a,l+o],[a+i,l+o],[a+i,l],[a,l+o]]],n.properties)),n.mask?(aa(C([n.mask,h]))&&r.push(h),aa(C([n.mask,c]))&&r.push(c)):(r.push(h),r.push(c)),l+=o,u++}s++,a+=i}return C(r)}var da=Object.defineProperty,pa=Object.getOwnPropertySymbols,ya=Object.prototype.hasOwnProperty,ma=Object.prototype.propertyIsEnumerable,_a=function(t,e,n){return e in t?da(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n},xa=function(t,e){for(var n in e||(e={}))ya.call(e,n)&&_a(t,n,e[n]);if(pa){var r,i=a(pa(e));try{for(i.s();!(r=i.n()).done;){n=r.value;ma.call(e,n)&&_a(t,n,e[n])}}catch(t){i.e(t)}finally{i.f()}}return t};function Ea(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!Z(e))throw new Error("options is invalid");var n=e.zProperty,r=void 0===n?"elevation":n,i=e.flip,o=void 0!==i&&i,s=e.flags,a=void 0!==s&&s;nt(t,"Point","input must contain Points");for(var u=function(t,e){var n={};dt(t,(function(t){var e=Q(t)[1];n[e]||(n[e]=[]),n[e].push(t)}));for(var r=[],i=0,o=Object.values(n);i<o.length;i++){var s=o[i];r.push(s.sort((function(t,e){return Q(t)[0]-Q(e)[0]})))}return r.sort(e?function(t,e){return Q(t[0])[1]-Q(e[0])[1]}:function(t,e){return Q(e[0])[1]-Q(t[0])[1]}),r}(t,o),l=[],h=0;h<u.length;h++){for(var c=u[h],f=[],v=0;v<c.length;v++){var g=c[v];null==g.properties&&(g.properties={}),g.properties[r]?f.push(g.properties[r]):f.push(0),!0===a&&(g.properties.matrixPosition=[h,v])}l.push(f)}return l}function ka(t,e){for(var n=[],r=t[0].length,i=t.length,o=0;o<i-1;o++)for(var s=0;s<r-1;s++){var a=t[o+1][s+1],u=t[o][s+1],l=t[o][s],h=t[o+1][s];switch((h>=e?8:0)|(a>=e?4:0)|(u>=e?2:0)|(l>=e?1:0)){case 0:case 15:continue;case 1:n.push([[s+c(l,u),o],[s,o+c(l,h)]]);break;case 2:n.push([[s+1,o+c(u,a)],[s+c(l,u),o]]);break;case 3:n.push([[s+1,o+c(u,a)],[s,o+c(l,h)]]);break;case 4:n.push([[s+c(h,a),o+1],[s+1,o+c(u,a)]]);break;case 5:(h+a+u+l)/4>=e?n.push([[s+c(h,a),o+1],[s,o+c(l,h)]],[[s+c(l,u),o],[s+1,o+c(u,a)]]):n.push([[s+c(h,a),o+1],[s+1,o+c(u,a)]],[[s+c(l,u),o],[s,o+c(l,h)]]);break;case 6:n.push([[s+c(h,a),o+1],[s+c(l,u),o]]);break;case 7:n.push([[s+c(h,a),o+1],[s,o+c(l,h)]]);break;case 8:n.push([[s,o+c(l,h)],[s+c(h,a),o+1]]);break;case 9:n.push([[s+c(l,u),o],[s+c(h,a),o+1]]);break;case 10:(h+a+u+l)/4>=e?n.push([[s,o+c(l,h)],[s+c(l,u),o]],[[s+1,o+c(u,a)],[s+c(h,a),o+1]]):n.push([[s,o+c(l,h)],[s+c(h,a),o+1]],[[s+1,o+c(u,a)],[s+c(l,u),o]]);break;case 11:n.push([[s+1,o+c(u,a)],[s+c(h,a),o+1]]);break;case 12:n.push([[s,o+c(l,h)],[s+1,o+c(u,a)]]);break;case 13:n.push([[s+c(l,u),o],[s+1,o+c(u,a)]]);break;case 14:n.push([[s,o+c(l,h)],[s+c(l,u),o]])}}return n;function c(t,n){if(t===n)return.5;var r=(e-t)/(n-t);return r>1?1:r<0?0:r}}function wa(t,e){for(var n=e.length,r=e[0].length,i=[],o=[];t.length>0;){var s=p(t.shift());i.push(s);var u=void 0;do{u=!1;for(var l=0;l<t.length;l++){var h=t[l];if(h[0][0]===s[s.length-1][0]&&h[0][1]===s[s.length-1][1]){u=!0,s.push(h[1]),t.splice(l,1);break}if(h[1][0]===s[0][0]&&h[1][1]===s[0][1]){u=!0,s.unshift(h[0]),t.splice(l,1);break}}}while(u)}for(var c=function(){var t=i[0];if(t[0][0]===t[t.length-1][0]&&t[0][1]===t[t.length-1][1])return o.push(t),i.shift(),1;var e,s,u=t[t.length-1];if(0===u[0]&&0!==u[1])e=Ma(i,(function(t){return 0===t[0][0]&&t[0][1]<u[1]}),(function(t,e){return e[0][1]-t[0][1]})),s=[0,0];else if(0===u[1]&&u[0]!==r-1)e=Ma(i,(function(t){return 0===t[0][1]&&t[0][0]>u[0]}),(function(t,e){return t[0][0]-e[0][0]})),s=[r-1,0];else if(u[0]===r-1&&u[1]!==n-1)e=Ma(i,(function(t){return t[0][0]===r-1&&t[0][1]>u[1]}),(function(t,e){return t[0][1]-e[0][1]})),s=[r-1,n-1];else{if(u[1]!==n-1||0===u[0])throw new Error("Contour not closed but is not along an edge");e=Ma(i,(function(t){return t[0][1]===n-1&&t[0][0]<u[0]}),(function(t,e){return e[0][0]-t[0][0]})),s=[0,n-1]}if(-1===e)t.push(s);else if(0===e)t.push([t[0][0],t[0][1]]),o.push(t),i.shift();else{var l=i[e];i.splice(e,1);var h,c=a(l);try{for(c.s();!(h=c.n()).done;){var f=h.value;t.push(f)}}catch(t){c.e(t)}finally{c.f()}}};i.length>0;)c();for(var f=0;f<o.length;f++)o[f].length<4&&(o.splice(f,1),f--);return o}function ba(t){var e=t.map((function(t){return{ring:t,area:Lt(S([t]))}}));return e.sort((function(t,e){return e.area-t.area})),e.map((function(t){return t.ring}))}function Ia(t){for(var e=t.map((function(t){return{lrCoordinates:t,grouped:!1}})),n=[];!Sa(e);)for(var r=0;r<e.length;r++)if(!e[r].grouped){var i=[];i.push(e[r].lrCoordinates),e[r].grouped=!0;var o=S([e[r].lrCoordinates]);t:for(var s=r+1;s<e.length;s++)if(!e[s].grouped){var a=S([e[s].lrCoordinates]);if(Na(a,o)){for(var u=1;u<i.length;u++)if(Na(a,S([i[u]])))continue t;i.push(e[s].lrCoordinates),e[s].grouped=!0}}n.push(i)}return n}function Na(t,e){for(var n=$s(t),r=0;r<n.features.length;r++)if(!jt(n.features[r],e))return!1;return!0}function Sa(t){for(var e=0;e<t.length;e++)if(!1===t[e].grouped)return!1;return!0}function Ma(t,e,n){for(var r=-1,i=0;i<t.length;i++)e(t[i])&&(-1===r||n(t[r],t[i])>0)&&(r=i);return r}var La=Object.defineProperty,Pa=Object.getOwnPropertySymbols,Ca=Object.prototype.hasOwnProperty,Ta=Object.prototype.propertyIsEnumerable,Oa=function(t,e,n){return e in t?La(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n},Ra=function(t,e){for(var n in e||(e={}))Ca.call(e,n)&&Oa(t,n,e[n]);if(Pa){var r,i=a(Pa(e));try{for(i.s();!(r=i.n()).done;){n=r.value;Ta.call(e,n)&&Oa(t,n,e[n])}}catch(t){i.e(t)}finally{i.f()}}return t};function Aa(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!Z(e))throw new Error("options is invalid");var n=e.zProperty,r=void 0===n?"elevation":n,i=e.flip,o=void 0!==i&&i,s=e.flags,a=void 0!==s&&s;nt(t,"Point","input must contain Points");for(var u=function(t,e){var n={};dt(t,(function(t){var e=Q(t)[1];n[e]||(n[e]=[]),n[e].push(t)}));for(var r=[],i=0,o=Object.values(n);i<o.length;i++){var s=o[i];r.push(s.sort((function(t,e){return Q(t)[0]-Q(e)[0]})))}return r.sort(e?function(t,e){return Q(t[0])[1]-Q(e[0])[1]}:function(t,e){return Q(e[0])[1]-Q(t[0])[1]}),r}(t,o),l=[],h=0;h<u.length;h++){for(var c=u[h],f=[],v=0;v<c.length;v++){var g=c[v];null==g.properties&&(g.properties={}),g.properties[r]?f.push(g.properties[r]):f.push(0),!0===a&&(g.properties.matrixPosition=[h,v])}l.push(f)}return l}function Da(t,e){for(var n=[],r=t.length,i=t[0].length,o=0;o<r-1;o++)for(var s=0;s<i-1;s++){var a=t[o+1][s+1],u=t[o][s+1],l=t[o][s],h=t[o+1][s];switch((h>=e?8:0)|(a>=e?4:0)|(u>=e?2:0)|(l>=e?1:0)){case 0:case 15:continue;case 1:n.push([[s+y(l,u),o],[s,o+y(l,h)]]);break;case 2:n.push([[s+1,o+y(u,a)],[s+y(l,u),o]]);break;case 3:n.push([[s+1,o+y(u,a)],[s,o+y(l,h)]]);break;case 4:n.push([[s+y(h,a),o+1],[s+1,o+y(u,a)]]);break;case 5:(h+a+u+l)/4>=e?n.push([[s+y(h,a),o+1],[s,o+y(l,h)]],[[s+y(l,u),o],[s+1,o+y(u,a)]]):n.push([[s+y(h,a),o+1],[s+1,o+y(u,a)]],[[s+y(l,u),o],[s,o+y(l,h)]]);break;case 6:n.push([[s+y(h,a),o+1],[s+y(l,u),o]]);break;case 7:n.push([[s+y(h,a),o+1],[s,o+y(l,h)]]);break;case 8:n.push([[s,o+y(l,h)],[s+y(h,a),o+1]]);break;case 9:n.push([[s+y(l,u),o],[s+y(h,a),o+1]]);break;case 10:(h+a+u+l)/4>=e?n.push([[s,o+y(l,h)],[s+y(l,u),o]],[[s+1,o+y(u,a)],[s+y(h,a),o+1]]):n.push([[s,o+y(l,h)],[s+y(h,a),o+1]],[[s+1,o+y(u,a)],[s+y(l,u),o]]);break;case 11:n.push([[s+1,o+y(u,a)],[s+y(h,a),o+1]]);break;case 12:n.push([[s,o+y(l,h)],[s+1,o+y(u,a)]]);break;case 13:n.push([[s+y(l,u),o],[s+1,o+y(u,a)]]);break;case 14:n.push([[s,o+y(l,h)],[s+y(l,u),o]])}}for(var c=[];n.length>0;){var f=p(n.shift());c.push(f);var v=void 0;do{v=!1;for(var g=0;g<n.length;g++){var d=n[g];if(d[0][0]===f[f.length-1][0]&&d[0][1]===f[f.length-1][1]){v=!0,f.push(d[1]),n.splice(g,1);break}if(d[1][0]===f[0][0]&&d[1][1]===f[0][1]){v=!0,f.unshift(d[0]),n.splice(g,1);break}}}while(v)}return c;function y(t,n){if(t===n)return.5;var r=(e-t)/(n-t);return r>1?1:r<0?0:r}}function Fa(t,e,n,r,i,o,s,a){var u,l,h,c,f={x:null,y:null,onLine1:!1,onLine2:!1};return 0===(u=(a-o)*(n-t)-(s-i)*(r-e))?null!==f.x&&null!==f.y&&f:(c=(n-t)*(l=e-o)-(r-e)*(h=t-i),l=((s-i)*l-(a-o)*h)/u,h=c/u,f.x=t+l*(n-t),f.y=e+l*(r-e),l>=0&&l<=1&&(f.onLine1=!0),h>=0&&h<=1&&(f.onLine2=!0),!(!f.onLine1||!f.onLine2)&&[f.x,f.y])}function qa(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return wt(t,(function(t,n){var r=n.geometry.coordinates;return t+ut(r[0],r[1],e)}),0)}function Ga(t,e,n,r){var i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},o=i.steps||64,s=Ya(n),a=Ya(r),u=Array.isArray(t)||"Feature"!==t.type?{}:t.properties;if(s===a)return L(ji(t,e,i).geometry.coordinates[0],u);for(var l=s,h=s<a?a:a+360,c=l,f=[],v=0,g=(h-l)/o;c<=h;)f.push(at(t,e,c,i).geometry.coordinates),c=l+ ++v*g;return L(f,u)}function Ya(t){var e=t%360;return e<0&&(e+=360),e}function Ba(t,e,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};if(!Z(r))throw new Error("options is invalid");var i,o=r.units,s=void 0===o?"kilometers":o,a=[];if("Feature"===t.type)i=t.geometry.coordinates;else{if("LineString"!==t.type)throw new Error("input must be a LineString Feature or Geometry");i=t.coordinates}for(var u,l,h,c=i.length,f=0,v=0;v<i.length&&!(e>=f&&v===i.length-1);v++){if(f>e&&0===a.length){var g=e-f;if(!g)return a.push(i[v]),L(a);l=st(i[v],i[v-1])-180,h=at(i[v],g,l,{units:s}),a.push(h.geometry.coordinates)}if(f>=n)return(u=n-f)?(l=st(i[v],i[v-1])-180,h=at(i[v],u,l,{units:s}),a.push(h.geometry.coordinates),L(a)):(a.push(i[v]),L(a));if(f>=e&&a.push(i[v]),v===i.length-1)return L(a);f+=ut(i[v],i[v+1],{units:s})}if(f<e&&i.length===c)throw new Error("Start position is beyond line");var d=i[i.length-1];return L([d,d])}function za(t){var e=t[0],n=t[1];return[n[0]-e[0],n[1]-e[1]]}function ja(t,e){return t[0]*e[1]-e[0]*t[1]}function Xa(t,e){return!function(t,e){return 0===ja(za(t),za(e))}(t,e)&&function(t,e){var n,r,i=t[0],o=za(t),s=e[0],a=za(e),u=ja(o,a),l=function(t,e){return[t[0]+e[0],t[1]+e[1]]}(i,function(t,e){return[t*e[0],t*e[1]]}(ja((r=i,[(n=s)[0]-r[0],n[1]-r[1]]),a)/u,o));return l}(t,e)}function Ua(t,e,n){var r=[],i=G(e,n),o=Q(t),s=[];return o.forEach((function(t,e){if(e!==o.length-1){var n=(l=t,h=o[e+1],c=i,f=Math.sqrt((l[0]-h[0])*(l[0]-h[0])+(l[1]-h[1])*(l[1]-h[1])),v=l[0]+c*(h[1]-l[1])/f,g=h[0]+c*(h[1]-l[1])/f,d=l[1]+c*(l[0]-h[0])/f,p=h[1]+c*(l[0]-h[0])/f,[[v,d],[g,p]]);if(r.push(n),e>0){var a=r[e-1],u=Xa(n,a);!1!==u&&(a[1]=u,n[0]=u),s.push(a[0]),e===o.length-2&&(s.push(n[0]),s.push(n[1]))}2===o.length&&(s.push(n[0]),s.push(n[1]))}var l,h,c,f,v,g,d,p})),L(s,"Feature"===t.type?t.properties:{})}function Va(t,e){var n="Feature"===t.type?t.geometry:t;e.properties.segmentIndex>=n.coordinates.length-1&&(e.properties.segmentIndex=n.coordinates.length-2)}function Za(t,e,n,r){e=e||("Feature"===t.type?t.properties:{});var i=rt(t),o=i.coordinates,s=i.type;if(!o.length)throw new Error("line must contain coordinates");switch(s){case"LineString":return n&&(o=Ha(o)),S([o],e);case"MultiLineString":var a=[],u=0;return o.forEach((function(t){if(n&&(t=Ha(t)),r){var e=function(t){var e=t[0],n=t[1],r=t[2],i=t[3];return Math.abs(e-r)*Math.abs(n-i)}(Rt(L(t)));e>u?(a.unshift(t),u=e):a.push(t)}else a.push(t)})),S(a,e);default:throw new Error("geometry type "+s+" is not supported")}}function Ha(t){var e=t[0],n=e[0],r=e[1],i=t[t.length-1],o=i[0],s=i[1];return n===o&&r===s||t.push(e),t}function Wa(t){return R(t)}function Ja(t){var e=[[[180,90],[-180,90],[-180,-90],[180,-90],[180,90]]];return t&&(e="Feature"===t.type?t.geometry.coordinates:t.coordinates),S(e)}function Ka(t){var e,n=0,r=a(t);try{for(r.s();!(e=r.n()).done;){n+=e.value}}catch(t){r.e(t)}finally{r.f()}return n/t.length}var Qa=Object.defineProperty,$a=Object.defineProperties,tu=Object.getOwnPropertyDescriptors,eu=Object.getOwnPropertySymbols,nu=Object.prototype.hasOwnProperty,ru=Object.prototype.propertyIsEnumerable,iu=function(t,e,n){return e in t?Qa(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n},ou=function(t,e){for(var n in e||(e={}))nu.call(e,n)&&iu(t,n,e[n]);if(eu){var r,i=a(eu(e));try{for(i.s();!(r=i.n()).done;){n=r.value;ru.call(e,n)&&iu(t,n,e[n])}}catch(t){i.e(t)}finally{i.f()}}return t},su=function(t,e){return $a(t,tu(e))};function au(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!t)throw new Error("targetPoint is required");if(!e)throw new Error("points is required");var r=1/0,i=0;dt(e,(function(e,o){var s=ut(t,e,n);s<r&&(i=o,r=s)}));var o=Xi(e.features[i]);return su(ou({},o),{properties:su(ou({},o.properties),{featureIndex:i,distanceToPoint:r})})}function uu(t,e){var n,r,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=null!=(n=i.method)?n:"geodesic",s=null!=(r=i.units)?r:"kilometers";if(!t)throw new Error("pt is required");if(Array.isArray(t)?t=I(t):"Point"===t.type?t=w(t):et(t,"Point","point"),!e)throw new Error("line is required");Array.isArray(e)?e=L(e):"LineString"===e.type?e=w(e):et(e,"LineString","line");var a=1/0,u=t.geometry.coordinates;return kt(e,(function(t){if(t){var e=t.geometry.coordinates[0],n=t.geometry.coordinates[1],r=function(t,e,n,r){if("geodesic"===r.method){return Fe(L([e,n]).geometry,t,{units:"degrees"}).properties.pointDistance}var i=[n[0]-e[0],n[1]-e[1]],o=[t[0]-e[0],t[1]-e[1]],s=lu(o,i);if(s<=0)return Hs(t,e,{units:"degrees"});var a=lu(i,i);if(a<=s)return Hs(t,n,{units:"degrees"});var u=s/a,l=[e[0]+u*i[0],e[1]+u*i[1]];return Hs(t,l,{units:"degrees"})}(u,e,n,{method:o});r<a&&(a=r)}})),X(a,"degrees",s)}function lu(t,e){return t[0]*e[0]+t[1]*e[1]}var hu=Object.defineProperty,cu=Object.getOwnPropertySymbols,fu=Object.prototype.hasOwnProperty,vu=Object.prototype.propertyIsEnumerable,gu=function(t,e,n){return e in t?hu(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n},du=function(t,e){for(var n in e||(e={}))fu.call(e,n)&&gu(t,n,e[n]);if(cu){var r,i=a(cu(e));try{for(i.s();!(r=i.n()).done;){n=r.value;vu.call(e,n)&&gu(t,n,e[n])}}catch(t){i.e(t)}finally{i.f()}}return t};function pu(t,e,n,r,i,o){return Math.sqrt((i-n)*(i-n)+(o-r)*(o-r))===Math.sqrt((t-n)*(t-n)+(e-r)*(e-r))+Math.sqrt((i-t)*(i-t)+(o-e)*(o-e))}function yu(t,e){var n=[];return dt(t,(function(t){var r=!1;if("Point"===t.geometry.type)mt(e,(function(e){jt(t,e)&&(r=!0)})),r&&n.push(t);else{if("MultiPoint"!==t.geometry.type)throw new Error("Input geometry must be a Point or MultiPoint");var i=[];mt(e,(function(e){ct(t,(function(t){jt(t,e)&&(r=!0,i.push(t))}))})),r&&n.push(O(i,t.properties))}})),C(n)}function mu(t,e,n){var r=e[0]-t[0],i=e[1]-t[1],o=n[0]-e[0];return function(t){return(t>0)-(t<0)||+t}(r*(n[1]-e[1])-o*i)}function _u(t,e){return e.geometry.coordinates[0].every((function(e){return jt(I(e),t)}))}var xu=function(){return s((function t(e){i(this,t),this.id=t.buildId(e),this.coordinates=e,this.innerEdges=[],this.outerEdges=[],this.outerEdgesSorted=!1}),[{key:"removeInnerEdge",value:function(t){this.innerEdges=this.innerEdges.filter((function(e){return e.from.id!==t.from.id}))}},{key:"removeOuterEdge",value:function(t){this.outerEdges=this.outerEdges.filter((function(e){return e.to.id!==t.to.id}))}},{key:"addOuterEdge",value:function(t){this.outerEdges.push(t),this.outerEdgesSorted=!1}},{key:"sortOuterEdges",value:function(){var t=this;this.outerEdgesSorted||(this.outerEdges.sort((function(e,n){var r=e.to,i=n.to;if(r.coordinates[0]-t.coordinates[0]>=0&&i.coordinates[0]-t.coordinates[0]<0)return 1;if(r.coordinates[0]-t.coordinates[0]<0&&i.coordinates[0]-t.coordinates[0]>=0)return-1;if(r.coordinates[0]-t.coordinates[0]==0&&i.coordinates[0]-t.coordinates[0]==0)return r.coordinates[1]-t.coordinates[1]>=0||i.coordinates[1]-t.coordinates[1]>=0?r.coordinates[1]-i.coordinates[1]:i.coordinates[1]-r.coordinates[1];var o=mu(t.coordinates,r.coordinates,i.coordinates);return o<0?1:o>0?-1:Math.pow(r.coordinates[0]-t.coordinates[0],2)+Math.pow(r.coordinates[1]-t.coordinates[1],2)-(Math.pow(i.coordinates[0]-t.coordinates[0],2)+Math.pow(i.coordinates[1]-t.coordinates[1],2))})),this.outerEdgesSorted=!0)}},{key:"getOuterEdges",value:function(){return this.sortOuterEdges(),this.outerEdges}},{key:"getOuterEdge",value:function(t){return this.sortOuterEdges(),this.outerEdges[t]}},{key:"addInnerEdge",value:function(t){this.innerEdges.push(t)}}],[{key:"buildId",value:function(t){return t.join(",")}}])}(),Eu=function(){function t(e,n){i(this,t),this.from=e,this.to=n,this.next=void 0,this.label=void 0,this.symetric=void 0,this.ring=void 0,this.from.addOuterEdge(this),this.to.addInnerEdge(this)}return s(t,[{key:"getSymetric",value:function(){return this.symetric||(this.symetric=new t(this.to,this.from),this.symetric.symetric=this),this.symetric}},{key:"deleteEdge",value:function(){this.from.removeOuterEdge(this),this.to.removeInnerEdge(this)}},{key:"isEqual",value:function(t){return this.from.id===t.from.id&&this.to.id===t.to.id}},{key:"toString",value:function(){return"Edge { ".concat(this.from.id," -> ").concat(this.to.id," }")}},{key:"toLineString",value:function(){return L([this.from.coordinates,this.to.coordinates])}},{key:"compareTo",value:function(t){return mu(t.from.coordinates,t.to.coordinates,this.to.coordinates)}}])}(),ku=function(){return s((function t(){i(this,t),this.edges=[],this.polygon=void 0,this.envelope=void 0}),[{key:"push",value:function(t){this.edges.push(t),this.polygon=this.envelope=void 0}},{key:"get",value:function(t){return this.edges[t]}},{key:"length",get:function(){return this.edges.length}},{key:"forEach",value:function(t){this.edges.forEach(t)}},{key:"map",value:function(t){return this.edges.map(t)}},{key:"some",value:function(t){return this.edges.some(t)}},{key:"isValid",value:function(){return!0}},{key:"isHole",value:function(){var t=this,e=this.edges.reduce((function(e,n,r){return n.from.coordinates[1]>t.edges[e].from.coordinates[1]&&(e=r),e}),0),n=(0===e?this.length:e)-1,r=(e+1)%this.length,i=mu(this.edges[n].from.coordinates,this.edges[e].from.coordinates,this.edges[r].from.coordinates);return 0===i?this.edges[n].from.coordinates[0]>this.edges[r].from.coordinates[0]:i>0}},{key:"toMultiPoint",value:function(){return O(this.edges.map((function(t){return t.from.coordinates})))}},{key:"toPolygon",value:function(){if(this.polygon)return this.polygon;var t=this.edges.map((function(t){return t.from.coordinates}));return t.push(this.edges[0].from.coordinates),this.polygon=S([t])}},{key:"getEnvelope",value:function(){return this.envelope?this.envelope:this.envelope=Qs(this.toPolygon())}},{key:"inside",value:function(t){return jt(t,this.toPolygon())}}],[{key:"findEdgeRingContaining",value:function(t,e){var n,r,i=t.getEnvelope();return e.forEach((function(e){var o,s,u,l,h,c,f=e.getEnvelope();if((r&&(n=r.getEnvelope()),s=i,u=(o=f).geometry.coordinates[0].map((function(t){return t[0]})),l=o.geometry.coordinates[0].map((function(t){return t[1]})),h=s.geometry.coordinates[0].map((function(t){return t[0]})),c=s.geometry.coordinates[0].map((function(t){return t[1]})),Math.max.apply(null,u)!==Math.max.apply(null,h)||Math.max.apply(null,l)!==Math.max.apply(null,c)||Math.min.apply(null,u)!==Math.min.apply(null,h)||Math.min.apply(null,l)!==Math.min.apply(null,c))&&_u(f,i)){var v,g,d=a(t.map((function(t){return t.from.coordinates})));try{var p=function(){var t=g.value;e.some((function(e){return n=t,r=e.from.coordinates,n[0]===r[0]&&n[1]===r[1];var n,r}))||(v=t)};for(d.s();!(g=d.n()).done;)p()}catch(t){d.e(t)}finally{d.f()}v&&e.inside(I(v))&&(r&&!_u(n,f)||(r=e))}})),r}}])}();var wu=function(){function t(){i(this,t),this.edges=[],this.nodes={}}return s(t,[{key:"getNode",value:function(t){var e=xu.buildId(t),n=this.nodes[e];return n||(n=this.nodes[e]=new xu(t)),n}},{key:"addEdge",value:function(t,e){var n=new Eu(t,e),r=n.getSymetric();this.edges.push(n),this.edges.push(r)}},{key:"deleteDangles",value:function(){var t=this;Object.keys(this.nodes).map((function(e){return t.nodes[e]})).forEach((function(e){return t._removeIfDangle(e)}))}},{key:"_removeIfDangle",value:function(t){var e=this;if(t.innerEdges.length<=1){var n=t.getOuterEdges().map((function(t){return t.to}));this.removeNode(t),n.forEach((function(t){return e._removeIfDangle(t)}))}}},{key:"deleteCutEdges",value:function(){var t=this;this._computeNextCWEdges(),this._findLabeledEdgeRings(),this.edges.forEach((function(e){e.label===e.symetric.label&&(t.removeEdge(e.symetric),t.removeEdge(e))}))}},{key:"_computeNextCWEdges",value:function(t){var e=this;void 0===t?Object.keys(this.nodes).forEach((function(t){return e._computeNextCWEdges(e.nodes[t])})):t.getOuterEdges().forEach((function(e,n){t.getOuterEdge((0===n?t.getOuterEdges().length:n)-1).symetric.next=e}))}},{key:"_computeNextCCWEdges",value:function(t,e){for(var n,r,i=t.getOuterEdges(),o=i.length-1;o>=0;--o){var s=i[o],a=s.symetric,u=void 0,l=void 0;s.label===e&&(u=s),a.label===e&&(l=a),u&&l&&(l&&(r=l),u&&(r&&(r.next=u,r=void 0),n||(n=u)))}r&&(r.next=n)}},{key:"_findLabeledEdgeRings",value:function(){var t=[],e=0;return this.edges.forEach((function(n){if(!(n.label>=0)){t.push(n);var r=n;do{r.label=e,r=r.next}while(!n.isEqual(r));e++}})),t}},{key:"getEdgeRings",value:function(){var t=this;this._computeNextCWEdges(),this.edges.forEach((function(t){t.label=void 0})),this._findLabeledEdgeRings().forEach((function(e){t._findIntersectionNodes(e).forEach((function(n){t._computeNextCCWEdges(n,e.label)}))}));var e=[];return this.edges.forEach((function(n){n.ring||e.push(t._findEdgeRing(n))})),e}},{key:"_findIntersectionNodes",value:function(t){var e=[],n=t,r=function(){var r=0;n.from.getOuterEdges().forEach((function(e){e.label===t.label&&++r})),r>1&&e.push(n.from),n=n.next};do{r()}while(!t.isEqual(n));return e}},{key:"_findEdgeRing",value:function(t){var e=t,n=new ku;do{n.push(e),e.ring=n,e=e.next}while(!t.isEqual(e));return n}},{key:"removeNode",value:function(t){var e=this;t.getOuterEdges().forEach((function(t){return e.removeEdge(t)})),t.innerEdges.forEach((function(t){return e.removeEdge(t)})),delete this.nodes[t.id]}},{key:"removeEdge",value:function(t){this.edges=this.edges.filter((function(e){return!e.isEqual(t)})),t.deleteEdge()}}],[{key:"fromGeoJson",value:function(e){!function(t){if(!t)throw new Error("No geojson passed");if("FeatureCollection"!==t.type&&"GeometryCollection"!==t.type&&"MultiLineString"!==t.type&&"LineString"!==t.type&&"Feature"!==t.type)throw new Error("Invalid input type '".concat(t.type,"'. Geojson must be FeatureCollection, GeometryCollection, LineString, MultiLineString or Feature"))}(e);var n=new t;return xt(e,(function(t){et(t,"LineString","Graph::fromGeoJson"),ft(t,(function(t,e){if(t){var r=n.getNode(t),i=n.getNode(e);n.addEdge(r,i)}return e}))})),n}}])}();function bu(t,e){var n,r;ct(t,(function(t,i,o,s,a){if(r!==a)e.push([]);else{var u=n[0],l=n[1],h=t[0],c=t[1];e[a].push([.75*u+.25*h,.75*l+.25*c]),e[a].push([.25*u+.75*h,.25*l+.75*c])}n=t,r=a}),!1),e.forEach((function(t){t.push(t[0])}))}function Iu(t,e){var n,r,i;ct(t,(function(t,o,s,a,u){if(r!==a)e.push([[]]);else if(i!==u)e[a].push([]);else{var l=n[0],h=n[1],c=t[0],f=t[1];e[a][u].push([.75*l+.25*c,.75*h+.25*f]),e[a][u].push([.25*l+.75*c,.25*h+.75*f])}n=t,r=a,i=u}),!1),e.forEach((function(t){t.forEach((function(t){t.push(t[0])}))}))}function Nu(t,e,n,r,i){for(var o=0;o<t.length;o++){var s=t[o],a=t[o+1];o===t.length-1&&(a=t[0]);var u=Mu(s,a,e);n<=0&&u>0?Mu(e,s,r)<0||(r=s):n>0&&u<=0&&(Su(e,s,i)||(i=s)),n=u}return[r,i]}function Su(t,e,n){return Mu(t,e,n)>0}function Mu(t,e,n){return(e[0]-t[0])*(n[1]-t[1])-(n[0]-t[0])*(e[1]-t[1])}function Lu(t){return Cu(t,"mercator",arguments.length>1&&void 0!==arguments[1]?arguments[1]:{})}function Pu(t){return Cu(t,"wgs84",arguments.length>1&&void 0!==arguments[1]?arguments[1]:{})}function Cu(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=(n=n||{}).mutate;if(!t)throw new Error("geojson is required");return Array.isArray(t)&&V(t[0])?t="mercator"===e?Tu(t):Ou(t):(!0!==r&&(t=Xi(t)),ct(t,(function(t){var n="mercator"===e?Tu(t):Ou(t);t[0]=n[0],t[1]=n[1]}))),t}function Tu(t){var e=Math.PI/180,n=6378137,r=20037508.342789244,i=Math.abs(t[0])<=180?t[0]:t[0]-360*function(t){return t<0?-1:t>0?1:0}(t[0]),o=[n*i*e,n*Math.log(Math.tan(.25*Math.PI+.5*t[1]*e))];return o[0]>r&&(o[0]=r),o[0]<-20037508.342789244&&(o[0]=-20037508.342789244),o[1]>r&&(o[1]=r),o[1]<-20037508.342789244&&(o[1]=-20037508.342789244),o}function Ou(t){var e=180/Math.PI,n=6378137;return[t[0]*e/n,(.5*Math.PI-2*Math.atan(Math.exp(-t[1]/n)))*e]}var Ru=Object.freeze({__proto__:null,toMercator:Lu,toWgs84:Pu});var Au={20:1.07275,15:1.13795,10:1.22385,5:1.3581,2:1.51743,1:1.62762};function Du(t,e){return e[0]<=t[0]&&e[1]<=t[1]&&e[2]>=t[0]&&e[3]>=t[1]}function Fu(t){var e=[];return function t(n){return 0===n||1===n?1:e[n]>0?e[n]:e[n]=t(n-1)*n}(t)}function qu(t){return Yu(t),Gu(t)}function Gu(t){return Array.isArray(t)?Uu(t):t&&t.bbox?Uu(t.bbox):[360*Xu(),180*Xu()]}function Yu(t){null!=t&&(Array.isArray(t)?H(t):null!=t.bbox&&H(t.bbox))}function Bu(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};Yu(e.bbox),null==t&&(t=1);for(var n=[],r=0;r<t;r++)n.push(I(Gu(e.bbox)));return C(n)}function zu(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};Yu(e.bbox),null==t&&(t=1),void 0!==e.bbox&&null!==e.bbox||(e.bbox=[-180,-90,180,90]),V(e.num_vertices)&&void 0!==e.num_vertices||(e.num_vertices=10),V(e.max_radial_length)&&void 0!==e.max_radial_length||(e.max_radial_length=10);var n=Math.abs(e.bbox[0]-e.bbox[2]),r=Math.abs(e.bbox[1]-e.bbox[3]),i=Math.min(n/2,r/2);if(e.max_radial_length>i)throw new Error("max_radial_length is greater than the radius of the bbox");for(var o=[e.bbox[0]+e.max_radial_length,e.bbox[1]+e.max_radial_length,e.bbox[2]-e.max_radial_length,e.bbox[3]-e.max_radial_length],s=[],a=function(){var t,n=[],r=p(Array(e.num_vertices+1)).map(Math.random);r.forEach((function(t,e,n){n[e]=e>0?t+n[e-1]:t})),r.forEach((function(t){t=2*t*Math.PI/r[r.length-1];var i=Math.random();n.push([i*(e.max_radial_length||10)*Math.sin(t),i*(e.max_radial_length||10)*Math.cos(t)])})),n[n.length-1]=n[0],n=n.reverse().map((t=Gu(o),function(e){return[e[0]+t[0],e[1]+t[1]]})),s.push(S([n]))},u=0;u<t;u++)a();return C(s)}function ju(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!Z(e=e||{}))throw new Error("options is invalid");var n=e.bbox;Yu(n);var r=e.num_vertices,i=e.max_length,o=e.max_rotation;null==t&&(t=1),(!V(r)||void 0===r||r<2)&&(r=10),V(i)&&void 0!==i||(i=1e-4),V(o)&&void 0!==o||(o=Math.PI/8);for(var s=[],a=0;a<t;a++){for(var u=[Gu(n)],l=0;l<r-1;l++){var h=(0===l?2*Math.random()*Math.PI:Math.tan((u[l][1]-u[l-1][1])/(u[l][0]-u[l-1][0])))+(Math.random()-.5)*o*2,c=Math.random()*i;u.push([u[l][0]+c*Math.cos(h),u[l][1]+c*Math.sin(h)])}s.push(L(u))}return C(s)}function Xu(){return Math.random()-.5}function Uu(t){return[Math.random()*(t[2]-t[0])+t[0],Math.random()*(t[3]-t[1])+t[1]]}var Vu=Object.freeze({__proto__:null,randomLineString:ju,randomPoint:Bu,randomPolygon:zu,randomPosition:qu});function Zu(t,e){switch("Feature"===t.type?t.geometry.type:t.type){case"GeometryCollection":return mt(t,(function(t){Zu(t,e)})),t;case"LineString":return Hu(Q(t),e),t;case"Polygon":return Wu(Q(t),e),t;case"MultiLineString":return Q(t).forEach((function(t){Hu(t,e)})),t;case"MultiPolygon":return Q(t).forEach((function(t){Wu(t,e)})),t;case"Point":case"MultiPoint":return t}}function Hu(t,e){Bt(t)===e&&t.reverse()}function Wu(t,e){Bt(t[0])!==e&&t[0].reverse();for(var n=1;n<t.length;n++)Bt(t[n])===e&&t[n].reverse()}function Ju(t){var e=t%360;return e<0&&(e+=360),e}function Ku(t,e,n){if(!Z(n=n||{}))throw new Error("options is invalid");var r=n.origin||"centroid",i=n.mutate||!1;if(!t)throw new Error("geojson required");if("number"!=typeof e||e<=0)throw new Error("invalid factor");var o=Array.isArray(r)||"object"===m(r);return!0!==i&&(t=Xi(t)),"FeatureCollection"!==t.type||o?Qu(t,e,r):(dt(t,(function(n,i){t.features[i]=Qu(n,e,r)})),t)}function Qu(t,e,n){var r="Point"===it(t),i=function(t,e){null==e&&(e="centroid");if(Array.isArray(e)||"object"===m(e))return K(e);var n=t.bbox?t.bbox:Rt(t,{recompute:!0}),r=n[0],i=n[1],o=n[2],s=n[3];switch(e){case"sw":case"southwest":case"westsouth":case"bottomleft":return I([r,i]);case"se":case"southeast":case"eastsouth":case"bottomright":return I([o,i]);case"nw":case"northwest":case"westnorth":case"topleft":return I([r,s]);case"ne":case"northeast":case"eastnorth":case"topright":return I([o,s]);case"center":return Xn(t);case void 0:case null:case"centroid":return ki(t);default:throw new Error("invalid origin")}}(t,n);return 1===e||r||(ct(t,(function(t){var n=Hs(i,t),r=lt(i,t),o=Q(Ws(i,n*e,r));t[0]=o[0],t[1]=o[1],3===t.length&&(t[2]*=e)})),delete t.bbox),t}function $u(t){for(var e=t,n=[];e.parent;)n.unshift(e),e=e.parent;return n}var tl={search:function(t,e,n){var r,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};t.cleanDirty(),i=i||{};var o=tl.heuristics.manhattan,s=null!=(r=i.closest)&&r,a=new rl((function(t){return t.f})),u=e;for(e.h=o(e,n),a.push(e);a.size()>0;){var l=a.pop();if(l===n)return $u(l);l.closed=!0;for(var h=t.neighbors(l),c=0,f=h.length;c<f;++c){var v=h[c];if(!v.closed&&!v.isWall()){var g=l.g+v.getCost(l),d=v.visited;(!d||g<v.g)&&(v.visited=!0,v.parent=l,v.h=v.h||o(v,n),v.g=g,v.f=v.g+v.h,t.markDirty(v),s&&(v.h<u.h||v.h===u.h&&v.g<u.g)&&(u=v),d?a.rescoreElement(v):a.push(v))}}}return s?$u(u):[]},heuristics:{manhattan:function(t,e){return Math.abs(e.x-t.x)+Math.abs(e.y-t.y)},diagonal:function(t,e){var n=Math.sqrt(2),r=Math.abs(e.x-t.x),i=Math.abs(e.y-t.y);return 1*(r+i)+(n-2)*Math.min(r,i)}},cleanNode:function(t){t.f=0,t.g=0,t.h=0,t.visited=!1,t.closed=!1,t.parent=void 0}},el=function(){return s((function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};i(this,t),this.nodes=[],this.grid=[],this.dirtyNodes=[],this.diagonal=!!n.diagonal;for(var r=0;r<e.length;r++){this.grid[r]=[];for(var o=0,s=e[r];o<s.length;o++){var a=new nl(r,o,s[o]);this.grid[r][o]=a,this.nodes.push(a)}}this.init()}),[{key:"init",value:function(){this.dirtyNodes=[];for(var t=0;t<this.nodes.length;t++)tl.cleanNode(this.nodes[t])}},{key:"cleanDirty",value:function(){for(var t=0;t<this.dirtyNodes.length;t++)tl.cleanNode(this.dirtyNodes[t]);this.dirtyNodes=[]}},{key:"markDirty",value:function(t){this.dirtyNodes.push(t)}},{key:"neighbors",value:function(t){var e=[],n=t.x,r=t.y,i=this.grid;return i[n-1]&&i[n-1][r]&&e.push(i[n-1][r]),i[n+1]&&i[n+1][r]&&e.push(i[n+1][r]),i[n]&&i[n][r-1]&&e.push(i[n][r-1]),i[n]&&i[n][r+1]&&e.push(i[n][r+1]),this.diagonal&&(i[n-1]&&i[n-1][r-1]&&e.push(i[n-1][r-1]),i[n+1]&&i[n+1][r-1]&&e.push(i[n+1][r-1]),i[n-1]&&i[n-1][r+1]&&e.push(i[n-1][r+1]),i[n+1]&&i[n+1][r+1]&&e.push(i[n+1][r+1])),e}},{key:"toString",value:function(){for(var t,e,n,r,i=[],o=this.grid,s=0,a=o.length;s<a;s++){for(t=[],n=0,r=(e=o[s]).length;n<r;n++)t.push(e[n].weight);i.push(t.join(" "))}return i.join("\n")}}])}(),nl=function(){return s((function t(e,n,r){i(this,t),this.visited=!1,this.h=0,this.g=0,this.f=0,this.closed=!1,this.x=e,this.y=n,this.weight=r}),[{key:"toString",value:function(){return"["+this.x+" "+this.y+"]"}},{key:"getCost",value:function(t){return t&&t.x!==this.x&&t.y!==this.y?1.41421*this.weight:this.weight}},{key:"isWall",value:function(){return 0===this.weight}}])}(),rl=function(){return s((function t(e){i(this,t),this.content=[],this.scoreFunction=e}),[{key:"push",value:function(t){this.content.push(t),this.sinkDown(this.content.length-1)}},{key:"pop",value:function(){var t=this.content[0],e=this.content.pop();return this.content.length>0&&(this.content[0]=e,this.bubbleUp(0)),t}},{key:"remove",value:function(t){var e=this.content.indexOf(t),n=this.content.pop();e!==this.content.length-1&&(this.content[e]=n,this.scoreFunction(n)<this.scoreFunction(t)?this.sinkDown(e):this.bubbleUp(e))}},{key:"size",value:function(){return this.content.length}},{key:"rescoreElement",value:function(t){this.sinkDown(this.content.indexOf(t))}},{key:"sinkDown",value:function(t){for(var e=this.content[t];t>0;){var n=(t+1>>1)-1,r=this.content[n];if(!(this.scoreFunction(e)<this.scoreFunction(r)))break;this.content[n]=e,this.content[t]=r,t=n}}},{key:"bubbleUp",value:function(t){for(var e=this.content.length,n=this.content[t],r=this.scoreFunction(n);;){var i,o=t+1<<1,s=o-1,a=null;if(s<e){var u=this.content[s];(i=this.scoreFunction(u))<r&&(a=s)}if(o<e){var l=this.content[o];this.scoreFunction(l)<(null===a?r:i)&&(a=o)}if(null===a)break;this.content[t]=this.content[a],this.content[a]=n,t=a}}}])}();function il(t,e){for(var n=0;n<e.features.length;n++)if(jt(t,e.features[n]))return!0;return!1}function ol(t,e,n){var r=e[0],i=e[1],o=n[0]-r,s=n[1]-i;if(0!==o||0!==s){var a=((t[0]-r)*o+(t[1]-i)*s)/(o*o+s*s);a>1?(r=n[0],i=n[1]):a>0&&(r+=o*a,i+=s*a)}return(o=t[0]-r)*o+(s=t[1]-i)*s}function sl(t,e,n,r,i){for(var o,s=r,a=e+1;a<n;a++){var u=ol(t[a],t[e],t[n]);u>s&&(o=a,s=u)}s>r&&(o-e>1&&sl(t,e,o,r,i),i.push(t[o]),n-o>1&&sl(t,o,n,r,i))}function al(t,e){var n=t.length-1,r=[t[0]];return sl(t,0,n,e,r),r.push(t[n]),r}function ul(t,e,n){if(t.length<=2)return t;var r=void 0!==e?e*e:1;return t=n?t:function(t,e){for(var n,r,i,o,s,a=t[0],u=[a],l=1,h=t.length;l<h;l++)n=t[l],i=a,o=void 0,s=void 0,o=(r=n)[0]-i[0],s=r[1]-i[1],o*o+s*s>e&&(u.push(n),a=n);return a!==n&&u.push(n),u}(t,r),t=al(t,r)}function ll(t,e,n){return t.map((function(t){if(t.length<4)throw new Error("invalid polygon");for(var r=e,i=ul(t,r,n);!hl(i)&&r>=Number.EPSILON;)i=ul(t,r-=.01*r,n);return hl(i)?(i[i.length-1][0]===i[0][0]&&i[i.length-1][1]===i[0][1]||i.push(i[0]),i):t}))}function hl(t){return!(t.length<3)&&!(3===t.length&&t[2][0]===t[0][0]&&t[2][1]===t[0][1])}function cl(t,e){return{x:t[0]-e[0],y:t[1]-e[1]}}var fl,vl={exports:{}};var gl=function(){if(fl)return vl.exports;function t(t,n,i){i=i||2;var o,s,a,h,c,v,g,d=n&&n.length,p=d?n[0]*i:t.length,y=e(t,0,p,i,!0),m=[];if(!y||y.next===y.prev)return m;if(d&&(y=function(t,n,r,i){var o,s,a,h=[];for(o=0,s=n.length;o<s;o++)(a=e(t,n[o]*i,o<s-1?n[o+1]*i:t.length,i,!1))===a.next&&(a.steiner=!0),h.push(f(a));for(h.sort(u),o=0;o<h.length;o++)r=l(h[o],r);return r}(t,n,y,i)),t.length>80*i){o=a=t[0],s=h=t[1];for(var _=i;_<p;_+=i)(c=t[_])<o&&(o=c),(v=t[_+1])<s&&(s=v),c>a&&(a=c),v>h&&(h=v);g=0!==(g=Math.max(a-o,h-s))?32767/g:0}return r(y,m,i,o,s,g,0),m}function e(t,e,n,r,i){var o,s;if(i===I(t,e,n,r)>0)for(o=e;o<n;o+=r)s=k(o,t[o],t[o+1],s);else for(o=n-r;o>=e;o-=r)s=k(o,t[o],t[o+1],s);return s&&p(s,s.next)&&(w(s),s=s.next),s}function n(t,e){if(!t)return t;e||(e=t);var n,r=t;do{if(n=!1,r.steiner||!p(r,r.next)&&0!==d(r.prev,r,r.next))r=r.next;else{if(w(r),(r=e=r.prev)===r.next)break;n=!0}}while(n||r!==e);return e}function r(t,e,u,l,h,f,v){if(t){!v&&f&&function(t,e,n,r){var i=t;do{0===i.z&&(i.z=c(i.x,i.y,e,n,r)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next}while(i!==t);i.prevZ.nextZ=null,i.prevZ=null,function(t){var e,n,r,i,o,s,a,u,l=1;do{for(n=t,t=null,o=null,s=0;n;){for(s++,r=n,a=0,e=0;e<l&&(a++,r=r.nextZ);e++);for(u=l;a>0||u>0&&r;)0!==a&&(0===u||!r||n.z<=r.z)?(i=n,n=n.nextZ,a--):(i=r,r=r.nextZ,u--),o?o.nextZ=i:t=i,i.prevZ=o,o=i;n=r}o.nextZ=null,l*=2}while(s>1)}(i)}(t,l,h,f);for(var g,d,p=t;t.prev!==t.next;)if(g=t.prev,d=t.next,f?o(t,l,h,f):i(t))e.push(g.i/u|0),e.push(t.i/u|0),e.push(d.i/u|0),w(t),t=d.next,p=d.next;else if((t=d)===p){v?1===v?r(t=s(n(t),e,u),e,u,l,h,f,2):2===v&&a(t,e,u,l,h,f):r(n(t),e,u,l,h,f,1);break}}}function i(t){var e=t.prev,n=t,r=t.next;if(d(e,n,r)>=0)return!1;for(var i=e.x,o=n.x,s=r.x,a=e.y,u=n.y,l=r.y,h=i<o?i<s?i:s:o<s?o:s,c=a<u?a<l?a:l:u<l?u:l,f=i>o?i>s?i:s:o>s?o:s,g=a>u?a>l?a:l:u>l?u:l,p=r.next;p!==e;){if(p.x>=h&&p.x<=f&&p.y>=c&&p.y<=g&&v(i,a,o,u,s,l,p.x,p.y)&&d(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function o(t,e,n,r){var i=t.prev,o=t,s=t.next;if(d(i,o,s)>=0)return!1;for(var a=i.x,u=o.x,l=s.x,h=i.y,f=o.y,g=s.y,p=a<u?a<l?a:l:u<l?u:l,y=h<f?h<g?h:g:f<g?f:g,m=a>u?a>l?a:l:u>l?u:l,_=h>f?h>g?h:g:f>g?f:g,x=c(p,y,e,n,r),E=c(m,_,e,n,r),k=t.prevZ,w=t.nextZ;k&&k.z>=x&&w&&w.z<=E;){if(k.x>=p&&k.x<=m&&k.y>=y&&k.y<=_&&k!==i&&k!==s&&v(a,h,u,f,l,g,k.x,k.y)&&d(k.prev,k,k.next)>=0)return!1;if(k=k.prevZ,w.x>=p&&w.x<=m&&w.y>=y&&w.y<=_&&w!==i&&w!==s&&v(a,h,u,f,l,g,w.x,w.y)&&d(w.prev,w,w.next)>=0)return!1;w=w.nextZ}for(;k&&k.z>=x;){if(k.x>=p&&k.x<=m&&k.y>=y&&k.y<=_&&k!==i&&k!==s&&v(a,h,u,f,l,g,k.x,k.y)&&d(k.prev,k,k.next)>=0)return!1;k=k.prevZ}for(;w&&w.z<=E;){if(w.x>=p&&w.x<=m&&w.y>=y&&w.y<=_&&w!==i&&w!==s&&v(a,h,u,f,l,g,w.x,w.y)&&d(w.prev,w,w.next)>=0)return!1;w=w.nextZ}return!0}function s(t,e,r){var i=t;do{var o=i.prev,s=i.next.next;!p(o,s)&&y(o,i,i.next,s)&&x(o,s)&&x(s,o)&&(e.push(o.i/r|0),e.push(i.i/r|0),e.push(s.i/r|0),w(i),w(i.next),i=t=s),i=i.next}while(i!==t);return n(i)}function a(t,e,i,o,s,a){var u=t;do{for(var l=u.next.next;l!==u.prev;){if(u.i!==l.i&&g(u,l)){var h=E(u,l);return u=n(u,u.next),h=n(h,h.next),r(u,e,i,o,s,a,0),void r(h,e,i,o,s,a,0)}l=l.next}u=u.next}while(u!==t)}function u(t,e){return t.x-e.x}function l(t,e){var r=function(t,e){var n,r=e,i=t.x,o=t.y,s=-1/0;do{if(o<=r.y&&o>=r.next.y&&r.next.y!==r.y){var a=r.x+(o-r.y)*(r.next.x-r.x)/(r.next.y-r.y);if(a<=i&&a>s&&(s=a,n=r.x<r.next.x?r:r.next,a===i))return n}r=r.next}while(r!==e);if(!n)return null;var u,l=n,c=n.x,f=n.y,g=1/0;r=n;do{i>=r.x&&r.x>=c&&i!==r.x&&v(o<f?i:s,o,c,f,o<f?s:i,o,r.x,r.y)&&(u=Math.abs(o-r.y)/(i-r.x),x(r,t)&&(u<g||u===g&&(r.x>n.x||r.x===n.x&&h(n,r)))&&(n=r,g=u)),r=r.next}while(r!==l);return n}(t,e);if(!r)return e;var i=E(r,t);return n(i,i.next),n(r,r.next)}function h(t,e){return d(t.prev,t,e.prev)<0&&d(e.next,t,t.next)<0}function c(t,e,n,r,i){return(t=1431655765&((t=858993459&((t=252645135&((t=16711935&((t=(t-n)*i|0)|t<<8))|t<<4))|t<<2))|t<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-r)*i|0)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function f(t){var e=t,n=t;do{(e.x<n.x||e.x===n.x&&e.y<n.y)&&(n=e),e=e.next}while(e!==t);return n}function v(t,e,n,r,i,o,s,a){return(i-s)*(e-a)>=(t-s)*(o-a)&&(t-s)*(r-a)>=(n-s)*(e-a)&&(n-s)*(o-a)>=(i-s)*(r-a)}function g(t,e){return t.next.i!==e.i&&t.prev.i!==e.i&&!function(t,e){var n=t;do{if(n.i!==t.i&&n.next.i!==t.i&&n.i!==e.i&&n.next.i!==e.i&&y(n,n.next,t,e))return!0;n=n.next}while(n!==t);return!1}(t,e)&&(x(t,e)&&x(e,t)&&function(t,e){var n=t,r=!1,i=(t.x+e.x)/2,o=(t.y+e.y)/2;do{n.y>o!=n.next.y>o&&n.next.y!==n.y&&i<(n.next.x-n.x)*(o-n.y)/(n.next.y-n.y)+n.x&&(r=!r),n=n.next}while(n!==t);return r}(t,e)&&(d(t.prev,t,e.prev)||d(t,e.prev,e))||p(t,e)&&d(t.prev,t,t.next)>0&&d(e.prev,e,e.next)>0)}function d(t,e,n){return(e.y-t.y)*(n.x-e.x)-(e.x-t.x)*(n.y-e.y)}function p(t,e){return t.x===e.x&&t.y===e.y}function y(t,e,n,r){var i=_(d(t,e,n)),o=_(d(t,e,r)),s=_(d(n,r,t)),a=_(d(n,r,e));return i!==o&&s!==a||(!(0!==i||!m(t,n,e))||(!(0!==o||!m(t,r,e))||(!(0!==s||!m(n,t,r))||!(0!==a||!m(n,e,r)))))}function m(t,e,n){return e.x<=Math.max(t.x,n.x)&&e.x>=Math.min(t.x,n.x)&&e.y<=Math.max(t.y,n.y)&&e.y>=Math.min(t.y,n.y)}function _(t){return t>0?1:t<0?-1:0}function x(t,e){return d(t.prev,t,t.next)<0?d(t,e,t.next)>=0&&d(t,t.prev,e)>=0:d(t,e,t.prev)<0||d(t,t.next,e)<0}function E(t,e){var n=new b(t.i,t.x,t.y),r=new b(e.i,e.x,e.y),i=t.next,o=e.prev;return t.next=e,e.prev=t,n.next=i,i.prev=n,r.next=n,n.prev=r,o.next=r,r.prev=o,r}function k(t,e,n,r){var i=new b(t,e,n);return r?(i.next=r.next,i.prev=r,r.next.prev=i,r.next=i):(i.prev=i,i.next=i),i}function w(t){t.next.prev=t.prev,t.prev.next=t.next,t.prevZ&&(t.prevZ.nextZ=t.nextZ),t.nextZ&&(t.nextZ.prevZ=t.prevZ)}function b(t,e,n){this.i=t,this.x=e,this.y=n,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function I(t,e,n,r){for(var i=0,o=e,s=n-r;o<n;o+=r)i+=(t[s]-t[o])*(t[o+1]+t[s+1]),s=o;return i}return fl=1,vl.exports=t,vl.exports.default=t,t.deviation=function(t,e,n,r){var i=e&&e.length,o=i?e[0]*n:t.length,s=Math.abs(I(t,0,o,n));if(i)for(var a=0,u=e.length;a<u;a++){var l=e[a]*n,h=a<u-1?e[a+1]*n:t.length;s-=Math.abs(I(t,l,h,n))}var c=0;for(a=0;a<r.length;a+=3){var f=r[a]*n,v=r[a+1]*n,g=r[a+2]*n;c+=Math.abs((t[f]-t[g])*(t[v+1]-t[f+1])-(t[f]-t[v])*(t[g+1]-t[f+1]))}return 0===s&&0===c?0:Math.abs((c-s)/s)},t.flatten=function(t){for(var e=t[0][0].length,n={vertices:[],holes:[],dimensions:e},r=0,i=0;i<t.length;i++){for(var o=0;o<t[i].length;o++)for(var s=0;s<e;s++)n.vertices.push(t[i][o][s]);i>0&&(r+=t[i-1].length,n.holes.push(r))}return n},vl.exports}(),dl=Sn(gl);function pl(t){var e=function(t){for(var e=3,n={vertices:[],holes:[],dimensions:e},r=0,i=0;i<t.length;i++){for(var o=0;o<t[i].length;o++)for(var s=0;s<e;s++)n.vertices.push(t[i][o][s]);i>0&&(r+=t[i-1].length,n.holes.push(r))}return n}(t),n=dl(e.vertices,e.holes,3),r=[],i=[];n.forEach((function(t,r){var o=n[r];void 0!==e.vertices[3*o+2]?i.push([e.vertices[3*o],e.vertices[3*o+1],e.vertices[3*o+2]]):i.push([e.vertices[3*o],e.vertices[3*o+1]])}));for(var o=0;o<i.length;o+=3){var s=i.slice(o,o+3);s.push(i[o]),r.push(S([s]))}return r}function yl(t,e){if("Polygon"!==t.geometry.type)throw new Error("The input feature must be a Polygon");for(var n=t.geometry.coordinates,r=[],i={},o=[],s=0;s<n.length;s++)for(var a=0;a<n[s].length-1;a++)o.push(f(s,a));var u=new Jt;u.load(o);for(var l=0;l<n.length;l++)for(var h=0;h<n[l].length-1;h++){u.search(f(l,h)).forEach((function(t){var e=t.ring,n=t.edge;c(l,h,e,n)}))}return r;function c(t,o,s,a){var u,l,h=n[t][o],c=n[t][o+1],f=n[s][a],v=n[s][a+1],g=function(t,e,n,r){if(ml(t,n)||ml(t,r)||ml(e,n)||ml(r,n))return null;var i=t[0],o=t[1],s=e[0],a=e[1],u=n[0],l=n[1],h=r[0],c=r[1],f=(i-s)*(l-c)-(o-a)*(u-h);if(0===f)return null;var v=((i*a-o*s)*(u-h)-(i-s)*(u*c-l*h))/f,g=((i*a-o*s)*(l-c)-(o-a)*(u*c-l*h))/f;return[v,g]}(h,c,f,v);if(null!==g&&(u=c[0]!==h[0]?(g[0]-h[0])/(c[0]-h[0]):(g[1]-h[1])/(c[1]-h[1]),l=v[0]!==f[0]?(g[0]-f[0])/(v[0]-f[0]):(g[1]-f[1])/(v[1]-f[1]),!(u>=1||u<=0||l>=1||l<=0))){var d=g,p=!i[d.toString()];p&&(i[d.toString()]=!0),e&&r.push(e(g,t,o,h,c,u,s,a,f,v,l,p))}}function f(t,e){var r,i,o,s,a=n[t][e],u=n[t][e+1];return a[0]<u[0]?(r=a[0],i=u[0]):(r=u[0],i=a[0]),a[1]<u[1]?(o=a[1],s=u[1]):(o=u[1],s=a[1]),{minX:r,minY:o,maxX:i,maxY:s,ring:t,edge:e}}}function ml(t,e){if(!t||!e)return!1;if(t.length!==e.length)return!1;for(var n=0,r=t.length;n<r;n++)if(t[n]instanceof Array&&e[n]instanceof Array){if(!ml(t[n],e[n]))return!1}else if(t[n]!==e[n])return!1;return!0}function _l(t){if("Feature"!=t.type)throw new Error("The input must a geojson object of type Feature");if(void 0===t.geometry||null==t.geometry)throw new Error("The input must a geojson object with a non-empty geometry");if("Polygon"!=t.geometry.type)throw new Error("The input must be a geojson Polygon");for(var e=t.geometry.coordinates.length,n=[],r=0;r<e;r++){var i=t.geometry.coordinates[r];bl(i[0],i[i.length-1])||i.push(i[0]);for(var o=0;o<i.length-1;o++)n.push(i[o])}if(!function(t){for(var e={},n=1,r=0,i=t.length;r<i;++r){if(Object.prototype.hasOwnProperty.call(e,t[r].toString())){n=0;break}e[t[r].toString()]=1}return n}(n))throw new Error("The input polygon may not have duplicate vertices (except for the first and last vertex of each ring)");var s=n.length,a=yl(t,(function(t,e,n,r,i,o,s,a,u,l,h,c){return[t,e,n,r,i,o,s,a,u,l,h,c]})),u=a.length;if(0==u){var l=[];for(r=0;r<e;r++)l.push(S([t.geometry.coordinates[r]],{parent:-1,winding:wl(t.geometry.coordinates[r])}));var h=C(l);return Y(h),B(h),h}var c=[],f=[];for(r=0;r<e;r++){c.push([]);for(o=0;o<t.geometry.coordinates[r].length-1;o++)c[r].push([new xl(t.geometry.coordinates[r][Il(o+1,t.geometry.coordinates[r].length-1)],1,[r,o],[r,Il(o+1,t.geometry.coordinates[r].length-1)],void 0)]),f.push(new El(t.geometry.coordinates[r][o],[r,Il(o-1,t.geometry.coordinates[r].length-1)],[r,o],void 0,void 0,!1,!0))}for(r=0;r<u;r++)c[a[r][1]][a[r][2]].push(new xl(a[r][0],a[r][5],[a[r][1],a[r][2]],[a[r][6],a[r][7]],void 0)),a[r][11]&&f.push(new El(a[r][0],[a[r][1],a[r][2]],[a[r][6],a[r][7]],void 0,void 0,!0,!0));var v=f.length;for(r=0;r<c.length;r++)for(o=0;o<c[r].length;o++)c[r][o].sort((function(t,e){return t.param<e.param?-1:1}));var g=[];for(r=0;r<v;r++)g.push({minX:f[r].coord[0],minY:f[r].coord[1],maxX:f[r].coord[0],maxY:f[r].coord[1],index:r});var d=new Jt;d.load(g);for(r=0;r<c.length;r++)for(o=0;o<c[r].length;o++)for(var p=0;p<c[r][o].length;p++){var y=void 0;y=p==c[r][o].length-1?c[r][Il(o+1,t.geometry.coordinates[r].length-1)][0].coord:c[r][o][p+1].coord;var m=d.search({minX:y[0],minY:y[1],maxX:y[0],maxY:y[1]})[0];c[r][o][p].nxtIsectAlongEdgeIn=m.index}for(r=0;r<c.length;r++)for(o=0;o<c[r].length;o++)for(p=0;p<c[r][o].length;p++){var _=c[r][o][p].coord,x=(m=d.search({minX:_[0],minY:_[1],maxX:_[0],maxY:_[1]})[0]).index;x<s?f[x].nxtIsectAlongRingAndEdge2=c[r][o][p].nxtIsectAlongEdgeIn:bl(f[x].ringAndEdge1,c[r][o][p].ringAndEdgeIn)?f[x].nxtIsectAlongRingAndEdge1=c[r][o][p].nxtIsectAlongEdgeIn:f[x].nxtIsectAlongRingAndEdge2=c[r][o][p].nxtIsectAlongEdgeIn}var E=[];for(r=0,o=0;o<e;o++){var k=r;for(p=0;p<t.geometry.coordinates[o].length-1;p++)f[r].coord[0]<f[k].coord[0]&&(k=r),r++;var w=f[k].nxtIsectAlongRingAndEdge2;for(p=0;p<f.length;p++)if(f[p].nxtIsectAlongRingAndEdge1==k||f[p].nxtIsectAlongRingAndEdge2==k){var b=p;break}var I=kl([f[b].coord,f[k].coord,f[w].coord],!0)?1:-1;E.push({isect:k,parent:-1,winding:I})}E.sort((function(t,e){return f[t.isect].coord>f[e.isect].coord?-1:1}));for(l=[];E.length>0;){var N=E.pop(),M=N.isect,L=N.parent,P=N.winding,T=l.length,O=[f[M].coord],R=M;if(f[M].ringAndEdge1Walkable)var A=f[M].ringAndEdge1,D=f[M].nxtIsectAlongRingAndEdge1;else A=f[M].ringAndEdge2,D=f[M].nxtIsectAlongRingAndEdge2;for(;!bl(f[M].coord,f[D].coord);){O.push(f[D].coord);var F=void 0;for(r=0;r<E.length;r++)if(E[r].isect==D){F=r;break}if(null!=F&&E.splice(F,1),bl(A,f[D].ringAndEdge1)){if(A=f[D].ringAndEdge2,f[D].ringAndEdge2Walkable=!1,f[D].ringAndEdge1Walkable){var q={isect:D};kl([f[R].coord,f[D].coord,f[f[D].nxtIsectAlongRingAndEdge2].coord],1==P)?(q.parent=L,q.winding=-P):(q.parent=T,q.winding=P),E.push(q)}R=D,D=f[D].nxtIsectAlongRingAndEdge2}else{if(A=f[D].ringAndEdge1,f[D].ringAndEdge1Walkable=!1,f[D].ringAndEdge2Walkable){q={isect:D};kl([f[R].coord,f[D].coord,f[f[D].nxtIsectAlongRingAndEdge1].coord],1==P)?(q.parent=L,q.winding=-P):(q.parent=T,q.winding=P),E.push(q)}R=D,D=f[D].nxtIsectAlongRingAndEdge1}}O.push(f[D].coord),l.push(S([O],{index:T,parent:L,winding:P,netWinding:void 0}))}var G=C(l);function Y(t){for(var e=[],n=0;n<t.features.length;n++)-1==t.features[n].properties.parent&&e.push(n);if(e.length>1)for(n=0;n<e.length;n++){for(var r=-1,i=0;i<t.features.length;i++)e[n]!=i&&jt(t.features[e[n]].geometry.coordinates[0][0],t.features[i],{ignoreBoundary:!0})&&Lt(t.features[i])<Infinity&&(r=i);t.features[e[n]].properties.parent=r}}function B(t){for(var e=0;e<t.features.length;e++)if(-1==t.features[e].properties.parent){var n=t.features[e].properties.winding;t.features[e].properties.netWinding=n,z(t,e,n)}}function z(t,e,n){for(var r=0;r<t.features.length;r++)if(t.features[r].properties.parent==e){var i=n+t.features[r].properties.winding;t.features[r].properties.netWinding=i,z(t,r,i)}}return Y(G),B(G),G}var xl=s((function t(e,n,r,o,s){i(this,t),this.coord=e,this.param=n,this.ringAndEdgeIn=r,this.ringAndEdgeOut=o,this.nxtIsectAlongEdgeIn=s})),El=s((function t(e,n,r,o,s,a,u){i(this,t),this.coord=e,this.ringAndEdge1=n,this.ringAndEdge2=r,this.nxtIsectAlongRingAndEdge1=o,this.nxtIsectAlongRingAndEdge2=s,this.ringAndEdge1Walkable=a,this.ringAndEdge2Walkable=u}));function kl(t,e){if(void 0===e&&(e=!0),3!=t.length)throw new Error("This function requires an array of three points [x,y]");return(t[1][0]-t[0][0])*(t[2][1]-t[0][1])-(t[1][1]-t[0][1])*(t[2][0]-t[0][0])>=0==e}function wl(t){for(var e=0,n=0;n<t.length-1;n++)t[n][0]<t[e][0]&&(e=n);if(kl([t[Il(e-1,t.length-1)],t[e],t[Il(e+1,t.length-1)]],!0))var r=1;else r=-1;return r}function bl(t,e){if(!t||!e)return!1;if(t.length!=e.length)return!1;for(var n=0,r=t.length;n<r;n++)if(t[n]instanceof Array&&e[n]instanceof Array){if(!bl(t[n],e[n]))return!1}else if(t[n]!=e[n])return!1;return!0}function Il(t,e){return(t%e+e)%e}function Nl(t){return function(){return t}}function Sl(t){return t[0]}function Ml(t){return t[1]}function Ll(){this._=null}function Pl(t){t.U=t.C=t.L=t.R=t.P=t.N=null}function Cl(t,e){var n=e,r=e.R,i=n.U;i?i.L===n?i.L=r:i.R=r:t._=r,r.U=i,n.U=r,n.R=r.L,n.R&&(n.R.U=n),r.L=n}function Tl(t,e){var n=e,r=e.L,i=n.U;i?i.L===n?i.L=r:i.R=r:t._=r,r.U=i,n.U=r,n.L=r.R,n.L&&(n.L.U=n),r.R=n}function Ol(t){for(;t.L;)t=t.L;return t}function Rl(t,e,n,r){var i=[null,null],o=ih.push(i)-1;return i.left=t,i.right=e,n&&Dl(i,t,e,n),r&&Dl(i,e,t,r),nh[t.index].halfedges.push(o),nh[e.index].halfedges.push(o),i}function Al(t,e,n){var r=[e,n];return r.left=t,r}function Dl(t,e,n,r){t[0]||t[1]?t.left===n?t[1]=r:t[0]=r:(t[0]=r,t.left=e,t.right=n)}function Fl(t,e,n,r,i){var o,s=t[0],a=t[1],u=s[0],l=s[1],h=0,c=1,f=a[0]-u,v=a[1]-l;if(o=e-u,f||!(o>0)){if(o/=f,f<0){if(o<h)return;o<c&&(c=o)}else if(f>0){if(o>c)return;o>h&&(h=o)}if(o=r-u,f||!(o<0)){if(o/=f,f<0){if(o>c)return;o>h&&(h=o)}else if(f>0){if(o<h)return;o<c&&(c=o)}if(o=n-l,v||!(o>0)){if(o/=v,v<0){if(o<h)return;o<c&&(c=o)}else if(v>0){if(o>c)return;o>h&&(h=o)}if(o=i-l,v||!(o<0)){if(o/=v,v<0){if(o>c)return;o>h&&(h=o)}else if(v>0){if(o<h)return;o<c&&(c=o)}return!(h>0||c<1)||(h>0&&(t[0]=[u+h*f,l+h*v]),c<1&&(t[1]=[u+c*f,l+c*v]),!0)}}}}}function ql(t,e,n,r,i){var o=t[1];if(o)return!0;var s,a,u=t[0],l=t.left,h=t.right,c=l[0],f=l[1],v=h[0],g=h[1],d=(c+v)/2,p=(f+g)/2;if(g===f){if(d<e||d>=r)return;if(c>v){if(u){if(u[1]>=i)return}else u=[d,n];o=[d,i]}else{if(u){if(u[1]<n)return}else u=[d,i];o=[d,n]}}else if(a=p-(s=(c-v)/(g-f))*d,s<-1||s>1)if(c>v){if(u){if(u[1]>=i)return}else u=[(n-a)/s,n];o=[(i-a)/s,i]}else{if(u){if(u[1]<n)return}else u=[(i-a)/s,i];o=[(n-a)/s,n]}else if(f<g){if(u){if(u[0]>=r)return}else u=[e,s*e+a];o=[r,s*r+a]}else{if(u){if(u[0]<e)return}else u=[r,s*r+a];o=[e,s*e+a]}return t[0]=u,t[1]=o,!0}function Gl(t,e){var n=t.site,r=e.left,i=e.right;return n===i&&(i=r,r=n),i?Math.atan2(i[1]-r[1],i[0]-r[0]):(n===r?(r=e[1],i=e[0]):(r=e[0],i=e[1]),Math.atan2(r[0]-i[0],i[1]-r[1]))}function Yl(t,e){return e[+(e.left!==t.site)]}function Bl(t,e){return e[+(e.left===t.site)]}Ll.prototype={constructor:Ll,insert:function(t,e){var n,r,i;if(t){if(e.P=t,e.N=t.N,t.N&&(t.N.P=e),t.N=e,t.R){for(t=t.R;t.L;)t=t.L;t.L=e}else t.R=e;n=t}else this._?(t=Ol(this._),e.P=null,e.N=t,t.P=t.L=e,n=t):(e.P=e.N=null,this._=e,n=null);for(e.L=e.R=null,e.U=n,e.C=!0,t=e;n&&n.C;)n===(r=n.U).L?(i=r.R)&&i.C?(n.C=i.C=!1,r.C=!0,t=r):(t===n.R&&(Cl(this,n),n=(t=n).U),n.C=!1,r.C=!0,Tl(this,r)):(i=r.L)&&i.C?(n.C=i.C=!1,r.C=!0,t=r):(t===n.L&&(Tl(this,n),n=(t=n).U),n.C=!1,r.C=!0,Cl(this,r)),n=t.U;this._.C=!1},remove:function(t){t.N&&(t.N.P=t.P),t.P&&(t.P.N=t.N),t.N=t.P=null;var e,n,r,i=t.U,o=t.L,s=t.R;if(n=o?s?Ol(s):o:s,i?i.L===t?i.L=n:i.R=n:this._=n,o&&s?(r=n.C,n.C=t.C,n.L=o,o.U=n,n!==s?(i=n.U,n.U=t.U,t=n.R,i.L=t,n.R=s,s.U=n):(n.U=i,i=n,t=n.R)):(r=t.C,t=n),t&&(t.U=i),!r)if(t&&t.C)t.C=!1;else{do{if(t===this._)break;if(t===i.L){if((e=i.R).C&&(e.C=!1,i.C=!0,Cl(this,i),e=i.R),e.L&&e.L.C||e.R&&e.R.C){e.R&&e.R.C||(e.L.C=!1,e.C=!0,Tl(this,e),e=i.R),e.C=i.C,i.C=e.R.C=!1,Cl(this,i),t=this._;break}}else if((e=i.L).C&&(e.C=!1,i.C=!0,Tl(this,i),e=i.L),e.L&&e.L.C||e.R&&e.R.C){e.L&&e.L.C||(e.R.C=!1,e.C=!0,Cl(this,e),e=i.L),e.C=i.C,i.C=e.L.C=!1,Tl(this,i),t=this._;break}e.C=!0,t=i,i=i.U}while(!t.C);t&&(t.C=!1)}}};var zl,jl=[];function Xl(){Pl(this),this.x=this.y=this.arc=this.site=this.cy=null}function Ul(t){var e=t.P,n=t.N;if(e&&n){var r=e.site,i=t.site,o=n.site;if(r!==o){var s=i[0],a=i[1],u=r[0]-s,l=r[1]-a,h=o[0]-s,c=o[1]-a,f=2*(u*c-l*h);if(!(f>=-1e-12)){var v=u*u+l*l,g=h*h+c*c,d=(c*v-l*g)/f,p=(u*g-h*v)/f,y=jl.pop()||new Xl;y.arc=t,y.site=i,y.x=d+s,y.y=(y.cy=p+a)+Math.sqrt(d*d+p*p),t.circle=y;for(var m=null,_=rh._;_;)if(y.y<_.y||y.y===_.y&&y.x<=_.x){if(!_.L){m=_.P;break}_=_.L}else{if(!_.R){m=_;break}_=_.R}rh.insert(m,y),m||(zl=y)}}}}function Vl(t){var e=t.circle;e&&(e.P||(zl=e.N),rh.remove(e),jl.push(e),Pl(e),t.circle=null)}var Zl=[];function Hl(){Pl(this),this.edge=this.site=this.circle=null}function Wl(t){var e=Zl.pop()||new Hl;return e.site=t,e}function Jl(t){Vl(t),eh.remove(t),Zl.push(t),Pl(t)}function Kl(t){var e=t.circle,n=e.x,r=e.cy,i=[n,r],o=t.P,s=t.N,a=[t];Jl(t);for(var u=o;u.circle&&Math.abs(n-u.circle.x)<oh&&Math.abs(r-u.circle.cy)<oh;)o=u.P,a.unshift(u),Jl(u),u=o;a.unshift(u),Vl(u);for(var l=s;l.circle&&Math.abs(n-l.circle.x)<oh&&Math.abs(r-l.circle.cy)<oh;)s=l.N,a.push(l),Jl(l),l=s;a.push(l),Vl(l);var h,c=a.length;for(h=1;h<c;++h)l=a[h],u=a[h-1],Dl(l.edge,u.site,l.site,i);u=a[0],(l=a[c-1]).edge=Rl(u.site,l.site,null,i),Ul(u),Ul(l)}function Ql(t){for(var e,n,r,i,o=t[0],s=t[1],a=eh._;a;)if((r=$l(a,s)-o)>oh)a=a.L;else{if(!((i=o-th(a,s))>oh)){r>-1e-6?(e=a.P,n=a):i>-1e-6?(e=a,n=a.N):e=n=a;break}if(!a.R){e=a;break}a=a.R}!function(t){nh[t.index]={site:t,halfedges:[]}}(t);var u=Wl(t);if(eh.insert(e,u),e||n){if(e===n)return Vl(e),n=Wl(e.site),eh.insert(u,n),u.edge=n.edge=Rl(e.site,u.site),Ul(e),void Ul(n);if(n){Vl(e),Vl(n);var l=e.site,h=l[0],c=l[1],f=t[0]-h,v=t[1]-c,g=n.site,d=g[0]-h,p=g[1]-c,y=2*(f*p-v*d),m=f*f+v*v,_=d*d+p*p,x=[(p*m-v*_)/y+h,(f*_-d*m)/y+c];Dl(n.edge,l,g,x),u.edge=Rl(l,t,null,x),n.edge=Rl(t,g,null,x),Ul(e),Ul(n)}else u.edge=Rl(e.site,u.site)}}function $l(t,e){var n=t.site,r=n[0],i=n[1],o=i-e;if(!o)return r;var s=t.P;if(!s)return-1/0;var a=(n=s.site)[0],u=n[1],l=u-e;if(!l)return a;var h=a-r,c=1/o-1/l,f=h/l;return c?(-f+Math.sqrt(f*f-2*c*(h*h/(-2*l)-u+l/2+i-o/2)))/c+r:(r+a)/2}function th(t,e){var n=t.N;if(n)return $l(n,e);var r=t.site;return r[1]===e?r[0]:1/0}var eh,nh,rh,ih,oh=1e-6;function sh(t,e){return e[1]-t[1]||e[0]-t[0]}function ah(t,e){var n,r,i,o=t.sort(sh).pop();for(ih=[],nh=new Array(t.length),eh=new Ll,rh=new Ll;;)if(i=zl,o&&(!i||o[1]<i.y||o[1]===i.y&&o[0]<i.x))o[0]===n&&o[1]===r||(Ql(o),n=o[0],r=o[1]),o=t.pop();else{if(!i)break;Kl(i.arc)}if(function(){for(var t,e,n,r,i=0,o=nh.length;i<o;++i)if((t=nh[i])&&(r=(e=t.halfedges).length)){var s=new Array(r),a=new Array(r);for(n=0;n<r;++n)s[n]=n,a[n]=Gl(t,ih[e[n]]);for(s.sort((function(t,e){return a[e]-a[t]})),n=0;n<r;++n)a[n]=e[s[n]];for(n=0;n<r;++n)e[n]=a[n]}}(),e){var s=+e[0][0],a=+e[0][1],u=+e[1][0],l=+e[1][1];!function(t,e,n,r){for(var i,o=ih.length;o--;)ql(i=ih[o],t,e,n,r)&&Fl(i,t,e,n,r)&&(Math.abs(i[0][0]-i[1][0])>oh||Math.abs(i[0][1]-i[1][1])>oh)||delete ih[o]}(s,a,u,l),function(t,e,n,r){var i,o,s,a,u,l,h,c,f,v,g,d,p=nh.length,y=!0;for(i=0;i<p;++i)if(o=nh[i]){for(s=o.site,a=(u=o.halfedges).length;a--;)ih[u[a]]||u.splice(a,1);for(a=0,l=u.length;a<l;)g=(v=Bl(o,ih[u[a]]))[0],d=v[1],c=(h=Yl(o,ih[u[++a%l]]))[0],f=h[1],(Math.abs(g-c)>oh||Math.abs(d-f)>oh)&&(u.splice(a,0,ih.push(Al(s,v,Math.abs(g-t)<oh&&r-d>oh?[t,Math.abs(c-t)<oh?f:r]:Math.abs(d-r)<oh&&n-g>oh?[Math.abs(f-r)<oh?c:n,r]:Math.abs(g-n)<oh&&d-e>oh?[n,Math.abs(c-n)<oh?f:e]:Math.abs(d-e)<oh&&g-t>oh?[Math.abs(f-e)<oh?c:t,e]:null))-1),++l);l&&(y=!1)}if(y){var m,_,x,E=1/0;for(i=0,y=null;i<p;++i)(o=nh[i])&&(x=(m=(s=o.site)[0]-t)*m+(_=s[1]-e)*_)<E&&(E=x,y=o);if(y){var k=[t,e],w=[t,r],b=[n,r],I=[n,e];y.halfedges.push(ih.push(Al(s=y.site,k,w))-1,ih.push(Al(s,w,b))-1,ih.push(Al(s,b,I))-1,ih.push(Al(s,I,k))-1)}}for(i=0;i<p;++i)(o=nh[i])&&(o.halfedges.length||delete nh[i])}(s,a,u,l)}this.edges=ih,this.cells=nh,eh=rh=ih=nh=null}function uh(t,e){return e?wt(t,(function(t,e){return t+function(t){var e=d(t[0],2),n=e[0],r=e[1],i=d(t[1],2),o=i[0]-n,s=i[1]-r;return Math.sqrt(Math.pow(o,2)+Math.pow(s,2))}(e.geometry.coordinates)}),0):qa(t,{units:"meters"})}function lh(t){var e=90-t;return e>180&&(e-=360),e}function hh(t,e){var n=t[0],r=t[t.length-1];if(e){var i=d(n,2),o=i[0],s=i[1],a=d(r,2),u=a[0]-o,l=a[1]-s,h=Math.sqrt(Math.pow(u,2)+Math.pow(l,2));return h<1e-9?[NaN,NaN]:[l/h,u/h]}var c=lh(st(n,r))*Math.PI/180;return[Math.sin(c),Math.cos(c)]}function ch(t,e,n,r){if(r){var i=d(t,2),o=i[0],s=i[1],a=e*Math.PI/180,u=Math.sin(a),l=Math.cos(a);return[[o-n/2*l,s-n/2*u],[o+n/2*l,s+n/2*u]]}var h=at(I(t),n/2,e,{units:"meters"});return[K(at(I(t),-n/2,e,{units:"meters"})),K(h)]}ah.prototype={constructor:ah,polygons:function(){var t=this.edges;return this.cells.map((function(e){var n=e.halfedges.map((function(n){return Yl(e,t[n])}));return n.data=e.site.data,n}))},triangles:function(){var t=[],e=this.edges;return this.cells.forEach((function(n,r){if(o=(i=n.halfedges).length)for(var i,o,s,a,u,l,h=n.site,c=-1,f=e[i[o-1]],v=f.left===h?f.right:f.left;++c<o;)s=v,v=(f=e[i[c]]).left===h?f.right:f.left,s&&v&&r<s.index&&r<v.index&&(u=s,l=v,((a=h)[0]-l[0])*(u[1]-a[1])-(a[0]-u[0])*(l[1]-a[1])<0)&&t.push([h.data,s.data,v.data])})),t},links:function(){return this.edges.filter((function(t){return t.right})).map((function(t){return{source:t.left.data,target:t.right.data}}))},find:function(t,e,n){for(var r,i,o=this,s=o._found||0,a=o.cells.length;!(i=o.cells[s]);)if(++s>=a)return null;var u=t-i.site[0],l=e-i.site[1],h=u*u+l*l;do{i=o.cells[r=s],s=null,i.halfedges.forEach((function(n){var r=o.edges[n],a=r.left;if(a!==i.site&&a||(a=r.right)){var u=t-a[0],l=e-a[1],c=u*u+l*l;c<h&&(h=c,s=a.index)}}))}while(null!==s);return o._found=r,null==n||h<=n*n?i.site:null}},t.along=function(t,e){for(var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=rt(t).coordinates,i=0,o=0;o<r.length&&!(e>=i&&o===r.length-1);o++){if(i>=e){var s=e-i;if(s){var a=st(r[o],r[o-1])-180;return at(r[o],s,a,n)}return I(r[o])}i+=ut(r[o],r[o+1],n)}return I(r[r.length-1])},t.angle=function(t,e,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};if(!Z(r))throw new Error("options is invalid");if(!t)throw new Error("startPoint is required");if(!e)throw new Error("midPoint is required");if(!n)throw new Error("endPoint is required");var i=t,o=e,s=n,a=Y(!0!==r.mercator?st(o,i):lt(o,i)),u=Y(!0!==r.mercator?st(o,s):lt(o,s));u<a&&(u+=360);var l=u-a;return!0===r.explementary?360-l:l},t.applyFilter=$i,t.area=Lt,t.areaFactors=k,t.azimuthToBearing=B,t.bbox=Rt,t.bboxClip=function(t,e){var n=rt(t),r=n.type,i="Feature"===t.type?t.properties:{},o=n.coordinates;switch(r){case"LineString":case"MultiLineString":var s=[];return"LineString"===r&&(o=[o]),o.forEach((function(t){!function(t,e,n){var r,i,o,s,a,u=t.length,l=Ft(t[0],e),h=[];for(n||(n=[]),r=1;r<u;r++){for(s=t[r-1],i=o=Ft(a=t[r],e);;){if(!(l|i)){h.push(s),i!==o?(h.push(a),r<u-1&&(n.push(h),h=[])):r===u-1&&h.push(a);break}if(l&i)break;l?l=Ft(s=Dt(s,a,l,e),e):i=Ft(a=Dt(s,a,i,e),e)}l=o}h.length&&n.push(h)}(t,e,s)})),1===s.length?L(s[0],i):T(s,i);case"Polygon":return S(qt(o,e),i);case"MultiPolygon":return R(o.map((function(t){return qt(t,e)})),i);default:throw new Error("geometry "+r+" not supported")}},t.bboxPolygon=Gt,t.bearing=st,t.bearingToAzimuth=Y,t.bezierSpline=function(t){for(var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e.resolution||1e4,r=e.sharpness||.85,i=[],o=rt(t).coordinates.map((function(t){return{x:t[0],y:t[1]}})),s=new Yt({duration:n,points:o,sharpness:r}),a=function(t){var e=s.pos(t);Math.floor(t/100)%2==0&&i.push([e.x,e.y])},u=0;u<s.duration;u+=10)a(u);return a(s.duration),L(i,e.properties)},t.booleanClockwise=Bt,t.booleanConcave=function(t){var e=rt(t).coordinates;if(e[0].length<=4)return!1;for(var n=!1,r=e[0].length-1,i=0;i<r;i++){var o=e[0][(i+2)%r][0]-e[0][(i+1)%r][0],s=e[0][(i+2)%r][1]-e[0][(i+1)%r][1],a=e[0][i][0]-e[0][(i+1)%r][0],u=o*(e[0][i][1]-e[0][(i+1)%r][1])-s*a;if(0===i)n=u>0;else if(n!==u>0)return!0}return!1},t.booleanContains=function(t,e){var n=rt(t),r=rt(e),i=n.type,o=r.type,s=n.coordinates,u=r.coordinates;switch(i){case"Point":if("Point"===o)return Ke(s,u);throw new Error("feature2 "+o+" geometry not supported");case"MultiPoint":switch(o){case"Point":return function(t,e){var n,r=!1;for(n=0;n<t.coordinates.length;n++)if(Ke(t.coordinates[n],e.coordinates)){r=!0;break}return r}(n,r);case"MultiPoint":return function(t,e){var n,r=a(e.coordinates);try{for(r.s();!(n=r.n()).done;){var i,o=n.value,s=!1,u=a(t.coordinates);try{for(u.s();!(i=u.n()).done;){if(Ke(o,i.value)){s=!0;break}}}catch(t){u.e(t)}finally{u.f()}if(!s)return!1}}catch(t){r.e(t)}finally{r.f()}return!0}(n,r);default:throw new Error("feature2 "+o+" geometry not supported")}case"LineString":switch(o){case"Point":return Xt(r,n,{ignoreEndVertices:!0});case"LineString":return function(t,e){var n,r=!1,i=a(e.coordinates);try{for(i.s();!(n=i.n()).done;){var o=n.value;if(Xt({type:"Point",coordinates:o},t,{ignoreEndVertices:!0})&&(r=!0),!Xt({type:"Point",coordinates:o},t,{ignoreEndVertices:!1}))return!1}}catch(t){i.e(t)}finally{i.f()}return r}(n,r);case"MultiPoint":return function(t,e){var n,r=!1,i=a(e.coordinates);try{for(i.s();!(n=i.n()).done;){var o=n.value;if(Xt(o,t,{ignoreEndVertices:!0})&&(r=!0),!Xt(o,t))return!1}}catch(t){i.e(t)}finally{i.f()}if(r)return!0;return!1}(n,r);default:throw new Error("feature2 "+o+" geometry not supported")}case"Polygon":switch(o){case"Point":return jt(r,n,{ignoreBoundary:!0});case"LineString":return function(t,e){var n=Rt(t),r=Rt(e);if(!Je(n,r))return!1;var i,o=a(e.coordinates);try{for(o.s();!(i=o.n()).done;){if(!jt(i.value,t))return!1}}catch(t){o.e(t)}finally{o.f()}var s,u=!1,l=function(t,e){for(var n=t.coordinates,r=[],i=0;i<n.length-1;i++){var o=L([n[i],n[i+1]]),s=Xe(o,w(e));0===s.features.length?r.push(o):r.push.apply(r,p(s.features))}return C(r)}(e,t),h=a(l.features);try{for(h.s();!(s=h.n()).done;){var c=s.value,f=Qe(c.geometry.coordinates[0],c.geometry.coordinates[1]);if(!jt(f,t))return!1;!u&&jt(f,t,{ignoreBoundary:!0})&&(u=!0)}}catch(t){h.e(t)}finally{h.f()}return u}(n,r);case"Polygon":return We(n,r);case"MultiPoint":return function(t,e){var n,r=a(e.coordinates);try{for(r.s();!(n=r.n()).done;){if(!jt(n.value,t,{ignoreBoundary:!0}))return!1}}catch(t){r.e(t)}finally{r.f()}return!0}(n,r);case"MultiPolygon":return function(t,e){return e.coordinates.every((function(e){return We(t,{type:"Polygon",coordinates:e})}))}(n,r);default:throw new Error("feature2 "+o+" geometry not supported")}case"MultiPolygon":if("Polygon"===o)return function(t,e){return t.coordinates.some((function(t){return We({type:"Polygon",coordinates:t},e)}))}(n,r);throw new Error("feature2 "+o+" geometry not supported");default:throw new Error("feature1 "+i+" geometry not supported")}},t.booleanCrosses=yn,t.booleanDisjoint=kn,t.booleanEqual=pn,t.booleanIntersects=Nn,t.booleanOverlap=function(t,e){var n=rt(t),r=rt(e),i=n.type,o=r.type;if("MultiPoint"===i&&"MultiPoint"!==o||("LineString"===i||"MultiLineString"===i)&&"LineString"!==o&&"MultiLineString"!==o||("Polygon"===i||"MultiPolygon"===i)&&"Polygon"!==o&&"MultiPolygon"!==o)throw new Error("features must be of the same type");if("Point"===i)throw new Error("Point geometry not supported");if(un(t,e,{precision:6}))return!1;var s=0;switch(i){case"MultiPoint":for(var a=0;a<n.coordinates.length;a++)for(var u=0;u<r.coordinates.length;u++){var l=n.coordinates[a],h=r.coordinates[u];if(l[0]===h[0]&&l[1]===h[1])return!0}return!1;case"LineString":case"MultiLineString":kt(t,(function(t){kt(e,(function(e){Cn(t,e).features.length&&s++}))}));break;case"Polygon":case"MultiPolygon":kt(t,(function(t){kt(e,(function(e){Se(t,e).features.length&&s++}))}))}return s>0},t.booleanParallel=function(t,e){if(!t)throw new Error("line1 is required");if(!e)throw new Error("line2 is required");if("LineString"!==Rn(t,"line1"))throw new Error("line1 must be a LineString");if("LineString"!==Rn(e,"line2"))throw new Error("line2 must be a LineString");for(var n=ge(vn(t)).features,r=ge(vn(e)).features,i=0;i<n.length;i++){var o=n[i].geometry.coordinates;if(!r[i])break;if(!On(o,r[i].geometry.coordinates))return!1}return!0},t.booleanPointInPolygon=jt,t.booleanPointOnLine=Xt,t.booleanTouches=function(t,e){var n=rt(t),r=rt(e),i=n.type,o=r.type;switch(i){case"Point":switch(o){case"LineString":return An(n,r);case"MultiLineString":for(var s=!1,a=0;a<r.coordinates.length;a++)An(n,{coordinates:r.coordinates[a]})&&(s=!0);return s;case"Polygon":for(var u=0;u<r.coordinates.length;u++)if(Xt(n,{type:"LineString",coordinates:r.coordinates[u]}))return!0;return!1;case"MultiPolygon":for(u=0;u<r.coordinates.length;u++)for(a=0;a<r.coordinates[u].length;a++)if(Xt(n,{type:"LineString",coordinates:r.coordinates[u][a]}))return!0;return!1;default:throw new Error("feature2 "+o+" geometry not supported")}case"MultiPoint":switch(o){case"LineString":for(s=!1,u=0;u<n.coordinates.length;u++)if(s||An({coordinates:n.coordinates[u]},r)&&(s=!0),Xt({type:"Point",coordinates:n.coordinates[u]},r,{ignoreEndVertices:!0}))return!1;return s;case"MultiLineString":for(s=!1,u=0;u<n.coordinates.length;u++)for(a=0;a<r.coordinates.length;a++)if(s||An({coordinates:n.coordinates[u]},{coordinates:r.coordinates[a]})&&(s=!0),Xt({type:"Point",coordinates:n.coordinates[u]},{type:"LineString",coordinates:r.coordinates[a]},{ignoreEndVertices:!0}))return!1;return s;case"Polygon":for(s=!1,u=0;u<n.coordinates.length;u++)if(s||Xt({type:"Point",coordinates:n.coordinates[u]},{type:"LineString",coordinates:r.coordinates[0]})&&(s=!0),jt({type:"Point",coordinates:n.coordinates[u]},r,{ignoreBoundary:!0}))return!1;return s;case"MultiPolygon":for(s=!1,u=0;u<n.coordinates.length;u++)for(a=0;a<r.coordinates.length;a++)if(s||Xt({type:"Point",coordinates:n.coordinates[u]},{type:"LineString",coordinates:r.coordinates[a][0]})&&(s=!0),jt({type:"Point",coordinates:n.coordinates[u]},{type:"Polygon",coordinates:r.coordinates[a]},{ignoreBoundary:!0}))return!1;return s;default:throw new Error("feature2 "+o+" geometry not supported")}case"LineString":switch(o){case"Point":return An(r,n);case"MultiPoint":for(s=!1,u=0;u<r.coordinates.length;u++)if(s||An({coordinates:r.coordinates[u]},n)&&(s=!0),Xt({type:"Point",coordinates:r.coordinates[u]},n,{ignoreEndVertices:!0}))return!1;return s;case"LineString":var l=!1;if(An({coordinates:n.coordinates[0]},r)&&(l=!0),An({coordinates:n.coordinates[n.coordinates.length-1]},r)&&(l=!0),!1===l)return!1;for(u=0;u<n.coordinates.length;u++)if(Xt({type:"Point",coordinates:n.coordinates[u]},r,{ignoreEndVertices:!0}))return!1;return l;case"MultiLineString":for(l=!1,u=0;u<r.coordinates.length;u++){An({coordinates:n.coordinates[0]},{coordinates:r.coordinates[u]})&&(l=!0),An({coordinates:n.coordinates[n.coordinates.length-1]},{coordinates:r.coordinates[u]})&&(l=!0);for(a=0;a<n.coordinates[u].length;a++)if(Xt({type:"Point",coordinates:n.coordinates[a]},{type:"LineString",coordinates:r.coordinates[u]},{ignoreEndVertices:!0}))return!1}return l;case"Polygon":for(s=!1,u=0;u<n.coordinates.length;u++)if(s||Xt({type:"Point",coordinates:n.coordinates[u]},{type:"LineString",coordinates:r.coordinates[0]})&&(s=!0),jt({type:"Point",coordinates:n.coordinates[u]},r,{ignoreBoundary:!0}))return!1;return s;case"MultiPolygon":for(s=!1,u=0;u<n.coordinates.length;u++){for(a=0;a<r.coordinates.length;a++)s||Xt({type:"Point",coordinates:n.coordinates[u]},{type:"LineString",coordinates:r.coordinates[a][0]})&&(s=!0);if(jt({type:"Point",coordinates:n.coordinates[u]},r,{ignoreBoundary:!0}))return!1}return s;default:throw new Error("feature2 "+o+" geometry not supported")}case"MultiLineString":switch(o){case"Point":for(u=0;u<n.coordinates.length;u++)if(An(r,{coordinates:n.coordinates[u]}))return!0;return!1;case"MultiPoint":for(s=!1,u=0;u<n.coordinates.length;u++)for(a=0;a<r.coordinates.length;a++)if(s||An({coordinates:r.coordinates[a]},{coordinates:n.coordinates[a]})&&(s=!0),Xt({type:"Point",coordinates:r.coordinates[a]},{type:"LineString",coordinates:n.coordinates[a]},{ignoreEndVertices:!0}))return!1;return s;case"LineString":for(l=!1,u=0;u<n.coordinates.length;u++){An({coordinates:n.coordinates[u][0]},r)&&(l=!0),An({coordinates:n.coordinates[u][n.coordinates[u].length-1]},r)&&(l=!0);for(a=0;a<r.coordinates.length;a++)if(Xt({type:"Point",coordinates:r.coordinates[a]},{type:"LineString",coordinates:n.coordinates[u]},{ignoreEndVertices:!0}))return!1}return l;case"MultiLineString":for(l=!1,u=0;u<n.coordinates.length;u++)for(a=0;a<r.coordinates.length;a++){An({coordinates:n.coordinates[u][0]},{coordinates:r.coordinates[a]})&&(l=!0),An({coordinates:n.coordinates[u][n.coordinates[u].length-1]},{coordinates:r.coordinates[a]})&&(l=!0);for(var h=0;h<n.coordinates[u].length;h++)if(Xt({type:"Point",coordinates:n.coordinates[u][h]},{type:"LineString",coordinates:r.coordinates[a]},{ignoreEndVertices:!0}))return!1}return l;case"Polygon":for(s=!1,u=0;u<n.coordinates.length;u++)for(a=0;a<n.coordinates.length;a++)if(s||Xt({type:"Point",coordinates:n.coordinates[u][a]},{type:"LineString",coordinates:r.coordinates[0]})&&(s=!0),jt({type:"Point",coordinates:n.coordinates[u][a]},r,{ignoreBoundary:!0}))return!1;return s;case"MultiPolygon":for(s=!1,u=0;u<r.coordinates[0].length;u++)for(a=0;a<n.coordinates.length;a++)for(h=0;h<n.coordinates[a].length;h++)if(s||Xt({type:"Point",coordinates:n.coordinates[a][h]},{type:"LineString",coordinates:r.coordinates[0][u]})&&(s=!0),jt({type:"Point",coordinates:n.coordinates[a][h]},{type:"Polygon",coordinates:[r.coordinates[0][u]]},{ignoreBoundary:!0}))return!1;return s;default:throw new Error("feature2 "+o+" geometry not supported")}case"Polygon":switch(o){case"Point":for(u=0;u<n.coordinates.length;u++)if(Xt(r,{type:"LineString",coordinates:n.coordinates[u]}))return!0;return!1;case"MultiPoint":for(s=!1,u=0;u<r.coordinates.length;u++)if(s||Xt({type:"Point",coordinates:r.coordinates[u]},{type:"LineString",coordinates:n.coordinates[0]})&&(s=!0),jt({type:"Point",coordinates:r.coordinates[u]},n,{ignoreBoundary:!0}))return!1;return s;case"LineString":for(s=!1,u=0;u<r.coordinates.length;u++)if(s||Xt({type:"Point",coordinates:r.coordinates[u]},{type:"LineString",coordinates:n.coordinates[0]})&&(s=!0),jt({type:"Point",coordinates:r.coordinates[u]},n,{ignoreBoundary:!0}))return!1;return s;case"MultiLineString":for(s=!1,u=0;u<r.coordinates.length;u++)for(a=0;a<r.coordinates[u].length;a++)if(s||Xt({type:"Point",coordinates:r.coordinates[u][a]},{type:"LineString",coordinates:n.coordinates[0]})&&(s=!0),jt({type:"Point",coordinates:r.coordinates[u][a]},n,{ignoreBoundary:!0}))return!1;return s;case"Polygon":for(s=!1,u=0;u<n.coordinates[0].length;u++)if(s||Xt({type:"Point",coordinates:n.coordinates[0][u]},{type:"LineString",coordinates:r.coordinates[0]})&&(s=!0),jt({type:"Point",coordinates:n.coordinates[0][u]},r,{ignoreBoundary:!0}))return!1;return s;case"MultiPolygon":for(s=!1,u=0;u<r.coordinates[0].length;u++)for(a=0;a<n.coordinates[0].length;a++)if(s||Xt({type:"Point",coordinates:n.coordinates[0][a]},{type:"LineString",coordinates:r.coordinates[0][u]})&&(s=!0),jt({type:"Point",coordinates:n.coordinates[0][a]},{type:"Polygon",coordinates:r.coordinates[0][u]},{ignoreBoundary:!0}))return!1;return s;default:throw new Error("feature2 "+o+" geometry not supported")}case"MultiPolygon":switch(o){case"Point":for(u=0;u<n.coordinates[0].length;u++)if(Xt(r,{type:"LineString",coordinates:n.coordinates[0][u]}))return!0;return!1;case"MultiPoint":for(s=!1,u=0;u<n.coordinates[0].length;u++)for(a=0;a<r.coordinates.length;a++)if(s||Xt({type:"Point",coordinates:r.coordinates[a]},{type:"LineString",coordinates:n.coordinates[0][u]})&&(s=!0),jt({type:"Point",coordinates:r.coordinates[a]},{type:"Polygon",coordinates:n.coordinates[0][u]},{ignoreBoundary:!0}))return!1;return s;case"LineString":for(s=!1,u=0;u<n.coordinates[0].length;u++)for(a=0;a<r.coordinates.length;a++)if(s||Xt({type:"Point",coordinates:r.coordinates[a]},{type:"LineString",coordinates:n.coordinates[0][u]})&&(s=!0),jt({type:"Point",coordinates:r.coordinates[a]},{type:"Polygon",coordinates:n.coordinates[0][u]},{ignoreBoundary:!0}))return!1;return s;case"MultiLineString":for(s=!1,u=0;u<n.coordinates.length;u++)for(a=0;a<r.coordinates.length;a++)for(h=0;h<r.coordinates[a].length;h++)if(s||Xt({type:"Point",coordinates:r.coordinates[a][h]},{type:"LineString",coordinates:n.coordinates[u][0]})&&(s=!0),jt({type:"Point",coordinates:r.coordinates[a][h]},{type:"Polygon",coordinates:[n.coordinates[u][0]]},{ignoreBoundary:!0}))return!1;return s;case"Polygon":for(s=!1,u=0;u<n.coordinates[0].length;u++)for(a=0;a<n.coordinates[0][u].length;a++)if(s||Xt({type:"Point",coordinates:n.coordinates[0][u][a]},{type:"LineString",coordinates:r.coordinates[0]})&&(s=!0),jt({type:"Point",coordinates:n.coordinates[0][u][a]},r,{ignoreBoundary:!0}))return!1;return s;case"MultiPolygon":for(s=!1,u=0;u<n.coordinates[0].length;u++)for(a=0;a<r.coordinates[0].length;a++)for(h=0;h<n.coordinates[0].length;h++)if(s||Xt({type:"Point",coordinates:n.coordinates[0][u][h]},{type:"LineString",coordinates:r.coordinates[0][a]})&&(s=!0),jt({type:"Point",coordinates:n.coordinates[0][u][h]},{type:"Polygon",coordinates:r.coordinates[0][a]},{ignoreBoundary:!0}))return!1;return s;default:throw new Error("feature2 "+o+" geometry not supported")}default:throw new Error("feature1 "+i+" geometry not supported")}},t.booleanValid=function(t){if(!t.type)return!1;var e=rt(t),n=e.type,r=e.coordinates;switch(n){case"Point":return r.length>1;case"MultiPoint":for(var i=0;i<r.length;i++)if(r[i].length<2)return!1;return!0;case"LineString":if(r.length<2)return!1;for(i=0;i<r.length;i++)if(r[i].length<2)return!1;return!0;case"MultiLineString":if(r.length<2)return!1;for(i=0;i<r.length;i++)if(r[i].length<2)return!1;return!0;case"Polygon":for(i=0;i<e.coordinates.length;i++){if(r[i].length<4)return!1;if(!Fn(r[i]))return!1;if(qn(r[i]))return!1;if(i>0&&Se(S([r[0]]),S([r[i]])).features.length>1)return!1}return!0;case"MultiPolygon":for(i=0;i<e.coordinates.length;i++)for(var o=e.coordinates[i],s=0;s<o.length;s++){if(o[s].length<4)return!1;if(!Fn(o[s]))return!1;if(qn(o[s]))return!1;if(0===s&&!Gn(o,e.coordinates,i))return!1;if(s>0&&Se(S([o[0]]),S([o[s]])).features.length>1)return!1}return!0;default:return!1}},t.booleanWithin=Yn,t.buffer=function(t,e,n){var r=(n=n||{}).units||"kilometers",i=n.steps||8;if(!t)throw new Error("geojson is required");if("object"!==m(n))throw new Error("options must be an object");if("number"!=typeof i)throw new Error("steps must be an number");if(void 0===e)throw new Error("radius is required");if(i<=0)throw new Error("steps must be greater than 0");var o=[];switch(t.type){case"GeometryCollection":return mt(t,(function(t){var n=yi(t,e,r,i);n&&o.push(n)})),C(o);case"FeatureCollection":return dt(t,(function(t){var n=yi(t,e,r,i);n&&dt(n,(function(t){t&&o.push(t)}))})),C(o)}return yi(t,e,r,i)},t.center=Xn,t.centerMean=Ei,t.centerMedian=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!Z(e=e||{}))throw new Error("options is invalid");var n=e.counter||10;if(!V(n))throw new Error("counter must be a number");var r=e.weight,i=Ei(t,{weight:e.weight}),o=C([]);dt(t,(function(t){var e;o.features.push(ki(t,{properties:{weight:null==(e=t.properties)?void 0:e[r]}}))}));var s={tolerance:e.tolerance,medianCandidates:[]};return wi(i.geometry.coordinates,[0,0],o,s,n)},t.centerOfMass=function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(it(e)){case"Point":return I(K(e),n.properties);case"Polygon":var r=[];ct(e,(function(t){r.push(t)}));var i,o,s,a,u,l,h,c,f=ki(e,{properties:n.properties}),v=f.geometry.coordinates,g=0,d=0,p=0,y=r.map((function(t){return[t[0]-v[0],t[1]-v[1]]}));for(i=0;i<r.length-1;i++)a=(o=y[i])[0],l=o[1],u=(s=y[i+1])[0],p+=c=a*(h=s[1])-u*l,g+=(a+u)*c,d+=(l+h)*c;if(0===p)return f;var m=1/(6*(.5*p));return I([v[0]+m*g,v[1]+m*d],n.properties);default:var _=zi(e);return _?t(_,{properties:n.properties}):ki(e,{properties:n.properties})}},t.centroid=ki,t.circle=ji,t.cleanCoords=vn,t.clone=Xi,t.cloneProperties=Vi,t.clusterEach=Ji,t.clusterReduce=Ki,t.clusters=uo,t.clustersDbscan=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};!0!==n.mutate&&(t=Xi(t));var r=n.minPoints||3,i=G(e,n.units),o=new Jt(t.features.length),s=t.features.map((function(t){return!1})),a=t.features.map((function(t){return!1})),u=t.features.map((function(t){return!1})),l=t.features.map((function(t){return-1}));o.load(t.features.map((function(t,e){var n=d(t.geometry.coordinates,2),r=n[0],i=n[1];return{minX:r,minY:i,maxX:r,maxY:i,index:e}})));var h=function(n){var r=t.features[n],s=d(r.geometry.coordinates,2),a=s[0],u=s[1],l=Math.max(u-i,-90),h=Math.min(u+i,90),c=l<0&&h>0?i:Math.abs(l)<Math.abs(h)?i/Math.cos(j(h)):i/Math.cos(j(l)),f=Math.max(a-c,-360),v=Math.min(a+c,360),g={minX:f,minY:l,maxX:v,maxY:h};return o.search(g).filter((function(n){var i=n.index,o=t.features[i];return ut(r,o,{units:"kilometers"})<=e}))},c=0;return t.features.forEach((function(t,e){if(!s[e]){var n=h(e);if(n.length>=r){var i=c;c++,s[e]=!0,function(t,e){for(var n=0;n<e.length;n++){var i=e[n].index;if(!s[i]){s[i]=!0;var o=h(i);o.length>=r&&e.push.apply(e,p(o))}a[i]||(a[i]=!0,l[i]=t)}}(i,n)}else u[e]=!0}})),t.features.forEach((function(e,n){var r=t.features[n];r.properties||(r.properties={}),l[n]>=0?(r.properties.dbscan=u[n]?"edge":"core",r.properties.cluster=l[n]):r.properties.dbscan="noise"})),t},t.clustersKmeans=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.features.length;e.numberOfClusters=e.numberOfClusters||Math.round(Math.sqrt(n/2)),e.numberOfClusters>n&&(e.numberOfClusters=n),!0!==e.mutate&&(t=Xi(t));var r=yt(t),i=r.slice(0,e.numberOfClusters),o=co(r,e.numberOfClusters,i),s={};return o.centroids.forEach((function(t,e){s[e]=t})),dt(t,(function(t,e){var n=o.idxs[e];t.properties.cluster=n,t.properties.centroid=s[n]})),t},t.collect=function(t,e,n,r){var i=new Jt(6),o=e.features.map((function(t){var e;return{minX:t.geometry.coordinates[0],minY:t.geometry.coordinates[1],maxX:t.geometry.coordinates[0],maxY:t.geometry.coordinates[1],property:null==(e=t.properties)?void 0:e[n]}}));return i.load(o),t.features.forEach((function(t){t.properties||(t.properties={});var e=Rt(t),n=i.search({minX:e[0],minY:e[1],maxX:e[2],maxY:e[3]}),o=[];n.forEach((function(e){jt([e.minX,e.minY],t)&&o.push(e.property)})),t.properties[r]=o})),t},t.collectionOf=nt,t.combine=function(t){var e={MultiPoint:{coordinates:[],properties:[]},MultiLineString:{coordinates:[],properties:[]},MultiPolygon:{coordinates:[],properties:[]}};return dt(t,(function(t){var n,r,i,o;switch(null==(o=t.geometry)?void 0:o.type){case"Point":e.MultiPoint.coordinates.push(t.geometry.coordinates),e.MultiPoint.properties.push(t.properties);break;case"MultiPoint":(n=e.MultiPoint.coordinates).push.apply(n,p(t.geometry.coordinates)),e.MultiPoint.properties.push(t.properties);break;case"LineString":e.MultiLineString.coordinates.push(t.geometry.coordinates),e.MultiLineString.properties.push(t.properties);break;case"MultiLineString":(r=e.MultiLineString.coordinates).push.apply(r,p(t.geometry.coordinates)),e.MultiLineString.properties.push(t.properties);break;case"Polygon":e.MultiPolygon.coordinates.push(t.geometry.coordinates),e.MultiPolygon.properties.push(t.properties);break;case"MultiPolygon":(i=e.MultiPolygon.coordinates).push.apply(i,p(t.geometry.coordinates)),e.MultiPolygon.properties.push(t.properties)}})),C(Object.keys(e).filter((function(t){return e[t].coordinates.length})).sort().map((function(t){return w({type:t,coordinates:e[t].coordinates},{collectedProperties:e[t].properties})})))},t.concave=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e.maxEdge||1/0,r=function(t){var e=[],n={};return dt(t,(function(t){if(t.geometry){var r=t.geometry.coordinates.join("-");Object.prototype.hasOwnProperty.call(n,r)||(e.push(t),n[r]=!0)}})),C(e)}(t),i=fo(r);if(i.features=i.features.filter((function(t){var r=t.geometry.coordinates[0][0],i=t.geometry.coordinates[0][1],o=t.geometry.coordinates[0][2],s=ut(r,i,e),a=ut(i,o,e),u=ut(r,o,e);return s<=n&&a<=n&&u<=n})),i.features.length<1)return null;var o=Bo(i);return 1===o.coordinates.length&&(o.coordinates=o.coordinates[0],o.type="Polygon"),w(o)},t.containsNumber=$,t.convertArea=U,t.convertLength=X,t.convex=zi,t.coordAll=yt,t.coordEach=ct,t.coordReduce=ft,t.createBins=Qi,t.degreesToRadians=j,t.destination=at,t.difference=function(t){var e=[];if(mt(t,(function(t){e.push(t.coordinates)})),e.length<2)throw new Error("Must have at least two features");var n=t.features[0].properties||{},r=zs.apply(Xs,[e[0]].concat(p(e.slice(1))));return 0===r.length?null:1===r.length?S(r[0],n):R(r,n)},t.directionalMean=function(t){var e,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=!!n.planar,i=null!=(e=n.segment)&&e,o=0,s=0,a=0,u=0,l=[];i?kt(t,(function(t){var e=d(hh(t.geometry.coordinates,r),2),n=e[0],i=e[1],h=uh(t,r);isNaN(n)||isNaN(i)||(o+=n,s+=i,a+=1,u+=h,l.push(ki(t)))})):dt(t,(function(t){if("LineString"!==t.geometry.type)throw new Error("shold to support MultiLineString?");var e=d(hh(t.geometry.coordinates,r),2),n=e[0],i=e[1],h=uh(t,r);isNaN(n)||isNaN(i)||(o+=n,s+=i,a+=1,u+=h,l.push(ki(t)))}));var h=function(t,e){var n=0;n=Math.abs(e)<1e-9?90:180*Math.atan2(t,e)/Math.PI;t>=0?e<0&&(n+=180):e<0&&(n-=180);return n}(o,s),c=lh(h),f=function(t,e,n){if(0===n)throw new Error("the size of the features set must be greater than 0");return 1-Math.sqrt(Math.pow(t,2)+Math.pow(e,2))/n}(o,s,a),v=u/a,g=d(K(ki(C(l))),2),p=g[0],y=g[1];return L(ch([p,y],r?h:c,v,r),{averageLength:v,averageX:p,averageY:y,bearingAngle:c,cartesianAngle:h,circularVariance:f,countOfLines:a})},t.dissolve=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!Z(e=e||{}))throw new Error("options is invalid");var n=e.propertyName;nt(t,"Polygon","dissolve");var r=[];if(!n)return Us(R(Ys.apply(null,t.features.map((function(t){return t.geometry.coordinates})))));var i={};dt(t,(function(t){t.properties&&(Object.prototype.hasOwnProperty.call(i,t.properties[n])||(i[t.properties[n]]=[]),i[t.properties[n]].push(t))}));for(var o=Object.keys(i),s=0;s<o.length;s++){var a=R(Ys.apply(null,i[o[s]].map((function(t){return t.geometry.coordinates}))));a&&a.properties&&(a.properties[n]=o[s],r.push(a))}return Us(C(r))},t.distance=ut,t.distanceWeight=Zs,t.earthRadius=x,t.ellipse=Ks,t.envelope=Qs,t.explode=$s,t.factors=E,t.feature=w,t.featureCollection=C,t.featureEach=dt,t.featureOf=et,t.featureReduce=pt,t.filterProperties=eo,t.findPoint=St,t.findSegment=Nt,t.flatten=Us,t.flattenEach=xt,t.flattenReduce=Et,t.flip=function(t,e){var n;if(!Z(e=e||{}))throw new Error("options is invalid");var r=null!=(n=e.mutate)&&n;if(!t)throw new Error("geojson is required");return!1!==r&&void 0!==r||(t=Xi(t)),ct(t,(function(t){var e=t[0],n=t[1];t[0]=n,t[1]=e})),t},t.geojsonRbush=fe,t.geojsonType=tt,t.geomEach=mt,t.geomReduce=_t,t.geometry=b,t.geometryCollection=A,t.getCluster=Wi,t.getCoord=K,t.getCoords=Q,t.getGeom=rt,t.getType=it,t.greatCircle=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if("object"!==m(n))throw new Error("options is invalid");var r=n.properties,i=void 0===r?{}:r,o=n.npoints,s=void 0===o?100:o,a=n.offset,u=void 0===a?10:a,l=K(t),h=K(e);return l[0]===h[0]&&l[1]===h[1]?L(Array(s).fill([l[0],l[1]]),i):new sa({x:l[0],y:l[1]},{x:h[0],y:h[1]},i||{}).Arc(s,{offset:u}).json()},t.helpers=J,t.hexGrid=ua,t.interpolate=function(t,e,n){var r,i,o,s;if("object"!==m(n=n||{}))throw new Error("options is invalid");if(!t)throw new Error("points is required");if(nt(t,"Point","input must contain Points"),!e)throw new Error("cellSize is required");var a,u=null!=(r=n.gridType)?r:"square",l=null!=(i=n.property)?i:"elevation",h=null!=(o=n.weight)?o:1,c=null!=(s=n.bbox)?s:Rt(t);if(void 0!==h&&"number"!=typeof h)throw new Error("weight must be a number");switch(H(c),u){case"point":case"points":a=ca(c,e,n);break;case"square":case"squares":a=va(c,e,n);break;case"hex":case"hexes":a=ua(c,e,n);break;case"triangle":case"triangles":a=ga(c,e,n);break;default:throw new Error("invalid gridType")}var f=[];return dt(a,(function(e){var r=0,i=0;dt(t,(function(t){var o,s,a=ut("point"===u?e:ki(e),t,n);if(void 0!==l&&(s=null==(o=t.properties)?void 0:o[l]),void 0===s&&(s=t.geometry.coordinates[2]),void 0===s)throw new Error("zValue is missing");0===a&&(r=s);var c=1/Math.pow(a,h);i+=c,r+=c*s}));var o=Xi(e);null!=o.properties||(o.properties={}),o.properties[l]=r/i,f.push(o)})),C(f)},t.intersect=aa,t.invariant=ot,t.isNumber=V,t.isObject=Z,t.isobands=function(t,e,n){if(!Z(n=n||{}))throw new Error("options is invalid");var r=n.zProperty||"elevation",i=n.commonProperties||{},o=n.breaksProperties||[];if(nt(t,"Point","Input must contain Points"),!e)throw new Error("breaks is required");if(!Array.isArray(e))throw new Error("breaks is not an Array");if(!Z(i))throw new Error("commonProperties is not an Object");if(!Array.isArray(o))throw new Error("breaksProperties is not an Array");var s=Ea(t,{zProperty:r,flip:!0}),a=s[0].length;if(s.length<2||a<2)throw new Error("Matrix of points must be at least 2x2");for(var l=1;l<s.length;l++)if(s[l].length!==a)throw new Error("Matrix of points is not uniform in the x dimension");var h=function(t,e,n){for(var r,i=[],o=1;o<e.length;o++){1===o&&(r=ka(t,+e[0]));var s=+e[o],a=+e[o-1],l=ka(t,s),h=l.map((function(t){return t.map((function(t){return[t[0],t[1]]})).reverse()})),c=Ia(ba(wa(r.concat(h),t)));if(0===c.length&&t[0][0]<s&&t[0][0]>=a){var f=t[0].length,v=t.length;c.push([[[0,0],[f-1,0],[f-1,v-1],[0,v-1],[0,0]]])}i.push(u({groupedRings:c},n,a+"-"+s)),r=l}return i}(s,e,r);h=function(t,e,n){var r=Rt(n),i=r[2]-r[0],o=r[3]-r[1],s=r[0],a=r[1],u=e[0].length-1,l=e.length-1,h=i/u,c=o/l;return t.map((function(t){return t.groupedRings=t.groupedRings.map((function(t){return t.map((function(t){return t.map((function(t){return[t[0]*h+s,t[1]*c+a]}))}))})),t}))}(h,s,t);var c=h.map((function(t,e){if(o[e]&&!Z(o[e]))throw new Error("Each mappedProperty is required to be an Object");var n=xa(xa({},i),o[e]);return n[r]=t[r],R(t.groupedRings,n)}));return C(c)},t.isolines=function(t,e,n){if(!Z(n=n||{}))throw new Error("options is invalid");var r=n.zProperty||"elevation",i=n.commonProperties||{},o=n.breaksProperties||[];if(nt(t,"Point","Input must contain Points"),!e)throw new Error("breaks is required");if(!Array.isArray(e))throw new Error("breaks must be an Array");if(!Z(i))throw new Error("commonProperties must be an Object");if(!Array.isArray(o))throw new Error("breaksProperties must be an Array");var s=Aa(t,{zProperty:r,flip:!0}),a=s[0].length;if(s.length<2||a<2)throw new Error("Matrix of points must be at least 2x2");for(var u=1;u<s.length;u++)if(s[u].length!==a)throw new Error("Matrix of points is not uniform in the x dimension");var l=function(t,e,n){var r=Rt(n),i=r[2]-r[0],o=r[3]-r[1],s=r[0],a=r[1],u=e[0].length-1,l=e.length-1,h=i/u,c=o/l,f=function(t){t[0]=t[0]*h+s,t[1]=t[1]*c+a};return t.forEach((function(t){ct(t,f)})),t}(function(t,e,n,r,i){for(var o=[],s=0;s<e.length;s++){var a=+e[s],u=Ra(Ra({},r),i[s]);u[n]=a;var l=T(Da(t,a),u);o.push(l)}return o}(s,e,r,i,o),s,t);return C(l)},t.kinks=function(t){var e,n,r={type:"FeatureCollection",features:[]};if("LineString"===(n="Feature"===t.type?t.geometry:t).type)e=[n.coordinates];else if("MultiLineString"===n.type)e=n.coordinates;else if("MultiPolygon"===n.type){var i;e=(i=[]).concat.apply(i,p(n.coordinates))}else{if("Polygon"!==n.type)throw new Error("Input must be a LineString, MultiLineString, Polygon, or MultiPolygon Feature or Geometry");e=n.coordinates}return e.forEach((function(t){e.forEach((function(e){for(var n=0;n<t.length-1;n++)for(var i=n;i<e.length-1;i++){if(t===e){if(1===Math.abs(n-i))continue;if(0===n&&i===t.length-2&&t[n][0]===t[t.length-1][0]&&t[n][1]===t[t.length-1][1])continue}var o=Fa(t[n][0],t[n][1],t[n+1][0],t[n+1][1],e[i][0],e[i][1],e[i+1][0],e[i+1][1]);o&&r.features.push(I([o[0],o[1]]))}}))})),r},t.length=qa,t.lengthToDegrees=G,t.lengthToRadians=q,t.lineArc=Ga,t.lineChunk=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!Z(n))throw new Error("options is invalid");var r=n.units,i=void 0===r?"kilometers":r,o=n.reverse,s=void 0!==o&&o;if(!t)throw new Error("geojson is required");if(e<=0)throw new Error("segmentLength must be greater than 0");var a=[];return xt(t,(function(t){s&&(t.geometry.coordinates=t.geometry.coordinates.reverse()),function(t,e,n,r){var i=qa(t,{units:n});if(i<=e)return r(t);var o=i/e;Number.isInteger(o)||(o=Math.floor(o)+1);for(var s=0;s<o;s++){r(Ba(t,e*s,e*(s+1),{units:n}))}}(t,e,i,(function(t){a.push(t)}))})),C(a)},t.lineEach=bt,t.lineIntersect=Se,t.lineOffset=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!Z(n=n||{}))throw new Error("options is invalid");var r=n.units,i=void 0===r?"kilometers":r;if(!t)throw new Error("geojson is required");if(null==e||isNaN(e))throw new Error("distance is required");var o=it(t),s="Feature"===t.type?t.properties:{};switch(o){case"LineString":return Ua(t,e,i);case"MultiLineString":var a=[];return xt(t,(function(t){a.push(Ua(t,e,i).geometry.coordinates)})),T(a,s);default:throw new Error("geometry "+o+" is not supported")}},t.lineOverlap=Cn,t.lineReduce=It,t.lineSegment=ge,t.lineSlice=function(t,e,n){var r=Q(n);if("LineString"!==it(n))throw new Error("line must be a LineString");var i=Fe(n,t),o=Fe(n,e);Va(n,i),Va(n,o);for(var s=i.properties.segmentIndex<=o.properties.segmentIndex?[i,o]:[o,i],a=[s[0].geometry.coordinates],u=s[0].properties.segmentIndex+1;u<s[1].properties.segmentIndex+1;u++)a.push(r[u]);return a.push(s[1].geometry.coordinates),L(a,"Feature"===n.type?n.properties:{})},t.lineSliceAlong=Ba,t.lineSplit=Xe,t.lineString=L,t.lineStrings=P,t.lineToPolygon=function(t){var e,n,r,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=i.properties,s=null==(e=i.autoComplete)||e,a=null==(n=i.orderCoords)||n;if(null!=(r=i.mutate)&&r||(t=Xi(t)),"FeatureCollection"===t.type){var u=[];return t.features.forEach((function(t){u.push(Q(Za(t,{},s,a)))})),R(u,o)}return Za(t,o,s,a)},t.mask=function(t,e,n){var r,i=null!=(r=null==n?void 0:n.mutate)&&r,o=e;e&&!1===i&&(o=Xi(e));var s,a=Ja(o);return("FeatureCollection"===t.type?Wa(2===(s=t).features.length?Ys(s.features[0].geometry.coordinates,s.features[1].geometry.coordinates):Ys.apply(Xs,s.features.map((function(t){return t.geometry.coordinates})))):"Feature"===t.type?Wa(Ys(t.geometry.coordinates)):Wa(Ys(t.coordinates))).geometry.coordinates.forEach((function(t){a.geometry.coordinates.push(t[0])})),a},t.meta=Mt,t.midpoint=function(t,e){return at(t,ut(t,e)/2,st(t,e))},t.moranIndex=function(t,e){var n,r,i=e.inputField,o=e.threshold||1e5,s=e.p||2,u=null!=(n=e.binary)&&n,l=Zs(t,{alpha:e.alpha||-1,binary:u,p:s,standardization:null==(r=e.standardization)||r,threshold:o}),h=[];dt(t,(function(t){var e=t.properties||{};h.push(e[i])}));for(var c=Ka(h),f=function(t){var e,n=Ka(t),r=0,i=a(t);try{for(i.s();!(e=i.n()).done;){var o=e.value;r+=Math.pow(o-n,2)}}catch(t){i.e(t)}finally{i.f()}return r/t.length}(h),v=0,g=0,d=0,p=0,y=l.length,m=0;m<y;m++){for(var _=0,x=0;x<y;x++)v+=l[m][x]*(h[m]-c)*(h[x]-c),g+=l[m][x],d+=Math.pow(l[m][x]+l[x][m],2),_+=l[m][x]+l[x][m];p+=Math.pow(_,2)}var E=v/g/f,k=-1/(y-1),w=(y*y*(d*=.5)-y*p+g*g*3)/((y-1)*(y+1)*(g*g))-k*k,b=Math.sqrt(w);return{expectedMoranIndex:k,moranIndex:E,stdNorm:b,zNorm:(E-k)/b}},t.multiLineString=T,t.multiPoint=O,t.multiPolygon=R,t.nearestNeighborAnalysis=function(t,e){var n=(e=e||{}).studyArea||Gt(Rt(t)),r=e.properties||{},i=e.units||"kilometers",o=[];dt(t,(function(t){o.push(ki(t))}));var s=o.length,a=o.map((function(t,e){return ut(t,au(t,C(o.filter((function(t,n){return n!==e})))).geometry.coordinates,{units:i})})).reduce((function(t,e){return t+e}),0)/s,u=s/U(Lt(n),"meters",i),l=1/(2*Math.sqrt(u)),h=.26136/Math.sqrt(s*u);return r.nearestNeighborAnalysis={units:i,arealUnits:i+"²",observedMeanDistance:a,expectedMeanDistance:l,nearestNeighborIndex:a/l,numberOfPoints:s,zScore:(a-l)/h},n.properties=r,n},t.nearestPoint=au,t.nearestPointOnLine=Fe,t.nearestPointToLine=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=n.units,i=n.properties||{},o=function(t){var e=[];switch(t.geometry?t.geometry.type:t.type){case"GeometryCollection":return mt(t,(function(t){"Point"===t.type&&e.push({type:"Feature",properties:{},geometry:t})})),{type:"FeatureCollection",features:e};case"FeatureCollection":return t.features=t.features.filter((function(t){return"Point"===t.geometry.type})),t;default:throw new Error("points must be a Point Collection")}}(t);if(!o.features.length)throw new Error("points must contain features");if(!e)throw new Error("line is required");if("LineString"!==it(e))throw new Error("line must be a LineString");var s=1/0,a=null;return dt(o,(function(t){var n=uu(t,e,{units:r});n<s&&(s=n,a=t)})),a&&(a.properties=du(du(du({},{dist:s}),a.properties),i)),a},t.planepoint=function(t,e){var n=K(t),r=rt(e).coordinates[0];if(r.length<4)throw new Error("OuterRing of a Polygon must have 4 or more Positions.");var i="Feature"===e.type&&e.properties||{},o=i.a,s=i.b,a=i.c,u=n[0],l=n[1],h=r[0][0],c=r[0][1],f=void 0!==o?o:r[0][2],v=r[1][0],g=r[1][1],d=void 0!==s?s:r[1][2],p=r[2][0],y=r[2][1],m=void 0!==a?a:r[2][2];return(m*(u-h)*(l-g)+f*(u-v)*(l-y)+d*(u-p)*(l-c)-d*(u-h)*(l-y)-m*(u-v)*(l-c)-f*(u-p)*(l-g))/((u-h)*(l-g)+(u-v)*(l-y)+(u-p)*(l-c)-(u-h)*(l-y)-(u-v)*(l-c)-(u-p)*(l-g))},t.point=I,t.pointGrid=ca,t.pointOnFeature=function(t){for(var e=function(t){if("FeatureCollection"!==t.type)return"Feature"!==t.type?C([w(t)]):C([t]);return t}(t),n=Xn(e),r=!1,i=0;!r&&i<e.features.length;){var o=e.features[i].geometry,s=!1;if("Point"===o.type)n.geometry.coordinates[0]===o.coordinates[0]&&n.geometry.coordinates[1]===o.coordinates[1]&&(r=!0);else if("MultiPoint"===o.type)for(var a=!1,u=0;!a&&u<o.coordinates.length;)n.geometry.coordinates[0]===o.coordinates[u][0]&&n.geometry.coordinates[1]===o.coordinates[u][1]&&(r=!0,a=!0),u++;else if("LineString"===o.type)for(var l=0;!s&&l<o.coordinates.length-1;)pu(n.geometry.coordinates[0],n.geometry.coordinates[1],o.coordinates[l][0],o.coordinates[l][1],o.coordinates[l+1][0],o.coordinates[l+1][1])&&(s=!0,r=!0),l++;else if("MultiLineString"===o.type)for(var h=0;h<o.coordinates.length;){s=!1;for(var c=0,f=o.coordinates[h];!s&&c<f.length-1;)pu(n.geometry.coordinates[0],n.geometry.coordinates[1],f[c][0],f[c][1],f[c+1][0],f[c+1][1])&&(s=!0,r=!0),c++;h++}else"Polygon"!==o.type&&"MultiPolygon"!==o.type||jt(n,o)&&(r=!0);i++}if(r)return n;for(var v=C([]),g=0;g<e.features.length;g++)v.features=v.features.concat($s(e.features[g]).features);return I(au(n,v).geometry.coordinates)},t.pointToLineDistance=uu,t.pointToPolygonDistance=function t(e,r){var i,o,s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},a=null!=(i=s.method)?i:"geodesic",u=null!=(o=s.units)?o:"kilometers";if(!e)throw new Error("point is required");if(!r)throw new Error("polygon or multi-polygon is required");var l,h=rt(r);if("MultiPolygon"===h.type){var c=h.coordinates.map((function(n){return t(e,S(n),{method:a,units:u})}));return Math.min.apply(Math,p(c.map(Math.abs)))*(jt(e,r)?-1:1)}if(h.coordinates.length>1){var g=h.coordinates.map((function(n){return t(e,S([n]),{method:a,units:u})})),d=n(l=g)||f(l)||_(l)||v(),y=d[0],m=d.slice(1);if(y>=0)return y;var x=Math.min.apply(Math,p(m));return x<0?Math.abs(x):Math.max(-1*x,y)}var E=$e(h),k=1/0;return xt(E,(function(t){k=Math.min(k,uu(e,t,{method:a,units:u}))})),jt(e,h)?-k:k},t.points=N,t.pointsWithinPolygon=yu,t.polygon=S,t.polygonSmooth=function(t,e){(e=e||{}).iterations=e.iterations||1;var n=e.iterations,r=[];if(!t)throw new Error("inputPolys is required");return mt(t,(function(t,e,i){if("Polygon"===t.type){for(var o=[[]],s=0;s<n;s++){var a=[],u=t;s>0&&(u=S(o).geometry),bu(u,a),o=a.slice(0)}r.push(S(o,i))}else{if("MultiPolygon"!==t.type)throw new Error("geometry is invalid, must be Polygon or MultiPolygon");for(var l=[[[]]],h=0;h<n;h++){var c=[],f=t;h>0&&(f=R(l).geometry),Iu(f,c),l=c.slice(0)}r.push(R(l,i))}})),C(r)},t.polygonTangents=function(t,e){var n,r=Q(t),i=Q(e),o=[],s=[],a=Rt(e),u=0,l=null;switch(r[0]>a[0]&&r[0]<a[2]&&r[1]>a[1]&&r[1]<a[3]&&(u=(l=au(t,$s(e))).properties.featureIndex),it(e)){case"Polygon":o=i[0][u],s=i[0][0],null!==l&&l.geometry.coordinates[1]<r[1]&&(s=i[0][u]),n=Mu(i[0][0],i[0][i[0].length-1],r);var h=d(Nu(i[0],r,n,o,s),2);o=h[0],s=h[1];break;case"MultiPolygon":for(var c=0,f=0,v=0,g=0;g<i[0].length;g++){c=g;for(var p=!1,y=0;y<i[0][g].length;y++){if(f=y,v===u){p=!0;break}v++}if(p)break}o=i[0][c][f],s=i[0][c][f],n=Mu(i[0][0][0],i[0][0][i[0][0].length-1],r),i.forEach((function(t){var e=d(Nu(t[0],r,n,o,s),2);o=e[0],s=e[1]}))}return C([I(o),I(s)])},t.polygonToLine=$e,t.polygonize=function(t){var e=wu.fromGeoJson(t);e.deleteDangles(),e.deleteCutEdges();var n=[],r=[];return e.getEdgeRings().filter((function(t){return t.isValid()})).forEach((function(t){t.isHole()?n.push(t):r.push(t)})),n.forEach((function(t){ku.findEdgeRingContaining(t,r)&&r.push(t)})),C(r.map((function(t){return t.toPolygon()})))},t.polygons=M,t.projection=Ru,t.propEach=vt,t.propReduce=gt,t.propertiesContainsFilter=to,t.quadratAnalysis=function(t,e){for(var n=(e=e||{}).studyBbox||Rt(t),r=e.confidenceLevel||20,i=t.features,o=i.length,s=Lt(Gt(n)),u=va(n,Math.sqrt(s/o*2),{units:"meters"}).features,l={},h=0;h<u.length;h++)l[h]={box:Rt(u[h]),cnt:0};var c,f=0,v=a(i);try{for(v.s();!(c=v.n()).done;)for(var g=c.value,d=0,p=Object.keys(l);d<p.length;d++){var y=p[d],m=l[y].box;if(Du(K(g),m)){l[y].cnt+=1,f+=1;break}}}catch(t){v.e(t)}finally{v.f()}for(var _=0,x=0,E=Object.keys(l);x<E.length;x++){var k=l[E[x]].cnt;k>_&&(_=k)}for(var w=[],b=Object.keys(l).length,I=f/b,N=0,S=0;S<_+1;S++)N+=Math.exp(-I)*Math.pow(I,S)/Fu(S),w.push(N);for(var M=[],L=0,P=0;P<_+1;P++){for(var C=0,T=Object.keys(l);C<T.length;C++){l[T[C]].cnt===P&&(L+=1)}var O=L/b;M.push(O)}for(var R=0,A=0;A<_+1;A++){var D=Math.abs(w[A]-M[A]);D>R&&(R=D)}var F=Au[r]/Math.sqrt(b),q={criticalValue:F,isRandom:!0,maxAbsoluteDifference:R,observedDistribution:M};return R>F&&(q.isRandom=!1),q},t.radiansToDegrees=z,t.radiansToLength=F,t.random=Vu,t.randomLineString=ju,t.randomPoint=Bu,t.randomPolygon=zu,t.randomPosition=qu,t.rectangleGrid=fa,t.rewind=function(t){var e,n,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!Z(r=r||{}))throw new Error("options is invalid");var i=null!=(e=r.mutate)&&e,o=null!=(n=r.reverse)&&n;if(!t)throw new Error("<geojson> is required");if("boolean"!=typeof o)throw new Error("<reverse> must be a boolean");if("boolean"!=typeof i)throw new Error("<mutate> must be a boolean");i||"Point"===t.type||"MultiPoint"===t.type||(t=Xi(t));var s=[];switch(t.type){case"GeometryCollection":return mt(t,(function(t){Zu(t,o)})),t;case"FeatureCollection":return dt(t,(function(t){dt(Zu(t,o),(function(t){s.push(t)}))})),C(s)}return Zu(t,o)},t.rhumbBearing=lt,t.rhumbDestination=Ws,t.rhumbDistance=Hs,t.round=D,t.sample=function(t,e){if(!t)throw new Error("fc is required");if(null==e)throw new Error("num is required");if("number"!=typeof e)throw new Error("num must be a number");var n=C(function(t,e){var n,r,i=t.slice(0),o=t.length,s=o-e;for(;o-- >s;)n=i[r=Math.floor((o+1)*Math.random())],i[r]=i[o],i[o]=n;return i.slice(s)}(t.features,e));return n},t.sector=function(t,e,n,r){var i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{};if(!Z(i=i||{}))throw new Error("options is invalid");var o=i.properties;if(!t)throw new Error("center is required");if(null==n)throw new Error("bearing1 is required");if(null==r)throw new Error("bearing2 is required");if(!e)throw new Error("radius is required");if("object"!==m(i))throw new Error("options must be an object");if(Ju(n)===Ju(r))return ji(t,e,i);var s=Q(t),a=Ga(t,e,n,r,i),u=[[s]];return ct(a,(function(t){u[0].push(t)})),u[0].push(s),S(u,o)},t.segmentEach=kt,t.segmentReduce=wt,t.shortestPath=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!Z(n=n||{}))throw new Error("options is invalid");var r=n.obstacles||C([]),i=n.resolution||100;if(!t)throw new Error("start is required");if(!e)throw new Error("end is required");if(!V(i)||i<=0)throw new Error("options.resolution must be a number, greater than 0");var o=K(t),s=K(e);if(t=I(o),e=I(s),"FeatureCollection"===r.type){if(0===r.features.length)return L([o,s])}else if("Feature"===r.type&&"Polygon"===r.geometry.type)r=C([r]);else{if("Polygon"!==r.type)throw new Error("invalid obstacles");r=C([w(rt(r))])}var a=r;a.features.push(t),a.features.push(e);var u=d(Rt(Ku(Gt(Rt(a)),1.15)),4),l=u[0],h=u[1],c=u[2],f=u[3];a.features.pop(),a.features.pop();for(var v,g,p=ut([l,h],[c,h],n)/i,y=(c-l)/p,m=ut([l,h],[l,f],n)/i,_=(f-h)/m,x=p%1*y/2,E=[],k=[],b=1/0,N=1/0,S=f-m%1*_/2,M=0;S>=h;){for(var P=[],T=[],O=l+x,R=0;O<=c;){var A=I([O,S]),D=il(A,r);P.push(D?0:1),T.push(O+"|"+S);var F=ut(A,t);!D&&F<b&&(b=F,v={x:R,y:M});var q=ut(A,e);!D&&q<N&&(N=q,g={x:R,y:M}),O+=y,R++}k.push(P),E.push(T),S-=_,M++}var G=new el(k,{diagonal:!0}),Y=G.grid[v.y][v.x],B=G.grid[g.y][g.x],z=tl.search(G,Y,B),j=[o];return z.forEach((function(t){var e=E[t.x][t.y].split("|");j.push([+e[0],+e[1]])})),j.push(s),vn(L(j))},t.simplify=function(t){var e,n,r,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!Z(i=null!=i?i:{}))throw new Error("options is invalid");var o=null!=(e=i.tolerance)?e:1,s=null!=(n=i.highQuality)&&n,a=null!=(r=i.mutate)&&r;if(!t)throw new Error("geojson is required");if(o&&o<0)throw new Error("invalid tolerance");return!0!==a&&(t=Xi(t)),mt(t,(function(t){!function(t,e,n){var r=t.type;if("Point"===r||"MultiPoint"===r)return t;if(vn(t,{mutate:!0}),"GeometryCollection"!==r)switch(r){case"LineString":t.coordinates=ul(t.coordinates,e,n);break;case"MultiLineString":t.coordinates=t.coordinates.map((function(t){return ul(t,e,n)}));break;case"Polygon":t.coordinates=ll(t.coordinates,e,n);break;case"MultiPolygon":t.coordinates=t.coordinates.map((function(t){return ll(t,e,n)}))}}(t,o,s)})),t},t.square=function(t){var e=t[0],n=t[1],r=t[2],i=t[3];if(ut(t.slice(0,2),[r,n])>=ut(t.slice(0,2),[e,i])){var o=(n+i)/2;return[e,o-(r-e)/2,r,o+(r-e)/2]}var s=(e+r)/2;return[s-(i-n)/2,n,s+(i-n)/2,i]},t.squareGrid=va,t.standardDeviationalEllipse=function(t,e){var n;if(!Z(e=e||{}))throw new Error("options is invalid");var r=e.steps||64,i=e.weight,o=e.properties||{};if(!V(r))throw new Error("steps must be a number");if(!Z(o))throw new Error("properties must be a number");var s=yt(t).length,a=Ei(t,{weight:i}),u=0,l=0,h=0;dt(t,(function(t){var e,n=i&&(null==(e=t.properties)?void 0:e[i])||1,r=cl(Q(t),Q(a));u+=Math.pow(r.x,2)*n,l+=Math.pow(r.y,2)*n,h+=r.x*r.y*n}));var c=u-l,f=Math.sqrt(Math.pow(c,2)+4*Math.pow(h,2)),v=2*h,g=Math.atan((c+f)/v),d=180*g/Math.PI,p=0,y=0,m=0;dt(t,(function(t){var e,n=i&&(null==(e=t.properties)?void 0:e[i])||1,r=cl(Q(t),Q(a));p+=Math.pow(r.x*Math.cos(g)-r.y*Math.sin(g),2)*n,y+=Math.pow(r.x*Math.sin(g)+r.y*Math.cos(g),2)*n,m+=n}));var _=Math.sqrt(2*p/m),x=Math.sqrt(2*y/m),E=Ks(a,_,x,{units:"degrees",angle:d,steps:r,properties:o}),k=yu(t,C([E])),w={meanCenterCoordinates:Q(a),semiMajorAxis:_,semiMinorAxis:x,numberOfFeatures:s,angle:d,percentageWithinEllipse:100*yt(k).length/s};return E.properties=null!=(n=E.properties)?n:{},E.properties.standardDeviationalEllipse=w,E},t.tag=function(t,e,n,r){return t=Xi(t),e=Xi(e),dt(t,(function(t){t.properties||(t.properties={}),dt(e,(function(e){t.properties&&e.properties&&void 0===t.properties[r]&&jt(t,e)&&(t.properties[r]=e.properties[n])}))})),t},t.tesselate=function(t){if(!t.geometry||"Polygon"!==t.geometry.type&&"MultiPolygon"!==t.geometry.type)throw new Error("input must be a Polygon or MultiPolygon");var e={type:"FeatureCollection",features:[]};return"Polygon"===t.geometry.type?e.features=pl(t.geometry.coordinates):t.geometry.coordinates.forEach((function(t){e.features=e.features.concat(pl(t))})),e},t.tin=fo,t.toMercator=Lu,t.toWgs84=Pu,t.transformRotate=Js,t.transformScale=Ku,t.transformTranslate=function(t,e,n,r){if(!Z(r=r||{}))throw new Error("options is invalid");var i=r.units,o=r.zTranslation,s=r.mutate;if(!t)throw new Error("geojson is required");if(null==e||isNaN(e))throw new Error("distance is required");if(o&&"number"!=typeof o&&isNaN(o))throw new Error("zTranslation is not a number");if(o=void 0!==o?o:0,0===e&&0===o)return t;if(null==n||isNaN(n))throw new Error("direction is required");return e<0&&(e=-e,n+=180),!1!==s&&void 0!==s||(t=Xi(t)),ct(t,(function(t){var r=Q(Ws(t,e,n,{units:i}));t[0]=r[0],t[1]=r[1],o&&3===t.length&&(t[2]+=o)})),t},t.triangleGrid=ga,t.truncate=ve,t.union=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=[];if(mt(t,(function(t){n.push(t.coordinates)})),n.length<2)throw new Error("Must have at least 2 geometries");var r=Ys.apply(Xs,[n[0]].concat(p(n.slice(1))));return 0===r.length?null:1===r.length?S(r[0],e.properties):R(r,e.properties)},t.unkinkPolygon=function(t){var e=[];return xt(t,(function(t){"Polygon"===t.geometry.type&&dt(_l(t),(function(n){e.push(S(n.geometry.coordinates,t.properties))}))})),C(e)},t.validateBBox=H,t.validateId=W,t.voronoi=function(t,e){if(!Z(e=e||{}))throw new Error("options is invalid");var n=e.bbox||[-180,-85,180,85];if(!t)throw new Error("points is required");if(!Array.isArray(n))throw new Error("bbox is invalid");return nt(t,"Point","points"),C(function(){var t=Sl,e=Ml,n=null;function r(r){return new ah(r.map((function(n,i){var o=[Math.round(t(n,i,r)/oh)*oh,Math.round(e(n,i,r)/oh)*oh];return o.index=i,o.data=n,o})),n)}return r.polygons=function(t){return r(t).polygons()},r.links=function(t){return r(t).links()},r.triangles=function(t){return r(t).triangles()},r.x=function(e){return arguments.length?(t="function"==typeof e?e:Nl(+e),r):t},r.y=function(t){return arguments.length?(e="function"==typeof t?t:Nl(+t),r):e},r.extent=function(t){return arguments.length?(n=null==t?null:[[+t[0][0],+t[0][1]],[+t[1][0],+t[1][1]]],r):n&&[[n[0][0],n[0][1]],[n[1][0],n[1][1]]]},r.size=function(t){return arguments.length?(n=null==t?null:[[0,0],[+t[0],+t[1]]],r):n&&[n[1][0]-n[0][0],n[1][1]-n[0][1]]},r}().x((function(t){return t.geometry.coordinates[0]})).y((function(t){return t.geometry.coordinates[1]})).extent([[n[0],n[1]],[n[2],n[3]]]).polygons(t.features).map((function(e,n){return Object.assign(function(t){return(t=t.slice()).push(t[0]),S([t])}(e),{properties:Vi(t.features[n].properties)})})))}}));

},{}],"coordenadas-aleatorias.ts":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function () {
        return m[k];
      }
    };
  }
  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});
var __importStar = this && this.__importStar || function () {
  var ownKeys = function (o) {
    ownKeys = Object.getOwnPropertyNames || function (o) {
      var ar = [];
      for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
      return ar;
    };
    return ownKeys(o);
  };
  return function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
    __setModuleDefault(result, mod);
    return result;
  };
}();
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CoordenadasAleatorias = void 0;
const turf = __importStar(require("@turf/turf"));
class CoordenadasAleatorias {
  constructor() {
    this.coordenadas = [];
  }
  generarCoordenadas(geoJsonMapa, cantidadDeCoordenadas) {
    var linea = geoJsonMapa.features[0];
    var poligono = turf.lineToPolygon(linea);
    var bbox = geoJsonMapa.features[0].bbox;
    var puntosValidos = 0;
    var intentos = 0;
    while (puntosValidos < cantidadDeCoordenadas && intentos < cantidadDeCoordenadas * 10) {
      intentos++;
      var puntoAleatorio = turf.randomPoint(1, {
        bbox: bbox
      });
      var punto = puntoAleatorio.features[0];
      if (turf.booleanPointInPolygon(punto, poligono)) {
        var lat = punto.geometry.coordinates[1];
        var lng = punto.geometry.coordinates[0];
        this.coordenadas.push([lat, lng]);
      }
    }
    return this.coordenadas;
  }
}
exports.CoordenadasAleatorias = CoordenadasAleatorias;
},{"@turf/turf":"node_modules/@turf/turf/turf.min.js"}],"puntos.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Puntos = void 0;
const leaflet_1 = require("leaflet");
const coordenadas_aleatorias_1 = require("./coordenadas-aleatorias");
class Puntos extends leaflet_1.Circle {
  constructor(geoJsonMapa) {
    super([0, 0], {});
    this.estado = 0;
    this.setRadius(1);
    this.geoJsonMapa = geoJsonMapa;
    this.setLatLng(new coordenadas_aleatorias_1.CoordenadasAleatorias().generarCoordenadas(this.geoJsonMapa, 1)[0]);
  }
  getEstado() {
    return this.estado;
  }
  setEstado(estado) {
    this.estado = estado;
  }
  setColor() {
    this.setStyle({
      color: Puntos.colores[this.estado],
      fillColor: Puntos.colores[this.estado],
      opacity: 0.9999
    });
  }
  dibujar(mapa) {
    this.addTo(mapa);
  }
}
exports.Puntos = Puntos;
Puntos.colores = ["#11B4D4", "#D47E11", "#D41140", "#11D470"];
},{"leaflet":"node_modules/leaflet/dist/leaflet-src.js","./coordenadas-aleatorias":"coordenadas-aleatorias.ts"}],"simulacion-puntos.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimulacionDePuntos = void 0;
const puntos_1 = require("./puntos");
const variables_configuracion_1 = require("./variables-configuracion");
class SimulacionDePuntos {
  constructor(cantidadSusceptibles, cantidadInfectados, geoJsonMapa) {
    this.mapa = variables_configuracion_1.MAPA.MAPAPUNTOFIJO;
    this.puntos = [];
    this.cantidadSusceptibles = cantidadSusceptibles;
    this.cantidadInfectados = cantidadInfectados;
    this.geoJsonMapa = geoJsonMapa;
  }
  crearPuntos() {
    const numeroTotal = this.cantidadSusceptibles + this.cantidadInfectados;
    for (let numero = 0; numero < numeroTotal; numero++) {
      this.puntos.push(new puntos_1.Puntos(this.geoJsonMapa));
      if (numero < this.cantidadInfectados) {
        this.puntos[numero].setEstado(2);
      }
    }
  }
  colocarPuntos() {
    this.puntos.forEach(element => {
      element.dibujar(this.mapa);
      element.setColor();
    });
  }
  actualizarAExpuestos(cantidadNuevosExpuestos) {
    const cantidadPuntos = this.puntos.length;
    let contador = 0;
    if (cantidadPuntos === 0 || cantidadNuevosExpuestos === 0) {
      return 0;
    }
    for (let i = 0; i < cantidadPuntos; i++) {
      if (contador === cantidadNuevosExpuestos) {
        break;
      }
      if (this.puntos[i].getEstado() === 0) {
        this.puntos[i].setEstado(1);
        this.puntos[i].setColor();
        contador += 1;
      }
    }
  }
  actualizarAInfectados(cantidadNuevosInfectados) {
    const cantidadPuntos = this.puntos.length;
    let contador = 0;
    if (cantidadPuntos === 0 || cantidadNuevosInfectados === 0) {
      return 0;
    }
    for (let i = 0; i < cantidadPuntos; i++) {
      if (contador === cantidadNuevosInfectados) {
        break;
      }
      if (this.puntos[i].getEstado() === 1) {
        this.puntos[i].setEstado(2);
        this.puntos[i].setColor();
        contador += 1;
      }
    }
  }
  actualizarARecuperados(cantidadNuevosRecuperados) {
    const cantidadPuntos = this.puntos.length;
    let contador = 0;
    if (cantidadPuntos === 0 || cantidadNuevosRecuperados === 0) {
      return 0;
    }
    for (let i = 0; i < cantidadPuntos; i++) {
      if (contador === cantidadNuevosRecuperados) {
        break;
      }
      if (this.puntos[i].getEstado() === 2) {
        this.puntos[i].setEstado(3);
        this.puntos[i].setColor();
        contador += 1;
      }
    }
  }
  actualizarAMuerto(cantidadNuevosMuerto) {
    const cantidadPuntos = this.puntos.length;
    let contador = 0;
    if (cantidadPuntos === 0 || cantidadNuevosMuerto === 0) {
      return 0;
    }
    for (let i = 0; i < cantidadPuntos; i++) {
      if (contador === cantidadNuevosMuerto) {
        break;
      }
      if (this.puntos[i].getEstado() === 2) {
        this.puntos[i].setLatLng([-90, -180]);
        contador += 1;
      }
    }
  }
}
exports.SimulacionDePuntos = SimulacionDePuntos;
},{"./puntos":"puntos.ts","./variables-configuracion":"variables-configuracion.ts"}],"limites-geograficos.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LimitesGeograficos = void 0;
const variables_configuracion_1 = require("./variables-configuracion");
const leaflet_1 = require("leaflet");
class LimitesGeograficos {
  constructor() {}
  dibujarLimiteAntAeropuerto() {
    (0, leaflet_1.geoJSON)(variables_configuracion_1.GEOJSON.ANTAEROPUERTO, {
      style: {
        color: "white"
      }
    }).addTo(variables_configuracion_1.MAPA.MAPAPUNTOFIJO);
  }
}
exports.LimitesGeograficos = LimitesGeograficos;
},{"./variables-configuracion":"variables-configuracion.ts","leaflet":"node_modules/leaflet/dist/leaflet-src.js"}],"index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigMapa = void 0;
const estilo_mapa_1 = require("./estilo-mapa");
const simulacion_puntos_1 = require("./simulacion-puntos");
const variables_configuracion_1 = require("./variables-configuracion");
const limites_geograficos_1 = require("./limites-geograficos");
class ConfigMapa {
  constructor() {
    this.simulacionPuntos = null;
    this.estilosMapa = new estilo_mapa_1.EstilosMapa();
    this.limitesGeograficos = new limites_geograficos_1.LimitesGeograficos();
    this.latitud = 11.6988;
    this.longitud = -70.1977;
    this.mapaPuntoFijo = variables_configuracion_1.MAPA.MAPAPUNTOFIJO;
    this.capaInicial = variables_configuracion_1.MAPA.CAPA;
    this.capaInicial.addTo(this.mapaPuntoFijo);
  }
  visualizarPuntoFijo() {
    this.mapaPuntoFijo.setView([this.latitud, this.longitud], 12);
  }
  visualizarAntAeropuerto() {
    this.mapaPuntoFijo.setView([11.719994, -70.191911], 16);
    this.estilosMapa.colorearFueraLimite(variables_configuracion_1.GEOJSON.ANTAEROPUERTO);
    this.limitesGeograficos.dibujarLimiteAntAeropuerto();
  }
  crearSimulacionPuntosAntAeropuerto(cantidadSusceptibles, cantidadInfectados) {
    this.simulacionPuntos = new simulacion_puntos_1.SimulacionDePuntos(cantidadSusceptibles, cantidadInfectados, variables_configuracion_1.GEOJSON.ANTAEROPUERTO);
    this.simulacionPuntos.crearPuntos();
    this.simulacionPuntos.colocarPuntos();
  }
}
exports.ConfigMapa = ConfigMapa;
const inicio = new ConfigMapa();
},{"./estilo-mapa":"estilo-mapa.ts","./simulacion-puntos":"simulacion-puntos.ts","./variables-configuracion":"variables-configuracion.ts","./limites-geograficos":"limites-geograficos.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53305" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/scripts.77de5100.js.map