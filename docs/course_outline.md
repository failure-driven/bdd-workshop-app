# Course outline

- [Intro](#intro)
- [Module 1 - Unit under test](#module-1---unit-under-test)
- [Module 2 - When Then steps](#module-2---when-then-steps)
- [Module 3 - Flows vs Mechanics](#module-3---flows-vs-mechanics)
- [Module 4 - Add Feature with Outside-in BDD](#module-4---add-feature-with-outside-in-bdd)

## Intro

_Slide 1_

Multi-layer outside-in Behaviour Driven Design (BDD)

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
- Design loosely coupled solutions
- Test code implementation

**BDD** - Behaviour Driven Design

- Enough is enough
  - build minimum feature
  - get feedback
  - build according to needs
- Software is about delivering demonstrable value to stakeholders
- Test behaviour rather than implementation

Examples of 100% unit-tested behavioural failures

## Module 1 - Unit under test

_Slide 16_

Learn at a high level which parts of the system are covered by integration tests

### Overview of Rails/React app

* React frontend
    * Made up of components
    * Lives as a client on the browser

* Rails backend
    * API/Serializer
    * Controller
    * Model
    * Database
    
### Testing boundaries

| Test type          | Tested code           | Test technology      |
| ------------------ | --------------------- | -------------------- |
| Integration        | Full stack (frontend, | RSpec, Capybara,     |
|                    | API, controller,      | Selenium,            |
|                    | model, database)      | Chromedriver         |
| ------------------ | --------------------- | -------------------- |
| Isolated Component | Frontend component    | Jest                 |
| ------------------ | --------------------- | -------------------- |
| API (integration)  | Full backend (API,    | RSpec                |
|                    | controller, model,    |                      |
|                    | database)             |                      |
| ------------------ | --------------------- | -------------------- |
| Isolated Unit      | Controller            | RSpec                |
| ------------------ | --------------------- | -------------------- |
| Isolated Unit      | Model                 | RSpec                |
| ------------------ | --------------------- | -------------------- |

### How the app works

```
bundle exec rspec spec/features/monster_spec.rb
```

NOT a good example of a descriptive test

#### Core states of the app

| State | Description                  | Transition               |
| ----- | ---------------------------- | ------------------------ |
|     1 | Game requires registration   |                          |
|       |                              | register a unique handle |
| ----- | ---------------------------- | ------------------------ |
|     2 | Game played with only handle |                          |
|       |                              | complete registration    | 
|       |                              | show complete profile    | 
| ----- | ---------------------------- | ------------------------ |
|     3 | Game played with complete    |                          |
|       | profile gets a star          |                          |
|       |                              | sign out                 |
| ----- | ---------------------------- | ------------------------ |
|     1 | Game requires registration   |                          |
| ----- | ---------------------------- | ------------------------ |

## Module 2 - When Then steps

_Slide 22_

Learn how to make integration tests more traceable with [`rspec-example_steps`](https://github.com/railsware/rspec-example_steps)

### Given When Then

Traditional testing

1. **GIVEN** - arrange a known state
2. **WHEN** - perform an action
3. **THEN** - assert the state change expected

### Series of When Then steps

Benefits from linking a series of "When/Then" steps

- Simplify state set up
    - "When/Then" assertions set up the state for the next "When/Then" steps

- Document the natural series of events and actions to reach a new state

### Code dive

[`spec/features/monster_spec.rb`](/spec/features/monster_spec.rb)

See if you can transform this test into something more readable by adding "When/Then" steps

Hint:
When [action]
Then [assertion]

## Module 3 - Flows vs Mechanics

_Slide 44_

Learn how to better organise integration specs

### Problem 
- Thousands of scenarios need to be tested at this level
- Where can tests be found for modification?
- Where should new tests be written?

### Solution
- Split integration tests according to their responsibility
- Organise your specs
- Scale your test suite

### Responsibilities

**Flows**

1. Driven by external interface
2. Particular sequence of events
3. Effects of a series of interactions
4. Multiple actors

**Mechanics**

1. Driven by partial interface
2. Immediate behaviour of one unit
3. Single actor
4. No critical flow on effects 
5. Exercise in more detail

### Code dive

[`spec/features/monster_spec.rb`](/spec/features/monster_spec.rb)

See if you can extract scenarios from this test into "flows" and "mechanics" under the following directories
extract from [`spec/features/monster_spec.rb`](/spec/features/monster_spec.rb) into

- Flows `spec/features/flows/`
- Mechanics `spec/features/mechanics/`

## Module 4 - Add Feature with Outside-in BDD

_Slide 66_

Learn how to implement a feature using the Multi-layer outside-in BDD approach

### Testing boundaries - what to test

**Flow**
 - Full system integration
 - Test flows with core alternate outcomes
 
**Mechanic**
 - Full system integration
 - Test user experience when error occurs
 - Test user experience when loading is in progress
 - Test immediate behaviour (visible to users)

**Component**
 - Isolated unit
 - Test what happens with parameters passed in (missing, incorrect, correct)
 - Test whether child components are expected to be rendered

**API**
 - Backend integration
 - Test request parameters (valid, invalid, missing, mandatory)
 - Test response  to parameters (valid, invalid, missing, mandatory)
 
**Controller**
 - Isolated unit
 - Test collaboration with other units

**Model (domain)**
 - Isolated unit
 - Test data retrieval
 - Test operations

### Code dive

**New feature**

Player sees their age when viewing their profile
 - Player enters their birthday when registering to play
 - This will require a new step in the profile completion process
 - Birthday should be a field stored in the database
 - Birthday should be used to calculate the players age on the backend

**Challenge**
Use multi-layer outside-in BDD to implement the feature

Flow
[`spec/final_features/flows/register_to_play_game_spec.rb:4`](/spec/final_features/flows/register_to_play_game_spec.rb#L4) 
 - When a user adds their birthday
 - Then they see their age calculated

Mechanic
[`spec/final_features/mechanics/profiles/register_profiles_spec.rb:60`](/spec/final_features/mechanics/profiles/register_profiles_spec.rb#L60)
 - When birthday field is filled in
 - Then profile is successfully updated

Component
[`app/javascript/components/OurForm/RegisterForm/index.test.jsx:9`](/app/javascript/components/OurForm/RegisterForm/index.test.jsx#L9)
[`app/javascript/components/OurForm/index.test.jsx:10`](/app/javascript/components/OurForm/index.test.jsx#L10)
 - When user enters their name, email address AND birthday
 - Their they can enter their AvatarUrl

API
[`spec/api_acceptance/v1/profile_api_spec.rb:4`](/spec/api_acceptance/v1/profile_api_spec.rb#L4)
[`spec/api_acceptance/v1/profile_api_spec.rb:32`](/spec/api_acceptance/v1/profile_api_spec.rb#L32)
 - When request is received to update player with a birthday
 - Then api responds with the birthday

Controller
[`spec/controllers/api/v1/profiles_controller_spec.rb:4`](/spec/controllers/api/v1/profiles_controller_spec.rb#L4)
[`spec/controllers/api/v1/profiles_controller_spec.rb:51`](spec/controllers/api/v1/profiles_controller_spec.rb#L51)
 - When passing a players birthday
 - Then the birthday parameter is permitted

For additional challenges take a look in [docs/complete_the_feature_challenge.md](/docs/complete_the_feature_challenge.md)
