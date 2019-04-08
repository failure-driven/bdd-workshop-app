module PageFragments
  module Auth
    def submit
      browser.find('[name="submit"]').click
    end

    def sign_up(handle_text)
      browser.fill_in('handle', with: handle_text)
      submit
    end

    def sign_in(handle_text)
      browser.find('.btn', text: 'sign in with an existing account').click
      sign_up(handle_text)
    end
  end
end
