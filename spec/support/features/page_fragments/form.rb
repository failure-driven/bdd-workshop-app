module PageFragments
  module Form
    def form_for(section_name)
      main_section = browser.find("main[data-testid='#{section_name}']")
      Form.new(main_section.find('form'))
    end

    class Form
      def initialize(node)
        @node = node
      end

      def field(name)
        @node.find(%([name="#{name}"])).value
      end

      def fill_in_row_for(label, text)
        @node.fill_in(label.to_s, with: text)
      end

      def submit
        @node.find('[name="submit"]').click
      end

      def submit!(values)
        values.each do |key, value|
          fill_in_row_for(key, value)
        end
        submit
      end
    end
  end
end
