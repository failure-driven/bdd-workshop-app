# Complete the feature challenge

### Tips & tricks for completing the feature

- Read entire test scenarios carefully _before_ making changes to them
- Watch the test fail _before_ implementing a solution
    - Hint: Try to understand the reason _why_ it failed
- By marking a test as `pending`, RSpec will expect this test to fail
- With each passing test, traverse back up a level to see if that test is passing too
    - Hint: If it does not pass, drill down again 

#### Run tests from command line

**RSpec tests**
```bash
bin/rspec path/to/file:line_number
```

**Frontend test**

- **All frontend tests**
    ```bash
    yarn watch-test
    ```

- **Specific frontend tests**
    ```bash
    -w
    -p
    [NameOfDirectory]
    ```

**Full test suite**
```bash
bin/full-build
```

---

## Flow

File: `spec/final_features/flows/register_to_play_game_spec.rb`

Scenario: `"Sophie Wilson would like to play the game and in order to do so she registers"`

Line: 4

- We expect this test to fail
- It is marked as `pending` on around Line 92 `Then 'her profile is complete'`

To run this spec from the command line
```bash
bin/rspec spec/final_features/flows/register_to_play_game_spec.rb:4
```

## Mechanic 

File: `spec/final_features/mechanics/profiles/register_profiles_spec.rb`

Scenario: `"Adele fills in all fields while completing registration process"`

Line: 60

- TODO: Assert that the correct age shows up in the profile page
- Hint: Age is calculated based on the birth date specified during the sign up process

To run this spec from the command line
```bash
bin/rspec spec/final_features/mechanics/profiles/register_profiles_spec.rb:60
```

## Component 

File `app/javascript/components/Profile/ProfileContainer.jsx`
- The render function in ProfileContainer returns a ternary based on how complete a player's profile is
    - Hint: In here you will find a component which is rendered if the players profile is 100% complete

Scenario: `"Displays avatar, name, handle and email"`

Line: 6

- TODO: Assert that age is rendered in profile component
- Hint: This is an isolated unit test
- TODO: Implement frontend code to show the age

To run this spec from the command line
```bash
-w
-p
[NameOfDirectory]
```

## API 

File: `spec/api_acceptance/v1/profile_api_spec.rb`

Scenario: `"player exists"`

Line: 4

- TODO: Assert that the `show` endpoint responds with an age value
- Hint: If the API fails with an Http response: 500 try adding in a `binding.pry` and inspect the `response.body`

To run this spec from the command line
```bash
bin/rspec spec/api_acceptance/v1/profile_api_spec.rb:4
```

## Controller
 
File: `spec/controllers/api/v1/profiles_controller_spec.rb`

Scenario: `"it shows a player"`

Line: 4

- TODO: Assert that the `show` endpoint responds with an age value
- Hint: Making this test pass may involve updating a serializer

To run this spec from the command line
```bash
bin/rspec spec/controllers/api/v1/profiles_controller_spec.rb:4
```

## MODEL

File: `spec/models/player_spec.rb`

- TODO: Test Drive an age method with TDD
    - It should:
        - return nil when player does not have dob
        - return the correct age when birthday is today
        - return the correct age when birthday is tomorrow
- Hint: Freeze at a specific point in time using the Timecop gem to ensure your tests will still pass in any timezone!

To run this spec from the command line
```bash
bin/rspec spec/models/player_spec.rb
```

## FULL TEST SUITE

- When you think you have implemented the feature, try running the full test suite

    ```bash
    bin/full-build
    ```

- Additional failing tests may require amendments because the system's behaviour has now changed
- Hint: Sign up process is to fill in handle, name, email, dob, avatarURl - in a `specific order`
- Hint: A `complete` profile now requires the player to fill in their `dob`

## Extension

If you got to here you have a way of adding a birthday on the multi step
registration form and display the age

1. Complete the mechanics of managing birthday by adding it to the edit form
1. The steps show a percentage complete, make birthday part of percentage complete
1. Extend the game to show a different view of playing the game dependant on
   age: for example a different page for
   - 0 - 4 year old,
   - 4 - 13 year old
   - 13 - 18 year old and
   - 18+

## Happy Coding!

- Let us know how you got along!
    - Twitter: @selenasmall88 & @saramic
    - Email: selenawiththetattoo@gmail.com & saramic@gmail.com
    - Github: create an issue on the repo
