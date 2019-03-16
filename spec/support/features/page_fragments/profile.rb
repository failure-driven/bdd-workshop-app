module PageFragments
  module Profile
    def test_elements
      browser.find_all('[data-test-id="profile"] [data-test-id]').map(&:text)
    end
  end
end
