module PageFragments
  module Nav
    def follow_brand_link
      navbar_brand.click
    end

    def brand
      navbar_brand.text
    end

    def nav_links
      browser.find_all('nav .nav-link').map(&:text)
    end

    def nav_link(link_to)
      browser.find("nav .nav-link[data-testid='#{link_to}-link']").text
    end

    def follow_nav_link(link_text)
      browser.find('nav .nav-link', text: link_text).click
    end

    def toggle_hamburger
      browser.find('button.navbar-toggler').click
    end

    def details
      Details.new(browser.find('nav [data-testid="details"]'))
    end

    class Details
      def initialize(node)
        @node = node
      end

      def summary
        @node.find('[data-testid="summary"]')
      end

      def click_detail(detail_text)
        summary['aria-expanded'] == 'false' && summary.click
        @node.click_on(detail_text)
      end
    end

    private

    def navbar_brand
      browser.find('nav .navbar-brand')
    end
  end
end
