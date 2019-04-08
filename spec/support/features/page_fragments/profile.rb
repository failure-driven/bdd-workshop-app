module PageFragments
  module Profile
    def test_elements
      browser.synchronize do
        browser.all('[data-testid="profile"] [data-testid]').map(&:text)
      end
    end

    def user_id
      browser.find('[data-testid="handle"]')['data-user-id']
    end

    def progress
      browser.find('.progress .progress-bar')['aria-valuenow']
    end

    def progress_text
      browser.find('[data-testid="profile-progress"]').text
    end

    def handle_placeholder
      browser.find('form input')['placeholder']
    end

    def submit_handle(handle_text)
      browser.fill_in('handle', with: handle_text)
      browser.find('[name="submit"]').click
    end

    def submit_email(email_text)
      browser.fill_in('email', with: email_text)
      browser.find('[name="submit"]').click
    end

    def avatar
      browser.find('main[data-testid="profile"] i[alt="placeholder-avatar"]')
    end
  end
end
