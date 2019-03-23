require 'rails_helper'

feature 'profile page', js: true do
  scenario 'landing on profile page I can navigate to landing page and back again' do
    When 'I visit the profile page directly and follow the brand link' do
      visit('/profile')
      focus_on(:landing).follow_brand_link
    end

    Then 'I am on the landing page with the profile link visible' do
      wait_for { page.current_path }.to eq('/')
      wait_for { focus_on(:landing).navigation }.to eq ['Profile']
    end

    When 'I click on profile' do
      focus_on(:landing).follow_nav_link('Profile')
    end

    Then 'I am taken back to the profile page' do
      wait_for { page.current_path }.to eq('/profile')
    end
  end

  scenario 'landing on profile page displays a loading state for user id' do
    When 'I visit the proifle page in original loading state' do
      with_api_route_paused(method: 'post', url: '/api/v1/profiles') do
        visit('/profile')
        wait_for { focus_on(:util).test_elements('profile') }.to eq ['Loading...']
      end
    end

    Then 'the loading element is no longer visible' do
      wait_for { focus_on(:util).test_elements('profile') }.to_not include('Loading...')
    end
  end

  scenario 'complains bitterly if the profile cannot be retrieved' do
    When 'the user visits the profile page and the API returns an error' do
      ForceApiError.force(method: 'post', url: '/api/v1/profiles', error: 'something went wrong')
      visit('/profile')
    end

    Then 'I see an error message' do
      wait_for { focus_on(:message).error }.to eq 'Something went wrong - 500 - Internal Server Error'
      wait_for { focus_on(:profile).test_elements }.to eq []
    end
  end

  scenario 'gets a profile id assigned for all visits' do
    When 'I visit the proifle page' do
      visit('/profile')
    end

    Then 'a consistent uuid id is presented per browser' do
      wait_for do
        @user_uuid = focus_on(:profile).user_id
      end.to match(UUID_REGEX)
    end

    When 'the browser refreshes' do
      page.driver.refresh
    end

    Then 'the same uuid is presented' do
      wait_for { focus_on(:profile).user_id }.to eq @user_uuid
    end
  end

  scenario 'user id does not exist'
  scenario 'user id is not signed'
end
