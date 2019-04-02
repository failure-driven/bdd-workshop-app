PROJECT := game-app

.DEFAULT_GOAL := all

.PHONY: all
all: install test slides

.PHONY: install
install: check_tools install_libs install_mdx_deck

.PHONY: check_tools
check_tools:
	bin/check-tools

.PHONY: install_libs
install_libs:
	bin/install-libs

.PHONY: install_mdx_deck
install_mdx_deck:
	pushd docs/slides && yarn && popd

.PHONY: test
test:
	bin/full-test

.PHONY: build
build:
	bin/full-build

.PHONY: slides
slides:
	pushd docs/slides && yarn mdx-deck deck.mdx && popd

