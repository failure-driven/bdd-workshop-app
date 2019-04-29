# Course outline

- [Intro](#intro)
- [Module 1 - Unit under test](#module-1---unit-under-test)
- [Module 2 - When Then steps](#module-2---when-then-steps)
- [Module 3 - Flows vs Mechanics](#module-3---flows-vs-mechanics)
- [Module 4 - Add Feature with Outside-in BDD](#module-4---add-feature-with-outside-in-bdd)

## Intro

Multi-layer outside in Behaviour Driven Desing (BDD)

### Install

```
git clone git@github.com/failure-driven/bdd-workshop-app.git

Ruby 2.6.2, Node 10.15.3, PostgreSQL, Chrome
bundle install && yarn install
bin/rails db:create db:migrate
make
bin/rails server
bin/webpack-dev-server
```

### TDD and BDD

**TDD** - Test Driven Design

- Red, Green, Refactor
- test first
- see the test fail

**BDD** - Behaviour Driven Design

- Enough is enough
  - build minimum feature
  - get feedback
  - build according to needs
- Software to delivery stakeholder value
- test behaviour rather than implementation

Examples of 100% unit tests no Integration tests

## Module 1 - Unit under test

### Overview of Rails React app

* React frontend
    * made up of components
    * lives as a client on the browser

* Rails backend
    * API/Serializer
    * Controller
    * Model
    * Database
    
### Testing boundaries

| Test               | Code                | Test technology      |
| ------------------ | ------------------- | -------------------- |
| Integration        | Full stack frontend | RSpec, capybara,     |
|                    | to backend          | selenium chrome      |
| ------------------ | ------------------- | -------------------- |
| Frontend Component | React components    | Jest test framework  |
| API                | Full backend API    | RSpec, Request spec  |
|                    | integration         |                      |
| ------------------ | ------------------- | -------------------- |
| Isolated Unit      | Controller          | RSpec, controller,   |
|                    |                     | mocked collaborators |
| ------------------ | ------------------- | -------------------- |
| Unit test          | Model               | RSpec                |
| ------------------ | ------------------- | -------------------- |

### How the app works

```
bundle exec rspec spec/features/monster_spec.rb
```

NOT a good example of a descriptive test

#### Core states of the app

| State | Description                  | transition               |
| ----- | ---------------------------- | ------------------------ |
|     1 | Game requires registration   |                          |
|       |                              | register a unique handle |
| ----- | ---------------------------- | ------------------------ |
|     2 | Game played with only handle |                          |
|       |                              | complete registration    | 
| ----- | ---------------------------- | ------------------------ |
|     3 | Game played with complete    |                          |
|       | profile gets a star          |                          |
|       |                              | sign out                 |
| ----- | ---------------------------- | ------------------------ |
|     1 | Game requires registration   |                          |
| ----- | ---------------------------- | ------------------------ |

## Module 2 - When Then steps

### Given When Then

Traditional testing is

1. **GIVEN** - arrange a known state
2. **WHEN** - perform an action
3. **THEN** - assert the state change expected

### series of When Then steps

Contrary to wisdom of Given When Then there is benefit to be gained from linking
a series of When Then steps

Each When Then assertion sets up the state for the next When Then assertion

This simplifies any complicated state that would need to be created in a Given step.

Also this documents the natural series of events or actions by various actors
to reach that state and hence better documents how the system works.

## Module 3 - Flows vs Mechanics

TODO

## Module 4 - Add Feature with Outside-in BDD

TODO

TODO:

- main modules
- main topics covered in modules
- associated code and slide numbers
- links to more resrouces
- link to glossary
