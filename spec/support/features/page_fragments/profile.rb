module PageFragments
  module Profile
    def progress
      browser.find('.progress .progress-bar')['aria-valuenow']
    end

    def progress_text
      browser.find('[data-testid="profile-progress"]').text
    end

    def avatar
      browser.find('main[data-testid="profile"] i[alt="placeholder-avatar"]')
    end
  end
end
