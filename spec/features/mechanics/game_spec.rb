require 'rails_helper'

feature 'Game', js: true do
  scenario 'game is a React single page app (SPA)' do
    When 'user visits the game' do
      visit('/game')
    end

    Then 'user sees they are on react' do
      wait_for { focus_on(:game).message_and_versions }.to include(
        message: 'You are on React',
        react_version: match(/16\.8\.4/)
      )
    end
  end
end
