module PageFragments
  module About
    def content
      browser.find('main [data-testid="about-content"]').text
    end
  end
end
