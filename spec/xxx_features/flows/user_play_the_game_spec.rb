require 'rails_helper'

feature 'Playing the game', js: true do
  context 'Given the user is NOT registered' do
    scenario 'A new game commences when the user is successfully registered' do
      When 'user plays a game' do
        visit('/')
        focus_on(:game_actions).for_game('wargames').play
      end

      Then 'user must sign in or register to continue' do
        wait_for do
          focus_on(:page_content).container_for('register').heading
        end.to eq('Register')
      end

      When 'user signs up with handle "princess"' do
        focus_on(:form).form_for('register').submit!(
          handle: 'princess'
        )
      end

      Then 'the profile is successfully created' do
        wait_for do
          focus_on(:messages).info
        end.to eq('profile successfully created')
      end

      And 'the user is signed in under that profile' do
        wait_for { focus_on(:nav).details.summary.text }.to eq('princess')
      end

      And "they are encouraged to complete their profile
          and also have the option to play the game" do
        wait_for do
          focus_on(:page_content).container_for('profile').text
        end.to include('Your profile is almost complete')
        wait_for do
          focus_on(:page_content).container_for('profile').actions
        end.to eq(['Play the game'])
      end

      When 'they choose to "Play the game"' do
        focus_on(:page_content)
          .container_for('profile')
          .action_item('Play the game')
      end

      Then 'the game commences' do
        wait_for do
          focus_on(:page_content).container_for('game').heading
        end.to eq('coming soon')
      end

      And 'the user is informed they should complete their profile' do
        wait_for do
          focus_on(:page_content).container_for('game').actions
        end.to eq(['Complete my profile'])
      end

      When 'they select "complete my profile"' do
        focus_on(:page_content)
          .container_for('game')
          .action_item('Complete my profile')
      end

      And 'they submit email "princess@email.com"' do
        focus_on(:form).form_for('profile').submit!(
          email: 'princess@email.com'
        )
      end

      Then 'their profile is complete' do
        wait_for { focus_on(:profile).details }.to eq(
          avatar: '',
          handle: 'princess',
          email: 'princess@email.com'
        )
      end

      When 'they choose to "Play the game"' do
        focus_on(:page_content)
          .container_for('profile')
          .action_item('Play the game')
      end

      Then 'the game commences' do
        wait_for do
          focus_on(:page_content).container_for('game').heading
        end.to eq('coming soon')
      end

      And 'the their profile is complete with no further actions' do
        # wait_for do
        #   focus_on(:page_content).container_for('game').text
        # end.to include('Your profile is complete!')
        # wait_for do
        #   focus_on(:page_content).container_for('game').actions
        # end.to eq([])
      end

      When 'they select "complete my profile"' do
        focus_on(:page_content)
          .container_for('game')
          .action_item('Complete my profile')
      end
      When 'the user signs out' do
        focus_on(:nav).details.click_detail('Sign out')
      end

      Then 'the user is no longer signed in' do
        wait_for { focus_on(:nav).nav_links }.to eq ['Sign in', 'Register']
      end
    end

    context 'But there is an existing profile for their handle' do
      before do
        @profile = Player.create!(id: '01234567-0123-4abc-8abc-0123456789ab', handle: 'princess')
      end

      scenario 'A new game commences when the user is successfully registered' do
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
          focus_on(:form).form_for('register').fill_in_row_for('handle', 'princess')
          focus_on(:form).form_for('register').submit
        end

        Then 'a profile cannot be created if it already exists' do
          wait_for { focus_on(:messages).error }.to eq('handle: has already been taken')
        end

        When 'user chooses a handle that does not already exist in the system' do
          focus_on(:form).form_for('register').fill_in_row_for('handle', 'disney_princess')
          focus_on(:form).form_for('register').submit
        end

        Then 'the profile is successfully created' do
          wait_for { focus_on(:messages).info }.to eq('profile successfully created')
        end

        And 'the user is signed in under that profile' do
          wait_for { focus_on(:nav).details.summary.text }.to eq('disney_princess')
        end

        When 'user completes their registration' do
          focus_on(:form).form_for('profile').fill_in_row_for('email', 'princess@email.com')
          focus_on(:form).form_for('profile').submit
        end
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
          focus_on(:form).form_for('register').fill_in_row_for('handle', 'princess')
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
        focus_on(:game_actions).for_game('wargames').play
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
        focus_on(:game_actions).for_game('wargames').play
      end

      Then 'user must sign in or register to continue' do
        wait_for do
          focus_on(:page_content).container_for('register').heading
        end.to eq('Register')
      end

      When 'user signs in using their existing account' do
        focus_on(:page_content).container_for('register').action_item('sign in with an existing account')
        focus_on(:form).form_for('sign-in').fill_in_row_for('handle', 'princess')
        focus_on(:form).form_for('sign-in').submit
      end

      Then 'the game commences' do
        wait_for { focus_on(:page_content).container_for('game').heading }.to eq('coming soon')
      end
    end
  end
end
