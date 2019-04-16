require 'rails_helper'

feature 'Sign into existing account', js: true do
  context 'Sophie Wilson has a profile' do
    before do
      @profile = Player.create!(
        handle: 'bbcMicro',
        email: 'sophie.wilson@acorn.co.uk'
      )
    end

    scenario 'Sophine signs in to play a game' do
      When 'Sophie signs in to play a game'
      Then 'She is greeted with a coming soon'
    end

    scenario 'Sophine signs in to update her profile' do
      When 'Sophie signs in to edit her profile'
      Then 'she is greeted with her current profile'
      When 'she edit her profile and saves it'
      Then 'she is shown the values of her new profile'
    end
  end
end
