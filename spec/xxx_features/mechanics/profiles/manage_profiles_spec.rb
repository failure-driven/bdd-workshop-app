require 'rails_helper'

feature 'User manages profile', js: true do
  context 'Jean Sammet has a complete profile and is logged in' do
    before do
      @profile = Player.create!(handle: 'FORMAC', email: 'jean.sammet@ibm.com')
      page.visit('/')
      player = { id: @profile.id, handle: @profile.handle }
      page.execute_script("window.localStorage.setItem('player','#{player.to_json}')")
    end

    scenario 'Jean edits all her fields in the profile' do
      When 'Jean tries to update her handle and email' do
        visit('/profile')
        focus_on(:page_content).container_for('profile').action_item('Edit')
        focus_on(:form).form_for('profile').fill_in_row_for('handle', 'FORTRAN')
        focus_on(:form).form_for('profile').fill_in_row_for('email', 'the.real.jean.sammet@ibm.com')
        focus_on(:form).form_for('profile').submit
      end

      Then 'they are updated successfully' do
        wait_for { focus_on(:profile).details }.to eq(
          avatar: '',
          handle: 'FORTRAN',
          email: 'the.real.jean.sammet@ibm.com'
        )
      end

      When 'the page is refreshed' do
        page.refresh
      end

      Then 'all the fields are persisted' do
        wait_for { focus_on(:profile).details }.to eq(
          avatar: '',
          handle: 'FORTRAN',
          email: 'the.real.jean.sammet@ibm.com'
        )
      end
    end

    scenario 'Jean sees a loading state while retrieving profile details from api' do
      When 'Jean visits their profile page in the original loading state' do
        with_api_route_paused(method: 'get', url: '/api/v1/profiles') do
          visit('/profile')
          wait_for { focus_on(:util).test_elements('profile') }.to eq ['Loading...']
        end
      end

      Then 'the loading element is no longer visible' do
        wait_for { focus_on(:util).test_elements('profile') }.to_not include('Loading...')
      end
    end

    scenario 'page shows error if profile fetch failed' do
      Given 'the profiles API throws errors' do
        force_api_error(method: 'get', url: '/api/v1/profiles', error: 'failed to fetch profile')
      end

      When 'user visits their profile page' do
        visit('/profile')
      end

      Then 'they get an error' do
        wait_for { focus_on(:messages).error }.to eq '400 - Bad Request'
      end

      And 'the API stops throwing errors' do
        clear_api_error
      end
    end
  end

  scenario 'complains bitterly if the profile cannot be retrieved' do
    When 'Jean visits the profile page and the API returns an error' do
      force_api_error(method: 'post', url: '/api/v1/profiles', error: 'something went wrong')
      visit('/profile')
    end

    Then 'she sees an error message' do
      # TODO: 5XX errors should be generic "something went wrong" message
      wait_for { focus_on(:messages).error }.to eq '500 - Internal Server Error'
      wait_for { focus_on(:util).other_test_elements }.to eq []
    end
  end
end
