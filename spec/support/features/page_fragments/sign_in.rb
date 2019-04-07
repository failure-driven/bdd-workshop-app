module PageFragments
  module SignIn
    def title
      browser.find('main[data-testid="sign-in"] h1').text
    end
  end
end
