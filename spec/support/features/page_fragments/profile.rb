module PageFragments
  module Profile
    def test_elements
      browser.synchronize do
        browser.all('[data-testid="profile"] [data-testid]').map(&:text)
      end
    end

    def user_id
      browser.find('[data-testid="handle"]')['data-user-id']
    end
  end
end
