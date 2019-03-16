module PageFragments
  module Profile
    def is_loading
      browser.find('[data-test-id="loading-profile"]')
    end
  end
end
