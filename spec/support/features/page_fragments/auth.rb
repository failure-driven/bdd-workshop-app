module PageFragments
  module Auth
    def title
      browser.find('main[data-testid="register"] h3').text
    end

    def submit
      browser.find('[name="submit"]').click
    end

    def sign_up(handle_text)
      browser.fill_in('handle', with: handle_text)
      browser.find('[name="submit"]').click
    end

    def sign_in(handle_text)
      browser.find('.btn', text: 'sign in with an existing account').click
      sign_up(handle_text)
    end
  end
end
