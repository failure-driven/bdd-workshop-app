PROJECT := game-app

.PHONY: build
build:
	bin/full-build

.PHONY: slides
slides:
	pushd documentation/slides && npx mdx-deck deck.mdx && popd

