BIN_DIR ?= node_modules/.bin
ROOT_BIN_DIR ?= ../../node_modules/.bin
P := "\\033[32m[+]\\033[0m"
CURRENT_DIR := $(notdir $(CURDIR))
PACKAGE_NAME := "@twreporter/$(CURRENT_DIR)"

help:
	@echo "\033[33mmake dev\033[0m - Watch source code and re-complie if there's any change"
	@echo "\033[33mmake lint\033[0m - Run prettier and eslint"
	@echo "\033[33mmake prettier\033[0m - Run prettier"
	@echo "\033[33mmake build\033[0m - Build distribution package files"
	@echo "\033[33mmake publish\033[0m - Publish the package to npm"

print-package-info:
	@echo "\\033[32m$(PACKAGE_NAME)\\033[0m"

dev: print-package-info
	@echo "$(P) Start babel watch mode"
	NODE_ENV=development $(ROOT_BIN_DIR)/babel src --out-dir lib --watch --source-maps --root-mode upward

build: print-package-info clean lint
	@echo "$(P) Check dependencies of the project"
	yarn
	@echo "$(P) Build distribution package files"
	NODE_ENV=production $(ROOT_BIN_DIR)/babel src --out-dir lib --root-mode upward

clean:
	@echo "$(P) Clean lib/"
	$(ROOT_BIN_DIR)/rimraf lib/

publish: build
	@echo "$(P) Publish package to npm"
	npm publish

# This will only prettier files under this package
prettier:
	@echo "$(P) Run prettier"
	$(ROOT_BIN_DIR)/prettier --write "**/*.{js,json,css,md,html,htm}"

# This will only lint files under this package
lint: prettier
	@echo "$(P) Run eslint"
	$(ROOT_BIN_DIR)/eslint --fix "**/*.js"

.PHONY: build clean lint prettier dev print-package-info
