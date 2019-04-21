require 'rails_helper'

feature 'exercises in flaky tests', js: true do
  scenario 'Flaky test exercises are compiled and available' do
    When 'A ruby developer set of fighting flaky tests looks at the flaky exercises' do
      visit('/flaky')
    end

    Then 'all the exercises are there' do
      wait_for { focus_on(:nav).nav_links }.to eq(['Flaky 3'])
      wait_for { page.find('h1').text }.to eq 'Flaky tests'
    end

    When 'they visit Flaky Number 3' do
      focus_on(:nav).follow_nav_link('Flaky 3')
    end

    Then 'it is ready for the #BDDflakyChallenge' do
      wait_for { page.find('h1').text }.to eq 'Flaky Number 3'
    end
  end
end
