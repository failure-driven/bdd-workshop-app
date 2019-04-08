module PageFragments
  module PageContent
    def container_for(page)
      container = browser.find("main[data-testid='#{page}']")
      Container.new(container)
    end

    class Container
      def initialize(element)
        @element = element
      end

      def heading
        @element.find('h1').text
      end
    end
  end
end
