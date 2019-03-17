module PageFragments
  module Profile
    def test_elements
      browser.synchronize do
        browser.all('[data-test-id="profile"] [data-test-id]').map(&:text)
      end
    end
  end
end
