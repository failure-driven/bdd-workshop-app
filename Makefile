PROJECT := game-app

.DEFAULT_GOAL := all

.PHONY: all
all: install test

.PHONY: install
install: check_tools install_libs

.PHONY: check_tools
check_tools:
	bin/check-tools

.PHONY: install_libs
install_libs:
	bin/install-libs

.PHONY: test
test:
	bin/full-test

.PHONY: build
build:
	bin/full-build

