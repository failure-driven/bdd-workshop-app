require 'rails_helper'

feature 'Game App', js: true do
  scenario 'I have a game app' do
    When 'user visits the app' do
      visit('/')
    end

    Then 'user sees they are on rails' do
      wait_for { focus_on(:welcome).message_and_versions }.to include(
        message: 'Yay! You’re on Rails!',
        rails_version: match(/^6.0.0/),
        ruby_version: match(/^ruby 2.6.0/)
      )
    end
  end
end
