module PageFragments
  module Profile
    def test_elements
      browser.synchronize do
        browser.all('[data-test-id="profile"] [data-test-id]').map(&:text)
      end
    end

    def user_id
      browser.find('[data-test-id="user-id"]').text
    end
  end
end
