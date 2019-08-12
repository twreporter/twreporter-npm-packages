BIN_DIR ?= node_modules/.bin
P="\\033[32m[+]\\033[0m"
TEST_SCRIPTS_FILES := $(shell find src -name '*.test.js')

help:
	@echo "\033[33mmake lint\033[0m - Run prettier and eslint"
	@echo "\033[33mmake prettier\033[0m - Run prettier"
	@echo "\033[33mmake build\033[0m - Build distribution package files"
	@echo "\033[33mmake publish\033[0m - Publish the package to npm"

dev:
	@echo "$(P) Start webpack-dev-server"
	NODE_ENV=development $(BIN_DIR)/babel src --out-dir lib --watch --source-maps

build: clean lint
	@echo "$(P) Check dependencies of the project"
	yarn
	@echo "$(P) Build distribution package files"
	NODE_ENV=production $(BIN_DIR)/babel src --ignore **/__test__ --out-dir lib

clean:
	@echo "$(P) Clean lib"
	$(BIN_DIR)/rimraf lib/

publish: build test
	npm publish

prettier:
	@echo "$(P) Run prettier"
	$(BIN_DIR)/prettier --write "**/*.{js,json,css,md,html,htm}"

eslint:
	@echo "$(P) Run eslint"
	$(BIN_DIR)/eslint --fix "**/*.js"

lint: prettier eslint
	@echo "$(P) Check the style format and quality of source code"
	
test:
	@echo "$(P) Run tests"
	NODE_ENV=development RELEASE_BRANCH=test $(BIN_DIR)/mocha --file $(TEST_SCRIPTS_FILES) --require @babel/register
 
.PHONY: build clean lint prettier dev
