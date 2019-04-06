module PageFragments
  module Auth
    def title
      browser.find('main[data-testid="register"] h3').text
    end

    def sign_up(handle_text)
      browser.fill_in('handle', with: handle_text)
      browser.find('[name="submit"]').click
    end

    def sign_in(handle_text)
      #TODO sign_in and sign_up will be two different buttons
      browser.fill_in('handle', with: handle_text)
      browser.find('[name="submit"]').click
    end
  end
end
