vis = require "../visualizations"

$ ->
  el = $("#selectors")
  $visualizationWindow = $("#visualization")

  renderSelector = (visualization) ->
    button = renderSelectButton(visualization.name)
    button.on "click", ->
      $visualizationWindow.empty()
      visualization.render($visualizationWindow)
    el.append button

  renderSelectButton = (name) ->
    $("<button>#{name}</button>")

  for visualization in vis
    renderSelector(visualization)
