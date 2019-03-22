# Game App

A demo app to go along with the _soon to be written workshop_ on layered
Behavriour Driven Developemnt (BDD)
https://github.com/failure-driven/layered-testing-workshop.

## Getting started

Assuming you have the following dependencies

**TODO:** links for installing the below dependencies

* ruby 2.6.1
* bundler gem
* node 10.15.2
* yarn
* postgresql

### tool versions

#### asdf

for ruyb and nodejs as stipluated in .tool-versions

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
./bin/full-build
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

