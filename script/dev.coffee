require('colors')
spawn = require('child_process').spawn
server = spawn 'node_modules/.bin/coffee', ['src/server.coffee']
cjs = spawn 'node_modules/.bin/cjsify', ['-wo', 'public/js/d3node.js', 'src/client/d3node.coffee']

server.stdout.on 'data', (data)->
  process.stdout.write "SERVER stout: #{data}"

server.stderr.on 'data', (data)->
  process.stdout.write "SERVER sterr: #{data}".red

server.on 'close', (code) ->
  process.stdout.write "server closed with code #{code}".yellow

cjs.stdout.on 'data', (data)->
  process.stdout.write "CJS stout: #{data}"

cjs.stderr.on 'data', (data)->
  process.stdout.write "CJS sterr: #{data}".blue

cjs.on 'close', (code) ->
  process.stdout.write "cjs closed with code #{code}".yellow