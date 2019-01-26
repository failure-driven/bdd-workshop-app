require 'rails_helper'

feature 'Game App', js: true do
  scenario 'I have a game app' do
    When 'user visits the app' do
      visit('/')
    end

    Then 'user sees they are on rails' do
      # note the apostrophe next line
      wait_for { page }.to have_content("Yay! You’re on Rails!")
    end
  end
end
