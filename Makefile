COFFEE=node_modules/.bin/coffee --js
CLIENT_SRC=$(shell find src/client -name "*.coffee" -type f | sort)

default: node_modules public/js/d3node.js

.PHONY: dev

dev: node_modules
	node_modules/.bin/coffee script/dev.coffee

public/js/panopticon.js: $(CLIENT_SRC)
	node_modules/.bin/cjsify -o public/js/d3node.js src/client/d3node.coffee

node_modules: package.json
	npm install
	touch node_modules