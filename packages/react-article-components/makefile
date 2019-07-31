BIN_DIR ?= node_modules/.bin
P="\\033[32m[+]\\033[0m"

help:
	@echo "\033[33mmake lint\033[0m - Run prettier and eslint"
	@echo "\033[33mmake prettier\033[0m - Run prettier"
	@echo "\033[33mmake build\033[0m - Build distribution package files"
	@echo "\033[33mmake publish\033[0m - Publish the package to npm"

dev:
	@echo "$(P) Start webpack-dev-server"
	$(BIN_DIR)/webpack-dev-server

build: clean lint
	@echo "$(P) Check dependencies of the project"
	yarn
	@echo "$(P) Build distribution package files"
	NODE_ENV=production $(BIN_DIR)/babel src --out-dir dist

clean:
	@echo "$(P) Clean dist"
	$(BIN_DIR)/rimraf dist/

publish: build
	npm publish

prettier:
	@echo "$(P) Run prettier"
	$(BIN_DIR)/prettier --write "**/*.{js,json,css,md,html,htm}"

lint: prettier
	@echo "$(P) Run eslint"
	$(BIN_DIR)/eslint --fix "**/*.js"
 
.PHONY: build clean lint prettier dev
