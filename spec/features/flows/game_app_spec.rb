require 'rails_helper'

feature 'Game App', js: true do
  scenario 'A user navigates to the about and game pages' do
    When 'A user from the internet goes to the landing page' do
      visit('/')
    end

    Then 'they are greeted with the landing page' do
      wait_for { focus_on(:landing).content }.to match(/^Games make mistakes.\nSHALL WE PLAY A GAME?/)
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
      # TODO: should they be redirected back to the game from create profile?
      focus_on(:landing).follow_brand_link
      focus_on(:landing).play_game
    end

    Then 'they are informed that the game is coming soon' do
      wait_for { focus_on(:game).status }.to eq 'coming soon'
    end

    When 'they navigate to the about page' do
      focus_on(:landing).follow_nav_link('About')
    end

    Then 'they are informed the game will be out at RailsConf 2019' do
      wait_for { focus_on(:about).content }.to eq 'A demo app of BDD built for RailsConf 2019'
    end
  end

  context 'a user with a profile' do
    before do
      @profile = Player.create!(id: '01234567-0123-4abc-8abc-0123456789ab')
      page.visit('/')
      page.execute_script "window.localStorage.setItem('player','{\"id\":\"#{@profile.id}\"}')"
    end

    scenario 'a user is encouraged to add a custom alias to their profile' do
      When 'A user from the internet goes to the landing page and navigates to the game' do
        visit('/')
        focus_on(:landing).play_game
      end

      Then 'they see their current profile of handle 01234567 and are encouraged to customize their profile' do
        wait_for { focus_on(:game).handle }.to eq '01234567'
        wait_for { focus_on(:game).profile_upsell }.to eq 'customize your profile with custom handle and image'
      end

      When 'they continue by clicking customize profile!' do
        focus_on(:game).customize_profile
      end

      Then 'They are encouraged to input a custom handle' do
        wait_for { focus_on(:profile).handle_placeholder }.to eq('input a custom handle')
      end

      When 'They input a custom handle of "princess" and navigate back to the game' do
        focus_on(:profile).submit_handle('princess')
        focus_on(:landing).follow_brand_link
        focus_on(:landing).play_game
      end

      Then 'They see their handle being "princess" and no prompt to customize thier profile' do
        wait_for { focus_on(:game).profile_upsell }.to eq 'customize your profile with custom handle and image'
        pending 'button is yet to be removed'
        # TODO: wait for upsell to make sure buttons fail
        wait(1).for { focus_on(:util).buttons }.to eq []
      end
    end
  end
end
