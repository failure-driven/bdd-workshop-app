require 'rails_helper'

feature 'Register a profile', js: true do
  scenario "Adele Goldberg only fills in the mandatory handle field while completing
            registration process" do
    When 'Adele registers and fills in mandatory handle with "Smalltalk"' do
      visit('/register')
      focus_on(:form).form_for('register').fill_in_row_for('handle', 'Smalltalk')
      focus_on(:form).form_for('register').submit
    end

    Then 'her "Smalltalk" profile is created' do
      wait_for do
        focus_on(:page_content).container_for('profile').heading
      end.to eq('Hi : Smalltalk')
      wait_for do
        focus_on(:messages).info
      end.to eq('profile successfully created')
    end

    And 'the profile is 25% complete' do
      wait_for { focus_on(:profile).progress }.to eq('25')
      wait_for { focus_on(:profile).progress_text }.to eq('25%')
    end

    When 'she adds her name' do
      focus_on(:form).form_for('profile').fill_in_row_for('name', 'Adele Goldberg')
      focus_on(:form).form_for('profile').submit
    end

    Then 'the profile is 50% complete' do
      wait_for { focus_on(:profile).progress }.to eq('50')
      wait_for { focus_on(:profile).progress_text }.to eq('50%')
    end

    When 'she adds her email' do
      focus_on(:form).form_for('profile').fill_in_row_for('email', 'adele.goldberg@xerox.parc.com')
      focus_on(:form).form_for('profile').submit
    end

    Then 'the profile is 75% complete' do
      wait_for { focus_on(:profile).progress }.to eq('75')
      wait_for { focus_on(:profile).progress_text }.to eq('75%')
    end

    When 'she adds her avatar' do
      focus_on(:form).form_for('profile').fill_in_row_for('avatarUrl', '/sample_avatars/adele_goldberg.jpg')
      focus_on(:form).form_for('profile').submit
    end

    And 'her profile picture is the placeholder image' do
      wait_for { focus_on(:profile).avatar }.to eq 'avatar-Smalltalk'
    end

    And 'she is signed in' do
      wait_for { focus_on(:nav).details.summary.text }.to eq('Smalltalk')
    end
  end

  scenario 'Adele fills in all fields while completing registration process' do
    When 'Adele registers with handle "Smalltalk"' do
      visit('/register')
      focus_on(:form).form_for('register').fill_in_row_for('handle', 'Smalltalk')
      focus_on(:form).form_for('register').submit
    end

    Then 'her profile is created' do
      wait_for do
        focus_on(:page_content).container_for('profile').heading
      end.to eq('Hi : Smalltalk')
      wait_for do
        focus_on(:messages).info
      end.to eq('profile successfully created')
    end

    When 'she adds her name' do
      focus_on(:form).form_for('profile').submit!(
        name: 'Adele Goldberg'
      )
    end

    And 'she adds her email' do
      focus_on(:form).form_for('profile').submit!(
        email: 'adele.goldberg@xerox.parc.com'
      )
    end

    And 'she adds her birthday' do
      focus_on(:form).form_for('profile').submit!(
        birthday: '04/08/1957'
      )
    end

    And 'she confirms her avatar' do
      focus_on(:form).form_for('profile').submit!(
        avatarUrl: '/sample_avatars/bbc_micro_80_80.png'
      )
    end

    Then 'the correct profile details are shown' do
      wait_for { focus_on(:profile).details }.to eq(
        avatarUrl: '/sample_avatars/bbc_micro_80_80.png',
        handle: 'Smalltalk',
        name: 'Adele Goldberg',
        email: 'adele.goldberg@xerox.parc.com'
      )
    end
  end

  scenario 'mandatory fields are missing' do
    When 'user attempts to register without providing a handle' do
      visit('/register')
      focus_on(:form).form_for('register').submit
    end

    Then 'a warning is shown that this field is mandatory' do
      wait_for { focus_on(:messages).error }.to eq("handle: can't be blank")
    end
  end

  context 'Given a a user profile already exists' do
    before do
      create(:player, handle: 'Smalltalk')
    end

    scenario 'handle is not unique' do
      When 'Another user attempts to register with an existing handle' do
        visit('/register')

        focus_on(:form).form_for('register').fill_in_row_for('handle', 'Smalltalk')
        focus_on(:form).form_for('register').submit
      end

      Then 'profile cannot be created' do
        wait_for { focus_on(:messages).error }.to eq('handle: has already been taken')
      end
    end
  end
end
