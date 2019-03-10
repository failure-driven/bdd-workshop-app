module PageFragments
  module Landing
    def brand
      # browser.find('nav .navbar-brand').text()
    end

    def navigation
      # browser.synchronize do
      #   browser.find_all('nav .nav-link').map(&:text)
      # end
    end

    def content
      # browser.find('section.main-content').text
    end
  end
end
