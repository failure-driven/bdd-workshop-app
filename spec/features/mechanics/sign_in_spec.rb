require 'rails_helper'

feature 'sign in', js: true do
  scenario 'unregistered users cannot sign in' do
    When 'user attempts to sign in'
    Then 'they must register'
    When 'user registers'
    And 'they try again to sign in'
    Then 'sign in is successful'
  end

  context 'a user is registered' do
    scenario 'user is taken to profile page when profile is 50% complete' do
      When 'user signs in'
      Then 'sign in is successful'
      And 'theyre taken to their profile page'
      And 'theyre informed their profile is only 50% complete'
    end

    scenario 'user is taken to game page when profile is 100% complete' do
      When 'user signs in'
      Then 'sign in is successful'
      And 'theyre taken to the game page'
    end

    context 'But their profile has been suspended' do
      scenario 'user cannot sign in when their profile is suspended' do
        When 'user attempts to sign in'
        Then 'theyre informed they cannot sign in because their account has been suspended'
      end
    end
  end
end
