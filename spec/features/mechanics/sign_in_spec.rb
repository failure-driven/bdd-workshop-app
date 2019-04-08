require 'rails_helper'

feature 'sign in', js: true do
  scenario 'unregistered users cannot sign in' do
    When 'user attempts to sign in' do
      visit('/sign_in')
      # TODO: this is a little bit confusing cause at the moment, sign_up and sign_in
      # use the same method even though they're kind of different
      focus_on(:auth).sign_up('princess')
    end

    Then 'user cant be found' do
      wait_for { focus_on(:message).error }.to eq("Couldn't find Player")
    end

    When 'user registers' do
      focus_on(:landing).follow_nav_link('Register')
      focus_on(:auth).sign_up('princess')
    end

    Then "they're signed in successfully" do
      wait_for { focus_on(:message).info }.to eq('profile successfully created')
      wait_for { focus_on(:nav).profile }.to eq('princess')
    end
  end

  context 'a user is registered' do
    before do
      @profile = Player.create!(id: '01234567-0123-4abc-8abc-0123456789ab', handle: 'princess')
    end

    scenario 'user is taken to profile page when profile is 50% complete' do
      When 'user signs in' do
        visit('/sign_in')
        focus_on(:auth).sign_up('princess')
      end

      Then 'sign in is successful' do
        wait_for { focus_on(:message).info }.to eq('signed in successfully')
        wait_for { focus_on(:nav).profile }.to eq('princess')
      end

      And "they're taken to their profile page" do
        wait_for { focus_on(:page_content).container_for('profile').heading }.to eq('princess')
      end

      And "they're informed their profile is only 50% complete" do
        wait_for { focus_on(:profile).progress }.to eq('50')
        wait_for { focus_on(:profile).progress_text }.to eq('50%')
      end
    end

    context 'and their profile is 100% complete' do
      before do
        @profile.update_attributes(email: 'princess@email.com')
      end

      scenario 'user signs via nav link' do
        When 'user follows the sign in link in the nav' do
          visit('/')
          focus_on(:landing).follow_nav_link('Sign in')
        end

        Then "they're taken to the sign in page" do
          wait_for { focus_on(:page_content).container_for('sign-in').heading }.to eq('Please sign in to continue!')
        end

        When 'user successfully signs in' do
          focus_on(:auth).sign_up('princess')
        end

        Then 'sign in is successful' do
          wait_for { focus_on(:message).info }.to eq('signed in successfully')
          wait_for { focus_on(:nav).profile }.to eq('princess')
        end

        And 'the sign in link is no longer visible' do
          wait_for { focus_on(:landing).navigation }.to eq ['princess']
        end

        And "they're taken to the game page" do
          wait_for { focus_on(:page_content).container_for('game').heading }.to eq('coming soon')
        end
      end

      scenario 'user signs via game page link' do
        When 'user follows the sign in link in the nav' do
          visit('/game')
        end

        Then "they're taken to the register page" do
          wait_for do
            focus_on(:page_content).container_for('register').heading
          end.to eq('Please sign in or create a profile!')
        end

        When 'user successfully signs in with existing account' do
          focus_on(:auth).sign_in('princess')
        end

        Then 'sign in is successful' do
          wait_for { focus_on(:message).info }.to eq('signed in successfully')
          wait_for { focus_on(:nav).profile }.to eq('princess')
        end

        And 'the sign in link is no longer visible' do
          wait_for { focus_on(:landing).navigation }.to eq ['princess']
        end

        And "they're taken to the game page" do
          wait_for { focus_on(:page_content).container_for('game').heading }.to eq('coming soon')
        end
      end
    end

    context "AND they're already signed in" do
      before do
        page.visit('/')
        player = {
          id: @profile.id,
          handle: @profile.handle
        }
        page.execute_script("window.localStorage.setItem('player','#{player.to_json}')")
      end

      scenario 'sign in page redirects signed in users to their profile' do
        When 'user visits /sign_in' do
          visit('/sign_in')
        end

        Then "they're redirected to their profile" do
          wait_for { focus_on(:page_content).container_for('profile').heading }.to eq('princess')
        end
      end
    end

    context 'But their profile has been suspended' do
      scenario 'user cannot sign in when their profile is suspended' do
        When 'user attempts to sign in'
        Then 'theyre informed they cannot sign in because their account has been suspended'
      end
    end
  end
end
