require 'rails_helper'

feature 'landing page', js: true do
  scenario 'landing page has a brand of game' do
    When 'a user of the internet visits the site' do
      visit('/')
    end

    Then 'they are greeted with the landing page' do
      wait_for { focus_on(:landing).brand }.to eq 'Game'
      wait_for { focus_on(:landing).navigation }.to eq ['Profile']
      wait_for { focus_on(:landing).content }.to eq "Games make mistakes.\nSHALL WE PLAY A GAME?"
    end
  end

  scenario 'following the Game link lands them on the landing page' do
    When 'a user of the internet visits the site' do
      visit('/')
      wait_for { focus_on(:landing).brand }.to eq 'Game'
    end

    And 'clicks on the brand Game link' do
      focus_on(:landing).follow_brand_link
    end

    Then 'they remain on the landing page' do
      # TODO: this does not work without react router, is it missing some kind of re-paint?
      wait_for { focus_on(:landing).brand }.to eq 'Game'
    end
  end

  scenario 'navigate to and from profile page' do
    When 'a user of the internet visits the site' do
      visit('/')
    end

    Then 'they are greeted with the plain landing page' do
      wait_for { focus_on(:landing).brand }.to eq 'Game'
      wait_for { focus_on(:landing).navigation }.to eq ['Profile']
    end

    When 'they click on profile' do
      focus_on(:landing).follow_nav_link('Profile')
    end

    Then 'they are take to the profile page' do
      wait_for { page.current_path }.to eq('/profile')
    end

    When 'the click on the brand Game link' do
      focus_on(:landing).follow_brand_link
    end

    Then 'they go back to the landing page' do
      wait_for { focus_on(:landing).brand }.to eq 'Game'
    end
  end
end
