module PageFragments
  module Profile
    def progress
      browser.find('.progress .progress-bar')['aria-valuenow']
    end

    def progress_text
      browser.find('[data-testid="profile-progress"]').text
    end

    def details
      # just an idea, get all details prepended fields as a hash
      # TODO: maybe move this out and do this more often?
      # add .sr-only class for avatar and display that
      Hash[
        browser
        .find('main[data-testid="profile"]')
        .find_all('[data-testid|="details"]')
        .map { |e| [e['data-testid'].gsub(/^details-/, ''), e.text] }
      ].symbolize_keys
    end

    def avatar
      main.find('i[alt="placeholder-avatar"]')
    end

    private

    def main
      browser.find('main[data-testid="profile"]')
    end
  end
end
