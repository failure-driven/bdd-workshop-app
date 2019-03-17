# TODO

## install

- chrome version 71 - 75
- byebug needed new version of readline for Ceels could comment it out
- be more explicit around running and installing postgres

## navigation

- [ ] run rspec with pry
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
  - [ ] react suspense for spinners? https://itnext.io/usefetch-react-custom-hook-for-fetch-api-with-suspense-and-concurrent-mode-in-mind-1d3ba9250e0
  - placement of alert and closing messages
  - [ ] sort out dev non dev dependencies
- [ ] review rails
  - [ ] spec/api_acceptance for request specs?
  - [ ] v1 in api path?

## nice to have

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
