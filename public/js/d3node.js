// Generated by CommonJS Everywhere 0.9.4
(function (global) {
  function require(file, parentModule) {
    if ({}.hasOwnProperty.call(require.cache, file))
      return require.cache[file];
    var resolved = require.resolve(file);
    if (!resolved)
      throw new Error('Failed to resolve module ' + file);
    var module$ = {
        id: file,
        require: require,
        filename: file,
        exports: {},
        loaded: false,
        parent: parentModule,
        children: []
      };
    if (parentModule)
      parentModule.children.push(module$);
    var dirname = file.slice(0, file.lastIndexOf('/') + 1);
    require.cache[file] = module$.exports;
    resolved.call(module$.exports, module$, module$.exports, dirname, file);
    module$.loaded = true;
    return require.cache[file] = module$.exports;
  }
  require.modules = {};
  require.cache = {};
  require.resolve = function (file) {
    return {}.hasOwnProperty.call(require.modules, file) ? require.modules[file] : void 0;
  };
  require.define = function (file, fn) {
    require.modules[file] = fn;
  };
  var process = function () {
      var cwd = '/';
      return {
        title: 'browser',
        version: 'v0.10.15',
        browser: true,
        env: {},
        argv: [],
        nextTick: global.setImmediate || function (fn) {
          setTimeout(fn, 0);
        },
        cwd: function () {
          return cwd;
        },
        chdir: function (dir) {
          cwd = dir;
        }
      };
    }();
  require.define('/src/client/d3node.coffee', function (module, exports, __dirname, __filename) {
    require('/src/client/views/visualization_selector_view.coffee', module);
  });
  require.define('/src/client/views/visualization_selector_view.coffee', function (module, exports, __dirname, __filename) {
    var vis;
    vis = require('/src/client/visualizations/index.coffee', module);
    $(function () {
      var $visualizationWindow, el, renderSelectButton, renderSelector;
      el = $('#selectors');
      $visualizationWindow = $('#visualization');
      renderSelector = function (visualization) {
        var button;
        button = renderSelectButton(visualization.name);
        button.on('click', function () {
          $visualizationWindow.empty();
          return visualization.render($visualizationWindow);
        });
        return el.append(button);
      };
      renderSelectButton = function (name) {
        return $('<button>' + name + '</button>');
      };
      return function (accum$) {
        var visualization;
        for (var i$ = 0, length$ = vis.length; i$ < length$; ++i$) {
          visualization = vis[i$];
          accum$.push(renderSelector(visualization));
        }
        return accum$;
      }.call(this, []);
    });
  });
  require.define('/src/client/visualizations/index.coffee', function (module, exports, __dirname, __filename) {
    module.exports = [
      require('/src/client/visualizations/experimentStatusDays.coffee', module),
      require('/src/client/visualizations/stats.coffee', module)
    ];
  });
  require.define('/src/client/visualizations/stats.coffee', function (module, exports, __dirname, __filename) {
    module.exports = {
      name: 'Stats',
      includeStylesheet: function () {
        var $head, el;
        $head = $('head');
        el = "<link href='/css/views/stats.css' media='all' rel='stylesheet' type='text/css' />";
        return $head.append(el);
      },
      template: function (ctx) {
        return "<svg class='graph'>\n  " + ctx + '\n</svg>';
      },
      circleTemplate: function (ctx) {
        return '<circle cx=' + ctx.x_center + ' cy=' + ctx.y_center + ' r=' + ctx.radius + '></circle>';
      },
      render: function (parentElement) {
        this.includeStylesheet();
        this.$el = $(parentElement);
        this.svgContent = '';
        this.generatePoints(1e3, 500);
        this.$el.append(this.template(this.svgContent));
        return this.setSvgSize();
      },
      setSvgSize: function () {
        if (!(this.maxX && this.maxY))
          return;
        return this.$el.find('svg').css({
          height: this.maxY,
          width: this.maxX
        });
      },
      model: function () {
        var error, intercept, slope;
        slope = 1;
        intercept = 10;
        error = 100;
        return function (x) {
          return x * slope + intercept + Math.random() * (x + 25) / 2;
        };
      },
      generateXValues: function (n, domain) {
        var i, values;
        if (null == domain)
          domain = 100;
        if (!n)
          throw 'missing required argument n';
        i = 0;
        values = [];
        while (i < n) {
          values.push(Math.random() * domain);
          i += 1;
        }
        return values;
      },
      setMaxY: function (yValues) {
        return this.maxY = Math.max.apply(Math, [].slice.call(yValues).concat());
      },
      setMaxX: function (xValues) {
        return this.maxX = Math.max.apply(Math, [].slice.call(xValues).concat());
      },
      generatePoints: function (n, domain) {
        var correctedYValues, xValues, yValues;
        if (null == domain)
          domain = 100;
        xValues = this.generateXValues(n, domain);
        yValues = function (accum$) {
          var x;
          for (var i$ = 0, length$ = xValues.length; i$ < length$; ++i$) {
            x = xValues[i$];
            accum$.push(this.model()(x));
          }
          return accum$;
        }.call(this, []);
        this.setMaxX(xValues);
        this.setMaxY(yValues);
        correctedYValues = function (accum$) {
          var y;
          for (var i$ = 0, length$ = yValues.length; i$ < length$; ++i$) {
            y = yValues[i$];
            accum$.push(this.maxY - y);
          }
          return accum$;
        }.call(this, []);
        return function (accum$) {
          var index, x, y;
          for (index in xValues) {
            x = xValues[index];
            y = correctedYValues[index];
            accum$.push(this.addCircle(x, y, 5));
          }
          return accum$;
        }.call(this, []);
      },
      addCircle: function (x, y, r) {
        return this.svgContent += this.circleTemplate({
          x_center: x,
          y_center: y,
          radius: r
        });
      }
    };
    function construct$(ctor, args) {
      var fn = function () {
      };
      fn.prototype = ctor.prototype;
      var child = new fn, result = ctor.apply(child, args);
      return result === Object(result) ? result : child;
    }
  });
  require.define('/src/client/visualizations/experimentStatusDays.coffee', function (module, exports, __dirname, __filename) {
    module.exports = {
      name: 'Duration Histogram',
      render: function (parentElement) {
        var el;
        console.log('rendering Duration Histogram');
        el = document.createElement('div');
        return d3.json('/data/json/experiment_status.json', function (data) {
          d3.select(el).selectAll('p').data(data).enter().append('p').text(function (d) {
            return d['days-live'];
          });
          return parentElement.html(el);
        });
      }
    };
  });
  require('/src/client/d3node.coffee');
}.call(this, this));