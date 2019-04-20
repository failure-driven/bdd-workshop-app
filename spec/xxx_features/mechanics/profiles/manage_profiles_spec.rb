require 'rails_helper'

feature 'User manages profile', js: true do
  context 'Jean Sammet has a complete profile and is logged in' do
    before do
      create_and_login_as(
        handle: 'FORMAC',
        name: 'Jean Sammet',
        email: 'jean.sammet@ibm.com',
        avatar_url: '/bbc_micro_80_80.png'
      )
    end

    scenario 'Jean edits all her fields in the profile' do
      When 'Jean tries to update her handle and email' do
        visit('/profile')
        focus_on(:page_content).container_for('profile').action_item('Edit')
        focus_on(:form).form_for('profile').fill_in_row_for('handle', 'FORTRAN')
        focus_on(:form).form_for('profile').fill_in_row_for('name', 'The Real Jean Sammet')
        focus_on(:form).form_for('profile').fill_in_row_for('email', 'the.real.jean.sammet@ibm.com')
        focus_on(:form).form_for('profile').submit
      end

      Then 'they are updated successfully' do
        wait_for { focus_on(:profile).details }.to eq(
          avatarUrl: '/bbc_micro_80_80.png',
          name: 'The Real Jean Sammet',
          handle: 'FORTRAN',
          email: 'the.real.jean.sammet@ibm.com'
        )
      end

      When 'the page is refreshed' do
        page.refresh
      end

      Then 'all the fields are persisted' do
        wait_for { focus_on(:profile).details }.to eq(
          avatarUrl: '/bbc_micro_80_80.png',
          name: 'The Real Jean Sammet',
          handle: 'FORTRAN',
          email: 'the.real.jean.sammet@ibm.com'
        )
      end
    end

    scenario 'Jean sees a loading state while retrieving profile details from api' do
      When 'Jean visits their profile page in the original loading state' do
        with_api_route_paused(method: 'get', url: '/api/v1/profiles') do
          visit('/profile')
          wait_for { focus_on(:util).test_elements('spinner') }.to eq ['Loading...']
        end
      end

      Then 'the loading element is no longer visible' do
        wait_for { focus_on(:util).test_elements('spinner') }.to_not include('Loading...')
      end
    end

    context 'with API errors for get profile' do
      before do
        force_api_error(method: 'get', url: '/api/v1/profiles', error: 'failed to fetch profile')
      end

      after do
        clear_api_error
      end

      scenario 'page shows error if profile fetch failed' do
        When 'user visits their profile page' do
          visit('/profile')
        end

        Then 'they get an error' do
          wait_for { focus_on(:messages).error }.to eq '500 - Internal Server Error'
        end
      end
    end
  end
end
