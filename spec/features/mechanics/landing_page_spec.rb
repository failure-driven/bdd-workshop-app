require 'rails_helper'

feature 'landing page', js: true do
  scenario 'landing page has a brand of game' do
    When 'a user of the internet visits the site' do
      visit('/')
    end

    Then 'they are greeted with the landing page' do
      wait_for { focus_on(:landing).brand }.to eq 'Game'
      wait_for { focus_on(:landing).navigation }.to eq %w[About Profile]
      wait_for { focus_on(:landing).content }.to match(/^Games make mistakes.\nSHALL WE PLAY A GAME?/)
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
      wait_for { focus_on(:landing).navigation }.to eq %w[About Profile]
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

  context 'mobile width' do
    before do
      visit('/')
      @browser_window_size = page.driver.browser.manage.window.size
      page.driver.browser.manage.window.resize_to(767, 768)
    end

    after do
      page.driver.browser.manage.window.resize_to(@browser_window_size.width, @browser_window_size.height)
    end

    scenario 'a user can navigate to all the pages' do
      When 'a user of the internet visits the site' do
        visit('/')
      end

      Then 'navigation is hidden appart from brand and hamburger' do
        wait_for { focus_on(:landing).brand }.to eq 'Game'
        wait_for { focus_on(:landing).navigation }.to eq %w[]
      end

      When 'user expands the hamburger' do
        focus_on(:landing).click_hamburger
      end

      Then 'the navigation to about and profile appears' do
        wait_for { focus_on(:landing).brand }.to eq 'Game'
        wait_for { focus_on(:landing).navigation }.to eq %w[About Profile]
      end
    end
  end
end
