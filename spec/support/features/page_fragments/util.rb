module PageFragments
  module Util
    def test_elements(prefix)
      browser.synchronize do
        browser.all("[data-testid|=\"#{prefix}\"]").map(&:text)
      end
    end

    def other_test_elements
      browser.synchronize do
        browser.all('[data-testid="profile"] [data-testid]').map(&:text)
      end
    end
  end
end
