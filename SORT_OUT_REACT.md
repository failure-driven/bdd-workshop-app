# Sort Out React

This is a work in progress ...

## Aim

Give people a way to organise thier integration tests

1. High level business level **flows** through the system that a user may experience
1. Specific **mechanics** of a particular page and how it responds to browser input
1. API acceptance integration specs

whilst looking at a real app with unit tests around the React frontend

## Guiding princples

- it is mostly about the flows, mechancis and API acceptance specs
- use as many "default" libraries and keep complexity down

## Audience

Rails Conf attendees - a bit of a mixed bag of new devs to experienced devs

## Brief

as visible on the [website](https://railsconf.com/schedule#wednesday) to attendees

> **Multi layer BDD for modern rails web apps**
> Learn how to drive out functionality in a modern rails based web app with
> multi layered, outside in Behaviour Driven Development, BDD. To scale tests
> for a production scale app we will run you through the layers of testing that
> matter, from "system flow" integration specs through "page mechanics" specs
> that take a component through it's paces down through frontend component
> tests, API specs through to specs to integrate to outside services and
> everything in between. All the while building a fun app with Rails and
> ReactJS.

[Submission in full (GitHub)](https://github.com/failure-driven/layered-testing-presentation/blob/master/submission_rails_conf_2019_workshop.md) as submitted to selection process

## The demo app

A simple progressive user profile creation form

- [✅] by default user is identifed by an ID
- [ ] optionally user can give themselves an alias
- [ ] optionally user can associate an email address
- [ ] optionally user can have their gravatar assoicated with their profile
- [ ] optionally user can upload their own photo

Extensions

- [ ] oauth with linkedin and/or github signup
- [ ] confirm email and get single use signin token

**Full App**

Includes a multiplayer quiz game where players use the profile creation above
to play the game. This would give attendees the opportunity to see a more full
integration level test suite.

## React Questions

Some decisions:

- **using Hooks** - seems ok
  - [useProfile](app/javascript/hooks/useProfile/index.js)
  - [ExHookProfile/useProfile.js](app/javascript/components/experimental/ExHookProfile/useProfile.js)
- **testing** react hooks
  - https://github.com/mpeyper/react-hooks-testing-library
- **testing** react
  - [react-testing-library](https://github.com/kentcdodds/react-testing-library#examples)

**Questions** Around the core user signup flow

- [ ] **Problem** with commented out tests for hooks that update state using
      jest mocks and using promises

  - [app/javascript/hooks/useProfile/useProfile.test.js](app/javascript/hooks/useProfile/useProfile.test.js)

    ```
    When testing, code that causes React state updates should be wrapped into act(...):

        act(() => {
          /* fire events that update state */
        });
        /* assert on the output */

    This ensures that you're testing the behavior the user would see in the browser.
    Learn more at https://fb.me/react-wrap-tests-with-act in TestHook
    ```

  - https://hashnode.com/post/how-to-mock-react-hooks-cjsc1iyk002mdhws1xj0dob4e
  - https://medium.com/@jantoine/another-take-on-testing-custom-react-hooks-4461458935d4
  - https://kentcdodds.com/blog/react-hooks-whats-going-to-happen-to-my-tests
  - probably get a better grip of jest mocking
    - https://medium.com/@rickhanlonii/understanding-jest-mocks-f0046c68e53c
    - https://medium.com/codeclan/mocking-es-and-commonjs-modules-with-jest-mock-37bbb552da43
  - [async axios with react-testing-library](https://www.leighhalliday.com/async-axios-react-testing-library)
  - [Mocking axios in jest testing async](https://www.leighhalliday.com/mocking-axios-in-jest-testing-async-functions)
  - [how to use async await in react](https://www.valentinog.com/blog/how-async-await-in-react/)

- [ ] using browser fetch vs axios [Mozilla using
      fetch[(https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
  - guiding principles would suggest fetch is 1 less library
  - have had some issues working out how to test it
- [ ] error boundaries - https://reactjs.org/docs/error-boundaries.html
  - are they really that handy?
  - or should I bubble up state to a master component that does all error handling?
- [ ] more on hooks including errors - https://www.robinwieruch.de/react-hooks-fetch-data/
- [ ] get a designer to look over it
  - [ ] styled components or not? I am thinking just an old style CSS stylesheet to keep react simple to a minimum
  - currently using reactstrap and seems ok
  - [ ] boostrap themes?
    - https://www.codeinwp.com/blog/best-free-bootstrap-templates-for-reactjs/
  - responsive typography https://www.sitepoint.com/build-responsive-type-scale-bootstrap/
- [ ] common pattern around placing alert flash pops?
- [ ] any other things
  - [ ] take a look at
    [react-loadable](https://github.com/jamiebuilds/react-loadable) - A higher
    order component for loading components with promises.
  - [ ] how much could be sorted with a 3rd party fetch hook like
    [useFetch](https://itnext.io/usefetch-react-custom-hook-for-fetch-api-with-suspense-and-concurrent-mode-in-mind-1d3ba9250e0)
  - any point in storybook for this app?
    - https://storybook.js.org/
    - https://storybook.js.org/docs/guides/quick-start-guide/
    - https://dev.to/nickytonline/getting-started-with-react-storybook-9jh
    - https://www.learnstorybook.com/
    - https://marmelab.com/blog/2019/01/17/react-timeline.html
    - https://medium.com/storybookjs/storybook-4-0-is-here-10b9857fc7de
    - https://storybook.js.org/docs/addons/addon-gallery/
  - anything else to add to localstorge https://hackernoon.com/how-to-take-advantage-of-local-storage-in-your-react-projects-a895f2b2d3f2

**Around the secondary app** in spike state at the moment

- [ ] hooks seem quite useful here although probably should write some custom hooks to reduce duplication
- [ ] state of websockets

Repo for spike game code -> https://github.com/SelenaSmall/search-term

**Somewhat answered**

- [x] React testing best practices?
  - [x] [react-testing-library](https://github.com/kentcdodds/react-testing-library#examples) sounds ok but is this common?
- [x] hooks or not hooks?
  - found them handy
  - make relevant with new technology
  - guiding princpile to reduce code clutter
  - cannot test with enzyme
  - what should I test it with?
    - [x] https://github.com/mpeyper/react-hooks-testing-library
    - https://blog.logrocket.com/a-quick-guide-to-testing-react-hooks-fa584c415407
- [x] LocalStorage vs cookie vs JWT
  - [x] [local storage wrapper](https://hackernoon.com/how-to-take-advantage-of-local-storage-in-your-react-projects-a895f2b2d3f2)
- [x] react suspense for spinners?

  - **Answer** seems like a bad idea as it is based on undocumented features of `suspense`
  - [example - usefetch react custom hook](https://itnext.io/usefetch-react-custom-hook-for-fetch-api-with-suspense-and-concurrent-mode-in-mind-1d3ba9250e0)
  - sounds like it makes compnents simpler
  - is this a common use?
  - https://medium.com/@baphemot/understanding-react-suspense-1c73b4b0b1e6

- This is all a mess at the moment and not as important but hopefully will be
  re-written by the workshop as a bigger example
- A `game` is created by an `admin` and a `player` can create or join a `match`
  to play against other `players` in a multiplayer game using websockets to
  finally end up on a `result` board
