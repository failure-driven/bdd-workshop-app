require 'rails_helper'

feature 'Playing the game', js: true do
  scenario "Sophie Wilson would like to play the game
            and in order to do so she registers" do

    visit('/')
    focus_on(:game_actions).for_game('wargames').play
    wait_for do
      focus_on(:page_content).container_for('register').heading
    end.to eq('Register')
    focus_on(:form).form_for('register').submit!(
      handle: 'BBCmicro'
    )
    wait_for do
      focus_on(:messages).info
    end.to eq('profile successfully created')
    wait_for { focus_on(:nav).details.summary.text }.to eq('BBCmicro')
    wait_for do
      focus_on(:page_content).container_for('profile').text
    end.to include('Your profile is almost complete')
    wait_for do
      focus_on(:page_content).container_for('profile').actions
    end.to eq(['Play the game'])
    focus_on(:page_content)
      .container_for('profile')
      .action_item('Play the game')
    wait_for do
      focus_on(:page_content).container_for('game').heading
    end.to eq('coming soon')
    wait_for do
      focus_on(:page_content).container_for('game').actions
    end.to eq(['Complete my profile'])
    focus_on(:page_content)
      .container_for('game')
      .action_item('Complete my profile')
    focus_on(:form).form_for('profile').submit!(
      name: 'Sophie Wilson'
    )
    focus_on(:form).form_for('profile').submit!(
      email: 'sophie.wilson@acorn.co.uk'
    )
    focus_on(:form).form_for('profile').submit!(
      avatarUrl: '/bbc_micro_80_80.png'
    )
    wait_for { focus_on(:profile).details }.to eq(
      handle: 'BBCmicro',
      name: 'Sophie Wilson',
      email: 'sophie.wilson@acorn.co.uk',
      avatarUrl: '/bbc_micro_80_80.png'
    )
    visit('/profile')
    focus_on(:page_content).container_for('profile').action_item('Edit')
    # TODO: allow editing name on edit form
    focus_on(:form).form_for('profile').fill_in_row_for('handle', 'FORMAC')
    focus_on(:form).form_for('profile').fill_in_row_for('email', 'jean.sammet@ibm.com')
    focus_on(:form).form_for('profile').submit
    wait_for { focus_on(:profile).details }.to eq(
      handle: 'FORMAC',
      name: 'Sophie Wilson',
      email: 'jean.sammet@ibm.com',
      avatarUrl: '/bbc_micro_80_80.png'
    )
    page.refresh
    wait_for { focus_on(:profile).details }.to eq(
      handle: 'FORMAC',
      name: 'Sophie Wilson',
      email: 'jean.sammet@ibm.com',
      avatarUrl: '/bbc_micro_80_80.png'
    )
    with_api_route_paused(method: 'get', url: '/api/v1/profiles') do
      visit('/profile')
      wait_for { focus_on(:util).test_elements('profile') }.to eq ['Loading...']
    end
    wait_for { focus_on(:util).test_elements('profile') }.to_not include('Loading...')
    force_api_error(method: 'get', url: '/api/v1/profiles', error: 'failed to fetch profile')
    visit('/profile')
    wait_for { focus_on(:messages).error }.to eq '400 - Bad Request'
    clear_api_error
    page.refresh
    focus_on(:page_content)
      .container_for('profile')
      .action_item('Play the game')
    wait_for do
      focus_on(:page_content).container_for('game').heading
    end.to eq('coming soon')
    wait_for do
      focus_on(:page_content).container_for('game').text
    end.to include('Your profile is complete!')
    wait_for do
      focus_on(:page_content).container_for('game').actions
    end.to eq([])
    focus_on(:nav).details.click_detail('Sign out')
    wait_for { focus_on(:nav).nav_links }.to eq ['Sign in', 'Register']
    visit('/')
    focus_on(:game_actions).for_game('wargames').play
    wait_for do
      focus_on(:page_content).container_for('register').heading
    end.to eq('Register')
    focus_on(:form).form_for('register').fill_in_row_for('handle', 'FORMAC')
    focus_on(:form).form_for('register').submit
    wait_for { focus_on(:messages).error }.to eq('handle: has already been taken')
    focus_on(:form).form_for('register').fill_in_row_for('handle', 'CLU')
    focus_on(:form).form_for('register').submit
    wait_for { focus_on(:messages).info }.to eq('profile successfully created')
    wait_for { focus_on(:nav).details.summary.text }.to eq('CLU')
    focus_on(:page_content)
      .container_for('profile')
      .action_item('Play the game')
    wait_for do
      focus_on(:page_content).container_for('game').heading
    end.to eq('coming soon')
  end
end
