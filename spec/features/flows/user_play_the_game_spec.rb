require 'rails_helper'

feature 'Playing the game', js: true do
  context 'Given the user is NOT registered' do
    scenario 'A new game commences when the user is successfully registered' do
      When 'user plays a game' do
        visit('/')
        focus_on(:landing).play_game
      end

      Then 'user must sign in or register to continue' do
        wait_for do
          focus_on(:page_content).container_for('register').heading
        end.to eq('Please sign in or create a profile!')
      end

      When 'user signs up' do
        focus_on(:auth).sign_up('princess')
        focus_on(:profile).submit_email('princess@email.com')
      end

      Then 'the profile is successfully created' do
        wait_for { focus_on(:message).info }.to eq('Updated user profile')
      end

      And 'the user is signed in under that profile' do
        wait_for { focus_on(:nav).profile }.to eq('princess')
      end

      And 'the game commences' do
        wait_for { focus_on(:page_content).container_for('game').heading }.to eq('coming soon')
      end
    end

    context 'But there is an existing profile for their email address' do
      before do
        @profile = Player.create!(id: '01234567-0123-4abc-8abc-0123456789ab', handle: 'princess')
      end

      scenario 'A new game commences when the user is successfully registered' do
        When 'user plays a game' do
          visit('/')
          focus_on(:landing).play_game
        end

        Then 'user must sign in or register to continue' do
          wait_for do
            focus_on(:page_content).container_for('register').heading
          end.to eq('Please sign in or create a profile!')
        end

        When 'user attempts sign up using an existing handle' do
          focus_on(:auth).sign_up('princess')
        end

        Then 'a profile cannot be created if it already exists' do
          wait_for { focus_on(:message).error }.to eq('handle: has already been taken')
        end

        When 'user chooses a handle that does not already exist in the system' do
          focus_on(:auth).sign_up('disney_princess')
        end

        Then 'the profile is successfully created' do
          wait_for { focus_on(:message).info }.to eq('profile successfully created')
        end

        And 'the user is signed in under that profile' do
          wait_for { focus_on(:nav).profile }.to eq('disney_princess')
        end

        When 'user completes their registration' do
          focus_on(:profile).submit_email('princess@email.com')
        end

        Then 'the game commences' do
          wait_for { focus_on(:page_content).container_for('game').heading }.to eq('coming soon')
        end
      end

      scenario 'A new game CANNOT commence when the user is NOT successfully registered' do
        When 'user plays a game' do
          visit('/')
          focus_on(:landing).play_game
        end

        Then 'user must sign in or register to continue' do
          wait_for do
            focus_on(:page_content).container_for('register').heading
          end.to eq('Please sign in or create a profile!')
        end

        When 'user attempts sign up using an existing handle' do
          focus_on(:auth).sign_up('princess')
        end

        Then 'a profile cannot be created if it already exists' do
          wait_for { focus_on(:message).error }.to eq('handle: has already been taken')
        end

        When 'user tries to play the game again, ignoring the warning' do
          focus_on(:landing).follow_brand_link
          focus_on(:landing).play_game
        end

        Then 'user must to sign in or register to continue' do
          wait_for do
            focus_on(:page_content).container_for('register').heading
          end.to eq('Please sign in or create a profile!')
        end
      end
    end
  end

  context 'Given a user IS registered AND signed in' do
    before do
      @profile = Player.create!(id: '01234567-0123-4abc-8abc-0123456789ab', handle: 'princess')
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
        focus_on(:landing).play_game
      end

      Then 'the game commences' do
        wait_for { focus_on(:page_content).container_for('game').heading }.to eq('coming soon')
      end
    end
  end

  context 'Given a user IS registered and NOT signed in' do
    before do
      @profile = Player.create!(
        id: '01234567-0123-4abc-8abc-0123456789ab',
        handle: 'princess',
        email: 'princess@email.com'
      )
    end

    scenario 'playing a game' do
      When 'user plays a game' do
        visit('/')
        focus_on(:landing).play_game
      end

      Then 'user must sign in or register to continue' do
        wait_for do
          focus_on(:page_content).container_for('register').heading
        end.to eq('Please sign in or create a profile!')
      end

      When 'user signs in using their existing account' do
        focus_on(:auth).sign_in('princess')
      end

      Then 'the game commences' do
        wait_for { focus_on(:page_content).container_for('game').heading }.to eq('coming soon')
      end
    end
  end
end
