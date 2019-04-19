module PageFragments
  module Flaky
    module Number3
      def share(text)
        browser.click_on(text)
      end

      def message
        browser.find('.alert').text
      end
    end
  end
end
