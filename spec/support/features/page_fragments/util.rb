module PageFragments
  module Util
    def test_elements(prefix)
      browser.synchronize do
        browser.all("[data-test-id|=\"#{prefix}\"]").map(&:text)
      end
    end
  end
end
