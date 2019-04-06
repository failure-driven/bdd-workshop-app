module PageFragments
  module Nav
    def profile
      browser.find('nav span[data-testid="placeholder-avatar"]').text
    end
  end
end
