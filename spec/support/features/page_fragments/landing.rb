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
      main_content.text
    end

    def play_game
      main_content.click
    end

    def click_hamburger
      browser.find('button.navbar-toggler').click
    end

    private

    def navbar_brand
      browser.find('nav .navbar-brand')
    end

    def main_content
      browser.find('.jumbotron[data-testid="main-content"]')
    end
  end
end
