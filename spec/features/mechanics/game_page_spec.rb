require 'rails_helper'

feature 'game page', js: true do
  scenario 'game page defaults to create profile page' do
    When 'a user of the internet visits the game' do
      visit('/game')
    end

    Then 'they are greeted with the game create profile page' do
      wait_for { focus_on(:game).status }.to eq 'Please create a profile first!'
    end

    When 'the user clicks on create profile' do
      focus_on(:game).create_profile
    end

    Then 'they see a success message' do
      wait(1.0).for { focus_on(:alert).message }.to eq 'Profile successfully created'
    end

    And 'a handle and coming soon status' do
      wait_for { @default_handle = focus_on(:game).handle }.to match(UUID_FIRST_8_REGEX)

      pending 'no redirect back to game to see coming soon status'
      wait(1.0).for { focus_on(:game).status }.to eq 'coming soon'
    end
  end

  context 'user already has a profile' do
    scenario 'game page shows coming soon for users with profile' do
      When 'a user of the internet visits the game' do
        visit('/game')
      end

      Then 'they are shown the coming soon status' do
        pending 'no coming soon yet'
        wait(1.0).for { focus_on(:game).status }.to eq 'coming soon'
      end
    end
  end
end
