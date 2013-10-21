module.exports =
  name: "Duration Histogram"
  render: (parentElement) ->
    console.log "rendering Duration Histogram"
    el = document.createElement("div")

    d3.json "/data/json/experiment_status.json", (data) ->
      d3.select(el).selectAll("p")
          .data(data)
          .enter()
          .append("p")
          .text((d) -> d['days-live'])
      parentElement.html el
