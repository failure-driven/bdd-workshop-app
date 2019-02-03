require 'rails_helper'

feature 'Game', js: true do
  scenario 'game is a React single page app (SPA)' do
    When 'user visits the game' do
      pending("we don't have route")
      visit('/game')
    end

    Then 'user sees they are on react' do
      wait_for { focus_on(:game).message_and_versions }.to eq(
        message: 'You are on react',
        react:   '16.7',
        node:    '11.11.0'
      )
    end
  end
end
