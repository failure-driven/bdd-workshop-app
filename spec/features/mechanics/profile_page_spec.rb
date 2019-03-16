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
      wait_for { focus_on(:profile).is_loading }.to be_truthy
    end
  end

  scenario 'loading state'
  scenario 'error state'
  scenario 'same id on revist'
  scenario 'user id does not exist'
  scenario 'user id is not signed'
end
