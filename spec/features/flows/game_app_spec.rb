require 'rails_helper'

feature 'Game App', js: true do
  scenario 'A user navigates to the about and game pages' do
    When 'A user from the internet goes to the landing page' do
      visit('/')
    end

    Then 'they are greeted with the landing page' do
      wait_for { focus_on(:landing).content }.to eq "Games make mistakes.\nSHALL WE PLAY A GAME?"
    end

    When 'they navigate to the game' do
      focus_on(:landing).play_game
    end

    Then 'they are greeted with a request to register a profile' do
      wait_for { focus_on(:game).status }.to eq 'Please create a profile first!'
    end

    When 'they click to create a profile' do
      focus_on(:game).create_profile
    end

    Then 'they are informed of their profile handle and told the game is coming soon' do
      wait_for { focus_on(:alert).message }.to eq 'Profile successfully created'
      wait_for { @default_handle = focus_on(:game).handle }.to match(UUID_FIRST_8_REGEX)
    end

    When 'they navigate back to the game' do
      # TODO should they be redirected back to the game from create profile?
      focus_on(:landing).follow_brand_link
      focus_on(:landing).play_game
    end

    Then 'they are informed that the game is coming soon' do
      wait_for { focus_on(:game).status }.to eq 'coming soon'
    end

    When 'they navigate to the about page' do
      pending 'no about link'
      focus_on(:landing).follow_nav_link('About')
    end

    Then 'they are informed the game will be out at RailsConf 2019' do
      wait_for { focus_on(:about).content }.to eq 'Out at RailsConf 2019'
    end
  end
end
