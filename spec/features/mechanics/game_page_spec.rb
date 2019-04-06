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
    before do
      @profile = Player.create!(id: '01234567-0123-4abc-8abc-0123456789ab')
      page.visit('/')
      page.execute_script "window.localStorage.setItem('player','{\"id\":\"#{@profile.id}\"}')"
    end

    scenario 'game page shows coming soon for users with profile' do
      When 'a user of the internet visits the game' do
        visit('/game')
      end

      Then 'they are shown the coming soon status' do
        wait_for { focus_on(:game).status }.to eq 'coming soon'
      end
    end

    scenario 'page shows loading spinner while the profile is being fetched' do
      When 'a user of the internet vists the game page in original loading state' do
        with_api_route_paused(method: 'get', url: '/api/v1/profiles') do
          visit('/game')
          wait_for { focus_on(:util).test_elements('game') }.to eq ['Loading...']
        end
      end

      Then 'the loading element is no longer visible' do
        wait_for { focus_on(:util).test_elements('profile') }.to_not include('Loading...')
      end
    end

    scenario 'page shows error if profile fetch failed'

    scenario 'page encourages profile upsell for basic profile' do
      When 'a user of the internet vists the game page' do
        visit('/game')
      end

      Then 'they are encouraged to customize their profile and see their progress' do
        wait_for { focus_on(:game).profile_upsell }.to eq 'customize your profile with custom handle and image'
        wait_for { focus_on(:util).buttons }.to eq ['Customize Profile!']
      end
    end

    context 'user with a custom handle setup' do
      before do
        # @profile.update_attributes(handle: 'princess')
      end

      scenario 'page DOES NOT encourages profile upsell' do
        When 'a user of the internet vists the game page' do
          visit('/game')
        end

        Then 'they are NO LONGER encouraged to customize their profile' do
          pending 'button is yet to be removed'
          # TODO: need the upsell to make the button not flake for there are no buttons at this stage
          wait_for { focus_on(:game).profile_upsell }.to eq 'customize your profile with custom handle and image'
          wait(1).for { focus_on(:util).buttons }.to eq []
        end
      end
    end
  end
end
