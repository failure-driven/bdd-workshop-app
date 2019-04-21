# TODO

**MM**

- [ ] finish avatar
  - test for provided suggestion
  - fake integration
  - Review Frontend specs
- [ ] simplify or move out step functionality in [OurForm](app/javascript/components/OurForm/index.jsx)
- [ ] install instructions [README](README.md)
  - make [BDD workshop](https://github.com/failure-driven/bdd-workshop-app)
  - default instructions

**SS**

- [ ] Kahoot
  - [ ] Introduction - create Kahoot
  - [ ] When/Then - create Kahoot
  - [ ] Flows/Mechanics (optional) - create Kahoot
  - [ ] BDD new feature - create Kahoot
- [ ] [Glossary](docs/glossary.md)
  - term
  - 1 line description
  - link for more information

**Unallocated**

- [ ] app styling
- [ ] presentation styling
- [ ] fill out [Course outline](docs/course_outline.md)
- [ ] move to real repo

# DONE

- [✓] crop avatars
- [✓] change create to only accept handle and only do that in the tests
- [✓] add missing test around the steps rendered in the front end
  - [OurForm](app/javascript/components/OurForm/index.jsx) **line 8** `const step = !handle`
- [✓] factory bot for profile creation (or similar)
- [✓] fix or remove pending
- [✓] fix monster and monster_when_then
- [✓] rename sign up to register
- [✓] remove reference to princess with the theme
- [✓] add code for name
- [✓] make name field editable
- [✓] add code for avatar
- [✓] hide away complex finder methods in JS specs and Ruby ones
  - [✓][profile page fragment](spec/support/features/page_fragments/profile.rb) **line 11 - 21** `def details`
  - [✓][registerform](app/javascript/components/OurForm/RegisterForm/index.test.jsx) **line 9** find all and extract visible labels
  - [✓][showprofile](app/javascript/components/Profile/ShowProfile/index.test.jsx) **line 18-20** `const descriptions = {}`
- [✓] Selena machine
  - [✓] autoformat RubyMine for ruby - post bracket indent and multi line indent
  - [✓] JS formatting
  - [✓] any other errors
  - [✓] terminal open in same window
  - [✓] VI colour scheme
  - [✓] move everything to shared drive
- [✓] kahoot install [Kahoot](https://kahoot.com/mobile-app/)
- [✓][theme](docs/theme.md)
  - [✓] fill out themes for people
- [✓] Kahoot - come up with questions/answers
- [✓] simplify Profile component

## OLD TODO's

TODO: Michael to sort

## install

- chrome version 71 - 75
- byebug needed new version of readline for Ceels could comment it out
- be more explicit around running and installing postgres
- postgres via `asdf` may require re-build to use UUID ? PS
- [ ] look at `asdf` setup - looks like current trend

## navigation

- [ ] step through rspec
  - [ ] run rspec with pry
  - [ ] script that optionaly enables binding.pry and adds # break finds at the beginning?
  - [ ] PS suggestions
    - [ ] environment variable to set a method `b` to add a binding.pry?
    - [ ] overwrite capybara wait statement to add a sleep in slow mode?
- [x] minimise all code blocks
  ```
  ⌘k⌘0 # fold all
  ⌥⌘]  # unfold region
  ```
- [ ] navigate forward and backward through visited code

## fix

- [ ] rails 6.0.0.beta3
- [ ] tests for hooks
- [ ] ruby 2.6.2
- [ ] template warning
  ```
  DEPRECATION WARNING: Single arity template handlers are deprecated.  Template handlers must
  now accept two parameters, the view object and the source for the view object.
  Change:
    >> Class#call(template)
  To:
    >> Class#call(template, source)
  ```
- [ ] review react
  - fetch vs axios https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  - hooks but not testing with enzyme
  - use of
  - global error handling
  - error boundaries - https://reactjs.org/docs/error-boundaries.html
  - testing using C Dodds framework - also custom hooks
    - https://github.com/kentcdodds/react-testing-library#examples
    - https://github.com/mpeyper/react-hooks-testing-library
  - testing hooks
    - https://blog.logrocket.com/a-quick-guide-to-testing-react-hooks-fa584c415407
  - placement of alert and closing messages
  - [ ] sort out dev non dev dependencies
- [ ] review rails
  - [ ] spec/api_acceptance request specs?
  - [ ] v1 in api path?

## Experimental

added experimental page for untested and demo stuff

- http://localhost:3000/experimental
- app/javascript/components/experimental
- app/javascript/packs/experimental_app.js

### ExProfile

using custom hook library to fetch and suspense fallback for spinners

- as per [blog - usefetch react custom hook](https://itnext.io/usefetch-react-custom-hook-for-fetch-api-with-suspense-and-concurrent-mode-in-mind-1d3ba9250e0)
- and lib https://github.com/dai-shi/react-hooks-fetch
- **ISSUE** post requests seem not to work for me? [github eg](https://github.com/dai-shi/react-hooks-fetch/blob/master/examples/02_extended/src/index.js)

## nice to have

- [ ] shimmer load https://alligator.io/react/skeleton-screens-react-and-react-native/
  - https://github.com/danilowoz/react-content-loader
- sort out ruby formatting, prettier and eslint
- sort out why js formatting is different then prettier
- [ ] split testing
- [ ] feature flags
  - http://blog.rstankov.com/feature-flags-in-react/
  - https://github.com/jnunemaker/flipper
- [ ] animation for war games
- [ ] JWT
- [ ] login via github/linkedin
- [ ] donation page
- [ ] feature toggles
- [ ] better websocket strategy? - https://anycable.io/ or elixir?
- [ ] Minesota flavoured memes

  - https://www.youtube.com/watch?v=KtwxrxGjNdo

- [ ] docker build
- [ ] cloud-formation deploy
- [ ] ci with badge on github
- [ ] better font for war games
  - https://www.lifewire.com/create-your-own-fonts-using-inkscape-1701895
- [ ] local storage wrapper https://hackernoon.com/how-to-take-advantage-of-local-storage-in-your-react-projects-a895f2b2d3f2
