# Game App

A demo app to go along with the _soon to be written workshop_ on layered
Behavriour Driven Developemnt (BDD)

https://github.com/failure-driven/layered-testing-workshop.

## TL;DR

Assuming you sort out your own dependencies on ruby and node and have
postgresql running

```sh
make
```

will check tooling, install dependencies, run through tests and open the slides
leaving the slide server running in the window.

## Getting started

Assuming you have the following dependencies

**TODO:** links for installing the below dependencies

- ruby 2.6.1
- bundler gem
- node 10.15.2
- yarn
- postgresql

### tool versions

#### asdf

for ruby and nodejs as stipluated in .tool-versions

```
asdf plugin-add ruby
asdf plugin-add nodejs
bash ~/.asdf/plugins/nodejs/bin/import-release-team-keyring
# reload your shell
which gem # make sure its pointing to asdf
# bundle install as shown later
```

if you want to use asdf to manage postgresql

```
asdf plugin-add postgres
export POSTGRES_EXTRA_CONFIGURE_OPTIONS=--with-uuid=e2fs
asdf install
asdf global postgres $(grep postgres .tool-versions | cut -d ' ' -f 2) # this is required for building pg gem
# bundle install as shown later
```

#### docker

TODO ...

### Install libraries

run bundler and yarn to install libraries

```sh
bundle
yarn
bundle exec rails db:create
```

### Run the tests

Run all the tests

```sh
make build

# or
./bin/full-build

# or if there is no internet but the dependencies have been isntalled
NO_INTERNET=true ./bin/full-build

# if you want to rubocop and lint
PRETTY_CODE=true NO_INTERNET=true bin/full-build
```

### Show the slides

```sh
make slides
```

### Run the dev server

Fire up rails

```sh
rails server
```

visit the rails default home page

http://localhost:3000/

visit a react component

http://localhost:3000/game

## Tech Stack

### Ruby

- [ ] sort out ruby/vscode/prettier
  - https://github.com/prettier/prettier-vscode
  - https://github.com/prettier/plugin-ruby
  - https://github.com/rubyide/vscode-ruby

### JS

- [ ] eslint/prettier
  - https://blog.echobind.com/integrating-prettier-eslint-airbnb-style-guide-in-vscode-47f07b5d7d6a
### React testing

Mostly using [Kent C. Dodd's](https://twitter.com/kentcdodds/) [react-testing-libaray]()

with principles such as

- ...
- no shallow rendering (Ref [Why I never use shallow rendering](https://kentcdodds.com/blog/why-i-never-use-shallow-rendering))
  - ...
  - more detail worth reading about - https://medium.com/flatiron-labs/refactoring-an-enzyme-component-test-to-use-react-testing-library-f5c36da6716f
