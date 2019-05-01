# Glossary

## API - Application programming interface

A set of commands that can be communicated to using programs. In this case
communicated by the JavaScript program running on a users browser calling the
methods on a web server.

[Read more on wikipedia ...](https://en.wikipedia.org/wiki/Application_programming_interface)

## BDD - Behaviour Driven Design

A form of TDD that looks at creating software "outside in" looking at the outer
most behaviours required to reach a particular business outcome.

[Read more at agile aliance ...](https://www.agilealliance.org/glossary/bdd/)

## Domain model

A conceptual mode of the domain that incorprates both behaviour and data.

[https://en.wikipedia.org/wiki/Domain_model](https://en.wikipedia.org/wiki/Domain_model)

## Feature branches

The idea of developing features in a dedicated branch and not the master branch
in a version control system like [git](#git). Integration of the branch to the
main branch only occurs when the feature is finished.

[Read more at atlassian ...](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow)

## Flow

An [integration spec](#integration-spec) that follows a path through an
application that has various flow on effects. For example a user seeing a
registration form and registering has a flow on effect that they are registered
and can be signed in.

## Full Pipeline

Owning every line of code from business analysis, through design, testing,
implementing and supporting in production.

## Fresho!

Were we work, a closed marketplace between restaurants and wholesale food
suppliers. The online app saves chef's 1 hour a day in placing orders and
managing payments and receipts, ordering 6 days a week

[https://fresho.com](https://fresho.com)

## Full Stack

A developer who writes code at all the layers of a [layered
architecture](#layered-architecture). Usually in a web app this involves
writing frontend code for the browser and backend code for the server.

[Read more at codeup ...](https://codeup.com/what-is-a-full-stack-developer/)

## Git

A revision control system for code.

[https://git-scm.com/](https://git-scm.com/)

## Integration spec

A [test](#test) that integrates all layers below a certain point in a [layered
architecture](#layered-architecture). For example an integration spec at the
browser level will integrate: browser, api, controllers, models and data base.
An integration spec at the model level will integrate models and the database.
This is opposite to an [isolated test](#isolated-test).

## Isolated test

A [test](#test) that tests code in isolation to other collaborators. Other
collaborators interfaces are [mocked](#mocking) out.

## Jest

Javascript testing framework

[https://jestjs.io/](https://jestjs.io/)

## JSON - JavaScript Object Notation

Lightweight data-interchange format that is human readable and used in many
modern APIs.

[Reac more at json.org ...](https://www.json.org/)

## JSX

A syntax extension to JavaScript which translates <angled bracket> styled
sytnax similar to HTML to render [react](#react) comonents.

[https://reactjs.org/docs/introducing-jsx.html](https://reactjs.org/docs/introducing-jsx.html)

## Layered architecture

Components within an application organized into horizontal layers. Each layer
performs a specific role in the application.

[Read more at oreilly.com ...](https://www.oreilly.com/library/view/software-architecture-patterns/9781491971437/ch01.html)

## Mechanic

An [integration spec](#integration-spec) that only tests a particular
component. Used to differentiate from [flow](#flow) specs which test how a
number of components work together in a system. For example a form being filled
in with valid and invalid fields would be a mechanic.

## Mocking

The use of mock objects, or fakes to fake out behaviour of software components
that you do not want to integrate into a test.

[Read more about mock objects at agile aliance ...](https://www.agilealliance.org/glossary/mocks/)

## Multi layer outside in BDD

An approach to organising tests in layers. From outer most integration tests
through various layers of isolated and integration tests. All the tests using a
BDD style. Testing style as pioneered by [Perryn
Fowler](https://twitter.com/perrynfowler) CTO at
[Fresho!](#fresho)

## Pairing

Pair programming where 2 (or sometimes more) developers work actively on 1
machine to solve the same problem. Usually they split into 2 roles of the
driver who is typing and the navigator who is reviewing what is typed.

[Read more on wikipedia ...](https://en.wikipedia.org/wiki/Pair_programming)

## QA

Quality Assurance, usually a role filled by people to perform various sorts of
manual testing.

## React

A JavaScript library developed by Facebook for building user interfaces.

[https://reactjs.org/](https://reactjs.org/)

## RSpec

A ruby testing framework for BDD

[Read more on the rspec.info site ...](https://rspec.info/)

## Selenium

Browser automation software that programatically operates a browser to allow
for automated [integraton testing](#integration-spec)

[https://www.seleniumhq.org/](https://www.seleniumhq.org/)

## spec

A [test](#test) written in a specification format.

## TDD - Test Driven Design

Red, Green, Refactor style of programming. Where **Red** refers to writing a
failing test, **Green** refers to implementing the solution to make just that
test pass and **Refactor** means improving the quality of the implementation.

[Read more at agile aliance ...](https://www.agilealliance.org/glossary/tdd/)

## TDD Test Drive Design vs Development

Using TDD not only to drive development but actively writing tests to guide to
a certain design.

## test

A piece of code that is written as a test harness for testing actual code that
is used for the application.

## Trunk based development

All features are developed by all developers on the same master branch known as
trunk. All code is immediately integrated with that of every other developer.

[Trunk Based Development](https://trunkbaseddevelopment.com/)

## webpack

Module bundler to bundle JavaScript files for usage in a browser.

[https://webpack.js.org/](https://webpack.js.org/)

## webpacker

Gem to use [Webpack](#webpack) to manage app-like JavaScript modules in Rails.

[https://github.com/rails/webpacker](https://github.com/rails/webpacker)

