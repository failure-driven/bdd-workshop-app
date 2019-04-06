require 'rails_helper'

feature 'profile page', js: true do
  scenario 'complains bitterly if the profile cannot be retrieved' do
    When 'the user visits the profile page and the API returns an error' do
      ForceApiError.force(method: 'post', url: '/api/v1/profiles', error: 'something went wrong')
      visit('/profile')
    end

    Then 'I see an error message' do
      # TODO: 5XX errors should be generic "something went wrong" message
      wait_for { focus_on(:message).error }.to eq '500 - Internal Server Error'
      wait_for { focus_on(:profile).test_elements }.to eq []
    end
  end

  scenario 'user id does not exist'
  scenario 'user id is not signed'

  context 'a user with a profile' do
    before do
      @profile = Player.create!(id: '01234567-0123-4abc-8abc-0123456789ab')
      page.visit('/')
      page.execute_script "window.localStorage.setItem('player','{\"id\":\"#{@profile.id}\"}')"
    end

    scenario 'landing on profile page displays a loading state for user id' do
      When 'I visit the proifle page in original loading state' do
        with_api_route_paused(method: 'get', url: '/api/v1/profiles') do
          visit('/profile')
          wait_for { focus_on(:util).test_elements('profile') }.to eq ['Loading...']
        end
      end

      Then 'the loading element is no longer visible' do
        wait_for { focus_on(:util).test_elements('profile') }.to_not include('Loading...')
      end
    end

    scenario 'profile is 50% comlete' do
      When 'a user of the internet vists the game page' do
        visit('/profile')
      end

      Then 'a progress bar is displayed showing 50%' do
        wait_for { focus_on(:profile).progress }.to eq('50')
        wait_for { focus_on(:profile).progress_text }.to eq('50%')
      end
    end

    scenario 'user adds a handle' do
      When 'a user visits the profile and submits an email address' do
        visit('/profile')
        focus_on(:profile).submit_email('princess@email.com')
      end

      Then 'a success message is displayed' do
        wait_for { focus_on(:message).info }.to eq 'Updated user profile'
      end
    end
    # context 'user with a custom handle setup' do
    #   before do
    #     # @profile.update_attributes(handle: 'princess')
    #   end

    #   scenario 'profile is 50% comlete' do
    #     When 'a user of the internet vists the game page' do
    #       visit('/profile')
    #     end

    #     Then 'a progress bar is displayed showing 100%' do
    #       # pending 'no handle no progress'
    #       # wait_for { focus_on(:profile).progress }.to eq('100')
    #       # wait_for { focus_on(:profile).progress_text }.to eq('100%')
    #     end
    #   end
    # end
  end
end
