require 'rails_helper'

feature 'registration', js: true do
  # success
  scenario 'only mandatory fields are filled in while completing sign up process' do
    When 'user signs up only filling in mandatory fields' do
      visit('/register')

      focus_on(:auth).sign_up('princess')
    end

    Then 'a profile is created' do
      wait_for { focus_on(:profile).heading }.to eq('princess')
      wait_for { focus_on(:message).info }.to eq('profile successfully created')
    end

    And 'it is shown as 50% complete' do
      wait_for { focus_on(:profile).progress }.to eq('50')
    end

    And 'their profile picture is the placeholder image' do
      wait_for { focus_on(:profile).avatar }.to be_present
    end

    And 'the user is signed in' do
      wait_for { focus_on(:nav).profile }.to eq('princess')
    end
  end

  scenario 'all fields are filled in while completing sign up process' do
    When 'user signs up only filling in mandatory fields'
    Then 'a profile is created'
    # user is signed in
    # profile details match up to those filled in
    And 'their profile picture is the placeholder image'
    And 'it is shown as 100% complete'
  end

  # warnings
  scenario 'mandatory fields are missing' do
    When 'user attempts to register without providing a handle' do
      visit('/register')
      focus_on(:auth).submit
    end

    Then 'a warning is shown that this field is mandatory' do
      wait_for { focus_on(:message).error }.to eq("handle: can't be blank")
    end
  end

  context 'Given a a user profile already exists' do
    before do
      @profile = Player.create!(id: '01234567-0123-4abc-8abc-0123456789ab', handle: 'princess')
    end

    scenario 'handle is not unique' do
      When 'user attempts to register with an existing handle' do
        visit('/register')

        focus_on(:auth).sign_up('princess')
      end

      Then 'a warning is shown that this field must be unique' do
        wait_for { focus_on(:message).error }.to eq('handle: has already been taken')
      end
    end
  end

  # errors
  scenario 'profile cannot be created'
end

# Unit test - profiles
# characters allowed in fields
