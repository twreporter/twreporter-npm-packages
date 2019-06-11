BIN_DIR ?= node_modules/.bin
P="\\033[32m[+]\\033[0m"
ifeq ($(PKG),)
	SUBDIRS := $(wildcard packages/*/)
	MAKE_FLAG := "-j"
else
	SUBDIRS := "packages/$(PKG)/"
	MAKE_FLAG := ""
endif

$(SUBDIRS):
	$(MAKE) -C $@ dev

subdirs-dev: $(SUBDIRS)

# `make dev` -> babel watch at all packages
# `make dev PKG=core` -> babel watch at only `packages/core`
dev: 
	yarn install
	make subdirs-dev $(MAKE_FLAG)

help:
	@echo "\033[33mmake lint\033[0m - Run prettier and eslint"
	@echo "\033[33mmake prettier\033[0m - Run prettier"

prettier:
	@echo "$(P) Run prettier"
	$(BIN_DIR)/prettier --write "**/*.{js,json,css,md,html,htm}"

lint: prettier
	@echo "$(P) Run eslint"
	$(BIN_DIR)/eslint --fix "**/*.js"

.PHONY: prettier lint dev subdirs-dev $(SUBDIRS)
