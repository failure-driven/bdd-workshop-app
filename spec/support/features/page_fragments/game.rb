module PageFragments
  module Game
    def message_and_versions
      {
        message: browser.find('div[data-test="message"]').text,
        react_version: browser.find('span[data-test="react-version"]').text
      }
    end

    def status
      browser.find('div[data-testid="game-status"]').text
    end

    def create_profile
      browser.find('div[data-testid="game"] a', text: 'Create Profile').click
    end

    def handle
      browser.find('[data-testid="handle"]').text
    end
  end
end
