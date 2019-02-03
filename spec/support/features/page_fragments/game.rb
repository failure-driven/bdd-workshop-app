module PageFragments
  module Game
    def message_and_versions
      {
        message: browser.find('div[@data-test="message"]').text,
        react_version: browser.find('span[data-test="react-version"]').text,
      }
    end
  end
end

