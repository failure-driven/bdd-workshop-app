require 'rails_helper'

feature 'user plays the game', js: true do
  scenario 'users without a profile cannot play the game' do
    When 'a user visits the game' do
      visit('/game')
    end

    Then 'they are redirected to the sign up page' do
      wait_for do
        focus_on(:page_content).container_for('register').heading
      end.to eq('Register')
    end
  end

  context 'user exists' do
    before do
      @profile = Player.create!(id: '01234567-0123-4abc-8abc-0123456789ab', handle: 'princess')
      page.visit('/')
      player = {
        id: @profile.id,
        handle: @profile.handle
      }
      page.execute_script("window.localStorage.setItem('player','#{player.to_json}')")
    end

    scenario 'game shows loading spinner while the user profile is being fetched' do
      When 'a user visits the game page in original loading state' do
        with_api_route_paused(method: 'get', url: '/api/v1/profiles') do
          visit('/game')
          wait_for { focus_on(:util).test_elements('game') }.to eq ['Loading...']
        end
      end

      Then 'the loading element is no longer visible' do
        wait_for { focus_on(:util).test_elements('profile') }.to_not include('Loading...')
      end
    end

    scenario 'users with a profile can play the game' do
      When 'user visits the game' do
        visit('/game')
      end

      Then 'they are shown the coming soon status' do
        wait_for { focus_on(:page_content).container_for('game').heading }.to eq('coming soon')
      end
    end
  end
end
