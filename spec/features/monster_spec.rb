require 'rails_helper'

feature 'Signup to play the game', js: true do
  scenario 'A couple of users signup and they need unique "handles"' do
    visit('/')
    focus_on(:game_actions).for_game('wargames').play
    wait_for do
      focus_on(:page_content).container_for('register').heading
    end.to eq('Register')
    focus_on(:form).form_for('register').fill_in_row_for('handle', 'princess')
    focus_on(:form).form_for('register').submit
    focus_on(:form).form_for('profile').fill_in_row_for('email', 'princess@email.com')
    focus_on(:form).form_for('profile').submit
    wait_for { focus_on(:messages).info }.to eq('Updated user profile')
    wait_for { focus_on(:nav).details.summary.text }.to eq('princess')
    wait_for { focus_on(:page_content).container_for('game').heading }.to eq('coming soon')
    # fix with user signs out
    page.execute_script("window.localStorage.setItem('player','{}')")
    visit('/')
    focus_on(:game_actions).for_game('wargames').play
    wait_for do
      focus_on(:page_content).container_for('register').heading
    end.to eq('Register')
    focus_on(:form).form_for('register').fill_in_row_for('handle', 'troll')
    focus_on(:form).form_for('register').submit
    focus_on(:form).form_for('profile').fill_in_row_for('email', 'troll@email.com')
    focus_on(:form).form_for('profile').submit
    wait_for { focus_on(:messages).info }.to eq('Updated user profile')
    wait_for { focus_on(:nav).details.summary.text }.to eq('troll')
    wait_for { focus_on(:page_content).container_for('game').heading }.to eq('coming soon')
    # fix with user signs out
    page.execute_script("window.localStorage.setItem('player','{}')")
    visit('/')
    focus_on(:nav).follow_nav_link('Sign in')
    focus_on(:form).form_for('sign-in').fill_in_row_for('handle', 'princess')
    focus_on(:form).form_for('sign-in').submit
    wait_for { focus_on(:messages).info }.to eq('signed in successfully')
    wait_for { focus_on(:nav).details.summary.text }.to eq('princess')
    wait_for { focus_on(:nav).nav_links }.to eq ['princess']
    focus_on(:nav).details.click_detail('Profile')
    focus_on(:page_content).container_for('profile').action_item('Edit')
    focus_on(:form).form_for('profile').fill_in_row_for('handle', 'troll')
    focus_on(:form).form_for('profile').submit
    wait_for { focus_on(:messages).error }.to eq('handle: has already been taken')
    wait_for { focus_on(:form).form_for('profile').field('handle') }.to eq('troll')
    page.refresh
    wait_for { focus_on(:profile).details[:handle] }.to eq('princess')
    focus_on(:page_content).container_for('profile').action_item('Edit')
    focus_on(:form).form_for('profile').fill_in_row_for('handle', 'disney_princess')
    focus_on(:form).form_for('profile').submit
    wait_for { focus_on(:messages).info }.to eq('Updated user profile')
  end
end
