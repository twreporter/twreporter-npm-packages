BIN_DIR ?= node_modules/.bin
PROD_NODE_ENV ?= production

help:
	@echo "\033[33mmake build\033[0m - babel transpile es6 files into dist folder"
	@echo "\033[33mmake clean\033[0m - clean the old builds"

babel-transpile: 
	@echo "\033[33m[webpack]\033[0m transpile es6 to es5"
	$(BIN_DIR)/babel src --out-dir dist --copy-files

# build webpacks client side needed
build-webpack:
	@echo "\033[33m[webpack]\033[0m build client side bundles"
	NODE_ENV=$(PROD_NODE_ENV) $(BIN_DIR)/webpack --config webpack.config.js --progress --colors

build: clean babel-transpile

clean:
	@echo "delete auto generated files"
	@$(BIN_DIR)/rimraf dist  

.PHONY: help clean build 
