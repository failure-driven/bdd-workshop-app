require 'rails_helper'

feature 'sign in', js: true do
  scenario 'unregistered user visits /sign_out' do
    When 'Kathleen Booth attempts to visit sign out' do
      visit('/sign_out')
    end

    Then 'she redirected to home page and not signed in' do
      wait_for { focus_on(:nav).nav_links }.to eq ['Sign in', 'Register']
      wait_for { page }.to have_current_path('/')
    end
  end

  scenario 'unregistered users cannot sign in' do
    When 'Kathleen Booth attempts to sign in' do
      visit('/sign_in')
      focus_on(:form).form_for('sign-in').fill_in_row_for('handle', 'ARC_ASSEMBLY')
      focus_on(:form).form_for('sign-in').submit
    end

    But "Kathleen's user can't be found" do
      wait_for { focus_on(:messages).error }.to eq("Couldn't find Player")
    end

    When 'Kathleen registers' do
      focus_on(:nav).follow_nav_link('Register')
      focus_on(:form).form_for('register').fill_in_row_for('handle', 'ARC_ASSEMBLY')
      focus_on(:form).form_for('register').submit
    end

    Then "she's signed in successfully" do
      wait_for { focus_on(:messages).info }.to eq('profile successfully created')
      wait_for { focus_on(:nav).details.summary.text }.to eq('ARC_ASSEMBLY')
    end
  end

  context 'Kathleen Booth is already registered to play the game' do
    before do
      @profile = Player.create!(handle: 'ARC_ASSEMBLY')
    end

    scenario 'user is taken to profile page when profile is 50% complete' do
      When 'Kathleen Booth signs in' do
        visit('/sign_in')
        focus_on(:form).form_for('sign-in').fill_in_row_for('handle', 'ARC_ASSEMBLY')
        focus_on(:form).form_for('sign-in').submit
      end

      Then 'she is signed in successfully' do
        wait_for { focus_on(:messages).info }.to eq('signed in successfully')
        wait_for { focus_on(:nav).details.summary.text }.to eq('ARC_ASSEMBLY')
      end

      And "she's taken to her profile page" do
        wait_for do
          focus_on(:page_content).container_for('profile').heading
        end.to eq('Hi : ARC_ASSEMBLY')
      end
    end

    context 'and her profile is 100% complete' do
      before do
        @profile.update(email: 'kathleen@arcassembly.com')
      end

      scenario 'user signs in via nav link' do
        When 'Kathleen Booth follows the sign in link in the nav' do
          visit('/')
          focus_on(:nav).follow_nav_link('Sign in')
        end

        Then "she's taken to the sign in page" do
          wait_for { focus_on(:page_content).container_for('sign-in').heading }.to eq('Sign In')
        end

        When 'she is signed in with her handle' do
          focus_on(:form).form_for('sign-in').fill_in_row_for('handle', 'ARC_ASSEMBLY')
          focus_on(:form).form_for('sign-in').submit
        end

        Then 'sign in is successful' do
          wait_for { focus_on(:messages).info }.to eq('signed in successfully')
          wait_for { focus_on(:nav).details.summary.text }.to eq('ARC_ASSEMBLY')
        end

        And 'the sign in link is no longer visible' do
          wait_for { focus_on(:nav).nav_links }.to eq ['ARC_ASSEMBLY']
        end

        And "she's taken to the game page" do
          wait_for { focus_on(:page_content).container_for('game').heading }.to eq('coming soon')
        end
      end

      scenario 'user signs in via game page link' do
        When 'Kathleen Booth follows the sign in link in the nav' do
          visit('/game')
        end

        Then "she's taken to the registration page" do
          wait_for do
            focus_on(:page_content).container_for('register').heading
          end.to eq('Register')
        end

        When 'Kathleen attempts to sign in using her exiting account' do
          focus_on(:page_content).container_for('register').action_item('sign in with an existing account')
          focus_on(:form).form_for('sign-in').fill_in_row_for('handle', 'ARC_ASSEMBLY')
          focus_on(:form).form_for('sign-in').submit
        end

        Then 'sign in is successful' do
          wait_for { focus_on(:messages).info }.to eq('signed in successfully')
          wait_for { focus_on(:nav).details.summary.text }.to eq('ARC_ASSEMBLY')
        end

        And 'the sign in link is no longer visible' do
          wait_for { focus_on(:nav).nav_links }.to eq ['ARC_ASSEMBLY']
        end

        And "she's taken to the game page" do
          wait_for { focus_on(:page_content).container_for('game').heading }.to eq('coming soon')
        end
      end
    end

    context "AND she's already signed in" do
      before do
        page.visit('/')
        player = {
          id: @profile.id,
          handle: @profile.handle
        }
        page.execute_script("window.localStorage.setItem('player','#{player.to_json}')")
      end

      scenario 'sign in page redirects signed in users to their profile' do
        When 'Kathleen Booth attempts to visit /sign_in' do
          visit('/sign_in')
        end

        Then "she's redirected to her profile" do
          wait_for do
            focus_on(:page_content).container_for('profile').heading
          end.to eq('Hi : ARC_ASSEMBLY')
        end
      end

      scenario 'user is signed out' do
        When 'Kathleen Booth signs out' do
          visit('/')
          focus_on(:nav).details.click_detail('Sign out')
        end

        Then 'she is no longer signed in' do
          wait_for { focus_on(:nav).nav_links }.to eq ['Sign in', 'Register']
        end

        And "she's redirected to the home page with a sign out message" do
          wait_for { page }.to have_current_path('/')
          wait_for { focus_on(:messages).warn }.to eq('successfully signed out')
        end
      end

      scenario 'visiting /sign_out directly signs the user out' do
        When 'Kathleen Booth signs out' do
          visit('/sign_out')
        end

        Then 'she is no longer signed in' do
          wait_for { focus_on(:nav).nav_links }.to eq ['Sign in', 'Register']
        end
      end
    end
  end
end
