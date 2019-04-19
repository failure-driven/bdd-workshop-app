module PageFragments
  module Profile
    def progress
      browser.find('.progress .progress-bar')['aria-valuenow']
    end

    def progress_text
      browser.find('[data-testid="profile-progress"]').text
    end

    def details
      field_and_key_for_prefixed_fields_within(within: 'profile', prefix: 'details')
    end

    def avatar
      main.find('i[alt="placeholder-avatar"]')
    end

    private

    def main
      browser.find('main[data-testid="profile"]')
    end

    def field_and_key_for_prefixed_fields_within(within:, prefix:)
      Hash[
        browser
        .find(%(main[data-testid="#{within}"]))
        .find_all(%([data-testid|="#{prefix}"]))
        .map { |e| [e['data-testid'].gsub(/^#{prefix}-/, ''), e.text] }
      ].symbolize_keys
    end
  end
end
