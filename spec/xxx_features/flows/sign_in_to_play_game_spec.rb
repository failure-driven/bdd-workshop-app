require 'rails_helper'

feature 'Playing the game', js: true do
  context 'Grace Hopper has registerd her handle COBOL' do
    before do
      @profile = Player.create!(
        handle: 'COBOL',
        email: 'grace.hopper@navy.mil'
      )
    end

    scenario 'A new game CANNOT commence when the user is NOT successfully registered' do
      When 'user plays a game' do
        visit('/')
        focus_on(:game_actions).for_game('wargames').play
      end

      Then 'user must sign in or register to continue' do
        wait_for do
          focus_on(:page_content).container_for('register').heading
        end.to eq('Register')
      end

      When 'user attempts sign up using an existing handle' do
        focus_on(:form).form_for('register').fill_in_row_for('handle', 'COBOL')
        focus_on(:form).form_for('register').submit
      end

      Then 'a profile cannot be created if it already exists' do
        wait_for { focus_on(:messages).error }.to eq('handle: has already been taken')
      end

      When 'user tries to play the game again, ignoring the warning' do
        focus_on(:nav).follow_brand_link
        focus_on(:game_actions).for_game('wargames').play
      end

      Then 'user must to sign in or register to continue' do
        wait_for do
          focus_on(:page_content).container_for('register').heading
        end.to eq('Register')
      end
    end

    scenario 'playing a game' do
      When 'user plays a game' do
        visit('/')
        focus_on(:game_actions).for_game('wargames').play
      end

      Then 'user must sign in or register to continue' do
        wait_for do
          focus_on(:page_content).container_for('register').heading
        end.to eq('Register')
      end

      When 'user signs in using their existing account' do
        focus_on(:page_content).container_for('register').action_item('sign in with an existing account')
        focus_on(:form).form_for('sign-in').fill_in_row_for('handle', 'COBOL')
        focus_on(:form).form_for('sign-in').submit
      end

      Then 'the game commences' do
        wait_for { focus_on(:page_content).container_for('game').heading }.to eq('coming soon')
      end
    end

    context 'Grace Hopper is signed in' do
      before do
        page.visit('/')
        player = {
          id: @profile.id,
          handle: @profile.handle
        }
        page.execute_script("window.localStorage.setItem('player','#{player.to_json}')")
      end

      scenario 'playing a game' do
        When 'user plays a game' do
          visit('/')
          focus_on(:game_actions).for_game('wargames').play
        end

        Then 'the game commences' do
          wait_for { focus_on(:page_content).container_for('game').heading }.to eq('coming soon')
        end
      end
    end
  end
end
