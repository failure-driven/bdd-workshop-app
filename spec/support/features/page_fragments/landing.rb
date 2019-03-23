module PageFragments
  module Landing
    def follow_brand_link
      navbar_brand.click
    end

    def brand
      navbar_brand.text
    end

    def follow_nav_link(link_text)
      browser.find('nav .nav-link', text: link_text).click
    end

    def navigation
      browser.find_all('nav .nav-link').map(&:text)
    end

    def content
      browser.find('.jumbotron[data-testid="main-content"]').text
    end

    def play_game
      browser.find('.jumbotron[data-testid="main-content"]').click
    end

    private

    def navbar_brand
      browser.find('nav .navbar-brand')
    end
  end
end
