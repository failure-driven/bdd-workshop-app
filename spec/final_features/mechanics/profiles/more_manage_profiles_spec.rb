require 'rails_helper'

feature 'User manages profile', js: true do
  context 'Jean Sammet has an incomplete profile and is logged in' do
    before do
      create_and_login_as(handle: 'FORMAC', email: nil, name: nil, avatar_url: nil)
    end

    context 'and some other profile exists as well' do
      before do
        create(:player, handle: 'Smalltalk')
      end

      scenario 'new handles must be unique' do
        When 'Jean Sammet completes her profile' do
          visit('/profile')
          focus_on(:form).form_for('profile').fill_in_row_for('name', 'Jean Sammet')
          focus_on(:form).form_for('profile').submit
          focus_on(:form).form_for('profile').fill_in_row_for('email', 'jean.sammet@ibm.com')
          focus_on(:form).form_for('profile').submit
          focus_on(:form).form_for('profile').fill_in_row_for('avatarUrl', '/sample_avatars/bbc_micro_80_80.png')
          focus_on(:form).form_for('profile').submit
        end

        And 'tries to update handle to be the same as an existing one' do
          focus_on(:page_content).container_for('profile').action_item('Edit')
          focus_on(:form).form_for('profile').fill_in_row_for('handle', 'Smalltalk')
          focus_on(:form).form_for('profile').submit
        end

        Then 'a warning message is shown' do
          wait_for { focus_on(:messages).error }.to eq('handle: has already been taken')
          wait_for { focus_on(:form).form_for('profile').field('handle') }.to eq('Smalltalk')
          # TODO: check top right hand for FORMAC unchanged
        end

        When 'she refreshes the page' do
          page.refresh
        end

        Then 'the handle has not been updated' do
          wait_for { focus_on(:profile).details[:handle] }.to eq('FORMAC')
        end

        When 'Jean changes handle to something unique' do
          focus_on(:page_content).container_for('profile').action_item('Edit')
          focus_on(:form).form_for('profile').fill_in_row_for('handle', 'FORTRAN')
          focus_on(:form).form_for('profile').submit
        end

        Then 'her profile is saved successfully' do
          wait_for { focus_on(:messages).info }.to eq('Updated user profile')
        end
      end
    end
  end
end
