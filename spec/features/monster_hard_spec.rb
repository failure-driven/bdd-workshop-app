require 'rails_helper'

feature 'Signup to play the game', js: true, flaky: true do
  scenario 'A couple of users signup and they need unique "handles"' do
    visit('/')
    page.find(".jumbotron[data-testid='wargames']").click
    wait_for do
      page.find("main[data-testid='register'] h1").text
    end.to eq('Register')
    page.find("main[data-testid='register']").fill_in('handle', with: 'princess')
    page.fill_in('handle', with: 'princess')
    page.find('[name="submit"]').click
    page.fill_in('email', with: 'princess@email.com')
    page.find('[name="submit"]').click
    wait_for { page.find('.alert.alert-info').text }.to eq('Updated user profile')
    wait_for { page.find("nav .nav-link[data-testid='summary']").text }.to eq('princess')
    wait_for { page.find("main[data-testid='game'] h1").text }.to eq('coming soon')
    # fix with user signs out
    page.find("nav .nav-link[data-testid='summary']").click
    page.find("nav [data-testid='details']").click_on('Sign out')
    page.execute_script("window.localStorage.setItem('player','{}')")
    visit('/')

    page.find(".jumbotron[data-testid='wargames']").click
    wait_for do
      page.find("main[data-testid='register'] h1").text
    end.to eq('Register')
    page.fill_in('handle', with: 'troll')
    page.find('[name="submit"]').click
    page.fill_in('email', with: 'troll@email.com')
    page.find('[name="submit"]').click
    wait_for { page.find('.alert.alert-info').text }.to eq('Updated user profile')
    wait_for { page.find("nav .nav-link[data-testid='summary']").text }.to eq('troll')
    wait_for { page.find("main[data-testid='game'] h1").text }.to eq('coming soon')
    # fix with user signs out
    page.find("nav .nav-link[data-testid='summary']").click
    page.find("nav [data-testid='details']").click_on('Sign out')
    page.execute_script("window.localStorage.setItem('player','{}')")
    visit('/')

    page.find('nav .nav-link', text: 'Sign in').click
    page.fill_in('handle', with: 'princess')
    page.find('[name="submit"]').click
    wait_for { page.find('.alert.alert-info').text }.to eq('signed in successfully')
    wait_for { page.find("nav .nav-link[data-testid='summary']").text }.to eq('princess')
    wait_for { page.find_all('nav .nav-link').map(&:text) }.to eq ['princess']
    page.find("nav .nav-link[data-testid='summary']").click
    page.find("nav [data-testid='details']").click_on('Profile')
    page.find("main[data-testid='profile']").click_on('Edit')
    page.fill_in('handle', with: 'troll')
    page.find('[name="submit"]').click
    wait_for { page.find('.alert.alert-danger').text }.to eq('handle: has already been taken')
    wait_for { page.find('[name="handle"]').value }.to eq('troll')
    page.refresh
    wait_for { page.find('[data-testid="details-handle"]').text }.to eq('princess')
    page.find("main[data-testid='profile']").click_on('Edit')
    page.fill_in('handle', with: 'disney_princess')
    page.find('[name="submit"]').click
    wait_for { page.find('.alert.alert-info').text }.to eq('Updated user profile')
  end
end
