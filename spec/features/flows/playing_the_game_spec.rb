require 'rails_helper'

feature 'Playing the game', js: true do
  context 'Given the user is NOT registered' do
    scenario 'A new game commences when the user is successfully registered' do
      When 'user visits the app'
      Then 'welcome text is visible'
      When 'click Lets Play'
      Then 'user must sign in or register to continue'
      When 'user attempts to sign up'
      # here they fill in a complete profile (handle, email, gravatar, 100% complete)
      Then 'the profile is successfully created'
      And 'the user is signed in under that profile'
      And 'game commences'
      # "Coming soon"
    end

    context 'But there is an existing profile for their email address' do
      before do
        # create a profile
      end

      scenario 'A new game commences when the user is successfully registered' do
        When 'user visits the app'
        Then 'welcome text is visible'
        When 'click Lets Play'
        Then 'user must to sign in or register to continue'
        When 'user attempts to sign up'
        # here they fill in a complete profile (handle, email, gravatar, 100% complete) with existing email address
        Then 'a profile cannot be created if it already exists'
        When 'user fixes the mistake in their sign up form'
        Then 'the profile is successfully created'
        And 'the user is signed in under that profile'
        And 'game commences'
        # "Coming soon"
      end

      scenario 'A new game CANNOT commence when the user is NOT successfully registered' do
        When 'user visits the app'
        Then 'welcome text is visible'
        When 'click Lets Play'
        Then 'user must to sign in or register to continue'
        When 'user attempts to sign up'
        # here they fill in a complete profile (handle, email, gravatar, 100% complete) with existing email address
        Then 'a profile cannot be created if it already exists'
        When 'user navigates to the game link, ignoring the warning'
        Then 'user must to sign in or register to continue'
      end
    end
  end

  context 'Given the user IS registered AND signed in' do
    scenario 'playing a game' do
      When 'user visits the app'
      Then 'welcome text is visible'
      When 'click Lets Play'
      Then 'game commences'
      # "Coming soon"
    end
  end

  context 'Given the user IS registered and NOT signed in' do
    scenario 'playing a game' do
      When 'user visits the app'
      Then 'welcome text is visible'
      When 'click Lets Play'
      Then 'user must to sign in or register to continue'
      When 'user signs in'
      Then 'game commences'
      # "Coming soon"
    end
  end
end
