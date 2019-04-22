<h1 align="center">Game App</h1>

<div align="center">

[![CircleCI](https://circleci.com/gh/failure-driven/game-app.svg?style=svg)](https://circleci.com/gh/failure-driven/game-app)

</div>

BDD (Behaviour Driven Development) Workshop App fro Rails Conf 2019 ["Multi
layer BDD for modern rails web
apps"](https://railsconf.com/program/workshops#session-782)

## TL;DR Setup

- clone this repo

  ```
  git clone git@github.com:failure-driven/bdd-workshop-app.git
  ```

- get it up and running ([Quick start install](#quick-start-install))

  ```
  make
  make start
  ```

  - failing that try the [Manual install](#manual-install)

- Install [Kahoot](https://kahoot.com/mobile-app/) for interactive review and surveys

## Quick start install

```sh
                        # clone repo
git clone git@github.com:failure-driven/bdd-workshop-app.git

cd bdd-workshop-app     # open directory

make                    # check versions,
                        # install libs,
                        # runs tests

make start              # startup database
                        # to run the app rails server
bin/webpack-dev-server  # for faster ReactJS compilation
```

**Note:** Make sure to pull this repo closer to the date of the workshop, like
the day before 😉

## Kahoot

Install [Kahoot](https://kahoot.com/mobile-app/) for interactive review and surveys
during the workshop.

- [App Store](https://itunes.apple.com/app/apple-store/id1131203560?mt=8)
- [Google Play](https://play.google.com/store/apps/details?id=no.mobitroll.kahoot.android&referrer=utm_source%3Dkahoot%26utm_campaign%3Dmobileapp)

---

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
  - try homebrew?
  ```
  brew install node@10
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
- postgresql install using homebrew
  ```sh
  brew info postgresql
  brew services list
  psql -V
  ```
- check you have postgresql running
  ```
  psql --list     # list out databases
  ```
- create and migrate your database
  ```
  bundle exec rails db:create db:migrate
  ```
- run the specs
  ```
  bundle exec rspec spec
  ```
- run the rails development server
  ```
  bundle exec rails server
  ```
- run the webpacker dev server
  ```
  bin/webpack-dev-server
  ```
- visit the development server
  - http://localhost:3000
- run the tests
  ```
  bin/full-build
  ```
  - or if there is no internet but dependencies have been installed
    ```
    NO_INTERNET=true ./bin/full-build
    ```
  - if you want to rubocop and lint
    ```
    PRETTY_CODE=true NO_INTERNET=true bin/full-build
    ```

#### asdf

Somewhat experimental script to install **asdf** that will manage ruby, nodejs as stipluated in `.tool-versions` file. Will also install PostgreSQL

```
make asdf_install
```

which runs `bin/asdf-install`

also may want to add to your shell as per [asdf install instructions](https://asdf-vm.com/#/core-manage-asdf-vm)

```
echo -e '\n. $HOME/.asdf/asdf.sh' >> ~/.bash_profile
echo -e '\n. $HOME/.asdf/completions/asdf.bash' >> ~/.bash_profile
```

#### docker

TODO ...

### Show the slides

```sh
make slides
```

slides are located in `docs/slides/deck.mdx` using
[mdx-deck](https://github.com/jxnblk/mdx-deck)

## Docker

_TODO_

# ORIGINAL RAILS README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

- Ruby version

- System dependencies

- Configuration

- Database creation

- Database initialization

- How to run the test suite

- Services (job queues, cache servers, search engines, etc.)

- Deployment instructions

- ...
