require 'rails_helper'

feature 'profile page', js: true do
  scenario 'landing on profile page makes it available from landing page' do
    When 'I visit the profile page directly and follow the brand link' do
      visit('/profile')
      focus_on(:landing).follow_brand_link
    end

    Then 'I am on the landing page with the profile link visible' do
      wait_for { page.current_path }.to eq('/')
      wait_for { focus_on(:landing).navigation }.to eq ['Profile']
    end
  end

  scenario 'landing on profile page displays a loading state for user id' do
    When 'I visit the proifle page' do
      visit('/profile')
    end

    Then 'I see loading state' do
      wait_for { focus_on(:profile).test_elements }.to eq ['Loading...']
    end
  end

  scenario 'complains bitterly if the profile cannot be retrieved' do
    When 'I visit the profile page' do
      visit('/profile')
    end

    Then 'I see an error message' do
      pending 'loading does not disappear once error message is displayed'
      wait_for { focus_on(:message).error }.to eq 'Error - failed to fetch profile'
      wait_for { focus_on(:profile).test_elements }.to eq []
    end
  end

  scenario 'loading state'
  scenario 'error state'
  scenario 'same id on revist'
  scenario 'user id does not exist'
  scenario 'user id is not signed'
end
