!(function(e) {
  var t = {};
  function r(n) {
    if (t[n]) return t[n].exports;
    var i = (t[n] = { i: n, l: !1, exports: {} });
    return e[n].call(i.exports, i, i.exports, r), (i.l = !0), i.exports;
  }
  (r.m = e),
    (r.c = t),
    (r.d = function(e, t, n) {
      r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
    }),
    (r.r = function(e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (r.t = function(e, t) {
      if ((1 & t && (e = r(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var n = Object.create(null);
      if (
        (r.r(n),
        Object.defineProperty(n, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var i in e)
          r.d(
            n,
            i,
            function(t) {
              return e[t];
            }.bind(null, i)
          );
      return n;
    }),
    (r.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return r.d(t, "a", t), t;
    }),
    (r.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (r.p = ""),
    r((r.s = "./bin/coolpal"));
})({
  "./bin/coolpal":
    /*!*********************!*\
  !*** ./bin/coolpal ***!
  \*********************/
    /*! no exports provided */ function(e, t, r) {
      "use strict";
      r.r(t);
      var n = r(/*! ../lib/cli */ "./lib/cli/index.js");
      r.n(n).a.parse(process.argv);
    },
  "./lib/cli/index.js":
    /*!**************************!*\
  !*** ./lib/cli/index.js ***!
  \**************************/
    /*! no static exports found */ function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = void 0);
      var n = r(/*! ./program */ "./lib/cli/program.js");
      Object.defineProperty(t, "default", {
        enumerable: !0,
        get: function() {
          return ((e = n), e && e.__esModule ? e : { default: e }).default;
          var e;
        }
      }),
        r(/*! source-map-support/register */ "source-map-support/register");
    },
  "./lib/cli/program.js":
    /*!****************************!*\
  !*** ./lib/cli/program.js ***!
  \****************************/
    /*! no static exports found */ function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = a(
          r(/*! babel-runtime/regenerator */ "babel-runtime/regenerator")
        ),
        i = a(
          r(
            /*! babel-runtime/helpers/asyncToGenerator */ "babel-runtime/helpers/asyncToGenerator"
          )
        );
      r(/*! source-map-support/register */ "source-map-support/register");
      var s,
        u = a(r(/*! commander */ "commander")),
        l = a(r(/*! ./startCommand */ "./lib/cli/startCommand.js"));
      function a(e) {
        return e && e.__esModule ? e : { default: e };
      }
      u.default.version("0.0.1", "v", "--version"),
        u.default
          .command("start")
          .description("start coolpal")
          .option("-c", "--config", "configuration file name")
          .action(
            ((s = (0, i.default)(
              n.default.mark(function e(t) {
                var r, i;
                return n.default.wrap(
                  function(e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (
                            (r = t.config ? t.config : "coolpal.config.json"),
                            (i = new l.default({ config_filename: r })),
                            (e.next = 4),
                            i.run()
                          );
                        case 4:
                        case "end":
                          return e.stop();
                      }
                  },
                  e,
                  void 0
                );
              })
            )),
            function(e) {
              return s.apply(this, arguments);
            })
          ),
        (t.default = u.default);
    },
  "./lib/cli/startCommand.js":
    /*!*********************************!*\
  !*** ./lib/cli/startCommand.js ***!
  \*********************************/
    /*! no static exports found */ function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = o(
          r(/*! babel-runtime/regenerator */ "babel-runtime/regenerator")
        ),
        i = o(
          r(
            /*! babel-runtime/helpers/asyncToGenerator */ "babel-runtime/helpers/asyncToGenerator"
          )
        ),
        s = o(
          r(
            /*! babel-runtime/helpers/classCallCheck */ "babel-runtime/helpers/classCallCheck"
          )
        ),
        u = o(
          r(
            /*! babel-runtime/helpers/createClass */ "babel-runtime/helpers/createClass"
          )
        );
      r(/*! source-map-support/register */ "source-map-support/register");
      var l = r(/*! ../util */ "./lib/util.js"),
        a = o(r(/*! ../coolpal */ "./lib/coolpal.js"));
      function o(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var c = (function() {
        function e(t) {
          (0, s.default)(this, e),
            (this.config_filename = t.config_filename || "coolpal.config.json");
        }
        return (
          (0, u.default)(e, [
            {
              key: "run",
              value: (function() {
                var e = (0, i.default)(
                  n.default.mark(function e() {
                    var t, r;
                    return n.default.wrap(
                      function(e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (e.next = 2),
                                (0, l.readFileAsync)(this.config_filename)
                              );
                            case 2:
                              (t = e.sent),
                                (r = JSON.parse(t)),
                                new a.default(r).start();
                            case 6:
                            case "end":
                              return e.stop();
                          }
                      },
                      e,
                      this
                    );
                  })
                );
                return function() {
                  return e.apply(this, arguments);
                };
              })()
            }
          ]),
          e
        );
      })();
      t.default = c;
    },
  "./lib/coolpal.js":
    /*!************************!*\
  !*** ./lib/coolpal.js ***!
  \************************/
    /*! no static exports found */ function(e, t, r) {
      "use strict";
      var n = a(
          r(
            /*! babel-runtime/core-js/get-iterator */ "babel-runtime/core-js/get-iterator"
          )
        ),
        i = a(
          r(
            /*! babel-runtime/helpers/classCallCheck */ "babel-runtime/helpers/classCallCheck"
          )
        ),
        s = a(
          r(
            /*! babel-runtime/helpers/createClass */ "babel-runtime/helpers/createClass"
          )
        );
      r(/*! source-map-support/register */ "source-map-support/register");
      var u = a(r(/*! discord.js */ "discord.js")),
        l = r(/*! ./plugins/index */ "./lib/plugins/index.js");
      function a(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var o = (function() {
        function e(t) {
          (0, i.default)(this, e),
            (this.client = new u.default.Client()),
            (this.discord_token = t.token || process.env.COOLPAL_DISCORD_TOKEN),
            (this.prefix = t.prefix || "!"),
            (this._event_types = []),
            (this._plugins = []),
            (this._pal_config = t),
            this._configure_plugins(t.plugins);
        }
        return (
          (0, s.default)(e, [
            {
              key: "start",
              value: function() {
                this._login(), this._ready(), this._receive_events();
              }
            },
            {
              key: "_configure_plugin",
              value: function(e) {
                return new (0, l.plugin_name_to_class[e.name])(
                  this,
                  e.configuration
                );
              }
            },
            {
              key: "_configure_plugins",
              value: function(e) {
                var t = !0,
                  r = !1,
                  i = void 0;
                try {
                  for (
                    var s, u = (0, n.default)(e);
                    !(t = (s = u.next()).done);
                    t = !0
                  ) {
                    var l = s.value;
                    this._register_plugin(this._configure_plugin(l));
                  }
                } catch (e) {
                  (r = !0), (i = e);
                } finally {
                  try {
                    !t && u.return && u.return();
                  } finally {
                    if (r) throw i;
                  }
                }
              }
            },
            {
              key: "_register_plugin",
              value: function(e) {
                this._plugins.push(e);
                var t = !0,
                  r = !1,
                  i = void 0;
                try {
                  for (
                    var s, u = (0, n.default)(e.supported_event_types);
                    !(t = (s = u.next()).done);
                    t = !0
                  ) {
                    var l = s.value;
                    this._event_types.includes(l) || this._event_types.push(l);
                  }
                } catch (e) {
                  (r = !0), (i = e);
                } finally {
                  try {
                    !t && u.return && u.return();
                  } finally {
                    if (r) throw i;
                  }
                }
              }
            },
            {
              key: "_login",
              value: function() {
                this.client.login(this.discord_token);
              }
            },
            {
              key: "_ready",
              value: function() {
                this.client.on("ready", function() {
                  console.log("Just saying im ready");
                });
              }
            },
            {
              key: "_receive_event",
              value: function(e) {
                var t = this;
                this.client.on(e, function(r) {
                  var i = !0,
                    s = !1,
                    u = void 0;
                  try {
                    for (
                      var l, a = (0, n.default)(t._plugins);
                      !(i = (l = a.next()).done);
                      i = !0
                    ) {
                      l.value.handle_event(e, r);
                    }
                  } catch (e) {
                    (s = !0), (u = e);
                  } finally {
                    try {
                      !i && a.return && a.return();
                    } finally {
                      if (s) throw u;
                    }
                  }
                });
              }
            },
            {
              key: "_receive_events",
              value: function() {
                var e = !0,
                  t = !1,
                  r = void 0;
                try {
                  for (
                    var i, s = (0, n.default)(this._event_types);
                    !(e = (i = s.next()).done);
                    e = !0
                  ) {
                    var u = i.value;
                    this._receive_event(u);
                  }
                } catch (e) {
                  (t = !0), (r = e);
                } finally {
                  try {
                    !e && s.return && s.return();
                  } finally {
                    if (t) throw r;
                  }
                }
              }
            },
            {
              key: "plugins",
              get: function() {
                return this._plugins;
              }
            }
          ]),
          e
        );
      })();
      e.exports = o;
    },
  "./lib/plugins/coinbase/plugin.js":
    /*!****************************************!*\
  !*** ./lib/plugins/coinbase/plugin.js ***!
  \****************************************/
    /*! no static exports found */ function(e, t, r) {
      "use strict";
      var n = c(
          r(
            /*! babel-runtime/core-js/object/get-prototype-of */ "babel-runtime/core-js/object/get-prototype-of"
          )
        ),
        i = c(
          r(
            /*! babel-runtime/helpers/classCallCheck */ "babel-runtime/helpers/classCallCheck"
          )
        ),
        s = c(
          r(
            /*! babel-runtime/helpers/createClass */ "babel-runtime/helpers/createClass"
          )
        ),
        u = c(
          r(
            /*! babel-runtime/helpers/possibleConstructorReturn */ "babel-runtime/helpers/possibleConstructorReturn"
          )
        ),
        l = c(
          r(
            /*! babel-runtime/helpers/inherits */ "babel-runtime/helpers/inherits"
          )
        );
      r(/*! source-map-support/register */ "source-map-support/register");
      var a = c(r(/*! axios */ "axios")),
        o = (function(e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (null != e)
            for (var r in e)
              Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
          return (t.default = e), t;
        })(r(/*! ../utils */ "./lib/plugins/utils.js"));
      function c(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var p = (function(e) {
        function t(e) {
          var r =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          (0, i.default)(this, t);
          var s = (0, u.default)(
            this,
            (t.__proto__ || (0, n.default)(t)).call(this, e, r)
          );
          return (
            (s.command = "coinbase"),
            (s.supported_event_types = ["message"]),
            (s.base_url =
              r.base_url || "https://api.coinbase.com/v2/prices/BTC-USD/buy"),
            (s.axios = r.axios || a.default.create()),
            (s.coin_command_to_url_string = { btc: "BTC-USD", eth: "ETH-USD" }),
            s
          );
        }
        return (
          (0, l.default)(t, e),
          (0, s.default)(t, [
            {
              key: "coin_price_url",
              value: function(e) {
                return (
                  this.base_url +
                  "/prices/" +
                  this.coin_command_to_url_string[e] +
                  "/buy"
                );
              }
            },
            {
              key: "valid_coin",
              value: function(e) {
                return !!this.coin_command_to_url_string[e];
              }
            },
            {
              key: "handle_message",
              value: function(e) {
                var t = o.split_message(e);
                if (t[0] != this.prefixed_command) return !1;
                if (e.author.username === this.pal.client.user.username)
                  return !0;
                if (void 0 === t[1] || "help" === t[1])
                  return e.reply(this.help), !0;
                if ("list" === t[1]) {
                  return (
                    e.reply(
                      "\nAvailable Coinbase coins\n\nbtc - BTC to USD\neth - ETH to USD\n"
                    ),
                    !0
                  );
                }
                return this.valid_coin(t[1])
                  ? this.call_coinbase_api(e, t[1])
                  : (e.reply(this.help), !0);
              }
            },
            {
              key: "call_coinbase_api",
              value: function(e, t) {
                this.axios({ method: "get", url: this.coin_price_url(t) })
                  .then(function(r) {
                    var n = "\nFrom Coinbase | Current ";
                    return (
                      (n += "eth" === t ? "ETH in USD: $" : "BTC in USD: $"),
                      (n += r.data.data.amount),
                      e.reply(n),
                      !0
                    );
                  })
                  .catch(function(e) {
                    return console.log(), !0;
                  });
              }
            },
            {
              key: "help",
              get: function() {
                return (
                  "\n\nCheck Coinbase for current coin prices\n\n" +
                  this.prefixed_command +
                  " list\nDisplays the available coins\n\n" +
                  this.prefixed_command +
                  " eth\nPrints the current ETH value\n\n" +
                  this.prefixed_command +
                  " btc\nPrint the current BTC value\n\n"
                );
              }
            }
          ]),
          t
        );
      })(c(r(/*! ../plugin */ "./lib/plugins/plugin.js")).default);
      e.exports = p;
    },
  "./lib/plugins/feature-request/plugin.js":
    /*!***********************************************!*\
  !*** ./lib/plugins/feature-request/plugin.js ***!
  \***********************************************/
    /*! no static exports found */ function(e, t, r) {
      "use strict";
      var n = c(
          r(
            /*! babel-runtime/core-js/get-iterator */ "babel-runtime/core-js/get-iterator"
          )
        ),
        i = c(
          r(
            /*! babel-runtime/core-js/object/get-prototype-of */ "babel-runtime/core-js/object/get-prototype-of"
          )
        ),
        s = c(
          r(
            /*! babel-runtime/helpers/classCallCheck */ "babel-runtime/helpers/classCallCheck"
          )
        ),
        u = c(
          r(
            /*! babel-runtime/helpers/createClass */ "babel-runtime/helpers/createClass"
          )
        ),
        l = c(
          r(
            /*! babel-runtime/helpers/possibleConstructorReturn */ "babel-runtime/helpers/possibleConstructorReturn"
          )
        ),
        a = c(
          r(
            /*! babel-runtime/helpers/inherits */ "babel-runtime/helpers/inherits"
          )
        );
      r(/*! source-map-support/register */ "source-map-support/register");
      var o = (function(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
          for (var r in e)
            Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return (t.default = e), t;
      })(r(/*! ../utils */ "./lib/plugins/utils.js"));
      function c(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var p = (function(e) {
        function t(e) {
          var r =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          (0, s.default)(this, t);
          var n = (0, l.default)(
            this,
            (t.__proto__ || (0, i.default)(t)).call(this, e, r)
          );
          return (
            (n.command = "feature-request"),
            (n.supported_event_types = ["message"]),
            (n._feature_requests = {}),
            n
          );
        }
        return (
          (0, a.default)(t, e),
          (0, u.default)(t, [
            {
              key: "requests_for_user",
              value: function(e) {
                return (
                  void 0 === this._feature_requests[e] &&
                    (this._feature_requests[e] = []),
                  this._feature_requests[e]
                );
              }
            },
            {
              key: "store_request_for_user",
              value: function(e, t) {
                void 0 === this._feature_requests[t] &&
                  (this._feature_requests[t] = []),
                  this._feature_requests[t].push(e);
              }
            },
            {
              key: "handle_message",
              value: function(e) {
                var t = o.split_message(e);
                if (t[0] != this.prefixed_command) return !1;
                if (e.author.username === this.pal.client.user.username)
                  return !0;
                if ("new" === t[1]) {
                  var r = t.slice(2).join(" ");
                  this.store_request_for_user(r, e.author.username),
                    e.reply(
                      "Added the following to your feature requests:\n" + r
                    );
                } else if ("list" === t[1]) {
                  var i = "Here are your feature requests:\n",
                    s = !0,
                    u = !1,
                    l = void 0;
                  try {
                    for (
                      var a,
                        c = (0, n.default)(
                          this.requests_for_user(e.author.username)
                        );
                      !(s = (a = c.next()).done);
                      s = !0
                    ) {
                      i += a.value + "\n";
                    }
                  } catch (e) {
                    (u = !0), (l = e);
                  } finally {
                    try {
                      !s && c.return && c.return();
                    } finally {
                      if (u) throw l;
                    }
                  }
                  e.reply(i);
                } else e.reply(this.help);
                return !0;
              }
            },
            {
              key: "help",
              get: function() {
                return (
                  "This plugin will allow you to make new plugin requests\n\n" +
                  this.prefixed_command +
                  " help\nDisplays this message again.\n\n" +
                  this.prefixed_command +
                  " new this is where you type a request\nAdds a new request\n\n" +
                  this.prefixed_command +
                  " list\nList the requests you have made\n"
                );
              }
            }
          ]),
          t
        );
      })(c(r(/*! ../plugin */ "./lib/plugins/plugin.js")).default);
      e.exports = p;
    },
  "./lib/plugins/google-news/plugin.js":
    /*!*******************************************!*\
  !*** ./lib/plugins/google-news/plugin.js ***!
  \*******************************************/
    /*! no static exports found */ function(e, t, r) {
      "use strict";
      var n = p(
          r(
            /*! babel-runtime/core-js/object/get-prototype-of */ "babel-runtime/core-js/object/get-prototype-of"
          )
        ),
        i = p(
          r(
            /*! babel-runtime/helpers/classCallCheck */ "babel-runtime/helpers/classCallCheck"
          )
        ),
        s = p(
          r(
            /*! babel-runtime/helpers/createClass */ "babel-runtime/helpers/createClass"
          )
        ),
        u = p(
          r(
            /*! babel-runtime/helpers/possibleConstructorReturn */ "babel-runtime/helpers/possibleConstructorReturn"
          )
        ),
        l = p(
          r(
            /*! babel-runtime/helpers/inherits */ "babel-runtime/helpers/inherits"
          )
        );
      r(/*! source-map-support/register */ "source-map-support/register");
      var a = p(r(/*! ../plugin */ "./lib/plugins/plugin.js")),
        o = (function(e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (null != e)
            for (var r in e)
              Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
          return (t.default = e), t;
        })(r(/*! ../utils */ "./lib/plugins/utils.js")),
        c = p(r(/*! google-news-rss */ "google-news-rss"));
      function p(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var f = (function(e) {
        function t(e) {
          var r =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          (0, i.default)(this, t);
          var s = (0, u.default)(
            this,
            (t.__proto__ || (0, n.default)(t)).call(this, e, r)
          );
          return (
            (s.command = "news"),
            (s.supported_event_types = ["message"]),
            (s.google_news = r.google_news || new c.default()),
            s
          );
        }
        return (
          (0, l.default)(t, e),
          (0, s.default)(t, [
            {
              key: "handle_message",
              value: function(e) {
                var t = o.split_message(e);
                return (
                  t[0] == this.prefixed_command &&
                  (e.author.username === this.pal.client.user.username ||
                    (void 0 === t[1] || "help" === t[1]
                      ? (e.reply(this.help), !0)
                      : this.call_google_news_rss(e)))
                );
              }
            },
            {
              key: "call_google_news_rss",
              value: function(e) {
                var t = o
                  .split_message(e)
                  .slice(1)
                  .join(" ");
                return (
                  this.google_news
                    .search(String(t))
                    .then(function(r) {
                      return (
                        e.reply(
                          "\nThe Top Result from Google News. . .\n\n------------------------------------\nQuery: " +
                            t +
                            "\n------------------------------------\n\n" +
                            r[0].title +
                            "\n\n" +
                            r[0].link +
                            "\n"
                        ),
                        !0
                      );
                    })
                    .catch(function(r) {
                      var n = "Failed to get results for " + t + "\n";
                      return e.reply(n), console.log(n), !0;
                    }),
                  !0
                );
              }
            },
            {
              key: "help",
              get: function() {
                return "\nFetch news from Google\n\n!news help\nDisplays this message\n!news any topics\nReplies with a search result from Google\n";
              }
            }
          ]),
          t
        );
      })(a.default);
      e.exports = f;
    },
  "./lib/plugins/hello_world/plugin.js":
    /*!*******************************************!*\
  !*** ./lib/plugins/hello_world/plugin.js ***!
  \*******************************************/
    /*! no static exports found */ function(e, t, r) {
      "use strict";
      var n = a(
          r(
            /*! babel-runtime/core-js/object/get-prototype-of */ "babel-runtime/core-js/object/get-prototype-of"
          )
        ),
        i = a(
          r(
            /*! babel-runtime/helpers/classCallCheck */ "babel-runtime/helpers/classCallCheck"
          )
        ),
        s = a(
          r(
            /*! babel-runtime/helpers/createClass */ "babel-runtime/helpers/createClass"
          )
        ),
        u = a(
          r(
            /*! babel-runtime/helpers/possibleConstructorReturn */ "babel-runtime/helpers/possibleConstructorReturn"
          )
        ),
        l = a(
          r(
            /*! babel-runtime/helpers/inherits */ "babel-runtime/helpers/inherits"
          )
        );
      function a(e) {
        return e && e.__esModule ? e : { default: e };
      }
      r(/*! source-map-support/register */ "source-map-support/register");
      var o = (function(e) {
        function t(e) {
          var r =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          (0, i.default)(this, t);
          var s = (0, u.default)(
            this,
            (t.__proto__ || (0, n.default)(t)).call(this, e, r)
          );
          return (
            (s.command = "helloworld"),
            (s.supported_event_types = ["message"]),
            s
          );
        }
        return (
          (0, l.default)(t, e),
          (0, s.default)(t, [
            {
              key: "handle_message",
              value: function(e, t) {
                return (
                  !!e.content.startsWith(this.prefixed_command) &&
                  (e.author.username != this.pal.client.user.username &&
                    e.reply("Hello, world!"),
                  !0)
                );
              }
            }
          ]),
          t
        );
      })(a(r(/*! ../plugin.js */ "./lib/plugins/plugin.js")).default);
      e.exports = o;
    },
  "./lib/plugins/help/plugin.js":
    /*!************************************!*\
  !*** ./lib/plugins/help/plugin.js ***!
  \************************************/
    /*! no static exports found */ function(e, t, r) {
      "use strict";
      var n = c(
          r(
            /*! babel-runtime/core-js/get-iterator */ "babel-runtime/core-js/get-iterator"
          )
        ),
        i = c(
          r(
            /*! babel-runtime/core-js/object/get-prototype-of */ "babel-runtime/core-js/object/get-prototype-of"
          )
        ),
        s = c(
          r(
            /*! babel-runtime/helpers/classCallCheck */ "babel-runtime/helpers/classCallCheck"
          )
        ),
        u = c(
          r(
            /*! babel-runtime/helpers/createClass */ "babel-runtime/helpers/createClass"
          )
        ),
        l = c(
          r(
            /*! babel-runtime/helpers/possibleConstructorReturn */ "babel-runtime/helpers/possibleConstructorReturn"
          )
        ),
        a = c(
          r(
            /*! babel-runtime/helpers/inherits */ "babel-runtime/helpers/inherits"
          )
        );
      r(/*! source-map-support/register */ "source-map-support/register");
      var o = (function(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
          for (var r in e)
            Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return (t.default = e), t;
      })(r(/*! ../utils */ "./lib/plugins/utils.js"));
      function c(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var p = (function(e) {
        function t(e) {
          var r =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          (0, s.default)(this, t);
          var n = (0, l.default)(
            this,
            (t.__proto__ || (0, i.default)(t)).call(this, e, r)
          );
          return (
            (n.command = "help"), (n.supported_event_types = ["message"]), n
          );
        }
        return (
          (0, a.default)(t, e),
          (0, u.default)(t, [
            {
              key: "handle_message",
              value: function(e) {
                var t = o.split_message(e);
                if (t[0] != this.prefixed_command) return !1;
                if (e.author.username === this.pal.client.user.username)
                  return !0;
                if (void 0 === t[1] || "help" === t[1])
                  return e.channel.send(o.color(this.help, "green")), !0;
                if ("list" === t[1]) {
                  var r =
                      "\nHere are commands with help available.\nCall one with !help <command>\n",
                    i = !0,
                    s = !1,
                    u = void 0;
                  try {
                    for (
                      var l, a = (0, n.default)(this.pal.plugins);
                      !(i = (l = a.next()).done);
                      i = !0
                    ) {
                      var c = l.value;
                      void 0 != c.help && (r += c.command + "\n");
                    }
                  } catch (e) {
                    (s = !0), (u = e);
                  } finally {
                    try {
                      !i && a.return && a.return();
                    } finally {
                      if (s) throw u;
                    }
                  }
                  return e.channel.send(r), !0;
                }
                var p = !0,
                  f = !1,
                  h = void 0;
                try {
                  for (
                    var d, m = (0, n.default)(this.pal.plugins);
                    !(p = (d = m.next()).done);
                    p = !0
                  ) {
                    var _ = d.value;
                    if (_.command === t[1])
                      return void 0 != _.help
                        ? (e.reply(_.help), !0)
                        : (e.reply(
                            _.command + " does not have a help message.\n"
                          ),
                          !0);
                  }
                } catch (e) {
                  (f = !0), (h = e);
                } finally {
                  try {
                    !p && m.return && m.return();
                  } finally {
                    if (f) throw h;
                  }
                }
                return e.reply(t[1] + " is not a valid command.\n"), !0;
              }
            },
            {
              key: "help",
              get: function() {
                return "\n\nRequest help for a plugin:\n\n!help list\nLists plugins that you can request help for\n\n!help help\nPrints this message\n\n!help <supported_plugin>\nPrints the help for a supported plugin (see !help list)\n\n";
              }
            }
          ]),
          t
        );
      })(c(r(/*! ../plugin */ "./lib/plugins/plugin.js")).default);
      e.exports = p;
    },
  "./lib/plugins/index.js":
    /*!******************************!*\
  !*** ./lib/plugins/index.js ***!
  \******************************/
    /*! no static exports found */ function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.plugin_name_to_class = void 0),
        r(/*! source-map-support/register */ "source-map-support/register");
      var n = c(r(/*! ./spam/plugin */ "./lib/plugins/spam/plugin.js")),
        i = c(
          r(/*! ./hello_world/plugin */ "./lib/plugins/hello_world/plugin.js")
        ),
        s = c(r(/*! ./weather/plugin */ "./lib/plugins/weather/plugin.js")),
        u = c(r(/*! ./coinbase/plugin */ "./lib/plugins/coinbase/plugin.js")),
        l = c(
          r(
            /*! ./feature-request/plugin.js */ "./lib/plugins/feature-request/plugin.js"
          )
        ),
        a = c(r(/*! ./help/plugin.js */ "./lib/plugins/help/plugin.js")),
        o = c(
          r(
            /*! ./google-news/plugin.js */ "./lib/plugins/google-news/plugin.js"
          )
        );
      function c(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var p = {
        spam: n.default,
        helloworld: i.default,
        weather: s.default,
        coinbase: u.default,
        "feature-request": l.default,
        help: a.default,
        "google-news": o.default
      };
      t.plugin_name_to_class = p;
    },
  "./lib/plugins/plugin.js":
    /*!*******************************!*\
  !*** ./lib/plugins/plugin.js ***!
  \*******************************/
    /*! no static exports found */ function(e, t, r) {
      "use strict";
      var n = s(
          r(
            /*! babel-runtime/helpers/classCallCheck */ "babel-runtime/helpers/classCallCheck"
          )
        ),
        i = s(
          r(
            /*! babel-runtime/helpers/createClass */ "babel-runtime/helpers/createClass"
          )
        );
      function s(e) {
        return e && e.__esModule ? e : { default: e };
      }
      r(/*! source-map-support/register */ "source-map-support/register");
      var u = (function() {
        function e(t) {
          arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
          (0, n.default)(this, e),
            (this.pal = t),
            (this.command = ""),
            (this.supported_event_types = []),
            (this.prefix = "!");
        }
        return (
          (0, i.default)(e, [
            {
              key: "handle_event",
              value: function(e, t) {
                return "message" == e && this.handle_message(t);
              }
            },
            {
              key: "handle_message",
              value: function(e) {
                return !1;
              }
            },
            {
              key: "prefixed_command",
              get: function() {
                return this.prefix + this.command;
              }
            }
          ]),
          e
        );
      })();
      e.exports = u;
    },
  "./lib/plugins/spam/plugin.js":
    /*!************************************!*\
  !*** ./lib/plugins/spam/plugin.js ***!
  \************************************/
    /*! no static exports found */ function(e, t, r) {
      "use strict";
      var n = o(
          r(
            /*! babel-runtime/core-js/object/get-prototype-of */ "babel-runtime/core-js/object/get-prototype-of"
          )
        ),
        i = o(
          r(
            /*! babel-runtime/helpers/classCallCheck */ "babel-runtime/helpers/classCallCheck"
          )
        ),
        s = o(
          r(
            /*! babel-runtime/helpers/createClass */ "babel-runtime/helpers/createClass"
          )
        ),
        u = o(
          r(
            /*! babel-runtime/helpers/possibleConstructorReturn */ "babel-runtime/helpers/possibleConstructorReturn"
          )
        ),
        l = o(
          r(
            /*! babel-runtime/helpers/inherits */ "babel-runtime/helpers/inherits"
          )
        );
      r(/*! source-map-support/register */ "source-map-support/register");
      var a = (function(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
          for (var r in e)
            Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return (t.default = e), t;
      })(r(/*! ../utils */ "./lib/plugins/utils.js"));
      function o(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var c = (function(e) {
        function t() {
          (0, i.default)(this, t);
          var e = (0, u.default)(
            this,
            (t.__proto__ || (0, n.default)(t)).call(this)
          );
          return (
            (e.command = "spam"), (e.supported_event_types = ["message"]), e
          );
        }
        return (
          (0, l.default)(t, e),
          (0, s.default)(t, [
            {
              key: "handle_message",
              value: function(e, t) {
                var r = a.split_message(e);
                if (r[0] != this.prefixed_command) return !1;
                var n = Number(r[1]);
                if (
                  (n || NaN == n || e.reply("Usage: /spam [number of times]"),
                  e.author.username != t.client.user.username)
                ) {
                  for (var i = "", s = 0; s < n; ++s)
                    (i += "SPAM!!! ".repeat(10) + "SPAM!!!\n"),
                      s % 22 == 0 && (e.reply(i), (i = ""));
                  e.reply(i);
                }
                return !0;
              }
            }
          ]),
          t
        );
      })(o(r(/*! ../plugin */ "./lib/plugins/plugin.js")).default);
      e.exports = c;
    },
  "./lib/plugins/utils.js":
    /*!******************************!*\
  !*** ./lib/plugins/utils.js ***!
  \******************************/
    /*! no static exports found */ function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        i = r(
          /*! babel-runtime/core-js/get-iterator */ "babel-runtime/core-js/get-iterator"
        ),
        s = (n = i) && n.__esModule ? n : { default: n };
      (t.split_message = function(e) {
        var t = e.content.split(" "),
          r = [],
          n = !0,
          i = !1,
          u = void 0;
        try {
          for (
            var l, a = (0, s.default)(t);
            !(n = (l = a.next()).done);
            n = !0
          ) {
            var o = l.value;
            r.push(o.toLowerCase());
          }
        } catch (e) {
          (i = !0), (u = e);
        } finally {
          try {
            !n && a.return && a.return();
          } finally {
            if (i) throw u;
          }
        }
        return r;
      }),
        (t.capitalize = function(e) {
          return e.charAt(0).toUpperCase() + e.slice(1);
        }),
        (t.times = function(e) {
          return function(t) {
            Array(e)
              .fill()
              .map(function(e, r) {
                return t(r);
              });
          };
        }),
        (t.color = function(e, t) {
          return "green" === t
            ? "```css\n" + e + "\n```"
            : "yellow" === t
              ? "```fix\n" + e + "\n```"
              : e;
        }),
        r(/*! source-map-support/register */ "source-map-support/register");
    },
  "./lib/plugins/weather/plugin.js":
    /*!***************************************!*\
  !*** ./lib/plugins/weather/plugin.js ***!
  \***************************************/
    /*! no static exports found */ function(e, t, r) {
      "use strict";
      var n = h(
          r(
            /*! babel-runtime/core-js/promise */ "babel-runtime/core-js/promise"
          )
        ),
        i = h(r(/*! babel-runtime/regenerator */ "babel-runtime/regenerator")),
        s = h(
          r(
            /*! babel-runtime/helpers/asyncToGenerator */ "babel-runtime/helpers/asyncToGenerator"
          )
        ),
        u = h(
          r(
            /*! babel-runtime/core-js/object/get-prototype-of */ "babel-runtime/core-js/object/get-prototype-of"
          )
        ),
        l = h(
          r(
            /*! babel-runtime/helpers/classCallCheck */ "babel-runtime/helpers/classCallCheck"
          )
        ),
        a = h(
          r(
            /*! babel-runtime/helpers/createClass */ "babel-runtime/helpers/createClass"
          )
        ),
        o = h(
          r(
            /*! babel-runtime/helpers/possibleConstructorReturn */ "babel-runtime/helpers/possibleConstructorReturn"
          )
        ),
        c = h(
          r(
            /*! babel-runtime/helpers/inherits */ "babel-runtime/helpers/inherits"
          )
        );
      r(/*! source-map-support/register */ "source-map-support/register");
      var p = h(r(/*! weather-js */ "weather-js")),
        f = (function(e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (null != e)
            for (var r in e)
              Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
          return (t.default = e), t;
        })(r(/*! ../utils */ "./lib/plugins/utils.js"));
      function h(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var d = (function(e) {
        function t(e) {
          var r =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          (0, l.default)(this, t);
          var n = (0, o.default)(
            this,
            (t.__proto__ || (0, u.default)(t)).call(this, e, r)
          );
          return (
            (n.command = "weather"),
            (n.weather_client = r.weather_client || p.default),
            (n.supported_event_types = ["message"]),
            n
          );
        }
        return (
          (0, c.default)(t, e),
          (0, a.default)(t, [
            {
              key: "handle_message",
              value: (function() {
                var e = (0, s.default)(
                  i.default.mark(function e(t, r) {
                    var n, s, u;
                    return i.default.wrap(
                      function(e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              if (
                                (n = f.split_message(t))[0] ==
                                this.prefixed_command
                              ) {
                                e.next = 3;
                                break;
                              }
                              return e.abrupt("return", !1);
                            case 3:
                              if (
                                t.author.username !=
                                this.pal.client.user.username
                              ) {
                                e.next = 5;
                                break;
                              }
                              return e.abrupt("return", !0);
                            case 5:
                              return (
                                (s = n[1]),
                                n[2] && (s += n[2]),
                                (e.next = 9),
                                this.call_weather_js(s)
                              );
                            case 9:
                              return (
                                (u = e.sent),
                                t.reply(this.build_message(u)),
                                e.abrupt("return", !0)
                              );
                            case 12:
                            case "end":
                              return e.stop();
                          }
                      },
                      e,
                      this
                    );
                  })
                );
                return function(t, r) {
                  return e.apply(this, arguments);
                };
              })()
            },
            {
              key: "call_weather_js",
              value: function(e) {
                var t = this;
                return new n.default(function(r, n) {
                  t.weather_client.find(
                    { search: e, degreeType: "F" },
                    function(e, t) {
                      e && n(e), r(t);
                    }
                  );
                });
              }
            },
            {
              key: "build_message",
              value: function(e) {
                return (
                  "Current forecast for: " +
                  e[0].location.name +
                  "\nDate: " +
                  e[0].current.date +
                  "\nObservation Time: " +
                  e[0].current.observationtime +
                  "\nTemperature (in F): " +
                  e[0].current.temperature +
                  "\nFeels like (in F): " +
                  e[0].current.feelslike +
                  "\nConditions: " +
                  e[0].current.skytext +
                  "\nHumidity: " +
                  e[0].current.humidity +
                  "\nWind: " +
                  e[0].current.winddisplay +
                  "\n"
                );
              }
            },
            {
              key: "help",
              get: function() {
                return (
                  "\nCheck the current weather\n\n" +
                  this.prefixed_command +
                  " help\nDisplays this message again.\n" +
                  this.prefixed_command +
                  " Denton\nReplies with the weather conditions for Denton\n" +
                  this.prefixed_command +
                  " Denton, TX\nReplies with the weather conditions for Denton, TX\n" +
                  this.prefixed_command +
                  " 98121\nReplies with the weather conditions for the Zipcode 98121\n"
                );
              }
            }
          ]),
          t
        );
      })(h(r(/*! ../plugin.js */ "./lib/plugins/plugin.js")).default);
      e.exports = d;
    },
  "./lib/util.js":
    /*!*********************!*\
  !*** ./lib/util.js ***!
  \*********************/
    /*! no static exports found */ function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.readFileAsync = void 0);
      var n = s(
        r(/*! babel-runtime/core-js/promise */ "babel-runtime/core-js/promise")
      );
      r(/*! source-map-support/register */ "source-map-support/register");
      var i = s(r(/*! fs */ "fs"));
      function s(e) {
        return e && e.__esModule ? e : { default: e };
      }
      t.readFileAsync = function(e) {
        return new n.default(function(t, r) {
          i.default.readFile(e, function(e, n) {
            e && r(e), t(n);
          });
        });
      };
    },
  axios:
    /*!************************!*\
  !*** external "axios" ***!
  \************************/
    /*! no static exports found */ function(e, t) {
      e.exports = require("axios");
    },
  "babel-runtime/core-js/get-iterator":
    /*!*****************************************************!*\
  !*** external "babel-runtime/core-js/get-iterator" ***!
  \*****************************************************/
    /*! no static exports found */ function(e, t) {
      e.exports = require("babel-runtime/core-js/get-iterator");
    },
  "babel-runtime/core-js/object/get-prototype-of":
    /*!****************************************************************!*\
  !*** external "babel-runtime/core-js/object/get-prototype-of" ***!
  \****************************************************************/
    /*! no static exports found */ function(e, t) {
      e.exports = require("babel-runtime/core-js/object/get-prototype-of");
    },
  "babel-runtime/core-js/promise":
    /*!************************************************!*\
  !*** external "babel-runtime/core-js/promise" ***!
  \************************************************/
    /*! no static exports found */ function(e, t) {
      e.exports = require("babel-runtime/core-js/promise");
    },
  "babel-runtime/helpers/asyncToGenerator":
    /*!*********************************************************!*\
  !*** external "babel-runtime/helpers/asyncToGenerator" ***!
  \*********************************************************/
    /*! no static exports found */ function(e, t) {
      e.exports = require("babel-runtime/helpers/asyncToGenerator");
    },
  "babel-runtime/helpers/classCallCheck":
    /*!*******************************************************!*\
  !*** external "babel-runtime/helpers/classCallCheck" ***!
  \*******************************************************/
    /*! no static exports found */ function(e, t) {
      e.exports = require("babel-runtime/helpers/classCallCheck");
    },
  "babel-runtime/helpers/createClass":
    /*!****************************************************!*\
  !*** external "babel-runtime/helpers/createClass" ***!
  \****************************************************/
    /*! no static exports found */ function(e, t) {
      e.exports = require("babel-runtime/helpers/createClass");
    },
  "babel-runtime/helpers/inherits":
    /*!*************************************************!*\
  !*** external "babel-runtime/helpers/inherits" ***!
  \*************************************************/
    /*! no static exports found */ function(e, t) {
      e.exports = require("babel-runtime/helpers/inherits");
    },
  "babel-runtime/helpers/possibleConstructorReturn":
    /*!******************************************************************!*\
  !*** external "babel-runtime/helpers/possibleConstructorReturn" ***!
  \******************************************************************/
    /*! no static exports found */ function(e, t) {
      e.exports = require("babel-runtime/helpers/possibleConstructorReturn");
    },
  "babel-runtime/regenerator":
    /*!********************************************!*\
  !*** external "babel-runtime/regenerator" ***!
  \********************************************/
    /*! no static exports found */ function(e, t) {
      e.exports = require("babel-runtime/regenerator");
    },
  commander:
    /*!****************************!*\
  !*** external "commander" ***!
  \****************************/
    /*! no static exports found */ function(e, t) {
      e.exports = require("commander");
    },
  "discord.js":
    /*!*****************************!*\
  !*** external "discord.js" ***!
  \*****************************/
    /*! no static exports found */ function(e, t) {
      e.exports = require("discord.js");
    },
  fs:
    /*!*********************!*\
  !*** external "fs" ***!
  \*********************/
    /*! no static exports found */ function(e, t) {
      e.exports = require("fs");
    },
  "google-news-rss":
    /*!**********************************!*\
  !*** external "google-news-rss" ***!
  \**********************************/
    /*! no static exports found */ function(e, t) {
      e.exports = require("google-news-rss");
    },
  "source-map-support/register":
    /*!**********************************************!*\
  !*** external "source-map-support/register" ***!
  \**********************************************/
    /*! no static exports found */ function(e, t) {
      e.exports = require("source-map-support/register");
    },
  "weather-js":
    /*!*****************************!*\
  !*** external "weather-js" ***!
  \*****************************/
    /*! no static exports found */ function(e, t) {
      e.exports = require("weather-js");
    }
});
//# sourceMappingURL=bin.bundle.js.map
