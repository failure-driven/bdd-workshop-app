module PageFragments
  module Util
    def test_elements(prefix)
      browser.synchronize do
        browser.all("[data-testid|=\"#{prefix}\"]").map(&:text)
      end
    end

    def buttons
      browser.synchronize do
        browser.all('.btn').map(&:text)
      end
    end
  end
end
