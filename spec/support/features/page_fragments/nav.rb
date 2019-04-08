module PageFragments
  module Nav
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

    def click_hamburger
      browser.find('button.navbar-toggler').click
    end

    # TODO: remove this cause it aint generic
    def profile
      browser.find('nav span[data-testid="placeholder-avatar"]').text
    end

    private

    def navbar_brand
      browser.find('nav .navbar-brand')
    end
  end
end
