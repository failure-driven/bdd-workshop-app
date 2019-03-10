require 'rails_helper'

feature 'landing page', js: true do
  scenario 'landing page has a brand of game' do
    When 'a user of the internet visits the site' do
      visit('/')
    end

    Then 'they are greeted with the plain landing page' do
      pending 'no brand on page'
      wait(0.1).for { focus_on(:landing).brand }.to eq 'Game'
      wait_for { focus_on(:landing).navigation }.to eq ['Game']
      wait_for { focus_on(:landing).content }.to eq 'DO YOU WANT TO PLAY A GAME_'
    end
  end

  scenario 'following the Game link lands them on the landing page' do
    When 'a user of the internet visits the site' do
      visit('/')
      pending 'no brand on page'
      wait(0.1).for { focus_on(:landing).brand }.to eq 'Game'
    end
  end
end
