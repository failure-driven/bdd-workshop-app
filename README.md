<h1 align="center">Game App</h1>

<div align="center">

[![CircleCI](https://circleci.com/gh/failure-driven/game-app.svg?style=svg)](https://circleci.com/gh/failure-driven/game-app)

</div>

BDD (Behaviour Driven Development) Workshop App fro Rails Conf 2019 ["Multi
layer BDD for modern rails web
apps"](https://railsconf.com/program/workshops#session-782)

## TL;DR Setup

- pull this repo
  ```
  git clone git@github.com:failure-driven/bdd-workshop-app.git
  ```
- get it up and running (see [Quick start install](#quick-start-install))
- Install [Kahoot](https://kahoot.com/mobile-app/) for interactive review and surveys

## Quick start install

  ```sh
  git clone git@github.com:failure-driven/bdd-workshop-app.git
  cd bdd-workshop-app

  make                          # check versions,
                                # install libs,
                                # runs tests

  rails db:create db:migrate    # startup database
  rails server                  # to run the app
  ```

**Note:** Make sure to pull this repo closer to the date of the workshop, like
the day before 😉

## Kahoot

Install [Kahoot](https://kahoot.com/mobile-app/) for interactive review and surveys
during the workshop.

- [App Store](https://itunes.apple.com/app/apple-store/id1131203560?mt=8)
- [Google Play](https://play.google.com/store/apps/details?id=no.mobitroll.kahoot.android&referrer=utm_source%3Dkahoot%26utm_campaign%3Dmobileapp)

## Manual install

- clone the repository
  ```
  git clone git@github.com:failure-driven/bdd-workshop-app.git
  ```
- change directory into bdd workshop app
  ```
  cd bdd-workshop-app
  ```
- check you have node **10.15.3** installed
  ```
  node -v
  ```
  - check you have `yarn` installed
  ```
  yarn -v
  ```
  - install node dependencies
  ```
  yarn install
  ```
- check you have ruby **2.6.2** installed
  ```
  ruby -v
  ```
  - install `bundler` gem
  ```
  gem install bundler
  ```
  - install gems
    - dependent on having postgresql installed (`brew install postgresql`)
    - dependant on having relatively new [Chrome](https://www.google.com/chrome/) installed
  ```
  bundle
  ```
- check you have postgresql running
  ```
  psql --list     # list out databases
  ```
- create and migrate your database
  ```
  rails db:create db:migrate
  ```
- run the specs
  ```
  rspec spec
  ```

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
