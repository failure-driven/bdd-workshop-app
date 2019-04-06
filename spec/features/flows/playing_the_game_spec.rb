require 'rails_helper'

feature 'Playing the game', js: true do
  context 'Given the user is NOT registered' do
    scenario 'A new game commences when the user is successfully registered' do
      When 'user plays a game' do
        visit('/')
        focus_on(:landing).play_game
      end

      Then 'user must sign in or register to continue' do
        wait_for { focus_on(:auth).title }.to eq('Please sign in or create a profile!')
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
        wait_for { focus_on(:game).status }.to eq('coming soon')
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
          wait_for { focus_on(:auth).title }.to eq('Please sign in or create a profile!')
        end

        When 'user attempts sign up using an existing handle' do
          focus_on(:auth).sign_up('princess')
        end

        Then 'a profile cannot be created if it already exists' do
          pending 'Need to ensure uniqueness of handles'
          wait_for { focus_on(:message).info }.to eq('Profile not created. Handle must be unique')
        end

        When 'user chooses a handle that does not already exist in the system' do
          focus_on(:auth).sign_up('disney_princess')
        end

        Then 'the profile is successfully created' do
          wait_for { focus_on(:message).info }.to eq('Updated user profile')
        end

        And 'the user is signed in under that profile' do
          wait_for { focus_on(:nav).profile }.to eq('princess')
        end

        And 'the game commences' do
          wait_for { focus_on(:game).status }.to eq('coming soon')
        end
      end

      scenario 'A new game CANNOT commence when the user is NOT successfully registered' do
        When 'user plays a game' do
          visit('/')
          focus_on(:landing).play_game
        end

        Then 'user must sign in or register to continue' do
          wait_for { focus_on(:auth).title }.to eq('Please sign in or create a profile!')
        end

        When 'user attempts sign up using an existing handle' do
          focus_on(:auth).sign_up('princess')
        end

        Then 'a profile cannot be created if it already exists' do
          pending 'Need to ensure uniqueness of handles'
          wait_for { focus_on(:message).info }.to eq('Profile not created. Handle must be unique')
        end

        When 'user navigates to the game link, ignoring the warning' do
          focus_on(:landing).follow_nav_link('Game')
        end

        Then 'user must to sign in or register to continue' do
          wait_for { focus_on(:auth).title }.to eq('Please sign in or create a profile!')
        end
      end
    end
  end

  context 'Given a user IS registered AND signed in' do
    before do
      @profile = Player.create!(id: '01234567-0123-4abc-8abc-0123456789ab', handle: 'princess')
      page.visit('/')
      page.execute_script "window.localStorage.setItem('player','{\"id\":\"#{@profile.id}\", \"handle\":\"#{@profile.handle}\"}')"
    end

    scenario 'playing a game' do
      When 'user plays a game' do
        visit('/')
        focus_on(:landing).play_game
      end

      Then 'the game commences' do
        wait_for { focus_on(:game).status }.to eq('coming soon')
      end
    end
  end

  context 'Given a user IS registered and NOT signed in' do
    before do
      @profile = Player.create!(id: '01234567-0123-4abc-8abc-0123456789ab', handle: 'princess')
    end

    scenario 'playing a game' do
      When 'user plays a game' do
        visit('/')
        focus_on(:landing).play_game
      end

      Then 'user must sign in or register to continue' do
        wait_for { focus_on(:auth).title }.to eq('Please sign in or create a profile!')
      end

      When 'user signs in using their existing account' do
        pending 'Need to allow sign in for existing users'
        focus_on(:auth).sign_in('princess')
      end

      Then 'the game commences' do
        wait_for { focus_on(:game).status }.to eq('coming soon')
      end
    end
  end
end
