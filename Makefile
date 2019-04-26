PROJECT := bdd-workshop-app

.DEFAULT_GOAL := all

.PHONY: all
all: install test

.PHONY: install
install: check_tools install_libs

.PHONY: start
start:
	bundle exec rails db:create db:migrate
	bundle exec rails server

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
	bin/run-tests

.PHONY: build
build:
	bin/full-build

.PHONY: asdf_install
asdf_install:
	bin/asdf-install

.PHONY: slides
slides:
	pushd docs/slides && yarn mdx-deck deck.mdx && popd

