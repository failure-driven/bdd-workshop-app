require 'rails_helper'

feature 'Game App', js: true do
  scenario 'I have a game app' do
    When 'user visits the app' do
      visit('/')
    end

    Then 'user sees they are on rails' do
      # note the apostrophe next line
      wait_for { page }.to have_content("Yay! You’re on Rails!")
      version = page.find('p.version')
      wait_for {
        version.text[/(Rails version: )(?<version>[^\n]*)/, 'version']
      }.to match(/^6.0.0/)
      wait_for {
        version.text[/(Ruby version: )(?<version>[^\n]*)/, 'version']
      }.to match(/^ruby 2.6.0/)
    end
  end
end
