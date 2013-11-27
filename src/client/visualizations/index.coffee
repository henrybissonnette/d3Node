# Create visualizations as .coffee files in this folder.
# Once you've created one add it to this list of exports.
# Your visualization should export something with the keys
# `name` and `render` (see experimentStatusDays.coffee).
# Hit localhost:1234 and click on your visualization's
# name to run it.

module.exports = [
  require "./experimentStatusDays"
  require "./stats"
]