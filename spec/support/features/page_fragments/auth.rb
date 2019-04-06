module PageFragments
  module Auth
    def title
      browser.find('main[data-testid="register"] h3').text
    end

    def sign_up(handle_text)
      browser.fill_in('handle', with: handle_text)
      browser.find('[name="submit"]').click
    end
  end
end
