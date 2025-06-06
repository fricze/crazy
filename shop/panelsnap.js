/**
 * PanelSnap.js v0.0.0-development
 * Copyright (c) 2013-present, Guido Bouman
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
!(function (t, n) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = n())
    : "function" == typeof define && define.amd
      ? define(n)
      : (t.PanelSnap = n());
})(this, function () {
  "use strict";
  function t(t, n) {
    for (var e = 0; e < n.length; e++) {
      var i = n[e];
      (i.enumerable = i.enumerable || !1),
        (i.configurable = !0),
        "value" in i && (i.writable = !0),
        Object.defineProperty(t, i.key, i);
    }
  }
  function n(t, n, e) {
    return (
      n in t
        ? Object.defineProperty(t, n, {
            value: e,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (t[n] = e),
      t
    );
  }
  function e(t) {
    return (
      (function (t) {
        if (Array.isArray(t)) {
          for (var n = 0, e = new Array(t.length); n < t.length; n++)
            e[n] = t[n];
          return e;
        }
      })(t) ||
      (function (t) {
        if (
          Symbol.iterator in Object(t) ||
          "[object Arguments]" === Object.prototype.toString.call(t)
        )
          return Array.from(t);
      })(t) ||
      (function () {
        throw new TypeError("Invalid attempt to spread non-iterable instance");
      })()
    );
  }
  var i = (function () {
    function t(t, n) {
      for (var e = 0; e < n.length; e++) {
        var i = n[e];
        (i.enumerable = i.enumerable || !1),
          (i.configurable = !0),
          "value" in i && (i.writable = !0),
          Object.defineProperty(t, i.key, i);
      }
    }
    return function (n, e, i) {
      return e && t(n.prototype, e), i && t(n, i), n;
    };
  })();
  var s = (function () {
    function t() {
      var n =
        arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      !(function (t, n) {
        if (!(t instanceof n))
          throw new TypeError("Cannot call a class as a function");
      })(this, t),
        (this.duration = n.duration || 1e3),
        (this.ease = n.easing || this._defaultEase),
        (this.start = n.start),
        (this.end = n.end),
        (this.frame = null),
        (this.next = null),
        (this.isRunning = !1),
        (this.events = {}),
        (this.direction = this.start < this.end ? "up" : "down");
    }
    return (
      i(t, [
        {
          key: "begin",
          value: function () {
            return (
              this.isRunning ||
                this.next === this.end ||
                (this.frame = window.requestAnimationFrame(
                  this._tick.bind(this),
                )),
              this
            );
          },
        },
        {
          key: "stop",
          value: function () {
            return (
              window.cancelAnimationFrame(this.frame),
              (this.isRunning = !1),
              (this.frame = null),
              (this.timeStart = null),
              (this.next = null),
              this
            );
          },
        },
        {
          key: "on",
          value: function (t, n) {
            return (
              (this.events[t] = this.events[t] || []),
              this.events[t].push(n),
              this
            );
          },
        },
        {
          key: "emit",
          value: function (t, n) {
            var e = this,
              i = this.events[t];
            i &&
              i.forEach(function (t) {
                return t.call(e, n);
              });
          },
        },
        {
          key: "_tick",
          value: function (t) {
            this.isRunning = !0;
            var n = this.next || this.start;
            this.timeStart || (this.timeStart = t),
              (this.timeElapsed = t - this.timeStart),
              (this.next = Math.round(
                this.ease(
                  this.timeElapsed,
                  this.start,
                  this.end - this.start,
                  this.duration,
                ),
              )),
              this._shouldTick(n)
                ? (this.emit("tick", this.next),
                  (this.frame = window.requestAnimationFrame(
                    this._tick.bind(this),
                  )))
                : (this.emit("tick", this.end), this.emit("done", null));
          },
        },
        {
          key: "_shouldTick",
          value: function (t) {
            return {
              up: this.next < this.end && t <= this.next,
              down: this.next > this.end && t >= this.next,
            }[this.direction];
          },
        },
        {
          key: "_defaultEase",
          value: function (t, n, e, i) {
            return (t /= i / 2) < 1
              ? (e / 2) * t * t + n
              : (-e / 2) * (--t * (t - 2) - 1) + n;
          },
        },
      ]),
      t
    );
  })();
  function o(t) {
    return t !== document.body
      ? t
      : "scrollingElement" in document
        ? document.scrollingElement
        : navigator.userAgent.indexOf("WebKit") > -1
          ? document.body
          : document.documentElement;
  }
  function r(t) {
    if (t === document.body) {
      var n = document.documentElement;
      return {
        top: 0,
        left: 0,
        bottom: n.clientHeight,
        right: n.clientWidth,
        height: n.clientHeight,
        width: n.clientWidth,
      };
    }
    return t.getBoundingClientRect();
  }
  var a = (function () {
      var t = !1;
      try {
        var n = Object.defineProperty({}, "passive", {
          get: function () {
            t = !0;
          },
        });
        window.addEventListener("test", null, n),
          window.removeEventListener("test", null, n);
      } catch (t) {}
      return t;
    })(),
    l = 0,
    c = {
      container: document.body,
      panelSelector: "> section",
      directionThreshold: 50,
      delay: 0,
      duration: 300,
      easing: function (t) {
        return t;
      },
    };
  return (function () {
    function i(t) {
      if (
        ((function (t, n) {
          if (!(t instanceof n))
            throw new TypeError("Cannot call a class as a function");
        })(this, i),
        (this.options = (function (t) {
          for (var e = 1; e < arguments.length; e++) {
            var i = null != arguments[e] ? arguments[e] : {},
              s = Object.keys(i);
            "function" == typeof Object.getOwnPropertySymbols &&
              (s = s.concat(
                Object.getOwnPropertySymbols(i).filter(function (t) {
                  return Object.getOwnPropertyDescriptor(i, t).enumerable;
                }),
              )),
              s.forEach(function (e) {
                n(t, e, i[e]);
              });
          }
          return t;
        })({}, c, t)),
        this.options.container.dataset.panelsnapId)
      )
        throw new Error(
          "PanelSnap is already initialised on this container, aborting.",
        );
      var e;
      (this.container = this.options.container),
        (this.scrollContainer = o(this.container)),
        (this.scrollEventContainer =
          (e = this.container) === document.body ? window : o(e)),
        (l += 1),
        (this.instanceIndex = l),
        (this.container.dataset.panelsnapId = this.instanceIndex);
      var s = '[data-panelsnap-id="'
        .concat(this.instanceIndex, '"] ')
        .concat(this.options.panelSelector);
      (this.panelList = Array.from(document.querySelectorAll(s))),
        (this.events = []),
        (this.isEnabled = !0),
        (this.isInteracting = !1),
        (this.scrollTimeout = null),
        this.resetAnimation(),
        (this.onInteractStart = this.onInteractStart.bind(this)),
        (this.onInteractStop = this.onInteractStop.bind(this)),
        (this.onInteractStart = this.onInteractStart.bind(this)),
        (this.onInteractStop = this.onInteractStop.bind(this)),
        (this.onInteractStart = this.onInteractStart.bind(this)),
        (this.onInteractStop = this.onInteractStop.bind(this)),
        (this.onScroll = this.onScroll.bind(this)),
        (this.onInteract = this.onInteract.bind(this)),
        this.scrollEventContainer.addEventListener(
          "keydown",
          this.onInteractStart,
          a && { passive: !0 },
        ),
        this.scrollEventContainer.addEventListener(
          "keyup",
          this.onInteractStop,
          a && { passive: !0 },
        ),
        this.scrollEventContainer.addEventListener(
          "mousedown",
          this.onInteractStart,
          a && { passive: !0 },
        ),
        this.scrollEventContainer.addEventListener(
          "mouseup",
          this.onInteractStop,
          a && { passive: !0 },
        ),
        this.scrollEventContainer.addEventListener(
          "touchstart",
          this.onInteractStart,
          a && { passive: !0 },
        ),
        this.scrollEventContainer.addEventListener(
          "touchend",
          this.onInteractStop,
          a && { passive: !0 },
        ),
        this.scrollEventContainer.addEventListener(
          "scroll",
          this.onScroll,
          a && { passive: !0 },
        ),
        this.scrollEventContainer.addEventListener(
          "wheel",
          this.onInteract,
          a && { passive: !0 },
        ),
        this.findSnapTarget();
    }
    var h, u, f;
    return (
      (h = i),
      (u = [
        {
          key: "destroy",
          value: function () {
            this.stopAnimation(),
              this.disable(),
              this.scrollEventContainer.removeEventListener(
                "keydown",
                this.onInteractStart,
                a && { passive: !0 },
              ),
              this.scrollEventContainer.removeEventListener(
                "keyup",
                this.onInteractStop,
                a && { passive: !0 },
              ),
              this.scrollEventContainer.removeEventListener(
                "mousedown",
                this.onInteractStart,
                a && { passive: !0 },
              ),
              this.scrollEventContainer.removeEventListener(
                "mouseup",
                this.onInteractStop,
                a && { passive: !0 },
              ),
              this.scrollEventContainer.removeEventListener(
                "touchstart",
                this.onInteractStart,
                a && { passive: !0 },
              ),
              this.scrollEventContainer.removeEventListener(
                "touchend",
                this.onInteractStop,
                a && { passive: !0 },
              ),
              this.scrollEventContainer.removeEventListener(
                "scroll",
                this.onScroll,
                a && { passive: !0 },
              ),
              this.scrollEventContainer.removeEventListener(
                "wheel",
                this.onInteract,
                a && { passive: !0 },
              ),
              delete this.options.container.dataset.panelsnapId;
          },
        },
        {
          key: "enable",
          value: function () {
            this.isEnabled = !0;
          },
        },
        {
          key: "disable",
          value: function () {
            this.isEnabled = !1;
          },
        },
        {
          key: "on",
          value: function (t, n) {
            var i = this.events[t] || [];
            (this.events[t] = e(i).concat([n])),
              "activatePanel" === t && n.call(this, this.activePanel);
          },
        },
        {
          key: "off",
          value: function (t, n) {
            var e = this.events[t] || [];
            this.events[t] = e.filter(function (t) {
              return t !== n;
            });
          },
        },
        {
          key: "emit",
          value: function (t, n) {
            var e = this;
            (this.events[t] || []).forEach(function (t) {
              return t.call(e, n);
            });
          },
        },
        {
          key: "onInteractStart",
          value: function () {
            this.stopAnimation(), (this.isInteracting = !0);
          },
        },
        {
          key: "onInteractStop",
          value: function () {
            (this.isInteracting = !1), this.findSnapTarget();
          },
        },
        {
          key: "onInteract",
          value: function () {
            this.stopAnimation(), this.onScroll();
          },
        },
        {
          key: "onScroll",
          value: function () {
            clearTimeout(this.scrollTimeout),
              this.isInteracting ||
                this.animation ||
                (this.scrollTimeout = setTimeout(
                  this.findSnapTarget.bind(this),
                  50 + this.options.delay,
                ));
          },
        },
        {
          key: "findSnapTarget",
          value: function () {
            var t =
                this.scrollContainer.scrollTop - this.currentScrollOffset.top,
              n =
                this.scrollContainer.scrollLeft - this.currentScrollOffset.left;
            this.currentScrollOffset = {
              top: this.scrollContainer.scrollTop,
              left: this.scrollContainer.scrollLeft,
            };
            var e,
              i,
              s,
              o =
                ((e = this.container),
                (i = this.panelList),
                (s = r(e)),
                i.filter(function (t) {
                  var n = t.getBoundingClientRect();
                  return (
                    n.top < s.bottom &&
                    n.right > s.left &&
                    n.bottom > s.top &&
                    n.left < s.right
                  );
                }));
            if (0 === o.length)
              throw new Error(
                "PanelSnap could not find a snappable panel, aborting.",
              );
            if (o.length > 1) {
              if (
                Math.abs(t) < this.options.directionThreshold &&
                Math.abs(n) < this.options.directionThreshold &&
                this.activePanel
              )
                return void this.snapToPanel(this.activePanel, t > 0, n > 0);
              var a = t > 0 || n > 0 ? 1 : o.length - 2;
              this.snapToPanel(o[a], t < 0, n < 0);
            } else {
              var l = o[0];
              !(function (t, n) {
                var e = r(t),
                  i = n.getBoundingClientRect();
                return (
                  i.top <= e.top &&
                  i.bottom >= e.bottom &&
                  i.left <= e.left &&
                  i.right >= e.right
                );
              })(this.container, l)
                ? (console.error(
                    "PanelSnap does not support space between panels, snapping back.",
                  ),
                  this.snapToPanel(l, t > 0, n > 0))
                : this.activatePanel(l);
            }
          },
        },
        {
          key: "snapToPanel",
          value: function (t) {
            var n = this,
              e =
                arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
              i =
                arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            this.activatePanel(t),
              this.isEnabled &&
                (this.animation && this.animation.stop(),
                (this.targetScrollOffset = (function (t, n) {
                  var e =
                      arguments.length > 2 &&
                      void 0 !== arguments[2] &&
                      arguments[2],
                    i =
                      arguments.length > 3 &&
                      void 0 !== arguments[3] &&
                      arguments[3],
                    s = r(t),
                    a = n.getBoundingClientRect(),
                    l = a.top - s.top,
                    c = a.left - s.left,
                    h = e ? a.height - s.height : 0,
                    u = i ? a.width - s.width : 0,
                    f = o(t);
                  return {
                    top: l + h + f.scrollTop,
                    left: c + u + f.scrollLeft,
                  };
                })(this.container, t, e, i)),
                (this.animation = new s({
                  start: 0,
                  end: 1e4,
                  duration: this.options.duration,
                })),
                this.animation.on("tick", this.animationTick.bind(this)),
                this.animation.on("done", function () {
                  n.emit("snapStop", t), n.resetAnimation();
                }),
                this.emit("snapStart", t),
                this.animation.begin());
          },
        },
        {
          key: "animationTick",
          value: function (t) {
            var n = this.targetScrollOffset.top - this.currentScrollOffset.top,
              e = this.currentScrollOffset.top + (n * t) / 1e4;
            this.scrollContainer.scrollTop = e;
            var i =
                this.targetScrollOffset.left - this.currentScrollOffset.left,
              s = this.currentScrollOffset.left + (i * t) / 1e4;
            this.scrollContainer.scrollLeft = s;
          },
        },
        {
          key: "stopAnimation",
          value: function () {
            this.animation && (this.animation.stop(), this.resetAnimation());
          },
        },
        {
          key: "resetAnimation",
          value: function () {
            (this.currentScrollOffset = {
              top: this.scrollContainer.scrollTop,
              left: this.scrollContainer.scrollLeft,
            }),
              (this.targetScrollOffset = { top: 0, left: 0 }),
              (this.animation = null);
          },
        },
        {
          key: "activatePanel",
          value: function (t) {
            this.activePanel !== t &&
              (this.emit("activatePanel", t), (this.activePanel = t));
          },
        },
      ]) && t(h.prototype, u),
      f && t(h, f),
      i
    );
  })();
});
