require 'rails_helper'

feature 'Register to play the game', js: true do
  scenario 'Yukihiro wants to play a game and completes his registration' do
    When 'Yukihiro visits the site to play the game' do
      visit('/')
      focus_on(:game_actions).for_game('wargames').play
    end

    Then 'he is prompted to register'
    When 'when he registers his handle "Matz"'
    Then 'he has a profile created and an option to continue or play the game'
    When 'he chooses to "play game"'
    Then 'he is shown that the game is coming soon'
    And 'he is encouraged to fill in his profile'
    When 'he completes his profile'
    Then 'he has a complete profile page'
    When 'he plays game now'
    Then 'he has a gold star for completing his profile and the game is still coming soon'
    When 'he signs out'
    Then 'he is on the landing page and not signed in'
  end

  context 'Larry Wall is registered as TimToady' do
    before do
      @profile = Player.create!(
        handle: 'TimToady',
        email: 'larry@wall.org'
      )
    end

    scenario "Brenadan Eich tries to register
        with the handle 'TimToady'
        which is already taken" do

      When 'Bendan visits the site to play the game'
      And 'attempts to register with "TimToady"'
      Then 'he sees the handle is already taken'
      When 'he registers with "BrendanEich"'
      Then 'he is registered'
      When 'he clicks to play the game'
      Then 'he is shown that the game is coming soon'
    end
  end
end
