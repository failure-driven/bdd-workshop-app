require 'rails_helper'

feature 'Game App', js: true do
  context 'a user with a profile' do
    before do
      @profile = Player.create!(id: '01234567-0123-4abc-8abc-0123456789ab')
      page.visit('/')
      page.execute_script "window.localStorage.setItem('player','{\"id\":\"#{@profile.id}\"}')"
    end

    scenario 'a user is encouraged to add a custom alias to their profile' do
      When 'A user from the internet goes to the landing page and navigates to the game' do
        visit('/')
        focus_on(:landing).play_game
      end

      Then 'they see their current profile of handle 01234567 and are encouraged to customize their profile' do
        wait_for { focus_on(:game).handle }.to eq '01234567'
        wait_for { focus_on(:game).profile_upsell }.to eq 'customize your profile with custom handle and image'
      end

      When 'they continue by clicking customize profile!' do
        focus_on(:game).customize_profile
      end

      Then 'They are encouraged to input their email' do
        wait_for { focus_on(:profile).handle_placeholder }.to eq('input your email')
      end

      When 'They input an email of "princess@email.com" and navigate back to the game' do
        focus_on(:profile).submit_email('princess@email.com')
        focus_on(:landing).follow_brand_link
        focus_on(:landing).play_game
      end

      Then 'They see their handle being "princess" and no prompt to customize their profile' do
        wait_for { focus_on(:game).profile_upsell }.to eq 'customize your profile with custom handle and image'
        pending 'button is yet to be removed'
        # TODO: wait for upsell to make sure buttons fail
        wait(1).for { focus_on(:util).buttons }.to eq []
      end
    end
  end
end
