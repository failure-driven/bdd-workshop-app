require 'rails_helper'

feature 'registration', js: true do
  scenario 'only mandatory fields are filled in while completing sign up process' do
    When 'user signs up only filling in mandatory fields' do
      visit('/register')
      focus_on(:auth).sign_up('princess')
    end

    Then 'a profile is created' do
      wait_for { focus_on(:page_content).container_for('profile').heading }.to eq('princess')
      wait_for { focus_on(:messages).info }.to eq('profile successfully created')
    end

    And 'it is shown as 50% complete' do
      wait_for { focus_on(:profile).progress }.to eq('50')
      wait_for { focus_on(:profile).progress_text }.to eq('50%')
    end

    And 'their profile picture is the placeholder image' do
      wait_for { focus_on(:profile).avatar }.to be_present
    end

    And 'the user is signed in' do
      wait_for { focus_on(:nav).nav_link('profile') }.to eq('princess')
    end
  end

  scenario 'all fields are filled in while completing sign up process' do
    When 'user signs up only filling in mandatory fields' do
      visit('/register')
      focus_on(:auth).sign_up('princess')
    end

    Then 'a profile is created' do
      wait_for { focus_on(:page_content).container_for('profile').heading }.to eq('princess')
      wait_for { focus_on(:messages).info }.to eq('profile successfully created')
    end

    When 'user completes the sign up process' do
      pending 'need to work out how to upload an avatar'
      focus_on(:profile).submit do |form|
        form.email('princess@email.com')
        form.avatar('test-avatar')
      end
    end

    Then 'the correct profile details are shown' do
      wait_for { focus_on(:profile).details }.to eq(
        handle: 'princess',
        email: 'princess@email.com',
        avatar: 'test-avatar'
      )
    end

    And 'profile is shown as 100% complete' do
      wait_for { focus_on(:profile).progress }.to eq('100')
      wait_for { focus_on(:profile).progress_text }.to eq('100%')
    end
  end

  scenario 'mandatory fields are missing' do
    When 'user attempts to register without providing a handle' do
      visit('/register')
      focus_on(:auth).submit
    end

    Then 'a warning is shown that this field is mandatory' do
      wait_for { focus_on(:messages).error }.to eq("handle: can't be blank")
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

      Then 'profile cannot be created without a unique handle' do
        wait_for { focus_on(:messages).error }.to eq('handle: has already been taken')
      end
    end
  end
end
