module.exports =
  name: "Stats"

  includeStylesheet: ->
    $head = $('head')
    el = "<link href='/css/views/stats.css' media='all' rel='stylesheet' type='text/css' />"
    $head.append el

  template: (ctx) ->
    """
      <svg class='graph'>
        #{ctx}
      </svg>
    """

  circleTemplate: (ctx) ->
    """
      <circle cx=#{ctx.x_center} cy=#{ctx.y_center} r=#{ctx.radius}></circle>
    """

  render: (parentElement) ->
    @includeStylesheet()
    @$el = $(parentElement)
    @svgContent = ""
    @generatePoints 1000, 500
    @$el.append @template @svgContent
    @setSvgSize()

  setSvgSize: ->
    return unless @maxX and @maxY
    @$el.find('svg').css
      height: @maxY
      width: @maxX

  model: ->
    slope = 1
    intercept = 10
    error = 100
    (x) ->
      x * slope + intercept + Math.random() * (x + 25) / 2

  generateXValues: (n, domain = 100) ->
    throw "missing required argument n" unless n
    i = 0
    values = []
    while i < n
      values.push(Math.random() * domain)
      i += 1
    values

  setMaxY: (yValues) ->
    @maxY = Math.max yValues...

  setMaxX: (xValues) ->
    @maxX = Math.max xValues...

  generatePoints: (n, domain = 100) ->
    xValues = @generateXValues n, domain
    yValues = for x in xValues
      @model()(x)
    @setMaxX xValues
    @setMaxY yValues
    correctedYValues = for y in yValues
      @maxY - y
    for index, x of xValues
      y = correctedYValues[index]
      @addCircle x, y, 5

  addCircle: (x, y, r) ->
    @svgContent += @circleTemplate
      x_center: x
      y_center: y
      radius: r