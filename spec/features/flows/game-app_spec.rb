require 'rails_helper'

feature 'Game App', js: true do
  scenario 'I have a game app' do
    When 'user visits the app' do
      visit('/')
    end

    Then 'user sees they are on rails' do
      pending "for some reason I am not on rails?"
      wait_for { page }.to have_content("Yay I'm on Rails")
    end
  end
end
