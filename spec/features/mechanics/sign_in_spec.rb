require 'rails_helper'

feature 'sign in', js: true do
  scenario 'unregistered users cannot sign in' do
    When 'user attempts to sign in'
    Then 'they must register'
    When 'user registers'
    And 'they try again to sign in'
    Then 'sign in is successful'
  end

  context 'a user is registered' do
    before do
      @profile = Player.create!(id: '01234567-0123-4abc-8abc-0123456789ab', handle: 'princess')
    end

    scenario 'user is taken to profile page when profile is 50% complete' do
      When 'user signs in'
      Then 'sign in is successful'
      And 'theyre taken to their profile page'
      And 'theyre informed their profile is only 50% complete'
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
          wait_for { focus_on(:sign_in).title }.to eq('Please sign in to continue!')
        end

        When 'user successfully signs in' do
          focus_on(:auth).sign_up('princess')
        end

        Then 'sign in is successful' do
          wait_for { focus_on(:message).info }.to eq('signed in successfully')
          wait_for { focus_on(:nav).profile }.to eq('princess')
        end

        And "they're taken to the game page" do
          wait_for { focus_on(:game).status }.to eq('coming soon')
        end
      end

      scenario 'user signs via game page link' do
        When 'user follows the sign in link in the nav' do
          visit('/game')
        end

        Then "they're taken to the register page" do
          wait_for { focus_on(:auth).title }.to eq('Please sign in or create a profile!')
        end

        When 'user successfully signs in with existing account' do
          focus_on(:auth).sign_in('princess')
        end

        Then 'sign in is successful' do
          wait_for { focus_on(:message).info }.to eq('signed in successfully')
          wait_for { focus_on(:nav).profile }.to eq('princess')
        end

        And "they're taken to the game page" do
          wait_for { focus_on(:game).status }.to eq('coming soon')
        end
      end
    end

    context "AND they're already signed in" do
      scenario 'user cannot sign in again'
    end

    context 'But their profile has been suspended' do
      scenario 'user cannot sign in when their profile is suspended' do
        When 'user attempts to sign in'
        Then 'theyre informed they cannot sign in because their account has been suspended'
      end
    end
  end
end
