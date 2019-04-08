module PageFragments
  module GameActions
    def for_game(game_name)
      game = browser.find(".jumbotron[data-testid='#{game_name}']")
      Game.new(game)
    end

    class Game
      def initialize(element)
        @element = element
      end

      def play
        @element.click
      end

      def text
        @element.text
      end
    end
  end
end
