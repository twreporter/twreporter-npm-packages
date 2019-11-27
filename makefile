BIN_DIR ?= node_modules/.bin
P="\\033[32m[+]\\033[0m"

# If no package dirname is given, run the make command at each package. For example:
# `make dev` -> Will run `make dev` at each package parallelly
# `make dev PKG=core` -> Will run `make dev` at `packages/core`
ifeq ($(PKG),)
	# SUBDIRS will be like "packages/core packages/react-components packages/index-page"
	SUBDIRS = $(wildcard packages/*/)
	MAKE_FLAG := -j
else
	SUBDIRS = "packages/$(PKG)/"
endif

# Running:
# ```
# packages/core packages/react-components:
#   make -j -C $@ dev
# ```
# equals to running `make -j -C "packages/core packages/react-components" dev`
# equals to running two child processes parallelly:
# one runs `cd packages/core && make dev`
# and the other runs `cd packages/react-components && make dev`
#
# Ref: https://www.gnu.org/software/make/manual/html_node/Recursion.html
#      https://www.gnu.org/software/make/manual/html_node/Parallel.html
$(SUBDIRS):
	$(MAKE) -C $@ $(MAKE_TARGET)

subdirs-job: $(SUBDIRS)

check-dep:
	@echo "$(P) Check dependencies of the project"
	yarn install

dev: check-dep
	MAKE_TARGET=dev make subdirs-job $(MAKE_FLAG)

build:
	@echo "$(P) Run build"
	$(BIN_DIR)/lerna run --stream --sort build

publish:
	@echo "$(P) Run publish"
	$(BIN_DIR)/lerna publish from-git

release: build publish

clean:
	MAKE_TARGET=clean make subdirs-job $(MAKE_FLAG)

help:
	@echo "\033[33mmake lint\033[0m - Run prettier and eslint"
	@echo "\033[33mmake prettier\033[0m - Run prettier"

prettier:
	@echo "$(P) Run prettier"
	$(BIN_DIR)/prettier --write "**/*.{js,json,css,md,html,htm}"

lint:
	@echo "$(P) Run eslint"
	$(BIN_DIR)/eslint --fix "**/*.js"

link: check-dep
	@echo "$(P) Link all packages"
	yarn workspaces run link

unlink:
	@echo "$(P) Unlink all packages"
	yarn workspaces run unlink

test:
	@echo "$(P) Run tests"
	NODE_ENV=test $(BIN_DIR)/jest

cp-make:
	@echo "$(P) Copy \`dev/source.makefile\` to packages"
	@for package in $(SUBDIRS); do cp -v dev/source.makefile $$package\makefile; done

.PHONY: prettier lint dev clean subdirs-job $(SUBDIRS) build link cp-make
